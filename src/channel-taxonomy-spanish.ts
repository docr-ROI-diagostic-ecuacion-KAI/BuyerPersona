import { usePersonaStore } from "./store";

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
    "Mensajería",
    "Podcast",
    "Streaming",
    "Apps",
    "IA conversacional",
    "Eventos digitales",
    "Eventos presenciales",
    "Comunidades digitales",
    "Programas de fidelización",
    "Ferias / Eventos comerciales",
    "Mass media digital",
    "Plataformas audiovisuales",
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
    "El País",
    "Newsletter",
    "Landing",
    "Blog",
    "ElPais.com",
    "Expansión",
    "Forbes",
    "Webinar",
    "Marketplace",
    "COPE",
    "Otros",
  ],
  channelFormats: [
    "post",
    "artículo",
    "newsletter",
    "CTA",
    "secuencia automatizada",
    "reel",
    "short",
    "vídeo largo",
    "carrusel",
    "infografía",
    "Folletos",
    "Anuncios en prensa",
    "Cuñas de radio",
    "podcast",
    "webinar",
    "demo",
    "Sample",
    "caso de uso",
    "comparativa",
    "FAQ",
    "landing",
    "gamificación",
    "banner",
    "display",
    "encuesta",
    "guía PDF",
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
  ],
} as const;

type ChannelKey = keyof typeof taxonomy;

let scheduled = false;
let normalizing = false;

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
  usePersonaStore.getState().update(key as any, values as any);
}

function normalizeStoredValues() {
  if (!isActive() || normalizing) return;
  normalizing = true;
  (Object.keys(taxonomy) as ChannelKey[]).forEach((key) => {
    const allowed = new Set<string>(taxonomy[key]);
    const next = selectedFor(key)
      .map((value) => {
        if (value === "calculadora ROI") return "gamificación";
        if (value === "infografia") return "infografía";
        if (value === "guia PDF") return "guía PDF";
        if (value === "Mensajeria") return "Mensajería";
        if (value === "Prensa digital") return "Prensa / Revistas";
        if (value === "evento presencial") return "eventos";
        return value;
      })
      .filter((value) => allowed.has(value));

    if (JSON.stringify(next) !== JSON.stringify(selectedFor(key))) setValues(key, Array.from(new Set(next)));
  });
  normalizing = false;
}

function patchGroup(section: HTMLElement) {
  const title = section.querySelector("h4")?.textContent || "";
  const key = keyFromTitle(title);
  if (!key) return;
  const grid = section.querySelector<HTMLElement>(".docroi-channel-chip-grid");
  if (!grid) return;

  const selected = new Set(selectedFor(key));
  const signature = JSON.stringify({ key, selected: Array.from(selected), options: taxonomy[key] });
  if (grid.dataset.docroiSpanishTaxonomy === signature) return;

  grid.dataset.docroiSpanishTaxonomy = signature;
  grid.innerHTML = taxonomy[key]
    .map((option) => `<button type="button" class="docroi-channel-chip ${selected.has(option) ? "selected" : ""}" data-channel-taxonomy-key="${key}" data-channel-taxonomy-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`)
    .join("");
}

function patchRoute() {
  const cards = document.querySelectorAll<HTMLElement>(".docroi-channel-route article");
  const routeKeys: ChannelKey[] = ["terminals", "media", "supports", "channelFormats"];
  cards.forEach((card, index) => {
    const key = routeKeys[index];
    if (!key) return;
    const value = selectedFor(key)[0] || ["terminal pendiente", "medio pendiente", "soporte pendiente", "formato pendiente"][index];
    const strong = card.querySelector("strong");
    if (strong && strong.textContent !== value) strong.textContent = value;
  });
}

function patchFeedText() {
  document.querySelectorAll<HTMLElement>(".docroi-channel-feed article, .docroi-channel-feed .feed-dark, .docroi-channel-feed p").forEach((node) => {
    if (!node.textContent?.includes("calculadora ROI")) return;
    node.innerHTML = node.innerHTML.replace(/calculadora ROI/g, "gamificación");
  });
}

function bindClicks() {
  document.querySelectorAll<HTMLButtonElement>("[data-channel-taxonomy-key][data-channel-taxonomy-value]").forEach((button) => {
    if (button.dataset.docroiBound === "1") return;
    button.dataset.docroiBound = "1";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const key = button.dataset.channelTaxonomyKey as ChannelKey;
      const value = button.dataset.channelTaxonomyValue || "";
      const current = selectedFor(key);
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      setValues(key, next);
      window.setTimeout(schedule, 0);
    }, true);
  });
}

function patch() {
  scheduled = false;
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
    schedule();
    const root = document.getElementById("root");
    if (root) new MutationObserver(schedule).observe(root, { childList: true, subtree: true, characterData: true });
    usePersonaStore.subscribe(schedule);
  });
}

export {};
