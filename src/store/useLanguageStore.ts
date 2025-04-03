import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "ko" | "en";

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "ko",
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "language-storage", // localStorage에 저장될 키
    }
  )
);
