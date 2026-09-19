import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLanguage } from "../contexts/LanguageContext";
import { sitePath } from "../lib/sitePath";

const highlights = [
  {
    title: {
      ar: "خدمات التقاضي",
      en: "Litigation services",
    },
    description: {
      ar: "تسجيل الدعاوى والطلبات والحصول على نسخ الوثائق القضائية.",
      en: "Register cases and requests and obtain copies of judicial documents.",
    },
    href: "/family-services/litigation",
    iconSrc: "/images/highlights/litigation-gavel.png",
    icon: null,
  },
  {
    title: { ar: "الخدمات الرضائية", en: "Consensual services" },
    description: {
      ar: "خدمات الطلاق والخلع والشهادات والوثائق والتركات والمأذونين.",
      en: "Divorce, certificates, documents, estates and marriage officer services.",
    },
    href: "/family-services/consensual",
    iconSrc: "/images/highlights/family-documentation.png",
    icon: null,
  },
  {
    title: {
      ar: "التصالح والإرشاد الأسري",
      en: "Family settlement and guidance",
    },
    description: {
      ar: "خدمات الوساطة والتصالح والإرشاد والدعم الأسري.",
      en: "Family mediation, settlement, guidance and support services.",
    },
    href: "/family-services/reconciliation-guidance",
    iconSrc: "/images/highlights/family-reconciliation.png",
    icon: null,
  },
  {
    title: { ar: "شؤون المحضونين", en: "Custodial affairs" },
    description: {
      ar: "خدمات الحضانة والزيارة وتسليم الأبناء والرعاية النفسية للأبناء.",
      en: "Custody, visitation, child handover and psychological care services.",
    },
    href: "/family-services/custodial-affairs",
    iconSrc: "/images/highlights/custodial-affairs.png",
    icon: null,
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
      <header className="family-court-highlights-heading">
        <h2
          id="family-court-highlights-title"
          className="section-shell"
        >
          {isEnglish ? "Family Court services" : "خدمات المحكمة"}
        </h2>
      </header>
      <div className="family-court-highlights-grid section-shell">
        {highlights.map(({ title, description, href, iconSrc, icon }) => (
          <a
            className="family-court-highlight"
            href={sitePath(href)}
            key={href}
          >
            <span className="family-court-highlight-icon">
              {iconSrc ? (
                <img
                  src={sitePath(iconSrc)}
                  alt=""
                  aria-hidden="true"
                  width={1254}
                  height={1254}
                  loading="lazy"
                />
              ) : icon ? (
                <HugeiconsIcon
                  icon={icon}
                  size={64}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              ) : null}
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
