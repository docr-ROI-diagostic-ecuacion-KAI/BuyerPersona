const exactFooterHtml = `
<footer style="background:#000000;padding:68px 24px 54px;text-align:center;">
  <div style="max-width:920px;margin:0 auto;">
    <a href="https://la-consulta-del-doc-roi.vercel.app/#kai" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;text-decoration:none;margin-bottom:24px;"><img src="https://docroi.marketing/wp-content/uploads/2026/05/Logo_Negro_DoC_ROI.jpg" alt="Doc ROI" style="height:72px;width:auto;display:block;"></a>
    <div style="margin-bottom:28px;"><a href="https://doc-roi-executive.vercel.app/" target="blank" style="display:inline-flex;align-items:center;justify-content:center;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:900;letter-spacing:.01em;line-height:1.4;border-bottom:1px solid rgba(255,255,255,.42);padding-bottom:4px;">Consulta con Doc ROI →</a></div>
    <div style="display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:14px;color:#D1D5DB;font-size:14px;line-height:1.6;margin-bottom:24px;"><a href="https://docroi.marketing/aviso-legal/" target="_blank" rel="noopener" style="color:#D1D5DB;text-decoration:none;">Política de privacidad</a><span style="opacity:.4;">|</span><a href="https://docroi.marketing/aviso-legal/" target="_blank" rel="noopener" style="color:#D1D5DB;text-decoration:none;">Aviso legal</a><span style="opacity:.4;">|</span><a href="https://docroi.marketing/aviso-legal/" target="_blank" rel="noopener" style="color:#D1D5DB;text-decoration:none;">Propiedad intelectual</a></div>
    <div style="font-size:15px;line-height:1.9;color:#C0C7D1;font-weight:400;letter-spacing:.01em;"><span style="display:block;">La propiedad intelectual del ecosistema Doc ROI pertenece al<a href="https://docroi.marketing/ph-d-jorge-lucio/" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
  <span style="display:block;color:#F3F4F6 !important;font-weight:500;">Ph. D. Jorge Lucio Sánchez Galán.</span>
</a></div>
</footer>`;

function applyExactFooter() {
  if (document.body.dataset.docroiExactFooterApplied === "1") return;
  const footer = document.querySelector("footer.final-footer") || document.querySelector("footer.docroi-footer") || document.querySelector("footer");
  if (!footer) return;
  footer.outerHTML = exactFooterHtml;
  document.body.dataset.docroiExactFooterApplied = "1";
}

window.addEventListener("DOMContentLoaded", () => {
  applyExactFooter();
  const root = document.getElementById("root");
  if (root) new MutationObserver(applyExactFooter).observe(root, { childList: true, subtree: true });
});

export {};
