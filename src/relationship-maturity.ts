const relationshipMaturityStyleId = "docroi-relationship-maturity-style";

const relationshipLevels = [
  {
    key: "Acceso",
    label: "Acceso",
    body: "Necesita poder entrar, consultar, descargar, registrarse o conectar con el servicio sin fricción.",
  },
  {
    key: "Información",
    label: "Información",
    body: "Necesita comparar, entender precio, condiciones, disponibilidad, trazabilidad o valor antes de actuar.",
  },
  {
    key: "Transacción",
    label: "Transacción",
    body: "Necesita poder comprar, reservar, contratar, pagar, solicitar o completar una acción concreta.",
  },
  {
    key: "Relación",
    label: "Relación",
    body: "Demanda seguimiento, atención, CRM, comunicación personalizada, fidelización o acompañamiento.",
  },
  {
    key: "Experiencia",
    label: "Experiencia",
    body: "Valora fluidez, comodidad, coherencia, personalización, UX y sensación de servicio diferencial.",
  },
  {
    key: "Prescripción",
    label: "Prescripción",
    body: "Puede recomendar, valorar, compartir, generar prueba social o convertirse en embajador de marca.",
  },
  {
    key: "Autogestión",
    label: "Autogestión",
    body: "Quiere operar con autonomía: panel propio, autoservicio, automatización, APIs, IA o configuración personalizada.",
  },
];

const defaultWeights: Record<string, number> = {
  Acceso: 35,
  Información: 65,
  Transacción: 45,
  Relación: 55,
  Experiencia: 50,
  Prescripción: 25,
  Autogestión: 70,
};

let scheduled = false;

function storeApi() {
  return (window as any).__docroiPersonaStore;
}

function relationshipStepIsActive() {
  const title = document.querySelector(".builder-head h2")?.textContent || "";
  return /evoluci/i.test(title) || /relacional/i.test(title) || /funcionalidades/i.test(title) || /web demandadas/i.test(title);
}

function installRelationshipMaturityStyles() {
  if (document.getElementById(relationshipMaturityStyleId)) return;
  const style = document.createElement("style");
  style.id = relationshipMaturityStyleId;
  style.textContent = `
    .docroi-relationship-step .variable-help,
    .docroi-relationship-step .field:has(select) {
      display: none !important;
    }
    .docroi-relationship-maturity {
      display: grid;
      gap: 14px;
      order: -5;
    }
    .docroi-relationship-intro {
      border: 1px solid #dce7ef;
      border-radius: 18px;
      background: #fff;
      padding: 16px;
    }
    .docroi-relationship-intro h4 {
      margin: 0 0 8px;
      color: #05070b;
      font-size: 21px;
      line-height: 1.1;
      font-weight: 950;
    }
    .docroi-relationship-intro p {
      margin: 0;
      color: #4b5565;
      font-size: 14px;
      line-height: 1.55;
    }
    .docroi-relationship-summary {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .docroi-relationship-summary span {
      border: 1px solid #d8ecf8;
      background: #eaf6fb;
      color: #003b5c;
      border-radius: 999px;
      padding: 8px 11px;
      font-size: 12px;
      font-weight: 950;
    }
    .docroi-relationship-bars {
      display: grid;
      gap: 10px;
    }
    .docroi-relationship-bar {
      border: 1px solid #dce7ef;
      border-radius: 16px;
      background: #fff;
      padding: 14px;
      display: grid;
      gap: 8px;
      box-shadow: 0 10px 22px rgba(15,23,42,.04);
    }
    .docroi-relationship-bar header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .docroi-relationship-bar strong {
      color: #003b5c;
      font-size: 17px;
      font-weight: 950;
    }
    .docroi-relationship-bar b {
      color: #05070b;
      font-size: 14px;
      font-weight: 950;
    }
    .docroi-relationship-bar input {
      width: 100%;
      accent-color: #003b5c;
    }
    .docroi-relationship-bar p {
      margin: 0;
      color: #4b5565;
      font-size: 13px;
      line-height: 1.45;
    }
    .docroi-relationship-support {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      order: 30;
    }
    .docroi-relationship-support article {
      border: 1px solid #dce5ee;
      border-radius: 18px;
      background: #f6f7f9;
      padding: 15px;
      display: grid;
      gap: 7px;
    }
    .docroi-relationship-support strong {
      color: #003b5c;
      font-size: 18px;
      line-height: 1.1;
      font-weight: 950;
    }
    .docroi-relationship-support p {
      margin: 0;
      color: #4b5565;
      font-size: 13px;
      line-height: 1.45;
    }
    @media(max-width:720px){ .docroi-relationship-support{grid-template-columns:1fr;} }
  `;
  document.head.appendChild(style);
}

function normalizedWeights() {
  const data = storeApi()?.getState?.().data || {};
  const current = { ...(data.levelWeights || {}) } as Record<string, number>;
  relationshipLevels.forEach((level) => {
    if (typeof current[level.key] !== "number") current[level.key] = defaultWeights[level.key];
  });
  return current;
}

function ranked(weights: Record<string, number>) {
  return relationshipLevels
    .map((level) => ({ key: level.key, value: weights[level.key] || 0 }))
    .sort((a, b) => b.value - a.value);
}

function syncStore(weights: Record<string, number>) {
  const rank = ranked(weights);
  const primary = rank[0]?.key || "Información";
  const secondary = rank.slice(1, 4).filter((item) => item.value >= 40).map((item) => item.key);
  storeApi()?.getState?.().patch({ levelWeights: weights, primaryLevel: primary, secondaryLevels: secondary });
}

function panelHtml() {
  const weights = normalizedWeights();
  const rank = ranked(weights);
  const primary = rank[0]?.key || "Información";
  const secondary = rank.slice(1, 4).filter((item) => item.value >= 40).map((item) => item.key);
  syncStore(weights);

  return `
    <div class="docroi-relationship-maturity" data-docroi-relationship-maturity="1">
      <div class="docroi-relationship-intro">
        <h4>Funcionalidades web que demanda este Buyer Persona</h4>
        <p>Piensa en tu página web como una pirámide de necesidades funcionales: primero debe permitir acceso, después entregar información clara, facilitar interacción, transacción, relación, experiencia, prescripción y, cuando el perfil lo pida, autogestión. Ajusta la intensidad según lo que este Buyer Persona necesita para comunicarse, confiar y avanzar.</p>
      </div>
      <div class="docroi-relationship-summary">
        <span>Nivel dominante: ${primary}</span>
        ${secondary.map((item) => `<span>Secundario: ${item}</span>`).join("")}
      </div>
      <div class="docroi-relationship-bars">
        ${relationshipLevels.map((level) => `
          <section class="docroi-relationship-bar">
            <header><strong>${level.label}</strong><b>${weights[level.key]}%</b></header>
            <input type="range" min="0" max="100" value="${weights[level.key]}" data-relationship-level="${level.key}">
            <p>${level.body}</p>
          </section>
        `).join("")}
      </div>
    </div>
  `;
}

function supportHtml() {
  return `
    <div class="docroi-relationship-support" data-docroi-relationship-support="1">
      <article><strong>Funcionalidad dominante</strong><p>El nivel con mayor intensidad indica qué debe resolver primero la web para este Buyer Persona.</p></article>
      <article><strong>Funcionalidades secundarias</strong><p>Los niveles altos complementarios muestran si también necesita información, relación, experiencia, prueba social o autonomía.</p></article>
      <article><strong>Fricción web</strong><p>El problema aparece cuando la página ofrece menos funcionalidad de la que el usuario necesita para confiar o decidir.</p></article>
      <article><strong>Activación</strong><p>Esta lectura orienta UX, contenidos, formularios, CRM, automatización, atención y rutas de conversión.</p></article>
    </div>
  `;
}

function bindBars() {
  document.querySelectorAll<HTMLInputElement>("[data-relationship-level]").forEach((input) => {
    if (input.dataset.bound === "1") return;
    input.dataset.bound = "1";
    input.addEventListener("input", () => {
      const weights = normalizedWeights();
      weights[input.dataset.relationshipLevel || "Información"] = Number(input.value);
      syncStore(weights);
      const panel = document.querySelector<HTMLElement>('[data-docroi-relationship-maturity="1"]');
      if (panel) panel.outerHTML = panelHtml();
      bindBars();
    });
  });
}

function enhanceRelationshipStep() {
  scheduled = false;
  installRelationshipMaturityStyles();
  const isRelationship = relationshipStepIsActive();
  document.querySelectorAll(".wizard-card .form-section").forEach((section) => {
    section.classList.toggle("docroi-relationship-step", isRelationship);
  });

  if (!isRelationship) {
    document.querySelectorAll('[data-docroi-relationship-maturity="1"], [data-docroi-relationship-support="1"]').forEach((node) => node.remove());
    return;
  }

  const formGrid = document.querySelector<HTMLElement>(".wizard-card .form-section .form-grid");
  if (!formGrid) return;
  if (!document.querySelector('[data-docroi-relationship-maturity="1"]')) formGrid.insertAdjacentHTML("afterbegin", panelHtml());
  if (!document.querySelector('[data-docroi-relationship-support="1"]')) formGrid.insertAdjacentHTML("beforeend", supportHtml());
  bindBars();
}

function scheduleRelationshipStep() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(enhanceRelationshipStep);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleRelationshipStep();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleRelationshipStep).observe(root, { childList: true, subtree: true });
});

export {};
