import { keywords, recommendedKpis, topicClusters } from "./lib/recommendations";
import { usePersonaStore } from "./store";

const styleId = "docroi-editable-strategy-style";
const storageKey = "docroi-buyer-persona-strategy-selections-v1";
let scheduled = false;

type SelectionState = {
  signature: string;
  keywords: string[];
  keywordCustom: Record<string, string[]>;
  clusters: string[];
  kpis: string[];
  kpiCustom: Record<string, string[]>;
};

type ClusterOption = {
  id: string;
  title: string;
  subtopics: string[];
  keywords: string[];
  stage: string;
};

function esc(value: unknown) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char] || char));
}

function slug(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";
}

function dataSignature() {
  const data = usePersonaStore.getState().data;
  return JSON.stringify({
    product: data.product,
    sector: data.sector,
    role: data.role,
    businessGoal: data.businessGoal,
    needsToSolve: data.needsToSolve,
    primaryLevel: data.primaryLevel,
    media: data.media,
    formats: data.formats,
    fictionalName: data.fictionalName,
  });
}

function unique(items: string[]) {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

function keywordGroups() {
  const data = usePersonaStore.getState().data;
  const source = keywords(data);
  return Object.entries(source).map(([key, items]) => ({ key, title: keywordLabel(key), items: unique(items) }));
}

function kpiGroups() {
  const source = recommendedKpis(usePersonaStore.getState().data);
  return Object.entries(source).map(([key, items]) => ({ key, title: kpiLabel(key), items: unique(items) }));
}

function clusterOptions(): ClusterOption[] {
  const data = usePersonaStore.getState().data;
  const base = topicClusters(data).map((cluster, index) => ({
    id: `cluster-${index + 1}-${slug(cluster.pillar_topic)}`,
    title: cluster.pillar_topic,
    subtopics: cluster.subtopics,
    keywords: cluster.keywords,
    stage: cluster.journey_stage,
  }));
  const product = data.product || "producto";
  const persona = data.fictionalName || "Buyer Persona";
  const need = data.needsToSolve || "necesidad principal";
  const media = data.media.slice(0, 3).length ? data.media.slice(0, 3) : ["canalidad", "confianza", "conversión"];
  const formats = data.formats.slice(0, 3).length ? data.formats.slice(0, 3) : ["guía", "demo", "caso de uso"];
  const extra: ClusterOption[] = [
    {
      id: `cluster-3-contenido-${slug(product)}`,
      title: `Contenido educativo para ${product}`,
      subtopics: ["preguntas frecuentes", "objeciones", "guías", "casos de uso"],
      keywords: formats,
      stage: "aprendizaje y confianza",
    },
    {
      id: `cluster-4-canalidad-${slug(persona)}`,
      title: `Canalidad y conversión para ${persona}`,
      subtopics: ["terminal", "medio", "soporte", "formato", "seguimiento"],
      keywords: media,
      stage: need,
    },
  ];
  return [...base, ...extra].slice(0, 4);
}

function keywordLabel(key: string) {
  const labels: Record<string, string> = {
    informational: "Informativas",
    comparative: "Comparativas",
    transactional: "Transaccionales",
    navigational: "Navegacionales",
    relational: "Relacionales",
    experiential: "Experienciales",
    autonomy: "Autogestión / IA",
    long_tail: "Long tail estratégica",
  };
  return labels[key] || key;
}

function kpiLabel(key: string) {
  const labels: Record<string, string> = {
    awareness: "Awareness",
    engagement: "Engagement",
    conversion: "Conversión",
    relationship: "Relación",
    loyalty: "Fidelización",
    experience: "Experiencia",
    influence: "Influencia",
    autonomy: "Autogestión",
  };
  return labels[key] || key;
}

function defaultState(): SelectionState {
  const proposedKeywords = keywordGroups().flatMap((group) => group.items).slice(0, 14);
  const proposedKpis = kpiGroups().flatMap((group) => group.items).slice(0, 14);
  return {
    signature: dataSignature(),
    keywords: proposedKeywords,
    keywordCustom: {},
    clusters: clusterOptions().slice(0, 2).map((cluster) => cluster.id),
    kpis: proposedKpis,
    kpiCustom: {},
  };
}

function loadState(): SelectionState {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "null") as SelectionState | null;
    if (parsed?.signature === dataSignature()) return parsed;
  } catch {
    // Ignore broken storage.
  }
  const state = defaultState();
  saveState(state);
  return state;
}

function saveState(state: SelectionState) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function addCustom(kind: "keywordCustom" | "kpiCustom", groupKey: string, value: string) {
  const clean = value.trim();
  if (!clean) return;
  const state = loadState();
  const custom = { ...state[kind] };
  custom[groupKey] = unique([...(custom[groupKey] || []), clean]);
  if (kind === "keywordCustom") state.keywords = unique([...state.keywords, clean]);
  else state.kpis = unique([...state.kpis, clean]);
  saveState({ ...state, [kind]: custom });
}

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .docroi-editable-strategy { grid-column: 1 / -1; display: grid; gap: 16px; text-align: left; }
    .docroi-editable-strategy-head { border: 1px solid #dce7ef; border-radius: 18px; background: #f8fafc; padding: 16px; display: grid; gap: 8px; }
    .docroi-editable-strategy-head span { display: inline-flex; width: fit-content; border-radius: 999px; padding: 7px 10px; background: #eaf6fb; color: #003b5c; font-size: 10px; font-weight: 950; letter-spacing: .05em; text-transform: uppercase; }
    .docroi-editable-strategy-head strong { color: #003b5c; font-size: 22px; line-height: 1.08; font-weight: 950; }
    .docroi-editable-strategy-head p { margin: 0; color: #475569 !important; font-size: 14px !important; line-height: 1.55 !important; }
    .docroi-editable-group { border: 1px solid #dce7ef; border-radius: 18px; background: #fff; padding: 15px; display: grid; gap: 12px; }
    .docroi-editable-group h4 { margin: 0; color: #003b5c; font-size: 18px; line-height: 1.12; font-weight: 950; }
    .docroi-editable-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .docroi-editable-chip { border: 1px solid #dce7ef; border-radius: 999px; background: #fff; color: #0f172a; padding: 9px 11px; cursor: pointer; font-size: 12px; line-height: 1.1; font-weight: 850; }
    .docroi-editable-chip.active { background: #003b5c; border-color: #003b5c; color: #fff; }
    .docroi-other-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .docroi-other-row input { min-height: 42px; border: 1px solid #dce7ef; border-radius: 999px; padding: 0 13px; font-size: 13px; flex: 1 1 220px; }
    .docroi-other-row button { min-height: 42px; border: 0; border-radius: 999px; background: #eaf6fb; color: #003b5c; padding: 0 13px; font-size: 12px; font-weight: 950; cursor: pointer; }
    .docroi-cluster-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .docroi-cluster-card { border: 1px solid #dce7ef; border-radius: 18px; background: #fff; padding: 16px; display: grid; gap: 10px; cursor: pointer; }
    .docroi-cluster-card.active { border-color: #003b5c; box-shadow: inset 0 0 0 2px rgba(0,59,92,.16); }
    .docroi-cluster-card label { display: flex; align-items: center; gap: 9px; color: #003b5c; font-size: 18px; line-height: 1.1; font-weight: 950; cursor: pointer; }
    .docroi-cluster-card input { width: 18px; height: 18px; accent-color: #003b5c; }
    .docroi-cluster-card p { margin: 0; color: #475569 !important; font-size: 13px !important; line-height: 1.55 !important; }
    .docroi-cluster-card small { color: #64748b; font-size: 11px; font-weight: 850; }
    .panel-grid.docroi-original-hidden { display: none !important; }
    @media (max-width: 800px) { .docroi-cluster-grid { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(style);
}

function currentStepTitle() {
  return (document.querySelector(".builder-head h2")?.textContent || "").trim();
}

function findFormGrid() {
  return document.querySelector<HTMLElement>(".wizard-card .form-section .form-grid");
}

function replaceOriginalPanel() {
  findFormGrid()?.querySelector(".panel-grid")?.classList.add("docroi-original-hidden");
}

function renderKeywordEditor() {
  const grid = findFormGrid();
  if (!grid) return;
  replaceOriginalPanel();
  const state = loadState();
  const groups = keywordGroups();
  const html = `
    <section class="docroi-editable-strategy" data-docroi-editable-strategy="keywords">
      <header class="docroi-editable-strategy-head">
        <span>Propuesta editable</span>
        <strong>Hemos obtenido estas keywords como aproximación inicial</strong>
        <p>Selecciona las que consideres más oportunas para este Buyer Persona. Puedes activar, desactivar o añadir otras etiquetas. Lo seleccionado aparecerá en la Ficha Buyer Persona final.</p>
      </header>
      ${groups.map((group) => {
        const custom = state.keywordCustom[group.key] || [];
        const allItems = unique([...group.items, ...custom]);
        return `<article class="docroi-editable-group" data-group="${esc(group.key)}"><h4>${esc(group.title)}</h4><div class="docroi-editable-chips">${allItems.map((item) => `<button type="button" class="docroi-editable-chip ${state.keywords.includes(item) ? "active" : ""}" data-kind="keyword" data-value="${esc(item)}">${esc(item)}</button>`).join("")}</div><div class="docroi-other-row"><input data-other-input="keyword" data-group="${esc(group.key)}" placeholder="Otra keyword"><button type="button" data-add-other="keyword" data-group="${esc(group.key)}">Añadir otra</button></div></article>`;
      }).join("")}
    </section>`;
  const existing = grid.querySelector('[data-docroi-editable-strategy="keywords"]');
  if (existing) existing.outerHTML = html;
  else grid.insertAdjacentHTML("beforeend", html);
}

function renderKpiEditor() {
  const grid = findFormGrid();
  if (!grid) return;
  replaceOriginalPanel();
  const state = loadState();
  const groups = kpiGroups();
  const html = `
    <section class="docroi-editable-strategy" data-docroi-editable-strategy="kpis">
      <header class="docroi-editable-strategy-head">
        <span>Propuesta editable</span>
        <strong>Hemos obtenido estos KPIs recomendados como aproximación inicial</strong>
        <p>Activa los indicadores que realmente quieras llevar a seguimiento. Puedes desactivar los menos relevantes o añadir otros por categoría. Lo seleccionado aparecerá en la Ficha Buyer Persona final.</p>
      </header>
      ${groups.map((group) => {
        const custom = state.kpiCustom[group.key] || [];
        const allItems = unique([...group.items, ...custom]);
        return `<article class="docroi-editable-group" data-group="${esc(group.key)}"><h4>${esc(group.title)}</h4><div class="docroi-editable-chips">${allItems.map((item) => `<button type="button" class="docroi-editable-chip ${state.kpis.includes(item) ? "active" : ""}" data-kind="kpi" data-value="${esc(item)}">${esc(item)}</button>`).join("")}</div><div class="docroi-other-row"><input data-other-input="kpi" data-group="${esc(group.key)}" placeholder="Otro KPI"><button type="button" data-add-other="kpi" data-group="${esc(group.key)}">Añadir otro</button></div></article>`;
      }).join("")}
    </section>`;
  const existing = grid.querySelector('[data-docroi-editable-strategy="kpis"]');
  if (existing) existing.outerHTML = html;
  else grid.insertAdjacentHTML("beforeend", html);
}

function renderClusterSelector() {
  const grid = findFormGrid();
  if (!grid) return;
  replaceOriginalPanel();
  const state = loadState();
  const options = clusterOptions();
  const html = `
    <section class="docroi-editable-strategy" data-docroi-editable-strategy="clusters">
      <header class="docroi-editable-strategy-head">
        <span>Checklist estratégico</span>
        <strong>Hemos obtenido estos topic clusters como aproximación inicial</strong>
        <p>Selecciona los clusters con los que estás de acuerdo. Aquí no se editan textos: se valida qué territorios temáticos pasan a la Ficha Buyer Persona final.</p>
      </header>
      <div class="docroi-cluster-grid">
        ${options.map((cluster) => `<article class="docroi-cluster-card ${state.clusters.includes(cluster.id) ? "active" : ""}" data-cluster-card="${esc(cluster.id)}"><label><input type="checkbox" ${state.clusters.includes(cluster.id) ? "checked" : ""} data-cluster="${esc(cluster.id)}">${esc(cluster.title)}</label><p>${esc(cluster.subtopics.join(" · "))}</p><small>${esc(cluster.stage)} · ${esc(cluster.keywords.join(" · "))}</small></article>`).join("")}
      </div>
    </section>`;
  const existing = grid.querySelector('[data-docroi-editable-strategy="clusters"]');
  if (existing) existing.outerHTML = html;
  else grid.insertAdjacentHTML("beforeend", html);
}

function selectedClusters() {
  const state = loadState();
  return clusterOptions().filter((cluster) => state.clusters.includes(cluster.id));
}

function selectedKeywords() {
  return loadState().keywords;
}

function selectedKpis() {
  return loadState().kpis;
}

function renderFinalSelections() {
  const dossier = document.querySelector('[data-docroi-final-dossier="1"]');
  if (!dossier) return;
  const keywordCard = Array.from(dossier.querySelectorAll<HTMLElement>(".dossier-card")).find((card) => /11\.\s*Keywords/i.test(card.querySelector("h4")?.textContent || ""));
  if (keywordCard) {
    keywordCard.innerHTML = `<h4>11. Keywords estratégicas seleccionadas</h4><p>Keywords validadas por el alumno a partir de la propuesta generada.</p><div class="dossier-pills">${selectedKeywords().map((item) => `<span>${esc(item)}</span>`).join("") || '<span class="empty">pendiente</span>'}</div>`;
  }

  const clusterCard = Array.from(dossier.querySelectorAll<HTMLElement>(".dossier-card")).find((card) => /12\.\s*Topic/i.test(card.querySelector("h4")?.textContent || ""));
  const clusters = selectedClusters();
  if (clusterCard) {
    clusterCard.innerHTML = `<h4>12. Topic clusters seleccionados</h4><div class="dossier-branches">${clusters.map((cluster) => `<article><b>${esc(cluster.title)}</b><p>${esc(cluster.subtopics.join(" · "))}</p><p>${esc(cluster.stage)}</p></article>`).join("") || '<article><b>Pendiente</b><p>No hay clusters seleccionados.</p></article>'}</div>`;
  }

  const kpiCard = Array.from(dossier.querySelectorAll<HTMLElement>(".dossier-card")).find((card) => /13\.\s*KPIs/i.test(card.querySelector("h4")?.textContent || ""));
  if (kpiCard) {
    kpiCard.innerHTML = `<h4>13. KPIs seleccionados</h4><p>Indicadores validados para seguimiento del Buyer Persona.</p><div class="dossier-pills">${selectedKpis().map((item) => `<span>${esc(item)}</span>`).join("") || '<span class="empty">pendiente</span>'}</div>`;
  }
}

function handleClicks(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  const chip = target?.closest<HTMLButtonElement>("[data-kind][data-value]");
  if (chip) {
    const state = loadState();
    const value = chip.dataset.value || "";
    if (chip.dataset.kind === "keyword") state.keywords = toggle(state.keywords, value);
    if (chip.dataset.kind === "kpi") state.kpis = toggle(state.kpis, value);
    saveState(state);
    scheduleApply();
    return;
  }

  const add = target?.closest<HTMLButtonElement>("[data-add-other]");
  if (add) {
    const kind = add.dataset.addOther === "kpi" ? "kpiCustom" : "keywordCustom";
    const group = add.dataset.group || "otros";
    const input = document.querySelector<HTMLInputElement>(`input[data-other-input="${add.dataset.addOther}"][data-group="${CSS.escape(group)}"]`);
    addCustom(kind, group, input?.value || "");
    if (input) input.value = "";
    scheduleApply();
    return;
  }

  const cluster = target?.closest<HTMLInputElement>("[data-cluster]");
  if (cluster) {
    const state = loadState();
    state.clusters = toggle(state.clusters, cluster.dataset.cluster || "");
    saveState(state);
    scheduleApply();
  }
}

function handleEnter(event: KeyboardEvent) {
  if (event.key !== "Enter") return;
  const input = event.target instanceof HTMLInputElement ? event.target : null;
  const kind = input?.dataset.otherInput;
  if (!kind) return;
  event.preventDefault();
  addCustom(kind === "kpi" ? "kpiCustom" : "keywordCustom", input.dataset.group || "otros", input.value);
  input.value = "";
  scheduleApply();
}

function applyEditableSelections() {
  scheduled = false;
  installStyles();
  const title = currentStepTitle();
  if (/keywords/i.test(title)) renderKeywordEditor();
  else document.querySelector('[data-docroi-editable-strategy="keywords"]')?.remove();
  if (/clusters/i.test(title)) renderClusterSelector();
  else document.querySelector('[data-docroi-editable-strategy="clusters"]')?.remove();
  if (/kpis/i.test(title)) renderKpiEditor();
  else document.querySelector('[data-docroi-editable-strategy="kpis"]')?.remove();
  renderFinalSelections();
}

function scheduleApply() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(applyEditableSelections);
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    scheduleApply();
    document.addEventListener("click", handleClicks, true);
    document.addEventListener("keydown", handleEnter, true);
    const root = document.getElementById("root") || document.body;
    new MutationObserver(scheduleApply).observe(root, { childList: true, subtree: true, characterData: true });
    usePersonaStore.subscribe(scheduleApply);
  });
}

export {};
