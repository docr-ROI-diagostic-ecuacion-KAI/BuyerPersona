import { usePersonaStore } from "./store";

const styleId = "docroi-channel-architecture-style";
let scheduled = false;

const groups = [
  {
    key: "terminals",
    title: "1. Terminal",
    question: "Desde donde interactua realmente este Buyer Persona?",
    help: "La terminal es la pantalla, dispositivo o entorno desde el que consume, compara o decide. Condiciona atencion, velocidad, profundidad e interaccion.",
    options: ["Small Screen", "smartphone", "smartwatch", "Middle Screen", "tablet", "portatil", "Big Screen", "desktop", "monitor profesional", "smart TV", "asistente de voz", "aula", "evento presencial", "punto de venta"],
  },
  {
    key: "media",
    title: "2. Medio",
    question: "Por donde circula la comunicacion?",
    help: "El medio es el gran espacio de comunicacion: donde aparece la informacion, se genera atencion y empieza la relacion.",
    options: ["Email", "Web", "Buscadores", "Redes sociales", "Mensajeria", "Podcast", "Streaming", "Apps", "IA conversacional", "Eventos digitales", "Comunidades", "Prensa digital", "Canales audiovisuales", "LMS", "CRM"],
  },
  {
    key: "supports",
    title: "3. Soporte",
    question: "En que plataforma u organizacion concreta vive la interaccion?",
    help: "El soporte concreta el medio. No basta decir redes sociales: hay que saber si hablamos de LinkedIn, TikTok, Instagram, YouTube, WhatsApp o una web concreta.",
    options: ["LinkedIn", "Instagram", "TikTok", "YouTube", "Facebook", "X", "WhatsApp", "Telegram", "Discord", "Twitch", "Spotify", "Newsletter", "Landing", "Blog", "ElPais.com", "Expansion", "Forbes", "TechCrunch", "Webinar", "LMS", "CRM", "Marketplace"],
  },
  {
    key: "channelFormats",
    title: "4. Formato",
    question: "Como aparece el mensaje ante la persona?",
    help: "El formato es la pieza concreta: post, reel, articulo, CTA, newsletter, demo o comparativa. Cambia engagement, profundidad, clic y conversion.",
    options: ["post", "articulo", "newsletter", "CTA", "secuencia automatizada", "reel", "short", "video largo", "carrusel", "infografia", "podcast", "webinar", "demo", "caso de uso", "comparativa", "FAQ", "landing", "calculadora ROI", "banner", "display", "encuesta", "guia PDF"],
  },
  {
    key: "intentions",
    title: "Intencion relacional",
    question: "Para que usa esa combinacion canal + soporte + formato?",
    help: "La intencion explica si el canal sirve para aprender, comparar, comprar, confiar, automatizar, compartir o mantener relacion.",
    options: ["aprender", "informarse", "resolver", "comparar", "confiar", "comprar", "reservar", "solicitar demo", "autoridad profesional", "automatizar", "delegar", "mejorar productividad", "pertenecer a comunidad", "recomendar", "seguimiento", "fidelizar"],
  },
] as const;

type GroupKey = (typeof groups)[number]["key"];

function isActive() {
  return /^canalidad$/i.test((document.querySelector(".builder-head h2")?.textContent || "").trim());
}

function installStyles() {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .docroi-channel-step .form-grid > .multi {
      display: none !important;
    }
    .docroi-channel-builder {
      grid-column: 1 / -1;
      display: grid;
      gap: 14px;
      order: 1;
    }
    .docroi-channel-builder .channel-kicker,
    .docroi-channel-feed .channel-kicker {
      display: inline-flex;
      width: fit-content;
      padding: 7px 10px;
      border-radius: 999px;
      background: #eef4f7;
      color: #003b5c;
      font-size: 10px;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    .docroi-channel-route {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      padding: 14px;
      border: 1px solid #dce7ef;
      border-radius: 18px;
      background: #05070b;
      color: #fff;
    }
    .docroi-channel-route article {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(216,236,248,.22);
      border-radius: 14px;
      padding: 12px;
      display: grid;
      gap: 5px;
    }
    .docroi-channel-route span {
      color: #d8ecf8;
      font-size: 10px;
      font-weight: 950;
      text-transform: uppercase;
    }
    .docroi-channel-route strong {
      color: #fff;
      font-size: 14px;
      line-height: 1.2;
      font-weight: 950;
    }
    .docroi-channel-route small {
      color: #cbd5e1;
      font-size: 11px;
      line-height: 1.35;
      font-weight: 750;
    }
    .docroi-channel-group {
      border: 1px solid #dce7ef;
      border-radius: 18px;
      background: #fff;
      padding: 16px;
      display: grid;
      gap: 11px;
    }
    .docroi-channel-group header {
      display: grid;
      gap: 5px;
    }
    .docroi-channel-group h4 {
      margin: 0;
      color: #003b5c;
      font-size: 22px;
      line-height: 1.1;
      font-weight: 950;
    }
    .docroi-channel-group header strong {
      color: #05070b;
      font-size: 15px;
      line-height: 1.3;
      font-weight: 950;
    }
    .docroi-channel-group p {
      margin: 0;
      color: #475569 !important;
      font-size: 13px !important;
      line-height: 1.5 !important;
    }
    .docroi-channel-chip-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .docroi-channel-chip {
      border: 1px solid #dbe7ef;
      border-radius: 999px;
      background: #f8fafc;
      color: #0f172a;
      padding: 9px 11px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 900;
      line-height: 1.1;
      transition: background .18s ease, color .18s ease, border-color .18s ease;
    }
    .docroi-channel-chip.selected {
      background: #003b5c;
      border-color: #003b5c;
      color: #fff;
    }
    .docroi-channel-help {
      order: 20;
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin-top: 6px;
    }
    .docroi-channel-help article {
      background: #f6f7f9;
      border: 1px solid #dce5ee;
      border-radius: 14px;
      padding: 12px;
    }
    .docroi-channel-help strong {
      display: block;
      color: #003b5c;
      font-size: 14px;
      font-weight: 950;
      margin-bottom: 5px;
    }
    .docroi-channel-help p {
      margin: 0;
      color: #475569 !important;
      font-size: 12px !important;
      line-height: 1.45 !important;
    }
    .docroi-channel-feed {
      display: grid;
      gap: 12px;
      margin-top: 14px;
      text-align: left;
    }
    .docroi-channel-feed h4 {
      margin: 0;
      color: #05070b;
      font-size: 22px;
      line-height: 1.08;
      font-weight: 950;
    }
    .docroi-channel-feed p {
      margin: 0;
      color: #334155;
      font-size: 13px;
      line-height: 1.56;
    }
    .docroi-channel-feed article {
      border: 1px solid #dce7ef;
      border-radius: 14px;
      background: #fff;
      padding: 12px;
      display: grid;
      gap: 5px;
    }
    .docroi-channel-feed article strong {
      color: #003b5c;
      font-size: 14px;
      line-height: 1.15;
      font-weight: 950;
    }
    .docroi-channel-feed .feed-dark {
      border-radius: 15px;
      background: #05070b;
      color: #fff;
      padding: 13px;
    }
    .docroi-channel-feed .feed-dark strong,
    .docroi-channel-feed .feed-dark p {
      color: #fff !important;
    }
    @media (max-width: 900px) {
      .docroi-channel-route,
      .docroi-channel-help {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char] || char));
}

function selectedFor(key: GroupKey) {
  const data = usePersonaStore.getState().data as any;
  return Array.isArray(data[key]) ? data[key] as string[] : [];
}

function toggleValue(key: GroupKey, value: string) {
  const store = usePersonaStore.getState();
  const current = selectedFor(key);
  const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
  store.update(key as any, next as any);
}

function firstSelected(key: GroupKey, fallback: string) {
  return selectedFor(key)[0] || fallback;
}

function signature() {
  const data = usePersonaStore.getState().data;
  return JSON.stringify({ terminals: data.terminals, media: data.media, supports: data.supports, formats: data.channelFormats, intentions: data.intentions });
}

function groupHtml(group: typeof groups[number]) {
  const selected = selectedFor(group.key);
  return `
    <section class="docroi-channel-group">
      <header>
        <h4>${escapeHtml(group.title)}</h4>
        <strong>${escapeHtml(group.question)}</strong>
        <p>${escapeHtml(group.help)}</p>
      </header>
      <div class="docroi-channel-chip-grid">
        ${group.options.map((option) => `<button type="button" class="docroi-channel-chip ${selected.includes(option) ? "selected" : ""}" data-channel-key="${group.key}" data-channel-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("")}
      </div>
    </section>
  `;
}

function builderHtml(sig: string) {
  return `
    <div class="docroi-channel-builder" data-docroi-channel-builder="1" data-docroi-signature="${escapeHtml(sig)}">
      <span class="channel-kicker">Preguntas guia · arquitectura de canalidad</span>
      <div class="docroi-channel-route">
        <article><span>Terminal</span><strong>${escapeHtml(firstSelected("terminals", "pantalla pendiente"))}</strong><small>Desde donde vive la experiencia.</small></article>
        <article><span>Medio</span><strong>${escapeHtml(firstSelected("media", "medio pendiente"))}</strong><small>Por donde circula la comunicacion.</small></article>
        <article><span>Soporte</span><strong>${escapeHtml(firstSelected("supports", "soporte pendiente"))}</strong><small>Plataforma u organizacion concreta.</small></article>
        <article><span>Formato</span><strong>${escapeHtml(firstSelected("channelFormats", "formato pendiente"))}</strong><small>Como aparece el mensaje.</small></article>
      </div>
      ${groups.map(groupHtml).join("")}
      <div class="docroi-channel-help">
        <article><strong>Terminal</strong><p>Dispositivo, pantalla o entorno. Define atencion, velocidad y profundidad.</p></article>
        <article><strong>Medio</strong><p>Gran canal de comunicacion: web, email, buscador, red social, streaming o evento.</p></article>
        <article><strong>Soporte</strong><p>Plataforma concreta donde ocurre la relacion: LinkedIn, YouTube, WhatsApp o una web.</p></article>
        <article><strong>Formato</strong><p>Pieza de interaccion: reel, articulo, CTA, demo, newsletter, comparativa o webinar.</p></article>
      </div>
    </div>
  `;
}

function feedHtml() {
  return `
    <div class="docroi-channel-feed" data-docroi-channel-feed="1">
      <span class="channel-kicker">Canalidad avanzada · Doc ROI</span>
      <h4>Arquitectura de comunicacion, no lista de canales</h4>
      <p>La canalidad explica como una persona entra en contacto con la propuesta de valor. No basta con decir Instagram, email o web. Hay que ordenar cuatro capas: terminal, medio, soporte y formato.</p>
      <article><strong>1. Terminal</strong><p>Es el lugar desde donde interactua: movil, tablet, ordenador, smart TV, aula o evento. Una pantalla pequena invita a rapidez; una pantalla grande permite analisis y profundidad.</p></article>
      <article><strong>2. Medio</strong><p>Es el gran espacio por donde circula la comunicacion: email, web, buscadores, redes sociales, podcast, mensajeria, streaming o eventos digitales.</p></article>
      <article><strong>3. Soporte</strong><p>Es la plataforma concreta. Dentro de redes sociales puede ser LinkedIn, Instagram o TikTok. Dentro de web puede ser una landing, un blog o prensa digital.</p></article>
      <article><strong>4. Formato</strong><p>Es la pieza final que recibe la persona: reel, articulo, newsletter, CTA, demo, carrusel, comparativa, guia PDF o calculadora ROI.</p></article>
      <div class="feed-dark"><strong>Ejemplo pedagogico</strong><p>Un perfil puede usar Small Screen, medio redes sociales, soporte Instagram y formato Reels. Otro puede usar Big Screen, medio web/email, soporte LinkedIn y formato articulo largo o newsletter.</p></div>
      <p>La clave docente es ver la cadena completa: una misma idea cambia totalmente si aparece en movil como reel, en ordenador como informe, en email como CTA o en LinkedIn como carrusel.</p>
    </div>
  `;
}

function wireChipClicks() {
  document.querySelectorAll<HTMLButtonElement>("[data-channel-key][data-channel-value]").forEach((button) => {
    button.onclick = () => toggleValue(button.dataset.channelKey as GroupKey, button.dataset.channelValue || "");
  });
}

function enhanceChannel() {
  scheduled = false;
  installStyles();
  const active = isActive();
  document.querySelectorAll(".wizard-card .form-section").forEach((section) => section.classList.toggle("docroi-channel-step", active));
  if (!active) {
    document.querySelectorAll('[data-docroi-channel-builder="1"], [data-docroi-channel-feed="1"]').forEach((node) => node.remove());
    return;
  }

  const sig = signature();
  const formGrid = document.querySelector<HTMLElement>(".wizard-card .form-section .form-grid");
  const existing = document.querySelector<HTMLElement>('[data-docroi-channel-builder="1"]');
  if (formGrid && existing?.dataset.docroiSignature !== sig) {
    const html = builderHtml(sig);
    if (existing) existing.outerHTML = html;
    else formGrid.insertAdjacentHTML("afterbegin", html);
  }
  wireChipClicks();

  const frame = document.querySelector<HTMLElement>(".summary-panel .education-frame");
  if (frame && !document.querySelector('[data-docroi-channel-feed="1"]')) frame.insertAdjacentHTML("beforeend", feedHtml());
}

function scheduleChannel() {
  if (scheduled) return;
  scheduled = true;
  window.requestAnimationFrame(enhanceChannel);
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleChannel();
  const root = document.getElementById("root");
  if (root) new MutationObserver(scheduleChannel).observe(root, { childList: true, subtree: true });
  usePersonaStore.subscribe(scheduleChannel);
});

export {};
