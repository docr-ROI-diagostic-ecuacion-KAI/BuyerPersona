const styleId = "docroi-final-ux-corrections-style";
let scheduled = false;

const fallbackGuidance: Record<string, { title: string; body: string; points: string[] }> = {
  Necesidad: {
    title: "Que significa necesidad real",
    body: "Una necesidad no es lo que la marca quiere vender. Es el problema que la persona intenta resolver, la presion que siente y el resultado que espera conseguir si actua.",
    points: ["Dolor: que le frena o le preocupa.", "Ganancia: que resultado considera valioso.", "Confianza: que prueba necesita antes de avanzar."],
  },
};

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .hero .objective-panel dl > div {
      display: grid !important;
      grid-template-columns: 154px minmax(0, 1fr) !important;
      column-gap: 28px !important;
      align-items: start !important;
    }
    .hero .objective-panel dt,
    .hero .objective-panel dd {
      margin: 0 !important;
      min-width: 0 !important;
      text-align: left !important;
      line-height: 1.25 !important;
    }
    .hero .objective-panel dt { white-space: normal !important; font-weight: 900 !important; }
    .hero .objective-panel dd { overflow-wrap: anywhere !important; }

    .docroi-final-feedback .docroi-feedback-head h4::after {
      content: "Lectura guiada del diagnóstico" !important;
      font-size: clamp(28px, 4vw, 42px) !important;
    }
    .docroi-final-feedback .docroi-feedback-head span::after {
      content: "Feedback formativo interpretativo" !important;
      font-size: 10px !important;
    }

    .docroi-tools-pack {
      grid-template-columns: 1fr !important;
      gap: 14px !important;
    }
    .docroi-tools-pack article {
      display: grid !important;
      grid-template-columns: minmax(170px, .32fr) minmax(0, 1fr) !important;
      grid-template-areas:
        "tag text"
        "title text"
        "title code" !important;
      column-gap: 20px !important;
      row-gap: 8px !important;
      align-items: start !important;
      min-height: 0 !important;
      padding: 18px !important;
    }
    .docroi-tools-pack article > span { grid-area: tag !important; }
    .docroi-tools-pack article > strong { grid-area: title !important; font-size: clamp(22px, 2.2vw, 30px) !important; line-height: 1.02 !important; overflow-wrap: normal !important; word-break: normal !important; }
    .docroi-tools-pack article > p { grid-area: text !important; font-size: 14px !important; line-height: 1.55 !important; }
    .docroi-tools-pack article > code { grid-area: code !important; font-size: 11px !important; }

    .methodology-section .method-sticky,
    .methodology-section .container > .eyebrow:first-child {
      display: none !important;
    }

    @media (max-width: 760px) {
      .hero .objective-panel dl > div { grid-template-columns: 1fr !important; row-gap: 6px !important; }
      .docroi-tools-pack article {
        grid-template-columns: 1fr !important;
        grid-template-areas: "tag" "title" "text" "code" !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function currentStep() {
  return (document.querySelector(".builder-head h2")?.textContent || "").trim();
}

function forceFeedOpenAndRepair() {
  const panel = document.querySelector(".summary-panel");
  const toggle = panel?.querySelector<HTMLButtonElement>(".guide-toggle");
  if (panel && !panel.querySelector(".education-frame") && toggle) toggle.click();

  const step = currentStep();
  const fallback = fallbackGuidance[step];
  if (!fallback) return;
  const frame = document.querySelector<HTMLElement>(".summary-panel .education-frame");
  if (!frame) return;
  let feed = frame.querySelector<HTMLElement>(".feed-note");
  if (!feed) {
    frame.insertAdjacentHTML("beforeend", `<div class="feed-note docroi-phase-guide"></div>`);
    feed = frame.querySelector<HTMLElement>(".feed-note");
  }
  if (!feed) return;
  const text = (feed.textContent || "").replace(/\s+/g, "").trim();
  if (text.length > 10) return;
  feed.classList.add("docroi-phase-guide", "docroi-identity-guide");
  feed.innerHTML = `<strong>${fallback.title}</strong><p>${fallback.body}</p><ul class="docroi-phase-list">${fallback.points.map((point) => `<li>${point}</li>`).join("")}</ul>`;
}

function removeNumbers() {
  document.querySelectorAll<HTMLElement>(".docroi-final-feedback .docroi-feedback-head h4, .docroi-feedback-card.final strong").forEach((node) => {
    const text = (node.textContent || "").trim();
    if (/^(12|14)\s*\./.test(text)) node.textContent = text.replace(/^(12|14)\s*\.\s*/, "");
  });
}

function fixHeroLabel() {
  document.querySelectorAll<HTMLElement>(".objective-panel dt").forEach((node) => {
    if (/herramient/i.test(node.textContent || "")) node.textContent = "Herramientas";
  });
}

function applyCorrections() {
  scheduled = false;
  installStyles();
  forceFeedOpenAndRepair();
  removeNumbers();
  fixHeroLabel();
}

function scheduleCorrections() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(applyCorrections);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleCorrections();
  window.setTimeout(scheduleCorrections, 120);
  window.setTimeout(scheduleCorrections, 600);
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleCorrections).observe(root, { childList: true, subtree: true, characterData: true });
});

export {};
