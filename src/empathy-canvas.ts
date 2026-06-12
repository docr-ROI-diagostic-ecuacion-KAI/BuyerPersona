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
    .empathy-bridge.docroi-empathy-canvas {
      display: block !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      padding: 0 !important;
      color: #05070b !important;
      box-shadow: none !important;
      overflow: visible !important;
      text-align: left !important;
    }
    .empathy-bridge.docroi-empathy-canvas > :not(.docroi-empathy-infographic) {
      display: none !important;
    }
    .docroi-empathy-infographic {
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
      grid-template-columns: 138px 1fr;
      gap: 16px;
      align-items: center;
      background: #05070b;
      color: #ffffff;
      padding: 18px;
    }
    .docroi-empathy-head img {
      width: 128px;
      max-width: 100%;
      border-radius: 10px;
      display: block;
    }
    .docroi-empathy-head h4 {
      margin: 0;
      color: #ffffff;
      font-size: clamp(24px, 4.8vw, 42px);
      line-height: .95;
      font-weight: 900;
      letter-spacing: 0;
      text-transform: lowercase;
    }
    .docroi-empathy-head h4 span {
      color: #0b63ce;
    }
    .docroi-empathy-head p {
      margin: 8px 0 0;
      color: #eaf6fb;
      font-size: 14px;
      line-height: 1.35;
      font-weight: 700;
    }
    .docroi-empathy-body {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 14px;
      padding: 16px;
      background:
        radial-gradient(circle at 50% 260px, rgba(11,99,206,.11), transparent 260px),
        linear-gradient(180deg, #ffffff 0%, #f8fbfd 100%);
    }
    .docroi-persona-stage {
      display: grid;
      justify-items: center;
      gap: 10px;
      padding: 20px 14px;
      border: 1px solid #d8ecf8;
      border-radius: 20px;
      background: rgba(255,255,255,.92);
    }
    .docroi-persona-stage::before {
      content: "cliente / buyer persona";
      color: #003b5c;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: .04em;
      text-transform: uppercase;
    }
    .docroi-persona-stage img {
      width: min(210px, 62vw);
      height: min(210px, 62vw);
      border-radius: 999px;
      border: 3px solid #0b63ce;
      background: #eaf6fb;
      object-fit: cover;
      box-shadow: 0 10px 24px rgba(0, 59, 92, .14);
    }
    .docroi-persona-name {
      max-width: 260px;
      border-radius: 16px;
      background: #05070b;
      color: #ffffff;
      padding: 10px 14px;
      text-align: center;
      font-size: 18px;
      line-height: 1.1;
      font-weight: 900;
    }
    .docroi-info-card {
      border: 1px solid #dbe7f1;
      border-radius: 20px;
      background: rgba(255,255,255,.96);
      padding: 16px;
      box-shadow: none;
    }
    .docroi-info-card h5 {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0 0 8px;
      color: #05070b;
      font-size: 22px;
      line-height: 1.05;
      font-weight: 900;
      text-transform: lowercase;
    }
    .docroi-info-card h5 i,
    .docroi-channel h5 i {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #0b63ce;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-style: normal;
      font-size: 17px;
      flex: 0 0 auto;
    }
    .docroi-info-card ul,
    .docroi-channel ul {
      margin: 0;
      padding-left: 20px;
      display: grid;
      gap: 4px;
      color: #05070b;
    }
    .docroi-info-card li,
    .docroi-channel li {
      font-size: 14px;
      line-height: 1.34;
      font-weight: 600;
    }
    .docroi-reco-box {
      margin-top: 13px;
      border-radius: 16px;
      background: #f0f7fd;
      border: 1px solid #d8ecf8;
      padding: 13px;
      color: #003b5c;
    }
    .docroi-reco-box strong {
      display: block;
      color: #0b63ce;
      font-size: 14px;
      line-height: 1.2;
      margin-bottom: 8px;
      font-weight: 900;
      text-transform: lowercase;
    }
    .docroi-reco-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px 14px;
    }
    .docroi-reco-grid span {
      color: #05070b;
      font-size: 12px;
      line-height: 1.25;
      font-weight: 700;
    }
    .docroi-channel {
      border: 1px solid #d8ecf8;
      border-radius: 20px;
      background: #f8fbfd;
      padding: 16px;
    }
    .docroi-channel h5 {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0 0 12px;
      color: #05070b;
      font-size: 22px;
      line-height: 1.05;
      font-weight: 900;
      text-transform: lowercase;
    }
    .docroi-channel h5 span {
      color: #0b63ce;
    }
    .docroi-channel-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      border-top: 1px solid #d8ecf8;
      padding-top: 12px;
    }
    .docroi-channel-grid strong {
      display: block;
      color: #0b63ce;
      margin-bottom: 7px;
      font-size: 13px;
      font-weight: 900;
      text-transform: lowercase;
    }
    @media (max-width: 620px) {
      .docroi-empathy-head {
        grid-template-columns: 1fr;
        text-align: center;
        justify-items: center;
      }
      .docroi-reco-grid,
      .docroi-channel-grid {
        grid-template-columns: 1fr;
      }
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

function renderEmpathyCanvas() {
  installEmpathyCanvasStyles();
  if (!empathyStepIsActive()) return;

  const bridge = document.querySelector<HTMLElement>(".empathy-bridge");
  if (!bridge) return;

  const data = personaData();
  const avatar = avatarForPersona(data);
  const name = data.fictionalName || "cliente / buyer persona";
  const marker = `${avatar}|${name}|docroi-infographic-v1`;
  if (bridge.dataset.empathyCanvas === marker) return;

  bridge.dataset.empathyCanvas = marker;
  bridge.classList.add("docroi-empathy-canvas");
  bridge.innerHTML = `
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
        ${card("¿qué ve?", "◉", [
          "tendencias de moda y estilo en el mercado",
          "variedad de productos y colecciones",
          "escaparates, catálogos y campañas publicitarias",
          "marcas reconocidas y nuevas propuestas",
          "reseñas, valoraciones y recomendaciones",
          "comparativas de precios y calidad",
          "experiencias de otros clientes",
        ], ["modalidad: presencial · online · híbrida", "vídeos / reels", "contenido que consume antes de comprar", "web de marca", "reseñas", "marketplaces", "comparativas", "ugc / redes sociales"])}
        ${card("¿qué oye?", "◌", [
          "opiniones de amigos y entorno",
          "recomendaciones de influencers o expertos",
          "mensajes de marca",
          "comentarios sobre calidad, comodidad y estilo",
        ])}
        ${card("¿qué hace?", "↗", [
          "busca, compara y prueba",
          "consulta opiniones y precios",
          "visita tienda física o web",
        ], ["distribución física", "online", "telefónica", "híbrida"])}
        ${card("¿qué piensa y siente?", "♥", [
          "qué siente sobre el producto",
          "comodidad, estética y confianza",
          "qué piensa del precio",
          "si merece la inversión",
          "miedo a equivocarse",
          "deseo de acertar con la compra",
        ])}
        ${card("¿qué dice?", "●", [
          "cómo describe el producto",
          "qué comenta a otros",
          "qué objeciones verbaliza",
        ], ["cómo lo promociona", "qué lenguaje utiliza al recomendarlo"])}
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
