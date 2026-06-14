function scrollToTarget(target: Element | null, behavior: ScrollBehavior = "smooth") {
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

function setStepForHash(hash: string) {
  const store = (window as any).__docroiPersonaStore;
  if (!store?.getState) return;
  if (hash === "#constructor") store.getState().setStep(0);
}

function handleInternalAnchor(event: MouseEvent) {
  const link = (event.target as HTMLElement | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
  if (!link) return;

  const hash = link.getAttribute("href") || "";
  if (!hash || hash === "#") return;

  const target = document.querySelector(hash);
  if (!target) return;

  event.preventDefault();
  setStepForHash(hash);
  history.replaceState(null, "", hash);
  window.requestAnimationFrame(() => scrollToTarget(target));
}

function stabilizeInitialScroll() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    setStepForHash(hash);
    window.setTimeout(() => scrollToTarget(target, "auto"), 80);
    return;
  }

  window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 80);
}

window.addEventListener("DOMContentLoaded", () => {
  stabilizeInitialScroll();
  document.addEventListener("click", handleInternalAnchor);
});

window.addEventListener("hashchange", () => {
  const target = document.querySelector(window.location.hash);
  setStepForHash(window.location.hash);
  window.setTimeout(() => scrollToTarget(target, "auto"), 20);
});

export {};
