const empathyLayoutStyleId = "docroi-empathy-layout-fix-style";

const generationImages: Record<string, string> = {
  "Baby Boomer digital": "https://docroi.marketing/wp-content/uploads/2026/06/Baby-Boomers-1946-–-1964.png",
  "Generación X digital": "https://docroi.marketing/wp-content/uploads/2026/06/Generacion-X-1965-–-1980.png",
  "Generacion X digital": "https://docroi.marketing/wp-content/uploads/2026/06/Generacion-X-1965-–-1980.png",
  Millennial: "https://docroi.marketing/wp-content/uploads/2026/06/Millennials-o-Generacion-Y-1981-–-1996.png",
  "Generación Z": "https://docroi.marketing/wp-content/uploads/2026/06/Centennials-1997-–-2012.png",
  "Generacion Z": "https://docroi.marketing/wp-content/uploads/2026/06/Centennials-1997-–-2012.png",
  "Alpha emergente": "https://docroi.marketing/wp-content/uploads/2026/06/Generacion-Alfa-2013-–-presente.png",
};

function installEmpathyLayoutStyles() {
  if (document.getElementById(empathyLayoutStyleId)) return;
  const style = document.createElement("style");
  style.id = empathyLayoutStyleId;
  style.textContent = `
    .docroi-empathy-profile-head {
      display: grid;
      grid-template-columns: 132px minmax(0, 1fr);
      gap: 18px;
      align-items: center;
      margin: 18px 0 4px;
      padding: 18px;
      border-radius: 22px;
      background: #05070b;
      color: #fff;
      border: 1px solid rgba(255,255,255,.12);
      box-shadow: 0 18px 42px rgba(5, 7, 11, .12);
    }
    .docroi-empathy-profile-head img {
      width: 132px;
      height: 132px;
      object-fit: cover;
      border-radius: 18px;
      border: 3px solid rgba(255,255,255,.88);
      background: #fff;
      display: block;
    }
    .docroi-empathy-profile-head span,
    .docroi-empathy-profile-head strong,
    .docroi-empathy-profile-head p,
    .docroi-empathy-profile-head small {
      color: #fff !important;
    }
    .docroi-empathy-profile-head span {
      display: inline-flex;
      margin-bottom: 8px;
      padding: 5px 9px;
      border-radius: 999px;
      background: rgba(255,255,255,.13);
      font-size: 10px;
      line-height: 1;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: .03em;
    }
    .docroi-empathy-profile-head strong {
      display: block;
      margin-bottom: 7px;
      font-size: 22px;
      line-height: 1.05;
      font-weight: 950;
    }
    .docroi-empathy-profile-head p {
      margin: 0;
      font-size: 14px;
      line-height: 1.52;
      font-weight: 650;
    }
    .docroi-empathy-profile-head small {
      display: block;
      margin-top: 9px;
      font-size: 12px;
      line-height: 1.35;
      font-weight: 900;
      opacity: .82;
    }
    .summary-panel .empathy-framing > .frame-label,
    .summary-panel .empathy-framing > h4,
    .summary-panel .empathy-framing > p,
    .summary-panel .empathy-framing > .empathy-persona,
    .summary-panel .empathy-framing > .docroi-empathy-map-visual,
    .summary-panel .empathy-framing > .frame-objective {
      display: none !important;
    }
    .summary-panel .empathy-framing .empathy-frame-grid {
      margin-top: 0 !important;
    }
    @media (max-width: 720px) {
      .docroi-empathy-profile-head { grid-template-columns: 1fr; text-align: center; justify-items: center; }
      .docroi-empathy-profile-head img { width: 116px; height: 116px; }
    }
  `;
  document.head.appendChild(style);
}

function empathyStepIsActive() {
  return /empat/i.test(document.querySelector(".builder-head h2")?.textContent || "");
}

function personaData(): any {
  return (window as any).__docroiPersonaStore?.getState?.().data || {};
}

function generationImage(data: any) {
  return data.avatarUrl || generationImages[data.digitalGeneration] || generationImages.Millennial;
}

function generationChannels(data: any) {
  const generationProfile = document.querySelector(".generation-profile small")?.textContent?.trim();
  return generationProfile || data.media?.join?.(", ") || "Canales y contexto digital pendientes";
}

function headerHtml(data: any) {
  const name = data.fictionalName || data.digitalGeneration || "Buyer Persona";
  return `
    <div class="docroi-empathy-profile-head" data-docroi-empathy-profile="1">
      <img src="${generationImage(data)}" alt="${name}">
      <div>
        <span>Cliente / Buyer Persona</span>
        <strong>${name}</strong>
        <p>Usa el rostro como ancla visual del perfil. La clave no es rellenar campos sueltos, sino construir una hipótesis humana conectada con conducta, necesidad y negocio.</p>
        <small>${generationChannels(data)}</small>
      </div>
    </div>
  `;
}

function cleanEmpathyFigures() {
  document.querySelectorAll(".docroi-empathy-map-visual, .empathy-bridge").forEach((node) => node.remove());
}

function movePersonaContextToMainPanel() {
  installEmpathyLayoutStyles();
  if (!empathyStepIsActive()) {
    document.querySelectorAll('[data-docroi-empathy-profile="1"]').forEach((node) => node.remove());
    return;
  }

  cleanEmpathyFigures();

  const formGrid = document.querySelector<HTMLElement>(".wizard-card .form-section .form-grid");
  if (!formGrid) return;

  const existing = document.querySelector<HTMLElement>('[data-docroi-empathy-profile="1"]');
  const data = personaData();
  if (existing) {
    existing.outerHTML = headerHtml(data);
  } else {
    formGrid.insertAdjacentHTML("afterbegin", headerHtml(data));
  }

  document.querySelectorAll<HTMLElement>(".summary-panel .empathy-framing .empathy-persona").forEach((node) => node.remove());
  document.querySelectorAll<HTMLElement>(".summary-panel .docroi-empathy-map-visual").forEach((node) => node.remove());
}

function scheduleEmpathyLayoutFix() {
  movePersonaContextToMainPanel();
  window.setTimeout(movePersonaContextToMainPanel, 80);
  window.setTimeout(movePersonaContextToMainPanel, 250);
  window.setTimeout(movePersonaContextToMainPanel, 700);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleEmpathyLayoutFix();
  const root = document.getElementById("root");
  if (root) {
    new MutationObserver(() => window.requestAnimationFrame(scheduleEmpathyLayoutFix)).observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});

export {};
