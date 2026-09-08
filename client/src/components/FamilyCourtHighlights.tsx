import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLanguage } from "../contexts/LanguageContext";
import { sitePath } from "../lib/sitePath";

const highlights = [
  {
    title: { ar: "خدمات التقاضي", en: "Litigation services" },
    description: {
      ar: "رفع الدعاوى، متابعة الطلبات والمواعيد والإجراءات القضائية.",
      en: "File cases and follow requests, hearings and judicial procedures.",
    },
    href: "/family-services#litigation-services",
    iconSrc: "/images/highlights/litigation-gavel.png",
  },
  {
    title: { ar: "خدمات التوثيقات الأسرية", en: "Family documentation" },
    description: {
      ar: "إجراءات ووثائق التوثيق الأسري والخدمات المرتبطة بها.",
      en: "Family documentation procedures, records and related services.",
    },
    href: "/family-services#family-documentation",
    iconSrc: "/images/highlights/family-documentation.png",
  },
  {
    title: { ar: "الصلح والإرشاد الأسري", en: "Family reconciliation" },
    description: {
      ar: "خدمات الصلح الأسري والإرشاد والدعم الأسري.",
      en: "Reconciliation, guidance and family support services.",
    },
    href: "/family-services#family-reconciliation",
    iconSrc: "/images/highlights/family-reconciliation.png",
  },
  {
    title: { ar: "النسخ والمستندات", en: "Copies and documents" },
    description: {
      ar: "طلبات النسخ الرسمية والمستندات القضائية ذات الصلة.",
      en: "Requests for official copies and related judicial documents.",
    },
    href: "/family-services#copies-documents",
    iconSrc: "/images/highlights/copies-documents.png",
  },
] as const;

export function FamilyCourtHighlights() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  return (
    <section
      id="services"
      className="family-court-highlights"
      aria-labelledby="family-court-highlights-title"
    >
      <h2 id="family-court-highlights-title" className="sr-only">
        {isEnglish ? "Family Court services" : "خدمات محكمة الأسرة"}
      </h2>
      <div className="family-court-highlights-grid section-shell">
        {highlights.map(({ title, description, href, iconSrc }) => (
          <a
            className="family-court-highlight"
            href={sitePath(href)}
            key={href}
          >
            <span className="family-court-highlight-icon">
              <img
                src={sitePath(iconSrc)}
                alt=""
                aria-hidden="true"
                width={1254}
                height={1254}
                loading="lazy"
              />
            </span>
            <h3>{title[language]}</h3>
            <p>{description[language]}</p>
            <span className="family-court-highlight-cta">
              {isEnglish ? "View services" : "عرض الخدمات"}{" "}
              <HugeiconsIcon
                icon={isEnglish ? ArrowRight01Icon : ArrowLeft01Icon}
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
