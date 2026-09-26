import {
  ArrowUp02Icon,
  Call02Icon,
  CopyrightIcon,
  Mail02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import familyCourtLogo from "../assets/brand/family-court-logo.png";
import type { SiteLanguage } from "../contexts/LanguageContext";
import { sitePath } from "../lib/sitePath";

type FamilyCourtFooterProps = {
  language: SiteLanguage;
};

export function FamilyCourtFooter({ language }: FamilyCourtFooterProps) {
  const isEnglish = language === "en";
  const copy = isEnglish
    ? {
        familyCourt: "Family Court",
        logoAlt: "Family Court logo",
        pageLinks: "Page links",
        home: "Home",
        services: "Court services",
        requirements: "Litigants' guide",
        about: "About the Court",
        official: "Important links",
        council: "Supreme Judicial Council",
        courtPage: "Family Court page",
        familyServices: "Family services",
        contact: "Contact information",
        unifiedNumber: "Unified number",
        email: "Email",
        rights: "All rights reserved",
        backToTop: "Back to top",
      }
    : {
        familyCourt: "محكمة الأسرة",
        logoAlt: "شعار محكمة الأسرة",
        pageLinks: "روابط الصفحة",
        home: "الرئيسية",
        services: "خدمات المحكمة",
        requirements: "دليل المتقاضين",
        about: "عن المحكمة",
        official: "روابط مهمة",
        council: "المجلس الأعلى للقضاء",
        courtPage: "صفحة محكمة الأسرة",
        familyServices: "الخدمات الأسرية",
        contact: "بيانات التواصل",
        unifiedNumber: "الرقم الموحد",
        email: "البريد الإلكتروني",
        rights: "جميع الحقوق محفوظة",
        backToTop: "العودة إلى الأعلى",
      };

  return (
    <footer className="site-footer">
      <div className="section-shell footer-main">
        <div className="footer-brand-block">
          <div className="footer-brand-lockup">
            <img
              src={familyCourtLogo}
              alt={copy.logoAlt}
              width={1448}
              height={1086}
              loading="lazy"
            />
            <div>
              <strong>{copy.familyCourt}</strong>
              <span>Family Court</span>
            </div>
          </div>
        </div>
        <nav className="footer-column footer-page-links" aria-label={copy.pageLinks}>
          <h2>{copy.pageLinks}</h2>
          <a href={sitePath("/")}>{copy.home}</a>
          <a href={sitePath("/family-services#services-view")}>{copy.services}</a>
          <a href={sitePath("/family-services#requirements-guide")}>
            {copy.requirements}
          </a>
          <a href={sitePath("/family-services#about-overview")}>{copy.about}</a>
        </nav>
        <nav className="footer-column footer-official-links" aria-label={copy.official}>
          <h2>{copy.official}</h2>
          <a href="https://www.sjc.gov.qa/ar" target="_blank" rel="noreferrer">
            {copy.council}
          </a>
          <a
            href="https://www.sjc.gov.qa/ar/Pages/CourtOfFamily.aspx"
            target="_blank"
            rel="noreferrer"
          >
            {copy.courtPage}
          </a>
          <a
            href="https://www.sjc.gov.qa/ar/Pages/family-services.aspx"
            target="_blank"
            rel="noreferrer"
          >
            {copy.familyServices}
          </a>
        </nav>
        <div className="footer-contact" aria-label={copy.contact}>
          <a className="footer-contact-item" href="tel:16007">
            <span className="footer-contact-icon">
              <HugeiconsIcon
                icon={Call02Icon}
                size={35}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </span>
            <span>
              <small>{copy.unifiedNumber}</small>
              <strong dir="ltr">16007</strong>
            </span>
          </a>
          <a className="footer-contact-item" href="mailto:info@sjc.gov.qa">
            <span className="footer-contact-icon">
              <HugeiconsIcon
                icon={Mail02Icon}
                size={35}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </span>
            <span>
              <small>{copy.email}</small>
              <strong dir="ltr">info@sjc.gov.qa</strong>
            </span>
          </a>
          <div className="footer-contact-item footer-copyright">
            <span className="footer-contact-icon">
              <HugeiconsIcon
                icon={CopyrightIcon}
                size={35}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </span>
            <span>
              <small>{copy.rights}</small>
              <strong>{copy.familyCourt}</strong>
            </span>
          </div>
        </div>
      </div>
      <a className="footer-back-to-top" href="#top" aria-label={copy.backToTop}>
        <HugeiconsIcon
          icon={ArrowUp02Icon}
          size={21}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </a>
    </footer>
  );
}
