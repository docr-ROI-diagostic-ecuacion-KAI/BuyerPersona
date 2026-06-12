type PhaseGuidance = {
  title: string;
  body: string;
  points: string[];
};

const phaseGuidance: Record<string, PhaseGuidance> = {
  Bienvenida: {
    title: "Para que sirve esta fase",
    body: "Antes de crear un Buyer Persona hay que saber para que caso se esta trabajando. Esta fase no describe aun a una persona: delimita el negocio, el producto, el mercado y la decision que se quiere mejorar.",
    points: [
      "Proyecto: nombre del caso o iniciativa.",
      "Producto: solucion que se quiere analizar.",
      "Objetivo: decision de negocio que debe mejorar.",
    ],
  },
  Identidad: {
    title: "Que son las generaciones digitales",
    body: "Son una forma sencilla de entender como distintas personas han aprendido a informarse, confiar, comprar y usar tecnologia. No son etiquetas rigidas: son hipotesis para pensar canales, lenguaje, formatos y nivel de explicacion.",
    points: [
      "Sirven para anticipar confianza, riesgo y canalidad.",
      "Ayudan a elegir contenido: video, informe, demo, email o comunidad.",
      "Deben validarse con datos, entrevistas o comportamiento observado.",
    ],
  },
  Necesidad: {
    title: "Que significa necesidad real",
    body: "Una necesidad no es lo que la marca quiere vender. Es el problema que la persona intenta resolver, la presion que siente y el resultado que espera conseguir si actua.",
    points: [
      "Dolor: que le frena o le preocupa.",
      "Ganancia: que resultado considera valioso.",
      "Confianza: que prueba necesita antes de avanzar.",
    ],
  },
  Empatizar: {
    title: "Como leer a la persona",
    body: "Empatizar no significa imaginar frases bonitas. Significa observar que oye, que ve, que piensa, que siente, que dice y que hace para comprender la decision desde su contexto real.",
    points: [
      "Busca evidencias, no suposiciones comodas.",
      "Conecta miedo, deseo, objecion y motivacion con una decision de negocio.",
      "Referencia: GRAY, D. (2017). The Empathy Map Canvas. XPLANE. Disponible en: https://xplane.com.",
    ],
  },
  Compra: {
    title: "Como interpretar la compra",
    body: "Comprar no es solo pagar. Es reducir incertidumbre. Un perfil compra cuando entiende el valor, confia en la propuesta, percibe bajo riesgo y siente que el momento es adecuado.",
    points: [
      "Urgencia: cuanto necesita resolver ahora.",
      "Precio: cuanto pesa el coste frente al valor.",
      "Prueba social: cuanto necesita validacion externa.",
    ],
  },
  "Evolucion relacional": {
    title: "Que relacion tiene con el dato",
    body: "Esta fase mira la madurez del usuario ante la informacion. Algunas personas solo quieren acceder a datos basicos; otras ya pueden comparar, decidir, automatizar o actuar con IA.",
    points: [
      "No todos los perfiles necesitan el mismo nivel de detalle.",
      "La madurez condiciona contenido, canal y acompanamiento.",
      "El objetivo es mover informacion hacia decision.",
    ],
  },
  Contenido: {
    title: "Contenido no es solo formato",
    body: "Un contenido funciona cuando encaja con la atencion, el canal y la confianza del perfil. No basta elegir video o texto: hay que saber que debe explicar, demostrar o activar.",
    points: [
      "Modalidad: video, texto, audio, visual o interactivo.",
      "Formato: webinar, demo, informe, carrusel, email o caso.",
      "Funcion: educar, convencer, comparar o convertir.",
    ],
  },
  Producto: {
    title: "Como traducir producto a valor",
    body: "El producto no debe describirse solo por sus caracteristicas. Para un Buyer Persona importa que problema resuelve, que cambio produce y que coste evita.",
    points: [
      "Pildora: aprendizaje rapido.",
      "Vitamina: madurez y criterio.",
      "Medicina: intervencion sobre un problema concreto.",
    ],
  },
  "Marketing mix": {
    title: "Las cuatro palancas basicas",
    body: "El marketing mix ayuda a ordenar la propuesta. Producto, precio, distribucion y comunicacion explican como el valor llega al cliente y que fricciones pueden bloquear la decision.",
    points: [
      "Producto: que transformacion ofrece.",
      "Precio: como se percibe el valor.",
      "Comunicacion: que narrativa activa confianza.",
    ],
  },
  Canalidad: {
    title: "Que significa canalidad",
    body: "Canalidad no es decir Instagram, LinkedIn o email. Es entender donde esta la persona, con que dispositivo, en que contexto, con que intencion y que tipo de relacion permite cada canal.",
    points: [
      "Terminal: movil, ordenador, aula, evento o asistente.",
      "Medio: web, email, redes, comunidad o IA.",
      "Soporte: landing, PDF, webinar, newsletter o CRM.",
    ],
  },
  Keywords: {
    title: "Keywords como lenguaje del cliente",
    body: "Las palabras clave no son solo SEO. Son pistas de como piensa, busca, duda y expresa necesidad el Buyer Persona. Ayudan a conectar marketing, contenido e IA.",
    points: [
      "Identifica palabras de dolor, deseo y solucion.",
      "Relaciona busqueda con etapa de decision.",
      "Usalas para preparar contenido y prompts.",
    ],
  },
  Clusters: {
    title: "Como organizar autoridad tematica",
    body: "Un cluster agrupa temas relacionados alrededor de una idea central. Sirve para que el contenido no sea una lista suelta, sino una arquitectura de aprendizaje y posicionamiento.",
    points: [
      "Pillar: tema principal.",
      "Subtemas: preguntas, objeciones y casos.",
      "Uso: ordenar contenido para clase, web o IA.",
    ],
  },
  KPIs: {
    title: "KPIs para decidir, no para decorar",
    body: "Un KPI solo tiene sentido si ayuda a tomar una decision. No se trata de medir por medir, sino de saber si el perfil entiende, confia, interactua, convierte o repite.",
    points: [
      "Awareness: descubre la propuesta.",
      "Engagement: muestra interes real.",
      "Conversion: realiza la accion esperada.",
    ],
  },
  Receta: {
    title: "De diagnostico a accion",
    body: "La receta resume que se ha aprendido y que conviene hacer. Une problema, perfil, canal, contenido y siguiente paso para que el analisis termine en una decision operativa.",
    points: [
      "Diagnostico: que ocurre.",
      "Intervencion: que recurso Doc ROI ayuda.",
      "Siguiente paso: que accion concreta ejecutar.",
    ],
  },
  "Ficha final": {
    title: "Como usar el entregable final",
    body: "La ficha final convierte el trabajo en un dossier reutilizable. Debe poder explicarse en clase, compartirse con un equipo y servir como base para IA, contenidos, automatizacion o estrategia comercial.",
    points: [
      "Resume identidad, empatia, canalidad y KPIs.",
      "Permite descargar o copiar la estructura.",
      "Convierte aprendizaje en criterio accionable.",
    ],
  },
};

function currentStepTitle(): string {
  return document.querySelector(".builder-head h2")?.textContent?.trim() || "";
}

function installPhaseGuidanceStyles() {
  if (document.getElementById("docroi-phase-guidance-style")) return;
  const style = document.createElement("style");
  style.id = "docroi-phase-guidance-style";
  style.textContent = `
    .docroi-phase-guide {
      background: linear-gradient(160deg, #05070b, #0b0f19) !important;
      border: 1px solid rgba(216, 236, 248, .18) !important;
      color: #fff !important;
      box-shadow: 0 16px 38px rgba(5, 7, 11, .16);
    }
    .docroi-phase-guide strong {
      color: #d8ecf8 !important;
      font-size: 15px !important;
      line-height: 1.25 !important;
    }
    .docroi-phase-guide p {
      color: #eaf6fb !important;
      font-size: 13px !important;
      line-height: 1.62 !important;
    }
    .docroi-phase-list {
      display: grid;
      gap: 7px;
      margin: 12px 0 0;
      padding: 0;
      list-style: none;
    }
    .docroi-phase-list li {
      border: 1px solid rgba(216, 236, 248, .16);
      border-radius: 12px;
      background: rgba(216, 236, 248, .08);
      color: #f6fbfe;
      font-size: 12px;
      line-height: 1.42;
      font-weight: 700;
      padding: 9px 10px;
    }
    .docroi-generation-lesson {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

function renderPhaseGuidance() {
  installPhaseGuidanceStyles();
  const step = currentStepTitle();
  const guidance = phaseGuidance[step];
  const feed = document.querySelector<HTMLElement>(".summary-panel .education-frame .feed-note");
  if (!feed || !guidance) return;

  const html = `${guidance.title}|${guidance.body}|${guidance.points.join("|")}`;
  if (feed.dataset.phaseGuidance === html) return;

  feed.dataset.phaseGuidance = html;
  feed.classList.add("docroi-phase-guide", "docroi-identity-guide");
  feed.innerHTML = `
    <strong>${guidance.title}</strong>
    <p>${guidance.body}</p>
    <ul class="docroi-phase-list">
      ${guidance.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;

  const generation = document.querySelector<HTMLElement>(".summary-panel .education-frame .generation-note");
  if (generation) {
    generation.classList.add("docroi-generation-lesson");
    generation.innerHTML = "";
  }
}

function schedulePhaseGuidance() {
  renderPhaseGuidance();
  window.setTimeout(renderPhaseGuidance, 80);
  window.setTimeout(renderPhaseGuidance, 240);
  window.setTimeout(renderPhaseGuidance, 700);
}

window.addEventListener("DOMContentLoaded", () => {
  schedulePhaseGuidance();
  const root = document.getElementById("root");
  if (root) {
    new MutationObserver(() => window.requestAnimationFrame(schedulePhaseGuidance)).observe(root, {
      childList: true,
      subtree: true,
    });
  }
});

window.addEventListener("hashchange", schedulePhaseGuidance);
