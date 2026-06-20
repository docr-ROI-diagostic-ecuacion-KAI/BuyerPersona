const spanishLogoTarget = "https://el-botiquin-del-doc-roi.vercel.app/";
const englishLogoTarget = "https://docroi.marketing/kai-equation/";
let scheduled = false;

function isEnglishMode() {
  const url = new URL(window.location.href);
  return (
    url.searchParams.get("lang") === "en" ||
    url.searchParams.get("edition") === "eng" ||
    localStorage.getItem("docroi-buyer-persona-lang") === "en"
  );
}

function targetUrl() {
  return isEnglishMode() ? englishLogoTarget : spanishLogoTarget;
}

function looksLikeDocRoiLogo(img: HTMLImageElement) {
  const src = img.getAttribute("src") || "";
  const alt = img.getAttribute("alt") || "";
  return /doc[_-]?roi|docroi|logo/i.test(src) || /doc\s*roi/i.test(alt);
}

function bindLogo(img: HTMLImageElement) {
  if (!looksLikeDocRoiLogo(img)) return;
  const href = targetUrl();
  const currentLink = img.closest("a");
  if (currentLink) {
    currentLink.setAttribute("href", href);
    currentLink.setAttribute("target", "_blank");
    currentLink.setAttribute("rel", "noopener noreferrer");
    return;
  }

  const wrapper = document.createElement("a");
  wrapper.href = href;
  wrapper.target = "_blank";
  wrapper.rel = "noopener noreferrer";
  wrapper.style.display = "inline-flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  img.insertAdjacentElement("beforebegin", wrapper);
  wrapper.appendChild(img);
}

function applyLogoLinks() {
  scheduled = false;
  document.querySelectorAll<HTMLImageElement>("img").forEach(bindLogo);
}

function scheduleLogoLinks() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(applyLogoLinks);
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    scheduleLogoLinks();
    const root = document.getElementById("root") || document.body;
    new MutationObserver(scheduleLogoLinks).observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "src", "alt"] });
  });
}

export {};
