import jsPDF from "jspdf";
import { BuyerPersonaData } from "../types";
import { buildJson, prescription, topicClusters, vitalSigns } from "./recommendations";

export function downloadJson(data: BuyerPersonaData) {
  const blob = new Blob([JSON.stringify(buildJson(data), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `doc-roi-buyer-persona-${data.fictionalName || "diagnostico"}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function copyJson(data: BuyerPersonaData) {
  await navigator.clipboard.writeText(JSON.stringify(buildJson(data), null, 2));
}

export function exportPdf(data: BuyerPersonaData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const signs = vitalSigns(data);
  const rx = prescription(data);
  const clusters = topicClusters(data);

  doc.setFillColor("#05070B");
  doc.rect(0, 0, pageWidth, 118, "F");
  doc.setTextColor("#FFFFFF");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Doc ROI · Ficha Buyer Persona", 42, 48);
  doc.setFontSize(13);
  doc.text("Generación del Perfil de Buyer Persona con la IA", 42, 76);
  doc.setFont("helvetica", "normal");

  doc.setTextColor("#05070B");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(data.fictionalName || "Buyer Persona pendiente", 42, 154);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`${data.product || "Producto pendiente"} · ${data.sector || "Sector pendiente"} · ${data.market || "Mercado pendiente"}`, 42, 174);

  const box = (x: number, y: number, w: number, h: number, title: string, body: string | string[]) => {
    doc.setDrawColor("#DDE5EE");
    doc.setFillColor("#F6F7F9");
    doc.roundedRect(x, y, w, h, 10, 10, "FD");
    doc.setTextColor("#003B5C");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(title.toUpperCase(), x + 12, y + 20);
    doc.setTextColor("#05070B");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const text = Array.isArray(body) ? body.join(" · ") : body;
    doc.text(doc.splitTextToSize(text || "pendiente", w - 24), x + 12, y + 38);
  };

  box(42, 202, 160, 122, "Identidad", [
    `Edad: ${data.ageRange || "no informado"}`,
    `Género: ${data.gender || "no informado"}`,
    `Ubicación: ${data.location || "no informado"}`,
    `Rol: ${data.role || "pendiente"}`,
  ]);
  box(216, 202, 164, 122, "Conducta digital", [
    data.digitalGeneration,
    data.primaryLevel,
    ...data.secondaryLevels.slice(0, 2),
  ]);
  box(394, 202, 156, 122, "Signos vitales", [
    `ROI ${signs.ROI}`,
    `PRO ${signs.PRO}`,
    `CE ${signs.CE}`,
    `IA ${signs.IA}`,
  ]);

  box(42, 342, 248, 132, "Empathy Map", [
    `Piensa/siente: ${data.thinksAndFeels || "pendiente"}`,
    `Escucha: ${data.hears || "pendiente"}`,
    `Ve: ${data.sees || "pendiente"}`,
    `Dice/hace: ${data.saysAndDoes || "pendiente"}`,
  ]);
  box(304, 342, 246, 132, "Pain / Gain / Necesidad", [
    `Pain: ${data.frustrations || "pendiente"}`,
    `Gain: ${data.motivations || "pendiente"}`,
    `Necesidad: ${data.needsToSolve || "pendiente"}`,
  ]);
  box(42, 492, 248, 110, "Contenido digital", [
    `Marca ${data.trustDistribution.brand}%`,
    `Producto ${data.trustDistribution.product}%`,
    `Experiencia ${data.trustDistribution.experience}%`,
    data.formats.slice(0, 4).join(", "),
  ]);
  box(304, 492, 246, 110, "Canalidad", [
    data.media.join(", ") || "pendiente",
    data.supports.slice(0, 4).join(", "),
  ]);
  box(42, 620, 508, 100, "Receta Doc ROI", [
    rx.diagnosis,
    rx.prescription,
    rx.next_step,
  ]);

  doc.setFillColor("#000000");
  doc.rect(0, pageHeight - 54, pageWidth, 54, "F");
  doc.setTextColor("#D1D5DB");
  doc.setFontSize(8);
  doc.text("Doc ROI · Recurso formativo. La propiedad intelectual del ecosistema Doc ROI pertenece al Ph. D. Jorge Lucio Sánchez Galán.", 42, pageHeight - 24);

  doc.addPage();
  doc.setFillColor("#05070B");
  doc.rect(0, 0, pageWidth, 82, "F");
  doc.setTextColor("#FFFFFF");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Mapa operativo", 42, 48);
  doc.setTextColor("#05070B");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Receta Doc ROI", 42, 118);
  doc.setFont("helvetica", "normal");
  let y = 150;
  [rx.diagnosis, rx.interpretation, rx.impact, rx.prescription, rx.next_step].forEach((line) => {
    doc.text(doc.splitTextToSize(line, pageWidth - 84), 42, y);
    y += 44;
  });
  doc.setFont("helvetica", "bold");
  doc.text("Topic clusters", 42, y + 10);
  y += 40;
  doc.setFont("helvetica", "normal");
  clusters.forEach((cluster) => {
    doc.text(doc.splitTextToSize(`${cluster.pillar_topic}: ${cluster.subtopics.join(", ")}`, pageWidth - 84), 42, y);
    y += 44;
  });
  doc.setFillColor("#000000");
  doc.rect(0, pageHeight - 54, pageWidth, 54, "F");
  doc.setTextColor("#D1D5DB");
  doc.setFontSize(8);
  doc.text("Consulta con Doc ROI · doctor.roi.marketing@gmail.com · docroi.marketing", 42, pageHeight - 24);
  doc.save(`DocROI_Buyer_Persona_${data.fictionalName || "diagnostico"}.pdf`);
}
