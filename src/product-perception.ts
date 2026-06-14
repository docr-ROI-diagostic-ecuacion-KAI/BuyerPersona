const productPerceptionStyleId = "docroi-product-perception-style";

const productTypes = [
  {
    id: "Aspirina",
    mark: "A",
    title: "Aspirina",
    short: "Solución inmediata a un dolor real, urgente y prioritario.",
    behavior: "Necesito resolver esto ya. No puedo seguir así.",
    examples: "crisis legal, soporte crítico, reparación urgente, caída operativa, tratamiento médico",
    variables: "urgencia alta, baja sensibilidad al precio, activación rápida, dolor percibido fuerte",
    strategy: "Mensajes directos, prueba rápida, promesa de alivio y foco en resolución inmediata.",
  },
  {
    id: "Vacuna",
    mark: "V",
    title: "Vacuna",
    short: "Herramienta preventiva para evitar riesgos y ganar seguridad futura.",
    behavior: "Prefiero prevenir. Quiero evitar problemas futuros.",
    examples: "seguros, ciberseguridad, backups, mantenimiento preventivo, compliance, formación preventiva",
    variables: "racionalidad, seguridad, confianza, comparación, necesidad de validación",
    strategy: "Mensajes racionales, prevención, confianza, escenarios de riesgo y coste de no actuar.",
  },
  {
    id: "Vitamina",
    mark: "M",
    title: "Vitamina",
    short: "Mejora positiva que potencia rendimiento, bienestar o crecimiento.",
    behavior: "No es imprescindible, pero me ayuda. Me aporta valor.",
    examples: "formación complementaria, productividad, coaching, gimnasio, libros, herramientas premium",
    variables: "crecimiento, mejora personal, desarrollo, engagement emocional moderado",
    strategy: "Mensajes de progreso, aprendizaje, mejora continua y valor acumulado.",
  },
  {
    id: "Tónico reconstituyente",
    mark: "T",
    title: "Tónico reconstituyente",
    short: "Impulso emocional, aspiracional y experiencial que revitaliza deseo e identidad.",
    behavior: "Me apetece. Quiero vivir esta experiencia. Me hace ilusión.",
    examples: "viaje aspiracional, lujo, coche premium, experiencia VIP, gadgets, escapadas emocionales",
    variables: "alta carga emocional, impulso, identidad, deseo aspiracional, baja racionalidad funcional",
    strategy: "Mensajes emocionales, identidad, ilusión, experiencia, exclusividad y narrativa aspiracional.",
  },
];

const supportCards = [
  ["Aspirina", "Dolor urgente. El contenido debe prometer alivio, rapidez, confianza inmediata y reducción clara del problema."],
  ["Vacuna", "Prevención. El contenido debe explicar riesgos, protección, seguridad futura y coste de no actuar."],
  ["Vitamina", "Mejora progresiva. El contenido debe hablar de crecimiento, rendimiento, aprendizaje y valor acumulado."],
  ["Tónico reconstituyente", "Deseo y experiencia. El contenido debe activar ilusión, identidad, recompensa, aspiración y disfrute."],
];

let scheduled = false;

function storeApi() {
  return (window as any).__docroiPersonaStore;
}

function productStepIsActive() {
  return /producto/i.test(document.querySelector(".builder-head h2")?.textContent || "");
}

function normalizeProductType(value: string) {
  if (value === "Estimulante experiencial" || value === "Deseo Premium" || value === "Viagra") return "Tónico reconstituyente";
  if (value === "Medicina" || value === "Píldora") return "Aspirina";
  return value || "Vitamina";
}

function currentProductType() {
  const raw = storeApi()?.getState?.().data?.productClassification || "Vitamina";
  const current = normalizeProductType(raw);
  if (current !== raw) storeApi()?.getState?.().update("productClassification", current);
  return current;
}

function selectedType() {
  return productTypes.find((item) => item.id === currentProductType()) || productTypes[2];
}

function installProductPerceptionStyles() {
  if (document.getElementById(productPerceptionStyleId)) return;
  const style = document.createElement("style");
  style.id = productPerceptionStyleId;
  style.textContent = `
    .docroi-product-step .field:has(select),
    .docroi-product-step .variable-help { display: none !important; }
    .docroi-product-perception { display: grid; gap: 14px; order: -5; }
    .docroi-product-intro { border: 1px solid #dce7ef; border-radius: 18px; background: #fff; padding: 16px; }
    .docroi-product-intro h4 { margin: 0 0 8px; color: #05070b; font-size: 20px; line-height: 1.12; font-weight: 950; }
    .docroi-product-intro p { margin: 0; color: #4b5565; font-size: 14px; line-height: 1.55; }
    .docroi-product-cards, .docroi-product-support { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .docroi-product-card { border: 1px solid #dce7ef; border-radius: 18px; background: #fff; padding: 15px; text-align: left; cursor: pointer; display: grid; gap: 9px; min-height: 190px; box-shadow: 0 10px 22px rgba(15, 23, 42, .04); }
    .docroi-product-card[aria-pressed="true"] { border-color: #003b5c; box-shadow: 0 0 0 3px rgba(0, 59, 92, .12), 0 14px 28px rgba(15, 23, 42, .08); }
    .docroi-product-card span { width: 34px; height: 34px; border-radius: 50%; background: #05070b; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 950; }
    .docroi-product-card strong, .docroi-product-support article strong { color: #003b5c; font-size: 18px; line-height: 1.1; font-weight: 950; }
    .docroi-product-card p, .docroi-product-support article p { margin: 0; color: #4b5565; font-size: 13px; line-height: 1.45; }
    .docroi-product-card small { color: #111827; font-size: 12px; line-height: 1.35; font-weight: 800; }
    .docroi-product-support { order: 30; }
    .docroi-product-support article { border: 1px solid #dce5ee; border-radius: 18px; background: #f6f7f9; padding: 15px; display: grid; gap: 8px; box-shadow: none; }
    .docroi-product-feed { display: grid; gap: 12px; text-align: left; }
    .docroi-product-feed .feed-label { display: inline-flex; width: fit-content; padding: 6px 10px; border-radius: 999px; background: #eef4f7; color: #111827; font-size: 10px; font-weight: 950; text-transform: uppercase; letter-spacing: .03em; }
    .docroi-product-feed h4 { margin: 0; color: #05070b; font-size: 22px; line-height: 1.08; font-weight: 950; }
    .docroi-product-feed p { margin: 0; color: #334155; font-size: 13px; line-height: 1.55; }
    .docroi-product-feed article { border: 1px solid #dce7ef; border-radius: 14px; background: #fff; padding: 12px; }
    .docroi-product-feed article strong { display: block; margin-bottom: 5px; color: #003b5c; font-size: 13px; font-weight: 950; }
    .docroi-product-feed article small { display: block; color: #475569; font-size: 12px; line-height: 1.45; font-weight: 700; }
    .docroi-product-feed .feed-dark { border-radius: 15px; background: #05070b; color: #fff; padding: 13px; }
    .docroi-product-feed .feed-dark strong, .docroi-product-feed .feed-dark p { color: #fff !important; }
    @media (max-width: 720px) { .docroi-product-cards, .docroi-product-support { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(style);
}

function supportHtml() {
  return `<div class="docroi-product-support" data-docroi-product-support="1">${supportCards.map(([title, body]) => `<article><strong>${title}</strong><p>${body}</p></article>`).join("")}</div>`;
}

function centralPanelHtml(current: string) {
  return `
    <div class="docroi-product-perception" data-docroi-product-perception="1">
      <div class="docroi-product-intro">
        <h4>¿Qué representa el producto para este Buyer Persona?</h4>
        <p>No todos los productos se compran igual. Selecciona cómo lo interpreta la persona en el momento de decidir: dolor urgente, prevención, mejora o tónico emocional/experiencial.</p>
      </div>
      <div class="docroi-product-cards">
        ${productTypes.map((item) => `
          <button type="button" class="docroi-product-card" data-product-type="${item.id}" aria-pressed="${item.id === current}">
            <span>${item.mark}</span><strong>${item.title}</strong><p>${item.short}</p><small>${item.behavior}</small>
          </button>`).join("")}
      </div>
    </div>`;
}

function feedHtml() {
  const selected = selectedType();
  return `
    <div class="docroi-product-feed" data-docroi-product-feed="1" data-current="${selected.id}">
      <span class="feed-label">Modelo de percepción del producto · Doc ROI</span>
      <h4>Cómo interpreta el Buyer Persona el producto</h4>
      <p>La pregunta real no es qué producto vendes, sino qué representa ese producto para la persona cuando decide. La percepción condiciona precio, urgencia, confianza, contenido, canal, conversión y keywords.</p>
      ${productTypes.map((item) => `<article><strong>${item.title}</strong><small>${item.short} Conducta típica: ${item.behavior} Variables: ${item.variables}.</small></article>`).join("")}
      <div class="feed-dark"><strong>Lectura de la opción seleccionada: ${selected.title}</strong><p>${selected.strategy}</p></div>
    </div>`;
}

function syncSelectedButtons() {
  const current = currentProductType();
  document.querySelectorAll<HTMLElement>(".docroi-product-card").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.productType === current));
  });
  const feed = document.querySelector<HTMLElement>('[data-docroi-product-feed="1"]');
  if (feed && feed.dataset.current !== current) feed.outerHTML = feedHtml();
}

function enhanceProductStep() {
  scheduled = false;
  installProductPerceptionStyles();
  const isProduct = productStepIsActive();

  document.querySelectorAll(".wizard-card .form-section").forEach((section) => {
    section.classList.toggle("docroi-product-step", isProduct);
  });

  if (!isProduct) {
    document.querySelectorAll('[data-docroi-product-perception="1"], [data-docroi-product-feed="1"], [data-docroi-product-support="1"]').forEach((node) => node.remove());
    return;
  }

  const formGrid = document.querySelector<HTMLElement>(".wizard-card .form-section .form-grid");
  if (formGrid && !document.querySelector('[data-docroi-product-perception="1"]')) formGrid.insertAdjacentHTML("afterbegin", centralPanelHtml(currentProductType()));
  if (formGrid && !document.querySelector('[data-docroi-product-support="1"]')) formGrid.insertAdjacentHTML("beforeend", supportHtml());

  const frame = document.querySelector<HTMLElement>(".summary-panel .education-frame");
  if (frame && frame.dataset.productModel !== currentProductType()) {
    frame.dataset.productModel = currentProductType();
    frame.innerHTML = feedHtml();
  }

  document.querySelectorAll<HTMLElement>(".docroi-product-card").forEach((button) => {
    if (button.dataset.bound === "1") return;
    button.dataset.bound = "1";
    button.addEventListener("click", () => {
      const value = button.dataset.productType || "Vitamina";
      storeApi()?.getState?.().update("productClassification", value);
      syncSelectedButtons();
    });
  });

  syncSelectedButtons();
}

function scheduleProductStep() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(enhanceProductStep);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleProductStep();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleProductStep).observe(root, { childList: true, subtree: true });
});

export {};
