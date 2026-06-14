const empathyMapStyleId = "docroi-empathy-map-replacement-style";

function installEmpathyMapStyles() {
  if (document.getElementById(empathyMapStyleId)) return;
  const style = document.createElement("style");
  style.id = empathyMapStyleId;
  style.textContent = `
    .docroi-empathy-map-visual {
      display: grid;
      grid-template-columns: 1fr 1.7fr 1fr;
      grid-template-areas:
        "listen listen listen"
        "see center say"
        "do do do"
        "pain need gain";
      gap: 7px;
      width: 100%;
      margin: 12px 0;
      padding: 10px;
      border: 10px solid #05070b;
      border-radius: 20px;
      background: #05070b;
      overflow: hidden;
    }
    .docroi-empathy-map-visual > div {
      min-height: 54px;
      border: 1px solid #d8dee6;
      border-radius: 11px;
      background: #fff;
      color: #003b5c;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 10px 8px;
      font-size: clamp(13px, 1.6vw, 18px);
      line-height: 1.08;
      font-weight: 950;
      letter-spacing: 0;
    }
    .docroi-empathy-map-visual .listen { grid-area: listen; min-height: 58px; }
    .docroi-empathy-map-visual .see { grid-area: see; }
    .docroi-empathy-map-visual .say { grid-area: say; }
    .docroi-empathy-map-visual .do { grid-area: do; min-height: 58px; }
    .docroi-empathy-map-visual .pain { grid-area: pain; }
    .docroi-empathy-map-visual .need { grid-area: need; }
    .docroi-empathy-map-visual .gain { grid-area: gain; }
    .docroi-empathy-map-visual .center {
      grid-area: center;
      display: grid;
      grid-template-columns: .58fr 1.1fr .58fr;
      gap: 6px;
      align-items: center;
      min-height: 84px;
    }
    .docroi-empathy-map-visual .center span {
      color: #003b5c;
      font-size: 10px;
      line-height: 1.05;
      font-weight: 950;
      text-transform: uppercase;
    }
    .docroi-empathy-map-visual .center strong {
      min-height: 58px;
      border-radius: 999px;
      background: #004b70;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 10px;
      font-size: clamp(16px, 2vw, 22px);
      line-height: 1.08;
      font-weight: 950;
    }
    @media (max-width: 900px) {
      .docroi-empathy-map-visual { grid-template-columns: 1fr; grid-template-areas: "listen" "see" "center" "say" "do" "pain" "need" "gain"; }
      .docroi-empathy-map-visual .center { grid-template-columns: 1fr; }
      .docroi-empathy-map-visual .center strong { width: 100%; }
    }
  `;
  document.head.appendChild(style);
}

function empathyMapHtml() {
  return `
    <div class="docroi-empathy-map-visual" data-docroi-empathy-map="1" aria-label="Mapa de empatía Buyer Persona">
      <div class="listen">Qué escucha</div>
      <div class="see">Qué ve</div>
      <div class="center"><span>Qué<br>piensa</span><strong>Buyer<br>Persona</strong><span>Qué<br>siente</span></div>
      <div class="say">Qué dice</div>
      <div class="do">Qué hace</div>
      <div class="pain">Miedos y<br>frustraciones</div>
      <div class="need">Necesidad central</div>
      <div class="gain">Deseos y<br>motivaciones</div>
    </div>
  `;
}

function replaceEmpathyPersonaBlock() {
  installEmpathyMapStyles();
  document.querySelectorAll<HTMLElement>(".empathy-framing .empathy-persona").forEach((node) => {
    if (node.previousElementSibling?.getAttribute("data-docroi-empathy-map") === "1") {
      node.remove();
      return;
    }
    node.insertAdjacentHTML("beforebegin", empathyMapHtml());
    node.remove();
  });
}

function scheduleEmpathyMapReplacement() {
  replaceEmpathyPersonaBlock();
  window.setTimeout(replaceEmpathyPersonaBlock, 80);
  window.setTimeout(replaceEmpathyPersonaBlock, 250);
  window.setTimeout(replaceEmpathyPersonaBlock, 700);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleEmpathyMapReplacement();
  const root = document.getElementById("root");
  if (root) {
    new MutationObserver(() => window.requestAnimationFrame(scheduleEmpathyMapReplacement)).observe(root, {
      childList: true,
      subtree: true,
    });
  }
});

export {};
