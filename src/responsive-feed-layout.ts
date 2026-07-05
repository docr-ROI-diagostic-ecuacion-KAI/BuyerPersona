const styleId = "docroi-responsive-feed-layout-style";
let scheduled = false;

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .builder-grid {
      grid-template-columns: minmax(178px, 220px) minmax(0, 1fr) !important;
      grid-template-areas:
        "steps form"
        "steps feed";
      align-items: start;
    }
    .step-list { grid-area: steps; }
    .wizard-card { grid-area: form; }
    .summary-panel {
      grid-area: feed;
      position: static !important;
      width: 100%;
      min-width: 0;
      margin-top: 2px;
    }
    .summary-panel .guide-toggle {
      width: fit-content;
      min-width: 190px;
      padding-inline: 18px;
    }
    .summary-panel .education-frame {
      display: grid;
      grid-template-columns: minmax(220px, .72fr) minmax(0, 1.28fr);
      gap: 14px 18px;
      align-items: start;
      text-align: left;
    }
    .summary-panel .education-frame > .eyebrow,
    .summary-panel .education-frame > h3,
    .summary-panel .education-frame > p { grid-column: 1; }
    .summary-panel .education-frame > .feed-note,
    .summary-panel .education-frame > .generation-note { grid-column: 2; }
    .summary-panel .education-frame > .empathy-framing { grid-column: 1 / -1; }
    .summary-panel .education-frame .eyebrow { margin: 0; width: fit-content; }
    .summary-panel .education-frame h3 {
      text-align: left;
      margin: 2px 0 0;
      font-size: clamp(22px, 2.4vw, 32px);
      line-height: 1.05;
    }
    .summary-panel .education-frame > p {
      color: #566273;
      font-size: 15px;
      line-height: 1.6;
    }
    .summary-panel .feed-note { margin-top: 0; min-height: 100%; }
    .summary-panel .generation-note {
      margin-top: 0;
      grid-template-columns: 112px minmax(0, 1fr);
      justify-items: start;
      align-items: center;
      border: 1px solid #d8ecf8;
      border-radius: 18px;
      background: #f6fbfe;
      padding: 14px;
    }
    .summary-panel .generation-note img {
      grid-row: span 3;
      width: 112px;
      height: 112px;
      border-radius: 18px;
      object-fit: cover;
    }
    .summary-panel .generation-note p,
    .summary-panel .generation-note small { margin: 0; }
    .summary-panel .empathy-frame-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .final-persona-sheet { max-width: 100%; }
    .final-persona-sheet,
    .final-persona-sheet * {
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .final-persona-sheet header { align-items: stretch; }
    .final-persona-sheet header > div { display: grid; align-content: center; }
    .final-persona-sheet header img {
      flex: 0 0 auto;
      box-shadow: 0 0 0 1px rgba(255,255,255,.28);
    }
    .sheet-panel { page-break-inside: avoid; break-inside: avoid; }
    @media (max-width: 1040px) {
      .builder-grid {
        grid-template-columns: 1fr !important;
        grid-template-areas:
          "steps"
          "form"
          "feed";
      }
      .step-list {
        position: static;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .summary-panel .education-frame { grid-template-columns: 1fr; }
      .summary-panel .education-frame > .eyebrow,
      .summary-panel .education-frame > h3,
      .summary-panel .education-frame > p,
      .summary-panel .education-frame > .feed-note,
      .summary-panel .education-frame > .generation-note,
      .summary-panel .education-frame > .empathy-framing { grid-column: 1; }
      .summary-panel .empathy-frame-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 720px) {
      .builder { padding-inline: 0; }
      .builder-grid { gap: 14px; }
      .wizard-card,
      .summary-panel { padding: 18px; }
      .step-list { grid-template-columns: 1fr; }
      .step-list button { min-height: 42px; }
      .summary-panel .guide-toggle { width: 100%; }
      .summary-panel .education-frame { padding: 16px; border-radius: 18px; }
      .summary-panel .education-frame h3 { font-size: 24px; }
      .summary-panel .generation-note { grid-template-columns: 82px minmax(0, 1fr); }
      .summary-panel .generation-note img { width: 82px; height: 82px; }
      .summary-panel .empathy-frame-grid { grid-template-columns: 1fr; }
      .final-persona-sheet header img { width: 112px; height: 112px; }
      .score-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media print {
      .builder-head,
      .progress-wrap,
      .step-list,
      .summary-panel,
      .wizard-actions,
      .export-grid,
      .kit-operativo,
      .technical-json,
      .methodology-section,
      .final-footer { display: none !important; }
      .builder,
      .wizard-card,
      .form-section {
        padding: 0 !important;
        box-shadow: none !important;
        border: 0 !important;
        background: #fff !important;
      }
      .builder-grid { display: block !important; }
      .final-persona-sheet {
        border-radius: 16px;
        box-shadow: none;
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .final-persona-sheet header { padding: 18px; }
      .final-persona-sheet header h3 { font-size: 28px; }
      .sheet-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
      .prescription-sheet { grid-column: 1 / -1; }
    }
  `;
  document.head.appendChild(style);
}

function reorderEmpathyFraming() {
  const grid = document.querySelector<HTMLElement>(".empathy-frame-grid");
  if (!grid || grid.dataset.docroiOrdered === "1") return;

  const articles = Array.from(grid.querySelectorAll<HTMLElement>("article"));
  const priority = [
    "escucha",
    "ve",
    "piensa",
    "siente",
    "dice",
    "hace",
    "pains",
    "frustraciones",
    "gains",
    "motivaciones",
    "necesidad central",
  ];

  const score = (article: HTMLElement) => {
    const text = article.textContent?.toLocaleLowerCase("es-ES") || "";
    const index = priority.findIndex((item) => text.includes(item));
    return index === -1 ? 999 : index;
  };

  articles.sort((a, b) => score(a) - score(b)).forEach((article, index) => {
    const strong = article.querySelector("strong");
    if (strong) strong.textContent = strong.textContent?.replace(/^\d+\s*·\s*/, `${index + 1} · `) || "";
    grid.appendChild(article);
  });

  const hasCentralNeed = articles.some((article) => (article.textContent || "").toLocaleLowerCase("es-ES").includes("necesidad central"));
  if (!hasCentralNeed) {
    const article = document.createElement("article");
    article.innerHTML = `
      <strong>${articles.length + 1} · Necesidad central</strong>
      <small>Mapa clásico</small>
      <p>Qué necesidad sostiene la decisión.</p>
      <small>Aportación DOC ROI</small>
      <p>Síntesis humana · conexión con negocio · prioridad de acción</p>
    `;
    grid.appendChild(article);
  }

  grid.dataset.docroiOrdered = "1";
}

function applyResponsiveFeedLayout() {
  scheduled = false;
  installStyles();
  reorderEmpathyFraming();
}

function scheduleResponsiveFeedLayout() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(applyResponsiveFeedLayout);
}

scheduleResponsiveFeedLayout();
window.addEventListener("DOMContentLoaded", () => {
  scheduleResponsiveFeedLayout();
  const root = document.getElementById("root") || document.body;
  new MutationObserver(scheduleResponsiveFeedLayout).observe(root, { childList: true, subtree: true });
});

export {};
