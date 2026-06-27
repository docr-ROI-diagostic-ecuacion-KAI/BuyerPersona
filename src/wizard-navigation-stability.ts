import { usePersonaStore } from "./store";

let scheduled = false;

function formStartTop() {
  const target = document.querySelector(".builder-grid") || document.querySelector(".wizard-card") || document.getElementById("constructor");
  if (!target) return 0;
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - 92);
}

function scrollToStepStart(behavior: ScrollBehavior = "auto") {
  const run = () => window.scrollTo({ top: formStartTop(), behavior });
  window.setTimeout(run, 0);
  window.setTimeout(run, 70);
  window.setTimeout(run, 160);
  window.setTimeout(run, 320);
}

function visibleTitle() {
  return (document.querySelector(".builder-head h2")?.textContent || "").trim().toLowerCase();
}

function clampStep(step: number) {
  return Math.max(0, Math.min(14, step));
}

function nextVisibleStep(current: number, direction: 1 | -1) {
  let target = clampStep(current + direction);

  // Receta is hidden in the final UX. Navigation should not stop on that internal slot.
  if (target === 13) target = direction > 0 ? 14 : 12;

  return clampStep(target);
}

function isNavigationButton(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return null;
  const button = target.closest<HTMLButtonElement>(".wizard-actions button");
  if (!button || button.disabled) return null;
  const label = (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  if (/siguiente|next/.test(label)) return { button, direction: 1 as const };
  if (/anterior|previous/.test(label)) return { button, direction: -1 as const };
  return null;
}

function handleWizardNavigation(event: MouseEvent | KeyboardEvent) {
  const navigation = isNavigationButton(event.target);
  if (!navigation) return;

  event.preventDefault();
  event.stopPropagation();
  if ("stopImmediatePropagation" in event) event.stopImmediatePropagation();

  const store = usePersonaStore.getState();
  const current = store.currentStep;
  const next = nextVisibleStep(current, navigation.direction);
  if (next === current) {
    scrollToStepStart("auto");
    return;
  }

  if (next === 14) sessionStorage.setItem("docroi-final-visible-panel", "final");
  store.setStep(next);
  scrollToStepStart("auto");
}

function tagButtons() {
  scheduled = false;
  document.querySelectorAll<HTMLButtonElement>(".wizard-actions button").forEach((button) => {
    const label = (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    if (/siguiente|next|anterior|previous/.test(label)) button.dataset.docroiStableNavigation = "1";
  });
}

function scheduleTagButtons() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(tagButtons);
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", handleWizardNavigation, true);
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter" || event.key === " ") handleWizardNavigation(event);
      },
      true,
    );
    scheduleTagButtons();
    const root = document.getElementById("root") || document.body;
    new MutationObserver(scheduleTagButtons).observe(root, { childList: true, subtree: true, characterData: true });
  });
}

export {};
