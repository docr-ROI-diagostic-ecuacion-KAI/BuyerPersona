const styleId = "docroi-support-tools-polish-style";
let scheduled = false;

function isFinalStep() {
  return /ficha final/i.test(document.querySelector(".builder-head h2")?.textContent || "");
}

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .docroi-operational-pack {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }
    .docroi-operational-pack article {
      background: #ffffff;
      color: #0f172a;
      border-radius: 16px;
      padding: 16px;
      display: grid;
      gap: 8px;
      min-height: 172px;
      align-content: start;
      border: 1px solid rgba(216,236,248,.72);
    }
    .docroi-operational-pack span {
      width: fit-content;
      border-radius: 999px;
      background: #eaf6fb;
      color: #003b5c;
      padding: 6px 9px;
      font-size: 9px;
      line-height: 1;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    .docroi-operational-pack strong {
      color: #003b5c;
      font-size: 18px;
      line-height: 1.08;
      font-weight: 950;
    }
    .docroi-operational-pack p {
      color: #475569 !important;
      font-size: 12px !important;
      line-height: 1.48 !important;
    }
    .docroi-operational-pack code {
      display: block;
      white-space: normal;
      word-break: break-word;
      color: #0f172a;
      background: #eef4f7;
      border-radius: 10px;
      padding: 8px;
      font-size: 10px;
      line-height: 1.35;
      font-weight: 850;
    }
    .docroi-annex-actions button[data-docroi-download-pdf="1"] {
      background: #ffffff;
      color: #003b5c;
      box-shadow: inset 0 0 0 1px rgba(216,236,248,.95);
    }
    @media (max-width: 1100px) {
      .docroi-operational-pack { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 760px) {
      .docroi-operational-pack { grid-template-columns: 1fr; }
    }
    @media print {
      .docroi-operational-pack { grid-template-columns: repeat(2, minmax(0, 1fr)); break-inside: avoid; page-break-inside: avoid; }
    }
  `;
  document.head.appendChild(style);
}

function hideLegacyLooseBlocks() {
  if (!isFinalStep()) return;
  const blockedTexts = [
    "Ir al constructor guiado",
    "DIIIP · METODOLOGÍA DOC ROI",
    "DIIIP · METODOLOGIA DOC ROI",
  ];
  document.querySelectorAll<HTMLElement>("a, button, .pill, .chip, span").forEach((node) => {
    const text = (node.textContent || "").replace(/\s+/g, " ").trim();
    if (blockedTexts.some((blocked) => text.includes(blocked))) {
      node.style.display = "none";
      node.setAttribute("aria-hidden", "true");
    }
  });
}

function operationalPackHtml() {
  return `
    <div class="docroi-operational-pack" data-docroi-operational-pack="1">
      <article>
        <span>Prompts</span>
        <strong>Prompts reutilizables</strong>
        <p>Salidas listas para pedir a la IA contenidos, anuncios, emails, guiones, landing, SEO y argumentarios comerciales.</p>
        <code>brief · copy · email · landing · SEO · ventas</code>
      </article>
      <article>
        <span>Llaves IA</span>
        <strong>Variables que activan criterio</strong>
        <p>Campos que deben viajar a cualquier prompt para mantener coherencia: pains, gains, generación, canalidad, producto, keywords y nivel relacional.</p>
        <code>pains · gains · canal · keyword · relación · producto</code>
      </article>
      <article>
        <span>Activadores</span>
        <strong>Señales operativas</strong>
        <p>Condiciones que disparan una recomendación: urgencia alta, confianza baja, sensibilidad al precio, fricción de canal o intención transaccional.</p>
        <code>urgencia · confianza · precio · fricción · intención</code>
      </article>
      <article>
        <span>Automatización</span>
        <strong>Elementos exportables</strong>
        <p>Base para CRM, n8n, dashboards, documentación docente, IA conversacional y sistemas internos de seguimiento del Buyer Persona.</p>
        <code>CRM · n8n · dashboard · documentación · IA</code>
      </article>
    </div>
  `;
}

function ensurePdfAction() {
  const actions = document.querySelector<HTMLElement>(".docroi-support-annex .docroi-annex-actions");
  if (!actions) return;
  if (!actions.querySelector("[data-docroi-download-pdf='1']")) {
    actions.insertAdjacentHTML("afterbegin", `<button type="button" data-docroi-download-pdf="1">Descargar ficha PDF</button>`);
  }
  actions.querySelectorAll<HTMLButtonElement>("[data-docroi-download-pdf='1']").forEach((button) => {
    button.onclick = () => window.print();
  });
}

function ensureOperationalPack() {
  const annex = document.querySelector<HTMLElement>('[data-docroi-support-annex="1"]');
  if (!annex || annex.querySelector('[data-docroi-operational-pack="1"]')) return;
  const grid = annex.querySelector(".docroi-annex-grid");
  if (grid) grid.insertAdjacentHTML("beforebegin", operationalPackHtml());
}

function polishToolsAnnex() {
  scheduled = false;
  installStyles();
  hideLegacyLooseBlocks();
  if (!isFinalStep()) return;
  ensurePdfAction();
  ensureOperationalPack();
}

function schedulePolish() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(polishToolsAnnex);
}

window.addEventListener("DOMContentLoaded", () => {
  schedulePolish();
  const root = document.getElementById("root");
  if (root) new MutationObserver(schedulePolish).observe(root, { childList: true, subtree: true });
});

export {};
