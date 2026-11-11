"use client";

let cachedSamarkanFontCss: string | null = null;
let cachedMandalaDataUrl: string | null = null;
let cachedBgDataUrl: string | null = null;

async function fetchLocalAssetAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`Failed to fetch local asset: ${url}`);
  }
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error(`Unable to convert ${url} to data URL`));
      }
    };
    reader.onerror = () =>
      reject(reader.error || new Error(`FileReader error for ${url}`));
    reader.readAsDataURL(blob);
  });
}

/**
 * Builds an inline @font-face CSS block from the local `/fonts/SAMAN___.TTF`
 * asset so `html-to-image` renders Samarkan inside isolated SVG foreignObjects
 * without hitting CORS errors on external font stylesheets.
 */
export async function getSamarkanFontEmbedCss(): Promise<string | undefined> {
  if (cachedSamarkanFontCss) return cachedSamarkanFontCss;
  try {
    const fontDataUrl = await fetchLocalAssetAsDataUrl("/fonts/SAMAN___.TTF");
    const css = [
      "@font-face {",
      "  font-family: 'Samarkan';",
      `  src: url('${fontDataUrl}') format('truetype');`,
      "  font-weight: normal;",
      "  font-style: normal;",
      "}",
    ].join("\n");
    cachedSamarkanFontCss = css;
    return css;
  } catch (error) {
    console.warn("[MasterPass font preload fallback]:", error);
    return undefined;
  }
}

/**
 * Preloads the webpage backdrop (`/milaap-bg.jpeg`) as a cached data URL so
 * lotus floral borders and the golden musician mural render sharply in PDF.
 */
export async function getMilaapPassBgDataUrl(): Promise<string | undefined> {
  if (cachedBgDataUrl) return cachedBgDataUrl;
  try {
    const dataUrl = await fetchLocalAssetAsDataUrl("/milaap-bg.jpeg");
    cachedBgDataUrl = dataUrl;
    return dataUrl;
  } catch (error) {
    console.warn("[MasterPass backdrop preload fallback]:", error);
    return undefined;
  }
}

/**
 * Preloads `/mandala.svg` as an inline data URL so the centered static Mandala
 * lotus captures reliably at 3x resolution inside html-to-image + jsPDF.
 */
export async function getMilaapMandalaDataUrl(): Promise<string | undefined> {
  if (cachedMandalaDataUrl) return cachedMandalaDataUrl;
  try {
    const dataUrl = await fetchLocalAssetAsDataUrl("/mandala.svg");
    cachedMandalaDataUrl = dataUrl;
    return dataUrl;
  } catch (error) {
    console.warn("[MasterPass mandala preload fallback]:", error);
    return undefined;
  }
}

async function waitForPassAssets(el: HTMLElement): Promise<void> {
  const images = Array.from(el.querySelectorAll("img"));
  await Promise.all(
    images.map(async (img) => {
      if (!img.complete) {
        await new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        });
      }
      if (typeof img.decode === "function") {
        try {
          await img.decode();
        } catch {
          // Ignore decode rejection for already-decoded/SVG images
        }
      }
    })
  );

  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font readiness check error
    }
  }
}

/**
 * Captures the rendered Milaap Official Master Pass DOM element at 3x resolution
 * with embedded Samarkan font + webpage backdrop + centered Mandala artwork and
 * saves it edge-to-edge as `.pdf` (`Milaap26_MasterPass_<Name>.pdf`).
 */
export async function downloadMasterPassPdf(
  element: HTMLElement,
  participantName: string
): Promise<void> {
  const [{ toPng }, { jsPDF }, fontEmbedCSS] = await Promise.all([
    import("html-to-image"),
    import("jspdf"),
    getSamarkanFontEmbedCss(),
  ]);

  await waitForPassAssets(element);

  const captureWidth = element.offsetWidth || 520;
  const captureHeight = element.offsetHeight || 840;

  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 3,
    width: captureWidth,
    height: captureHeight,
    backgroundColor: "#2b050a",
    skipAutoScale: true,
    ...(fontEmbedCSS ? { fontEmbedCSS } : { skipFonts: true }),
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [captureWidth, captureHeight],
    hotfixes: ["px_scaling"],
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Edge-to-edge full-bleed image filling 100% of the PDF page (0 outer margin)
  pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

  const safeName = (participantName || "Participant")
    .trim()
    .replace(/\s+/g, "_");
  pdf.save(`Milaap26_MasterPass_${safeName}.pdf`);
}
