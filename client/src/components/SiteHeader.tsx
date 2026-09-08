import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Globe2,
  Menu,
  Printer,
  X,
} from "lucide-react";

import familyCourtLogo from "../../../qatar-family-court-ar-assets/family-court-header-logo_ef716b29.png";
import { useLanguage } from "../contexts/LanguageContext";
import { sitePath } from "../lib/sitePath";
import { FamilyCourtNavigation } from "./FamilyCourtNavigation";

type LocalizedText = { ar: string; en: string };
type MobileLink = { label: LocalizedText; href: string };

type SiteHeaderProps = {
  brandHref: string;
  brandAriaLabel: LocalizedText;
  mobileLinks: readonly MobileLink[];
};

export function SiteHeader({
  brandHref,
  brandAriaLabel,
  mobileLinks,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const languageSelectorRef = useRef<HTMLDetailsElement>(null);
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  useEffect(() => {
    const closeLanguageMenu = (event: PointerEvent) => {
      if (!languageSelectorRef.current?.contains(event.target as Node)) {
        languageSelectorRef.current?.removeAttribute("open");
      }
    };

    document.addEventListener("pointerdown", closeLanguageMenu);
    return () => document.removeEventListener("pointerdown", closeLanguageMenu);
  }, []);

  const chooseLanguage = (
    nextLanguage: "ar" | "en",
    target: HTMLButtonElement
  ) => {
    setLanguage(nextLanguage);
    target.closest("details")?.removeAttribute("open");
  };

  return (
    <header className="site-header">
      <div className="header-announcement">
        <div className="header-announcement-inner">
          <span className="header-news-pill">
            {isEnglish ? "News" : "أخبار"}
          </span>
          <strong>
            {isEnglish
              ? "New electronic documentation service launched"
              : "إطلاق خدمة التوثيق الإلكتروني الجديدة"}
          </strong>
          <span className="header-announcement-separator" aria-hidden="true" />
          <span className="header-announcement-copy">
            {isEnglish
              ? "A faster, simpler judicial journey"
              : "خدمة أسرع وأسهل لرحلتك القضائية"}
          </span>
          <a
            className="header-announcement-link"
            href={sitePath("/family-services#services-view")}
          >
            <span>{isEnglish ? "View details" : "اطلع على التفاصيل"}</span>
            {isEnglish ? (
              <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <ArrowLeft size={17} strokeWidth={1.8} aria-hidden="true" />
            )}
          </a>
        </div>
      </div>

      <div className="header-inner">
        <a
          href={sitePath(brandHref)}
          className="brand-mark"
          aria-label={brandAriaLabel[language]}
        >
          <img
            src={familyCourtLogo}
            alt={isEnglish ? "Family Court logo" : "شعار محكمة الأسرة"}
            width={1448}
            height={1086}
          />
        </a>

        <nav
          className="desktop-nav"
          aria-label={isEnglish ? "Main navigation" : "التنقل الرئيسي"}
        >
          <FamilyCourtNavigation />
        </nav>

        <div className="header-actions">
          <button
            className="text-action"
            onClick={() => window.print()}
            aria-label={isEnglish ? "Print page" : "طباعة الصفحة"}
          >
            <Printer size={20} strokeWidth={1.8} aria-hidden="true" />
            <span>{isEnglish ? "Print" : "طباعة"}</span>
          </button>

          <span className="header-actions-divider" aria-hidden="true" />

          <details ref={languageSelectorRef} className="language-selector">
            <summary
              aria-label={
                isEnglish ? "Choose site language" : "اختيار لغة الموقع"
              }
            >
              <Globe2 size={20} strokeWidth={1.8} aria-hidden="true" />
              <span>{isEnglish ? "English" : "العربية"}</span>
              <ChevronDown
                className="language-chevron"
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </summary>
            <div className="language-menu" role="list">
              <button
                type="button"
                aria-current={!isEnglish ? "true" : undefined}
                onClick={event => chooseLanguage("ar", event.currentTarget)}
              >
                العربية
              </button>
              <button
                type="button"
                aria-current={isEnglish ? "true" : undefined}
                onClick={event => chooseLanguage("en", event.currentTarget)}
              >
                English
              </button>
            </div>
          </details>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(open => !open)}
            aria-expanded={menuOpen}
            aria-label={
              menuOpen
                ? isEnglish
                  ? "Close navigation"
                  : "إغلاق قائمة التنقل"
                : isEnglish
                  ? "Open navigation"
                  : "فتح قائمة التنقل"
            }
          >
            {menuOpen ? (
              <X size={23} aria-hidden="true" />
            ) : (
              <Menu size={23} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="mobile-nav"
          aria-label={isEnglish ? "Mobile navigation" : "التنقل على الهاتف"}
        >
          {mobileLinks.map(({ label, href }) => (
            <a
              key={href}
              href={sitePath(href)}
              onClick={() => setMenuOpen(false)}
            >
              {label[language]}
            </a>
          ))}
          <button
            className="mobile-language-toggle"
            type="button"
            onClick={() => {
              setLanguage(isEnglish ? "ar" : "en");
              setMenuOpen(false);
            }}
          >
            <Globe2 size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>{isEnglish ? "العربية" : "English"}</span>
          </button>
        </nav>
      )}
    </header>
  );
}
