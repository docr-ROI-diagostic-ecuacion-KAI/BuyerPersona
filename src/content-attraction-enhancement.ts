import { usePersonaStore } from "./store";

const styleId = "docroi-content-attraction-style";
let scheduled = false;

const forces = [
  {
    key: "brand",
    title: "Marca",
    microcopy: "Reputacion, prestigio, autoridad, identidad y confianza.",
    body: "El Buyer Persona se siente atraido por quien eres antes de analizar que vendes. La marca funciona como atajo de confianza, pertenencia o status.",
    example: "Ejemplo: confio en Apple, quiero Nike, Harvard me da autoridad.",
  },
  {
    key: "product",
    title: "Producto",
    microcopy: "Caracteristicas, funcionalidad, utilidad, calidad e innovacion.",
    body: "El Buyer Persona compara, analiza y decide por el valor funcional. Necesita entender que hace, como mejora su situacion y por que es mejor que la alternativa.",
    example: "Ejemplo: este software tiene la funcion exacta, estas zapatillas rinden mas.",
  },
  {
    key: "experience",
    title: "Experiencia",
    microcopy: "Testimonios, emociones, comunidad, vivencias y prueba social.",
    body: "El Buyer Persona conecta con lo que otras personas viven, recomiendan o cuentan. La decision se activa por identificacion, historia, emocion o validacion social.",
    example: "Ejemplo: todo el mundo habla bien, quiero vivir esa experiencia.",
  },
] as const;

type ForceKey = (typeof forces)[number]["key"];

function isActive() {
  return /^contenido$/i.test((document.querySelector(".builder-head h2")?.textContent || "").trim());
}

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .docroi-content-step .form-grid > .form-grid.three {
      display: none !important;
    }
    .docroi-content-attraction {
      order: 1;
      grid-column: 1 / -1;
      display: grid;
      gap: 14px;
    }
    .docroi-content-attraction .content-kicker,
    .docroi-content-feed .content-kicker {
      display: inline-flex;
      width: fit-content;
      padding: 7px 10px;
      border-radius: 999px;
      background: #eef4f7;
      color: #003b5c;
      font-size: 10px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    .docroi-attraction-summary {
      background: #05070b;
      color: #fff;
      border-radius: 18px;
      padding: 18px;
      display: grid;
      gap: 8px;
      border: 1px solid rgba(216,236,248,.22);
    }
    .docroi-attraction-summary strong {
      color: #fff;
      font-size: 24px;
      line-height: 1.12;
      font-weight: 950;
    }
    .docroi-attraction-summary p {
      margin: 0;
      color: #d8ecf8 !important;
      font-size: 14px !important;
      line-height: 1.5 !important;
    }
    .docroi-force-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }
    .docroi-force-card {
      background: #fff;
      border: 1px solid #dce7ef;
      border-radius: 18px;
      padding: 15px;
      display: grid;
      gap: 10px;
      align-content: start;
    }
    .docroi-force-card header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }
    .docroi-force-card h4 {
      margin: 0;
      color: #003b5c;
      font-size: 22px;
      line-height: 1.08;
      font-weight: 950;
    }
    .docroi-force-card output {
      color: #05070b;
      font-size: 20px;
      font-weight: 950;
    }
    .docroi-force-card p {
      margin: 0;
      color: #475569 !important;
      font-size: 13px !important;
      line-height: 1.48 !important;
    }
    .docroi-force-card small {
      color: #64748b;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 800;
    }
    .docroi-force-card input[type="range"] {
      width: 100%;
      accent-color: #003b5c;
    }
    .docroi-content-mix {
      display: grid;
      gap: 8px;
      padding: 14px;
      border: 1px solid #dce7ef;
      border-radius: 16px;
      background: #f6f7f9;
    }
    .docroi-content-mix-row {
      display: grid;
      grid-template-columns: 110px 1fr 50px;
      gap: 10px;
      align-items: center;
      color: #0f172a;
      font-size: 12px;
      font-weight: 900;
    }
    .docroi-content-mix-row i {
      height: 9px;
      border-radius: 999px;
      background: #dbe7ef;
      overflow: hidden;
      display: block;
    }
    .docroi-content-mix-row em {
      height: 100%;
      display: block;
      border-radius: 999px;
      background: #003b5c;
    }
    .docroi-content-step .multi {
      order: 8;
    }
    .docroi-content-step .variable-help {
      order: 20;
      grid-column: 1 / -1;
    }
    .docroi-content-feed {
      display: grid;
      gap: 12px;
      margin-top: 14px;
      text-align: left;
    }
    .docroi-content-feed h4 {
      margin: 0;
      color: #05070b;
      font-size: 22px;
      line-height: 1.08;
      font-weight: 950;
    }
    .docroi-content-feed p {
      margin: 0;
      color: #334155;
      font-size: 13px;
      line-height: 1.56;
    }
    .docroi-content-feed article {
      border: 1px solid #dce7ef;
      border-radius: 14px;
      background: #fff;
      padding: 12px;
      display: grid;
      gap: 5px;
    }
    .docroi-content-feed article strong {
      color: #003b5c;
      font-size: 14px;
      line-height: 1.15;
      font-weight: 950;
    }
    .docroi-content-feed .feed-dark {
      border-radius: 15px;
      background: #05070b;
      color: #fff;
      padding: 13px;
    }
    .docroi-content-feed .feed-dark strong,
    .docroi-content-feed .feed-dark p {
      color: #fff !important;
    }
    @media (max-width: 900px) {
      .docroi-force-grid { grid-template-columns: 1fr; }
      .docroi-content-mix-row { grid-template-columns: 92px 1fr 45px; }
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char] || char));
}

function getMix() {
  return usePersonaStore.getState().data.trustDistribution;
}

function dominantForce() {
  const mix = getMix();
  const entries = forces.map((force) => ({ ...force, value: Number(mix[force.key] || 0) })).sort((a, b) => b.value - a.value);
  return entries[0];
}

function interpretation() {
  const dominant = dominantForce();
  if (dominant.key === "brand") return "Este Buyer Persona responde principalmente a estimulos de marca. La comunicacion debe apoyarse en reputacion, autoridad, identidad, confianza y posicionamiento.";
  if (dominant.key === "product") return "Este Buyer Persona responde principalmente al valor funcional del producto. La comunicacion debe destacar utilidad, caracteristicas, rendimiento, comparativas y prueba de valor.";
  return "Este Buyer Persona responde principalmente a estimulos de experiencia. La comunicacion deberia apoyarse en testimonios, emociones, casos reales, comunidad y vivencias compartidas.";
}

function updateForce(key: ForceKey, value: number) {
  const store = usePersonaStore.getState();
  store.update("trustDistribution", { ...store.data.trustDistribution, [key]: value });
}

function signature() {
  return JSON.stringify(usePersonaStore.getState().data.trustDistribution);
}

function builderHtml(sig: string) {
  const mix = getMix();
  const dominant = dominantForce();
  return `
    <section class="docroi-content-attraction" data-docroi-content-attraction="1" data-docroi-signature="${escapeHtml(sig)}">
      <span class="content-kicker">Preguntas guia · atraccion comunicativa</span>
      <div class="docroi-attraction-summary">
        <strong>Que activa realmente la atencion?</strong>
        <p>${escapeHtml(interpretation())}</p>
        <p>Fuerza dominante actual: ${escapeHtml(dominant.title)} (${dominant.value}%). No son fuerzas excluyentes: el valor esta en entender la mezcla.</p>
      </div>
      <div class="docroi-force-grid">
        ${forces.map((force) => `
          <article class="docroi-force-card">
            <header><h4>${force.title}</h4><output>${Number(mix[force.key] || 0)}%</output></header>
            <p>${force.body}</p>
            <small>${force.microcopy}</small>
            <input type="range" min="0" max="100" value="${Number(mix[force.key] || 0)}" data-content-force="${force.key}" aria-label="${force.title}">
            <small>${force.example}</small>
          </article>
        `).join("")}
      </div>
      <div class="docroi-content-mix">
        ${forces.map((force) => `<div class="docroi-content-mix-row"><span>${force.title}</span><i><em style="width:${Number(mix[force.key] || 0)}%"></em></i><b>${Number(mix[force.key] || 0)}%</b></div>`).join("")}
      </div>
    </section>
  `;
}

function feedHtml() {
  return `
    <div class="docroi-content-feed" data-docroi-content-feed="1">
      <span class="content-kicker">Contenido · atraccion psicologica</span>
      <h4>No es que contenido consume, sino que le atrae</h4>
      <p>La seccion Contenido debe leerse como un laboratorio de atraccion comunicativa. La pregunta clave es: que hace que este Buyer Persona preste atencion cuando una solucion se comunica?</p>
      <article><strong>Marca</strong><p>Algunos perfiles compran primero quien eres: reputacion, autoridad, confianza, status o pertenencia. Para ellos, el contenido debe reforzar identidad y posicionamiento.</p></article>
      <article><strong>Producto</strong><p>Otros perfiles necesitan entender la utilidad concreta: caracteristicas, rendimiento, funcionalidad, innovacion o calidad. Para ellos, funcionan demos, comparativas, pruebas y explicaciones.</p></article>
      <article><strong>Experiencia</strong><p>Otros conectan con testimonios, emociones, comunidad, recomendaciones y vivencias compartidas. Para ellos, la prueba social y el storytelling pesan mucho.</p></article>
      <div class="feed-dark"><strong>Ejemplo docente</strong><p>Nike puede activar marca, producto y experiencia. En un perfil pesa el logo; en otro, el rendimiento; en otro, la vivencia social. Disney suele cargar mas experiencia, con marca fuerte y producto como soporte.</p></div>
      <p>La mezcla cambia la narrativa: si domina Marca, habla de autoridad; si domina Producto, explica utilidad; si domina Experiencia, muestra historias, casos y comunidad.</p>
    </div>
  `;
}

function wireInputs() {
  document.querySelectorAll<HTMLInputElement>("[data-content-force]").forEach((input) => {
    input.oninput = () => updateForce(input.dataset.contentForce as ForceKey, Number(input.value));
  });
}

function enhanceContent() {
  scheduled = false;
  installStyles();
  const active = isActive();
  document.querySelectorAll(".wizard-card .form-section").forEach((section) => section.classList.toggle("docroi-content-step", active));
  if (!active) {
    document.querySelectorAll('[data-docroi-content-attraction="1"], [data-docroi-content-feed="1"]').forEach((node) => node.remove());
    return;
  }

  const sig = signature();
  const formGrid = document.querySelector<HTMLElement>(".wizard-card .form-section .form-grid");
  const existing = document.querySelector<HTMLElement>('[data-docroi-content-attraction="1"]');
  if (formGrid && existing?.dataset.docroiSignature !== sig) {
    const html = builderHtml(sig);
    if (existing) existing.outerHTML = html;
    else formGrid.insertAdjacentHTML("afterbegin", html);
  }
  wireInputs();

  const frame = document.querySelector<HTMLElement>(".summary-panel .education-frame");
  if (frame && !document.querySelector('[data-docroi-content-feed="1"]')) frame.insertAdjacentHTML("beforeend", feedHtml());
}

function scheduleContent() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(enhanceContent);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleContent();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleContent).observe(root, { childList: true, subtree: true });
  usePersonaStore.subscribe(scheduleContent);
});

export {};
