const styleId = "docroi-final-tools-visual-cleanup-style";
let scheduled = false;

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .docroi-final-panel-tools > .section-kicker,
    .docroi-final-panel-tools > h3,
    .docroi-final-panel-tools > p {
      display: none !important;
    }
    .docroi-final-panel-tools .form-grid {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
    .docroi-final-panel-tools .final-persona-sheet,
    .docroi-final-panel-tools .sheet-panel,
    .docroi-final-panel-tools .prescription-sheet {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

function removeConclusionNumber() {
  document.querySelectorAll<HTMLElement>(".docroi-feedback-card.final strong").forEach((node) => {
    const text = (node.textContent || "").trim();
    if (/^12\s*\./.test(text)) node.textContent = text.replace(/^12\s*\.\s*/, "");
  });
}

function applyVisualCleanup() {
  scheduled = false;
  installStyles();
  removeConclusionNumber();
}

function scheduleVisualCleanup() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(applyVisualCleanup);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleVisualCleanup();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleVisualCleanup).observe(root, { childList: true, subtree: true, characterData: true });
});

export {};
