import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import { usePersonaStore } from "./store";
import { BuyerPersonaData } from "./types";
import "./styles.css";
import "./final.css";
import "./refactor.css";

const logo = "https://docroi.marketing/wp-content/uploads/2026/04/Logo_1_Doc_ROI.png";
const logoBlack = "https://docroi.marketing/wp-content/uploads/2026/05/Logo_Negro_DoC_ROI.jpg";
const heroBg = "https://docroi.marketing/wp-content/uploads/2026/05/Imagen1.png";
const steps = ["Bienvenida", "Identidad", "Necesidad", "Mapa de empatía", "Compra", "Evolución relacional"];

const gen: Record<string, [string, string, string, string, string]> = {
  "Baby Boomer digital": ["Baby Boomers (1946-1964)", "60-78", "/avatars/baby-boomer.svg", "Perfil estable, leal y sensible a la reputación. Decide mejor cuando entiende el beneficio, reduce el riesgo y reconoce una marca confiable.", "Web, Email, Facebook, WhatsApp"],
  "Generación X digital": ["Generación X (1965-1980)", "44-59", "/avatars/gen-x.svg", "Perfil pragmático y autosuficiente. Necesita pruebas, comparativas, autoridad y sensación de control antes de decidir.", "Web, Email, LinkedIn, YouTube"],
  Millennial: ["Millennials o Generación Y (1981-1996)", "28-43", "/avatars/millennial.svg", "Perfil exigente con la experiencia. Reacciona bien a transparencia, utilidad inmediata, comunidad y prueba social creíble.", "Web móvil, Instagram, LinkedIn, Email"],
  "Generación Z": ["Generación Z o Centennials (1997-2012)", "12-27", "/avatars/gen-z.svg", "Perfil visual, veloz y comunitario. El mensaje debe ser breve, demostrable, auténtico y nativo móvil.", "TikTok, Instagram, Twitch, Discord"],
  "Alpha emergente": ["Generación Alfa (2013-presente)", "0-11", "/avatars/gen-alpha.svg", "Perfil en formación. Requiere seguridad, mediación adulta, aprendizaje visual y experiencia interactiva.", "YouTube Kids, Roblox, Minecraft, asistentes inteligentes"],
};

const guides = [
  ["Bienvenida", "Empieza por lo sencillo: qué vas a analizar y para qué. No hace falta escribir perfecto; basta con situar proyecto, producto, sector, mercado y objetivo. Esta base evita que el Buyer Persona sea una ficha bonita pero poco útil."],
  ["Identidad", "Aquí le damos rostro humano al perfil. La generación no es una etiqueta rígida: ayuda a entender cultura digital, confianza en marcas, relación con tecnología, precio, formatos favoritos, autoridad y ritmo de consumo."],
  ["Necesidad", "Una necesidad explica qué intenta resolver la persona. El problema muestra la fricción, el deseo apunta al resultado ideal y el bloqueo revela por qué todavía no actúa."],
  ["Mapa de empatía", "Este bloque ayuda a mirar el mundo desde la persona: qué escucha, ve, piensa, siente, dice y hace. Sirve para escribir mensajes más humanos y elegir mejores contenidos."],
  ["Compra", "No estamos calculando finanzas oficiales. Estamos leyendo señales de decisión: urgencia, sensibilidad, confianza, frecuencia, satisfacción, monetización potencial y relación previa."],
  ["Evolución relacional", "Este modelo identifica la motivación profunda. Como Maslow, pero aplicado a marketing: seguridad, confianza, reconocimiento, pertenencia, productividad, crecimiento, control o autorrealización cambian el mensaje y el canal."],
];

function top() {
  setTimeout(() => document.getElementById("constructor")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
}

function Field({ label, help, value, onChange, area = false }: { label: string; help: string; value: string; onChange: (value: string) => void; area?: boolean }) {
  return (
    <label className="field">
      <span>{label}</span>
      <small className="field-help">{help}</small>
      {area ? <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} /> : <input value={value} onChange={(e) => onChange(e.target.value)} />}
    </label>
  );
}

function Slider({ label, value, onChange }: { label: string; value: number | null; onChange: (value: number) => void }) {
  return (
    <label className="slider">
      <span>{label}<b>{value ?? "pendiente"}</b></span>
      <input type="range" min={1} max={5} value={value ?? 3} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

function GenImage({ src, alt }: { src?: string; alt: string }) {
  const [bad, setBad] = useState(!src);
  return bad ? <div className="gen-placeholder">Imagen generacional pendiente de cargar</div> : <img src={src} alt={alt} onError={() => setBad(true)} />;
}

function executiveGeneration(generation: string) {
  const g = gen[generation];
  if (!g) return "";
  return `${g[0]}. ${g[3]} Para trabajarlo en clase, observa cómo busca confianza, qué tecnología considera natural, qué formatos tolera, qué autoridad necesita y qué canales usa con más comodidad: ${g[4]}.`;
}

function Help({ items }: { items: string[][] }) {
  return <div className="variable-help">{items.map(([title, body]) => <article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div>;
}

function EmpathyBridge() {
  return (
    <div className="empathy-bridge">
      <div className="bridge-top">Qué escucha</div>
      <div className="bridge-left">Qué ve</div>
      <div className="bridge-center"><span>Qué piensa</span><strong>Buyer Persona</strong><span>Qué siente</span></div>
      <div className="bridge-right">Qué dice</div>
      <div className="bridge-bottom">Qué hace</div>
      <div className="bridge-pain">Frustraciones</div>
      <div className="bridge-gain">Motivaciones</div>
      <div className="bridge-need">Necesidad central detectada</div>
    </div>
  );
}

function Section({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return <section className="form-section"><div className="section-kicker">Guardado local automático</div><h3>{title}</h3><p>{intro}</p><div className="form-grid">{children}</div></section>;
}

function Feed({ step, data }: { step: number; data: BuyerPersonaData }) {
  const g = gen[data.digitalGeneration];
  return (
    <aside className="summary-panel">
      <div className="education-frame">
        <span className="eyebrow">Acompañamiento</span>
        <h3>{guides[step][0]}</h3>
        <p>{guides[step][1]}</p>
        <div className="feed-note"><strong>Cómo cumplimentarlo</strong><p>Escribe como si se lo explicaras a un compañero: concreto, humano y observable. No busques una frase perfecta; busca una hipótesis útil.</p></div>
        {step === 1 && g && <div className="generation-note"><GenImage src={g[2]} alt={g[0]} /><strong>{g[0]}</strong><p>{executiveGeneration(data.digitalGeneration)}</p><small>{g[4]}</small></div>}
      </div>
    </aside>
  );
}

function Step({ step, data, update, patch }: { step: number; data: BuyerPersonaData; update: any; patch: any }) {
  if (step === 0) return (
    <Section title="Bienvenida" intro="Vamos a situar el caso. Esta primera parte ayuda a que todo lo demás tenga sentido.">
      <Field label="Proyecto" help="Ejemplo: nombre de la empresa, marca, iniciativa, curso, servicio o solución que quieres analizar." value={data.projectName} onChange={(v) => update("projectName", v)} />
      <Field label="Producto / gama" help="Ejemplo: el producto, servicio, formación, línea de negocio o solución concreta que quieres posicionar." value={data.product} onChange={(v) => update("product", v)} />
      <Field label="Sector" help="Ejemplo: educación, salud, retail, turismo, industria, tecnología o consultoría." value={data.sector} onChange={(v) => update("sector", v)} />
      <Field label="Mercado" help="Ejemplo: universidades privadas, pymes españolas, alumnos de máster, clínicas premium o ecommerce B2B." value={data.market} onChange={(v) => update("market", v)} />
      <Field label="Objetivo de negocio" help="Ejemplo: captar leads, vender más, lanzar un producto, mejorar conversión, fidelizar clientes o crear contenido mejor dirigido." value={data.businessGoal} area onChange={(v) => update("businessGoal", v)} />
    </Section>
  );

  if (step === 1) return (
    <Section title="Identidad del Buyer Persona" intro="Ahora damos forma humana al perfil. La generación seleccionada rellena una primera hipótesis que luego puedes ajustar.">
      <Field label="Nombre ficticio" help="Ejemplo: un nombre representativo del perfil que estás construyendo." value={data.fictionalName} onChange={(v) => update("fictionalName", v)} />
      <label className="field"><span>Generación</span><small className="field-help">Ejemplo: Generación X, Millennials, Generación Z o Generación Alfa.</small><select value={data.digitalGeneration} onChange={(e) => { const g = gen[e.target.value]; update("digitalGeneration", e.target.value); if (g) patch({ ageRange: g[1], shortDescription: executiveGeneration(e.target.value), media: g[4].split(", "), supports: g[4].split(", ") }); }}>{Object.keys(gen).map((item) => <option key={item}>{item}</option>)}</select></label>
      <div className="generation-profile"><GenImage src={gen[data.digitalGeneration]?.[2]} alt={gen[data.digitalGeneration]?.[0] || "Generación"} /><div><h4>{gen[data.digitalGeneration]?.[0]}</h4><p>{executiveGeneration(data.digitalGeneration)}</p><small>{gen[data.digitalGeneration]?.[4]}</small></div></div>
      <Field label="Edad" help="Ejemplo: rango aproximado de edad del perfil." value={data.ageRange} onChange={(v) => update("ageRange", v)} />
      <Field label="Género" help="Ejemplo: masculino, femenino, mixto o no definido si el perfil representa varios comportamientos." value={data.gender} onChange={(v) => update("gender", v)} />
      <Field label="Ubicación" help="Ejemplo: ciudad, país, zona o contexto donde vive, trabaja o toma decisiones." value={data.location} onChange={(v) => update("location", v)} />
      <Field label="Rol profesional" help="Ejemplo: estudiante, director académico, responsable de marketing, comprador, emprendedor o coordinador." value={data.role} onChange={(v) => update("role", v)} />
      <Field label="Descripción ejecutiva" help="Ejemplo: resumen humano y estratégico de cómo es esta persona, qué necesita, cómo decide y cómo se relaciona con tu solución." value={data.shortDescription} area onChange={(v) => update("shortDescription", v)} />
    </Section>
  );

  if (step === 2) return (
    <Section title="Necesidad" intro="Diferenciamos necesidad, problema, consecuencia, resultado y bloqueo. Esa separación ayuda a construir mensajes mucho más claros.">
      <Field label="¿Qué necesita resolver?" help="Ejemplo: captar más clientes, ahorrar tiempo, automatizar procesos, mejorar ventas, aprender una habilidad o reducir errores." value={data.needsToSolve} area onChange={(v) => update("needsToSolve", v)} />
      <Field label="¿Qué problema le genera más fricción?" help="Ejemplo: falta de tiempo, exceso de información, dificultad técnica, baja conversión o poca claridad estratégica." value={data.mainConcern} area onChange={(v) => update("mainConcern", v)} />
      <Field label="¿Qué consecuencia tiene si no lo resuelve?" help="Ejemplo: pierde oportunidades, trabaja más lento, toma peores decisiones, vende menos o se queda atrás." value={data.riskToAvoid} area onChange={(v) => update("riskToAvoid", v)} />
      <Field label="¿Qué resultado ideal espera conseguir?" help="Ejemplo: más clientes, más productividad, más seguridad, más autonomía, más ingresos o más claridad." value={data.desiredGain} area onChange={(v) => update("desiredGain", v)} />
      <Field label="¿Qué le bloquea ahora mismo?" help="Ejemplo: miedo al precio, falta de conocimiento, desconfianza, falta de tiempo o exceso de herramientas." value={data.mainBarrier} area onChange={(v) => update("mainBarrier", v)} />
    </Section>
  );

  if (step === 3) return (
    <Section title="Mapa de empatía" intro="Este mapa no habla de producto ni precio. Habla de una persona: su entorno, su pensamiento, su emoción y su comportamiento.">
      <EmpathyBridge />
      <Field label="Qué escucha" help="Ejemplo: opiniones, recomendaciones, expertos, medios, profesores, compañeros, influencers o conversaciones relevantes." value={data.hears} area onChange={(v) => update("hears", v)} />
      <Field label="Qué ve" help="Ejemplo: anuncios, redes sociales, competidores, tendencias, casos de éxito o problemas de su entorno." value={data.sees} area onChange={(v) => update("sees", v)} />
      <Field label="Qué piensa" help="Ejemplo: dudas, creencias, expectativas, comparaciones o ideas que tiene antes de decidir." value={data.thinksAndFeels} area onChange={(v) => update("thinksAndFeels", v)} />
      <Field label="Qué siente" help="Ejemplo: miedo, ilusión, presión, inseguridad, curiosidad, urgencia, confianza o frustración." value={data.feels || ""} area onChange={(v) => update("feels", v)} />
      <Field label="Qué dice" help="Ejemplo: frases que expresa cuando habla del problema, del producto o de su necesidad." value={data.says || ""} area onChange={(v) => update("says", v)} />
      <Field label="Qué hace" help="Ejemplo: busca información, compara opciones, pregunta a otros, guarda contenidos, prueba herramientas o retrasa la decisión." value={data.does || ""} area onChange={(v) => update("does", v)} />
      <Field label="Frustraciones" help="Ejemplo: lo que le molesta, le bloquea o le hace desconfiar." value={data.frustrations} area onChange={(v) => update("frustrations", v)} />
      <Field label="Motivaciones" help="Ejemplo: lo que desea conseguir, mejorar, evitar o demostrar." value={data.motivations} area onChange={(v) => update("motivations", v)} />
      <Field label="Necesidad central detectada" help="Síntesis de lo que realmente mueve a esta persona a actuar." value={data.centralNeed || ""} area onChange={(v) => update("centralNeed", v)} />
    </Section>
  );

  if (step === 4) return (
    <Section title="Compra" intro="Marca primero las señales principales. Debajo tienes la explicación pedagógica para interpretar cada una.">
      <div className="form-grid two"><Slider label="Urgencia" value={data.urgency} onChange={(v) => update("urgency", v)} /><Slider label="Sensibilidad" value={data.priceSensitivity} onChange={(v) => update("priceSensitivity", v)} /><Slider label="Confianza" value={data.confidenceNeed} onChange={(v) => update("confidenceNeed", v)} /><Slider label="Frecuencia" value={data.frequency} onChange={(v) => update("frequency", v)} /><Slider label="Satisfacción esperada" value={data.satisfaction} onChange={(v) => update("satisfaction", v)} /><Slider label="Monetización potencial" value={data.monetization} onChange={(v) => update("monetization", v)} /><Slider label="Relación previa" value={data.recency} onChange={(v) => update("recency", v)} /></div>
      <Help items={[["Urgencia", "Nivel de rapidez con el que necesita resolver el problema."], ["Sensibilidad", "Impacto del precio, riesgo o esfuerzo en la decisión."], ["Confianza", "Seguridad, prueba o validación que necesita antes de comprar."], ["Frecuencia", "Cada cuánto consume, compra, evalúa o necesita esta solución."], ["Satisfacción esperada", "Experiencia mínima para sentir que ha valido la pena."], ["Monetización potencial", "Capacidad para generar ingresos, recurrencia, recomendación o valor futuro."], ["Relación previa", "Último contacto o experiencia con una solución parecida."]]} />
    </Section>
  );

  const motivation = ["Seguridad", "Confianza", "Reconocimiento", "Pertenencia", "Productividad", "Crecimiento", "Control", "Autorrealización"];
  return (
    <Section title="Evolución relacional" intro="Identifica la motivación profunda que mueve al Buyer Persona y tradúcela a mensaje, contenido, canal y confianza.">
      <label className="field"><span>Nivel principal</span><small className="field-help">Ejemplo: seguridad, confianza, reconocimiento, pertenencia, productividad, crecimiento, control o autorrealización.</small><select value={data.primaryLevel} onChange={(e) => update("primaryLevel", e.target.value)}>{motivation.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="field"><span>Nivel secundario</span><small className="field-help">Ejemplo: una motivación complementaria que también influye en la decisión.</small><select value={data.secondaryLevel || "Productividad"} onChange={(e) => { update("secondaryLevel", e.target.value); update("secondaryLevels", [e.target.value]); }}>{motivation.map((item) => <option key={item}>{item}</option>)}</select></label>
      <Field label="Interpretación estratégica" help="Explica cómo la combinación de motivación principal y secundaria afecta al mensaje, contenido, canal, confianza y compra." value={data.strategicInterpretation || ""} area onChange={(v) => update("strategicInterpretation", v)} />
      <Help items={[["Motivación principal", "Es el motor dominante: lo que más empuja a prestar atención o actuar."], ["Motivación secundaria", "Es un matiz que también pesa. Puede buscar productividad, pero necesitar confianza antes de moverse."], ["Relación con Maslow", "No hace falta hacerlo académico: piensa en necesidades humanas, desde seguridad hasta crecimiento."], ["Aplicación en marketing", "Ayuda a elegir promesa, tono, prueba social, canal, formato y llamada a la acción."]]} />
    </Section>
  );
}

function Footer() {
  return <footer className="final-footer"><div><a href="https://la-consulta-del-doc-roi.vercel.app/#kai" className="footer-logo-link"><img src={logoBlack} /></a><div className="footer-consulta"><a href="mailto:doctor.roi.marketing@gmail.com?subject=Quiero%20una%20consulta%20con%20Doc%20ROI">Consulta con Doc ROI →</a></div><div className="footer-links"><a href="https://docroi.marketing/aviso-legal/">Política de privacidad</a><span>|</span><a href="https://docroi.marketing/aviso-legal/">Aviso legal</a><span>|</span><a href="https://docroi.marketing/aviso-legal/">Propiedad intelectual</a></div><div className="footer-ip"><span>La propiedad intelectual del ecosistema Doc ROI pertenece al</span><a href="https://docroi.marketing/ph-d-jorge-lucio/">Ph. D. Jorge Lucio Sánchez Galán.</a></div></div></footer>;
}

export function AppCorrected() {
  const { data, currentStep, update, patch, setStep, reset } = usePersonaStore();
  const step = Math.min(currentStep, steps.length - 1);
  const nav = (next: number) => { setStep(Math.max(0, Math.min(steps.length - 1, next))); top(); };
  return (
    <div className="app-shell">
      <header className="doc-header"><div className="container header-inner"><img src={logo} /><nav><a href="#constructor">Constructor</a></nav></div></header>
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(5,7,11,.96),rgba(0,59,92,.82)),url(${heroBg})` }}>
        <div className="container hero-grid"><div><span className="eyebrow">Doc ROI · Buyer Persona con IA</span><h1>Generación del Perfil de Buyer Persona usando la IA</h1><p>Una experiencia guiada y formativa para construir, paso a paso, una ficha de Buyer Persona clara, humana, visual y accionable.</p><div className="hero-actions"><a className="primary-btn" href="#constructor">Iniciar diagnóstico</a></div></div><div className="objective-panel"><h2>Objetivo clínico</h2><p>Construir un perfil comprensible para clase, contenido, canalidad y decisión.</p><dl><div><dt>Nivel</dt><dd>Formativo aplicado</dd></div><div><dt>Herramientas</dt><dd>Ficha, guía e IA</dd></div><div><dt>Resultado</dt><dd>Buyer Persona trabajado con criterio</dd></div></dl></div></div>
      </section>
      <main><section className="builder container" id="constructor"><div className="builder-head"><span className="eyebrow">Constructor guiado</span><h2>{steps[step]}</h2><p>La aplicación enseña mientras construyes: pregunta, ayuda, respuesta y feedback formativo.</p></div><div className="progress-wrap"><div className="progress-meta"><span>Paso {step + 1} de {steps.length}</span><strong>{Math.round(((step + 1) / steps.length) * 100)}%</strong></div><div className="progress-track"><div style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div></div><div className="builder-grid"><aside className="step-list">{steps.map((item, index) => <button className={index === step ? "active" : ""} key={item} onClick={() => nav(index)}><span>{index + 1}</span>{item}</button>)}</aside><main className="wizard-card"><Step step={step} data={data} update={update} patch={patch} /><div className="wizard-actions"><button className="secondary-btn" onClick={() => nav(step - 1)} disabled={step === 0}><ArrowLeft size={18} />Anterior</button><button className="secondary-btn" onClick={reset}><RotateCcw size={18} />Reiniciar</button><button className="primary-btn small" onClick={() => nav(step + 1)} disabled={step === steps.length - 1}>Siguiente<ArrowRight size={18} /></button></div></main><Feed step={step} data={data} /></div></section></main>
      <Footer />
    </div>
  );
}
