import { exportPdf } from "./lib/exports";
import { buildJson } from "./lib/recommendations";
import { usePersonaStore } from "./store";

const styleId = "docroi-final-tools-step-separation-style";
const modeKey = "docroi-final-visible-panel";
let scheduled = false;

function getMode() {
  return sessionStorage.getItem(modeKey) === "tools" ? "tools" : "final";
}

function setMode(mode: "final" | "tools") {
  sessionStorage.setItem(modeKey, mode);
  usePersonaStore.getState().setStep(14);
  window.setTimeout(() => {
    document.getElementById("constructor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    scheduleSeparation();
  }, 0);
}

function esc(value: unknown) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char] || char));
}

function isFinalSlot() {
  return usePersonaStore.getState().currentStep === 14 || /ficha final|herramientas/i.test(document.querySelector(".builder-head h2")?.textContent || "");
}

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .docroi-support-annex { display: none !important; }
    .docroi-tools-step { grid-column: 1 / -1; background: #05070b; color: #fff; border-radius: 24px; padding: 24px; display: grid; gap: 18px; text-align: left; overflow: hidden; border: 1px solid rgba(216,236,248,.18); }
    .docroi-tools-step .tools-kicker { display: inline-flex; width: fit-content; padding: 7px 10px; border-radius: 999px; background: #eaf6fb; color: #003b5c; font-size: 10px; font-weight: 950; text-transform: uppercase; letter-spacing: .05em; }
    .docroi-tools-step h3 { margin: 0; color: #fff; font-size: clamp(34px, 5vw, 54px); line-height: 1.02; font-weight: 950; letter-spacing: 0; }
    .docroi-tools-step p { margin: 0; color: #d8ecf8; font-size: 15px; line-height: 1.65; max-width: 980px; }
    .docroi-tools-actions { display: flex; flex-wrap: wrap; gap: 10px; }
    .docroi-tools-actions button { border: 0; border-radius: 999px; padding: 12px 16px; background: #fff; color: #003b5c; font-size: 13px; font-weight: 950; cursor: pointer; }
    .docroi-tools-pack, .docroi-tools-schema { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .docroi-tools-schema { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .docroi-tools-pack article, .docroi-tools-schema article { background: #fff; color: #0f172a; border-radius: 16px; padding: 16px; display: grid; gap: 8px; align-content: start; border: 1px solid rgba(216,236,248,.72); }
    .docroi-tools-pack span { width: fit-content; border-radius: 999px; background: #eaf6fb; color: #003b5c; padding: 6px 9px; font-size: 9px; line-height: 1; font-weight: 950; text-transform: uppercase; letter-spacing: .04em; }
    .docroi-tools-pack strong, .docroi-tools-schema strong { color: #003b5c; font-size: 18px; line-height: 1.08; font-weight: 950; }
    .docroi-tools-pack p, .docroi-tools-schema p { color: #475569 !important; font-size: 12px !important; line-height: 1.48 !important; }
    .docroi-tools-pack code, .docroi-tools-schema code { display: block; white-space: normal; word-break: break-word; color: #0f172a; background: #eef4f7; border-radius: 10px; padding: 8px; font-size: 10px; line-height: 1.35; font-weight: 850; }
    .docroi-tools-json { background: rgba(255,255,255,.06); border: 1px solid rgba(216,236,248,.20); border-radius: 18px; padding: 16px; display: grid; gap: 10px; }
    .docroi-tools-json summary { color: #fff; cursor: pointer; font-size: 16px; font-weight: 950; }
    .docroi-tools-json pre { margin: 0; max-height: 420px; overflow: auto; background: #020617; color: #e5edf4; border-radius: 14px; padding: 14px; font-size: 11px; line-height: 1.45; }
    .docroi-final-panel-tools [data-docroi-final-dossier="1"],
    .docroi-final-panel-tools .export-grid,
    .docroi-final-panel-tools .kit-operativo,
    .docroi-final-panel-tools .technical-json,
    .docroi-final-panel-tools .docroi-final-feedback { display: none !important; }
    .docroi-final-panel-final .docroi-tools-step { display: none !important; }
    .step-list button[data-docroi-tools-button="1"] { display: flex !important; }
    .step-list button[data-docroi-tools-button="1"].active { background: #003b5c; color: #fff; }
    @media (max-width: 1100px) { .docroi-tools-pack { grid-template-columns: repeat(2, minmax(0, 1fr)); } .docroi-tools-schema { grid-template-columns: 1fr; } }
    @media (max-width: 760px) { .docroi-tools-pack { grid-template-columns: 1fr; } }
    @media print { .docroi-tools-step { break-before: page; page-break-before: always; background: #05070b !important; } .docroi-tools-actions, .docroi-tools-json { display: none !important; } }
  `;
  document.head.appendChild(style);
}

function downloadJson() {
  const data = buildJson(usePersonaStore.getState().data);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "docroi-buyer-persona.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function copyJson() {
  const data = buildJson(usePersonaStore.getState().data);
  await navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
}

function downloadPdf() {
  exportPdf(usePersonaStore.getState().data);
}

function toolsHtml() {
  const json = buildJson(usePersonaStore.getState().data);
  const schema = [
    ["Contexto", "Producto, mercado, objetivo y cobertura.", "doc_roi_metadata · product_context"],
    ["Persona", "Identidad, generación digital, rol y contexto.", "buyer_persona"],
    ["Necesidad", "Problema, ganancia, barrera, riesgo y confianza.", "needs_and_value"],
    ["Empatía", "Pensamiento, emoción, escucha, entorno, conducta, pains y gains.", "empathy_map"],
    ["Relación y consumo", "Señales de compra, madurez relacional y personalización esperada.", "purchase_behavior · data_relationship_pyramid"],
    ["Activación", "Contenido, canalidad, keywords, clusters, KPIs y receta.", "digital_content · channels · keywords · kpis"],
  ];
  return `
    <section class="docroi-tools-step" data-docroi-tools-step="1">
      <span class="tools-kicker">15 · Herramientas</span>
      <h3>15. Herramientas</h3>
      <p>Espacio final de explotación práctica de la ficha: descarga PDF, copia y descarga JSON, estructura técnica, prompts, llaves IA, activadores operativos y recursos reutilizables para automatización.</p>
      <div class="docroi-tools-actions">
        <button type="button" data-docroi-tools-print="1">Descargar ficha PDF seleccionable</button>
        <button type="button" data-docroi-tools-copy="1">Copiar JSON completo</button>
        <button type="button" data-docroi-tools-download="1">Descargar JSON</button>
      </div>
      <div class="docroi-tools-pack">
        <article><span>Prompts</span><strong>Prompts reutilizables</strong><p>Salidas listas para pedir a la IA contenidos, anuncios, emails, guiones, landing, SEO y argumentarios comerciales.</p><code>brief · copy · email · landing · SEO · ventas</code></article>
        <article><span>Llaves IA</span><strong>Variables que activan criterio</strong><p>Campos que deben viajar a cualquier prompt para mantener coherencia: pains, gains, generación, canalidad, producto, keywords y nivel relacional.</p><code>pains · gains · canal · keyword · relación · producto</code></article>
        <article><span>Activadores</span><strong>Señales operativas</strong><p>Condiciones que disparan una recomendación: urgencia alta, confianza baja, sensibilidad al precio, fricción de canal o intención transaccional.</p><code>urgencia · confianza · precio · fricción · intención</code></article>
        <article><span>Automatización</span><strong>Elementos exportables</strong><p>Base para CRM, n8n, dashboards, documentación docente, IA conversacional y sistemas internos de seguimiento del Buyer Persona.</p><code>CRM · n8n · dashboard · documentación · IA</code></article>
      </div>
      <div class="docroi-tools-schema">
        ${schema.map(([title, body, keys]) => `<article><strong>${esc(title)}</strong><p>${esc(body)}</p><code>${esc(keys)}</code></article>`).join("")}
      </div>
      <details class="docroi-tools-json">
        <summary>Ver JSON técnico generado</summary>
        <pre><code>${esc(JSON.stringify(json, null, 2))}</code></pre>
      </details>
    </section>
  `;
}

function ensureStepButtons() {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".step-list button"));
  const finalButton = buttons.find((button) => /ficha final/i.test(button.textContent || ""));
  if (!finalButton) return;

  const finalNumber = finalButton.querySelector("span");
  if (finalNumber) finalNumber.textContent = "14";
  finalButton.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && /Ficha final/i.test(node.textContent || "")) node.textContent = "Ficha final";
  });
  finalButton.onclick = (event) => {
    event.preventDefault();
    setMode("final");
  };

  let toolsButton = document.querySelector<HTMLButtonElement>('[data-docroi-tools-button="1"]');
  if (!toolsButton) {
    toolsButton = finalButton.cloneNode(true) as HTMLButtonElement;
    toolsButton.dataset.docroiToolsButton = "1";
    const number = toolsButton.querySelector("span");
    if (number) number.textContent = "15";
    toolsButton.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) node.textContent = "Herramientas";
    });
    finalButton.insertAdjacentElement("afterend", toolsButton);
  }
  toolsButton.onclick = (event) => {
    event.preventDefault();
    setMode("tools");
  };
}

function updateHead() {
  const title = document.querySelector<HTMLElement>(".builder-head h2");
  const progressMeta = document.querySelector<HTMLElement>(".progress-meta span");
  const progressBar = document.querySelector<HTMLElement>(".progress-track div");
  if (!title || !isFinalSlot()) return;
  if (getMode() === "tools") {
    title.textContent = "Herramientas";
    if (progressMeta) progressMeta.textContent = "Paso 15 de 15";
    if (progressBar) progressBar.style.width = "100%";
  } else {
    title.textContent = "Ficha final";
    if (progressMeta) progressMeta.textContent = "Paso 14 de 15";
    if (progressBar) progressBar.style.width = "93%";
  }
}

function removeInnerNumbering() {
  if (getMode() !== "final") return;
  document.querySelectorAll<HTMLElement>(".docroi-final-dossier h4, .docroi-final-feedback h4, .docroi-final-feedback span").forEach((node) => {
    const text = (node.textContent || "").trim();
    if (/^14\s*[\.·]/.test(text)) node.textContent = text.replace(/^14\s*[\.·]\s*/, "");
  });
}

function ensureToolsContent() {
  const grid = document.querySelector<HTMLElement>(".wizard-card .form-section .form-grid");
  if (!grid) return;
  let tools = document.querySelector<HTMLElement>('[data-docroi-tools-step="1"]');
  if (!tools) {
    grid.insertAdjacentHTML("beforeend", toolsHtml());
    tools = document.querySelector<HTMLElement>('[data-docroi-tools-step="1"]');
  }
  document.querySelectorAll<HTMLButtonElement>('[data-docroi-tools-print="1"]').forEach((button) => { button.onclick = downloadPdf; });
  document.querySelectorAll<HTMLButtonElement>('[data-docroi-tools-copy="1"]').forEach((button) => { button.onclick = copyJson; });
  document.querySelectorAll<HTMLButtonElement>('[data-docroi-tools-download="1"]').forEach((button) => { button.onclick = downloadJson; });
}

function applyPanelMode() {
  document.querySelectorAll<HTMLElement>(".wizard-card .form-section").forEach((section) => {
    section.classList.toggle("docroi-final-panel-tools", isFinalSlot() && getMode() === "tools");
    section.classList.toggle("docroi-final-panel-final", isFinalSlot() && getMode() === "final");
  });
  document.querySelectorAll<HTMLButtonElement>(".step-list button").forEach((button) => {
    if (button.dataset.docroiToolsButton === "1") button.classList.toggle("active", isFinalSlot() && getMode() === "tools");
    else if (/ficha final/i.test(button.textContent || "")) button.classList.toggle("active", isFinalSlot() && getMode() === "final");
  });
}

function separateFinalAndTools() {
  scheduled = false;
  installStyles();
  ensureStepButtons();
  updateHead();
  if (isFinalSlot()) ensureToolsContent();
  applyPanelMode();
  removeInnerNumbering();
}

function scheduleSeparation() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(separateFinalAndTools);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleSeparation();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleSeparation).observe(root, { childList: true, subtree: true, characterData: true });
  usePersonaStore.subscribe(scheduleSeparation);
});

export {};
