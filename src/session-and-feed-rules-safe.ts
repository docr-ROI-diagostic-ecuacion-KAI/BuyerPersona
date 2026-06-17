const sessionFlag = "docroi-buyer-persona-session-started";
const legacyStorageKeys = [
  "doc-roi-buyer-persona-clean-2026-06",
  "doc-roi-buyer-persona-current-session",
  "docroi-buyer-persona",
];

let scheduled = false;

function resetForNewBrowserSession() {
  if (sessionStorage.getItem(sessionFlag) === "1") return;
  legacyStorageKeys.forEach((key) => {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch {
      // Storage may be unavailable in some browser modes.
    }
  });
  const store = (window as any).__docroiPersonaStore;
  if (store?.getState?.().reset) store.getState().reset();
  sessionStorage.setItem(sessionFlag, "1");
}

function formStartElement() {
  return document.querySelector(".builder-grid") || document.querySelector(".wizard-card") || document.getElementById("constructor");
}

function normalizeScrollTarget(element: Element | null) {
  if (element?.id === "constructor") return formStartElement();
  return element;
}

function scrollElementToTop(element: Element | null, behavior: ScrollBehavior = "smooth") {
  const target = normalizeScrollTarget(element);
  if (!target) {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY - 92;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

function forceFeedOpen() {
  const panel = document.querySelector(".summary-panel");
  if (!panel) return;
  const frame = panel.querySelector(".education-frame");
  const toggle = panel.querySelector<HTMLButtonElement>(".guide-toggle");
  if (!frame && toggle) toggle.click();
}

function isIndexButton(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest(".step-list button"));
}

function handleEveryLink(event: MouseEvent) {
  const link = (event.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!link) return;
  const rawHref = link.getAttribute("href") || "";
  if (!rawHref || rawHref === "#") return;

  const isHashOnly = rawHref.startsWith("#");
  const url = new URL(link.href, window.location.href);
  const isSamePage = url.origin === window.location.origin && url.pathname === window.location.pathname;

  if (isHashOnly || (isSamePage && url.hash)) {
    const target = document.querySelector(url.hash || rawHref);
    if (target) {
      event.preventDefault();
      history.replaceState(null, "", url.hash || rawHref);
      window.requestAnimationFrame(() => scrollElementToTop(target));
      return;
    }
  }
}

function handleIndexButton(event: MouseEvent) {
  if (!isIndexButton(event.target)) return;
  window.setTimeout(() => scrollElementToTop(document.getElementById("constructor"), "auto"), 0);
  window.setTimeout(() => scrollElementToTop(document.getElementById("constructor"), "auto"), 120);
}

function applyGlobalRules() {
  scheduled = false;
  forceFeedOpen();
}

function scheduleGlobalRules() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(applyGlobalRules);
}

window.addEventListener("DOMContentLoaded", () => {
  resetForNewBrowserSession();
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 60);
  document.addEventListener("click", handleEveryLink, true);
  document.addEventListener("click", handleIndexButton, true);
  scheduleGlobalRules();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleGlobalRules).observe(root, { childList: true, subtree: true });
});

window.addEventListener("hashchange", () => {
  const target = document.querySelector(window.location.hash);
  window.setTimeout(() => scrollElementToTop(target, "auto"), 20);
});

window.addEventListener("popstate", () => {
  window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 20);
});

export {};
