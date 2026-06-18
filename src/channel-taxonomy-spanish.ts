import { usePersonaStore } from "./store";

const styleId = "docroi-channel-taxonomy-spanish-style";

const taxonomy = {
  terminals: [
    "smartphone",
    "tablet",
    "desktop",
    "monitor profesional",
    "smart TV",
    "asistente de voz",
    "aula",
    "eventos",
    "punto de venta",
    "Imprenta",
    "Radio",
    "Otros",
  ],
  media: [
    "Prensa / Revistas",
    "Emisoras de Radio",
    "Email",
    "Web",
    "Blog",
    "Buscadores",
    "Redes sociales",
    "Mensajeria",
    "Podcast",
    "Streaming",
    "Apps",
    "IA conversacional",
    "Eventos digitales",
    "Eventos presenciales",
    "Comunidades digitales",
    "Programas de fidelizacion",
    "Ferias / Eventos comerciales",
    "Mass media digital",
    "Plataformas audiovisuales",
    "Otros",
  ],
  supports: [
    "LinkedIn",
    "Instagram",
    "TikTok",
    "YouTube",
    "Facebook",
    "X",
    "WhatsApp",
    "Telegram",
    "Discord",
    "Twitch",
    "Spotify",
    "El Pais",
    "Newsletter",
    "Landing",
    "Blog",
    "ElPais.com",
    "Expansion",
    "Forbes",
    "Webinar",
    "Marketplace",
    "COPE",
    "Otros",
  ],
  channelFormats: [
    "post",
    "articulo",
    "newsletter",
    "CTA",
    "secuencia automatizada",
    "reel",
    "short",
    "video largo",
    "carrusel",
    "infografia",
    "Folletos",
    "Anuncios en prensa",
    "Cunas de Radio",
    "podcast",
    "webinar",
    "demo",
    "Sample",
    "caso de uso",
    "comparativa",
    "FAQ",
    "landing",
    "gamificacion",
    "banner",
    "display",
    "encuesta",
    "guia PDF",
    "Otros",
  ],
  intentions: [
    "aprender",
    "informarse",
    "resolver",
    "comparar",
    "confiar",
    "comprar",
    "reservar",
    "solicitar demo",
    "autoridad profesional",
    "automatizar",
    "delegar",
    "mejorar productividad",
    "pertenecer a comunidad",
    "recomendar",
    "seguimiento",
    "fidelizar",
    "Otros",
  ],
} as const;

type ChannelKey = keyof typeof taxonomy;

let scheduled = false;
let normalizing = false;

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .builder-grid {
      grid-template-columns: minmax(142px, 168px) minmax(0, 1fr) minmax(260px, 300px) !important;
      column-gap: 18px !important;
    }
    .step-list {
      min-width: 0 !important;
      overflow: hidden !important;
    }
    .step-list button {
      width: 100% !important;
      min-width: 0 !important;
      min-height: 40px !important;
      padding: 6px 9px !important;
      gap: 7px !important;
      border-radius: 20px !important;
      font-size: clamp(14px, 1.15vw, 21px) !important;
      line-height: 1.05 !important;
      white-space: normal !important;
      overflow-wrap: anywhere !important;
      word-break: normal !important;
    }
    .step-list button span {
      flex: 0 0 22px !important;
      width: 22px !important;
      height: 22px !important;
      font-size: 11px !important;
    }
    .docroi-channel-other-box {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 8px;
      align-items: center;
      margin-top: 3px;
    }
    .docroi-channel-other-box input {
      min-height: 42px;
      border: 1px solid #dbe7ef;
      border-radius: 14px;
      background: #f8fafc;
      color: #0f172a;
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 750;
    }
    .docroi-channel-other-box button {
      min-height: 42px;
      border: 0;
      border-radius: 999px;
      background: #003b5c;
      color: #fff;
      padding: 0 14px;
      font-size: 12px;
      font-weight: 950;
      cursor: pointer;
    }
    .docroi-channel-other-hint {
      margin: -3px 0 0 !important;
      color: #64748b !important;
      font-size: 12px !important;
      line-height: 1.35 !important;
    }
    @media (max-width: 1040px) {
      .builder-grid { grid-template-columns: 1fr !important; }
      .step-list { overflow: visible !important; }
      .step-list button { border-radius: 999px !important; }
    }
    @media (max-width: 680px) {
      .docroi-channel-other-box { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
}

function isEnglishMode() {
  const url = new URL(window.location.href);
  return url.searchParams.get("lang") === "en" || url.searchParams.get("edition") === "eng" || localStorage.getItem("docroi-buyer-persona-lang") === "en";
}

function isActive() {
  if (isEnglishMode()) return false;
  return /^canalidad$/i.test((document.querySelector(".builder-head h2")?.textContent || "").trim());
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char] || char));
}

function keyFromTitle(title: string): ChannelKey | null {
  const clean = title.toLowerCase();
  if (clean.includes("terminal")) return "terminals";
  if (clean.includes("medio")) return "media";
  if (clean.includes("soporte")) return "supports";
  if (clean.includes("formato")) return "channelFormats";
  if (clean.includes("intencion") || clean.includes("intención")) return "intentions";
  return null;
}

function selectedFor(key: ChannelKey) {
  const data = usePersonaStore.getState().data as any;
  return Array.isArray(data[key]) ? (data[key] as string[]) : [];
}

function setValues(key: ChannelKey, values: string[]) {
  usePersonaStore.getState().update(key as any, Array.from(new Set(values.filter(Boolean))) as any);
}

function normalizeValue(value: string) {
  const map: Record<string, string> = {
    "calculadora ROI": "gamificacion",
    "gamificación": "gamificacion",
    "infografía": "infografia",
    "infografia": "infografia",
    "guía PDF": "guia PDF",
    "guia PDF": "guia PDF",
    "Mensajería": "Mensajeria",
    "Mensajeria": "Mensajeria",
    "Programas de fidelización": "Programas de fidelizacion",
    "Programas de fidelizacion": "Programas de fidelizacion",
    "El País": "El Pais",
    "El Pais": "El Pais",
    "Expansión": "Expansion",
    "Expansion": "Expansion",
    "artículo": "articulo",
    "articulo": "articulo",
    "vídeo largo": "video largo",
    "video largo": "video largo",
    "Cuñas de radio": "Cunas de Radio",
    "Cuñas de Radio": "Cunas de Radio",
    "Cunas de Radio": "Cunas de Radio",
    "Prensa digital": "Prensa / Revistas",
    "Comunidades": "Comunidades digitales",
    "evento presencial": "eventos",
    "Eventos": "eventos",
  };
  return map[value] || value;
}

function normalizeStoredValues() {
  if (!isActive() || normalizing) return;
  normalizing = true;
  (Object.keys(taxonomy) as ChannelKey[]).forEach((key) => {
    const next = selectedFor(key).map(normalizeValue);
    if (JSON.stringify(next) !== JSON.stringify(selectedFor(key))) setValues(key, next);
  });
  normalizing = false;
}

function optionsFor(key: ChannelKey) {
  const base = [...taxonomy[key]] as string[];
  const custom = selectedFor(key).map(normalizeValue).filter((value) => value && !base.includes(value));
  return [...base, ...custom];
}

function patchGroup(section: HTMLElement) {
  const title = section.querySelector("h4")?.textContent || "";
  const key = keyFromTitle(title);
  if (!key) return;
  const grid = section.querySelector<HTMLElement>(".docroi-channel-chip-grid");
  if (!grid) return;

  const selected = new Set(selectedFor(key).map(normalizeValue));
  const options = optionsFor(key);
  const showOther = selected.has("Otros");
  const signature = JSON.stringify({ key, selected: Array.from(selected), options });
  if (grid.dataset.docroiSpanishTaxonomy !== signature) {
    grid.dataset.docroiSpanishTaxonomy = signature;
    grid.innerHTML = options
      .map((option) => `<button type="button" class="docroi-channel-chip ${selected.has(option) ? "selected" : ""}" data-channel-taxonomy-key="${key}" data-channel-taxonomy-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`)
      .join("");
  }

  let otherBox = section.querySelector<HTMLElement>(".docroi-channel-other-wrap");
  if (showOther && !otherBox) {
    section.insertAdjacentHTML("beforeend", `
      <div class="docroi-channel-other-wrap" data-channel-other-wrap="${key}">
        <div class="docroi-channel-other-box">
          <input type="text" data-channel-other-input="${key}" placeholder="Escribe otra etiqueta y pulsa Enter" />
          <button type="button" data-channel-other-add="${key}">Añadir</button>
        </div>
        <p class="docroi-channel-other-hint">Puedes crear tantas etiquetas propias como necesites. Se guardan como parte del Buyer Persona.</p>
      </div>
    `);
  }
  if (!showOther && otherBox) otherBox.remove();
}

function patchRoute() {
  const cards = document.querySelectorAll<HTMLElement>(".docroi-channel-route article");
  const routeKeys: ChannelKey[] = ["terminals", "media", "supports", "channelFormats"];
  cards.forEach((card, index) => {
    const key = routeKeys[index];
    if (!key) return;
    const value = selectedFor(key).filter((item) => item !== "Otros")[0] || ["terminal pendiente", "medio pendiente", "soporte pendiente", "formato pendiente"][index];
    const strong = card.querySelector("strong");
    if (strong && strong.textContent !== value) strong.textContent = value;
  });
}

function patchFeedText() {
  document.querySelectorAll<HTMLElement>(".docroi-channel-feed article, .docroi-channel-feed .feed-dark, .docroi-channel-feed p").forEach((node) => {
    if (!node.textContent?.match(/calculadora ROI|gamificación|Cuñas de radio|guía PDF/)) return;
    node.innerHTML = node.innerHTML
      .replace(/calculadora ROI/g, "gamificacion")
      .replace(/gamificación/g, "gamificacion")
      .replace(/Cuñas de radio/g, "Cunas de Radio")
      .replace(/guía PDF/g, "guia PDF");
  });
}

function addOtherValue(key: ChannelKey, raw: string) {
  const value = normalizeValue(raw.trim());
  if (!value || value === "Otros") return;
  const current = selectedFor(key).map(normalizeValue);
  setValues(key, [...current, "Otros", value]);
}

function bindClicks() {
  document.querySelectorAll<HTMLButtonElement>("[data-channel-taxonomy-key][data-channel-taxonomy-value]").forEach((button) => {
    if (button.dataset.docroiBound === "1") return;
    button.dataset.docroiBound = "1";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const key = button.dataset.channelTaxonomyKey as ChannelKey;
      const value = normalizeValue(button.dataset.channelTaxonomyValue || "");
      const current = selectedFor(key).map(normalizeValue);
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      setValues(key, next);
      window.setTimeout(schedule, 0);
    }, true);
  });

  document.querySelectorAll<HTMLInputElement>("[data-channel-other-input]").forEach((input) => {
    if (input.dataset.docroiBound === "1") return;
    input.dataset.docroiBound = "1";
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      const key = input.dataset.channelOtherInput as ChannelKey;
      addOtherValue(key, input.value);
      input.value = "";
      window.setTimeout(schedule, 0);
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-channel-other-add]").forEach((button) => {
    if (button.dataset.docroiBound === "1") return;
    button.dataset.docroiBound = "1";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const key = button.dataset.channelOtherAdd as ChannelKey;
      const input = document.querySelector<HTMLInputElement>(`[data-channel-other-input="${key}"]`);
      addOtherValue(key, input?.value || "");
      if (input) input.value = "";
      window.setTimeout(schedule, 0);
    });
  });
}

function patch() {
  scheduled = false;
  installStyles();
  if (!isActive()) return;
  normalizeStoredValues();
  document.querySelectorAll<HTMLElement>(".docroi-channel-group").forEach(patchGroup);
  patchRoute();
  patchFeedText();
  bindClicks();
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(patch);
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    installStyles();
    schedule();
    const root = document.getElementById("root");
    if (root) new MutationObserver(schedule).observe(root, { childList: true, subtree: true, characterData: true });
    usePersonaStore.subscribe(schedule);
  });
}

export {};
