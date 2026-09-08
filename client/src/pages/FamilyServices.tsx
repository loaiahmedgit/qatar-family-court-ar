import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowUp02Icon,
  Call02Icon,
  CopyrightIcon,
  Mail02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteRating } from "../components/SiteRating";
import { useLanguage } from "../contexts/LanguageContext";
import { courtServiceGroups } from "../data/familyServices";
import { familyServiceEnglishCopy } from "../data/familyServicesEnglish";
import { familyRequirements } from "../data/familyRequirements";
import { sitePath } from "../lib/sitePath";
import familyCourtLogo from "../assets/brand/family-court-logo.png";
import familyCourtBuildingArabic from "../assets/hero/family-court-ar.png";
import familyCourtBuildingEnglish from "../assets/hero/family-court-en.png";
import "./FamilyServices.css";

const mobileLinks = [
  { label: { ar: "الرئيسية", en: "Home" }, href: "/" },
  { label: { ar: "عن المحكمة", en: "About" }, href: "/#about" },
  { label: { ar: "الخدمات", en: "Services" }, href: "#services-view" },
  { label: { ar: "الأسئلة الشائعة", en: "FAQs" }, href: "/#faq" },
  {
    label: { ar: "تواصل معنا", en: "Contact us" },
    href: "/family-services#about-location",
  },
] as const;

const serviceGroupIconImages: Record<string, string> = {
  "litigation-services": "/images/highlights/litigation-gavel.png",
  "family-documentation": "/images/highlights/family-documentation.png",
  "family-reconciliation": "/images/highlights/family-reconciliation.png",
  "copies-documents": "/images/highlights/copies-documents.png",
};

type AboutView =
  | "overview"
  | "president"
  | "jurisdiction"
  | "strategy"
  | "location";
type GuideView = AboutView | "requirements" | "services";
type BranchView = Extract<GuideView, "requirements" | "services">;

const aboutSectionsBeforeBranches = [
  {
    id: "about-overview",
    view: "overview",
    label: { ar: "نبذة عن المحكمة", en: "Court overview" },
  },
  {
    id: "about-president",
    view: "president",
    label: { ar: "رئيس المحكمة", en: "Court President" },
  },
  {
    id: "about-jurisdiction",
    view: "jurisdiction",
    label: { ar: "اختصاصات المحكمة", en: "Jurisdiction" },
  },
] as const;

const aboutSectionsAfterBranches = [
  {
    id: "about-strategy",
    view: "strategy",
    label: { ar: "استراتيجية المحكمة", en: "Court strategy" },
  },
  {
    id: "about-location",
    view: "location",
    label: { ar: "الموقع والتواصل", en: "Location and contact" },
  },
] as const;

const aboutSections = [
  ...aboutSectionsBeforeBranches,
  ...aboutSectionsAfterBranches,
] as const;

const aboutAnchorByView: Record<AboutView, string> = {
  overview: "about-overview",
  president: "about-president",
  jurisdiction: "about-jurisdiction",
  strategy: "about-strategy",
  location: "about-location",
};

const viewFromHash = (hash: string): GuideView => {
  if (
    hash === "services-view" ||
    courtServiceGroups.some(({ id }) => id === hash)
  )
    return "services";
  if (
    hash === "requirements-guide" ||
    familyRequirements.some(({ id }) => id === hash)
  )
    return "requirements";
  if (hash === "about-court") return "overview";
  return aboutSections.find(({ id }) => id === hash)?.view ?? "requirements";
};

const officialLinks = {
  map: "https://www.google.com/maps/search/?api=1&query=25.2800622%2C51.4932875",
  mapEmbed:
    "https://www.google.com/maps?q=25.2800622%2C51.4932875&z=17&output=embed",
} as const;

const pageCopy = {
  ar: {
    title: "عن محكمة الأسرة | دولة قطر",
    shareText: "صفحة تعريفية عن محكمة الأسرة في دولة قطر",
    skip: "تجاوز إلى المحتوى",
    brandLabel: "العودة إلى الصفحة الرئيسية لمحكمة الأسرة",
    buildingAlt: "مبنى محكمة الأسرة في دولة قطر",
    home: "الرئيسية",
    courtServices: "خدمات المحكمة",
    pageName: "عن محكمة الأسرة",
    heroText:
      "تعرّف على محكمة الأسرة ودورها واختصاصاتها ضمن المنظومة القضائية في دولة قطر.",
    breadcrumb: "مسار الصفحة",
    pageSections: "أقسام الصفحة",
    about: "عن المحكمة",
    aboutTitle: "عن محكمة الأسرة",
    aboutIntro:
      "تعرف على دور المحكمة وقيادتها واختصاصاتها واستراتيجيتها وموقعها.",
    overviewTitle: "نبذة عن محكمة الأسرة",
    overviewText:
      "صدر قانون الأسرة رقم (22) لسنة 2006، ونص على أن تتولى دائرة أو أكثر في المحكمة الابتدائية ومحكمة الاستئناف الفصل في الدعاوى والمنازعات المتعلقة بمسائل الأسرة والتركات، وتسمى هذه الدوائر محكمة الأسرة. كما أجاز أن تُشكّل محكمة الأسرة في المحكمة الابتدائية من قاضٍ فرد للفصل في المنازعات التي يحددها المجلس الأعلى للقضاء.",
    overviewStructureText:
      "وبموجب قرار المجلس رقم (23) لسنة 2006، سُمّيت الدائرة المشكلة من قاضٍ فرد محكمة الأسرة الجزئية، وسُمّيت الدائرة المشكلة من ثلاثة قضاة محكمة الأسرة الكلية. وكانت هذه المنازعات تندرج ضمن قضايا الأحوال الشخصية، ثم أفردها قانون الأسرة لاختصاص محكمة الأسرة، بينما بقيت منازعات الأحوال الشخصية الأخرى من اختصاص المحكمة الكلية.",
    presidentTitle: "رئيس محكمة الأسرة",
    presidentName: "سعادة القاضي حارب راشد المهندي",
    presidentRole: "رئيس محكمة الأسرة",
    presidentPhotoAlt: "سعادة القاضي حارب راشد المهندي، رئيس محكمة الأسرة",
    presidentText:
      "يتولى سعادة القاضي حارب راشد المهندي رئاسة محكمة الأسرة، مستندًا إلى مسيرة قضائية ممتدة منذ تعيينه قاضيًا بالمحكمة الابتدائية عام 2008.",
    presidentBiographyTitle: "نبذة مهنية",
    presidentBiography: [
      "بدأ سعادته مسيرته القضائية بتعيينه قاضيًا بالمحكمة الابتدائية عام 2008، ثم عُيّن رئيسًا بالمحكمة الابتدائية عام 2013.",
      "وخلال مسيرته، ترأس لجنة فض المنازعات الإدارية الناشئة عن تطبيق قانون تنظيم المناقصات والمزايدات، كما ترأس إحدى لجان فض المنازعات الإيجارية، بما أضاف إلى خبرته في إدارة المنازعات المتخصصة.",
      "وفي عام 2019 عُيّن قاضيًا بمحكمة الاستئناف بأقدمية من 24 فبراير 2019، ثم عُيّن نائبًا لرئيس محكمة الاستئناف بأقدمية من 24 فبراير 2025، إلى جانب توليه رئاسة محكمة الأسرة.",
    ],
    presidentRoleTitle: "رئاسة محكمة الأسرة",
    presidentRoleText:
      "يتابع سعادته سير العمل القضائي والإجرائي بالمحكمة، وتيسير الفصل في المنازعات الأسرية، وتطوير الخدمات المقدمة للمتقاضين.",
    jurisdictionTitle: "اختصاصات المحكمة",
    jurisdictionIntro:
      "تختص محكمة الأسرة بالفصل في الدعاوى والمنازعات المتعلقة بمسائل الأسرة والتركات وفقًا لقانون الأسرة والقوانين ذات الصلة، من خلال دوائر قضائية متخصصة تراعي طبيعة النزاع ودرجته.",
    jurisdictionSections: [
      {
        title: "المنازعات الأسرية",
        text: "تنظر المحكمة في المنازعات الناشئة عن الزواج وآثاره وانحلاله، وما يرتبط بها من نفقة وحضانة ورؤية ونسب، إلى جانب المسائل الأسرية الأخرى التي يحددها القانون.",
      },
      {
        title: "التركات وشؤون القاصرين",
        text: "يشمل اختصاص المحكمة المنازعات المتعلقة بالتركات وحقوق الورثة، كما تنظر الدائرة المختصة في الدعاوى المرتبطة بشؤون القاصرين وفقًا لقواعد الاختصاص المقررة قانونًا.",
      },
      {
        title: "دوائر المحكمة ودرجات التقاضي",
        text: "تتولى محكمة الأسرة الجزئية، المشكلة من قاضٍ فرد، الدعاوى التي يحددها المجلس الأعلى للقضاء، بينما تنظر محكمة الأسرة الكلية، المشكلة من ثلاثة قضاة، الدعاوى الداخلة في اختصاصها. وتُنظر الطعون أمام دوائر الأسرة بمحكمة الاستئناف.",
      },
      {
        title: "الأوامر الوقتية والتنفيذ",
        text: "تصدر الأوامر الوقتية المتعلقة بمسائل الأسرة وفقًا للقانون، ويتولى قضاة التنفيذ الإشراف على تنفيذ الأحكام والفصل في منازعات التنفيذ الموضوعية والوقتية وإصدار القرارات والأوامر المرتبطة بها.",
      },
    ],
    strategyTitle: "استراتيجية المحكمة",
    strategyIntro:
      "تعمل محكمة الأسرة ضمن إطار استراتيجية المجلس الأعلى للقضاء للفترة من 2025 إلى 2030، وتوجّه جهودها نحو قضاء أسري متخصص وموثوق يحقق العدالة الناجزة، ويحفظ الحقوق، ويسهم في تعزيز التماسك الأسري.",
    strategyVisionTitle: "الرؤية",
    strategyVisionText:
      "قضاء أسري متخصص وموثوق، يرسخ سيادة القانون، ويضمن الوصول إلى عدالة ناجزة تراعي طبيعة المنازعات الأسرية وخصوصيتها.",
    strategyMissionTitle: "الرسالة",
    strategyMissionText:
      "توفير بيئة قضائية داعمة ومتطورة تقنيًا، تطبق أفضل الممارسات في إجراءات التقاضي وبدائل تسوية المنازعات، وتقدم خدمات واضحة وميسرة للمتقاضين.",
    strategyPrioritiesTitle: "الأولويات الاستراتيجية",
    strategyPriorities: [
      {
        title: "كفاءة الفصل في الدعاوى",
        text: "تطوير إجراءات العمل ورفع كفاءة إدارة الدعاوى بما يدعم سرعة الفصل ويحافظ على جودة الأحكام وضمانات التقاضي.",
      },
      {
        title: "التماسك الأسري والعدالة التصالحية",
        text: "دعم الحلول الرضائية والوساطة والتصالح متى أجاز القانون ذلك، مع مراعاة مصلحة الأسرة والأطفال وحماية حقوق جميع الأطراف.",
      },
      {
        title: "العدالة الرقمية",
        text: "توسيع الخدمات الإلكترونية وتبسيط رحلة المتقاضي، وتحسين الوصول إلى المعلومات والإجراءات القضائية بصورة آمنة وموثوقة.",
      },
      {
        title: "الحوكمة وجودة الخدمات",
        text: "تعزيز الشفافية وقياس الأداء وتوحيد الإجراءات، وتطوير تجربة المراجعين بما يرسخ الثقة في منظومة العدالة الأسرية.",
      },
    ],
    locationTitle: "الموقع والتواصل",
    locationLabel: "المقر",
    locationValue: "مبنى السد، الدوحة، قطر",
    workingHoursLabel: "أوقات استقبال المراجعين",
    workingDays: "الأحد إلى الخميس",
    workingHours: "7:30 صباحًا - 1:30 ظهرًا",
    workingHoursNote: "قد تتغير المواعيد خلال العطلات الرسمية.",
    callCenterLabel: "مركز الاتصال الموحد لخدمات المجلس",
    callCenterValue: "16007 / 109",
    emailLabel: "البريد الإلكتروني",
    emailValue: "info@sjc.gov.qa",
    mapTitle: "موقع محكمة الأسرة",
    mapDescription: "محكمة الأسرة، مبنى السد، الدوحة",
    openMap: "فتح الموقع على الخريطة",
    contactFormTitle: "التواصل عبر البريد الإلكتروني",
    contactFormIntro:
      "اكتب بياناتك واستفسارك، وسنجهز الرسالة لإرسالها إلى بريد التواصل الرسمي.",
    contactDetailsTitle: "بيانات التواصل ومواعيد الزيارة",
    contactNameLabel: "الاسم الكامل",
    contactNamePlaceholder: "اكتب الاسم الكامل…",
    contactEmailLabel: "البريد الإلكتروني",
    contactEmailPlaceholder: "name@example.com",
    contactSubjectLabel: "موضوع الرسالة",
    contactSubjectPlaceholder: "اكتب موضوع الاستفسار…",
    contactMessageLabel: "نص الرسالة",
    contactMessagePlaceholder: "اكتب تفاصيل استفسارك…",
    contactSubmit: "إرسال عبر البريد",
    contactMailNotice: "عند الضغط على الإرسال سيفتح تطبيق البريد على جهازك.",
    contactEmailSubject: "استفسار عبر موقع محكمة الأسرة",
    services: "الخدمات",
    requirements: "المتطلبات",
    requirementsGuide: "دليل المتطلبات",
    requirementsIntro:
      "تعرّف على المستندات والمتطلبات اللازمة لكل إجراء في محكمة الأسرة.",
    officialGuide: "عرض الدليل الرسمي",
    servicesTitle: "خدمات المحكمة",
    servicesIntro:
      "اختر فئة الخدمات، ثم انتقل مباشرة إلى الخدمة المطلوبة في بوابتها الرسمية.",
    pageLinks: "روابط الصفحة",
    officialSources: "روابط مهمة",
    pageTools: "أدوات الصفحة",
    familyCourt: "محكمة الأسرة",
    footerIntro: "دليل تعريفي للوصول إلى اختصاصات المحكمة وخدماتها.",
    council: "المجلس الأعلى للقضاء",
    courtPage: "صفحة محكمة الأسرة",
    familyServices: "الخدمات الأسرية",
    share: "مشاركة الصفحة",
    print: "حفظ / طباعة",
    disclaimer: "الموقع الرسمي لمحكمة الأسرة في دولة قطر. جميع الحقوق محفوظة.",
    backToTop: "العودة إلى الأعلى",
  },
  en: {
    title: "About the Family Court | State of Qatar",
    shareText: "An introduction to the Family Court in the State of Qatar",
    skip: "Skip to content",
    brandLabel: "Return to the Family Court homepage",
    buildingAlt: "Family Court building in the State of Qatar",
    home: "Home",
    courtServices: "Court services",
    pageName: "About the Family Court",
    heroText:
      "Learn about the Family Court, its role and jurisdiction within Qatar’s judicial system, and the information and services available to court users.",
    breadcrumb: "Breadcrumb",
    pageSections: "Page sections",
    about: "About the Court",
    aboutTitle: "About the Family Court",
    aboutIntro:
      "Learn about the Court’s role, leadership, jurisdiction, strategy and location.",
    overviewTitle: "About the Family Court",
    overviewText:
      "Family Law No. (22) of 2006 provides that one or more circuits within the Court of First Instance and the Court of Appeal hear cases and disputes concerning family and inheritance matters. These circuits are known as the Family Court. The law also allows a Family Court circuit within the Court of First Instance to be formed by a single judge for disputes specified by the Supreme Judiciary Council.",
    overviewStructureText:
      "Under Council Decision No. (23) of 2006, the circuit formed by a single judge was named the District Family Court, while the circuit formed by three judges was named the Plenary Family Court. These disputes had previously fallen within personal status cases. The Family Law assigned them to the Family Court, while other personal status disputes remained within the jurisdiction of the Plenary Court.",
    presidentTitle: "President of the Family Court",
    presidentName: "H.E. Judge Harib Rashid Al Mohannadi",
    presidentRole: "President of the Family Court",
    presidentPhotoAlt:
      "H.E. Judge Harib Rashid Al Mohannadi, President of the Family Court",
    presidentText:
      "H.E. Judge Harib Rashid Al Mohannadi serves as President of the Family Court, drawing on a judicial career that began with his appointment to the Court of First Instance in 2008.",
    presidentBiographyTitle: "Professional profile",
    presidentBiography: [
      "His judicial career began with his appointment as a Judge at the Court of First Instance in 2008. He was subsequently appointed President at the Court of First Instance in 2013.",
      "During his career, he chaired the Administrative Dispute Resolution Committee established under the law regulating public tenders and auctions, as well as one of the rental dispute resolution committees, adding substantial experience in specialised dispute resolution.",
      "In 2019, he was appointed Judge at the Court of Appeal, with seniority from 24 February 2019. He was later appointed Deputy President of the Court of Appeal, with seniority from 24 February 2025, alongside his leadership of the Family Court.",
    ],
    presidentRoleTitle: "Leadership of the Family Court",
    presidentRoleText:
      "He oversees the Court’s judicial and procedural work, supports the timely resolution of family disputes, and advances services for court users.",
    jurisdictionTitle: "Jurisdiction",
    jurisdictionIntro:
      "The Family Court determines cases and disputes concerning family and inheritance matters under the Family Law and related legislation, through specialised judicial circuits suited to the nature and level of each case.",
    jurisdictionSections: [
      {
        title: "Family disputes",
        text: "The Court hears disputes arising from marriage, its legal effects and dissolution, including maintenance, custody, contact and parentage, together with other family matters specified by law.",
      },
      {
        title: "Estates and minors’ affairs",
        text: "Its jurisdiction includes disputes concerning estates and heirs’ rights. The competent circuit also hears cases involving minors’ affairs in accordance with the applicable jurisdictional rules.",
      },
      {
        title: "Court circuits and appeals",
        text: "The District Family Court, formed by a single judge, hears matters designated by the Supreme Judiciary Council. The Plenary Family Court, formed by three judges, hears cases within its jurisdiction, while appeals are considered by Family Court circuits at the Court of Appeal.",
      },
      {
        title: "Interim orders and enforcement",
        text: "Interim orders in family matters are issued in accordance with the law. Enforcement judges supervise the execution of judgments, determine substantive and interim enforcement disputes, and issue the related decisions and orders.",
      },
    ],
    strategyTitle: "Court strategy",
    strategyIntro:
      "The Family Court operates within the Supreme Judiciary Council Strategy 2025-2030 and directs its work towards specialised and trusted family justice that delivers timely outcomes, protects rights and strengthens family cohesion.",
    strategyVisionTitle: "Vision",
    strategyVisionText:
      "Specialised and trusted family justice that upholds the rule of law and provides timely access to justice while respecting the particular nature of family disputes.",
    strategyMissionTitle: "Mission",
    strategyMissionText:
      "To provide a supportive and technologically advanced judicial environment that applies leading practices in court procedures and dispute resolution while offering clear and accessible services to court users.",
    strategyPrioritiesTitle: "Strategic priorities",
    strategyPriorities: [
      {
        title: "Efficient case resolution",
        text: "Developing court procedures and case management to support timely resolution while maintaining the quality of judgments and due process safeguards.",
      },
      {
        title: "Family cohesion and restorative justice",
        text: "Supporting settlement, mediation and reconciliation where permitted by law, with careful regard for families, children and the rights of every party.",
      },
      {
        title: "Digital justice",
        text: "Expanding electronic services, simplifying the court user journey, and improving secure and reliable access to judicial information and procedures.",
      },
      {
        title: "Governance and service quality",
        text: "Strengthening transparency, performance measurement and procedural consistency while improving the visitor experience and confidence in family justice.",
      },
    ],
    locationTitle: "Location and contact",
    locationLabel: "Court location",
    locationValue: "Al Sadd Building, Doha, Qatar",
    workingHoursLabel: "Visitor hours",
    workingDays: "Sunday to Thursday",
    workingHours: "7:30 am - 1:30 pm",
    workingHoursNote: "Hours may change on public holidays.",
    callCenterLabel: "Unified Council call centre",
    callCenterValue: "16007 / 109",
    emailLabel: "Email",
    emailValue: "info@sjc.gov.qa",
    mapTitle: "Family Court location",
    mapDescription: "Family Court, Al Sadd Building, Doha",
    openMap: "Open location in Maps",
    contactFormTitle: "Contact us by email",
    contactFormIntro:
      "Enter your details and enquiry to prepare a message to the Court’s official contact email.",
    contactDetailsTitle: "Contact details and visitor hours",
    contactNameLabel: "Full name",
    contactNamePlaceholder: "Enter your full name…",
    contactEmailLabel: "Email address",
    contactEmailPlaceholder: "name@example.com",
    contactSubjectLabel: "Subject",
    contactSubjectPlaceholder: "Enter the subject of your enquiry…",
    contactMessageLabel: "Message",
    contactMessagePlaceholder: "Enter the details of your enquiry…",
    contactSubmit: "Send by email",
    contactMailNotice:
      "Selecting send will open the email application on your device.",
    contactEmailSubject: "Family Court website enquiry",
    services: "Services",
    requirements: "Requirements",
    requirementsGuide: "Requirements guide",
    requirementsIntro:
      "Review the documents and requirements needed for each Family Court procedure.",
    officialGuide: "View official guide",
    servicesTitle: "Court services",
    servicesIntro:
      "Choose a service category, then open the required service on its official portal.",
    pageLinks: "Page links",
    officialSources: "Important links",
    pageTools: "Page tools",
    familyCourt: "Family Court",
    footerIntro: "A guide to the Court’s jurisdiction and services.",
    council: "Supreme Judiciary Council",
    courtPage: "Family Court page",
    familyServices: "Family services",
    share: "Share page",
    print: "Save / print",
    disclaimer:
      "The official website of the Family Court in the State of Qatar. All rights reserved.",
    backToTop: "Back to top",
  },
} as const;

export default function FamilyServices() {
  const { language, direction } = useLanguage();
  const copy = pageCopy[language];
  const isEnglish = language === "en";
  const hash =
    typeof window === "undefined" ? "" : window.location.hash.slice(1);
  const initialView = viewFromHash(hash);
  const [activeView, setActiveView] = useState<GuideView>(initialView);
  const [activeAnchor, setActiveAnchor] = useState(
    hash ||
      (initialView === "requirements"
        ? familyRequirements[0].id
        : aboutAnchorByView.overview)
  );
  const [openIndexBranch, setOpenIndexBranch] = useState<BranchView | null>(
    initialView === "services" || initialView === "requirements"
      ? initialView
      : null
  );
  const [openRequirements, setOpenRequirements] = useState<Set<string>>(
    () =>
      new Set([
        familyRequirements.some(({ id }) => id === hash)
          ? hash
          : familyRequirements[0].id,
      ])
  );
  const anchorScrollFrame = useRef(0);
  const anchorScrollTimer = useRef(0);

  const scrollToAnchor = (
    targetId: string,
    afterRequirementTransition = false
  ) => {
    window.cancelAnimationFrame(anchorScrollFrame.current);
    window.clearTimeout(anchorScrollTimer.current);

    const scroll = () => {
      anchorScrollFrame.current = window.requestAnimationFrame(() => {
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    if (afterRequirementTransition) {
      anchorScrollTimer.current = window.setTimeout(scroll, 240);
    } else {
      scroll();
    }
  };

  useEffect(
    () => () => {
      window.cancelAnimationFrame(anchorScrollFrame.current);
      window.clearTimeout(anchorScrollTimer.current);
    },
    []
  );

  useEffect(() => {
    const previousTitle = document.title;
    document.title = copy.title;
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView({ block: "start" });
      else window.scrollTo(0, 0);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      document.title = previousTitle;
    };
  }, [copy.title]);

  useEffect(() => {
    const syncViewWithHash = () => {
      const nextHash = window.location.hash.slice(1);
      setActiveAnchor(nextHash);
      const requirement = familyRequirements.find(({ id }) => id === nextHash);
      const nextView = viewFromHash(nextHash);

      setActiveView(nextView);
      setOpenIndexBranch(
        nextView === "services" || nextView === "requirements" ? nextView : null
      );
      if (requirement) setOpenRequirements(new Set([requirement.id]));

      scrollToAnchor(nextHash, Boolean(requirement));
    };

    window.addEventListener("hashchange", syncViewWithHash);
    return () => window.removeEventListener("hashchange", syncViewWithHash);
  }, []);

  const selectView = (view: GuideView, anchor?: string) => {
    const targetId =
      anchor ??
      (view === "services"
        ? "services-view"
        : view === "requirements"
          ? "requirements-guide"
          : aboutAnchorByView[view]);
    setActiveView(view);
    setActiveAnchor(targetId);
    setOpenIndexBranch(
      view === "services" || view === "requirements" ? view : null
    );
    const isRequirementTarget =
      view === "requirements" &&
      familyRequirements.some(({ id }) => id === targetId);
    if (isRequirementTarget) {
      setOpenRequirements(new Set([targetId]));
    }
    window.history.replaceState(null, "", `#${targetId}`);
    scrollToAnchor(targetId, isRequirementTarget);
  };

  const toggleIndexBranch = (view: BranchView) => {
    const targetId =
      view === "services" ? "services-view" : "requirements-guide";
    setActiveView(view);
    setActiveAnchor(targetId);
    setOpenIndexBranch(current => (current === view ? null : view));
    window.history.replaceState(null, "", `#${targetId}`);
    scrollToAnchor(targetId);
  };

  const toggleRequirement = (id: string) => {
    setOpenRequirements(current =>
      current.has(id) ? new Set() : new Set([id])
    );
    setActiveAnchor(id);
    window.history.replaceState(null, "", `#${id}`);
    scrollToAnchor(id, true);
  };

  const sendContactEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const subject =
      String(fields.get("subject") ?? "").trim() || copy.contactEmailSubject;
    const message = String(fields.get("message") ?? "").trim();
    const body = `${copy.contactNameLabel}: ${name}\n${copy.contactEmailLabel}: ${email}\n\n${message}`;

    window.location.href = `mailto:${copy.emailValue}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div id="top" className="quf-page" dir={direction}>
      <a className="skip-link" href="#quf-content">
        {copy.skip}
      </a>

      <SiteHeader
        brandHref="/"
        brandAriaLabel={{
          ar: "العودة إلى الصفحة الرئيسية لمحكمة الأسرة",
          en: "Return to the Family Court homepage",
        }}
        mobileLinks={mobileLinks}
      />

      <section className="quf-hero" aria-labelledby="quf-page-title">
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
            <strong>{copy.pageName}</strong>
          </nav>
          <h1 id="quf-page-title">{copy.pageName}</h1>
          <p>{copy.heroText}</p>
        </div>
      </section>

      <main id="quf-content" className="section-shell quf-shell">
        <nav className="quf-index" aria-label={copy.pageSections}>
          <h2>{copy.about}</h2>
          {aboutSectionsBeforeBranches.map(item => (
            <a
              className={`quf-index-tab${activeView === item.view ? " active" : ""}`}
              aria-current={activeView === item.view ? "page" : undefined}
              key={item.id}
              href={`#${item.id}`}
              onClick={event => {
                event.preventDefault();
                selectView(item.view);
              }}
            >
              {item.label[language]}
            </a>
          ))}

          <div
            className={`quf-index-accordion${activeView === "services" ? " active" : ""}`}
          >
            <button
              type="button"
              aria-expanded={openIndexBranch === "services"}
              aria-controls="services-index-branch"
              onClick={() => toggleIndexBranch("services")}
            >
              <span>{copy.services}</span>
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
                <div id="services-index-branch" className="quf-index-branch">
                  {courtServiceGroups.map(group => (
                    <a
                      className={
                        activeAnchor === group.id ? "active" : undefined
                      }
                      aria-current={
                        activeAnchor === group.id ? "location" : undefined
                      }
                      key={group.id}
                      href={`#${group.id}`}
                      onClick={event => {
                        event.preventDefault();
                        selectView("services", group.id);
                      }}
                    >
                      {isEnglish
                        ? familyServiceEnglishCopy[group.id].title
                        : group.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`quf-index-accordion${activeView === "requirements" ? " active" : ""}`}
          >
            <button
              type="button"
              aria-expanded={openIndexBranch === "requirements"}
              aria-controls="requirements-index-branch"
              onClick={() => toggleIndexBranch("requirements")}
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
                  id="requirements-index-branch"
                  className="quf-index-branch"
                >
                  {familyRequirements.map(item => (
                    <a
                      className={
                        activeAnchor === item.id ? "active" : undefined
                      }
                      aria-current={
                        activeAnchor === item.id ? "location" : undefined
                      }
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={event => {
                        event.preventDefault();
                        selectView("requirements", item.id);
                      }}
                    >
                      {isEnglish ? item.titleEn : item.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {aboutSectionsAfterBranches.map(item => (
            <a
              className={`quf-index-tab${activeView === item.view ? " active" : ""}`}
              aria-current={activeView === item.view ? "page" : undefined}
              key={item.id}
              href={`#${item.id}`}
              onClick={event => {
                event.preventDefault();
                selectView(item.view);
              }}
            >
              {item.label[language]}
            </a>
          ))}
        </nav>

        <div className="quf-main">
          {activeView === "overview" ? (
            <section
              id="about-overview"
              className="quf-section quf-about-page"
              data-quf-anchor="about-overview"
              aria-labelledby="quf-overview-heading"
            >
              <header>
                <h2 id="quf-overview-heading">{copy.overviewTitle}</h2>
              </header>
              <div className="quf-about-page-body quf-overview-body">
                <p className="quf-overview-lead">{copy.overviewText}</p>
                <p>{copy.overviewStructureText}</p>
              </div>
            </section>
          ) : activeView === "president" ? (
            <section
              id="about-president"
              className="quf-section quf-about-page"
              data-quf-anchor="about-president"
              aria-labelledby="quf-president-heading"
            >
              <header>
                <h2 id="quf-president-heading">{copy.presidentTitle}</h2>
              </header>
              <div className="quf-president-profile">
                <figure>
                  <img
                    src={sitePath(
                      "/images/people/court-president-harib-al-muhannadi.jpg"
                    )}
                    alt={copy.presidentPhotoAlt}
                    width={1200}
                    height={900}
                    loading="lazy"
                  />
                  <figcaption>
                    <strong>{copy.presidentName}</strong>
                    <span>{copy.presidentRole}</span>
                  </figcaption>
                </figure>
                <div className="quf-president-copy">
                  <p className="quf-president-intro">{copy.presidentText}</p>
                  <section className="quf-president-biography">
                    <h3>{copy.presidentBiographyTitle}</h3>
                    {copy.presidentBiography.map(paragraph => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  <section>
                    <h3>{copy.presidentRoleTitle}</h3>
                    <p>{copy.presidentRoleText}</p>
                  </section>
                </div>
              </div>
            </section>
          ) : activeView === "jurisdiction" ? (
            <section
              id="about-jurisdiction"
              className="quf-section quf-about-page"
              data-quf-anchor="about-jurisdiction"
              aria-labelledby="quf-jurisdiction-heading"
            >
              <header>
                <h2 id="quf-jurisdiction-heading">{copy.jurisdictionTitle}</h2>
              </header>
              <div className="quf-about-page-body quf-jurisdiction-body">
                <p className="quf-jurisdiction-intro">
                  {copy.jurisdictionIntro}
                </p>
                <div className="quf-jurisdiction-list">
                  {copy.jurisdictionSections.map((item, index) => (
                    <section key={item.title}>
                      <span
                        className="quf-jurisdiction-number"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </section>
          ) : activeView === "strategy" ? (
            <section
              id="about-strategy"
              className="quf-section quf-about-page"
              data-quf-anchor="about-strategy"
              aria-labelledby="quf-strategy-heading"
            >
              <header>
                <h2 id="quf-strategy-heading">{copy.strategyTitle}</h2>
              </header>
              <div className="quf-about-page-body quf-strategy-body">
                <p className="quf-strategy-intro">{copy.strategyIntro}</p>
                <div className="quf-strategy-statements">
                  <section>
                    <h3>{copy.strategyVisionTitle}</h3>
                    <p>{copy.strategyVisionText}</p>
                  </section>
                  <section>
                    <h3>{copy.strategyMissionTitle}</h3>
                    <p>{copy.strategyMissionText}</p>
                  </section>
                </div>
                <section
                  className="quf-strategy-priorities"
                  aria-labelledby="quf-strategy-priorities-heading"
                >
                  <h3 id="quf-strategy-priorities-heading">
                    {copy.strategyPrioritiesTitle}
                  </h3>
                  <div>
                    {copy.strategyPriorities.map(item => (
                      <section key={item.title}>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </section>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          ) : activeView === "location" ? (
            <section
              id="about-location"
              className="quf-section quf-about-page quf-location-page"
              data-quf-anchor="about-location"
              aria-labelledby="quf-location-heading"
            >
              <header>
                <h2 id="quf-location-heading">{copy.locationTitle}</h2>
              </header>
              <div className="quf-contact-details">
                <div className="quf-contact-upper">
                  <section
                    className="quf-map-section"
                    aria-labelledby="quf-map-heading"
                  >
                    <div className="quf-contact-block-heading">
                      <div>
                        <h3 id="quf-map-heading">{copy.mapTitle}</h3>
                        <p>{copy.mapDescription}</p>
                      </div>
                      <a
                        href={officialLinks.map}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {copy.openMap}
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
                    <iframe
                      title={copy.mapTitle}
                      src={officialLinks.mapEmbed}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </section>

                  <aside
                    className="quf-contact-aside"
                    aria-labelledby="quf-contact-details-heading"
                  >
                    <h3 id="quf-contact-details-heading">
                      {copy.contactDetailsTitle}
                    </h3>
                    <dl className="quf-contact-summary">
                      <div>
                        <dt>{copy.locationLabel}</dt>
                        <dd>{copy.locationValue}</dd>
                      </div>
                      <div>
                        <dt>{copy.workingHoursLabel}</dt>
                        <dd>
                          <span>{copy.workingDays}</span>
                          <span>{copy.workingHours}</span>
                        </dd>
                      </div>
                      <div>
                        <dt>{copy.callCenterLabel}</dt>
                        <dd>
                          <a href="tel:16007">{copy.callCenterValue}</a>
                        </dd>
                      </div>
                      <div>
                        <dt>{copy.emailLabel}</dt>
                        <dd>
                          <a href={`mailto:${copy.emailValue}`}>
                            {copy.emailValue}
                          </a>
                        </dd>
                      </div>
                    </dl>
                    <p className="quf-hours-note">{copy.workingHoursNote}</p>
                  </aside>
                </div>

                <div className="quf-contact-lower">
                  <section
                    className="quf-email-section"
                    aria-labelledby="quf-email-heading"
                  >
                    <div className="quf-contact-block-heading">
                      <div>
                        <h3 id="quf-email-heading">{copy.contactFormTitle}</h3>
                        <p>{copy.contactFormIntro}</p>
                      </div>
                    </div>
                    <form
                      className="quf-contact-form"
                      onSubmit={sendContactEmail}
                    >
                      <div className="quf-contact-form-row">
                        <label>
                          <span>{copy.contactNameLabel}</span>
                          <input
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder={copy.contactNamePlaceholder}
                            required
                          />
                        </label>
                        <label>
                          <span>{copy.contactEmailLabel}</span>
                          <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            spellCheck={false}
                            placeholder={copy.contactEmailPlaceholder}
                            required
                          />
                        </label>
                      </div>
                      <label>
                        <span>{copy.contactSubjectLabel}</span>
                        <input
                          name="subject"
                          type="text"
                          autoComplete="off"
                          placeholder={copy.contactSubjectPlaceholder}
                          required
                        />
                      </label>
                      <label>
                        <span>{copy.contactMessageLabel}</span>
                        <textarea
                          name="message"
                          rows={5}
                          autoComplete="off"
                          placeholder={copy.contactMessagePlaceholder}
                          required
                        />
                      </label>
                      <button type="submit">
                        {copy.contactSubmit}
                        {isEnglish ? (
                          <ArrowRight
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        ) : (
                          <HugeiconsIcon
                            icon={ArrowLeft02Icon}
                            size={17}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                      <p>{copy.contactMailNotice}</p>
                    </form>
                  </section>
                </div>
              </div>
            </section>
          ) : activeView === "requirements" ? (
            <section
              id="requirements-guide"
              className="quf-section"
              data-quf-anchor="requirements-guide"
              aria-labelledby="quf-requirements-heading"
            >
              <header>
                <h2 id="quf-requirements-heading">{copy.requirementsGuide}</h2>
                <p>{copy.requirementsIntro}</p>
              </header>
              <div className="quf-folds">
                {familyRequirements.map(item => {
                  const expanded = openRequirements.has(item.id);
                  return (
                    <section
                      id={item.id}
                      key={item.id}
                      data-quf-anchor={item.id}
                    >
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`${item.id}-body`}
                        onClick={() => toggleRequirement(item.id)}
                      >
                        <span className="quf-fold-title">
                          <strong>
                            {isEnglish ? item.titleEn : item.title}
                          </strong>
                        </span>
                        <HugeiconsIcon
                          className={`quf-fold-control-icon${isEnglish ? "" : " quf-fold-plus"}`}
                          icon={isEnglish ? ArrowDown01Icon : Add01Icon}
                          size={17}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        className="quf-fold-collapse"
                        data-expanded={expanded}
                        aria-hidden={!expanded}
                      >
                        <div className="quf-fold-collapse-inner">
                          <div
                            id={`${item.id}-body`}
                            className="quf-requirement-body"
                          >
                            <p>{isEnglish ? item.leadEn : item.lead}</p>
                            <ul>
                              {(isEnglish ? item.itemsEn : item.items).map(
                                text => (
                                  <li key={text}>
                                    <span className="quf-check">
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
                            >
                              <span>{copy.officialGuide}</span>
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
            </section>
          ) : (
            <section
              id="services-view"
              className="quf-section quf-services-view"
              aria-labelledby="quf-services-heading"
            >
              <header>
                <h2 id="quf-services-heading">{copy.servicesTitle}</h2>
                <p>{copy.servicesIntro}</p>
              </header>
              <div className="quf-service-groups">
                {courtServiceGroups.map(group => {
                  const groupIconImage = sitePath(
                    serviceGroupIconImages[group.id]
                  );
                  const groupCopy = isEnglish
                    ? familyServiceEnglishCopy[group.id]
                    : group;
                  return (
                    <section
                      id={group.id}
                      key={group.id}
                      className="quf-service-group"
                    >
                      <h3 className="quf-service-group-heading">
                        <span
                          className="quf-service-group-icon"
                          aria-hidden="true"
                          style={{
                            WebkitMaskImage: `url("${groupIconImage}")`,
                            maskImage: `url("${groupIconImage}")`,
                          }}
                        />
                        <span>{groupCopy.title}</span>
                      </h3>
                      <div className="quf-service-list">
                        {group.services.map(service => {
                          const serviceCopy = isEnglish
                            ? familyServiceEnglishCopy[service.id]
                            : service;
                          return (
                            <a
                              className="quf-service-row"
                              key={service.id}
                              href={service.href}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span className="quf-service-identity">
                                <strong>{serviceCopy.title}</strong>
                              </span>
                              <p>{serviceCopy.description}</p>
                              {isEnglish ? (
                                <ArrowRight
                                  size={18}
                                  strokeWidth={1.8}
                                  aria-hidden="true"
                                />
                              ) : (
                                <HugeiconsIcon
                                  icon={ArrowLeft02Icon}
                                  size={18}
                                  strokeWidth={1.8}
                                  aria-hidden="true"
                                />
                              )}
                            </a>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <SiteRating language={language} />

      <footer className="site-footer">
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
                <strong>{copy.familyCourt}</strong>
                <span>Family Court</span>
              </div>
            </div>
          </div>
          <nav
            className="footer-column footer-page-links"
            aria-label={copy.pageLinks}
          >
            <h2>{copy.pageLinks}</h2>
            <a href={sitePath("/")}>{copy.home}</a>
            <a href="#services-view" onClick={() => selectView("services")}>
              {copy.courtServices}
            </a>
            <a
              href="#requirements-guide"
              onClick={() => selectView("requirements")}
            >
              {copy.requirementsGuide}
            </a>
            <a href="#about-overview" onClick={() => selectView("overview")}>
              {copy.about}
            </a>
          </nav>
          <nav
            className="footer-column footer-official-links"
            aria-label={copy.officialSources}
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
                <strong>{copy.familyCourt}</strong>
              </span>
            </div>
          </div>
        </div>
        <a
          className="footer-back-to-top"
          href="#top"
          aria-label={copy.backToTop}
        >
          <HugeiconsIcon
            icon={ArrowUp02Icon}
            size={21}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </a>
      </footer>
    </div>
  );
}
