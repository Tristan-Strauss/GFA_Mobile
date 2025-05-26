export interface Language {
  code: string;
  name: string;
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'sw', name: "Kiswahili"},
  { code: 'pt', name: "Português" },
  { code: 'ar', name: "العربية"},
  { code: 'ny', name: "Chichewa" },
  { code: 'zu', name: "isiZulu" }
];