const marketingMixStyleId = "docroi-marketing-mix-style";

const mixItems = [
  {
    title: "Producto",
    body: "No es solo lo que se vende. Es la experiencia, la promesa de valor, la solución, el cambio percibido y la razón por la que el Buyer Persona considera que merece atención.",
    question: "¿El producto resuelve, mejora, previene o emociona?",
  },
  {
    title: "Precio",
    body: "No es solo una cifra. Es percepción de valor, riesgo, esfuerzo, comparación, accesibilidad y confianza. El precio cambia según la urgencia, el dolor y la prueba de valor disponible.",
    question: "¿El Buyer Persona lo percibe caro, justo, barato, arriesgado o valioso?",
  },
  {
    title: "Distribución",
    body: "No es solo canal de venta. Es acceso, disponibilidad, fricción, comodidad, proximidad, logística y facilidad para llegar a la propuesta en el momento adecuado.",
    question: "¿Dónde y cómo espera encontrar, probar, reservar, comprar o recibir la solución?",
  },
  {
    title: "Comunicación",
    body: "No es solo promoción. Es mensaje, narrativa, contenido, prueba, tono, canal, formato y argumento. Debe traducir el valor al lenguaje mental del Buyer Persona.",
    question: "¿Qué mensaje necesita para entender, confiar, desear o decidir?",
  },
];

let scheduled = false;

function marketingMixIsActive() {
  return /marketing mix/i.test(document.querySelector(".builder-head h2")?.textContent || "");
}

function installMarketingMixStyles() {
  if (document.getElementById(marketingMixStyleId)) return;
  const style = document.createElement("style");
  style.id = marketingMixStyleId;
  style.textContent = `
    .docroi-marketing-mix-step .form-grid > .form-grid.two {
      order: 1;
    }
    .docroi-marketing-mix-step .form-grid > .variable-help {
      order: 30;
      margin-top: 8px;
    }
    .docroi-marketing-mix-step .variable-help article {
      background: #f6f7f9 !important;
      border-color: #dce5ee !important;
      box-shadow: none !important;
    }
    .docroi-marketing-feed {
      display: grid;
      gap: 12px;
      margin-top: 14px;
      text-align: left;
    }
    .docroi-marketing-feed .feed-label {
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
    .docroi-marketing-feed h4 {
      margin: 0;
      color: #05070b;
      font-size: 22px;
      line-height: 1.08;
      font-weight: 950;
    }
    .docroi-marketing-feed p {
      margin: 0;
      color: #334155;
      font-size: 13px;
      line-height: 1.56;
    }
    .docroi-marketing-feed article {
      border: 1px solid #dce7ef;
      border-radius: 14px;
      background: #fff;
      padding: 12px;
      display: grid;
      gap: 5px;
    }
    .docroi-marketing-feed article strong {
      color: #003b5c;
      font-size: 14px;
      line-height: 1.15;
      font-weight: 950;
    }
    .docroi-marketing-feed article small {
      color: #475569;
      font-size: 12px;
      line-height: 1.45;
      font-weight: 700;
    }
    .docroi-marketing-feed .feed-dark {
      border-radius: 15px;
      background: #05070b;
      color: #fff;
      padding: 13px;
    }
    .docroi-marketing-feed .feed-dark strong,
    .docroi-marketing-feed .feed-dark p {
      color: #fff !important;
    }
  `;
  document.head.appendChild(style);
}

function feedHtml() {
  return `
    <div class="docroi-marketing-feed" data-docroi-marketing-feed="1">
      <span class="feed-label">Marketing mix · Kotler · Doc ROI</span>
      <h4>Las 4P como palancas de decisión</h4>
      <p>Philip Kotler popularizó el marketing mix como una forma de ordenar la propuesta de valor mediante producto, precio, distribución y comunicación. En Buyer Persona no se usa como teoría decorativa: sirve para traducir la percepción del cliente en decisiones concretas.</p>
      ${mixItems.map((item) => `
        <article>
          <strong>${item.title}</strong>
          <p>${item.body}</p>
          <small>${item.question}</small>
        </article>
      `).join("")}
      <div class="feed-dark"><strong>Lectura Doc ROI</strong><p>Si el producto se percibe como Aspirina, el mix debe reducir fricción y urgir acción. Si se percibe como Vacuna, debe construir confianza y prevención. Si es Vitamina, debe demostrar progreso. Si es Tónico reconstituyente, debe activar deseo, identidad y experiencia.</p></div>
    </div>
  `;
}

function enhanceMarketingMix() {
  scheduled = false;
  installMarketingMixStyles();
  const isActive = marketingMixIsActive();

  document.querySelectorAll(".wizard-card .form-section").forEach((section) => {
    section.classList.toggle("docroi-marketing-mix-step", isActive);
  });

  if (!isActive) {
    document.querySelectorAll('[data-docroi-marketing-feed="1"]').forEach((node) => node.remove());
    return;
  }

  const frame = document.querySelector<HTMLElement>(".summary-panel .education-frame");
  if (frame && !document.querySelector('[data-docroi-marketing-feed="1"]')) {
    frame.insertAdjacentHTML("beforeend", feedHtml());
  }
}

function scheduleMarketingMix() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(enhanceMarketingMix);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleMarketingMix();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleMarketingMix).observe(root, { childList: true, subtree: true });
});

export {};
