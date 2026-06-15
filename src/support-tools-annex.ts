import { buildJson } from "./lib/recommendations";
import { usePersonaStore } from "./store";

const styleId = "docroi-support-tools-style";
let scheduled = false;

const blocks = [
  ["1. Contexto", "Producto, mercado, objetivo y cobertura. Es la base que evita construir una ficha bonita pero sin direccion de negocio.", "doc_roi_metadata · product_context"],
  ["2. Persona", "Identidad, generacion digital, rol, edad, contexto y lectura inicial del perfil.", "buyer_persona"],
  ["3. Necesidad", "Problema, preocupacion, ganancia, barrera, riesgo y confianza necesaria para avanzar.", "needs_and_value"],
  ["4. Empatia", "Pensamiento, emocion, escucha, entorno, conducta, pains, gains y semillas de lenguaje.", "empathy_map"],
  ["5. Comportamiento", "Señales de consumo, urgencia, sensibilidad, prueba social, frecuencia y diagnostico pedagogico.", "purchase_behavior"],
  ["6. Relacion con el dato", "Nivel principal, niveles secundarios, pesos de madurez y personalizacion esperada.", "data_relationship_pyramid"],
  ["7. Contenido", "Atraccion por marca, producto y experiencia, modalidades, formatos y temporalidad.", "digital_content"],
  ["8. Producto", "Clasificacion percibida, urgencia, consecuencia de no compra y mensaje dominante.", "product_need_classification"],
  ["9. Activacion", "Marketing mix, canalidad, keywords, clusters, KPIs, receta y exportaciones.", "marketing_mix · channel_architecture · keyword_simulation · topic_clusters · kpis"],
];

function isFinalStep() {
  return /ficha final/i.test(document.querySelector(".builder-head h2")?.textContent || "");
}

function esc(value: unknown) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char] || char));
}

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .builder-head h2[data-docroi-final-title="1"] { font-size: 0 !important; }
    .builder-head h2[data-docroi-final-title="1"]::after { content: "Ficha Buyer Persona"; font-size: clamp(38px, 5vw, 64px); }
    .docroi-support-annex {
      grid-column: 1 / -1;
      margin-top: 18px;
      background: #05070b;
      color: #fff;
      border-radius: 24px;
      padding: 24px;
      display: grid;
      gap: 18px;
      text-align: left;
      overflow: hidden;
      border: 1px solid rgba(216,236,248,.18);
    }
    .docroi-support-annex .annex-kicker {
      display: inline-flex;
      width: fit-content;
      padding: 7px 10px;
      border-radius: 999px;
      background: #eaf6fb;
      color: #003b5c;
      font-size: 10px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .05em;
    }
    .docroi-support-annex h3 {
      margin: 0;
      color: #fff;
      font-size: clamp(30px, 4vw, 46px);
      line-height: 1.02;
      font-weight: 950;
      letter-spacing: 0;
    }
    .docroi-support-annex p {
      margin: 0;
      color: #d8ecf8;
      font-size: 15px;
      line-height: 1.65;
      max-width: 980px;
    }
    .docroi-annex-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .docroi-annex-actions button {
      border: 0;
      border-radius: 999px;
      padding: 12px 16px;
      background: #fff;
      color: #003b5c;
      font-size: 13px;
      font-weight: 950;
      cursor: pointer;
    }
    .docroi-annex-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }
    .docroi-annex-grid article {
      background: #fff;
      color: #0f172a;
      border-radius: 16px;
      padding: 15px;
      display: grid;
      gap: 7px;
      align-content: start;
    }
    .docroi-annex-grid strong {
      color: #003b5c;
      font-size: 16px;
      line-height: 1.15;
      font-weight: 950;
    }
    .docroi-annex-grid p {
      color: #475569 !important;
      font-size: 12px !important;
      line-height: 1.48 !important;
    }
    .docroi-annex-grid code {
      display: block;
      white-space: normal;
      word-break: break-word;
      color: #0f172a;
      background: #eef4f7;
      border-radius: 10px;
      padding: 8px;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 800;
    }
    .docroi-annex-json {
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(216,236,248,.20);
      border-radius: 18px;
      padding: 16px;
      display: grid;
      gap: 10px;
    }
    .docroi-annex-json summary {
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      font-weight: 950;
    }
    .docroi-annex-json pre {
      margin: 0;
      max-height: 420px;
      overflow: auto;
      background: #020617;
      color: #e5edf4;
      border-radius: 14px;
      padding: 14px;
      font-size: 11px;
      line-height: 1.45;
    }
    @media (max-width: 900px) {
      .docroi-annex-grid { grid-template-columns: 1fr; }
    }
    @media print {
      .docroi-support-annex { break-before: page; page-break-before: always; background: #05070b !important; }
      .docroi-annex-actions, .docroi-annex-json { display: none !important; }
    }
  `;
  document.head.appendChild(style);
}

function annexHtml() {
  const json = buildJson(usePersonaStore.getState().data);
  return `
    <section class="docroi-support-annex" data-docroi-support-annex="1">
      <span class="annex-kicker">Anexo operativo · herramientas de soporte al modelo</span>
      <h3>Herramientas para activar la Ficha Buyer Persona</h3>
      <p>Este anexo separa la ficha del sistema operativo. Aqui viven las salidas tecnicas y pedagogicas que permiten copiar, descargar, explicar o reutilizar el modelo en IA, automatizacion, dashboards o documentacion docente.</p>
      <div class="docroi-annex-actions">
        <button type="button" data-docroi-copy-json="1">Copiar JSON completo</button>
        <button type="button" data-docroi-download-json="1">Descargar JSON</button>
        <button type="button" data-docroi-print-annex="1">Imprimir ficha</button>
      </div>
      <div class="docroi-annex-grid">
        ${blocks.map(([title, body, keys]) => `<article><strong>${esc(title)}</strong><p>${esc(body)}</p><code>${esc(keys)}</code></article>`).join("")}
      </div>
      <details class="docroi-annex-json">
        <summary>Ver estructura JSON completa y ordenada</summary>
        <pre><code>${esc(JSON.stringify(json, null, 2))}</code></pre>
      </details>
    </section>
  `;
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

function wireActions() {
  document.querySelectorAll<HTMLButtonElement>("[data-docroi-copy-json='1']").forEach((button) => { button.onclick = copyJson; });
  document.querySelectorAll<HTMLButtonElement>("[data-docroi-download-json='1']").forEach((button) => { button.onclick = downloadJson; });
  document.querySelectorAll<HTMLButtonElement>("[data-docroi-print-annex='1']").forEach((button) => { button.onclick = () => window.print(); });
}

function enhanceSupportAnnex() {
  scheduled = false;
  installStyles();
  const title = document.querySelector<HTMLElement>(".builder-head h2");
  if (title) title.toggleAttribute("data-docroi-final-title", isFinalStep());

  if (!isFinalStep()) {
    document.querySelectorAll('[data-docroi-support-annex="1"]').forEach((node) => node.remove());
    return;
  }

  const final = document.querySelector<HTMLElement>('[data-docroi-final-dossier="1"]');
  if (final && !document.querySelector('[data-docroi-support-annex="1"]')) {
    final.insertAdjacentHTML("afterend", annexHtml());
  }
  wireActions();
}

function scheduleAnnex() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(enhanceSupportAnnex);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleAnnex();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleAnnex).observe(root, { childList: true, subtree: true });
  usePersonaStore.subscribe(scheduleAnnex);
});

export {};
