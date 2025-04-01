import { create } from 'zustand';

type Language = 'ko' | 'en';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'ko',
  setLanguage: (lang) => set({ language: lang }),
})); 