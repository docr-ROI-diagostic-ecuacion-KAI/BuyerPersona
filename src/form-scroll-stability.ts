let lastFormControlY: number | null = null;
let indexNavigation = false;

function rememberFormPosition(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return;
  const isIndex = Boolean(target.closest(".step-list button"));
  const isFormControl = Boolean(target.closest(".wizard-card button, .wizard-card input, .wizard-card select, .wizard-card textarea, .wizard-card label"));
  if (isIndex) {
    indexNavigation = true;
    lastFormControlY = null;
    return;
  }
  if (isFormControl) {
    indexNavigation = false;
    lastFormControlY = window.scrollY;
  }
}

function restoreFormPosition() {
  if (indexNavigation) {
    window.setTimeout(() => {
      const constructor = document.getElementById("constructor");
      if (!constructor) return;
      const top = constructor.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      indexNavigation = false;
    }, 0);
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
  document.addEventListener("change", restoreFormPosition, true);
  document.addEventListener("click", restoreFormPosition, true);
  document.addEventListener("input", restoreFormPosition, true);
});

export {};
