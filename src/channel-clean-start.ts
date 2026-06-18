import { usePersonaStore } from "./store";

const legacyDefaults = {
  terminals: ["Small Screen", "Medium Screen"],
  media: ["Web", "Email", "IA conversacional"],
  supports: ["landing pages", "newsletter", "ChatGPT"],
  channelFormats: ["artículos", "simuladores", "plantillas"],
  intentions: ["aprender", "comparar", "mejorar productividad"],
};

function sameList(current: unknown, legacy: string[]) {
  return Array.isArray(current) && current.length === legacy.length && legacy.every((item, index) => current[index] === item);
}

function cleanLegacyChannelSelections() {
  const store = usePersonaStore.getState();
  const data = store.data as any;
  const isLegacyChannelState =
    sameList(data.terminals, legacyDefaults.terminals) &&
    sameList(data.media, legacyDefaults.media) &&
    sameList(data.supports, legacyDefaults.supports) &&
    sameList(data.channelFormats, legacyDefaults.channelFormats) &&
    sameList(data.intentions, legacyDefaults.intentions);

  if (!isLegacyChannelState) return;
  store.patch({
    terminals: [],
    media: [],
    supports: [],
    channelFormats: [],
    intentions: [],
  } as any);
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    cleanLegacyChannelSelections();
    window.setTimeout(cleanLegacyChannelSelections, 0);
  });
}

export {};
