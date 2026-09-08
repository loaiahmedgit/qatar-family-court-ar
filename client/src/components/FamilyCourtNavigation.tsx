import { ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { sitePath } from "../lib/sitePath";

const serviceLinks = [
  {
    ar: "خدمات التقاضي",
    en: "Litigation services",
    href: "/family-services#litigation-services",
  },
  {
    ar: "التوثيقات الأسرية",
    en: "Family documentation",
    href: "/family-services#family-documentation",
  },
  {
    ar: "الصلح والإرشاد",
    en: "Reconciliation and guidance",
    href: "/family-services#family-reconciliation",
  },
  {
    ar: "النسخ والمستندات",
    en: "Copies and documents",
    href: "/family-services#copies-documents",
  },
] as const;

const courtLinks = [
  { ar: "نبذة عن المحكمة", en: "Court overview", href: "/#about" },
  { ar: "الإطار التشريعي", en: "Legal framework", href: "/#legal-framework" },
  {
    ar: "استراتيجية المجلس",
    en: "Council strategy",
    href: "/#digital-services",
  },
] as const;

type DropdownLink = (typeof serviceLinks)[number] | (typeof courtLinks)[number];

function NavigationDropdown({
  title,
  href,
  links,
  primary = false,
}: {
  title: { ar: string; en: string };
  href: string;
  links: readonly DropdownLink[];
  primary?: boolean;
}) {
  const { language } = useLanguage();
  return (
    <div className="family-navigation-dropdown">
      <a
        className={`family-navigation-direct family-navigation-parent${primary ? " is-primary" : ""}`}
        href={sitePath(href)}
      >
        <span>{title[language]}</span>
        <ChevronDown size={15} strokeWidth={1.8} aria-hidden="true" />
      </a>
      <div className="family-navigation-menu">
        {links.map(link => (
          <a href={sitePath(link.href)} key={link.href}>
            {link[language]}
          </a>
        ))}
      </div>
    </div>
  );
}

export function FamilyCourtNavigation() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  return (
    <div
      className="family-navigation family-navigation-list"
      dir={isEnglish ? "ltr" : "rtl"}
    >
      <a className="family-navigation-direct" href={sitePath("/#top")}>
        {isEnglish ? "Home" : "الرئيسية"}
      </a>
      <NavigationDropdown
        title={{ ar: "عن المحكمة", en: "About" }}
        href="/#about"
        links={courtLinks}
      />
      <NavigationDropdown
        title={{ ar: "الخدمات", en: "Services" }}
        href="/family-services#services-view"
        links={serviceLinks}
        primary
      />
      <a className="family-navigation-direct" href={sitePath("/#faq")}>
        {isEnglish ? "FAQs" : "الأسئلة الشائعة"}
      </a>
      <a
        className="family-navigation-direct"
        href={sitePath("/family-services#about-location")}
      >
        {isEnglish ? "Contact us" : "تواصل معنا"}
      </a>
    </div>
  );
}
