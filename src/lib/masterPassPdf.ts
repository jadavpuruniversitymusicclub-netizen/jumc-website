"use client";

let cachedSamarkanFontCss: string | null = null;
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
 * Preloads `/milaap-bg.jpeg` as a data URL for reliable crisp PDF rendering.
 */
export async function getMilaapPassBgDataUrl(): Promise<string | undefined> {
  if (cachedBgDataUrl) return cachedBgDataUrl;
  try {
    const dataUrl = await fetchLocalAssetAsDataUrl("/milaap-bg.jpeg");
    cachedBgDataUrl = dataUrl;
    return dataUrl;
  } catch {
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
          // Ignore decode rejection for already-decoded/fallback images
        }
      }
    })
  );

  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font readiness check failure
    }
  }
}

/**
 * Captures the rendered Milaap Official Master Pass DOM element at 3x resolution
 * with embedded Samarkan font + local webpage background artwork and downloads
 * it strictly as a `.pdf` document (`Milaap26_MasterPass_<Name>.pdf`).
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

  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 3,
    backgroundColor: "#2b050a",
    skipAutoScale: true,
    ...(fontEmbedCSS ? { fontEmbedCSS } : { skipFonts: true }),
  });

  const pageW = 420;
  const pageH = 680;
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [pageW, pageH],
  });

  // Seamless deep maroon base filling any edge margin around the captured pass
  pdf.setFillColor(43, 5, 10);
  pdf.rect(0, 0, pageW, pageH, "F");

  const rectWidth = element.offsetWidth || 400;
  const rectHeight = element.offsetHeight || 620;
  const padding = 8;
  const availW = pageW - padding * 2;
  const availH = pageH - padding * 2;
  const scale = Math.min(availW / rectWidth, availH / rectHeight);
  const drawW = rectWidth * scale;
  const drawH = rectHeight * scale;
  const offsetX = (pageW - drawW) / 2;
  const offsetY = (pageH - drawH) / 2;

  pdf.addImage(dataUrl, "PNG", offsetX, offsetY, drawW, drawH);

  const safeName = (participantName || "Participant")
    .trim()
    .replace(/\s+/g, "_");
  pdf.save(`Milaap26_MasterPass_${safeName}.pdf`);
}

