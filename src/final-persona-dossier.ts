import { deriveGains, derivePains, keywords, prescription, recommendedKpis, topicClusters, vitalSigns } from "./lib/recommendations";
import { usePersonaStore } from "./store";

const styleId = "docroi-final-dossier-style";
const logo = "https://docroi.marketing/wp-content/uploads/2026/04/Logo_1_Doc_ROI.png";
const logoBlack = "https://docroi.marketing/wp-content/uploads/2026/05/Logo_Negro_DoC_ROI.jpg";

const generationImages: Record<string, string> = {
  "Baby Boomer digital": "https://docroi.marketing/wp-content/uploads/2026/06/Baby-Boomers-1946-%E2%80%93-1964.png",
  "Generación X digital": "https://docroi.marketing/wp-content/uploads/2026/06/Generacion-X-1965-%E2%80%93-1980.png",
  Millennial: "https://docroi.marketing/wp-content/uploads/2026/06/Millennials-o-Generacion-Y-1981-%E2%80%93-1996.png",
  "Generación Z": "https://docroi.marketing/wp-content/uploads/2026/06/Centennials-1997-%E2%80%93-2012.png",
  "Alpha emergente": "https://docroi.marketing/wp-content/uploads/2026/06/Generacion-Alfa-2013-%E2%80%93-presente.png",
};

let scheduled = false;

function isFinalStep() {
  return /ficha final/i.test(document.querySelector(".builder-head h2")?.textContent || "");
}

function isRecipeStep() {
  return /receta/i.test(document.querySelector(".builder-head h2")?.textContent || "");
}

function esc(value: unknown) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char] || char));
}

function list(items: unknown[], fallback = "pendiente") {
  const clean = items.map((item) => String(item || "").trim()).filter(Boolean);
  if (!clean.length) return `<span class="empty">${fallback}</span>`;
  return clean.map((item) => `<span>${esc(item)}</span>`).join("");
}

function text(value: unknown, fallback = "pendiente") {
  const clean = String(value || "").trim();
  return clean ? esc(clean) : `<span class="empty">${fallback}</span>`;
}

function scoreBar(label: string, value: number | null | undefined, max = 5) {
  const safe = Math.max(0, Math.min(max, Number(value || 0)));
  const pct = Math.round((safe / max) * 100);
  return `<div class="dossier-bar"><span>${esc(label)} <b>${value ?? "pendiente"}</b></span><i><em style="width:${pct}%"></em></i></div>`;
}

function percentBar(label: string, value: number | null | undefined) {
  const safe = Math.max(0, Math.min(100, Number(value || 0)));
  return `<div class="dossier-bar"><span>${esc(label)} <b>${safe}%</b></span><i><em style="width:${safe}%"></em></i></div>`;
}

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .step-list button[data-docroi-recipe-hidden="1"] { display: none !important; }
    .docroi-final-step .final-persona-sheet { display: none !important; }
    .docroi-final-step .export-grid { margin-top: 16px; }
    .docroi-final-dossier {
      grid-column: 1 / -1;
      background: #ffffff;
      border: 1px solid #dce7ef;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 22px 70px rgba(15, 23, 42, .10);
      color: #05070b;
      text-align: left;
    }
    .dossier-top {
      display: grid;
      grid-template-columns: 1.35fr .65fr;
      gap: 24px;
      padding: 30px;
      color: #fff;
      background: linear-gradient(135deg, rgba(5,7,11,.98), rgba(0,59,92,.92));
    }
    .dossier-brand { display:flex; align-items:center; gap:14px; margin-bottom:20px; }
    .dossier-brand img { height:44px; width:auto; display:block; border-radius:4px; }
    .dossier-brand span, .dossier-kicker {
      display:inline-flex; width:fit-content; padding:7px 10px; border-radius:999px;
      background:rgba(216,236,248,.14); border:1px solid rgba(216,236,248,.28);
      color:#d8ecf8; font-size:10px; font-weight:950; letter-spacing:.06em; text-transform:uppercase;
    }
    .dossier-top h3 { margin:0 0 10px; color:#fff; font-size: clamp(34px,5vw,58px); line-height:1.02; font-weight:950; letter-spacing:0; }
    .dossier-top p { margin:0; color:#e5edf4; font-size:16px; line-height:1.65; max-width:850px; }
    .dossier-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:22px; }
    .dossier-print {
      border:0; border-radius:999px; padding:13px 18px; cursor:pointer; background:#fff; color:#003b5c;
      font-size:13px; font-weight:950; box-shadow:0 14px 30px rgba(0,0,0,.20);
    }
    .dossier-avatar-card { background:rgba(255,255,255,.08); border:1px solid rgba(216,236,248,.24); border-radius:22px; padding:16px; align-self:start; }
    .dossier-avatar-card img { width:100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius:18px; display:block; margin-bottom:12px; }
    .dossier-avatar-card strong { display:block; color:#fff; font-size:20px; line-height:1.15; }
    .dossier-avatar-card small { display:block; color:#d8ecf8; margin-top:5px; font-size:12px; line-height:1.4; }
    .dossier-body { padding: 24px; background: linear-gradient(90deg,rgba(221,229,238,.34) 1px,transparent 1px), #f7f9fb; background-size:34px 34px; }
    .dossier-grid { display:grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap:14px; }
    .dossier-card {
      grid-column: span 6; background:#fff; border:1px solid #dce7ef; border-radius:18px; padding:16px;
      display:grid; gap:10px; align-content:start; page-break-inside: avoid;
    }
    .dossier-card.wide { grid-column: 1 / -1; }
    .dossier-card.third { grid-column: span 4; }
    .dossier-card h4 { margin:0; color:#003b5c; font-size:20px; line-height:1.14; font-weight:950; }
    .dossier-card p { margin:0; color:#475569; font-size:13px; line-height:1.55; }
    .dossier-pills { display:flex; flex-wrap:wrap; gap:7px; }
    .dossier-pills span { display:inline-flex; border-radius:999px; padding:7px 9px; background:#eef4f7; color:#0f172a; font-size:11px; line-height:1.15; font-weight:850; }
    .dossier-pills .empty, .empty { color:#94a3b8 !important; font-style:italic; }
    .dossier-dl { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
    .dossier-dl div { background:#f6f7f9; border:1px solid #e2e8f0; border-radius:12px; padding:10px; }
    .dossier-dl dt { color:#64748b; font-size:10px; font-weight:950; text-transform:uppercase; margin-bottom:4px; }
    .dossier-dl dd { margin:0; color:#0f172a; font-size:13px; line-height:1.35; font-weight:800; }
    .dossier-bar { display:grid; gap:5px; }
    .dossier-bar span { display:flex; justify-content:space-between; gap:8px; color:#0f172a; font-size:12px; font-weight:900; }
    .dossier-bar i { display:block; height:8px; border-radius:999px; background:#e2e8f0; overflow:hidden; }
    .dossier-bar em { display:block; height:100%; border-radius:999px; background:#003b5c; }
    .dossier-empathy { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
    .dossier-empathy div { background:#f6f7f9; border:1px solid #e2e8f0; border-radius:14px; padding:12px; }
    .dossier-empathy strong { display:block; color:#003b5c; font-size:13px; margin-bottom:5px; font-weight:950; }
    .dossier-route { display:grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap:10px; }
    .dossier-route article { border:1px solid #dce7ef; border-radius:14px; background:#fff; padding:12px; }
    .dossier-route strong { display:block; color:#003b5c; font-size:14px; margin-bottom:6px; font-weight:950; }
    .dossier-cluster { background:#05070b; color:#fff; border-radius:18px; padding:16px; display:grid; gap:12px; }
    .dossier-cluster strong, .dossier-cluster p { color:#fff !important; }
    .dossier-branches { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
    .dossier-branches article { background:#fff; color:#0f172a; border-radius:14px; padding:12px; }
    .dossier-branches b { display:block; color:#003b5c; font-size:14px; margin-bottom:5px; }
    .dossier-branches p { color:#475569 !important; }
    .dossier-footer-print { margin-top:18px; padding:22px; background:#05070b; color:#fff; border-radius:20px; text-align:center; page-break-inside: avoid; }
    .dossier-footer-print img { height:54px; width:auto; display:block; margin:0 auto 14px; }
    .dossier-footer-print p { color:#cbd5e1; margin:0 0 14px; font-size:13px; line-height:1.6; }
    @media (max-width: 980px) {
      .dossier-top { grid-template-columns:1fr; }
      .dossier-card, .dossier-card.third { grid-column: 1 / -1; }
      .dossier-route, .dossier-branches, .dossier-empathy, .dossier-dl { grid-template-columns:1fr; }
    }
    @media print {
      body * { visibility: hidden !important; }
      .docroi-final-dossier, .docroi-final-dossier * { visibility: visible !important; }
      .docroi-final-dossier { position:absolute; left:0; top:0; width:100%; border:0; box-shadow:none; border-radius:0; }
      .dossier-print, .doc-header, .step-list, .summary-panel, .wizard-actions, .builder-head, .progress-wrap { display:none !important; }
      .dossier-body { background:#fff; padding:14mm; }
      .dossier-top { padding:14mm; grid-template-columns:1.4fr .6fr; }
      .dossier-card { break-inside: avoid; page-break-inside: avoid; }
    }
  `;
  document.head.appendChild(style);
}

function finalDossierHtml() {
  const data = usePersonaStore.getState().data;
  const signs = vitalSigns(data);
  const pains = derivePains(data);
  const gains = deriveGains(data);
  const kw = keywords(data);
  const clusters = topicClusters(data);
  const kpis = recommendedKpis(data);
  const rx = prescription(data);
  const avatar = generationImages[data.digitalGeneration] || data.avatarUrl || "/avatars/millennial.svg";
  const pillar = clusters[0]?.pillar_topic || `Decisión estratégica sobre ${data.product || "producto"}`;
  const branchSource = clusters.flatMap((cluster) => cluster.subtopics.map((subtopic, index) => ({
    title: subtopic,
    keyword: cluster.keywords[index] || cluster.keywords[0] || "keyword pendiente",
    stage: cluster.journey_stage,
  }))).slice(0, 3);
  const branches = branchSource.length ? branchSource : [
    { title: "Criterios de elección", keyword: kw.informational[0], stage: "consideración" },
    { title: "Comparativa", keyword: kw.comparative[0], stage: "evaluación" },
    { title: "Prueba de valor", keyword: kw.transactional[1], stage: "decisión" },
  ];

  return `
    <section class="docroi-final-dossier" data-docroi-final-dossier="1">
      <header class="dossier-top">
        <div>
          <div class="dossier-brand"><img src="${logo}" alt="Doc ROI"><span>Ficha final · Generación Perfil Buyer Persona con IA</span></div>
          <h3>${text(data.fictionalName, "Buyer Persona pendiente")}</h3>
          <p>${text(data.shortDescription || data.businessGoal, "Perfil estratégico construido desde las variables seleccionadas durante el diagnóstico.")}</p>
          <div class="dossier-actions"><button class="dossier-print" data-docroi-print="1">Imprimir / guardar PDF</button></div>
        </div>
        <aside class="dossier-avatar-card">
          <img src="${avatar}" alt="${esc(data.digitalGeneration)}">
          <strong>${text(data.digitalGeneration)}</strong>
          <small>${text(data.product, "Producto pendiente")} · ${text(data.sector, "Sector pendiente")}</small>
        </aside>
      </header>
      <div class="dossier-body">
        <div class="dossier-grid">
          <article class="dossier-card wide"><span class="dossier-kicker">Vista ejecutiva</span><h4>Resultado final del Buyer Persona</h4><p>Esta ficha resume todas las variables capturadas, inferidas y calculadas durante el recorrido. Su objetivo es servir como entregable docente, pieza de diagnóstico y base para contenido, canalidad, keywords, automatización y toma de decisiones.</p><div class="dossier-route"><article><strong>ROI</strong><p>${signs.ROI}</p></article><article><strong>PRO</strong><p>${signs.PRO}</p></article><article><strong>CE</strong><p>${signs.CE}</p></article><article><strong>IA</strong><p>${signs.IA}</p></article></div></article>

          <article class="dossier-card"><h4>1. Preparación</h4><dl class="dossier-dl"><div><dt>Proyecto</dt><dd>${text(data.projectName)}</dd></div><div><dt>Producto</dt><dd>${text(data.product)}</dd></div><div><dt>Sector</dt><dd>${text(data.sector)}</dd></div><div><dt>Mercado</dt><dd>${text(data.market)}</dd></div><div><dt>Cobertura</dt><dd>${data.coverage || 0}%</dd></div><div><dt>Objetivo</dt><dd>${text(data.businessGoal)}</dd></div></dl></article>
          <article class="dossier-card"><h4>2. Identidad</h4><dl class="dossier-dl"><div><dt>Edad</dt><dd>${text(data.ageRange)}</dd></div><div><dt>Género</dt><dd>${text(data.gender)}</dd></div><div><dt>Ubicación</dt><dd>${text(data.location)}</dd></div><div><dt>Rol</dt><dd>${text(data.role)}</dd></div><div><dt>Nivel decisión</dt><dd>${text(data.decisionLevel)}</dd></div><div><dt>Contexto</dt><dd>${text(data.context)}</dd></div></dl></article>

          <article class="dossier-card"><h4>3. Necesidad y valor</h4><div class="dossier-empathy"><div><strong>Necesita resolver</strong><p>${text(data.needsToSolve)}</p></div><div><strong>Le preocupa</strong><p>${text(data.mainConcern)}</p></div><div><strong>Ganancia esperada</strong><p>${text(data.desiredGain)}</p></div><div><strong>Barrera</strong><p>${text(data.mainBarrier)}</p></div><div><strong>Riesgo a evitar</strong><p>${text(data.riskToAvoid)}</p></div><div><strong>Disparador de confianza</strong><p>${text(data.trustTrigger)}</p></div></div></article>
          <article class="dossier-card"><h4>4. Mapa de empatía</h4><div class="dossier-empathy"><div><strong>Piensa y siente</strong><p>${text(data.thinksAndFeels)}</p></div><div><strong>Escucha</strong><p>${text(data.hears)}</p></div><div><strong>Ve</strong><p>${text(data.sees)}</p></div><div><strong>Dice y hace</strong><p>${text(data.saysAndDoes)}</p></div><div><strong>Pains</strong><p>${text(data.frustrations)}</p></div><div><strong>Gains</strong><p>${text(data.motivations)}</p></div></div></article>

          <article class="dossier-card third"><h4>5. Compra</h4>${scoreBar("Urgencia", data.urgency)}${scoreBar("Confianza", data.confidenceNeed)}${scoreBar("Precio", data.priceSensitivity)}${scoreBar("Satisfacción", data.satisfaction)}${scoreBar("Frecuencia", data.frequency)}${scoreBar("Relación reciente", data.recency)}</article>
          <article class="dossier-card third"><h4>6. Evolución relacional</h4><p><strong>Nivel principal:</strong> ${text(data.primaryLevel)}</p><div class="dossier-pills">${list(data.secondaryLevels, "sin secundarios")}</div>${Object.entries(data.levelWeights || {}).map(([k,v]) => percentBar(k, Number(v))).join("")}</article>
          <article class="dossier-card third"><h4>7. Contenido digital</h4>${percentBar("Marca", data.trustDistribution.brand)}${percentBar("Producto", data.trustDistribution.product)}${percentBar("Experiencia", data.trustDistribution.experience)}<p><strong>Modalidades</strong></p><div class="dossier-pills">${list(data.modalities)}</div><p><strong>Formatos</strong></p><div class="dossier-pills">${list(data.formats)}</div><p><strong>Temporalidad</strong></p><div class="dossier-pills">${list(data.temporality)}</div></article>

          <article class="dossier-card"><h4>8. Producto percibido</h4><p><strong>Clasificación:</strong> ${text(data.productClassification)}</p><p><strong>Qué ocurre si no actúa:</strong> ${text(data.noBuyConsequence)}</p>${scoreBar("Urgencia percibida", data.perceivedUrgency)}<p><strong>Lógica de compra:</strong> ${text(data.purchaseLogic)}</p></article>
          <article class="dossier-card"><h4>9. Marketing mix</h4>${scoreBar("Producto", data.marketingMix.product)}${scoreBar("Precio", data.marketingMix.price)}${scoreBar("Distribución", data.marketingMix.place)}${scoreBar("Comunicación", data.marketingMix.promotion)}<p>Lectura: las 4P traducen la percepción del Buyer Persona en palancas de valor, confianza, acceso y mensaje.</p></article>

          <article class="dossier-card"><h4>10. Canalidad</h4><p><strong>Terminales</strong></p><div class="dossier-pills">${list(data.terminals)}</div><p><strong>Medios</strong></p><div class="dossier-pills">${list(data.media)}</div><p><strong>Soportes</strong></p><div class="dossier-pills">${list(data.supports)}</div><p><strong>Intenciones</strong></p><div class="dossier-pills">${list(data.intentions)}</div></article>
          <article class="dossier-card"><h4>11. Keywords estratégicas</h4><p>Las keywords salen de dolores, deseos, producto, rol y momento mental.</p><div class="dossier-pills">${list([...kw.informational, ...kw.comparative, ...kw.transactional, ...kw.long_tail].slice(0, 18))}</div></article>

          <article class="dossier-card wide"><h4>12. Topic cluster</h4><div class="dossier-cluster"><strong>${esc(pillar)}</strong><p>Content pillar principal: pieza troncal que organiza la autoridad temática y conecta necesidad, búsqueda, contenido y decisión.</p><div class="dossier-branches">${branches.map((branch) => `<article><b>${esc(branch.title)}</b><p>${esc(branch.keyword)}</p><p>${esc(branch.stage)}</p></article>`).join("")}</div></div></article>

          <article class="dossier-card"><h4>13. KPIs</h4><p><strong>Awareness</strong></p><div class="dossier-pills">${list(kpis.awareness)}</div><p><strong>Engagement</strong></p><div class="dossier-pills">${list(kpis.engagement)}</div><p><strong>Conversión</strong></p><div class="dossier-pills">${list(kpis.conversion)}</div><p><strong>Relación</strong></p><div class="dossier-pills">${list(kpis.relationship)}</div></article>
          <article class="dossier-card"><h4>14. Informe Doc ROI integrado</h4><p><strong>Diagnóstico:</strong> ${esc(rx.diagnosis)}</p><p><strong>Interpretación:</strong> ${esc(rx.interpretation)}</p><p><strong>Impacto:</strong> ${esc(rx.impact)}</p><p><strong>Siguiente paso:</strong> ${esc(rx.next_step)}</p><p><strong>Pains derivados:</strong></p><div class="dossier-pills">${list(pains)}</div><p><strong>Gains derivados:</strong></p><div class="dossier-pills">${list(gains)}</div></article>
        </div>
        <div class="dossier-footer-print">
          <img src="${logoBlack}" alt="Doc ROI">
          <p>La propiedad intelectual del ecosistema Doc ROI pertenece al Ph. D. Jorge Lucio Sánchez Galán.</p>
          <button class="dossier-print" data-docroi-print="1">Imprimir / guardar PDF</button>
        </div>
      </div>
    </section>
  `;
}

function hideRecipeNavigation() {
  document.querySelectorAll<HTMLButtonElement>(".step-list button").forEach((button) => {
    const label = button.textContent || "";
    if (/receta/i.test(label)) button.dataset.docroiRecipeHidden = "1";
  });
  const store = usePersonaStore.getState();
  if (store.currentStep === 13 || isRecipeStep()) store.setStep(14);
}

function enhanceFinalDossier() {
  scheduled = false;
  installStyles();
  hideRecipeNavigation();

  document.querySelectorAll(".wizard-card .form-section").forEach((section) => {
    section.classList.toggle("docroi-final-step", isFinalStep());
  });

  if (!isFinalStep()) {
    document.querySelectorAll('[data-docroi-final-dossier="1"]').forEach((node) => node.remove());
    return;
  }

  const formGrid = document.querySelector<HTMLElement>(".wizard-card .form-section .form-grid");
  const existing = document.querySelector<HTMLElement>('[data-docroi-final-dossier="1"]');
  const html = finalDossierHtml();
  if (existing) existing.outerHTML = html;
  else formGrid?.insertAdjacentHTML("afterbegin", html);

  document.querySelectorAll<HTMLButtonElement>('[data-docroi-print="1"]').forEach((button) => {
    button.onclick = () => window.print();
  });
}

function scheduleFinalDossier() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(enhanceFinalDossier);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleFinalDossier();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleFinalDossier).observe(root, { childList: true, subtree: true });
  usePersonaStore.subscribe(scheduleFinalDossier);
});

export {};
