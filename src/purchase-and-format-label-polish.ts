import { usePersonaStore } from "./store";

const OLD_FORMAT = "calculadora ROI";
const NEW_FORMAT = "gamificación";
const MONETIZATION_COPY = "Capacidad de monetización del dato que puede tener este Buyer Persona.";

let scheduled = false;
let normalizing = false;

function normalizeStoredFormats() {
  if (normalizing) return;

  const store = usePersonaStore.getState();
  const formats = store.data.formats || [];

  if (!formats.some((format) => format.toLowerCase() === OLD_FORMAT.toLowerCase())) return;

  const nextFormats = formats.map((format) =>
    format.toLowerCase() === OLD_FORMAT.toLowerCase() ? NEW_FORMAT : format,
  );

  normalizing = true;
  store.update("formats", Array.from(new Set(nextFormats)));
  normalizing = false;
}

function replaceMonetizationCopy() {
  document.querySelectorAll<HTMLElement>(".variable-help article").forEach((article) => {
    const title = article.querySelector("strong")?.textContent?.trim().toLowerCase() || "";
    if (title !== "monetización") return;

    const text = article.querySelector("p");
    if (text && text.textContent?.trim() !== MONETIZATION_COPY) {
      text.textContent = MONETIZATION_COPY;
    }
  });
}

function replaceFormatLabels() {
  document.querySelectorAll<HTMLElement>("button, span, p, dd, li").forEach((element) => {
    const label = element.textContent?.trim().toLowerCase();
    if (label !== OLD_FORMAT.toLowerCase()) return;

    element.textContent = NEW_FORMAT;
    if (element instanceof HTMLButtonElement) {
      element.dataset.docroiGamificationFormat = "true";
      element.setAttribute("aria-label", NEW_FORMAT);
    }
  });

  document.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
    if (button.textContent?.trim().toLowerCase() === NEW_FORMAT.toLowerCase()) {
      button.dataset.docroiGamificationFormat = "true";
      button.setAttribute("aria-label", NEW_FORMAT);
    }
  });
}

function schedulePolish() {
  if (scheduled) return;
  scheduled = true;

  requestAnimationFrame(() => {
    scheduled = false;
    normalizeStoredFormats();
    replaceMonetizationCopy();
    replaceFormatLabels();
  });
}

function handleGamificationClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  const button = target?.closest?.("button[data-docroi-gamification-format='true']") as HTMLButtonElement | null;
  if (!button) return;

  event.preventDefault();
  event.stopPropagation();

  const store = usePersonaStore.getState();
  const currentFormats = (store.data.formats || []).filter(
    (format) => format.toLowerCase() !== OLD_FORMAT.toLowerCase(),
  );

  const nextFormats = currentFormats.includes(NEW_FORMAT)
    ? currentFormats.filter((format) => format !== NEW_FORMAT)
    : [...currentFormats, NEW_FORMAT];

  store.update("formats", nextFormats);
  setTimeout(schedulePolish, 0);
}

if (typeof window !== "undefined") {
  document.addEventListener("click", handleGamificationClick, true);

  const observer = new MutationObserver(schedulePolish);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  usePersonaStore.subscribe(schedulePolish);
  window.addEventListener("load", schedulePolish);
  setTimeout(schedulePolish, 0);
}
