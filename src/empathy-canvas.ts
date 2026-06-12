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

function installEmpathyCanvasStyles() {
  if (document.getElementById("docroi-empathy-canvas-style")) return;
  const style = document.createElement("style");
  style.id = "docroi-empathy-canvas-style";
  style.textContent = `
    .empathy-bridge.docroi-empathy-canvas {
      position: relative;
      display: grid !important;
      grid-template-columns: 1fr 1.12fr 1fr !important;
      grid-template-areas:
        "header header header"
        "hear center see"
        "say center do"
        "pain need gain" !important;
      gap: 10px !important;
      overflow: hidden;
      border: 14px solid #05070b;
      border-radius: 26px;
      background:
        linear-gradient(135deg, transparent 49.5%, rgba(5,7,11,.14) 50%, transparent 50.5%),
        linear-gradient(45deg, transparent 49.5%, rgba(5,7,11,.10) 50%, transparent 50.5%),
        #ffffff !important;
      color: #05070b !important;
      padding: 14px !important;
      min-height: 430px;
      box-shadow: none !important;
    }
    .empathy-bridge.docroi-empathy-canvas::before {
      content: "mapa de empatía · lectura humana + traducción digital";
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
      background: rgba(255,255,255,.96) !important;
      color: #003b5c !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      padding: 14px !important;
      min-height: 92px;
      font-size: clamp(15px, 1.85vw, 20px) !important;
      line-height: 1.14 !important;
      font-weight: 900 !important;
      box-shadow: none !important;
    }
    .empathy-bridge.docroi-empathy-canvas .bridge-top {
      grid-area: header !important;
      margin-top: 52px;
      min-height: 54px;
      font-size: clamp(17px, 2vw, 22px) !important;
    }
    .empathy-bridge.docroi-empathy-canvas .bridge-left { grid-area: hear !important; }
    .empathy-bridge.docroi-empathy-canvas .bridge-right { grid-area: see !important; }
    .empathy-bridge.docroi-empathy-canvas .bridge-bottom { grid-area: do !important; }
    .empathy-bridge.docroi-empathy-canvas .bridge-center {
      grid-area: center !important;
      display: grid !important;
      align-content: center !important;
      justify-items: center !important;
      gap: 8px !important;
      min-height: 238px;
      background: linear-gradient(180deg, #ffffff, #f6fbfe) !important;
      border-color: #b9dcf0 !important;
    }
    .empathy-bridge.docroi-empathy-canvas .bridge-pain { grid-area: pain !important; }
    .empathy-bridge.docroi-empathy-canvas .bridge-need {
      grid-area: need !important;
      background: #05070b !important;
      border-color: #05070b !important;
      color: #d8ecf8 !important;
      min-height: 84px;
    }
    .empathy-bridge.docroi-empathy-canvas .bridge-gain { grid-area: gain !important; }
    .docroi-empathy-kicker {
      color: #003b5c;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: .04em;
      text-transform: uppercase;
    }
    .docroi-empathy-avatar {
      width: 132px;
      height: 132px;
      border-radius: 999px;
      border: 3px solid #0b63ce;
      background: #eaf6fb;
      object-fit: cover;
      box-shadow: 0 8px 18px rgba(0, 59, 92, .12);
    }
    .docroi-empathy-name {
      max-width: 180px;
      border-radius: 16px;
      background: #05070b;
      color: #fff;
      padding: 9px 12px;
      font-size: 14px;
      line-height: 1.1;
      font-weight: 900;
    }
    @media (max-width: 720px) {
      .empathy-bridge.docroi-empathy-canvas {
        grid-template-columns: 1fr !important;
        grid-template-areas:
          "header"
          "center"
          "hear"
          "see"
          "do"
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
  const marker = `${avatar}|${name}`;
  if (bridge.dataset.empathyCanvas === marker) return;

  bridge.dataset.empathyCanvas = marker;
  bridge.classList.add("docroi-empathy-canvas");
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
