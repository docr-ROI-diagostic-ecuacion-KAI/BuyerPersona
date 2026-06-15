import { deriveGains, derivePains, keywords, recommendedKpis, topicClusters } from "./lib/recommendations";
import { usePersonaStore } from "./store";

const styleId = "docroi-final-feedback-style";
let scheduled = false;

function isFinalStep() {
  return /ficha final/i.test(document.querySelector(".builder-head h2")?.textContent || "");
}

function esc(value: unknown) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char] || char));
}

function value(value: unknown, fallback = "pendiente de completar") {
  const clean = String(value || "").trim();
  return clean ? esc(clean) : `<span class="feedback-empty">${fallback}</span>`;
}

function join(items: unknown[], fallback = "pendiente de completar") {
  const clean = items.map((item) => String(item || "").trim()).filter(Boolean);
  return clean.length ? esc(clean.slice(0, 6).join(", ")) : `<span class="feedback-empty">${fallback}</span>`;
}

function dominantMarketingMix() {
  const mix = usePersonaStore.getState().data.marketingMix;
  const labels: Record<string, string> = { product: "producto", price: "precio", place: "distribución", promotion: "comunicación" };
  const winner = Object.entries(mix).sort((a, b) => b[1] - a[1])[0];
  return winner ? labels[winner[0]] : "pendiente";
}

function dominantContentForce() {
  const mix = usePersonaStore.getState().data.trustDistribution;
  const labels: Record<string, string> = { brand: "marca", product: "producto", experience: "experiencia" };
  const winner = Object.entries(mix).sort((a, b) => b[1] - a[1])[0];
  return winner ? labels[winner[0]] : "pendiente";
}

function productMeaning(productClass: string) {
  const normalized = productClass.toLowerCase();
  if (normalized.includes("aspirina") || normalized.includes("píldora") || normalized.includes("pildora")) return "una aspirina: resuelve un dolor o una urgencia inmediata";
  if (normalized.includes("vacuna")) return "una vacuna: previene riesgos y prepara capacidades futuras";
  if (normalized.includes("vitamina")) return "una vitamina: mejora, enriquece o potencia una situación";
  if (normalized.includes("tónico") || normalized.includes("tonico") || normalized.includes("experiencial") || normalized.includes("deseo")) return "un estimulante experiencial: activa deseo, identidad, ilusión o aspiración";
  return "un tipo de producto pendiente de precisar";
}

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .docroi-feedback-hidden { display: none !important; }
    .docroi-final-feedback {
      grid-column: 1 / -1;
      background: #fff;
      border: 1px solid #dce7ef;
      border-radius: 22px;
      padding: 20px;
      display: grid;
      gap: 16px;
      page-break-inside: avoid;
    }
    .docroi-feedback-head {
      background: #05070b;
      color: #fff;
      border-radius: 18px;
      padding: 20px;
      display: grid;
      gap: 8px;
    }
    .docroi-feedback-head span {
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
    .docroi-feedback-head h4 {
      margin: 0;
      color: #fff;
      font-size: clamp(28px, 4vw, 42px);
      line-height: 1.04;
      font-weight: 950;
    }
    .docroi-feedback-head p {
      margin: 0;
      color: #d8ecf8 !important;
      font-size: 15px !important;
      line-height: 1.65 !important;
    }
    .docroi-feedback-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
    .docroi-feedback-card {
      border: 1px solid #dce7ef;
      border-radius: 16px;
      background: #f8fafc;
      padding: 15px;
      display: grid;
      gap: 8px;
      align-content: start;
      page-break-inside: avoid;
    }
    .docroi-feedback-card strong {
      color: #003b5c;
      font-size: 17px;
      line-height: 1.15;
      font-weight: 950;
    }
    .docroi-feedback-card p {
      margin: 0;
      color: #475569 !important;
      font-size: 13px !important;
      line-height: 1.58 !important;
    }
    .docroi-feedback-card .key {
      color: #0f172a !important;
      font-weight: 850;
    }
    .feedback-empty {
      color: #94a3b8;
      font-style: italic;
    }
    .docroi-feedback-card.final {
      grid-column: 1 / -1;
      background: #05070b;
      color: #fff;
      border-color: #05070b;
    }
    .docroi-feedback-card.final strong,
    .docroi-feedback-card.final p,
    .docroi-feedback-card.final .key {
      color: #fff !important;
    }
    @media (max-width: 900px) {
      .docroi-feedback-grid { grid-template-columns: 1fr; }
    }
    @media print {
      .docroi-final-feedback { break-inside: avoid; page-break-inside: avoid; }
    }
  `;
  document.head.appendChild(style);
}

function feedbackHtml(signature: string) {
  const data = usePersonaStore.getState().data;
  const pains = derivePains(data);
  const gains = deriveGains(data);
  const kw = keywords(data);
  const clusters = topicClusters(data);
  const kpis = recommendedKpis(data);
  const contentForce = dominantContentForce();
  const mixForce = dominantMarketingMix();
  const selectedKeywords = [...kw.informational, ...kw.comparative, ...kw.transactional, ...kw.long_tail].filter(Boolean).slice(0, 8);
  const selectedKpis = [...(kpis.awareness || []), ...(kpis.engagement || []), ...(kpis.conversion || []), ...(kpis.relationship || [])].filter(Boolean).slice(0, 8);
  const channelRoute = [data.terminals?.[0], data.media?.[0], data.supports?.[0], data.channelFormats?.[0]].filter(Boolean).join(" → ");
  const clusterName = clusters[0]?.pillar_topic || "territorio semántico pendiente de completar";

  const cards = [
    ["1. Qué hemos comprendido", `Hemos comprendido que este Buyer Persona no es solo un perfil demográfico. Es un perfil humano y estratégico con contexto, generación digital, motivaciones, frenos y criterios de decisión. En este caso trabajamos con ${value(data.digitalGeneration)} para ${value(data.product)} dentro de ${value(data.sector)}.`, `Idea clave: necesitamos leer quién es, qué necesita, qué le preocupa, qué le atrae y qué relación puede construir con la marca.`],
    ["2. Mapa de empatía", `El mapa de empatía nos ayuda a salir de la mirada comercial y entrar en la mirada del cliente. Aquí observamos qué escucha, qué ve, qué piensa, qué siente, qué dice, qué hace y qué le frustra antes de decidir.`, `Señal detectada: ${value(data.thinksAndFeels || data.sees || data.hears)}`],
    ["3. Pains y gains", `Con los pains identificamos dolores, bloqueos, miedos o costes percibidos. Con los gains identificamos beneficios, deseos, mejoras o resultados esperados.`, `Pains: ${join(pains)}. Gains: ${join(gains)}.`],
    ["4. Propuesta de valor y producto", `Al cruzar pains y gains con la propuesta de valor entendemos qué representa realmente el producto para este perfil. Puede ser aspirina, vacuna, vitamina o estimulante experiencial.`, `Lectura actual: ${esc(productMeaning(data.productClassification))}. Producto: ${value(data.product)}.`],
    ["5. De necesidades a keywords", `Las keywords no aparecen aisladas. Nacen de necesidades, dolores, deseos, objeciones, preguntas, contexto e intención de búsqueda. Son señales de intención, no solo términos SEO.`, `Keywords detectadas: ${join(selectedKeywords)}.`],
    ["6. De keywords a contenido", `Una vez detectadas las keywords, podemos crear contenidos informativos, educativos, comparativos, comerciales, de confianza y de conversión. Así dejamos de publicar contenido genérico.`, `Territorio inicial: ${esc(clusterName)}.`],
    ["7. Ecosistema de necesidad", `El objetivo no es solo publicar. El objetivo es posicionar la marca dentro del ecosistema donde el cliente busca, compara, aprende, duda, valida y decide.`, `Conexión práctica: usar el cluster para ordenar contenido pilar, ramas y mensajes de confianza.`],
    ["8. Canalidad y journey", `La canalidad indica cómo debe circular la comunicación durante descubrimiento, consideración, comparación, decisión y fidelización. No basta decir redes sociales: hay que ordenar terminal, medio, soporte y formato.`, `Ruta detectada: ${channelRoute ? esc(channelRoute) : "pendiente de completar"}.`],
    ["9. Atracción comunicativa", `También hemos detectado qué puede atraer mejor al Buyer Persona: marca, producto o experiencia. Esta lectura ayuda a decidir si conviene comunicar autoridad, funcionalidad, prueba social, emoción o utilidad.`, `Fuerza dominante actual: ${esc(contentForce)}. Modalidades: ${join(data.modalities)}.`],
    ["10. Marketing mix", `El Buyer Persona permite ajustar producto, precio, distribución y comunicación. Ayuda a decidir cómo presentar la propuesta, qué sensibilidad puede tener ante precio o riesgo, qué canales facilitan acceso y qué mensaje genera confianza.`, `Palanca más marcada: ${esc(mixForce)}.`],
    ["11. KPIs", `Los KPIs convierten esta ficha en seguimiento. Permiten medir atención, interacción, conversión, aprendizaje, satisfacción, recurrencia, monetización y avance dentro del journey.`, `KPIs sugeridos: ${join(selectedKpis)}.`],
  ];

  return `
    <section class="docroi-final-feedback" data-docroi-final-feedback="1" data-docroi-signature="${esc(signature)}">
      <header class="docroi-feedback-head">
        <span>Feedback formativo interpretativo</span>
        <h4>Lectura guiada del diagnóstico</h4>
        <p>Este bloque interpreta lo que hemos aprendido durante el recorrido. No sustituye la ficha: la convierte en una base para decidir marketing, contenidos, ventas, canalidad, personalización y KPIs.</p>
      </header>
      <div class="docroi-feedback-grid">
        ${cards.map(([title, body, key]) => `<article class="docroi-feedback-card"><strong>${title}</strong><p>${body}</p><p class="key">${key}</p></article>`).join("")}
        <article class="docroi-feedback-card final"><strong>12. Conclusión estratégica</strong><p>En conjunto, esta ficha ofrece el arranque necesario para construir planes de marketing, planes comerciales, estrategia de contenidos, automatización, personalización, customer intelligence e incluso una primera planificación empresarial centrada en el cliente.</p><p class="key">No es solo una ficha descriptiva: es una herramienta para decidir mejor.</p></article>
      </div>
    </section>
  `;
}

function hideOldShortFeedback() {
  document.querySelectorAll<HTMLElement>(".dossier-card h4").forEach((title) => {
    if (/14\.\s*Informe Doc ROI integrado/i.test(title.textContent || "")) {
      title.closest("article")?.classList.add("docroi-feedback-hidden");
    }
  });
}

function enhanceFeedback() {
  scheduled = false;
  installStyles();
  if (!isFinalStep()) {
    document.querySelectorAll('[data-docroi-final-feedback="1"]').forEach((node) => node.remove());
    return;
  }
  hideOldShortFeedback();
  const grid = document.querySelector<HTMLElement>('[data-docroi-final-dossier="1"] .dossier-grid');
  if (!grid) return;
  const signature = JSON.stringify(usePersonaStore.getState().data);
  const existing = document.querySelector<HTMLElement>('[data-docroi-final-feedback="1"]');
  if (existing?.dataset.docroiSignature === signature) return;
  const html = feedbackHtml(signature);
  if (existing) existing.outerHTML = html;
  else grid.insertAdjacentHTML("beforeend", html);
}

function scheduleFeedback() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(enhanceFeedback);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleFeedback();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleFeedback).observe(root, { childList: true, subtree: true });
  usePersonaStore.subscribe(scheduleFeedback);
});

export {};
