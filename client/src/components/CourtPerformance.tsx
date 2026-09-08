import { useReducedMotion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import CountUp from "./CountUp";

const metrics = [
  {
    id: "completion",
    value: 97,
    suffix: "%",
    label: { ar: "نسبة الإنجاز القضائي", en: "Judicial completion rate" },
  },
  {
    id: "services",
    value: 20875,
    suffix: "",
    label: { ar: "إجمالي الخدمات المقدمة", en: "Services delivered" },
  },
  {
    id: "sessions",
    value: 2924,
    suffix: "",
    label: { ar: "جلسة إلكترونية", en: "Online hearings" },
  },
  {
    id: "registration",
    value: 83,
    suffix: "%",
    label: {
      ar: "نسبة التسجيل الإلكتروني",
      en: "Electronic registration rate",
    },
  },
] as const;

export function CourtPerformance() {
  const reducedMotion = useReducedMotion();
  const { language } = useLanguage();

  return (
    <section
      id="performance"
      className="court-performance"
      aria-labelledby="performance-title"
    >
      <div className="court-performance-inner section-shell">
        <header className="performance-heading">
          <h2 id="performance-title">
            {language === "en" ? "Facts and figures" : "أرقام وإحصائيات"}
          </h2>
        </header>
        <div className="performance-stats">
          {metrics.map(metric => (
            <article className="performance-stat" key={metric.id}>
              <div className="performance-value" dir="ltr" aria-hidden="true">
                <CountUp
                  from={reducedMotion ? metric.value : 0}
                  to={metric.value}
                  separator=","
                  locale="en-US"
                  duration={reducedMotion ? 0.01 : 1.1}
                />
                {metric.suffix && (
                  <span className="performance-suffix">{metric.suffix}</span>
                )}
              </div>
              <p className="performance-label">{metric.label[language]}</p>
              <span className="sr-only">
                {metric.label[language]}: {metric.value}
                {metric.suffix}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
