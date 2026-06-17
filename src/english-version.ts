const LANG_KEY = "docroi-buyer-persona-lang";
const styleId = "docroi-english-version-style";

const translations: Record<string, string> = {
  "Constructor": "Builder",
  "Metodología": "Methodology",
  "Iniciar diagnóstico": "Start diagnosis",
  "Ver metodología": "View methodology",
  "Clínica Doc ROI · Buyer Persona con IA": "Doc ROI Clinic · AI Buyer Persona",
  "Sistema premium de inteligencia de Buyer Persona": "Premium Buyer Persona Intelligence System",
  "Una experiencia de consultoría guiada para formar, diagnosticar y construir un dossier de comportamiento digital, contenido, canalidad, automatización y monetización del dato.": "A guided consulting experience to teach, diagnose and build a dossier on digital behavior, content, channels, automation and data monetization.",
  "Objetivo clínico": "Clinical objective",
  "Transformar una hipótesis de cliente en un sistema de inteligencia accionable.": "Transform a customer hypothesis into an actionable intelligence system.",
  "Nivel": "Level",
  "Herramientas": "Tools",
  "Resultado": "Outcome",
  "Ficha, dossier PDF, JSON, prompts IA": "Persona sheet, PDF dossier, JSON, AI prompts",
  "Buyer Persona completo y activable": "Complete and actionable Buyer Persona",
  "Constructor guiado · Ficha final": "Guided builder · Final sheet",
  "Una buena ficha no describe personas por decorar: ayuda a decidir contenidos, canales, mensajes, automatizaciones, KPIs y validación de valor.": "A strong persona sheet does not describe people for decoration: it helps decide content, channels, messages, automations, KPIs and value validation.",
  "Feed formativo": "Learning feed",
  "Clínica estratégica": "Strategic clinic",
  "Cómo cumplimentarlo": "How to complete it",
  "Escribe hipótesis observables, evita frases genéricas y piensa siempre en evidencias: entrevistas, comportamiento digital, CRM, conversación comercial o señales de aula.": "Write observable hypotheses, avoid generic phrases and always think in evidence: interviews, digital behavior, CRM, sales conversations or classroom signals.",
  "Guardado local automático": "Automatic local save",
  "Anterior": "Previous",
  "Siguiente": "Next",
  "Reiniciar": "Reset",
  "pendiente": "pending",
  "no informado": "not provided",

  "Bienvenida": "Welcome",
  "Identidad": "Identity",
  "Necesidad": "Need",
  "Empatizar": "Empathize",
  "Compra": "Purchase",
  "Evolución relacional": "Web functionality",
  "Funcionalidades web demandadas": "Web functionalities demanded",
  "Contenido": "Content",
  "Producto": "Product",
  "Marketing mix": "Marketing mix",
  "Canalidad": "Channel architecture",
  "Keywords": "Keywords",
  "Clusters": "Clusters",
  "KPIs": "KPIs",
  "Receta": "Prescription",
  "Ficha final": "Final sheet",

  "Preparación": "Preparation",
  "Contexto mínimo para priorizar la hipótesis. Ejemplo: universidades privadas, ecommerce B2B, clínicas premium, formación ejecutiva.": "Minimum context to prioritize the hypothesis. Example: private universities, B2B ecommerce, premium clinics, executive education.",
  "Proyecto": "Project",
  "Producto o gama": "Product or range",
  "Sector": "Sector",
  "Mercado": "Market",
  "Objetivo de negocio": "Business objective",
  "% consumidores representados": "% represented consumers",
  "Contexto estratégico": "Strategic context",
  "Antes de describir a una persona hay que entender qué decisión de negocio queremos mejorar. Esta fase sitúa producto, mercado, objetivo y cobertura para evitar una ficha bonita pero inútil. El Buyer Persona no es una biografía inventada: es una hipótesis estratégica que debe ayudar a decidir mensajes, canales, contenidos, automatizaciones y KPIs.": "Before describing a person, understand which business decision we want to improve. This stage frames product, market, objective and coverage so the persona is useful, not just attractive. A Buyer Persona is not an invented biography: it is a strategic hypothesis that should help decide messages, channels, content, automations and KPIs.",

  "Identidad del Buyer Persona": "Buyer Persona identity",
  "Caracterización inicial, contexto cultural y generación digital.": "Initial characterization, cultural context and digital generation.",
  "Nombre ficticio": "Fictional name",
  "Generación digital": "Digital generation",
  "Descripción ejecutiva": "Executive description",
  "Edad": "Age",
  "Género": "Gender",
  "Ubicación": "Location",
  "Responsabilidad principal": "Main responsibility",
  "Identidad y generación digital": "Identity and digital generation",
  "La generación digital no se usa como estereotipo, sino como contexto cultural. Ayuda a inferir cómo una persona aprendió a confiar, qué tecnología considera natural, qué canales tolera, qué formatos le resultan cómodos y qué nivel de explicación necesita antes de actuar.": "Digital generation is not used as a stereotype, but as cultural context. It helps infer how a person learned to trust, which technology feels natural, which channels they tolerate, which formats feel comfortable and how much explanation they need before acting.",
  "Baby Boomers (1946-1964)": "Baby Boomers (1946-1964)",
  "Generación X (1965-1980)": "Generation X (1965-1980)",
  "Millennials o Generación Y (1981-1996)": "Millennials / Generation Y (1981-1996)",
  "Generación Z o Centennials (1997-2012)": "Generation Z / Centennials (1997-2012)",
  "Generación Alfa (2013-presente)": "Generation Alpha (2013-present)",
  "Baby Boomer digital": "Digital Baby Boomer",
  "Generación X digital": "Digital Generation X",
  "Millennial": "Millennial",
  "Generación Z": "Generation Z",
  "Alpha emergente": "Emerging Alpha",

  "Necesidad y valor": "Need and value",
  "Ejemplo: captar clientes, automatizar procesos, ahorrar tiempo, reducir incertidumbre o demostrar valor.": "Example: acquire customers, automate processes, save time, reduce uncertainty or prove value.",
  "¿Qué necesita resolver?": "What does this person need to solve?",
  "¿Qué le preocupa?": "What worries this person?",
  "¿Qué desea conseguir?": "What does this person want to achieve?",
  "¿Qué le impide actuar?": "What prevents action?",
  "¿Qué evidencia le hace confiar?": "What evidence builds trust?",
  "Necesidad, dolor y valor": "Need, pain and value",
  "Una necesidad bien formulada explica el trabajo que el cliente intenta resolver. El dolor muestra fricción, miedo o pérdida. La ganancia define el resultado deseado. La barrera explica por qué todavía no actúa. La confianza indica qué evidencia necesita para avanzar.": "A well-defined need explains the job the customer is trying to solve. Pain shows friction, fear or loss. Gain defines the desired result. The barrier explains why the person has not acted yet. Trust shows what evidence is needed to move forward.",

  "Mapa de empatía": "Empathy map",
  "Lectura psicológica, humana y estratégica del Buyer Persona.": "Psychological, human and strategic reading of the Buyer Persona.",
  "Qué escucha": "What they hear",
  "Qué ve": "What they see",
  "Qué piensa": "What they think",
  "Qué siente": "What they feel",
  "Qué dice": "What they say",
  "Qué hace": "What they do",
  "Miedos y frustraciones": "Fears and frustrations",
  "Deseos y motivaciones": "Desires and motivations",
  "Necesidad central": "Core need",
  "¿Qué piensa y siente?": "What do they think and feel?",
  "¿Qué escucha?": "What do they hear?",
  "¿Qué ve?": "What do they see?",
  "¿Qué dice y hace?": "What do they say and do?",
  "Mapa de empatía humano": "Human empathy map",
  "Aquí no se fuerza una matriz de producto. Se observa a la persona: qué escucha, qué ve, qué piensa, qué siente, qué dice, qué hace, qué teme, qué le frustra y qué desea. El objetivo es construir una lectura psicológica y estratégica que luego alimente contenido, canalidad y propuesta de valor.": "This does not force a product matrix. It observes the person: what they hear, see, think, feel, say, do, fear, struggle with and desire. The goal is to build a psychological and strategic reading that later feeds content, channels and value proposition.",

  "Comportamiento de compra": "Purchase behavior",
  "Señales de comportamiento de consumo. No sustituye CRM: forma criterio para priorizar.": "Consumer behavior signals. This does not replace CRM: it builds judgment for prioritization.",
  "Urgencia": "Urgency",
  "Confianza": "Trust",
  "Sensibilidad": "Sensitivity",
  "Sensibilidad precio": "Price sensitivity",
  "Satisfacción": "Satisfaction",
  "Monetización": "Monetization",
  "Frecuencia": "Frequency",
  "Relación": "Relationship",
  "Relación reciente": "Recent relationship",
  "Prueba social": "Social proof",
  "Necesidad temporal y presión por resolver.": "Time pressure and need to solve.",
  "Evidencia requerida antes de avanzar.": "Evidence required before moving forward.",
  "Peso del precio y del riesgo percibido.": "Weight of price and perceived risk.",
  "Experiencia acumulada o expectativa.": "Past experience or expectation.",
  "Capacidad de monetización del dato que puede tener este Buyer Persona.": "Data monetization capacity this Buyer Persona may have.",
  "Recurrencia esperada.": "Expected recurrence.",
  "Cercanía reciente con la propuesta.": "Recent closeness to the offer.",
  "Peso de testimonios y validación externa.": "Weight of testimonials and external validation.",
  "Comportamiento de compra": "Purchase behavior",
  "Estas señales no son RFM ni analítica cerrada. Son indicadores pedagógicos para razonar consumo: urgencia, confianza, sensibilidad al precio, satisfacción, frecuencia, relación y monetización potencial. Sirven para conversar en clase sobre prioridad, riesgo y activación.": "These signals are not RFM or closed analytics. They are learning indicators to reason about consumption: urgency, trust, price sensitivity, satisfaction, frequency, relationship and monetization potential. They help discuss priority, risk and activation in class.",

  "Web functionalities demanded": "Web functionalities demanded",
  "Las funcionalidades que demanda este Buyer Persona de tu página web para informarse, confiar, comunicarse y avanzar.": "The functionalities this Buyer Persona demands from your website to get informed, trust, communicate and move forward.",
  "Funcionalidades web que demanda el Buyer Persona": "Web functionalities demanded by the Buyer Persona",
  "Usamos la lógica de la pirámide de Maslow como símil pedagógico: antes de pedir conversión, relación o autogestión, la web debe resolver necesidades funcionales básicas. El Buyer Persona puede demandar acceso, información, interacción, transacción, relación, experiencia, prescripción o autogestión en distinta intensidad.": "We use Maslow's pyramid as a pedagogical analogy: before asking for conversion, relationship or self-management, the website must solve basic functional needs. The Buyer Persona may demand access, information, interaction, transaction, relationship, experience, advocacy or self-management at different intensities.",
  "Ajusta cada barra pensando qué necesita encontrar o hacer esta persona en la web para comunicarse bien con la marca: entrar, entender, comparar, preguntar, comprar, recibir seguimiento, vivir una experiencia fluida, recomendar o autogestionarse.": "Adjust each bar by thinking about what this person needs to find or do on the website to communicate well with the brand: enter, understand, compare, ask, buy, receive follow-up, enjoy a smooth experience, recommend or self-manage.",
  "Funcionalidades web que demanda este Buyer Persona": "Web functionalities demanded by this Buyer Persona",
  "Piensa en tu página web como una pirámide de necesidades funcionales: primero debe permitir acceso, después entregar información clara, facilitar interacción, transacción, relación, experiencia, prescripción y, cuando el perfil lo pida, autogestión. Ajusta la intensidad según lo que este Buyer Persona necesita para comunicarse, confiar y avanzar.": "Think of your website as a pyramid of functional needs: first it must allow access, then provide clear information, enable interaction, transaction, relationship, experience, advocacy and, when the profile demands it, self-management. Adjust intensity according to what this Buyer Persona needs to communicate, trust and move forward.",
  "Nivel dominante:": "Dominant level:",
  "Secundario:": "Secondary:",
  "Acceso": "Access",
  "Información": "Information",
  "Interacción": "Interaction",
  "Transacción": "Transaction",
  "Experiencia": "Experience",
  "Prescripción": "Advocacy",
  "Autogestión": "Self-management",
  "Necesita poder entrar, consultar, descargar, registrarse o conectar con el servicio sin fricción.": "Needs to enter, consult, download, register or connect with the service without friction.",
  "Necesita comparar, entender precio, condiciones, disponibilidad, trazabilidad o valor antes de actuar.": "Needs to compare and understand price, terms, availability, traceability or value before acting.",
  "Necesita poder comprar, reservar, contratar, pagar, solicitar o completar una acción concreta.": "Needs to buy, book, contract, pay, request or complete a concrete action.",
  "Demanda seguimiento, atención, CRM, comunicación personalizada, fidelización o acompañamiento.": "Demands follow-up, support, CRM, personalized communication, loyalty or guidance.",
  "Valora fluidez, comodidad, coherencia, personalización, UX y sensación de servicio diferencial.": "Values fluidity, comfort, coherence, personalization, UX and a differentiated service feeling.",
  "Puede recomendar, valorar, compartir, generar prueba social o convertirse en embajador de marca.": "May recommend, review, share, create social proof or become a brand advocate.",
  "Quiere operar con autonomía: panel propio, autoservicio, automatización, APIs, IA o configuración personalizada.": "Wants to operate autonomously: personal dashboard, self-service, automation, APIs, AI or custom configuration.",
  "Funcionalidad dominante": "Dominant functionality",
  "Funcionalidades secundarias": "Secondary functionalities",
  "Fricción web": "Website friction",
  "Activación": "Activation",
  "El nivel con mayor intensidad indica qué debe resolver primero la web para este Buyer Persona.": "The highest-intensity level indicates what the website must solve first for this Buyer Persona.",
  "Los niveles altos complementarios muestran si también necesita información, relación, experiencia, prueba social o autonomía.": "High complementary levels show whether the person also needs information, relationship, experience, social proof or autonomy.",
  "El problema aparece cuando la página ofrece menos funcionalidad de la que el usuario necesita para confiar o decidir.": "The problem appears when the page offers less functionality than the user needs to trust or decide.",
  "Esta lectura orienta UX, contenidos, formularios, CRM, automatización, atención y rutas de conversión.": "This reading guides UX, content, forms, CRM, automation, support and conversion paths.",

  "Contenido digital": "Digital content",
  "Separa modalidad, formato, canal, interacción y temporalidad.": "Separate modality, format, channel, interaction and timing.",
  "Modalidad": "Modality",
  "Formato": "Format",
  "Canal": "Channel",
  "Interacción": "Interaction",
  "Video, texto, imagen, audio o interactivo.": "Video, text, image, audio or interactive.",
  "Pieza concreta: carrusel, informe, demo, webinar.": "Specific asset: carousel, report, demo, webinar.",
  "Lugar de consumo y contexto.": "Consumption place and context.",
  "Síncrona, asíncrona o híbrida.": "Synchronous, asynchronous or hybrid.",
  "Marca": "Brand",
  "Experiencia": "Experience",
  "Modalidades": "Modalities",
  "Temporalidad": "Timing",
  "Formatos": "Formats",
  "vídeo": "video",
  "texto": "text",
  "imagen": "image",
  "audio": "audio",
  "interactivo": "interactive",
  "síncrono": "synchronous",
  "asíncrono": "asynchronous",
  "híbrido": "hybrid",
  "post": "post",
  "carrusel": "carousel",
  "infografía": "infographic",
  "reel": "reel",
  "newsletter": "newsletter",
  "landing": "landing page",
  "blog": "blog",
  "webinar": "webinar",
  "demo": "demo",
  "gamificación": "gamification",
  "caso de uso": "use case",
  "informe PDF": "PDF report",
  "Contenido no es solo formato. Es profundidad, velocidad, atención, contexto y confianza. Hay que separar modalidad, formato, canal, temporalidad e interacción para saber si el perfil necesita explicación, demostración, comparación, prueba social o experiencia inmersiva.": "Content is not only format. It is depth, speed, attention, context and trust. Separate modality, format, channel, timing and interaction to know whether the profile needs explanation, demonstration, comparison, social proof or immersive experience.",

  "Ecosistema Doc ROI": "Doc ROI ecosystem",
  "Píldoras, vitaminas, medicinas y vacunas como niveles de madurez, acompañamiento y transformación.": "Pills, vitamins, medicines and vaccines as levels of maturity, guidance and transformation.",
  "Nivel de intervención": "Intervention level",
  "Aspirina": "Aspirin",
  "Vitamina": "Vitamin",
  "Vacuna": "Vaccine",
  "Deseo Premium": "Premium desire",
  "Píldora": "Pill",
  "Medicina": "Medicine",
  "Reduce incertidumbre y explica una decisión concreta.": "Reduces uncertainty and explains a concrete decision.",
  "Mejora criterio, hábito y madurez.": "Improves judgment, habit and maturity.",
  "Interviene sobre un problema activo.": "Intervenes on an active problem.",
  "Previene riesgos y prepara capacidades futuras.": "Prevents risks and prepares future capabilities.",
  "¿Qué ocurre si no actúa?": "What happens if they do not act?",
  "Píldoras, vitaminas, medicinas y vacunas no son productos sueltos. Son niveles de acompañamiento. Una píldora reduce incertidumbre, una vitamina madura criterio, una medicina interviene sobre un problema y una vacuna previene riesgos antes de que aparezcan.": "Pills, vitamins, medicines and vaccines are not isolated products. They are levels of guidance. A pill reduces uncertainty, a vitamin matures judgment, a medicine intervenes on a problem and a vaccine prevents risks before they appear.",

  "Mini masterclass: producto, precio, distribución y comunicación como palancas de valor.": "Mini masterclass: product, price, distribution and communication as value levers.",
  "Precio": "Price",
  "Distribución": "Distribution",
  "Comunicación": "Communication",
  "Experiencia, valor y transformación.": "Experience, value and transformation.",
  "Percepción, sensibilidad y riesgo.": "Perception, sensitivity and risk.",
  "Acceso, fricción y disponibilidad.": "Access, friction and availability.",
  "Contenido, canales, narrativa y engagement.": "Content, channels, narrative and engagement.",
  "Marketing mix como masterclass": "Marketing mix as a masterclass",
  "El marketing mix traduce el diagnóstico a palancas. Producto es experiencia y transformación; precio es percepción de valor; distribución es acceso y fricción; comunicación es narrativa, contenido, canal y engagement.": "The marketing mix translates the diagnosis into levers. Product is experience and transformation; price is perceived value; distribution is access and friction; communication is narrative, content, channel and engagement.",

  "Terminales, medios, soportes e interacción relacional.": "Terminals, media, supports and relational interaction.",
  "Terminales": "Terminals",
  "Medios": "Media",
  "Soportes": "Supports",
  "Intención": "Intent",
  "móvil": "mobile",
  "desktop": "desktop",
  "tablet": "tablet",
  "smart TV": "smart TV",
  "asistente de voz": "voice assistant",
  "aula": "classroom",
  "evento presencial": "in-person event",
  "Redes sociales": "Social media",
  "Canales audiovisuales": "Audiovisual channels",
  "IA conversacional": "Conversational AI",
  "Eventos": "Events",
  "Podcasts": "Podcasts",
  "Comunidades": "Communities",
  "WhatsApp": "WhatsApp",
  "LinkedIn": "LinkedIn",
  "TikTok": "TikTok",
  "YouTube": "YouTube",
  "PDF": "PDF",
  "LMS": "LMS",
  "CRM": "CRM",
  "aprender": "learn",
  "resolver": "solve",
  "comparar": "compare",
  "comprar": "buy",
  "autoridad profesional": "professional authority",
  "automatizar": "automate",
  "delegar": "delegate",
  "mejorar productividad": "improve productivity",
  "Canalidad relacional": "Relational channel architecture",
  "Recuperamos terminales, medios, soportes e interacción. No basta decir Instagram o email: hay que entender dispositivo, contexto, intención, soporte, formato y tipo de vínculo que ese canal permite construir.": "We recover terminals, media, supports and interaction. Saying Instagram or email is not enough: understand device, context, intent, support, format and the kind of bond that channel can build.",

  "Keywords estratégicas": "Strategic keywords",
  "Hipótesis estratégica generada desde el Buyer Persona.": "Strategic hypothesis generated from the Buyer Persona.",
  "Keywords e intención": "Keywords and intent",
  "Las keywords no son una lista SEO mecánica. Son señales de lenguaje, intención de búsqueda, dolor, deseo y etapa mental. También preparan a la IA para entender autoridad temática y semántica del Buyer Persona.": "Keywords are not a mechanical SEO list. They are signals of language, search intent, pain, desire and mental stage. They also prepare AI to understand the Buyer Persona's topical and semantic authority.",
  "Topic clusters": "Topic clusters",
  "Arquitectura semántica con pillar content y clusters conectados.": "Semantic architecture with pillar content and connected clusters.",
  "Un pillar content organiza la autoridad temática. Los clusters conectan subtemas, preguntas, objeciones, formatos, canales y KPIs. Es una arquitectura de aprendizaje y posicionamiento, no una lista de posts.": "Pillar content organizes topical authority. Clusters connect subtopics, questions, objections, formats, channels and KPIs. It is a learning and positioning architecture, not a list of posts.",
  "KPIs recomendados": "Recommended KPIs",
  "KPIs de inteligencia": "Intelligence KPIs",
  "Los KPIs deben formar un cuadro de mando: awareness, engagement, conversión, relación, recurrencia, aprendizaje, monetización e influencia. Cada métrica debe responder a una decisión, no decorar un informe.": "KPIs should build a dashboard: awareness, engagement, conversion, relationship, recurrence, learning, monetization and influence. Every metric should answer a decision, not decorate a report.",

  "Receta Doc ROI": "Doc ROI prescription",
  "Diagnóstico ejecutivo y prescripción estratégica.": "Executive diagnosis and strategic prescription.",
  "Receta estratégica": "Strategic prescription",
  "La receta convierte la observación en prescripción: diagnóstico ejecutivo, impacto esperado, intervención Doc ROI y siguiente paso. Debe conectar problema, contenido, canal, automatización y validación real.": "The prescription turns observation into guidance: executive diagnosis, expected impact, Doc ROI intervention and next step. It must connect problem, content, channel, automation and real validation.",
  "Entregable final": "Final deliverable",
  "Ficha visual, dossier ejecutivo y recursos para generar tu propio perfil con IA.": "Visual sheet, executive dossier and resources to generate your own AI profile.",
  "Descargar ficha PDF": "Download PDF sheet",
  "Copiar JSON": "Copy JSON",
  "Copiar JSON completo": "Copy full JSON",
  "Descargar JSON": "Download JSON",
  "Ver JSON técnico generado": "View generated technical JSON",
  "Dossier final": "Final dossier",
  "La ficha final es el entregable de clase: identidad, empatía, conducta digital, contenido, canalidad, keywords, clusters, KPIs, receta y recursos operativos. Debe poder presentarse, descargarse y reutilizarse con IA.": "The final sheet is the class deliverable: identity, empathy, digital behavior, content, channel architecture, keywords, clusters, KPIs, prescription and operational resources. It should be presentable, downloadable and reusable with AI.",
  "Dossier Buyer Persona · Doc ROI": "Buyer Persona dossier · Doc ROI",
  "Buyer Persona pendiente": "Buyer Persona pending",
  "Producto pendiente": "Product pending",
  "Sector pendiente": "Sector pending",
  "Identidad estratégica": "Strategic identity",
  "Edad media": "Average age",
  "Generación": "Generation",
  "Piensa y siente": "Thinks and feels",
  "Escucha": "Hears",
  "Ve": "Sees",
  "Dice y hace": "Says and does",
  "Conducta digital": "Digital behavior",
  "Comportamiento": "Behavior",

  "KIT OPERATIVO": "OPERATING KIT",
  "Genera tu propio perfil de Buyer Persona con la IA": "Generate your own Buyer Persona profile with AI",
  "El cierre no son botones sueltos: es un sistema operativo para leer, estructurar y activar la inteligencia del cliente.": "The closing is not a set of isolated buttons: it is an operating system to read, structure and activate customer intelligence.",
  "Lectura estratégica": "Strategic reading",
  "Dossier ejecutivo": "Executive dossier",
  "Descarga la ficha, preséntala en clase y úsala como informe de comportamiento, contenido, canalidad y KPIs.": "Download the sheet, present it in class and use it as a report on behavior, content, channels and KPIs.",
  "Acepto el aviso legal.": "I accept the legal notice.",
  "Ver ficha ejecutiva": "View executive sheet",
  "Arquitectura técnica": "Technical architecture",
  "JSON accionable": "Actionable JSON",
  "El JSON conserva la estructura de datos para IA, automatización, dashboards o documentación interna.": "The JSON preserves the data structure for AI, automation, dashboards or internal documentation.",
  "Ver recurso operativo Doc ROI →": "View Doc ROI operational resource →",
  "Activación IA": "AI activation",
  "Prompts reutilizables": "Reusable prompts",
  "Activa salidas para LinkedIn, TikTok, SEO, email, automatización o guiones comerciales a partir del perfil.": "Activate outputs for LinkedIn, TikTok, SEO, email, automation or sales scripts from the profile.",
  "Abrir guía LEGO en PDF →": "Open LEGO guide PDF →",

  "Ir al constructor guiado": "Go to guided builder",
  "DIIIP · Metodología Doc ROI": "DIIIP · Doc ROI methodology",
  "DIIIP es la metodología transversal de Doc ROI: convierte señales dispersas en datos, los ordena como información, los interpreta con inteligencia, los transforma en insights y termina en personalización medible.": "DIIIP is Doc ROI's cross-cutting methodology: it turns scattered signals into data, structures them as information, interprets them with intelligence, transforms them into insights and ends in measurable personalization.",
  "Captura señales de comportamiento, contexto, necesidad y canal.": "Captures behavior, context, need and channel signals.",
  "Estructura la ficha para que pueda leerse, compararse y exportarse.": "Structures the sheet so it can be read, compared and exported.",
  "Conecta IA, marketing, empatía, contenido y decisión.": "Connects AI, marketing, empathy, content and decision.",
  "Convierte observación en criterio accionable y KPIs.": "Turns observation into actionable judgment and KPIs.",
  "Diseña acciones adaptadas a madurez, confianza y canalidad.": "Designs actions adapted to maturity, trust and channel architecture.",
  "Ecuación KAI ROI": "KAI ROI Equation",
  "Conoce la ciencia detrás de Doc ROI.": "Discover the science behind Doc ROI.",
  "La Ecuación KAI ROI conecta monetización del dato, Customer Equity, eficiencia operativa y generación de valor económico. En esta píldora opera como marco formativo para pasar del perfil al sistema de decisión.": "The KAI ROI Equation connects data monetization, Customer Equity, operational efficiency and economic value creation. In this pill it operates as a learning framework to move from profile to decision system.",
  "Abrir Ecuación KAI ROI →": "Open KAI ROI Equation →",
  "Consulta con Doc ROI →": "Consult with Doc ROI →",
  "Política de privacidad": "Privacy policy",
  "Aviso legal": "Legal notice",
  "Propiedad intelectual": "Intellectual property",
  "La propiedad intelectual del ecosistema Doc ROI pertenece al": "The intellectual property of the Doc ROI ecosystem belongs to",
};

const phraseTranslations: Array<[RegExp, string]> = [
  [/^Paso (\d+) de (\d+)$/, "Step $1 of $2"],
  [/^Nivel dominante: (.+)$/i, "Dominant level: $1"],
  [/^Secundario: (.+)$/i, "Secondary: $1"],
];

function isEnglishMode() {
  const url = new URL(window.location.href);
  return url.searchParams.get("lang") === "en" || localStorage.getItem(LANG_KEY) === "en";
}

function setLanguage(lang: "en" | "es") {
  const url = new URL(window.location.href);
  if (lang === "en") {
    url.searchParams.set("lang", "en");
    localStorage.setItem(LANG_KEY, "en");
  } else {
    url.searchParams.delete("lang");
    localStorage.setItem(LANG_KEY, "es");
  }
  window.location.href = url.toString();
}

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .docroi-language-switch {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border: 1px solid rgba(255,255,255,.35);
      border-radius: 999px;
      padding: 4px;
      background: rgba(255,255,255,.12);
      backdrop-filter: blur(8px);
    }
    .docroi-language-switch button {
      border: 0;
      border-radius: 999px;
      padding: 7px 10px;
      font-size: 12px;
      font-weight: 950;
      cursor: pointer;
      color: #003b5c;
      background: #eaf6fb;
    }
    .docroi-language-switch button[aria-pressed="false"] {
      background: transparent;
      color: #fff;
    }
    .doc-header nav {
      align-items: center;
      gap: 10px;
    }
  `;
  document.head.appendChild(style);
}

function injectSwitch() {
  installStyles();
  const nav = document.querySelector(".doc-header nav");
  if (!nav || nav.querySelector(".docroi-language-switch")) return;
  const active = isEnglishMode() ? "en" : "es";
  const wrap = document.createElement("span");
  wrap.className = "docroi-language-switch";
  wrap.innerHTML = `
    <button type="button" data-docroi-lang="es" aria-pressed="${active === "es"}">ES</button>
    <button type="button" data-docroi-lang="en" aria-pressed="${active === "en"}">EN</button>
  `;
  nav.appendChild(wrap);
  wrap.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-docroi-lang]");
    if (!button) return;
    setLanguage(button.dataset.docroiLang === "en" ? "en" : "es");
  });
}

function translateValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return value;
  if (translations[trimmed]) return value.replace(trimmed, translations[trimmed]);
  for (const [regex, replacement] of phraseTranslations) {
    if (regex.test(trimmed)) return value.replace(trimmed, trimmed.replace(regex, replacement));
  }
  return value;
}

function shouldSkip(node: Node) {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(parent.closest("script, style, textarea, input, code, pre, [data-docroi-no-translate]"));
}

function translateTree(root: ParentNode = document.body) {
  if (!isEnglishMode()) return;
  document.documentElement.lang = "en";
  document.body.classList.add("docroi-lang-en");

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldSkip(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    const next = translateValue(node.nodeValue || "");
    if (next !== node.nodeValue) node.nodeValue = next;
  });

  document.querySelectorAll<HTMLElement>("[aria-label], [title]").forEach((element) => {
    const aria = element.getAttribute("aria-label");
    if (aria) element.setAttribute("aria-label", translateValue(aria));
    const title = element.getAttribute("title");
    if (title) element.setAttribute("title", translateValue(title));
  });
}

let scheduled = false;
function scheduleTranslate() {
  injectSwitch();
  if (!isEnglishMode() || scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(() => {
    scheduled = false;
    translateTree();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleTranslate();
  window.setTimeout(scheduleTranslate, 120);
  window.setTimeout(scheduleTranslate, 600);
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleTranslate).observe(root, { childList: true, subtree: true });
});

export {};
