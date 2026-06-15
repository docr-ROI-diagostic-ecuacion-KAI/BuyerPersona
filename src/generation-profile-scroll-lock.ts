import { usePersonaStore } from "./store";

const styleId = "docroi-generation-profile-lock-style";
let scheduled = false;
let keepProfileInView = false;

const generationImages: Record<string, string> = {
  "Baby Boomer digital": "https://docroi.marketing/wp-content/uploads/2026/06/Baby-Boomers-1946-%E2%80%93-1964.png",
  "Generación X digital": "https://docroi.marketing/wp-content/uploads/2026/06/Generacion-X-1965-%E2%80%93-1980.png",
  Millennial: "https://docroi.marketing/wp-content/uploads/2026/06/Millennials-o-Generacion-Y-1981-%E2%80%93-1996.png",
  "Generación Z": "https://docroi.marketing/wp-content/uploads/2026/06/Centennials-1997-%E2%80%93-2012.png",
  "Alpha emergente": "https://docroi.marketing/wp-content/uploads/2026/06/Generacion-Alfa-2013-%E2%80%93-presente.png",
};

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .generation-profile {
      scroll-margin-top: 112px;
      align-items: center !important;
    }
    .generation-profile img,
    .generation-note img {
      object-fit: cover !important;
      object-position: center !important;
      background: #eef4f7 !important;
    }
    .generation-profile img {
      min-width: 120px !important;
    }
  `;
  document.head.appendChild(style);
}

function selectedGeneration() {
  return usePersonaStore.getState().data.digitalGeneration;
}

function findGenerationSelect(target?: EventTarget | null) {
  const node = target instanceof HTMLElement ? target.closest("select") : null;
  if (node && /generación digital/i.test(node.closest("label")?.textContent || "")) return node as HTMLSelectElement;
  return Array.from(document.querySelectorAll<HTMLSelectElement>("select")).find((select) => /generación digital/i.test(select.closest("label")?.textContent || "")) || null;
}

function applyGenerationImages() {
  const image = generationImages[selectedGeneration()];
  if (!image) return;
  document.querySelectorAll<HTMLImageElement>(".generation-profile img, .generation-note img").forEach((img) => {
    if (img.src !== image) img.src = image;
  });
}

function scrollToGenerationProfile() {
  const profile = document.querySelector<HTMLElement>(".generation-profile");
  if (!profile) return;
  profile.scrollIntoView({ behavior: "smooth", block: "center" });
}

function scheduleProfileScroll() {
  keepProfileInView = true;
  window.setTimeout(scrollToGenerationProfile, 40);
  window.setTimeout(scrollToGenerationProfile, 140);
  window.setTimeout(() => {
    scrollToGenerationProfile();
    keepProfileInView = false;
  }, 320);
}

function applyLock() {
  scheduled = false;
  installStyles();
  applyGenerationImages();
  if (keepProfileInView) scrollToGenerationProfile();
}

function scheduleLock() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(applyLock);
}

window.addEventListener("DOMContentLoaded", () => {
  installStyles();
  applyGenerationImages();
  document.addEventListener("change", (event) => {
    if (!findGenerationSelect(event.target)) return;
    scheduleProfileScroll();
  }, true);
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleLock).observe(root, { childList: true, subtree: true });
  usePersonaStore.subscribe(scheduleLock);
});

export {};
