const generationAvatars: Record<string, string> = {
  "Baby Boomer digital": "/avatars/baby-boomer.svg",
  "Generacion X digital": "/avatars/gen-x.svg",
  "Generación X digital": "/avatars/gen-x.svg",
  Millennial: "/avatars/millennial.svg",
  "Generacion Z": "/avatars/gen-z.svg",
  "Generación Z": "/avatars/gen-z.svg",
  "Alpha emergente": "/avatars/gen-alpha.svg",
};

const docRoiLogo = "https://docroi.marketing/wp-content/uploads/2026/05/Logo_Negro_DoC_ROI.jpg";

const fieldHelps: Record<string, string> = {
  "¿Qué piensa y siente?": "Describe preocupaciones, deseos, miedos, aspiraciones y percepción de valor. Ejemplo: teme equivocarse, busca comodidad, quiere acertar con una compra visible.",
  "¿Qué escucha?": "Anota influencias externas: amigos, expertos, influencers, profesorado, colegas, reseñas o mensajes de marca que condicionan su confianza.",
  "¿Qué ve?": "Incluye estímulos del entorno: tendencias, competidores, precios, productos, campañas, comparativas, reseñas y alternativas visibles.",
  "¿Qué dice y hace?": "Observa conducta visible: qué comenta, qué pregunta, qué objeciones verbaliza, qué compara y qué acciones realiza antes de decidir.",
  "Miedos y frustraciones": "Recoge pains: perder dinero, equivocarse, no entender, sentirse saturado, desconfiar o no encontrar una solución clara.",
  "Deseos y motivaciones": "Recoge gains: seguridad, claridad, reconocimiento, ahorro de tiempo, comodidad, confianza y sensación de haber elegido bien.",
};

function empathyStepIsActive(): boolean {
  return document.querySelector(".builder-head h2")?.textContent?.trim() === "Empatizar";
}

function personaData(): any {
  return (window as any).__docroiPersonaStore?.getState?.().data || {};
}

function avatarForPersona(data: any): string {
  return data.avatarUrl || generationAvatars[data.digitalGeneration] || "/avatars/millennial.svg";
}

function installEmpathyCanvasStyles() {
  if (document.getElementById("docroi-empathy-canvas-style")) return;
  const style = document.createElement("style");
  style.id = "docroi-empathy-canvas-style";
  style.textContent = `
    .empathy-bridge.docroi-empathy-hidden {
      display: none !important;
    }
    .docroi-empathy-sidebar {
      display: grid;
      gap: 12px;
      width: 100%;
    }
    .docroi-empathy-sidebar .docroi-empathy-infographic {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      border-radius: 22px;
      background: #ffffff;
      border: 1px solid #d8ecf8;
      box-shadow: none;
    }
    .docroi-empathy-head {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      align-items: center;
      justify-items: center;
      text-align: center;
      background: #05070b;
      color: #ffffff;
      padding: 16px 14px;
    }
    .docroi-empathy-head img {
      width: 112px;
      max-width: 100%;
      border-radius: 10px;
      display: block;
    }
    .docroi-empathy-head h4 {
      margin: 0;
      color: #ffffff;
      font-size: 28px;
      line-height: .96;
      font-weight: 900;
      letter-spacing: 0;
      text-transform: lowercase;
    }
    .docroi-empathy-head h4 span {
      color: #0b63ce;
    }
    .docroi-empathy-head p {
      margin: 6px 0 0;
      color: #eaf6fb;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 700;
    }
    .docroi-empathy-body {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 10px;
      padding: 12px;
      background: linear-gradient(180deg, #ffffff 0%, #f8fbfd 100%);
    }
    .docroi-persona-stage {
      display: grid;
      justify-items: center;
      gap: 8px;
      padding: 16px 12px;
      border: 1px solid #d8ecf8;
      border-radius: 18px;
      background: rgba(255,255,255,.94);
    }
    .docroi-persona-stage::before {
      content: "cliente / buyer persona";
      color: #003b5c;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: .04em;
      text-transform: uppercase;
    }
    .docroi-persona-stage img {
      width: 142px;
      height: 142px;
      border-radius: 999px;
      border: 3px solid #0b63ce;
      background: #eaf6fb;
      object-fit: cover;
      box-shadow: 0 10px 22px rgba(0, 59, 92, .12);
    }
    .docroi-persona-name {
      max-width: 230px;
      border-radius: 15px;
      background: #05070b;
      color: #ffffff;
      padding: 9px 12px;
      text-align: center;
      font-size: 16px;
      line-height: 1.1;
      font-weight: 900;
    }
    .docroi-info-card,
    .docroi-channel {
      border: 1px solid #dbe7f1;
      border-radius: 17px;
      background: rgba(255,255,255,.96);
      padding: 13px;
      box-shadow: none;
    }
    .docroi-info-card h5,
    .docroi-channel h5 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 7px;
      color: #05070b;
      font-size: 18px;
      line-height: 1.05;
      font-weight: 900;
      text-transform: lowercase;
    }
    .docroi-info-card h5 i,
    .docroi-channel h5 i {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #0b63ce;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-style: normal;
      font-size: 14px;
      flex: 0 0 auto;
    }
    .docroi-info-card ul,
    .docroi-channel ul {
      margin: 0;
      padding-left: 18px;
      display: grid;
      gap: 3px;
      color: #05070b;
    }
    .docroi-info-card li,
    .docroi-channel li {
      font-size: 12px;
      line-height: 1.32;
      font-weight: 600;
    }
    .docroi-reco-box {
      margin-top: 10px;
      border-radius: 14px;
      background: #f0f7fd;
      border: 1px solid #d8ecf8;
      padding: 10px;
      color: #003b5c;
    }
    .docroi-reco-box strong {
      display: block;
      color: #0b63ce;
      font-size: 12px;
      line-height: 1.2;
      margin-bottom: 7px;
      font-weight: 900;
      text-transform: lowercase;
    }
    .docroi-reco-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 5px;
    }
    .docroi-reco-grid span {
      color: #05070b;
      font-size: 11px;
      line-height: 1.25;
      font-weight: 700;
    }
    .docroi-channel h5 span {
      color: #0b63ce;
    }
    .docroi-channel-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      border-top: 1px solid #d8ecf8;
      padding-top: 10px;
    }
    .docroi-channel-grid strong {
      display: block;
      color: #0b63ce;
      margin-bottom: 6px;
      font-size: 12px;
      font-weight: 900;
      text-transform: lowercase;
    }
    .docroi-question-help {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-left: 7px;
      border-radius: 50%;
      background: #d8ecf8;
      color: #003b5c;
      font-size: 11px;
      font-weight: 900;
      vertical-align: middle;
      cursor: help;
    }
    .docroi-question-help::after {
      content: attr(data-help);
      position: absolute;
      left: 50%;
      bottom: calc(100% + 8px);
      z-index: 60;
      width: min(320px, 78vw);
      transform: translateX(-50%) translateY(4px);
      border-radius: 13px;
      background: rgba(5,7,11,.93);
      color: #ffffff;
      padding: 11px 13px;
      font-size: 12px;
      line-height: 1.42;
      font-weight: 700;
      opacity: 0;
      pointer-events: none;
      transition: opacity .16s ease, transform .16s ease;
    }
    .docroi-question-help:hover::after,
    .docroi-question-help:focus::after {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(style);
}

function card(title: string, icon: string, items: string[], reco?: string[]): string {
  return `
    <section class="docroi-info-card">
      <h5><i>${icon}</i>${title}</h5>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
      ${reco ? `<div class="docroi-reco-box"><strong>aportación doc roi · traducción digital</strong><div class="docroi-reco-grid">${reco.map((item) => `<span>${item}</span>`).join("")}</div></div>` : ""}
    </section>
  `;
}

function infographicHtml(avatar: string, name: string): string {
  return `
    <article class="docroi-empathy-infographic">
      <header class="docroi-empathy-head">
        <img src="${docRoiLogo}" alt="Doc ROI">
        <div>
          <h4>mapa de empatía · <span>doc roi</span></h4>
          <p>buyer persona · lectura humana + traducción digital</p>
        </div>
      </header>
      <div class="docroi-empathy-body">
        <section class="docroi-persona-stage">
          <img src="${avatar}" alt="${name}">
          <strong class="docroi-persona-name">${name}</strong>
        </section>
        ${card("¿qué ve?", "◉", ["tendencias de moda y estilo en el mercado", "variedad de productos y colecciones", "escaparates, catálogos y campañas publicitarias", "marcas reconocidas y nuevas propuestas", "reseñas, valoraciones y recomendaciones", "comparativas de precios y calidad", "experiencias de otros clientes"], ["modalidad: presencial · online · híbrida", "vídeos / reels", "contenido que consume antes de comprar", "web de marca", "reseñas", "marketplaces", "comparativas", "ugc / redes sociales"])}
        ${card("¿qué oye?", "◌", ["opiniones de amigos y entorno", "recomendaciones de influencers o expertos", "mensajes de marca", "comentarios sobre calidad, comodidad y estilo"])}
        ${card("¿qué hace?", "↗", ["busca, compara y prueba", "consulta opiniones y precios", "visita tienda física o web"], ["distribución física", "online", "telefónica", "híbrida"])}
        ${card("¿qué piensa y siente?", "♥", ["qué siente sobre el producto", "comodidad, estética y confianza", "qué piensa del precio", "si merece la inversión", "miedo a equivocarse", "deseo de acertar con la compra"])}
        ${card("¿qué dice?", "●", ["cómo describe el producto", "qué comenta a otros", "qué objeciones verbaliza"], ["cómo lo promociona", "qué lenguaje utiliza al recomendarlo"])}
        <section class="docroi-channel">
          <h5><i>⌘</i>canalidad · <span>aportación doc roi</span></h5>
          <div class="docroi-channel-grid">
            <div><strong>medios</strong><ul><li>Email</li><li>Web</li><li>Redes sociales</li><li>Canales audiovisuales</li><li>Apps</li><li>IA conversacional</li><li>Eventos</li><li>Podcasts</li><li>Comunidades</li></ul></div>
            <div><strong>intención</strong><ul><li>aprender</li><li>resolver</li><li>comparar</li><li>comprar</li><li>autoridad profesional</li><li>automatizar</li><li>delegar</li><li>mejorar productividad</li></ul></div>
          </div>
        </section>
      </div>
    </article>
  `;
}

function addQuestionHelps() {
  document.querySelectorAll<HTMLLabelElement>(".wizard-card label.field").forEach((label) => {
    const span = label.querySelector<HTMLElement>(":scope > span");
    if (!span || span.querySelector(".docroi-question-help")) return;
    const text = span.childNodes[0]?.textContent?.trim() || span.textContent?.trim() || "";
    const help = fieldHelps[text];
    if (!help) return;
    const icon = document.createElement("span");
    icon.className = "docroi-question-help";
    icon.textContent = "?";
    icon.tabIndex = 0;
    icon.setAttribute("data-help", help);
    span.appendChild(icon);
  });
}

function renderEmpathyCanvas() {
  installEmpathyCanvasStyles();
  if (!empathyStepIsActive()) return;

  document.querySelector<HTMLElement>(".empathy-bridge")?.classList.add("docroi-empathy-hidden");
  addQuestionHelps();

  const frame = document.querySelector<HTMLElement>(".summary-panel .education-frame");
  if (!frame) return;

  const data = personaData();
  const avatar = avatarForPersona(data);
  const name = data.fictionalName || "cliente / buyer persona";
  const marker = `${avatar}|${name}|sidebar-infographic-v1`;
  if (frame.dataset.empathySidebar === marker) return;

  frame.dataset.empathySidebar = marker;
  frame.innerHTML = `<div class="docroi-empathy-sidebar">${infographicHtml(avatar, name)}</div>`;
}

function scheduleEmpathyCanvas() {
  renderEmpathyCanvas();
  window.setTimeout(renderEmpathyCanvas, 80);
  window.setTimeout(renderEmpathyCanvas, 260);
  window.setTimeout(renderEmpathyCanvas, 800);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleEmpathyCanvas();
  const root = document.getElementById("root");
  if (root) {
    new MutationObserver(() => window.requestAnimationFrame(scheduleEmpathyCanvas)).observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});

window.addEventListener("hashchange", scheduleEmpathyCanvas);
