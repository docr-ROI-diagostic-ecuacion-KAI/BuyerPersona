import { deriveGains, derivePains, keywords, topicClusters } from "./lib/recommendations";
import { usePersonaStore } from "./store";

const clustersStyleId = "docroi-topic-clusters-style";
let scheduled = false;

function clustersIsActive() {
  return /^clusters$/i.test((document.querySelector(".builder-head h2")?.textContent || "").trim());
}

function installClustersStyles() {
  if (document.getElementById(clustersStyleId)) return;
  const style = document.createElement("style");
  style.id = clustersStyleId;
  style.textContent = `
    .docroi-topic-clusters-step .form-grid {
      align-items: stretch;
    }
    .docroi-topic-clusters-step .docroi-cluster-builder {
      order: 1;
    }
    .docroi-topic-clusters-step .panel-grid {
      order: 20;
      background: #f6f7f9;
      border: 1px solid #dce5ee;
      border-radius: 16px;
      padding: 14px;
      margin-top: 8px;
    }
    .docroi-topic-clusters-step .panel-grid::before {
      content: "Etiquetas soporte · clusters generados desde la ficha";
      display: block;
      width: fit-content;
      margin: 0 0 10px;
      padding: 6px 10px;
      border-radius: 999px;
      background: #eaf3f7;
      color: #003b5c;
      font-size: 10px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .03em;
    }
    .docroi-topic-clusters-step .mini-panel {
      background: #ffffff !important;
      border-color: #dce5ee !important;
      box-shadow: none !important;
    }
    .docroi-cluster-builder {
      display: grid;
      gap: 14px;
      grid-column: 1 / -1;
    }
    .docroi-cluster-builder .cluster-label,
    .docroi-clusters-feed .cluster-label {
      display: inline-flex;
      width: fit-content;
      padding: 6px 10px;
      border-radius: 999px;
      background: #eef4f7;
      color: #111827;
      font-size: 10px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .03em;
    }
    .docroi-cluster-pillar {
      border: 2px solid #003b5c;
      background: #05070b;
      color: #fff;
      border-radius: 18px;
      padding: 18px;
      text-align: center;
      display: grid;
      gap: 8px;
    }
    .docroi-cluster-pillar strong {
      font-size: 24px;
      line-height: 1.1;
      font-weight: 950;
    }
    .docroi-cluster-pillar p {
      margin: 0;
      color: #e5edf4 !important;
      font-size: 14px !important;
      line-height: 1.45 !important;
    }
    .docroi-cluster-branches {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }
    .docroi-cluster-branches article {
      min-height: 150px;
      border: 1px solid #dce7ef;
      border-radius: 16px;
      background: #fff;
      padding: 14px;
      display: grid;
      gap: 8px;
      align-content: start;
    }
    .docroi-cluster-branches b {
      color: #003b5c;
      font-size: 16px;
      line-height: 1.16;
      font-weight: 950;
    }
    .docroi-cluster-branches span {
      color: #111827;
      font-size: 12px;
      font-weight: 950;
      text-transform: uppercase;
    }
    .docroi-cluster-branches p,
    .docroi-cluster-questions p {
      margin: 0;
      color: #475569 !important;
      font-size: 13px !important;
      line-height: 1.48 !important;
    }
    .docroi-cluster-questions {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
    }
    .docroi-cluster-questions article {
      background: #f6f7f9;
      border: 1px solid #dce5ee;
      border-radius: 14px;
      padding: 12px;
    }
    .docroi-cluster-questions strong {
      display: block;
      color: #003b5c;
      font-size: 14px;
      line-height: 1.18;
      margin-bottom: 5px;
      font-weight: 950;
    }
    .docroi-clusters-feed {
      display: grid;
      gap: 12px;
      margin-top: 14px;
      text-align: left;
    }
    .docroi-clusters-feed h4 {
      margin: 0;
      color: #05070b;
      font-size: 22px;
      line-height: 1.08;
      font-weight: 950;
    }
    .docroi-clusters-feed p {
      margin: 0;
      color: #334155;
      font-size: 13px;
      line-height: 1.56;
    }
    .docroi-clusters-feed article {
      border: 1px solid #dce7ef;
      border-radius: 14px;
      background: #fff;
      padding: 12px;
      display: grid;
      gap: 5px;
    }
    .docroi-clusters-feed article strong {
      color: #003b5c;
      font-size: 14px;
      line-height: 1.15;
      font-weight: 950;
    }
    .docroi-clusters-feed .feed-dark {
      border-radius: 15px;
      background: #05070b;
      color: #fff;
      padding: 13px;
    }
    .docroi-clusters-feed .feed-dark strong,
    .docroi-clusters-feed .feed-dark p {
      color: #fff !important;
    }
    @media (max-width: 900px) {
      .docroi-cluster-branches,
      .docroi-cluster-questions {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char] || char));
}

function getClusterModel() {
  const data = usePersonaStore.getState().data;
  const clusters = topicClusters(data);
  const kw = keywords(data);
  const pains = derivePains(data);
  const gains = deriveGains(data);
  const product = data.product || "producto";
  const persona = data.fictionalName || "Buyer Persona";
  const pillar = clusters[0]?.pillar_topic || `Guia estrategica sobre ${product}`;
  const branches = [
    {
      title: clusters[0]?.subtopics?.[0] || "Criterios de eleccion",
      keyword: kw.informational?.[0] || `que es ${product}`,
      body: pains[0] || "Sale del problema, la duda o la barrera que el Buyer Persona necesita resolver antes de confiar.",
    },
    {
      title: clusters[0]?.subtopics?.[2] || "Comparativa y alternativas",
      keyword: kw.comparative?.[0] || `mejor ${product}`,
      body: gains[0] || "Sale del beneficio esperado y permite crear contenido que compare opciones con criterio.",
    },
    {
      title: clusters[1]?.subtopics?.[1] || "Prueba, demo o decision",
      keyword: kw.transactional?.[1] || `solicitar demo ${product}`,
      body: data.trustTrigger || `Sale de la evidencia que ${persona} necesita para pasar de interes a accion.`,
    },
  ];
  return { data, pillar, branches };
}

function clusterBuilderHtml() {
  const { data, pillar, branches } = getClusterModel();
  const product = data.product || "producto";
  return `
    <div class="docroi-cluster-builder" data-docroi-cluster-builder="1">
      <span class="cluster-label">Preguntas guia · arquitectura semantica</span>
      <div class="docroi-cluster-pillar">
        <span>Content pillar principal</span>
        <strong>${escapeHtml(pillar)}</strong>
        <p>La pieza principal debe responder a la gran busqueda del cliente: que necesita entender, comparar o validar sobre ${escapeHtml(product)} antes de avanzar.</p>
      </div>
      <div class="docroi-cluster-branches">
        ${branches.map((branch, index) => `
          <article>
            <span>Rama ${index + 1}</span>
            <b>${escapeHtml(branch.title)}</b>
            <p><strong>Keyword:</strong> ${escapeHtml(branch.keyword)}</p>
            <p>${escapeHtml(branch.body)}</p>
          </article>
        `).join("")}
      </div>
      <div class="docroi-cluster-questions">
        <article><strong>Buyer Persona</strong><p>Que dolor, deseo, objecion o lenguaje aparece en la ficha.</p></article>
        <article><strong>Keyword</strong><p>Como buscaria esa necesidad una persona real en Google, YouTube, redes o IA.</p></article>
        <article><strong>Contenido</strong><p>Que pieza responde mejor: guia, comparativa, demo, caso, FAQ, video o landing.</p></article>
        <article><strong>Posicionamiento</strong><p>Que oportunidad tenemos de atraer demanda cualificada con keywords estrategicas.</p></article>
      </div>
    </div>
  `;
}

function clustersFeedHtml() {
  return `
    <div class="docroi-clusters-feed" data-docroi-clusters-feed="1">
      <span class="cluster-label">Topic cluster · SEO · Buyer Persona</span>
      <h4>Del Buyer Persona al posicionamiento</h4>
      <p>Un topic cluster no es una lista de posts. Es una arquitectura de autoridad: un contenido pilar ordena el tema principal y varias ramas responden preguntas, objeciones, comparativas y momentos de decision.</p>
      <article><strong>1. Nace del Buyer Persona</strong><p>El mapa de empatia, los pains, los gains y la necesidad central revelan que lenguaje usa el cliente y que problema quiere resolver.</p></article>
      <article><strong>2. Se traduce a keywords</strong><p>Las keywords estrategicas son las que el cliente realmente podria buscar cuando expresa dolor, comparacion, urgencia, confianza o deseo de solucion.</p></article>
      <article><strong>3. Se convierte en contenido</strong><p>El pilar responde la pregunta grande. Las ramas crean piezas derivadas: guias, comparativas, casos, demos, FAQs, reels, newsletters o landings.</p></article>
      <article><strong>4. Busca posicionamiento posible</strong><p>El objetivo no es prometer ranking, sino aumentar la probabilidad de aparecer en busquedas relevantes porque el contenido responde mejor a la intencion del Buyer Persona.</p></article>
      <div class="feed-dark"><strong>Lectura Doc ROI</strong><p>El contenido no atrae por volumen, atrae por precision. Si entendemos que busca, por que lo busca y que evidencia necesita, podemos conectar keyword, contenido y decision de negocio.</p></div>
    </div>
  `;
}

function enhanceClusters() {
  scheduled = false;
  installClustersStyles();
  const isActive = clustersIsActive();

  document.querySelectorAll(".wizard-card .form-section").forEach((section) => {
    section.classList.toggle("docroi-topic-clusters-step", isActive);
  });

  if (!isActive) {
    document.querySelectorAll('[data-docroi-cluster-builder="1"], [data-docroi-clusters-feed="1"]').forEach((node) => node.remove());
    return;
  }

  const formGrid = document.querySelector<HTMLElement>(".wizard-card .form-section .form-grid");
  const existingBuilder = document.querySelector<HTMLElement>('[data-docroi-cluster-builder="1"]');
  if (formGrid) {
    const html = clusterBuilderHtml();
    if (existingBuilder) existingBuilder.outerHTML = html;
    else formGrid.insertAdjacentHTML("afterbegin", html);
  }

  const frame = document.querySelector<HTMLElement>(".summary-panel .education-frame");
  const existingFeed = document.querySelector<HTMLElement>('[data-docroi-clusters-feed="1"]');
  if (frame) {
    const html = clustersFeedHtml();
    if (existingFeed) existingFeed.outerHTML = html;
    else frame.insertAdjacentHTML("beforeend", html);
  }
}

function scheduleClusters() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(enhanceClusters);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleClusters();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleClusters).observe(root, { childList: true, subtree: true });
  usePersonaStore.subscribe(scheduleClusters);
});

export {};
