import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import familyCourtBuildingArabic from "../assets/hero/family-court-ar.png";
import familyCourtBuildingEnglish from "../assets/hero/family-court-en.png";
import { FamilyCourtFooter } from "../components/FamilyCourtFooter";
import { ServiceGroupContent } from "../components/ServiceGroupContent";
import { SiteHeader } from "../components/SiteHeader";
import { SiteRating } from "../components/SiteRating";
import { useLanguage } from "../contexts/LanguageContext";
import {
  courtServiceGroupPaths,
  courtServiceGroups,
} from "../data/familyServices";
import { familyServiceEnglishCopy } from "../data/familyServicesEnglish";
import { familyRequirements } from "../data/familyRequirements";
import { sitePath } from "../lib/sitePath";
import "./FamilyServices.css";

type ServiceCategoryProps = {
  groupId: string;
};

type IndexBranch = "services" | "requirements";

const aboutLinks = [
  {
    id: "about-overview",
    label: { ar: "نبذة عن المحكمة", en: "Court overview" },
  },
  {
    id: "about-president",
    label: { ar: "رئيس المحكمة", en: "Court President" },
  },
  {
    id: "about-jurisdiction",
    label: { ar: "اختصاصات المحكمة", en: "Jurisdiction" },
  },
] as const;

const closingLinks = [
  {
    id: "about-strategy",
    label: { ar: "استراتيجية المحكمة", en: "Court strategy" },
  },
  {
    id: "about-location",
    label: { ar: "الموقع والتواصل", en: "Location and contact" },
  },
] as const;

const mobileLinks = [
  { label: { ar: "الرئيسية", en: "Home" }, href: "/" },
  { label: { ar: "عن المحكمة", en: "About" }, href: "/family-services" },
  {
    label: { ar: "الخدمات", en: "Services" },
    href: "/family-services#services-view",
  },
  { label: { ar: "الأسئلة الشائعة", en: "FAQs" }, href: "/#faq" },
  {
    label: { ar: "تواصل معنا", en: "Contact us" },
    href: "/family-services#about-location",
  },
] as const;

export default function ServiceCategory({ groupId }: ServiceCategoryProps) {
  const { language, direction } = useLanguage();
  const isEnglish = language === "en";
  const [openIndexBranch, setOpenIndexBranch] =
    useState<IndexBranch | null>("services");
  const group = courtServiceGroups.find(item => item.id === groupId)!;
  const groupCopy = isEnglish ? familyServiceEnglishCopy[group.id] : group;
  const copy = isEnglish
    ? {
        titleSuffix: "Family Court",
        home: "Home",
        services: "Court services",
        breadcrumb: "Breadcrumb",
        buildingAlt: "Family Court building in the State of Qatar",
        pageSections: "Page sections",
        about: "About the Court",
        servicesLabel: "Services",
        requirements: "Requirements",
      }
    : {
        titleSuffix: "محكمة الأسرة",
        home: "الرئيسية",
        services: "خدمات المحكمة",
        breadcrumb: "مسار الصفحة",
        buildingAlt: "مبنى محكمة الأسرة في دولة قطر",
        pageSections: "فهرس الصفحة",
        about: "عن المحكمة",
        servicesLabel: "الخدمات",
        requirements: "المتطلبات",
      };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${groupCopy.title} | ${copy.titleSuffix}`;
    const frame = window.requestAnimationFrame(() => {
      const anchor = window.location.hash.slice(1);
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ block: "start" });
      else window.scrollTo(0, 0);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      document.title = previousTitle;
    };
  }, [copy.titleSuffix, groupCopy.title]);

  return (
    <div id="top" className="quf-page quf-category-page" dir={direction}>
      <a className="skip-link" href="#category-content">
        {isEnglish ? "Skip to content" : "تجاوز إلى المحتوى"}
      </a>
      <SiteHeader
        brandHref="/"
        brandAriaLabel={{
          ar: "العودة إلى الصفحة الرئيسية لمحكمة الأسرة",
          en: "Return to the Family Court homepage",
        }}
        mobileLinks={mobileLinks}
      />

      <section className="quf-hero" aria-labelledby="category-page-title">
        <img
          src={
            isEnglish ? familyCourtBuildingEnglish : familyCourtBuildingArabic
          }
          alt={copy.buildingAlt}
          width={1672}
          height={941}
          fetchPriority="high"
        />
        <div className="quf-hero-shade" aria-hidden="true" />
        <div className="section-shell quf-hero-inner">
          <nav aria-label={copy.breadcrumb}>
            <a href={sitePath("/")}>{copy.home}</a>
            <i>{isEnglish ? "›" : "‹"}</i>
            <a href={sitePath("/family-services#services-view")}>
              {copy.services}
            </a>
            <i>{isEnglish ? "›" : "‹"}</i>
            <strong>{groupCopy.title}</strong>
          </nav>
          <h1 id="category-page-title">{groupCopy.title}</h1>
          <p>{groupCopy.description}</p>
        </div>
      </section>

      <main
        id="category-content"
        className="section-shell quf-shell quf-category-shell"
      >
        <nav className="quf-index" aria-label={copy.pageSections}>
          <h2>{copy.about}</h2>
          {aboutLinks.map(item => (
            <a
              className="quf-index-tab"
              key={item.id}
              href={sitePath(`/family-services#${item.id}`)}
            >
              {item.label[language]}
            </a>
          ))}

          <div className="quf-index-accordion active">
            <button
              type="button"
              aria-expanded={openIndexBranch === "services"}
              aria-controls="category-services-index-branch"
              onClick={() =>
                setOpenIndexBranch(current =>
                  current === "services" ? null : "services"
                )
              }
            >
              <span>{copy.servicesLabel}</span>
              <HugeiconsIcon
                className="quf-index-chevron"
                icon={ArrowDown01Icon}
                size={22}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
            <div
              className="quf-index-collapse"
              data-expanded={openIndexBranch === "services"}
              aria-hidden={openIndexBranch !== "services"}
            >
              <div className="quf-index-collapse-inner">
                <div
                  id="category-services-index-branch"
                  className="quf-index-branch"
                >
                  {courtServiceGroups.map(item => (
                    <a
                      className={item.id === group.id ? "active" : undefined}
                      aria-current={item.id === group.id ? "page" : undefined}
                      href={sitePath(courtServiceGroupPaths[item.id])}
                      key={item.id}
                    >
                      {isEnglish
                        ? familyServiceEnglishCopy[item.id].title
                        : item.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="quf-index-accordion">
            <button
              type="button"
              aria-expanded={openIndexBranch === "requirements"}
              aria-controls="category-requirements-index-branch"
              onClick={() =>
                setOpenIndexBranch(current =>
                  current === "requirements" ? null : "requirements"
                )
              }
            >
              <span>{copy.requirements}</span>
              <HugeiconsIcon
                className="quf-index-chevron"
                icon={ArrowDown01Icon}
                size={22}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
            <div
              className="quf-index-collapse"
              data-expanded={openIndexBranch === "requirements"}
              aria-hidden={openIndexBranch !== "requirements"}
            >
              <div className="quf-index-collapse-inner">
                <div
                  id="category-requirements-index-branch"
                  className="quf-index-branch"
                >
                  {familyRequirements.map(item => (
                    <a
                      key={item.id}
                      href={sitePath(`/family-services#${item.id}`)}
                    >
                      {isEnglish ? item.titleEn : item.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {closingLinks.map(item => (
            <a
              className="quf-index-tab"
              key={item.id}
              href={sitePath(`/family-services#${item.id}`)}
            >
              {item.label[language]}
            </a>
          ))}
        </nav>

        <div className="quf-main">
          <section
            className="quf-category-content"
            aria-labelledby="category-services-heading"
          >
            <header>
              <h2 id="category-services-heading">{groupCopy.title}</h2>
            </header>
            <ServiceGroupContent group={group} language={language} />
          </section>
        </div>
      </main>

      <SiteRating language={language} />
      <FamilyCourtFooter language={language} />
    </div>
  );
}
