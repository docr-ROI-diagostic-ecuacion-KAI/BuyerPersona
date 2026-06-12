import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BuyerPersonaData } from "./types";
import { initialData } from "./data";

type PersonaStore = {
  data: BuyerPersonaData;
  currentStep: number;
  update: <K extends keyof BuyerPersonaData>(key: K, value: BuyerPersonaData[K]) => void;
  patch: (value: Partial<BuyerPersonaData>) => void;
  setStep: (step: number) => void;
  reset: () => void;
};

export const usePersonaStore = create<PersonaStore>()(
  persist(
    (set) => ({
      data: initialData,
      currentStep: 0,
      update: (key, value) => set((state) => ({ data: { ...state.data, [key]: value } })),
      patch: (value) => set((state) => ({ data: { ...state.data, ...value } })),
      setStep: (step) => set({ currentStep: Math.max(0, Math.min(14, step)) }),
      reset: () => set({ data: initialData, currentStep: 0 }),
    }),
    { name: "doc-roi-buyer-persona" },
  ),
);

(globalThis as any).__docroiPersonaStore = usePersonaStore;
