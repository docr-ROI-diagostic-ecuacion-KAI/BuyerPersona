import { BuyerPersonaData, StrategicAlert, TopicCluster } from "../types";
import { digitalGenerations } from "../data";

const splitWords = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((word) => word.length > 4).slice(0, 12);

export function derivePains(data: BuyerPersonaData): string[] {
  return [data.mainConcern, data.riskToAvoid, data.mainBarrier, data.frustrations].filter(Boolean).flatMap((item) => item.split(/[.;\n]/).map((x) => x.trim())).filter(Boolean).slice(0, 6);
}

export function deriveGains(data: BuyerPersonaData): string[] {
  return [data.desiredGain, data.expectedValue, data.successCriteria, data.motivations].filter(Boolean).flatMap((item) => item.split(/[.;\n]/).map((x) => x.trim())).filter(Boolean).slice(0, 6);
}

export function purchaseDiagnosis(data: BuyerPersonaData): string {
  const urgency = data.urgency ?? 0;
  const value = ((data.recency ?? 0) + (data.frequency ?? 0) + (data.monetization ?? 0) + (data.satisfaction ?? 0)) / 4;
  if (!data.product || !data.fictionalName) return "requiere validación";
  if (value >= 4 && urgency >= 4) return "cliente prioritario";
  if (value >= 3 && urgency >= 3) return "cliente en desarrollo";
  if ((data.satisfaction ?? 0) <= 2 && urgency >= 3) return "cliente en riesgo";
  if ((data.recency ?? 0) <= 2 && (data.monetization ?? 0) >= 3) return "cliente recuperable";
  if (data.coverage < 10) return "cliente aspiracional";
  return "cliente de baja prioridad actual";
}

export function vitalSigns(data: BuyerPersonaData) {
  const roi = Math.round((((data.monetization ?? 3) + (data.frequency ?? 3) + data.coverage / 20) / 3) * 20);
  const pro = Math.round((((data.confidenceNeed ?? 3) + (data.satisfaction ?? 3) + (data.urgency ?? 3)) / 3) * 20);
  const ce = Math.round((((data.frequency ?? 3) + (data.satisfaction ?? 3) + data.secondaryLevels.length) / 3) * 20);
  const iaBoost = data.digitalGeneration.includes("IA") || data.primaryLevel === "Autogestión" ? 5 : 0;
  const ia = Math.min(100, Math.round((((data.confidenceNeed ?? 3) + data.media.length + data.formats.length / 4) / 3) * 20) + iaBoost);
  return { ROI: roi, PRO: pro, CE: ce, IA: ia };
}

export function botiquinType(data: BuyerPersonaData): "Píldora" | "Vitamina" | "Medicina" {
  if (data.primaryLevel === "Acceso" || data.primaryLevel === "Información") return "Píldora";
  if (data.primaryLevel === "Interacción" || data.primaryLevel === "Relación" || data.productClassification === "Vitamina") return "Vitamina";
  return "Medicina";
}

export function keywords(data: BuyerPersonaData) {
  const base = [data.product, data.sector, data.role, data.businessGoal].filter(Boolean).join(" ");
  const seeds = splitWords(`${base} ${derivePains(data).join(" ")} ${deriveGains(data).join(" ")} ${data.motivations}`);
  const product = data.product || "producto";
  const sector = data.sector || "sector";
  const role = data.role || "cliente";
  return {
    informational: [`qué es ${product}`, `${product} para ${role}`, ...seeds.slice(0, 3).map((s) => `guía ${s}`)],
    comparative: [`mejor ${product} para ${sector}`, `${product} vs alternativas`, `comparativa ${product}`],
    transactional: [`comprar ${product}`, `solicitar demo ${product}`, `precio ${product}`],
    navigational: [`${product} Doc ROI`, `${sector} soluciones`, `herramienta ${product}`],
    relational: [`cómo fidelizar ${role}`, `relación con clientes ${sector}`, `customer equity ${sector}`],
    experiential: [`casos de uso ${product}`, `experiencia con ${product}`, `testimonios ${sector}`],
    autonomy: [`automatizar ${product}`, `asistente IA ${sector}`, `plantilla ${product}`],
    long_tail: [`cómo elegir ${product} si necesito ${data.needsToSolve || "resolver una necesidad"}`, `qué contenido genera confianza para ${role}`, `indicadores para medir ${product} en ${sector}`],
  };
}

export function topicClusters(data: BuyerPersonaData): TopicCluster[] {
  const kw = keywords(data);
  return [
    { pillar_topic: `Decisión estratégica sobre ${data.product || "producto"}`, subtopics: ["criterios de elección", "riesgos", "comparativa", "prueba social"], keywords: [...kw.informational.slice(0, 2), ...kw.comparative.slice(0, 2)], connected_pains: derivePains(data).slice(0, 3), connected_gains: deriveGains(data).slice(0, 3), recommended_formats: data.formats.slice(0, 3), recommended_channels: data.media.slice(0, 3), recommended_kpis: ["tiempo de lectura", "descargas", "leads cualificados"], journey_stage: "consideración" },
    { pillar_topic: `Activación y confianza para ${data.fictionalName || "Buyer Persona"}`, subtopics: ["objeciones", "demo", "automatización", "seguimiento"], keywords: [...kw.transactional.slice(0, 2), ...kw.relational.slice(0, 2)], connected_pains: derivePains(data).slice(0, 3), connected_gains: deriveGains(data).slice(0, 3), recommended_formats: ["demo", "email nurture", "calculadora ROI"], recommended_channels: data.media.slice(0, 3), recommended_kpis: ["conversión", "formularios completados", "retención"], journey_stage: "decisión y relación" },
  ];
}

export function recommendedKpis(data: BuyerPersonaData) {
  const map: Record<string, string[]> = {
    Acceso: ["usuarios alcanzados", "sesiones", "disponibilidad", "tasa de entrada"], Información: ["tráfico", "tiempo de lectura", "scroll depth", "descargas"], Interacción: ["respuestas", "comentarios", "formularios completados", "engagement"], Transacción: ["conversión", "leads", "ventas", "CAC", "abandono"], Relación: ["recurrencia", "leads cualificados", "NPS", "retención", "churn"], Experiencia: ["satisfacción", "menciones positivas", "compartidos", "recuerdo de marca"], Influencia: ["referrals", "UGC", "recomendaciones", "autoridad", "comunidad"], Autogestión: ["uso de herramientas", "automatizaciones creadas", "integraciones activadas", "autonomía operativa"],
  };
  return { awareness: map.Acceso, engagement: map[data.primaryLevel] ?? map.Información, conversion: map.Transacción, relationship: map.Relación, loyalty: ["recompra", "retención", "NPS"], experience: map.Experiencia, influence: map.Influencia, autonomy: map.Autogestión };
}

export function alerts(data: BuyerPersonaData): StrategicAlert[] {
  const result: StrategicAlert[] = [];
  const trustTotal = data.trustDistribution.brand + data.trustDistribution.product + data.trustDistribution.experience;
  const weightTotal = Object.values(data.levelWeights).reduce((sum, item) => sum + Number(item || 0), 0);
  if (trustTotal !== 100) result.push({ title: "Confianza sin cerrar", body: "La distribución Marca / Producto / Experiencia debe sumar 100%." });
  if (weightTotal !== 100) result.push({ title: "Pirámide sin cerrar", body: "Los pesos de la Pirámide Evolutiva deben sumar 100%." });
  if (!data.product) result.push({ title: "Producto pendiente", body: "Para generar JSON accionable, indica el producto, gama o producto estrella." });
  if (!data.fictionalName) result.push({ title: "Buyer Persona pendiente", body: "La ficha necesita un nombre ficticio para poder activar recomendaciones." });
  if (!derivePains(data).length || !deriveGains(data).length) result.push({ title: "Pains y gains insuficientes", body: "Debe existir al menos un dolor y una ganancia esperada." });
  if (!data.media.length) result.push({ title: "Canalidad pendiente", body: "Selecciona al menos un medio o ecosistema de relación." });
  if (!data.formats.length) result.push({ title: "Formato pendiente", body: "Selecciona al menos un formato de contenido." });
  if (data.primaryLevel === "Autogestión" && (data.digitalGeneration.includes("Boomer") || data.digitalGeneration.includes("analógico"))) result.push({ title: "Alerta Doc ROI", body: "Se ha seleccionado Autogestión como nivel principal, pero el Buyer Persona parece depender todavía de información básica." });
  if (data.primaryLevel === "Acceso" && data.formats.some((format) => ["whitepaper", "herramienta IA", "simulador"].includes(format))) result.push({ title: "Alerta Doc ROI", body: "El contenido propuesto es avanzado, pero el Buyer Persona ha sido clasificado como nivel Acceso." });
  if (data.productClassification === "Aspirina" && data.purchaseLogic === "aspiracional") result.push({ title: "Alerta Doc ROI", body: "El producto se clasifica como Aspirina, pero la campaña parece aspiracional." });
  return result;
}

export function prescription(data: BuyerPersonaData) {
  const kit = botiquinType(data);
  return { diagnosis: `${purchaseDiagnosis(data)} con madurez principal ${data.primaryLevel || "pendiente"}.`, interpretation: "Este perfil necesita convertir sus señales de necesidad en una arquitectura de contenido, canalidad y prueba de valor medible.", impact: "La oportunidad se concentra en ROI pedagógico, productividad comercial y Customer Equity relacional. Las estimaciones son formativas y requieren validación con datos reales.", intervention_type: kit, prescription: kit === "Píldora" ? "Explicar, ordenar y reducir incertidumbre antes de pedir conversión." : kit === "Vitamina" ? "Madurar el criterio con casos, herramientas y seguimiento." : "Activar automatización, integración o IA con medición continua.", next_step: "Validar esta hipótesis con CRM, analítica, entrevistas o comportamiento observado antes de escalar inversión." };
}

export function buildJson(data: BuyerPersonaData) {
  const generation = digitalGenerations[data.digitalGeneration as keyof typeof digitalGenerations];
  return {
    doc_roi_metadata: { solution_name: "Conexión Buyer Persona · Del perfil al JSON accionable", project_name: data.projectName || "pendiente", work_unit: data.workUnit || "pendiente", user_name: data.userName || "pendiente", created_at: new Date().toISOString(), version: "1.0" },
    product_context: { product_or_range: data.product || "pendiente", star_product: data.starProduct || "pendiente", sector: data.sector || "pendiente", market: data.market || "pendiente", business_goal: data.businessGoal || "pendiente", estimated_consumer_coverage: data.coverage || "requiere validación", coverage_warning: data.coverage < 20 ? "Representa una parte limitada del consumo. Prioridad estratégica a validar." : "Cobertura relevante para primera hipótesis." },
    buyer_persona: { fictional_name: data.fictionalName || "pendiente", short_description: data.shortDescription || "pendiente", age_range: data.ageRange || "no informado", gender: data.gender || "no informado", location: data.location || "no informado", economic_status: data.economicStatus || "no informado", role: data.role || "no informado", decision_level: data.decisionLevel || "no informado", context: data.context || "no informado", products_per_year: data.productsPerYear || "requiere validación", main_condition: data.mainCondition || "pendiente", digital_generation: { selected_generation: data.digitalGeneration, traits: generation?.traits ?? [], consumption_implications: generation?.channels ?? [], digital_autonomy_level: generation?.autonomy ?? "requiere validación" } },
    needs_and_value: { needs_to_solve: data.needsToSolve || "pendiente", main_concern: data.mainConcern || "pendiente", desired_gain: data.desiredGain || "pendiente", risk_to_avoid: data.riskToAvoid || "pendiente", expected_value: data.expectedValue || "pendiente", success_criteria: data.successCriteria || "pendiente", main_barrier: data.mainBarrier || "pendiente", trust_trigger: data.trustTrigger || "pendiente" },
    empathy_map: { thinks_and_feels: data.thinksAndFeels || "pendiente", hears: data.hears || "pendiente", sees: data.sees || "pendiente", says_and_does: data.saysAndDoes || "pendiente", frustrations: data.frustrations || "pendiente", motivations: data.motivations || "pendiente", derived_pains: derivePains(data), derived_gains: deriveGains(data), language_patterns: splitWords(`${data.saysAndDoes} ${data.thinksAndFeels}`), keyword_seeds: splitWords(`${data.frustrations} ${data.motivations} ${data.product}`) },
    purchase_behavior: { recency_score: data.recency, frequency_score: data.frequency, monetization_score: data.monetization, satisfaction_score: data.satisfaction, price_sensitivity: data.priceSensitivity, urgency: data.urgency, social_proof_need: data.socialProofNeed, diagnosis: purchaseDiagnosis(data) },
    data_relationship_pyramid: { primary_level: data.primaryLevel, secondary_levels: data.secondaryLevels, level_weights: data.levelWeights, maturity_summary: `Nivel principal ${data.primaryLevel}. Personalización recomendada proporcional a claridad, confianza y autonomía real.`, strategic_alerts: alerts(data).map((a) => a.body), communication_implications: [`Priorizar ${data.primaryLevel}`, `Canales: ${data.media.join(", ") || "pendiente"}`], personalization_level: data.primaryLevel === "Autogestión" ? "alto" : data.primaryLevel === "Acceso" ? "básico" : "medio" },
    digital_content: { trust_distribution: data.trustDistribution, modalities: data.modalities, formats: data.formats, temporality: data.temporality, content_depth: data.primaryLevel === "Acceso" ? "introductorio" : "ejecutivo-aplicado", recommended_content_style: "claro, consultivo, accionable y validable" },
    product_need_classification: { classification: data.productClassification, reason: data.noBuyConsequence || "requiere validación", urgency_level: data.perceivedUrgency ? String(data.perceivedUrgency) : "requiere validación", dominant_message: data.productClassification === "Aspirina" ? "solución, urgencia y confianza" : data.productClassification === "Vacuna" ? "prevención, seguridad y anticipación" : data.productClassification === "Deseo Premium" ? "experiencia, estatus y diferenciación" : "mejora, productividad y valor añadido", recommended_cta: data.productClassification === "Aspirina" ? "Solicitar diagnóstico" : "Explorar recomendación", communication_risk: "Prometer más de lo que los datos permiten validar." },
    marketing_mix: { product: data.marketingMix.product, price: data.marketingMix.price, place_or_sales_network: data.marketingMix.place, promotion: data.marketingMix.promotion, dominant_policy: Object.entries(data.marketingMix).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "pendiente", recommended_campaign_logic: "Campaña educativa con prueba de valor, objeciones resueltas y medición por fase." },
    channel_architecture: { terminals: data.terminals, media: data.media, supports: data.supports, formats: data.channelFormats, relational_intentions: data.intentions, channel_map_summary: `Ruta ${data.terminals.join(" + ")} mediante ${data.media.join(", ")} para ${data.intentions.join(", ")}.` },
    keyword_simulation: keywords(data), topic_clusters: topicClusters(data), kpis: recommendedKpis(data), doc_roi_prescription: prescription(data), exports: { pdf_ready: true, json_ready: true, copy_ready: true, notion_ready: true, automation_ready: true },
  };
}
