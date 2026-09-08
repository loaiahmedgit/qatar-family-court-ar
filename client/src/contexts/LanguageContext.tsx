import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SiteLanguage = "ar" | "en";

type LanguageContextValue = {
  language: SiteLanguage;
  direction: "rtl" | "ltr";
  setLanguage: (language: SiteLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getInitialLanguage = (): SiteLanguage => {
  if (typeof window === "undefined") return "ar";
  return window.localStorage.getItem("qfc-language") === "en" ? "en" : "ar";
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>(getInitialLanguage);
  const direction: LanguageContextValue["direction"] =
    language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    window.localStorage.setItem("qfc-language", language);
  }, [direction, language]);

  const value = useMemo(
    () => ({ language, direction, setLanguage }),
    [direction, language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
