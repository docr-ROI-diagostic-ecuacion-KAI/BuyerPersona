const officialEyebrow = "PÍLDORA · BASIC";
const officialTitle = "Buyer Persona con IA";
let scheduled = false;

function applyHeroCopy() {
  scheduled = false;
  const hero = document.querySelector<HTMLElement>(".hero");
  if (!hero) return;

  const eyebrow = hero.querySelector<HTMLElement>(".eyebrow");
  if (eyebrow && eyebrow.textContent?.trim() !== officialEyebrow) {
    eyebrow.textContent = officialEyebrow;
  }

  const title = hero.querySelector<HTMLHeadingElement>("h1");
  if (title && title.textContent?.trim() !== officialTitle) {
    title.textContent = officialTitle;
  }
}

function scheduleHeroCopy() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(applyHeroCopy);
}

scheduleHeroCopy();
window.addEventListener("DOMContentLoaded", () => {
  scheduleHeroCopy();
  const root = document.getElementById("root") || document.body;
  new MutationObserver(scheduleHeroCopy).observe(root, { childList: true, subtree: true });
});

export {};
