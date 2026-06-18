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
  const title = currentStepTitle();
  return /^(producto|product|marketing mix)$/i.test(title);
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
  const english = isEnglishMode();
  if (/marketing mix/i.test(step)) {
    return english
      ? {
          kicker: "Buyer Persona Sheet - prerequisite",
          title: "Buyer Persona Sheet before price",
          body:
            "Price is not interpreted in isolation. It depends on need, urgency, trust, barriers, pains, gains, channel architecture and behavior already built in the Buyer Persona Sheet. Without that sheet, product, price, distribution and communication are just loose opinions.",
          button: "Go to the Buyer Persona Sheet",
          feedTitle: "Start from the Buyer Persona Sheet",
          feedBody:
            "This model does not replace the sheet: it depends on it. Every product, price or channel decision must be grounded in the profile, pains, gains, behavior, content and channel architecture already defined.",
        }
      : {
          kicker: "Ficha Buyer Persona - requisito previo",
          title: "Ficha Buyer Persona antes de precio",
          body:
            "El precio no se interpreta en abstracto. Depende de la necesidad, urgencia, confianza, barreras, pains, gains, canalidad y comportamiento que ya has construido en la Ficha Buyer Persona. Sin esa ficha, producto, precio, distribucion y comunicacion son solo opiniones sueltas.",
          button: "Ir a la Ficha Buyer Persona",
          feedTitle: "Primero la Ficha Buyer Persona",
          feedBody:
            "Este modelo no sustituye la ficha: la necesita. Cada lectura de producto, precio o canal debe apoyarse en el perfil, pains, gains, comportamiento, contenido y canalidad ya definidos.",
        };
  }
  return english
    ? {
        kicker: "Buyer Persona Sheet - prerequisite",
        title: "This section starts from the Buyer Persona Sheet",
        body:
          "Product perception only makes sense when read from a specific person: what they need, what they fear, what they value, how they compare and what evidence makes them trust. First the sheet, then the product interpretation.",
        button: "Go to the Buyer Persona Sheet",
        feedTitle: "Start from the Buyer Persona Sheet",
        feedBody:
          "This model does not replace the sheet: it depends on it. Every product, price or channel decision must be grounded in the profile, pains, gains, behavior, content and channel architecture already defined.",
      }
    : {
        kicker: "Ficha Buyer Persona - requisito previo",
        title: "Este apartado parte de la Ficha Buyer Persona",
        body:
          "La percepcion del producto solo tiene sentido si se lee desde una persona concreta: que necesita, que teme, que valora, como compara y que evidencia le hace confiar. Primero ficha, despues interpretacion de producto.",
        button: "Ir a la Ficha Buyer Persona",
        feedTitle: "Primero la Ficha Buyer Persona",
        feedBody:
          "Este modelo no sustituye la ficha: la necesita. Cada lectura de producto, precio o canal debe apoyarse en el perfil, pains, gains, comportamiento, contenido y canalidad ya definidos.",
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
        <span></span>
        <strong></strong>
        <p></p>
        <button type="button"></button>
      </div>
    `,
    );
    banner = formGrid.querySelector<HTMLElement>('[data-docroi-persona-prerequisite="1"]');
  }
  if (!banner) return;
  const kicker = banner.querySelector("span");
  const title = banner.querySelector("strong");
  const body = banner.querySelector("p");
  if (kicker) kicker.textContent = copy.kicker;
  if (title) title.textContent = copy.title;
  if (body) body.textContent = copy.body;
  const button = banner.querySelector<HTMLButtonElement>("button");
  if (button) {
    button.textContent = copy.button;
    if (button.dataset.bound !== "1") {
      button.dataset.bound = "1";
      button.addEventListener("click", goToPersonaSheet);
    }
  }
}

function ensureFeedWarning() {
  const frame = document.querySelector<HTMLElement>(".summary-panel .education-frame");
  if (!frame) return;
  const copy = bannerCopy();
  let warning = frame.querySelector<HTMLElement>('[data-docroi-persona-feed-warning="1"]');
  if (!warning) {
    frame.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="docroi-persona-feed-warning" data-docroi-persona-feed-warning="1">
        <strong></strong>
        <p></p>
      </div>
    `,
    );
    warning = frame.querySelector<HTMLElement>('[data-docroi-persona-feed-warning="1"]');
  }
  if (!warning) return;
  const title = warning.querySelector("strong");
  const body = warning.querySelector("p");
  if (title) title.textContent = copy.feedTitle;
  if (body) body.textContent = copy.feedBody;
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
