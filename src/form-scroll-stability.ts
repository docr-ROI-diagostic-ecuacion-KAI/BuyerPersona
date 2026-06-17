let lastFormControlY: number | null = null;
let formNavigation = false;

function formStartTop() {
  const target = document.querySelector(".builder-grid") || document.querySelector(".wizard-card") || document.getElementById("constructor");
  if (!target) return 0;
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - 92);
}

function scrollToFormStart(behavior: ScrollBehavior = "auto") {
  const run = () => window.scrollTo({ top: formStartTop(), behavior });
  window.setTimeout(run, 0);
  window.setTimeout(run, 80);
  window.setTimeout(run, 220);
}

function isStepNavigation(target: HTMLElement) {
  return Boolean(target.closest(".step-list button, .wizard-actions button"));
}

function isEditableFormControl(target: HTMLElement) {
  if (target.closest(".wizard-actions")) return false;
  return Boolean(target.closest(".wizard-card .form-section button, .wizard-card input, .wizard-card select, .wizard-card textarea, .wizard-card label"));
}

function rememberFormPosition(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return;

  if (isStepNavigation(target)) {
    formNavigation = true;
    lastFormControlY = null;
    return;
  }

  if (isEditableFormControl(target)) {
    formNavigation = false;
    lastFormControlY = window.scrollY;
  }
}

function restoreOrNavigate() {
  if (formNavigation) {
    scrollToFormStart("auto");
    window.setTimeout(() => {
      formNavigation = false;
    }, 260);
    return;
  }

  if (lastFormControlY === null) return;
  const y = lastFormControlY;
  window.setTimeout(() => window.scrollTo({ top: y, behavior: "auto" }), 0);
  window.setTimeout(() => window.scrollTo({ top: y, behavior: "auto" }), 80);
  window.setTimeout(() => {
    window.scrollTo({ top: y, behavior: "auto" });
    lastFormControlY = null;
  }, 180);
}

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("pointerdown", (event) => rememberFormPosition(event.target), true);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") rememberFormPosition(event.target);
  }, true);
  document.addEventListener("change", restoreOrNavigate, true);
  document.addEventListener("click", restoreOrNavigate, true);
  document.addEventListener("input", restoreOrNavigate, true);
});

export {};
