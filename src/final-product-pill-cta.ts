const styleId = "docroi-final-product-pill-cta-style";
const productPillUrl = "https://connection-04-ficha-de-producto.vercel.app/";
let scheduled = false;

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .dossier-pdf-outside {
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      margin: 18px 0 0;
      page-break-inside: avoid;
    }
    .dossier-pdf-outside .dossier-print {
      border: 0;
      border-radius: 999px;
      padding: 13px 18px;
      cursor: pointer;
      background: #05070b;
      color: #fff;
      font-size: 13px;
      font-weight: 950;
      box-shadow: 0 14px 30px rgba(15,23,42,.18);
    }
    .dossier-footer-print.docroi-product-pill-cta {
      display: grid;
      gap: 12px;
      justify-items: center;
      background: #05070b;
      color: #fff;
      border-radius: 20px;
      padding: 26px 22px;
      text-align: center;
      margin-top: 18px;
      page-break-inside: avoid;
    }
    .dossier-footer-print.docroi-product-pill-cta .cta-kicker {
      display: inline-flex;
      width: fit-content;
      padding: 7px 10px;
      border-radius: 999px;
      background: #eaf6fb;
      color: #003b5c;
      font-size: 10px;
      font-weight: 950;
      letter-spacing: .05em;
      text-transform: uppercase;
    }
    .dossier-footer-print.docroi-product-pill-cta h4 {
      margin: 0;
      color: #fff;
      font-size: clamp(24px, 3vw, 34px);
      line-height: 1.04;
      font-weight: 950;
    }
    .dossier-footer-print.docroi-product-pill-cta p {
      margin: 0;
      max-width: 720px;
      color: #d8ecf8 !important;
      font-size: 14px;
      line-height: 1.6;
    }
    .dossier-footer-print.docroi-product-pill-cta a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      border-radius: 999px;
      background: #fff;
      color: #003b5c;
      padding: 0 18px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 950;
    }
    @media print {
      .dossier-pdf-outside { display: none !important; }
    }
  `;
  document.head.appendChild(style);
}

function bindPrintButtons() {
  document.querySelectorAll<HTMLButtonElement>('[data-docroi-print="1"]').forEach((button) => {
    button.onclick = () => window.print();
  });
}

function ensurePdfButtonOutside(target: HTMLElement) {
  const dossier = target.closest<HTMLElement>('[data-docroi-final-dossier="1"]');
  if (!dossier) return;
  if (dossier.querySelector('[data-docroi-pdf-outside="1"]')) return;
  target.insertAdjacentHTML(
    "beforebegin",
    `<div class="dossier-pdf-outside" data-docroi-pdf-outside="1"><button class="dossier-print" data-docroi-print="1" type="button">Imprimir / guardar PDF</button></div>`,
  );
}

function transformFinalFooter() {
  scheduled = false;
  installStyles();
  document.querySelectorAll<HTMLElement>(".dossier-footer-print").forEach((footer) => {
    ensurePdfButtonOutside(footer);
    if (footer.dataset.docroiProductPillCta === "1") return;
    footer.dataset.docroiProductPillCta = "1";
    footer.classList.add("docroi-product-pill-cta");
    footer.innerHTML = `
      <span class="cta-kicker">Siguiente píldora Doc ROI</span>
      <h4>Prueba la píldora de Ficha de producto</h4>
      <p>Usa esta Buyer Persona como punto de partida para construir una ficha de producto más clara, accionable y conectada con necesidad, valor, canales y decisión.</p>
      <a href="${productPillUrl}" target="_blank" rel="noopener noreferrer">Abrir píldora de Ficha de producto →</a>
    `;
  });
  bindPrintButtons();
}

function scheduleTransform() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(transformFinalFooter);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleTransform();
  const root = document.getElementById("root") || document.body;
  new MutationObserver(scheduleTransform).observe(root, { childList: true, subtree: true });
});

export {};
