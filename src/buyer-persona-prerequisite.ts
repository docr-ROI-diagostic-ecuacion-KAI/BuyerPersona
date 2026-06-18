import { usePersonaStore } from "./store";

const styleId = "docroi-buyer-persona-prerequisite-style";
let scheduled = false;

function isEnglishMode() {
  const url = new URL(window.location.href);
  return (
    url.searchParams.get("lang") === "en" ||
    url.searchParams.get("edition") === "eng" ||
    localStorage.getItem("docroi-buyer-persona-lang") === "en"
  );
}

function currentStepTitle() {
  return (document.querySelector(".builder-head h2")?.textContent || "").trim();
}

function isTargetStep() {
  if (isEnglishMode()) return false;
  return /^(producto|marketing mix)$/i.test(currentStepTitle());
}

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .docroi-persona-prerequisite {
      grid-column: 1 / -1;
      order: -30;
      display: grid;
      gap: 12px;
      border: 1px solid #d8ecf8;
      border-radius: 20px;
      background: linear-gradient(135deg, #05070b, #003b5c);
      color: #fff;
      padding: 18px;
      box-shadow: 0 16px 36px rgba(15, 23, 42, .12);
    }
    .docroi-persona-prerequisite span {
      display: inline-flex;
      width: fit-content;
      border-radius: 999px;
      background: #eaf6fb;
      color: #003b5c;
      padding: 7px 10px;
      font-size: 10px;
      line-height: 1;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    .docroi-persona-prerequisite strong {
      color: #fff;
      font-size: clamp(22px, 2.4vw, 31px);
      line-height: 1.03;
      font-weight: 950;
    }
    .docroi-persona-prerequisite p {
      margin: 0;
      color: #eaf6fb !important;
      font-size: 14px !important;
      line-height: 1.55 !important;
      max-width: 850px;
    }
    .docroi-persona-prerequisite button {
      width: fit-content;
      min-height: 44px;
      border: 0;
      border-radius: 999px;
      background: #fff;
      color: #003b5c;
      padding: 0 16px;
      font-size: 13px;
      font-weight: 950;
      cursor: pointer;
    }
    .docroi-persona-feed-warning {
      border-radius: 15px;
      background: #05070b;
      color: #fff;
      padding: 13px;
      display: grid;
      gap: 6px;
      margin-bottom: 12px;
    }
    .docroi-persona-feed-warning strong,
    .docroi-persona-feed-warning p { color: #fff !important; }
    .docroi-persona-feed-warning strong {
      font-size: 14px;
      font-weight: 950;
      line-height: 1.15;
    }
    .docroi-persona-feed-warning p {
      margin: 0;
      font-size: 12px !important;
      line-height: 1.45 !important;
    }
  `;
  document.head.appendChild(style);
}

function bannerCopy() {
  const step = currentStepTitle();
  if (/marketing mix/i.test(step)) {
    return {
      title: "Ficha Buyer Persona antes de precio",
      body:
        "El precio no se interpreta en abstracto. Depende de la necesidad, urgencia, confianza, barreras, pains, gains, canalidad y comportamiento que ya has construido en la Ficha Buyer Persona. Sin esa ficha, producto, precio, distribucion y comunicacion son solo opiniones sueltas.",
    };
  }
  return {
    title: "Este apartado parte de la Ficha Buyer Persona",
    body:
      "La percepcion del producto solo tiene sentido si se lee desde una persona concreta: que necesita, que teme, que valora, como compara y que evidencia le hace confiar. Primero ficha, despues interpretacion de producto.",
  };
}

function goToPersonaSheet() {
  const store = usePersonaStore.getState();
  sessionStorage.setItem("docroi-final-visible-panel", "final");
  store.setStep(14);
  window.setTimeout(() => {
    const target = document.querySelector(".builder-grid") || document.getElementById("constructor");
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, 0);
}

function ensureBanner() {
  const formGrid = document.querySelector<HTMLElement>(".wizard-card .form-section .form-grid");
  if (!formGrid) return;
  const copy = bannerCopy();
  let banner = formGrid.querySelector<HTMLElement>('[data-docroi-persona-prerequisite="1"]');
  if (!banner) {
    formGrid.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="docroi-persona-prerequisite" data-docroi-persona-prerequisite="1">
        <span>Ficha Buyer Persona - requisito previo</span>
        <strong></strong>
        <p></p>
        <button type="button">Ir a la Ficha Buyer Persona</button>
      </div>
    `,
    );
    banner = formGrid.querySelector<HTMLElement>('[data-docroi-persona-prerequisite="1"]');
  }
  if (!banner) return;
  const title = banner.querySelector("strong");
  const body = banner.querySelector("p");
  if (title) title.textContent = copy.title;
  if (body) body.textContent = copy.body;
  const button = banner.querySelector<HTMLButtonElement>("button");
  if (button && button.dataset.bound !== "1") {
    button.dataset.bound = "1";
    button.addEventListener("click", goToPersonaSheet);
  }
}

function ensureFeedWarning() {
  const frame = document.querySelector<HTMLElement>(".summary-panel .education-frame");
  if (!frame) return;
  if (frame.querySelector('[data-docroi-persona-feed-warning="1"]')) return;
  frame.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="docroi-persona-feed-warning" data-docroi-persona-feed-warning="1">
      <strong>Primero la Ficha Buyer Persona</strong>
      <p>Este modelo no sustituye la ficha: la necesita. Cada lectura de producto, precio o canal debe apoyarse en el perfil, pains, gains, comportamiento, contenido y canalidad ya definidos.</p>
    </div>
  `,
  );
}

function cleanup() {
  document
    .querySelectorAll('[data-docroi-persona-prerequisite="1"], [data-docroi-persona-feed-warning="1"]')
    .forEach((node) => node.remove());
}

function apply() {
  scheduled = false;
  installStyles();
  if (!isTargetStep()) {
    cleanup();
    return;
  }
  ensureBanner();
  ensureFeedWarning();
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(apply);
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    schedule();
    const root = document.getElementById("root");
    if (root) {
      new MutationObserver(schedule).observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
    usePersonaStore.subscribe(schedule);
  });
}

export {};
