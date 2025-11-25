import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { type Farmer } from "@shared/schema";
import { type Language, translations } from "@/lib/translations";

interface AppContextType {
  farmer: Farmer | null;
  setFarmer: (farmer: Farmer | null) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang && (savedLang === "en" || savedLang === "sn")) {
      setLanguage(savedLang);
    }

    // Load farmer from localStorage
    const savedFarmer = localStorage.getItem("farmer");
    if (savedFarmer) {
      setFarmer(JSON.parse(savedFarmer));
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    // Save farmer to localStorage
    if (farmer) {
      localStorage.setItem("farmer", JSON.stringify(farmer));
    } else {
      localStorage.removeItem("farmer");
    }
  }, [farmer]);

  const t = translations[language];

  return (
    <AppContext.Provider value={{ farmer, setFarmer, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
