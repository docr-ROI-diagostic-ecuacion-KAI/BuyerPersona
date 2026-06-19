import jsPDF from "jspdf";
import { BuyerPersonaData } from "../types";
import { buildJson, keywords, prescription, recommendedKpis, topicClusters, vitalSigns } from "./recommendations";

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

function textValue(input: unknown, fallback = "pendiente") {
  if (Array.isArray(input)) return input.length ? input.join(", ") : fallback;
  if (input && typeof input === "object") return JSON.stringify(input, null, 2);
  return String(input || fallback);
}

function fileName(data: BuyerPersonaData) {
  return String(data.fictionalName || "diagnostico").replace(/[^a-z0-9_-]+/gi, "_");
}

export function exportPdf(data: BuyerPersonaData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 42;
  const contentWidth = pageWidth - margin * 2;
  const signs = vitalSigns(data);
  const rx = prescription(data);
  const clusters = topicClusters(data);
  const kw = keywords(data);
  const kpis = recommendedKpis(data);
  const json = buildJson(data);

  const footer = () => {
    doc.setFillColor("#000000");
    doc.rect(0, pageHeight - 54, pageWidth, 54, "F");
    doc.setTextColor("#D1D5DB");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Doc ROI · Recurso formativo. Propiedad intelectual del ecosistema Doc ROI: Ph. D. Jorge Lucio Sanchez Galan.", margin, pageHeight - 24);
  };

  const header = (title: string, subtitle?: string) => {
    doc.setFillColor("#05070B");
    doc.rect(0, 0, pageWidth, 92, "F");
    doc.setTextColor("#FFFFFF");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.text(title, margin, 38);
    if (subtitle) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(subtitle, margin, 62);
    }
  };

  const newTextPage = (title = "Ficha Buyer Persona · continuacion") => {
    doc.addPage();
    header(title, "Texto seleccionable para copiar y reutilizar");
    footer();
    return 122;
  };

  const writeLines = (yStart: number, rawText: string, size = 10, bold = false) => {
    let y = yStart;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(bold ? "#003B5C" : "#0F172A");
    const lines = doc.splitTextToSize(rawText || "pendiente", contentWidth) as string[];
    lines.forEach((line) => {
      if (y > pageHeight - 84) {
        y = newTextPage();
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(size);
        doc.setTextColor(bold ? "#003B5C" : "#0F172A");
      }
      doc.text(line, margin, y);
      y += size + 4;
    });
    return y + 8;
  };

  const writeSection = (yStart: number, title: string, rows: Array<[string, unknown]>) => {
    let y = writeLines(yStart, title, 13, true);
    rows.forEach(([label, item]) => {
      y = writeLines(y, `${label}: ${textValue(item)}`, 10, false);
    });
    return y + 8;
  };

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
    const content = Array.isArray(body) ? body.join(" · ") : body;
    doc.text(doc.splitTextToSize(content || "pendiente", w - 24), x + 12, y + 38);
  };

  header("Doc ROI · Ficha Buyer Persona", "Generacion del Perfil de Buyer Persona con la IA");
  footer();
  doc.setTextColor("#05070B");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(data.fictionalName || "Buyer Persona pendiente", margin, 136);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`${data.product || "Producto pendiente"} · ${data.sector || "Sector pendiente"} · ${data.market || "Mercado pendiente"}`, margin, 156);

  box(42, 184, 160, 122, "Identidad", [`Edad: ${data.ageRange || "no informado"}`, `Genero: ${data.gender || "no informado"}`, `Ubicacion: ${data.location || "no informado"}`, `Rol: ${data.role || "pendiente"}`]);
  box(216, 184, 164, 122, "Conducta digital", [data.digitalGeneration, data.primaryLevel, ...data.secondaryLevels.slice(0, 2)]);
  box(394, 184, 156, 122, "Signos vitales", [`ROI ${signs.ROI}`, `PRO ${signs.PRO}`, `CE ${signs.CE}`, `IA ${signs.IA}`]);
  box(42, 324, 248, 132, "Mapa de empatia", [`Piensa/siente: ${data.thinksAndFeels || "pendiente"}`, `Escucha: ${data.hears || "pendiente"}`, `Ve: ${data.sees || "pendiente"}`, `Dice/hace: ${data.saysAndDoes || "pendiente"}`]);
  box(304, 324, 246, 132, "Pain / Gain / Necesidad", [`Pain: ${data.frustrations || "pendiente"}`, `Gain: ${data.motivations || "pendiente"}`, `Necesidad: ${data.needsToSolve || "pendiente"}`]);
  box(42, 474, 248, 110, "Contenido digital", [`Marca ${data.trustDistribution.brand}%`, `Producto ${data.trustDistribution.product}%`, `Experiencia ${data.trustDistribution.experience}%`, data.formats.slice(0, 4).join(", ")]);
  box(304, 474, 246, 110, "Canalidad", [data.media.join(", ") || "pendiente", data.supports.slice(0, 4).join(", ")]);
  box(42, 602, 508, 98, "Receta Doc ROI", [rx.diagnosis, rx.prescription, rx.next_step]);

  let y = newTextPage("Ficha completa para copiar y pegar");
  y = writeLines(y, "Esta seccion esta pensada para seleccionar texto desde el PDF y pegarlo en otra pildora, prompt, documento, CRM o sistema de automatizacion.");
  y = writeSection(y, "1. Contexto", [["Proyecto", data.projectName], ["Producto o gama", data.product], ["Sector", data.sector], ["Mercado", data.market], ["Objetivo de negocio", data.businessGoal], ["Cobertura estimada", `${data.coverage}%`]]);
  y = writeSection(y, "2. Identidad del Buyer Persona", [["Nombre ficticio", data.fictionalName], ["Descripcion ejecutiva", data.shortDescription], ["Generacion digital", data.digitalGeneration], ["Edad", data.ageRange], ["Genero", data.gender], ["Ubicacion", data.location], ["Rol", data.role], ["Contexto", data.context]]);
  y = writeSection(y, "3. Necesidad y valor", [["Necesita resolver", data.needsToSolve], ["Preocupacion principal", data.mainConcern], ["Ganancia deseada", data.desiredGain], ["Riesgo a evitar", data.riskToAvoid], ["Valor esperado", data.expectedValue], ["Criterios de exito", data.successCriteria], ["Barrera principal", data.mainBarrier], ["Disparador de confianza", data.trustTrigger]]);
  y = writeSection(y, "4. Mapa de empatia", [["Piensa y siente", data.thinksAndFeels], ["Escucha", data.hears], ["Ve", data.sees], ["Dice y hace", data.saysAndDoes], ["Pains", data.frustrations], ["Gains", data.motivations]]);
  y = writeSection(y, "5. Compra y consumo", [["Urgencia", data.urgency], ["Confianza", data.confidenceNeed], ["Sensibilidad al precio", data.priceSensitivity], ["Satisfaccion", data.satisfaction], ["Monetizacion", data.monetization], ["Frecuencia", data.frequency], ["Relacion reciente", data.recency], ["Prueba social", data.socialProofNeed]]);
  y = writeSection(y, "6. Funcionalidades web demandadas", [["Nivel principal", data.primaryLevel], ["Niveles secundarios", data.secondaryLevels], ["Pesos", data.levelWeights], ["Notas", data.pyramidNotes]]);
  y = writeSection(y, "7. Contenido digital", [["Distribucion de confianza", `Marca ${data.trustDistribution.brand}% · Producto ${data.trustDistribution.product}% · Experiencia ${data.trustDistribution.experience}%`], ["Modalidades", data.modalities], ["Formatos", data.formats], ["Temporalidad", data.temporality]]);
  y = writeSection(y, "8. Producto", [["Clasificacion", data.productClassification], ["Consecuencia de no compra", data.noBuyConsequence], ["Urgencia percibida", data.perceivedUrgency], ["Logica de compra", data.purchaseLogic]]);
  y = writeSection(y, "9. Marketing mix", [["Producto", data.marketingMix.product], ["Precio", data.marketingMix.price], ["Distribucion", data.marketingMix.place], ["Comunicacion", data.marketingMix.promotion]]);
  y = writeSection(y, "10. Canalidad", [["Terminales", data.terminals], ["Medios", data.media], ["Soportes", data.supports], ["Formatos de canal", data.channelFormats], ["Intenciones relacionales", data.intentions]]);
  y = writeSection(y, "11. Keywords", Object.entries(kw).map(([label, items]) => [label, items] as [string, unknown]));
  y = writeSection(y, "12. Topic clusters", clusters.map((cluster, index) => [`Cluster ${index + 1}`, `${cluster.pillar_topic}: ${cluster.subtopics.join(", ")}`] as [string, unknown]));
  y = writeSection(y, "13. KPIs", Object.entries(kpis).map(([label, items]) => [label, items] as [string, unknown]));
  y = writeSection(y, "14. Receta Doc ROI", [["Diagnostico", rx.diagnosis], ["Interpretacion", rx.interpretation], ["Impacto", rx.impact], ["Tipo de intervencion", rx.intervention_type], ["Prescripcion", rx.prescription], ["Siguiente paso", rx.next_step]]);
  writeSection(y, "15. JSON tecnico completo", [["JSON", JSON.stringify(json, null, 2)]]);

  doc.save(`DocROI_Buyer_Persona_${fileName(data)}.pdf`);
}
