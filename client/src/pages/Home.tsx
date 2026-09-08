/**
 * Design reminder - «الرواق القطري»: a calm, dignified Arabic public-service journey.
 * Use directional hierarchy, warm civic materials, asymmetric space, and no fabricated operational statistics.
 */
import { useEffect, useState } from "react";
import {
  Add01Icon,
  ArrowLeft02Icon,
  Call02Icon,
  CopyrightIcon,
  Mail02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  FileText,
  Printer,
  Share2,
} from "lucide-react";
import { CourtPerformance } from "../components/CourtPerformance";
import { FamilyCourtHighlights } from "../components/FamilyCourtHighlights";
import { LatestNews } from "../components/LatestNews";
import { SiteHeader } from "../components/SiteHeader";
import { SiteRating } from "../components/SiteRating";
import { useLanguage } from "../contexts/LanguageContext";
import { familyRequirements } from "../data/familyRequirements";
import { sitePath } from "../lib/sitePath";
import familyCourtLogo from "../../../qatar-family-court-ar-assets/family-court-header-logo_ef716b29.png";
import guidanceIllustration from "../../../qatar-family-court-ar-assets/qfc-guidance-illustration.png";
import portalPattern from "../../../qatar-family-court-ar-assets/qfc-portal-pattern.png";
import heroPhotoArabic from "../../../qatar-family-court-ar-assets/qatar-family-court-hero-left-expanded-flag-fixed.png";
import heroPhotoEnglish from "../../../qatar-family-court-ar-assets/qatar-family-court-hero-right-expanded-flag-fixed.png";

const homeCopy = {
  ar: {
    skip: "تجاوز إلى المحتوى",
    brandLabel: "العودة إلى بداية صفحة محكمة الأسرة",
    heroKicker: "المجلس الأعلى للقضاء",
    heroTitle: (
      <>
        محكمة الأسرة
        <br />
        <em>في دولة قطر</em>
      </>
    ),
    heroText:
      "صفحة تعريفية تسلط الضوء على محكمة الأسرة واختصاصاتها ضمن المنظومة القضائية، وتوفر روابط مباشرة إلى المصادر والخدمات الرسمية.",
    heroPrimary: "تعرّف على محكمة الأسرة",
    share: "مشاركة الصفحة",
    reassurance: "نبذة تعريفية وروابط مباشرة إلى المصادر الرسمية.",
    caption: "مبنى محكمة الأسرة · دولة قطر",
    aboutEyebrow: "عن المحكمة",
    aboutTitle: (
      <>
        قضاءٌ منظم،
        <br />
        ومؤسسات تخدم العدالة.
      </>
    ),
    aboutText:
      "تختص محكمة الأسرة بالفصل في الدعاوى والمنازعات المتعلقة بمسائل الأسرة والتركات، من خلال دوائر قضائية متخصصة تعمل على تنظيم الإجراءات وتيسير وصول المتقاضين إلى الخدمات والمعلومات المرتبطة بقضايا الأسرة.",
    aboutAction: "تعرّف على اختصاصات المحكمة",
    courtServices: "خدمات المحكمة",
    requirementsTitle: ["دليل", "المتطلبات"],
    requirementsLead: "جهّز مستنداتك قبل تقديم الطلب",
    requirementsLabel: "فئات دليل المتطلبات",
    requirementsAction: "عرض الدليل الرسمي",
    legalEyebrow: "الإطار التشريعي المتصل",
    legalTitle: "قانون الأسرة رقم (22) لسنة 2006",
    legalText:
      "يعرض قانون الأسرة المنشور في بوابة الميزان موضوعات عقد الزواج والنفقات والفرقة بين الزوجين والحضانة والوصية والإرث ضمن إطار تشريعي متصل بعمل محكمة الأسرة.",
    legalAction: "فتح النص القانوني",
    strategyEyebrow: "استراتيجية المجلس الأعلى للقضاء 2025-2030",
    strategyTitle: "عدالة أكثر كفاءة وقرباً من الأسرة.",
    strategyItems: [
      [
        "العدالة الرقمية:",
        " تبسيط الخدمات القضائية وتطوير الوصول الإلكتروني إليها.",
      ],
      ["العدالة التصالحية:", " تفعيل بدائل التقاضي والوساطة والتصالح."],
      [
        "تعزيز التماسك الأسري:",
        " دعم الحلول التي تحد من آثار النزاعات الأسرية.",
      ],
    ],
    strategyAction: "قراءة خبر الاستراتيجية الرسمي",
    strategyVisualLabel: "تفصيل بصري عن استراتيجية المجلس الأعلى للقضاء",
    strategyImageAlt: "رسم مائي لعائلة قطرية في جلسة إرشاد أسري",
    strategyCardTitle: "استراتيجية 2025-2030",
    strategyCardText: "تسعة محاور لتطوير منظومة عدالة تخصصية ومبتكرة وموثوقة.",
    faqEyebrow: "معلومات مؤسسية",
    faqTitle: "أسئلة عن محكمة الأسرة",
    faqs: [
      [
        "ما هي محكمة الأسرة؟",
        "هي محكمة تنظر، وفق الصفحة الرسمية للمجلس الأعلى للقضاء، في الدعاوى والمنازعات المتعلقة بمسائل الأسرة والتركات من خلال دوائر في المحكمة الابتدائية ومحكمة الاستئناف.",
      ],
      [
        "كيف تظهر محكمة الأسرة في الهيكل القضائي؟",
        "تتضمن البنية المنشورة محكمة أسرة جزئية يمكن أن تتشكل من قاضٍ فرد، ومحكمة أسرة كلية يمكن أن تتشكل من ثلاثة قضاة، بحسب الدعاوى والمنازعات المحددة.",
      ],
      [
        "أين أجد المصادر الرسمية للمحكمة؟",
        "توفر صفحة محكمة الأسرة والخدمات الأسرية المنشورة ضمن البوابة القضائية معلومات رسمية عن الهيكل العام والخدمات المرتبطة بها.",
      ],
    ],
    footerIntro:
      "دليل تعريفي للوصول إلى اختصاصات المحكمة وخدماتها ومصادرها الرسمية.",
    pageLinks: "روابط الصفحة",
    officialSources: "المصادر الرسمية",
    pageTools: "أدوات الصفحة",
    home: "الرئيسية",
    services: "خدمات المحكمة",
    requirements: "دليل المتطلبات",
    about: "عن المحكمة",
    council: "المجلس الأعلى للقضاء",
    courtPage: "صفحة محكمة الأسرة",
    familyServices: "الخدمات الأسرية",
    print: "حفظ / طباعة",
    disclaimer: "الموقع الرسمي لمحكمة الأسرة في دولة قطر. جميع الحقوق محفوظة.",
    backToTop: "العودة إلى الأعلى",
  },
  en: {
    skip: "Skip to content",
    brandLabel: "Return to the Family Court homepage",
    heroKicker: "Supreme Judiciary Council",
    heroTitle: (
      <>
        Family Court
        <br />
        <em>in the State of Qatar</em>
      </>
    ),
    heroText:
      "An introductory guide to the Family Court, its place within Qatar’s judicial system, and direct access to official sources and services.",
    heroPrimary: "Explore the Family Court",
    share: "Share page",
    reassurance: "Clear guidance with direct links to official sources.",
    caption: "Family Court building · State of Qatar",
    aboutEyebrow: "About the Court",
    aboutTitle: (
      <>
        Structured justice,
        <br />
        institutions that serve fairness.
      </>
    ),
    aboutText:
      "The Family Court hears cases and disputes concerning family and inheritance matters through specialised judicial circuits that organise procedures and make related Court services and information easier to access.",
    aboutAction: "Explore the Court's jurisdiction",
    courtServices: "Court services",
    requirementsTitle: ["Requirements", "guide"],
    requirementsLead: "Prepare your documents before submitting a request",
    requirementsLabel: "Requirements guide categories",
    requirementsAction: "View official guide",
    legalEyebrow: "Related legal framework",
    legalTitle: "Family Law No. 22 of 2006",
    legalText:
      "The Family Law published through Al Meezan covers marriage contracts, maintenance, separation, custody, wills and inheritance within the legal framework connected to the Family Court.",
    legalAction: "Open the law",
    strategyEyebrow: "Supreme Judiciary Council Strategy 2025-2030",
    strategyTitle: "Justice that is more efficient and closer to families.",
    strategyItems: [
      [
        "Digital justice:",
        " simplifying judicial services and improving online access.",
      ],
      [
        "Restorative justice:",
        " expanding alternatives to litigation, mediation and settlement.",
      ],
      [
        "Stronger family cohesion:",
        " supporting solutions that reduce the effects of family disputes.",
      ],
    ],
    strategyAction: "Read the official strategy news",
    strategyVisualLabel:
      "Visual overview of the Supreme Judiciary Council strategy",
    strategyImageAlt:
      "Watercolour illustration of a Qatari family in a guidance session",
    strategyCardTitle: "Strategy 2025-2030",
    strategyCardText:
      "Nine pillars for a specialised, innovative and trusted justice system.",
    faqEyebrow: "Institutional information",
    faqTitle: "Questions about the Family Court",
    faqs: [
      [
        "What is the Family Court?",
        "According to the Supreme Judiciary Council, the Court hears cases and disputes relating to family and inheritance matters through circuits in the Court of First Instance and the Court of Appeal.",
      ],
      [
        "Where does the Family Court sit in the judicial structure?",
        "The published structure includes a summary Family Court circuit that may be formed by a single judge and a plenary circuit that may be formed by three judges, depending on the case.",
      ],
      [
        "Where can I find official court information?",
        "The Supreme Judiciary Council’s Family Court and family services pages provide official information about the judicial structure and connected services.",
      ],
    ],
    footerIntro:
      "An introductory guide to the Court’s jurisdiction, services and official sources.",
    pageLinks: "Page links",
    officialSources: "Official sources",
    pageTools: "Page tools",
    home: "Home",
    services: "Court services",
    requirements: "Requirements guide",
    about: "About the Court",
    council: "Supreme Judiciary Council",
    courtPage: "Family Court page",
    familyServices: "Family services",
    print: "Save / print",
    disclaimer:
      "The official website of the Family Court in the State of Qatar. All rights reserved.",
    backToTop: "Back to top",
  },
} as const;

export default function Home() {
  const { language, direction } = useLanguage();
  const copy = homeCopy[language];
  const isEnglish = language === "en";
  const [openRequirements, setOpenRequirements] = useState<Set<string>>(
    () => new Set([familyRequirements[0].id])
  );

  useEffect(() => {
    document.title = isEnglish
      ? "Qatar Family Court"
      : "محكمة الأسرة في دولة قطر";
  }, [isEnglish]);

  const sharePage = async () => {
    const shareData = {
      title: isEnglish ? "Family Court" : "محكمة الأسرة",
      text: copy.heroText,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      /* The browser handles cancelled sharing or unavailable clipboard access quietly. */
    }
  };

  return (
    <div
      id="top"
      className="qfc-page min-h-screen bg-[#f7f3ec] text-[#1e2f32]"
      dir={direction}
    >
      <a className="skip-link" href="#content">
        {copy.skip}
      </a>
      <SiteHeader
        brandHref="#top"
        brandAriaLabel={{
          ar: "العودة إلى بداية صفحة محكمة الأسرة",
          en: "Return to the Family Court homepage",
        }}
        mobileLinks={[
          { label: { ar: "الرئيسية", en: "Home" }, href: "#top" },
          { label: { ar: "عن المحكمة", en: "About" }, href: "#about" },
          {
            label: { ar: "الخدمات", en: "Services" },
            href: "/family-services#services-view",
          },
          { label: { ar: "الأسئلة الشائعة", en: "FAQs" }, href: "#faq" },
          {
            label: { ar: "تواصل معنا", en: "Contact us" },
            href: "/family-services#about-location",
          },
        ]}
      />

      <main id="content">
        <section className="hero-section" aria-labelledby="hero-title">
          <img
            className="hero-photo"
            src={isEnglish ? heroPhotoEnglish : heroPhotoArabic}
            alt={
              isEnglish
                ? "Family Court building in the State of Qatar"
                : "مبنى محكمة الأسرة في دولة قطر"
            }
            width={1672}
            height={941}
            fetchPriority="high"
          />
          <div className="hero-overlay" />
          <div className="hero-shell">
            <div className="hero-copy">
              <p className="hero-kicker">{copy.heroKicker}</p>
              <h1 id="hero-title">{copy.heroTitle}</h1>
              <p>{copy.heroText}</p>
              <div className="hero-buttons">
                <a className="primary-button" href="#about">
                  {copy.heroPrimary}{" "}
                  {isEnglish ? (
                    <ArrowRight size={19} aria-hidden="true" />
                  ) : (
                    <ArrowLeft size={19} aria-hidden="true" />
                  )}
                </a>
                <button className="quiet-button" onClick={sharePage}>
                  <Share2 size={17} /> {copy.share}
                </button>
              </div>
              <div className="hero-reassurance">
                <Check size={17} />
                <span>{copy.reassurance}</span>
              </div>
            </div>
          </div>
          <div className="hero-caption">{copy.caption}</div>
        </section>

        <section
          id="about"
          className="intro-section section-shell"
          aria-labelledby="intro-title"
        >
          <div className="section-number" aria-hidden="true" />
          <div className="intro-title-block">
            <p className="eyebrow">{copy.aboutEyebrow}</p>
            <h2 id="intro-title">{copy.aboutTitle}</h2>
          </div>
          <div className="intro-body">
            <p>{copy.aboutText}</p>
            <a
              href={sitePath("/family-services#about-jurisdiction")}
              className="inline-link"
            >
              {copy.aboutAction}{" "}
              {isEnglish ? (
                <ArrowRight size={18} aria-hidden="true" />
              ) : (
                <ArrowLeft size={18} aria-hidden="true" />
              )}
            </a>
          </div>
        </section>

        <div
          id="journey"
          className="route-threshold route-to-journey"
          aria-hidden="true"
        >
          <span>{copy.courtServices}</span>
        </div>

        <FamilyCourtHighlights />

        <section
          id="requirements"
          className="requirements-overview"
          aria-labelledby="requirements-title"
        >
          <div className="requirements-overview-inner section-shell">
            <header className="requirements-overview-header">
              <div>
                <h2 id="requirements-title">
                  <span className="requirements-overview-title-line">
                    {copy.requirementsTitle[0]}
                  </span>
                  <span className="requirements-overview-title-line">
                    {copy.requirementsTitle[1]}
                  </span>
                </h2>
                <p className="requirements-overview-lead">
                  {copy.requirementsLead}
                </p>
              </div>
            </header>
            <div
              className="requirements-overview-list"
              role="group"
              aria-label={copy.requirementsLabel}
            >
              {familyRequirements.map(item => {
                const expanded = openRequirements.has(item.id);
                return (
                  <section
                    className="requirements-accordion-item"
                    key={item.id}
                  >
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`home-${item.id}-body`}
                      onClick={() =>
                        setOpenRequirements(current =>
                          current.has(item.id) ? new Set() : new Set([item.id])
                        )
                      }
                    >
                      <span className="requirements-overview-row-copy">
                        <strong>{isEnglish ? item.titleEn : item.title}</strong>
                      </span>
                      <HugeiconsIcon
                        className="requirements-overview-arrow requirements-overview-plus"
                        icon={Add01Icon}
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id={`home-${item.id}-body`}
                      className="requirements-accordion-collapse"
                      data-expanded={expanded}
                      aria-hidden={!expanded}
                    >
                      <div className="requirements-accordion-collapse-inner">
                        <div className="requirements-accordion-body">
                          <ul>
                            {(isEnglish ? item.itemsEn : item.items).map(
                              text => (
                                <li key={text}>
                                  <span className="requirements-accordion-check">
                                    <HugeiconsIcon
                                      icon={Tick02Icon}
                                      size={14}
                                      strokeWidth={2}
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <span>{text}</span>
                                </li>
                              )
                            )}
                          </ul>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={expanded ? 0 : -1}
                          >
                            <span>{copy.requirementsAction}</span>
                            {isEnglish ? (
                              <ArrowRight
                                size={16}
                                strokeWidth={1.8}
                                aria-hidden="true"
                              />
                            ) : (
                              <HugeiconsIcon
                                icon={ArrowLeft02Icon}
                                size={16}
                                strokeWidth={1.8}
                                aria-hidden="true"
                              />
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <LatestNews />

        <CourtPerformance />

        <section
          id="legal-framework"
          className="legal-band"
          aria-labelledby="law-title"
        >
          <img
            className="legal-pattern"
            src={portalPattern}
            alt=""
            aria-hidden="true"
            width={2560}
            height={1440}
            loading="lazy"
          />
          <div className="section-shell legal-content">
            <div>
              <p className="eyebrow">{copy.legalEyebrow}</p>
              <h2 id="law-title">{copy.legalTitle}</h2>
              <p>{copy.legalText}</p>
            </div>
            <a
              className="outline-button"
              href="https://www.almeezan.qa/LawView.aspx?LawID=2558"
              target="_blank"
              rel="noreferrer"
            >
              {copy.legalAction}{" "}
              {isEnglish ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowUpLeft size={18} />
              )}
            </a>
          </div>
        </section>

        <section
          id="digital-services"
          className="guidance-section section-shell"
          aria-labelledby="guidance-title"
        >
          <div className="guidance-copy">
            <p className="eyebrow">{copy.strategyEyebrow}</p>
            <h2 id="guidance-title">{copy.strategyTitle}</h2>
            <ol>
              {copy.strategyItems.map(([title, text], index) => (
                <li key={title}>
                  <span>{index + 1}</span>
                  <div>
                    <strong>{title}</strong>
                    {text}
                  </div>
                </li>
              ))}
            </ol>
            <a
              className="inline-link"
              href="https://www.sjc.gov.qa/ar/News/Pages/%D8%A8%D8%AF%D8%A1-%D8%AA%D8%B4%D8%BA%D9%8A%D9%84-%D9%88%D8%AA%D9%86%D9%81%D9%8A%D8%B0-%D8%AE%D8%B7%D8%B7-%D9%88%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%D8%B9-%D8%B9%D8%A7%D9%85-2026-%D8%B6%D9%85%D9%86-%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A%D8%A9-%D8%A7%D9%84%D9%85%D8%AC%D9%84%D8%B3-%D8%A7%D9%84%D8%A3%D8%B9%D9%84%D9%89-%D9%84%D9%84%D9%82%D8%B6%D8%A7%D8%A1-2025-2030.aspx"
              target="_blank"
              rel="noreferrer"
            >
              {copy.strategyAction}{" "}
              {isEnglish ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowUpLeft size={18} />
              )}
            </a>
          </div>
          <div
            className="guidance-architecture"
            aria-label={copy.strategyVisualLabel}
          >
            <img
              src={guidanceIllustration}
              alt={copy.strategyImageAlt}
              width={2304}
              height={1536}
              loading="lazy"
            />
            <div>
              <FileText size={25} />
              <strong>{copy.strategyCardTitle}</strong>
              <span>{copy.strategyCardText}</span>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="faq-section section-shell"
          aria-labelledby="faq-title"
        >
          <div>
            <p className="eyebrow">{copy.faqEyebrow}</p>
            <h2 id="faq-title">{copy.faqTitle}</h2>
          </div>
          <div className="faq-list">
            {copy.faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0 ? true : undefined}>
                <summary>
                  {question} <ChevronDown size={19} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteRating language={language} />

      <footer id="sources" className="site-footer">
        <div className="section-shell footer-main">
          <div className="footer-brand-block">
            <div className="footer-brand-lockup">
              <img
                src={familyCourtLogo}
                alt={isEnglish ? "Family Court logo" : "شعار محكمة الأسرة"}
                width={1448}
                height={1086}
                loading="lazy"
              />
              <div>
                <strong>محكمة الأسرة</strong>
                <span>Family Court</span>
              </div>
            </div>
          </div>

          <nav
            className="footer-column footer-page-links"
            aria-label={isEnglish ? "Page links" : "روابط الصفحة"}
          >
            <h2>{copy.pageLinks}</h2>
            <a href="#top">{copy.home}</a>
            <a href="#services">{copy.services}</a>
            <a href="#requirements">{copy.requirements}</a>
            <a href="#faq">{copy.about}</a>
          </nav>

          <nav
            className="footer-column footer-official-links"
            aria-label={isEnglish ? "Official sources" : "المصادر الرسمية"}
          >
            <h2>{copy.officialSources}</h2>
            <a
              href="https://www.sjc.gov.qa/ar"
              target="_blank"
              rel="noreferrer"
            >
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

          <div
            className="footer-contact"
            aria-label={isEnglish ? "Contact information" : "بيانات التواصل"}
          >
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
                <small>{isEnglish ? "Unified number" : "الرقم الموحد"}</small>
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
                <small>{isEnglish ? "Email" : "البريد الإلكتروني"}</small>
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
                <small>
                  {isEnglish ? "All rights reserved" : "جميع الحقوق محفوظة"}
                </small>
                <strong>{isEnglish ? "Family Court" : "محكمة الأسرة"}</strong>
              </span>
            </div>
          </div>
        </div>
        <a
          className="footer-back-to-top"
          href="#top"
          aria-label={copy.backToTop}
        >
          <ArrowUp size={21} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
