import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Clipboard, Download, FileText, RotateCcw } from "lucide-react";
import { usePersonaStore } from "./store";
import { BuyerPersonaData } from "./types";
import { buildJson, deriveGains, derivePains, keywords, prescription, recommendedKpis, topicClusters, vitalSigns } from "./lib/recommendations";
import { copyJson, downloadJson, exportPdf } from "./lib/exports";
import "./final.css";
import "./refactor.css";

const logo = "https://docroi.marketing/wp-content/uploads/2026/05/Logo_Negro_DoC_ROI.jpg";
const logoBlack = "https://docroi.marketing/wp-content/uploads/2026/05/Logo_Negro_DoC_ROI.jpg";
const heroBg = "https://docroi.marketing/wp-content/uploads/2026/08/Background_Decision_Unit.png";
const steps = ["Bienvenida","Identidad","Necesidad","Empatizar","Compra","Evolucion relacional","Contenido","Producto","Marketing mix","Canalidad","Keywords","Clusters","KPIs","Receta","Ficha final"];
const gen: Record<string, any> = {
  "Baby Boomer digital": ["Baby Boomers (1946-1964)","60-78","/avatars/baby-boomer.svg","Perfil estable, leal y sensible a la reputacion. Decide mejor cuando entiende el beneficio, reduce el riesgo y reconoce una marca confiable.","Web, Email, Facebook, WhatsApp"],
  "Generacion X digital": ["Generacion X (1965-1980)","44-59","/avatars/gen-x.svg","Perfil pragmatico y autosuficiente. Necesita pruebas, comparativas y sensacion de control.","Web, Email, LinkedIn, YouTube"],
  "Millennial": ["Millennials o Generacion Y (1981-1996)","28-43","/avatars/millennial.svg","Perfil exigente con la experiencia. Reacciona bien a transparencia, utilidad inmediata, comunidad y prueba social creible.","Web movil, Instagram, LinkedIn, Email"],
  "Generacion Z": ["Generacion Z o Centennials (1997-2012)","12-27","/avatars/gen-z.svg","Perfil visual, veloz y comunitario. El mensaje debe ser breve, demostrable y nativo movil.","TikTok, Instagram, Twitch, Discord"],
  "Alpha emergente": ["Generacion Alfa (2013-presente)","0-11","/avatars/gen-alpha.svg","Perfil en formacion. Requiere seguridad, mediacion adulta, aprendizaje visual y experiencia interactiva.","YouTube Kids, Roblox, Minecraft, asistentes inteligentes"],
};
const guide = [
  ["Contexto estrategico","Antes de describir a una persona hay que entender que decision de negocio queremos mejorar. Esta fase situa producto, mercado, objetivo y cobertura para evitar una ficha bonita pero inutil. El Buyer Persona no es una biografia inventada: es una hipotesis estrategica que debe ayudar a decidir mensajes, canales, contenidos, automatizaciones y KPIs."],
  ["Identidad y generacion digital","La generacion digital no se usa como estereotipo, sino como contexto cultural. Ayuda a inferir como una persona aprendio a confiar, que tecnologia considera natural, que canales tolera, que formatos le resultan comodos y que nivel de explicacion necesita antes de actuar."],
  ["Necesidad, dolor y valor","Una necesidad bien formulada explica el trabajo que el cliente intenta resolver. El dolor muestra friccion, miedo o perdida. La ganancia define el resultado deseado. La barrera explica por que todavia no actua. La confianza indica que evidencia necesita para avanzar."],
  ["Mapa de empatia humano","Aque no se fuerza una matriz de producto. Se observa a la persona: que escucha, que ve, que piensa, que siente, que dice, que hace, que teme, que le frustra y que desea. El objetivo es construir una lectura psicologica y estrategica que luego alimente contenido, canalidad y propuesta de valor."],
  ["Comportamiento de compra","Estas senales no son RFM ni analitica cerrada. Son indicadores pedagogicos para razonar consumo: urgencia, confianza, sensibilidad al precio, satisfaccion, frecuencia, relacion y monetizacion potencial. Sirven para conversar en clase sobre prioridad, riesgo y activacion."],
  ["Evolucion relacional con el dato","La antigua piramide se interpreta como evolucion relacional: desde acceder a informacion basica hasta autogestionarse con herramientas, IA o automatizacion. Cada nivel expresa una relacion distinta entre emocion, decision, dato y accion."],
  ["Contenido digital","Contenido no es solo formato. Es profundidad, velocidad, atencion, contexto y confianza. Hay que separar modalidad, formato, canal, temporalidad e interaccion para saber si el perfil necesita explicacion, demostracion, comparacion, prueba social o experiencia inmersiva."],
  ["Ecosistema Doc ROI","Pildoras, vitaminas, medicinas y vacunas no son productos sueltos. Son niveles de acompanamiento. Una pildora reduce incertidumbre, una vitamina madura criterio, una medicina interviene sobre un problema y una vacuna previene riesgos antes de que aparezcan."],
  ["Marketing mix como masterclass","El marketing mix traduce el diagnostico a palancas. Producto es experiencia y transformacion; precio es percepcion de valor; distribucion es acceso y friccion; comunicacion es narrativa, contenido, canal y engagement."],
  ["Canalidad relacional","Recuperamos terminales, medios, soportes e interaccion. No basta decir Instagram o email: hay que entender dispositivo, contexto, intencion, soporte, formato y tipo de vinculo que ese canal permite construir."],
  ["Keywords e intencion","Las keywords no son una lista SEO mecanica. Son senales de lenguaje, intencion de busqueda, dolor, deseo y etapa mental. Tambien preparan a la IA para entender autoridad tematica y semantica del Buyer Persona."],
  ["Topic clusters","Un pillar content organiza la autoridad tematica. Los clusters conectan subtemas, preguntas, objeciones, formatos, canales y KPIs. Es una arquitectura de aprendizaje y posicionamiento, no una lista de posts."],
  ["KPIs de inteligencia","Los KPIs deben formar un cuadro de mando: awareness, engagement, conversion, relacion, recurrencia, aprendizaje, monetizacion e influencia. Cada metrica debe responder a una decision, no decorar un informe."],
  ["Receta estrategica","La receta convierte la observacion en prescripcion: diagnostico ejecutivo, impacto esperado, intervencion Doc ROI y siguiente paso. Debe conectar problema, contenido, canal, automatizacion y validacion real."],
  ["Dossier final","La ficha final es el entregable de clase: identidad, empatia, conducta digital, contenido, canalidad, keywords, clusters, KPIs, receta y recursos operativos. Debe poder presentarse, descargarse y reutilizarse con IA."],
];

function top(){setTimeout(()=>document.getElementById("constructor")?.scrollIntoView({behavior:"smooth",block:"start"}),0)}
function F({l,k,d,a=false,h}:{l:string;k:keyof BuyerPersonaData;d:BuyerPersonaData;a?:boolean;h?:(v:string)=>void}){const v=String(d[k]??"");return <label className="field"><span>{l}</span>{a?<textarea rows={4} value={v} onChange={e=>h?h(e.target.value):null}/>:<input value={v} onChange={e=>h?h(e.target.value):null}/>}</label>}
function S({l,v,h,min=1,max=5}:{l:string;v:number|null;h:(n:number)=>void;min?:number;max?:number}){return <label className="slider"><span>{l}<b>{v??"pendiente"}</b></span><input type="range" min={min} max={max} value={v??min} onChange={e=>h(Number(e.target.value))}/></label>}
function M({t,o,s,h}:{t:string;o:string[];s:string[];h:(x:string[])=>void}){return <div className="multi"><h4>{t}</h4><div className="chip-grid">{o.map(x=><button type="button" className={s.includes(x)?"chip selected":"chip"} onClick={()=>h(s.includes(x)?s.filter(i=>i!==x):[...s,x])} key={x}>{x}</button>)}</div></div>}
function Section({t,p,c}:{t:string;p:string;c:any}){return <section className="form-section"><div className="section-kicker">Guardado local automatico</div><h3>{t}</h3><p>{p}</p><div className="form-grid">{c}</div></section>}
function Help({items}:{items:string[][]}){return <div className="variable-help">{items.map(([a,b])=><article key={a}><strong>{a}</strong><p>{b}</p></article>)}</div>}
function Bridge(){return <div className="empathy-bridge"><div className="bridge-top">Que escucha</div><div className="bridge-left">Que ve</div><div className="bridge-center"><span>Que piensa</span><strong>Buyer Persona</strong><span>Que siente</span></div><div className="bridge-right">Que dice</div><div className="bridge-bottom">Que hace</div><div className="bridge-pain">Miedos y frustraciones</div><div className="bridge-gain">Deseos y motivaciones</div><div className="bridge-need">Necesidad central</div></div>}
function PersonaImage({d,u}:{d:BuyerPersonaData;u:any}){const[imageError,setImageError]=useState(""),g=gen[d.digitalGeneration],inputId="persona-avatar-upload",src=d.avatarUrl||g?.[2]||"/avatars/millennial.svg";const read=(file?:File|null)=>{if(!file)return;if(!["image/jpeg","image/png","image/webp"].includes(file.type)){setImageError("Use a JPG, PNG or WEBP image.");return}if(file.size>3*1024*1024){setImageError("Use an image below 3 MB.");return}const reader=new FileReader();reader.onload=()=>{u("avatarUrl",String(reader.result||""));setImageError("")};reader.readAsDataURL(file)};return <div className="generation-profile persona-image-workspace" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();read(e.dataTransfer.files?.[0])}}><input id={inputId} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>read(e.currentTarget.files?.[0])}/><label className="persona-image-preview" htmlFor={inputId}><img src={src} alt="Buyer Persona image"/><span>{d.avatarUrl?"Change image":"Select image"}</span></label><div><h4>{g?.[0]||d.digitalGeneration}</h4><p>{g?.[3]}</p><small>{g?.[4]}</small><div className="persona-image-actions"><label className="secondary-btn tiny" htmlFor={inputId}>Select image</label>{d.avatarUrl&&<button className="secondary-btn tiny" type="button" onClick={()=>u("avatarUrl","")}>Remove image</button>}</div>{imageError&&<p className="image-error">{imageError}</p>}</div></div>}
function Frame({i,d}:{i:number;d:BuyerPersonaData}){const[open,setOpen]=useState(true),g=gen[d.digitalGeneration];return <aside className="summary-panel"><button className="guide-toggle" onClick={()=>setOpen(!open)}>{open?<ChevronDown size={18}/>:<ChevronRight size={18}/>} Feed formativo</button>{open&&<div className="education-frame"><span className="eyebrow">Clinica estrategica</span><h3>{guide[i][0]}</h3><p>{guide[i][1]}</p><div className="feed-note"><strong>Como cumplimentarlo</strong><p>Escribe hipotesis observables, evita frases genericas y piensa siempre en evidencias: entrevistas, comportamiento digital, CRM, conversacion comercial o senales de aula.</p></div>{i===1&&g&&<div className="generation-note"><img src={d.avatarUrl||g[2]} /><strong>{g[0]}</strong><p>{g[3]}</p><small>{g[4]}</small></div>}</div>}</aside>}
function Sheet({d}:{d:BuyerPersonaData}){const g=gen[d.digitalGeneration],rx=prescription(d),sg=vitalSigns(d),p=derivePains(d),ga=deriveGains(d);return <section className="final-persona-sheet"><header><div><span>Dossier Buyer Persona ? Doc ROI</span><h3>{d.fictionalName||"Buyer Persona pendiente"}</h3><p>{d.product||"Producto pendiente"} ? {d.sector||"Sector pendiente"}</p></div><img src={d.avatarUrl||g?.[2]||"/avatars/millennial.svg"}/></header><div className="sheet-grid"><article className="sheet-panel"><h4>Identidad estrategica</h4><dl><div><dt>Edad media</dt><dd>{d.ageRange||g?.[1]||"no informado"}</dd></div><div><dt>Genero</dt><dd>{d.gender||"no informado"}</dd></div><div><dt>Ubicacion</dt><dd>{d.location||"no informado"}</dd></div><div><dt>Responsabilidad principal</dt><dd>{d.role||"pendiente"}</dd></div><div><dt>Generacion</dt><dd>{g?.[0]||d.digitalGeneration}</dd></div></dl></article><article className="sheet-panel empathy"><h4>Mapa de empatia humano</h4><div className="sheet-empathy"><div><span>Piensa y siente</span><p>{d.thinksAndFeels||"pendiente"}</p></div><div><span>Escucha</span><p>{d.hears||"pendiente"}</p></div><div><span>Ve</span><p>{d.sees||"pendiente"}</p></div><div><span>Dice y hace</span><p>{d.saysAndDoes||"pendiente"}</p></div></div><div className="pain-gain"><div><strong>Pain</strong><p>{p[0]||d.frustrations||"pendiente"}</p></div><div><strong>Gain</strong><p>{ga[0]||d.motivations||"pendiente"}</p></div></div></article><article className="sheet-panel"><h4>Conducta digital</h4><p>{g?.[3]||d.shortDescription||"pendiente"}</p><div className="pill-row">{[d.primaryLevel,...d.secondaryLevels].filter(Boolean).map(x=><span key={x}>{x}</span>)}</div></article><article className="sheet-panel"><h4>Contenido digital</h4><div className="mini-bars"><span>Marca {d.trustDistribution.brand}%</span><span>Producto {d.trustDistribution.product}%</span><span>Experiencia {d.trustDistribution.experience}%</span></div><p>{d.modalities.join(" ? ")}</p><p>{d.formats.join(" ? ")}</p></article><article className="sheet-panel"><h4>Canalidad</h4><p>{d.terminals.join(" ? ")||"Terminal pendiente"}</p><p>{d.media.join(" ? ")||"Medios pendientes"}</p><p>{d.supports.join(" ? ")||"Soportes pendientes"}</p></article><article className="sheet-panel"><h4>Comportamiento</h4><div className="score-grid">{Object.entries(sg).map(([k,v])=><span key={k}>{k}<b>{v}</b></span>)}</div><p>{rx.diagnosis}</p><strong>{rx.intervention_type}</strong></article><article className="sheet-panel prescription-sheet"><h4>Receta Doc ROI</h4><p>{rx.prescription}</p><p>{rx.next_step}</p></article></div></section>}
function Kit(){return <section className="kit-operativo"><span className="eyebrow">KIT OPERATIVO</span><h3>Genera tu propio perfil de Buyer Persona con la IA</h3><p>El cierre no son botones sueltos: es un sistema operativo para leer, estructurar y activar la inteligencia del cliente.</p><div className="kit-grid three"><article><h4>Lectura estrategica</h4><strong>Dossier ejecutivo</strong><p>Descarga la ficha, presentala en clase y usala como informe de comportamiento, contenido, canalidad y KPIs.</p><label><input type="checkbox"/> Acepto el aviso legal.</label><button className="secondary-btn" type="button">Ver ficha ejecutiva</button></article><article><h4>Arquitectura tecnica</h4><strong>JSON accionable</strong><p>El JSON conserva la estructura de datos para IA, automatizacion, dashboards o documentacion interna.</p><label><input type="checkbox"/> Acepto el aviso legal.</label><a href="https://docroi.marketing/1st-connection-%c2%b7-gmail-ai-sheet/" target="_blank">Ver recurso operativo Doc ROI â†’</a></article><article><h4>Activacion IA</h4><strong>Prompts reutilizables</strong><p>Activa salidas para LinkedIn, TikTok, SEO, email, automatizacion o guiones comerciales a partir del perfil.</p><label><input type="checkbox"/> Acepto el aviso legal.</label><a href="https://docroi.marketing/wp-content/uploads/2026/05/Guia_1st-connection.DocROI_Read.Gmail_to_Write.Sheet_.pdf" target="_blank">Abrir guia LEGO en PDF â†’</a></article></div></section>}
function Step({i,d,u,p}:{i:number;d:BuyerPersonaData;u:any;p:any}){const apply=(x:string)=>{const g=gen[x];u("digitalGeneration",x);if(g)p({ageRange:g[1],shortDescription:g[3],role:"Responsable de decision o recomendacion en su contexto",media:g[4].split(", "),supports:g[4].split(", ")} as any)}, trust=(k:string,n:number)=>u("trustDistribution",{...d.trustDistribution,[k]:n}), mix=(k:string,n:number)=>u("marketingMix",{...d.marketingMix,[k]:n}); if(i===0)return <Section t="Preparacion" p="Contexto minimo para priorizar la hipotesis. Ejemplo: universidades privadas, ecommerce B2B, clinicas premium, formacion ejecutiva." c={<><F l="Proyecto" k="projectName" d={d} h={v=>u("projectName",v)}/><F l="Producto o gama" k="product" d={d} h={v=>u("product",v)}/><F l="Sector" k="sector" d={d} h={v=>u("sector",v)}/><F l="Mercado" k="market" d={d} h={v=>u("market",v)}/><F l="Objetivo de negocio" k="businessGoal" d={d} a h={v=>u("businessGoal",v)}/><S l="% consumidores representados" v={d.coverage} min={1} max={100} h={v=>u("coverage",v)}/></>}/>; if(i===1)return <Section t="Identidad del Buyer Persona" p="Caracterizacion inicial, contexto cultural y generacion digital." c={<><F l="Nombre ficticio" k="fictionalName" d={d} h={v=>u("fictionalName",v)}/><label className="field"><span>Generacion digital</span><select value={d.digitalGeneration} onChange={e=>apply(e.target.value)}>{Object.keys(gen).map(x=><option key={x}>{x}</option>)}</select></label><PersonaImage d={d} u={u}/><F l="Descripcion ejecutiva" k="shortDescription" d={d} a h={v=>u("shortDescription",v)}/><F l="Edad" k="ageRange" d={d} h={v=>u("ageRange",v)}/><F l="Genero" k="gender" d={d} h={v=>u("gender",v)}/><F l="Ubicacion" k="location" d={d} h={v=>u("location",v)}/><F l="Responsabilidad principal" k="role" d={d} h={v=>u("role",v)}/></>}/>; if(i===2)return <Section t="Necesidad y valor" p="Ejemplo: captar clientes, automatizar procesos, ahorrar tiempo, reducir incertidumbre o demostrar valor." c={<>{[["needsToSolve","Que necesita resolver?"],["mainConcern","Que le preocupa?"],["desiredGain","Que desea conseguir?"],["mainBarrier","Que le impide actuar?"],["trustTrigger","Que evidencia le hace confiar?"]].map(([k,l])=><F key={k} l={l} k={k as keyof BuyerPersonaData} d={d} a h={v=>u(k,v)}/>)}</>}/>; if(i===3)return <Section t="Mapa de empatia" p="Lectura psicologica, humana y estrategica del Buyer Persona." c={<><Bridge/>{[["thinksAndFeels","Que piensa y siente?"],["hears","Que escucha?"],["sees","Que ve?"],["saysAndDoes","Que dice y hace?"],["frustrations","Miedos y frustraciones"],["motivations","Deseos y motivaciones"]].map(([k,l])=><F key={k} l={l} k={k as keyof BuyerPersonaData} d={d} a h={v=>u(k,v)}/>)}</>}/>; if(i===4)return <Section t="Comportamiento de compra" p="Senales de comportamiento de consumo. No sustituye CRM: forma criterio para priorizar." c={<><Help items={[["Urgencia","Necesidad temporal y presion por resolver."],["Confianza","Evidencia requerida antes de avanzar."],["Sensibilidad","Peso del precio y del riesgo percibido."],["Satisfaccion","Experiencia acumulada o expectativa."],["Monetizacion","Potencial pedagogico de valor."],["Frecuencia","Recurrencia esperada."],["Relacion","Cercania reciente con la propuesta."],["Prueba social","Peso de testimonios y validacion externa."]]}/><div className="form-grid two">{[["urgency","Urgencia"],["confidenceNeed","Confianza"],["priceSensitivity","Sensibilidad precio"],["satisfaction","Satisfaccion"],["monetization","Monetizacion"],["frequency","Frecuencia"],["recency","Relacion reciente"],["socialProofNeed","Prueba social"]].map(([k,l])=><S key={k} l={l} v={(d as any)[k]} h={v=>u(k,v)}/>)}</div></>}/>; if(i===5)return <Section t="Evolucion relacional con el dato" p="Motivaciones, necesidades y madurez para convertir dato en decision y accion." c={<><Help items={[["Acceso","Encontrar y entender lo basico."],["Informacion","Comparar y reducir incertidumbre."],["Interaccion","Responder, preguntar o probar."],["Transaccion","Comprar o convertir."],["Relacion","Mantener vinculo."],["Experiencia","Vivir y recordar."],["Influencia","Recomendar."],["Autogestion","Operar con IA o automatizacion."]]}/><label className="field"><span>Nivel principal</span><select value={d.primaryLevel} onChange={e=>u("primaryLevel",e.target.value)}>{["Acceso","Informacion","Interaccion","Transaccion","Relacion","Experiencia","Influencia","Autogestion"].map(x=><option key={x}>{x}</option>)}</select></label></>}/>; if(i===6)return <Section t="Contenido digital" p="Separa modalidad, formato, canal, interaccion y temporalidad." c={<><Help items={[["Modalidad","Video, texto, imagen, audio o interactivo."],["Formato","Pieza concreta: carrusel, informe, demo, webinar."],["Canal","Lugar de consumo y contexto."],["Interaccion","Sincrona, asincrona o hibrida."]]}/><div className="form-grid three"><S l="Marca" v={d.trustDistribution.brand} min={0} max={100} h={v=>trust("brand",v)}/><S l="Producto" v={d.trustDistribution.product} min={0} max={100} h={v=>trust("product",v)}/><S l="Experiencia" v={d.trustDistribution.experience} min={0} max={100} h={v=>trust("experience",v)}/></div><M t="Modalidades" o={["video","texto","imagen","audio","interactivo"]} s={d.modalities} h={v=>u("modalities",v)}/><M t="Temporalidad" o={["sincrono","asincrono","hibrido"]} s={d.temporality} h={v=>u("temporality",v)}/><M t="Formatos" o={["post","carrusel","infografia","reel","newsletter","landing","blog","webinar","demo","calculadora ROI","caso de uso","informe PDF"]} s={d.formats} h={v=>u("formats",v)}/></>}/>; if(i===7)return <Section t="Ecosistema Doc ROI" p="Pildoras, vitaminas, medicinas y vacunas como niveles de madurez, acompanamiento y transformacion." c={<><label className="field"><span>Nivel de intervencion</span><select value={d.productClassification} onChange={e=>u("productClassification",e.target.value)}>{["Aspirina","Vitamina","Vacuna","Deseo Premium"].map(x=><option key={x}>{x}</option>)}</select></label><Help items={[["Pildora","Reduce incertidumbre y explica una decision concreta."],["Vitamina","Mejora criterio, habito y madurez."],["Medicina","Interviene sobre un problema activo."],["Vacuna","Previene riesgos y prepara capacidades futuras."]]}/><F l="Que ocurre si no actua?" k="noBuyConsequence" d={d} a h={v=>u("noBuyConsequence",v)}/></>}/>; if(i===8)return <Section t="Marketing mix" p="Mini masterclass: producto, precio, distribucion y comunicacion como palancas de valor." c={<><Help items={[["Producto","Experiencia, valor y transformacion."],["Precio","Percepcion, sensibilidad y riesgo."],["Distribucion","Acceso, friccion y disponibilidad."],["Comunicacion","Contenido, canales, narrativa y engagement."]]}/><div className="form-grid two"><S l="Producto" v={d.marketingMix.product} h={v=>mix("product",v)}/><S l="Precio" v={d.marketingMix.price} h={v=>mix("price",v)}/><S l="Distribucion" v={d.marketingMix.place} h={v=>mix("place",v)}/><S l="Comunicacion" v={d.marketingMix.promotion} h={v=>mix("promotion",v)}/></div></>}/>; if(i===9)return <Section t="Canalidad" p="Terminales, medios, soportes e interaccion relacional." c={<><M t="Terminales" o={["movil","desktop","tablet","smart TV","asistente de voz","aula","evento presencial"]} s={d.terminals} h={v=>u("terminals",v)}/><M t="Medios" o={["Email","Web","Redes sociales","Canales audiovisuales","Apps","IA conversacional","Eventos","Podcasts","Comunidades"]} s={d.media} h={v=>u("media",v)}/><M t="Soportes" o={["landing","newsletter","WhatsApp","LinkedIn","TikTok","YouTube","PDF","webinar","LMS","CRM"]} s={d.supports} h={v=>u("supports",v)}/><M t="Intencion" o={["aprender","resolver","comparar","comprar","autoridad profesional","automatizar","delegar","mejorar productividad"]} s={d.intentions} h={v=>u("intentions",v)}/></>}/>; if(i===10)return <Panel title="Keywords estrategicas" groups={keywords(d)}/>; if(i===11)return <Section t="Topic clusters" p="Arquitectura semantica con pillar content y clusters conectados." c={<div className="panel-grid">{topicClusters(d).map(c=><article className="mini-panel" key={c.pillar_topic}><h4>{c.pillar_topic}</h4><p>{c.subtopics.join(" ? ")}</p><span>{c.journey_stage}</span></article>)}</div>}/>; if(i===12)return <Panel title="KPIs recomendados" groups={recommendedKpis(d)}/>; if(i===13){const r=prescription(d);return <Section t="Receta Doc ROI" p="Diagnostico ejecutivo y prescripcion estrategica." c={<div className="prescription">{Object.entries(r).map(([k,v])=><article key={k}><span>{k}</span><p>{v}</p></article>)}</div>}/>}; return <Section t="Entregable final" p="Ficha visual, dossier ejecutivo y recursos para generar tu propio perfil con IA." c={<><Sheet d={d}/><div className="export-grid"><button className="primary-btn" onClick={()=>exportPdf(d)}><FileText size={18}/>Descargar ficha PDF</button><button className="secondary-btn" onClick={()=>copyJson(d)}><Clipboard size={18}/>Copiar JSON</button><button className="secondary-btn" onClick={()=>downloadJson(d)}><Download size={18}/>Descargar JSON</button></div><Kit/><details className="technical-json"><summary>Ver JSON tecnico generado</summary><pre className="json-viewer"><code>{JSON.stringify(buildJson(d),null,2)}</code></pre></details></>}/> }
function Panel({title,groups}:{title:string;groups:any}){return <Section t={title} p="Hipotesis estrategica generada desde el Buyer Persona." c={<div className="panel-grid">{Object.entries(groups).map(([k,a])=><article className="mini-panel" key={k}><h4>{k}</h4>{(a as string[]).map(x=><span key={x}>{x}</span>)}</article>)}</div>}/>}
function Methodology(){return <section className="methodology-section" id="metodologia"><a className="method-sticky" href="#constructor">Ir al constructor guiado</a><div className="container"><span className="eyebrow">DIIIP ? Metodologia Doc ROI</span><h2>The Value Chain of Data Monetization</h2><p>DIIIP es la metodologia transversal de Doc ROI: convierte senales dispersas en datos, los ordena como informacion, los interpreta con inteligencia, los transforma en insights y termina en personalizacion medible.</p><div className="method-grid">{[["D","Data","Captura senales de comportamiento, contexto, necesidad y canal."],["I","Information","Estructura la ficha para que pueda leerse, compararse y exportarse."],["I","Intelligence","Conecta IA, marketing, empatia, contenido y decision."],["I","Insights","Convierte observacion en criterio accionable y KPIs."],["P","Personalizar","Disena acciones adaptadas a madurez, confianza y canalidad."]].map(([a,b,c])=><article key={b}><strong>{a}</strong><h3>{b}</h3><p>{c}</p></article>)}</div><div className="kai-method"><span className="eyebrow dark">Ecuacion KAI ROI</span><h2>Conoce la ciencia detras de Doc ROI.</h2><p>La Ecuacion KAI ROI conecta monetizacion del dato, Customer Equity, eficiencia operativa y generacion de valor economico. En esta pildora opera como marco formativo para pasar del perfil al sistema de decision.</p><div className="formula-links">{["KAIi*","=","phi","?","ui","?","fi","?","psi","?","SPOi","?","Pi","?","Gamma g(i),t"].map((p,i)=><a href="https://docroi.marketing/kai-equation/" key={p+i}>{p}</a>)}</div><a className="method-link" href="https://docroi.marketing/kai-equation/" target="_blank">Abrir Ecuacion KAI ROI â†’</a></div></div></section>}
function Footer(){return <footer className="final-footer"><div><a href="https://la-consulta-del-doc-roi.vercel.app/#kai" className="footer-logo-link"><img src={logoBlack}/></a><div className="footer-consulta"><a href="mailto:doctor.roi.marketing@gmail.com?subject=Quiero%20una%20consulta%20con%20Doc%20ROI">Consulta con Doc ROI â†’</a></div><div className="footer-links"><a href="https://docroi.marketing/aviso-legal/">Politica de privacidad</a><span>|</span><a href="https://docroi.marketing/aviso-legal/">Aviso legal</a><span>|</span><a href="https://docroi.marketing/aviso-legal/">Propiedad intelectual</a></div><div className="footer-ip"><span>La propiedad intelectual del ecosistema Doc ROI pertenece al</span><a href="https://docroi.marketing/ph-d-jorge-lucio/">Ph. D. Jorge Lucio Sanchez Galan.</a></div></div></footer>}
export function App2(){
  const { data, currentStep, update, patch, setStep, reset } = usePersonaStore();

  const scrollToTreatment = () => {
    window.setTimeout(() => {
      document.getElementById("constructor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const nav = (n:number) => {
    setStep(Math.max(0, Math.min(14, n)));
    scrollToTreatment();
  };

  const loadExample = () => {
    patch({
      projectName: "DOC ROI Buyer Persona System · Example",
      workUnit: "Treatment · Pill · Buyer Persona System",
      userName: "DOC ROI learner",
      product: "Buyer Persona System",
      starProduct: "Professional Buyer Persona sheet",
      sector: "Market Research Strategy and strategic marketing education",
      market: "Spanish-speaking executive and postgraduate learning contexts",
      businessGoal: "Build a professional Buyer Persona sheet that connects customer signals, needs, empathy, content, channels, keywords, clusters and KPIs with a usable strategic decision.",
      coverage: 42,
      fictionalName: "Marta Valdes",
      shortDescription: "Marta is a hybrid marketing professional who has enough digital experience to move fast, but needs a clear method to avoid building customer profiles from intuition alone. She wants a practical tool that turns scattered market signals into a persona she can present, discuss and reuse.",
      ageRange: "38-48",
      gender: "Not relevant for the decision",
      location: "Madrid, hybrid work environment",
      economicStatus: "Professional decision-maker with budget sensitivity and high time pressure",
      role: "Marketing, communication or growth manager responsible for turning customer knowledge into campaigns, content and channel decisions.",
      decisionLevel: "Influencer and operational decision-maker",
      context: "She works between strategy, content, sales conversations and digital channels. The challenge is to align all those signals in one evidence-based customer view.",
      productsPerYear: "Several strategic projects or campaign cycles per year",
      mainCondition: "Needs a clear structure that can be completed, explained and reused without depending on a long consulting process.",
      digitalGeneration: "Generación X digital",
      avatar: "MV",
      avatarUrl: "",
      needsToSolve: "Understand who the priority customer is, what problem matters most, which channels deserve attention and what content should be created first.",
      mainConcern: "Creating a beautiful but weak persona that cannot guide real decisions, budget allocation or campaign design.",
      desiredGain: "A concise and defensible Buyer Persona sheet that supports messaging, content priorities, channels, keyword logic and KPI selection.",
      riskToAvoid: "Turning the exercise into a fictional biography with little evidence, vague needs and generic communication recommendations.",
      expectedValue: "A reusable customer intelligence asset that can feed content planning, channel activation, AI prompts, campaign briefs and final strategic diagnosis work.",
      successCriteria: "The persona explains what the customer needs, how they decide, what evidence they trust, what content helps them advance and which channels can activate the relationship.",
      mainBarrier: "Too much scattered information, lack of shared language between teams and difficulty translating customer observations into action.",
      trustTrigger: "Clear examples, visible method, evidence tags, structured prompts, practical outputs and a final sheet that can be presented or exported.",
      thinksAndFeels: "She thinks customer knowledge is essential, but often feels that persona work becomes decorative. She wants confidence that every field connects with a business decision.",
      hears: "She hears pressure from leadership to justify campaigns, from sales to generate better leads and from clients to make communication more useful and less generic.",
      sees: "She sees fragmented dashboards, disconnected content calendars, competitor messages, AI tools, social media signals and teams working with different assumptions about the customer.",
      saysAndDoes: "She asks for clarity, compares frameworks, collects examples, tests prompts and tries to convert research into practical briefs for content, channels and commercial activation.",
      frustrations: "She is frustrated by vague personas, empty templates, excessive theory, repeated workshops and reports that look good but do not change decisions.",
      motivations: "She wants a method that makes her work more rigorous, more presentable and more useful for decisions about content, channels, campaigns and customer experience.",
      centralNeed: "Turn customer understanding into a practical decision tool.",
      recency: 4,
      frequency: 3,
      monetization: 4,
      satisfaction: 3,
      priceSensitivity: 3,
      urgency: 4,
      confidenceNeed: 5,
      socialProofNeed: 4,
      primaryLevel: "Información",
      secondaryLevels: ["Interacción", "Relación", "Autogestión"],
      secondaryLevel: "Interacción",
      strategicInterpretation: "This persona needs a guided system that converts signals into evidence and evidence into usable marketing decisions.",
      levelWeights: { Acceso: 45, Información: 82, Interacción: 68, Transacción: 38, Relación: 61, Experiencia: 55, Influencia: 47, Autogestión: 64 },
      pyramidNotes: "The profile is already digitally mature, but needs structure, confidence and reusable outputs before moving into advanced automation.",
      trustDistribution: { brand: 25, product: 35, experience: 40 },
      modalities: ["texto", "interactivo", "PDF", "demo"],
      formats: ["plantilla descargable", "caso de uso", "informe PDF", "calculadora ROI", "prompt IA"],
      temporality: ["asíncrono", "contenido educativo permanente"],
      productClassification: "Vitamina",
      noBuyConsequence: "The team keeps planning content and campaigns from assumptions, with weak alignment between evidence, channels, keywords and customer needs.",
      perceivedUrgency: 4,
      purchaseLogic: "rational and evidence-led, with a strong need for practical examples",
      marketingMix: { product: 5, price: 3, place: 4, promotion: 5 },
      terminals: ["desktop", "móvil", "aula"],
      media: ["Web", "LinkedIn", "Email", "IA conversacional", "Plataformas formativas"],
      supports: ["landing", "newsletter", "LinkedIn", "PDF", "webinar", "LMS"],
      channelFormats: ["guided form", "persona sheet", "PDF report", "AI prompt"],
      intentions: ["aprender", "resolver", "comparar", "automatizar", "mejorar productividad"]
    } as any);
    setStep(1);
    scrollToTreatment();
  };

  const openTreatment = (event?: any) => {
    event?.preventDefault();
    scrollToTreatment();
  };

  return <div className="app-shell">
    <header className="doc-header treatment-header">
      <div className="container header-inner">
        <a className="header-logo" href="#top" aria-label="DOC ROI home">
          <img src={logo} alt="DOC ROI"/>
        </a>
        <nav aria-label="Buyer Persona navigation">
          <a href="#constructor" onClick={openTreatment}>Open Treatment</a>
        </nav>
      </div>
    </header>

    <section id="top" className="hero treatment-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(2,12,22,.96) 0%,rgba(0,45,68,.82) 48%,rgba(2,12,22,.74) 100%),url(${heroBg})`}}>
      <div className="container hero-grid treatment-hero-grid">
        <div className="treatment-hero-copy">
          <span className="hero-kicker">STRATEGY SPECIALIZATION · MARKET RESEARCH STRATEGY</span>
          <span className="hero-pill">TREATMENT · PILL · BUYER PERSONA SYSTEM</span>
          <h1>Build My Buyer Persona</h1>
          <p>A structured learning experience to transform market signals, needs, empathy, content, channels, keywords and clusters into a professional Buyer Persona sheet.</p>
          <div className="hero-actions">
            <button className="primary-btn hero-main-action" type="button" onClick={loadExample}>Load Example</button>
            <a className="primary-btn hero-main-action" href="#constructor" onClick={openTreatment}>Open Treatment</a>
          </div>
        </div>
        <article className="hero-video-card" aria-label="Buyer Persona System intro video placeholder">
          <div className="hero-video-thumb" style={{backgroundImage:`linear-gradient(90deg,rgba(0,59,92,.45),rgba(3,7,14,.18)),url(${heroBg})`}}>
            <span className="play-button" aria-hidden="true">▶</span>
          </div>
          <div className="hero-video-caption">
            <strong>Buyer Persona System</strong>
            <span>INTRO VIDEO PLACEHOLDER</span>
          </div>
        </article>
      </div>
    </section>

    <main>
      <section className="builder container" id="constructor">
        <div className="builder-head">
          <span className="eyebrow">Constructor guiado · Ficha final</span>
          <h2>{steps[currentStep]}</h2>
          <p>Una buena ficha no describe personas por decorar: ayuda a decidir contenidos, canales, mensajes, automatizaciones, KPIs y validación de valor.</p>
        </div>
        <div className="progress-wrap">
          <div className="progress-meta"><span>Step {currentStep+1} of {steps.length}</span><strong>{Math.round(((currentStep+1)/steps.length)*100)}%</strong></div>
          <div className="progress-track"><div style={{width:`${((currentStep+1)/steps.length)*100}%`}}/></div>
        </div>
        <div className="builder-grid">
          <aside className="step-list">{steps.map((s,i)=><button className={i===currentStep?"active":""} key={s} onClick={()=>nav(i)}><span>{i+1}</span>{s}</button>)}</aside>
          <main className="wizard-card"><Step i={currentStep} d={data} u={update} p={patch}/><div className="wizard-actions"><button className="secondary-btn" onClick={()=>nav(currentStep-1)} disabled={currentStep===0}><ArrowLeft size={18}/>Previous</button><button className="secondary-btn" onClick={()=>{reset(); scrollToTreatment();}}><RotateCcw size={18}/>Reset</button><button className="primary-btn small" onClick={()=>nav(currentStep+1)} disabled={currentStep===steps.length-1}>Next<ArrowRight size={18}/></button></div></main>
          <Frame i={currentStep} d={data}/>
        </div>
      </section>
      <Methodology/>
    </main>
    <Footer/>
  </div>
}
