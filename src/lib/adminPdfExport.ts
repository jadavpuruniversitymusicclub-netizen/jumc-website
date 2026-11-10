"use client";

import type { UserOptions } from "jspdf-autotable";

export interface AdminPdfExportOptions {
  /** Report title shown in the PDF banner header. */
  title: string;
  /** Optional subtitle (e.g. active filters or summary details). */
  subtitle?: string;
  /** Download filename without needing to include the date prefix manually. */
  filename: string;
  /** Column headers rendered in the PDF table. */
  headers: string[];
  /** Body rows matching the column headers. */
  rows: Array<Array<string | number>>;
  /** Optional summary footer row rendered below the table body. */
  footRow?: Array<string | number>;
  /** Page orientation; landscape is best for wide multi-column tables. */
  orientation?: "portrait" | "landscape";
  /** Optional per-column styling overrides passed to jspdf-autotable. */
  columnStyles?: UserOptions["columnStyles"];
}

/**
 * Replaces characters outside WinAnsi Latin-1 range with safe ASCII equivalents
 * so jsPDF's built-in Helvetica font never renders broken glyphs.
 */
function sanitizePdfText(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "-";
  return String(value)
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2022/g, "|")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/[^\x09\x0A\x0D\x20-\xFF]/g, "");
}

/**
 * Generates and downloads a formatted JUMC Milaap PDF document for any list
 * or table inside the Admin Command Center.
 */
export async function exportAdminListToPdf({
  title,
  subtitle,
  filename,
  headers,
  rows,
  footRow,
  orientation = "portrait",
  columnStyles,
}: AdminPdfExportOptions): Promise<void> {
  const [{ jsPDF }, autoTableModule] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  const autoTable = autoTableModule.default;

  const doc = new jsPDF({
    orientation,
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;

  const now = new Date();
  const generatedLabel = now.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Top JUMC maroon header banner
  doc.setFillColor(24, 4, 7);
  doc.rect(0, 0, pageWidth, 25, "F");

  // Metallic gold accent hairline beneath banner
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 25, pageWidth, 1, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(251, 191, 36);
  doc.text("JADAVPUR UNIVERSITY MUSIC CLUB  |  MILAAP EDITION I", marginX, 9.5);

  doc.setFontSize(14.5);
  doc.setTextColor(255, 255, 255);
  doc.text(sanitizePdfText(title), marginX, 18.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  doc.text(`Generated: ${sanitizePdfText(generatedLabel)}`, pageWidth - marginX, 11, {
    align: "right",
  });
  doc.text(`Total Records: ${rows.length}`, pageWidth - marginX, 17.5, {
    align: "right",
  });

  let startY = 32;
  if (subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const wrappedSubtitle = doc.splitTextToSize(
      sanitizePdfText(subtitle),
      pageWidth - marginX * 2
    );
    doc.text(wrappedSubtitle, marginX, 32);
    startY = 32 + wrappedSubtitle.length * 4.2 + 2;
  }

  const sanitizedHeaders = headers.map((h) => sanitizePdfText(h));
  const sanitizedRows = rows.map((row) => row.map((cell) => sanitizePdfText(cell)));
  const sanitizedFoot = footRow
    ? [footRow.map((cell) => sanitizePdfText(cell))]
    : undefined;

  autoTable(doc, {
    startY,
    margin: { left: marginX, right: marginX, bottom: 16 },
    head: [sanitizedHeaders],
    body: sanitizedRows,
    foot: sanitizedFoot,
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: orientation === "landscape" ? 8 : 9,
      cellPadding: 2.8,
      overflow: "linebreak",
      valign: "top",
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [36, 6, 10],
      textColor: [252, 211, 77],
      fontStyle: "bold",
      fontSize: orientation === "landscape" ? 8.2 : 9,
      halign: "left",
    },
    footStyles: {
      fillColor: [248, 245, 240],
      textColor: [24, 4, 7],
      fontStyle: "bold",
    },
    bodyStyles: {
      textColor: [24, 24, 27],
    },
    alternateRowStyles: {
      fillColor: [253, 250, 245],
    },
    columnStyles,
    didParseCell: (data) => {
      if (data.section !== "body") return;
      const normalized = String(data.cell.raw ?? "").trim().toLowerCase();
      if (
        normalized === "verified" ||
        normalized === "open" ||
        normalized === "live"
      ) {
        data.cell.styles.textColor = [5, 150, 105];
        data.cell.styles.fontStyle = "bold";
      } else if (normalized === "pending") {
        data.cell.styles.textColor = [180, 83, 9];
        data.cell.styles.fontStyle = "bold";
      } else if (
        normalized === "locked" ||
        normalized === "urgent" ||
        normalized === "hidden"
      ) {
        data.cell.styles.textColor = [190, 18, 60];
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  // Render consistent page numbers across all generated pages
  const totalPages = doc.getNumberOfPages();
  for (let pageNum = 1; pageNum <= totalPages; pageNum += 1) {
    doc.setPage(pageNum);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(marginX, pageHeight - 11, pageWidth - marginX, pageHeight - 11);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(
      "JUMC Admin Command Center  |  Milaap Edition I",
      marginX,
      pageHeight - 7
    );
    doc.text(
      `Page ${pageNum} of ${totalPages}`,
      pageWidth - marginX,
      pageHeight - 7,
      { align: "right" }
    );
  }

  const normalizedName = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  doc.save(normalizedName);
}
