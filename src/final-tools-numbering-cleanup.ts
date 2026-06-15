const styleId = "docroi-final-tools-numbering-style";

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .docroi-final-step .export-grid,
    .docroi-final-step .kit-operativo,
    .docroi-final-step .technical-json {
      display: none !important;
    }
    .docroi-final-feedback .docroi-feedback-head span {
      font-size: 0 !important;
    }
    .docroi-final-feedback .docroi-feedback-head span::after {
      content: "14 · Feedback formativo interpretativo";
      font-size: 10px;
    }
    .docroi-final-feedback .docroi-feedback-head h4 {
      font-size: 0 !important;
    }
    .docroi-final-feedback .docroi-feedback-head h4::after {
      content: "14. Lectura guiada del diagnóstico";
      font-size: clamp(28px, 4vw, 42px);
    }
    .docroi-support-annex .annex-kicker {
      font-size: 0 !important;
    }
    .docroi-support-annex .annex-kicker::after {
      content: "15 · Herramientas";
      font-size: 10px;
    }
    .docroi-support-annex h3 {
      font-size: 0 !important;
    }
    .docroi-support-annex h3::after {
      content: "15. Herramientas";
      font-size: clamp(30px, 4vw, 46px);
    }
    .docroi-support-annex::before {
      content: "Espacio final de explotación práctica de la ficha: descarga PDF, copia y descarga JSON, estructura técnica, prompts, llaves IA, activadores operativos y recursos reutilizables para automatización.";
      color: #d8ecf8;
      font-size: 15px;
      line-height: 1.65;
      max-width: 980px;
    }
    .docroi-annex-actions::before {
      content: "Acciones principales";
      width: 100%;
      color: #fff;
      font-size: 18px;
      line-height: 1.15;
      font-weight: 950;
      margin-bottom: 2px;
    }
  `;
  document.head.appendChild(style);
}

function applyCleanup() {
  installStyles();
  document.querySelectorAll<HTMLElement>(".kit-operativo, .technical-json").forEach((node) => {
    node.setAttribute("aria-hidden", "true");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  applyCleanup();
  const root = document.getElementById("root");
  if (root) new MutationObserver(applyCleanup).observe(root, { childList: true, subtree: true });
});

export {};
