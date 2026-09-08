import { AlertCircle, Home } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { sitePath } from "../lib/sitePath";

export default function NotFound() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main className="not-found-page">
      <section aria-labelledby="not-found-title">
        <AlertCircle size={44} aria-hidden="true" />
        <p className="not-found-code">404</p>
        <h1 id="not-found-title">
          {isEnglish ? "Page not found" : "الصفحة غير موجودة"}
        </h1>
        <p>
          {isEnglish
            ? "The requested page may have moved or is no longer available."
            : "قد تكون الصفحة المطلوبة نُقلت أو لم تعد متاحة."}
        </p>
        <a href={sitePath("/")}>
          <Home size={18} aria-hidden="true" />
          <span>{isEnglish ? "Return home" : "العودة إلى الرئيسية"}</span>
        </a>
      </section>
    </main>
  );
}
