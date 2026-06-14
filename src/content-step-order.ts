const contentOrderStyleId = "docroi-content-step-order-style";

function installContentOrderStyles() {
  if (document.getElementById(contentOrderStyleId)) return;
  const style = document.createElement("style");
  style.id = contentOrderStyleId;
  style.textContent = `
    .docroi-content-step .form-grid > .variable-help {
      order: 99;
      margin-top: 6px;
    }
    .docroi-content-step .form-grid > .form-grid.three {
      order: 1;
    }
    .docroi-content-step .form-grid > .multi {
      order: 2;
    }
    .docroi-content-step .variable-help article {
      background: #f6f7f9 !important;
      border-color: #dce5ee !important;
      box-shadow: none !important;
    }
  `;
  document.head.appendChild(style);
}

function applyContentStepOrder() {
  installContentOrderStyles();
  const isContent = /contenido/i.test(document.querySelector(".builder-head h2")?.textContent || "");
  document.querySelectorAll(".wizard-card .form-section").forEach((section) => {
    section.classList.toggle("docroi-content-step", isContent);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  applyContentStepOrder();
  const root = document.getElementById("root");
  if (root) {
    new MutationObserver(() => window.requestAnimationFrame(applyContentStepOrder)).observe(root, {
      childList: true,
      subtree: true,
    });
  }
});

export {};
