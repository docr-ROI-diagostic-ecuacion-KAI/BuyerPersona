const clusterPolishStyleId = "docroi-topic-clusters-polish-style";

function installClusterPolish() {
  if (document.getElementById(clusterPolishStyleId)) return;
  const style = document.createElement("style");
  style.id = clusterPolishStyleId;
  style.textContent = `
    .docroi-topic-clusters-step .panel-grid::before {
      content: none !important;
      display: none !important;
    }
    .docroi-topic-clusters-step .panel-grid {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 14px !important;
      background: #f6f7f9 !important;
      border: 1px solid #dce5ee !important;
      border-radius: 18px !important;
      padding: 16px !important;
      min-height: 0 !important;
    }
    .docroi-topic-clusters-step .panel-grid .mini-panel {
      min-height: auto !important;
      padding: 18px !important;
      border-radius: 16px !important;
      background: #ffffff !important;
      align-content: start !important;
    }
    .docroi-topic-clusters-step .panel-grid .mini-panel h4 {
      font-size: 15px !important;
      line-height: 1.12 !important;
      margin-bottom: 8px !important;
    }
    .docroi-topic-clusters-step .panel-grid .mini-panel p {
      font-size: 18px !important;
      line-height: 1.45 !important;
      color: #475569 !important;
    }
    .docroi-topic-clusters-step .panel-grid .mini-panel span {
      width: fit-content !important;
      margin-top: 8px !important;
    }
    @media (max-width: 900px) {
      .docroi-topic-clusters-step .panel-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(style);
}

window.addEventListener("DOMContentLoaded", installClusterPolish);

export {};
