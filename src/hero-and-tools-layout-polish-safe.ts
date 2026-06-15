const styleId = "docroi-hero-tools-layout-polish-safe-style";

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .objective-panel dl {
      display: grid !important;
      gap: 0 !important;
      margin: 28px 0 0 !important;
    }
    .objective-panel dl div {
      display: grid !important;
      grid-template-columns: minmax(118px, .42fr) minmax(0, 1fr) !important;
      align-items: start !important;
      gap: 18px !important;
      padding: 14px 0 !important;
      border-top: 1px solid rgba(255,255,255,.14) !important;
    }
    .objective-panel dt,
    .objective-panel dd {
      margin: 0 !important;
      min-width: 0 !important;
      text-align: left !important;
      line-height: 1.25 !important;
      letter-spacing: 0 !important;
    }
    .objective-panel dt {
      white-space: normal !important;
      color: #ffffff !important;
      font-weight: 800 !important;
    }
    .objective-panel dd {
      overflow-wrap: anywhere !important;
      word-break: normal !important;
      color: #ffffff !important;
    }
    .docroi-tools-step { gap: 20px !important; }
    .docroi-tools-pack {
      grid-template-columns: repeat(4, minmax(180px, 1fr)) !important;
      align-items: stretch !important;
      gap: 16px !important;
    }
    .docroi-tools-pack article {
      min-height: 0 !important;
      padding: 18px !important;
      gap: 10px !important;
      overflow: hidden !important;
    }
    .docroi-tools-pack strong {
      font-size: clamp(17px, 1.45vw, 22px) !important;
      line-height: 1.08 !important;
      overflow-wrap: anywhere !important;
    }
    .docroi-tools-pack p {
      font-size: 13px !important;
      line-height: 1.48 !important;
    }
    .docroi-tools-pack code {
      font-size: 10px !important;
      line-height: 1.35 !important;
    }
    @media (min-width: 1180px) {
      .docroi-tools-step { padding: 28px !important; }
      .docroi-tools-pack { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
    }
    @media (max-width: 1100px) {
      .docroi-tools-pack { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    }
    @media (max-width: 720px) {
      .objective-panel dl div {
        grid-template-columns: 1fr !important;
        gap: 6px !important;
      }
      .docroi-tools-pack { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(style);
}

function fixHeroText() {
  document.querySelectorAll<HTMLElement>(".objective-panel dt").forEach((node) => {
    const text = (node.textContent || "").trim();
    if (/harramienta/i.test(text) && text !== "Herramientas") node.textContent = "Herramientas";
  });
}

function applyPolish() {
  installStyles();
  fixHeroText();
}

window.addEventListener("DOMContentLoaded", () => {
  applyPolish();
  window.setTimeout(applyPolish, 250);
  window.setTimeout(applyPolish, 1000);
});

export {};
