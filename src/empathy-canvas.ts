const generationAvatars: Record<string, string> = {
  "Baby Boomer digital": "/avatars/baby-boomer.svg",
  "Generacion X digital": "/avatars/gen-x.svg",
  "Generación X digital": "/avatars/gen-x.svg",
  Millennial: "/avatars/millennial.svg",
  "Generacion Z": "/avatars/gen-z.svg",
  "Generación Z": "/avatars/gen-z.svg",
  "Alpha emergente": "/avatars/gen-alpha.svg",
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

function info(label: string): string {
  return `<span class="docroi-empathy-help" data-help="${label}">?</span>`;
}

function card(title: string, help: string, items: string[], recommendation?: string): string {
  return `
    <div class="docroi-empathy-card-inner">
      <h4>${title} ${info(help)}</h4>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
      ${recommendation ? `<div class="docroi-reco"><span>recomendación doc roi</span>${recommendation}</div>` : ""}
    </div>
  `;
}

function installEmpathyCanvasStyles() {
  if (document.getElementById("docroi-empathy-canvas-style")) return;
  const style = document.createElement("style");
  style.id = "docroi-empathy-canvas-style";
  style.textContent = `
    .empathy-bridge.docroi-empathy-canvas {
      position: relative;
      display: grid !important;
      grid-template-columns: 1fr 1.1fr 1fr !important;
      grid-template-areas:
        "think think think"
        "hear center see"
        "say center say"
        "pain need gain" !important;
      gap: 10px !important;
      overflow: hidden;
      border: 14px solid #05070b;
      border-radius: 26px;
      background:
        linear-gradient(135deg, transparent 49.5%, rgba(5,7,11,.12) 50%, transparent 50.5%),
        linear-gradient(45deg, transparent 49.5%, rgba(5,7,11,.08) 50%, transparent 50.5%),
        #ffffff !important;
      color: #05070b !important;
      padding: 14px !important;
      min-height: 610px;
      box-shadow: none !important;
    }
    .empathy-bridge.docroi-empathy-canvas::before {
      content: "mapa de empatía · buyer persona · lectura humana + traducción digital";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 54px;
      display: flex;
      align-items: center;
      padding: 0 22px;
      background: #05070b;
      color: #ffffff;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: .01em;
      z-index: 0;
    }
    .empathy-bridge.docroi-empathy-canvas > div {
      position: relative;
      z-index: 1;
      border: 1px solid #d8ecf8 !important;
      border-radius: 16px !important;
      background: rgba(255,255,255,.97) !important;
      color: #003b5c !important;
      display: block !important;
      text-align: left !important;
      padding: 13px !important;
      min-height: 126px;
      font-size: 13px !important;
      line-height: 1.38 !important;
      font-weight: 700 !important;
      box-shadow: none !important;
    }
    .empathy-bridge.docroi-empathy-canvas .bridge-top {
      grid-area: think !important;
      margin-top: 52px;
      min-height: 148px;
    }
    .empathy-bridge.docroi-empathy-canvas .bridge-left { grid-area: hear !important; }
    .empathy-bridge.docroi-empathy-canvas .bridge-right { grid-area: see !important; }
    .empathy-bridge.docroi-empathy-canvas .bridge-bottom { grid-area: say !important; }
    .empathy-bridge.docroi-empathy-canvas .bridge-center {
      grid-area: center !important;
      display: grid !important;
      align-content: center !important;
      justify-items: center !important;
      gap: 8px !important;
      min-height: 282px;
      text-align: center !important;
      background: linear-gradient(180deg, #ffffff, #f6fbfe) !important;
      border-color: #b9dcf0 !important;
      padding: 18px !important;
    }
    .empathy-bridge.docroi-empathy-canvas .bridge-pain { grid-area: pain !important; }
    .empathy-bridge.docroi-empathy-canvas .bridge-need {
      grid-area: need !important;
      background: #05070b !important;
      border-color: #05070b !important;
      color: #d8ecf8 !important;
    }
    .empathy-bridge.docroi-empathy-canvas .bridge-gain { grid-area: gain !important; }
    .docroi-empathy-card-inner h4 {
      display: flex;
      align-items: center;
      gap: 7px;
      margin: 0 0 7px;
      color: #05070b;
      font-size: 15px;
      line-height: 1.1;
      font-weight: 900;
      text-transform: uppercase;
    }
    .bridge-need .docroi-empathy-card-inner h4 {
      color: #ffffff;
    }
    .docroi-empathy-card-inner ul {
      display: grid;
      gap: 4px;
      margin: 0;
      padding-left: 16px;
      color: #05070b;
    }
    .bridge-need .docroi-empathy-card-inner ul {
      color: #eaf6fb;
    }
    .docroi-empathy-card-inner li {
      font-size: 12px;
      line-height: 1.32;
      font-weight: 650;
    }
    .docroi-reco {
      margin-top: 9px;
      border: 1px solid #b9dcf0;
      border-radius: 12px;
      background: #f6fbfe;
      color: #003b5c;
      padding: 8px 9px;
      font-size: 11px;
      line-height: 1.32;
      font-weight: 800;
    }
    .bridge-need .docroi-reco {
      background: rgba(216,236,248,.1);
      color: #f6fbfe;
      border-color: rgba(216,236,248,.22);
    }
    .docroi-reco span {
      display: block;
      color: #0b63ce;
      font-size: 10px;
      font-weight: 900;
      margin-bottom: 3px;
      text-transform: uppercase;
    }
    .bridge-need .docroi-reco span {
      color: #d8ecf8;
    }
    .docroi-empathy-help {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #d8ecf8;
      color: #003b5c;
      font-size: 10px;
      font-weight: 900;
      flex: 0 0 auto;
    }
    .docroi-empathy-help::after {
      content: attr(data-help);
      position: absolute;
      left: 50%;
      bottom: calc(100% + 8px);
      width: min(260px, 72vw);
      transform: translateX(-50%) translateY(4px);
      border-radius: 12px;
      background: rgba(5,7,11,.92);
      color: #fff;
      padding: 10px 12px;
      font-size: 11px;
      line-height: 1.4;
      font-weight: 700;
      text-transform: none;
      opacity: 0;
      pointer-events: none;
      transition: opacity .16s ease, transform .16s ease;
      z-index: 40;
    }
    .docroi-empathy-help:hover::after {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .docroi-empathy-kicker {
      color: #003b5c;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: .04em;
      text-transform: uppercase;
    }
    .docroi-empathy-avatar {
      width: 138px;
      height: 138px;
      border-radius: 999px;
      border: 3px solid #0b63ce;
      background: #eaf6fb;
      object-fit: cover;
      box-shadow: 0 8px 18px rgba(0, 59, 92, .12);
    }
    .docroi-empathy-name {
      max-width: 190px;
      border-radius: 16px;
      background: #05070b;
      color: #fff;
      padding: 9px 12px;
      font-size: 14px;
      line-height: 1.1;
      font-weight: 900;
      text-align: center;
    }
    @media (max-width: 720px) {
      .empathy-bridge.docroi-empathy-canvas {
        grid-template-columns: 1fr !important;
        grid-template-areas:
          "think"
          "center"
          "hear"
          "see"
          "say"
          "pain"
          "need"
          "gain" !important;
        min-height: 0;
      }
      .empathy-bridge.docroi-empathy-canvas .bridge-center {
        min-height: 220px;
      }
      .docroi-empathy-avatar {
        width: 116px;
        height: 116px;
      }
    }
  `;
  document.head.appendChild(style);
}

function renderEmpathyCanvas() {
  installEmpathyCanvasStyles();
  if (!empathyStepIsActive()) return;

  const bridge = document.querySelector<HTMLElement>(".empathy-bridge");
  const center = bridge?.querySelector<HTMLElement>(".bridge-center");
  if (!bridge || !center) return;

  const data = personaData();
  const avatar = avatarForPersona(data);
  const name = data.fictionalName || "cliente / buyer persona";
  const marker = `${avatar}|${name}|docroi-rich-v2`;
  if (bridge.dataset.empathyCanvas === marker) return;

  bridge.dataset.empathyCanvas = marker;
  bridge.classList.add("docroi-empathy-canvas");

  bridge.querySelector<HTMLElement>(".bridge-top")!.innerHTML = card(
    "¿Qué piensa y siente?",
    "Lo que realmente importa: preocupaciones, aspiraciones, miedos, deseo de acertar y percepción de valor.",
    ["Qué piensa del precio y del riesgo.", "Si percibe valor por lo que paga.", "Qué le genera comodidad, estética o confianza."],
    "Investiga precio, producto y confianza: ¿lo considera justo?, ¿qué siente del producto?, ¿cómo percibe comodidad y estética?",
  );
  bridge.querySelector<HTMLElement>(".bridge-left")!.innerHTML = card(
    "¿Qué oye?",
    "Influencia externa: recomendaciones, expertos, entorno, mensajes de marca y comentarios sobre calidad.",
    ["Qué dicen amigos, colegas o comunidad.", "Qué recomiendan expertos o influencers.", "Qué mensajes de marca recuerda."],
    "Observa contenidos que consume antes de comprar: reseñas, comparativas, rankings, UGC y experiencias de otros clientes.",
  );
  bridge.querySelector<HTMLElement>(".bridge-right")!.innerHTML = card(
    "¿Qué ve?",
    "Entorno visible de decisión: tendencias, productos, precios, competidores, canales y pruebas sociales.",
    ["Qué ofertas y alternativas compara.", "Qué marcas reconoce como referencia.", "Qué señales visuales le dan seguridad."],
    "Conecta canales, contenidos e intención: descubrir, comparar, validar y comprar.",
  );
  bridge.querySelector<HTMLElement>(".bridge-bottom")!.innerHTML = card(
    "¿Qué dice y hace?",
    "Conducta observable: cómo verbaliza objeciones, qué comenta, qué comparte y qué acciones realiza.",
    ["Cómo describe el producto.", "Qué objeciones verbaliza.", "Qué comportamiento muestra en redes, web o conversación comercial."],
    "Traduce lo que dice a lenguaje comercial, canales elegidos, tono de mensaje y relación preferida.",
  );
  bridge.querySelector<HTMLElement>(".bridge-pain")!.innerHTML = card(
    "Esfuerzos (pains)",
    "Costes, bloqueos y fricciones que pueden impedir la decisión.",
    ["Miedo a equivocarse o perder dinero.", "Frustración por información confusa.", "Obstáculos de precio, disponibilidad o desconfianza."],
  );
  bridge.querySelector<HTMLElement>(".bridge-need")!.innerHTML = card(
    "Necesidad central",
    "La tensión principal que conecta problema, motivación y valor esperado.",
    ["Qué necesita resolver ahora.", "Qué resultado considera éxito.", "Qué evidencia reduce su incertidumbre."],
  );
  bridge.querySelector<HTMLElement>(".bridge-gain")!.innerHTML = card(
    "Beneficios (gain)",
    "Valor percibido cuando la decisión sale bien.",
    ["Deseos y necesidades satisfechas.", "Medida del éxito: satisfacción, durabilidad o recomendación.", "Beneficios percibidos: confianza, claridad y seguridad de compra."],
  );

  center.innerHTML = `
    <span class="docroi-empathy-kicker">qué piensa</span>
    <img class="docroi-empathy-avatar" src="${avatar}" alt="${name}">
    <strong class="docroi-empathy-name">${name}</strong>
    <span class="docroi-empathy-kicker">qué siente</span>
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
