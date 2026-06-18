const ENGLISH_LOCK_KEY = "docroi-buyer-persona-lang";

const dictionary = new Map<string, string>([
  ["Constructor", "Builder"],
  ["Metodología", "Methodology"],
  ["Iniciar diagnóstico", "Start diagnosis"],
  ["Ver metodología", "View methodology"],
  ["Clínica Doc ROI · Buyer Persona con IA", "Doc ROI Clinic · AI Buyer Persona"],
  ["Sistema premium de inteligencia de Buyer Persona", "Premium Buyer Persona Intelligence System"],
  ["Generacion Perfil Buyer Persona con IA", "AI Buyer Persona Profile Generation"],
  ["Generación Perfil Buyer Persona con IA", "AI Buyer Persona Profile Generation"],
  ["Una experiencia de consultoría guiada para formar, diagnosticar y construir un dossier de comportamiento digital, contenido, canalidad, automatización y monetización del dato.", "A guided consulting experience to teach, diagnose and build a dossier on digital behavior, content, channel architecture, automation and data monetization."],
  ["Objetivo clínico", "Clinical objective"],
  ["Transformar una hipótesis de cliente en un sistema de inteligencia accionable.", "Transform a customer hypothesis into an actionable intelligence system."],
  ["Nivel", "Level"],
  ["Herramientas", "Tools"],
  ["Resultado", "Outcome"],
  ["Ficha, dossier PDF, JSON, prompts IA", "Persona sheet, PDF dossier, JSON, AI prompts"],
  ["Buyer Persona completo y activable", "Complete and actionable Buyer Persona"],
  ["Constructor guiado · Ficha final", "Guided builder · Final sheet"],
  ["Una buena ficha no describe personas por decorar: ayuda a decidir contenidos, canales, mensajes, automatizaciones, KPIs y validación de valor.", "A strong sheet does not describe people for decoration: it helps decide content, channels, messages, automations, KPIs and value validation."],
  ["Feed formativo", "Learning feed"],
  ["Clínica estratégica", "Strategic clinic"],
  ["Cómo cumplimentarlo", "How to complete it"],
  ["Guardado local automático", "Automatic local save"],
  ["Anterior", "Previous"],
  ["Siguiente", "Next"],
  ["Reiniciar", "Reset"],
  ["Bienvenida", "Welcome"],
  ["Identidad", "Identity"],
  ["Necesidad", "Need"],
  ["Empatizar", "Empathize"],
  ["Compra", "Purchase"],
  ["Funcionalidades web demandadas", "Web functionalities demanded"],
  ["Contenido", "Content"],
  ["Producto", "Product"],
  ["Canalidad", "Channel architecture"],
  ["Receta", "Prescription"],
  ["Ficha final", "Final sheet"],
  ["Preparación", "Preparation"],
  ["Proyecto", "Project"],
  ["Producto o gama", "Product or range"],
  ["Sector", "Sector"],
  ["Mercado", "Market"],
  ["Objetivo de negocio", "Business objective"],
  ["Identidad del Buyer Persona", "Buyer Persona identity"],
  ["Caracterización inicial, contexto cultural y generación digital.", "Initial characterization, cultural context and digital generation."],
  ["Nombre ficticio", "Fictional name"],
  ["Generación digital", "Digital generation"],
  ["Descripción ejecutiva", "Executive description"],
  ["Edad", "Age"],
  ["Género", "Gender"],
  ["Ubicación", "Location"],
  ["Responsabilidad principal", "Main responsibility"],
  ["Baby Boomer digital", "Digital Baby Boomer"],
  ["Generación X digital", "Digital Generation X"],
  ["Generación Z", "Generation Z"],
  ["Alpha emergente", "Emerging Alpha"],
  ["Generación X (1965-1980)", "Generation X (1965-1980)"],
  ["Millennials o Generación Y (1981-1996)", "Millennials / Generation Y (1981-1996)"],
  ["Generación Z o Centennials (1997-2012)", "Generation Z / Centennials (1997-2012)"],
  ["Generación Alfa (2013-presente)", "Generation Alpha (2013-present)"],
  ["Necesidad y valor", "Need and value"],
  ["¿Qué necesita resolver?", "What does this person need to solve?"],
  ["¿Qué le preocupa?", "What worries this person?"],
  ["¿Qué desea conseguir?", "What does this person want to achieve?"],
  ["¿Qué le impide actuar?", "What prevents action?"],
  ["¿Qué evidencia le hace confiar?", "What evidence builds trust?"],
  ["Mapa de empatía", "Empathy map"],
  ["Lectura psicológica, humana y estratégica del Buyer Persona.", "Psychological, human and strategic reading of the Buyer Persona."],
  ["Qué escucha", "What they hear"],
  ["Qué ve", "What they see"],
  ["Qué piensa", "What they think"],
  ["Qué siente", "What they feel"],
  ["Qué dice", "What they say"],
  ["Qué hace", "What they do"],
  ["Miedos y frustraciones", "Fears and frustrations"],
  ["Deseos y motivaciones", "Desires and motivations"],
  ["Necesidad central", "Core need"],
  ["¿Qué piensa y siente?", "What do they think and feel?"],
  ["¿Qué escucha?", "What do they hear?"],
  ["¿Qué ve?", "What do they see?"],
  ["¿Qué dice y hace?", "What do they say and do?"],
  ["Comportamiento de compra", "Purchase behavior"],
  ["Señales de comportamiento de consumo. No sustituye CRM: forma criterio para priorizar.", "Consumer behavior signals. This does not replace CRM: it builds judgment for prioritization."],
  ["Urgencia", "Urgency"],
  ["Confianza", "Trust"],
  ["Sensibilidad", "Sensitivity"],
  ["Sensibilidad precio", "Price sensitivity"],
  ["Satisfacción", "Satisfaction"],
  ["Monetización", "Monetization"],
  ["Frecuencia", "Frequency"],
  ["Relación", "Relationship"],
  ["Relación reciente", "Recent relationship"],
  ["Prueba social", "Social proof"],
  ["Capacidad de monetización del dato que puede tener este Buyer Persona.", "Data monetization capacity this Buyer Persona may have."],
  ["Las funcionalidades que demanda este Buyer Persona de tu página web para informarse, confiar, comunicarse y avanzar.", "The functionalities this Buyer Persona demands from your website to get informed, trust, communicate and move forward."],
  ["Funcionalidades web que demanda el Buyer Persona", "Web functionalities demanded by the Buyer Persona"],
  ["Funcionalidades web que demanda este Buyer Persona", "Web functionalities demanded by this Buyer Persona"],
  ["Nivel dominante:", "Dominant level:"],
  ["Secundario:", "Secondary:"],
  ["Acceso", "Access"],
  ["Información", "Information"],
  ["Interacción", "Interaction"],
  ["Transacción", "Transaction"],
  ["Experiencia", "Experience"],
  ["Prescripción", "Advocacy"],
  ["Autogestión", "Self-management"],
  ["Funcionalidad dominante", "Dominant functionality"],
  ["Funcionalidades secundarias", "Secondary functionalities"],
  ["Fricción web", "Website friction"],
  ["Activación", "Activation"],
  ["Contenido digital", "Digital content"],
  ["Separa modalidad, formato, canal, interacción y temporalidad.", "Separate modality, format, channel, interaction and timing."],
  ["Modalidad", "Modality"],
  ["Formato", "Format"],
  ["Canal", "Channel"],
  ["Video, texto, imagen, audio o interactivo.", "Video, text, image, audio or interactive."],
  ["Pieza concreta: carrusel, informe, demo, webinar.", "Specific asset: carousel, report, demo, webinar."],
  ["Lugar de consumo y contexto.", "Consumption place and context."],
  ["Síncrona, asíncrona o híbrida.", "Synchronous, asynchronous or hybrid."],
  ["Marca", "Brand"],
  ["Modalidades", "Modalities"],
  ["Temporalidad", "Timing"],
  ["Formatos", "Formats"],
  ["vídeo", "video"],
  ["texto", "text"],
  ["imagen", "image"],
  ["audio", "audio"],
  ["interactivo", "interactive"],
  ["síncrono", "synchronous"],
  ["asíncrono", "asynchronous"],
  ["híbrido", "hybrid"],
  ["carrusel", "carousel"],
  ["infografía", "infographic"],
  ["landing", "landing page"],
  ["gamificación", "gamification"],
  ["caso de uso", "use case"],
  ["informe PDF", "PDF report"],
  ["Ecosistema Doc ROI", "Doc ROI ecosystem"],
  ["Nivel de intervención", "Intervention level"],
  ["Aspirina", "Aspirin"],
  ["Vitamina", "Vitamin"],
  ["Vacuna", "Vaccine"],
  ["Deseo Premium", "Premium desire"],
  ["Píldora", "Pill"],
  ["Medicina", "Medicine"],
  ["¿Qué ocurre si no actúa?", "What happens if they do not act?"],
  ["Mini masterclass: producto, precio, distribución y comunicación como palancas de valor.", "Mini masterclass: product, price, distribution and communication as value levers."],
  ["Precio", "Price"],
  ["Distribución", "Distribution"],
  ["Comunicación", "Communication"],
  ["Terminales, medios, soportes e interacción relacional.", "Terminals, media, supports and relational interaction."],
  ["Terminales", "Terminals"],
  ["Medios", "Media"],
  ["Soportes", "Supports"],
  ["Intención", "Intent"],
  ["móvil", "mobile"],
  ["asistente de voz", "voice assistant"],
  ["aula", "classroom"],
  ["evento presencial", "in-person event"],
  ["Redes sociales", "Social media"],
  ["Canales audiovisuales", "Audiovisual channels"],
  ["IA conversacional", "Conversational AI"],
  ["Eventos", "Events"],
  ["Comunidades", "Communities"],
  ["aprender", "learn"],
  ["resolver", "solve"],
  ["comparar", "compare"],
  ["comprar", "buy"],
  ["autoridad profesional", "professional authority"],
  ["automatizar", "automate"],
  ["delegar", "delegate"],
  ["mejorar productividad", "improve productivity"],
  ["Keywords estratégicas", "Strategic keywords"],
  ["Hipótesis estratégica generada desde el Buyer Persona.", "Strategic hypothesis generated from the Buyer Persona."],
  ["Arquitectura semántica con pillar content y clusters conectados.", "Semantic architecture with pillar content and connected clusters."],
  ["KPIs recomendados", "Recommended KPIs"],
  ["Receta Doc ROI", "Doc ROI prescription"],
  ["Diagnóstico ejecutivo y prescripción estratégica.", "Executive diagnosis and strategic prescription."],
  ["Entregable final", "Final deliverable"],
  ["Ficha visual, dossier ejecutivo y recursos para generar tu propio perfil con IA.", "Visual sheet, executive dossier and resources to generate your own AI profile."],
  ["Descargar ficha PDF", "Download PDF sheet"],
  ["Copiar JSON", "Copy JSON"],
  ["Copiar JSON completo", "Copy full JSON"],
  ["Descargar JSON", "Download JSON"],
  ["Ver JSON técnico generado", "View generated technical JSON"],
  ["Dossier Buyer Persona · Doc ROI", "Buyer Persona dossier · Doc ROI"],
  ["Buyer Persona pendiente", "Buyer Persona pending"],
  ["Producto pendiente", "Product pending"],
  ["Sector pendiente", "Sector pending"],
  ["Identidad estratégica", "Strategic identity"],
  ["Edad media", "Average age"],
  ["Generación", "Generation"],
  ["Piensa y siente", "Thinks and feels"],
  ["Escucha", "Hears"],
  ["Ve", "Sees"],
  ["Dice y hace", "Says and does"],
  ["Conducta digital", "Digital behavior"],
  ["Comportamiento", "Behavior"],
  ["KIT OPERATIVO", "OPERATING KIT"],
  ["Genera tu propio perfil de Buyer Persona con la IA", "Generate your own Buyer Persona profile with AI"],
  ["Lectura estratégica", "Strategic reading"],
  ["Dossier ejecutivo", "Executive dossier"],
  ["Acepto el aviso legal.", "I accept the legal notice."],
  ["Ver ficha ejecutiva", "View executive sheet"],
  ["Arquitectura técnica", "Technical architecture"],
  ["JSON accionable", "Actionable JSON"],
  ["Ver recurso operativo Doc ROI →", "View Doc ROI operational resource →"],
  ["Activación IA", "AI activation"],
  ["Prompts reutilizables", "Reusable prompts"],
  ["Abrir guía LEGO en PDF →", "Open LEGO guide PDF →"],
  ["Ir al constructor guiado", "Go to guided builder"],
  ["DIIIP · Metodología Doc ROI", "DIIIP · Doc ROI methodology"],
  ["Ecuación KAI ROI", "KAI ROI Equation"],
  ["Conoce la ciencia detrás de Doc ROI.", "Discover the science behind Doc ROI."],
  ["Abrir Ecuación KAI ROI →", "Open KAI ROI Equation →"],
  ["Consulta con Doc ROI →", "Consult with Doc ROI →"],
  ["Política de privacidad", "Privacy policy"],
  ["Aviso legal", "Legal notice"],
  ["Propiedad intelectual", "Intellectual property"],
  ["La propiedad intelectual del ecosistema Doc ROI pertenece al", "The intellectual property of the Doc ROI ecosystem belongs to"],
]);

const phrases: Array<[RegExp, string]> = [
  [/^Paso (\d+) de (\d+)$/, "Step $1 of $2"],
  [/^Nivel dominante: (.+)$/i, "Dominant level: $1"],
  [/^Secundario: (.+)$/i, "Secondary: $1"],
];

function enabled() {
  const url = new URL(window.location.href);
  return url.searchParams.get("lang") === "en" || url.searchParams.get("edition") === "eng" || localStorage.getItem(ENGLISH_LOCK_KEY) === "en";
}

function translateText(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const exact = dictionary.get(trimmed);
  if (exact) return value.replace(trimmed, exact);
  for (const [regex, replacement] of phrases) {
    if (regex.test(trimmed)) return value.replace(trimmed, trimmed.replace(regex, replacement));
  }
  return value;
}

function skip(node: Node) {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(parent.closest("script, style, textarea, input, code, pre, [contenteditable='true'], [data-docroi-no-translate]"));
}

function translate(root: ParentNode = document.body) {
  if (!enabled()) return;
  localStorage.setItem(ENGLISH_LOCK_KEY, "en");
  document.documentElement.lang = "en";
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return skip(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    const next = translateText(node.nodeValue || "");
    if (next !== node.nodeValue) node.nodeValue = next;
  });
}

let scheduled = false;
function schedule() {
  if (!enabled() || scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    translate();
  });
}

function burst() {
  schedule();
  [40, 120, 280, 700, 1400, 2600].forEach((ms) => window.setTimeout(schedule, ms));
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    burst();
    const root = document.getElementById("root") || document.body;
    new MutationObserver(schedule).observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  });
  document.addEventListener("click", burst, true);
  document.addEventListener("change", burst, true);
}

export {};
