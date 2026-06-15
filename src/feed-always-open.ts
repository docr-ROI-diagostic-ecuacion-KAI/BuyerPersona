import { usePersonaStore } from "./store";

let scheduled = false;

const fallbackGuidance: Record<string, { title: string; body: string; points: string[] }> = {
  Compra: {
    title: "Como interpretar la compra",
    body: "Comprar no es solo pagar. Es reducir incertidumbre. Este apartado ayuda a leer urgencia, confianza, sensibilidad al precio, frecuencia, satisfaccion y prueba social.",
    points: ["Urgencia: cuanto necesita resolver ahora.", "Confianza: que evidencia necesita.", "Prueba social: cuanto pesa la validacion externa."],
  },
  Producto: {
    title: "Como traducir producto a valor",
    body: "El producto debe interpretarse como valor percibido: que problema resuelve, que cambio produce, que coste evita y que tipo de intervencion representa para el Buyer Persona.",
    points: ["Pildora: reduce incertidumbre.", "Vitamina: madura criterio.", "Vacuna: previene riesgos.", "Tonico: activa deseo, energia o aspiracion."],
  },
  Keywords: {
    title: "Keywords como lenguaje del cliente",
    body: "Las keywords son pistas de necesidad, dolor, deseo, objecion e intencion. Conectan Buyer Persona, contenido, busqueda, IA y posibilidad de posicionamiento.",
    points: ["Informativas: aprender y entender.", "Comparativas: evaluar alternativas.", "Transaccionales: avanzar hacia accion."],
  },
  KPIs: {
    title: "KPIs para decidir",
    body: "Los KPIs convierten la ficha en seguimiento. Sirven para saber si el perfil descubre, entiende, confia, interactua, convierte, repite o recomienda.",
    points: ["Awareness: descubre la propuesta.", "Engagement: muestra interes real.", "Conversion: realiza la accion esperada."],
  },
  "Ficha final": {
    title: "Como usar el entregable final",
    body: "La ficha final convierte el recorrido en un dossier reutilizable para clase, estrategia, contenidos, ventas, IA, automatizacion y toma de decisiones.",
    points: ["Resume identidad, empatia, canalidad y KPIs.", "Permite presentar y descargar la ficha.", "Convierte aprendizaje en criterio accionable."],
  },
  Herramientas: {
    title: "Herramientas de explotacion practica",
    body: "Este apartado concentra la salida operativa: PDF, JSON, prompts, llaves IA, activadores y elementos reutilizables para automatizacion.",
    points: ["PDF: presentacion y entrega.", "JSON: estructura tecnica reutilizable.", "Prompts y llaves IA: activacion del perfil."],
  },
};

function currentStep() {
  return (document.querySelector(".builder-head h2")?.textContent || "").trim();
}

function normalizeStep(step: string) {
  if (/compra/i.test(step)) return "Compra";
  if (/producto|ecosistema/i.test(step)) return "Producto";
  if (/keyword/i.test(step)) return "Keywords";
  if (/kpi/i.test(step)) return "KPIs";
  if (/herramient/i.test(step)) return "Herramientas";
  if (/ficha final|entregable final/i.test(step)) return "Ficha final";
  return step;
}

function openFeedIfClosed() {
  const panel = document.querySelector(".summary-panel");
  if (!panel) return;
  const frame = panel.querySelector(".education-frame");
  const toggle = panel.querySelector<HTMLButtonElement>(".guide-toggle");
  if (!frame && toggle) toggle.click();
}

function ensureFeedContent() {
  const step = normalizeStep(currentStep());
  const guidance = fallbackGuidance[step];
  if (!guidance) return;

  const frame = document.querySelector<HTMLElement>(".summary-panel .education-frame");
  if (!frame) return;

  let feed = frame.querySelector<HTMLElement>(".feed-note");
  if (!feed) {
    frame.insertAdjacentHTML("beforeend", `<div class="feed-note docroi-phase-guide"></div>`);
    feed = frame.querySelector<HTMLElement>(".feed-note");
  }
  if (!feed) return;

  const content = (feed.textContent || "").replace(/\s+/g, " ").trim();
  const looksEmpty = content.length < 24;
  const wrongGeneric = /como cumplimentarlo/i.test(content) && content.length < 220;
  if (!looksEmpty && !wrongGeneric) return;

  feed.classList.add("docroi-phase-guide", "docroi-identity-guide");
  feed.innerHTML = `
    <strong>${guidance.title}</strong>
    <p>${guidance.body}</p>
    <ul class="docroi-phase-list">
      ${guidance.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;
}

function forceFeed() {
  scheduled = false;
  openFeedIfClosed();
  window.setTimeout(ensureFeedContent, 0);
  window.setTimeout(() => {
    openFeedIfClosed();
    ensureFeedContent();
  }, 120);
  window.setTimeout(() => {
    openFeedIfClosed();
    ensureFeedContent();
  }, 420);
}

function scheduleFeed() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(forceFeed);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleFeed();
  document.addEventListener("click", (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (target?.closest(".step-list button, .wizard-actions button")) scheduleFeed();
  }, true);
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleFeed).observe(root, { childList: true, subtree: true });
  usePersonaStore.subscribe(scheduleFeed);
});

export {};
