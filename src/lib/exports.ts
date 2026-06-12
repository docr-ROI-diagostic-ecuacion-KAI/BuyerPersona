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
  const signs = vitalSigns(data);
  const rx = prescription(data);
  const clusters = topicClusters(data);
  doc.setFillColor("#05070B");
  doc.rect(0, 0, pageWidth, 180, "F");
  doc.setTextColor("#FFFFFF");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Doc ROI", 48, 62);
  doc.setFontSize(17);
  doc.text("Conexión Buyer Persona", 48, 98);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Del perfil al JSON accionable", 48, 122);
  doc.setTextColor("#05070B");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(data.projectName || "Proyecto pendiente", 48, 220);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lines = [
    `Producto/gama: ${data.product || "pendiente"}`,
    `Buyer Persona: ${data.fictionalName || "pendiente"}`,
    `Sector: ${data.sector || "pendiente"} · Mercado: ${data.market || "pendiente"}`,
    `Diagnóstico: ${rx.diagnosis}`,
    `Intervención: ${rx.intervention_type}`,
    `Prescripción: ${rx.prescription}`,
    `Signos vitales pedagógicos: ROI ${signs.ROI} · PRO ${signs.PRO} · CE ${signs.CE} · IA ${signs.IA}`,
    "Nota: estimaciones formativas. Validar con CRM, analítica, entrevistas o comportamiento observado.",
  ];
  let y = 252;
  lines.forEach((line) => { doc.text(doc.splitTextToSize(line, pageWidth - 96), 48, y); y += 24; });
  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Receta Doc ROI", 48, 54);
  doc.setFont("helvetica", "normal");
  y = 88;
  [rx.diagnosis, rx.interpretation, rx.impact, rx.prescription, rx.next_step].forEach((line) => { doc.text(doc.splitTextToSize(line, pageWidth - 96), 48, y); y += 44; });
  doc.setFont("helvetica", "bold");
  doc.text("Topic clusters", 48, y + 10);
  y += 40;
  doc.setFont("helvetica", "normal");
  clusters.forEach((cluster) => { doc.text(doc.splitTextToSize(`${cluster.pillar_topic}: ${cluster.subtopics.join(", ")}`, pageWidth - 96), 48, y); y += 44; });
  doc.save(`DocROI_Buyer_Persona_${data.fictionalName || "diagnostico"}.pdf`);
}
