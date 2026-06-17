const TITLE = "Funcionalidades web demandadas";
const STEP_DESCRIPTION = "Las funcionalidades que demanda este Buyer Persona de tu página web para informarse, confiar, comunicarse y avanzar.";
const FEED_TITLE = "Funcionalidades web que demanda el Buyer Persona";
const FEED_BODY = "Usamos la lógica de la pirámide de Maslow como símil pedagógico: antes de pedir conversión, relación o autogestión, la web debe resolver necesidades funcionales básicas. El Buyer Persona puede demandar acceso, información, interacción, transacción, relación, experiencia, prescripción o autogestión en distinta intensidad.";
const FEED_HELP = "Ajusta cada barra pensando qué necesita encontrar o hacer esta persona en la web para comunicarse bien con la marca: entrar, entender, comparar, preguntar, comprar, recibir seguimiento, vivir una experiencia fluida, recomendar o autogestionarse.";

let scheduled = false;

function isRelationshipText(text = "") {
  return /evolución relacional/i.test(text) || /evolucion relacional/i.test(text) || /relacional con el dato/i.test(text);
}

function isFunctionalityStepActive() {
  const title = document.querySelector(".builder-head h2")?.textContent || "";
  return isRelationshipText(title) || /funcionalidades web/i.test(title);
}

function setText(node: Element | null, text: string) {
  if (!node || node.textContent?.trim() === text) return;
  node.textContent = text;
}

function renameIndexButton() {
  document.querySelectorAll<HTMLButtonElement>(".step-list button").forEach((button) => {
    const text = button.textContent || "";
    if (!isRelationshipText(text) && !/funcionalidades web/i.test(text)) return;

    const number = button.querySelector("span")?.textContent || "6";
    button.innerHTML = `<span>${number}</span>${TITLE}`;
  });
}

function renameHeaderAndSection() {
  if (!isFunctionalityStepActive()) return;

  setText(document.querySelector(".builder-head h2"), TITLE);

  const sectionTitle = document.querySelector(".wizard-card .form-section h3");
  setText(sectionTitle, TITLE);

  const sectionDescription = document.querySelector(".wizard-card .form-section > p");
  setText(sectionDescription, STEP_DESCRIPTION);
}

function rewriteFeed() {
  if (!isFunctionalityStepActive()) return;

  const frame = document.querySelector(".summary-panel .education-frame");
  if (!frame) return;

  setText(frame.querySelector("h3"), FEED_TITLE);
  setText(frame.querySelector(":scope > p"), FEED_BODY);

  const note = frame.querySelector(".feed-note");
  if (!note) return;
  setText(note.querySelector("strong"), "Cómo cumplimentarlo");
  setText(note.querySelector("p"), FEED_HELP);
}

function applyCopy() {
  scheduled = false;
  renameIndexButton();
  renameHeaderAndSection();
  rewriteFeed();
}

function scheduleCopy() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(applyCopy);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleCopy();
  window.setTimeout(scheduleCopy, 100);
  window.setTimeout(scheduleCopy, 500);
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleCopy).observe(root, { childList: true, subtree: true, characterData: true });
});

export {};
