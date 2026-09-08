import { courtServiceGroups } from "./familyServices";
import { familyServiceEnglishCopy } from "./familyServicesEnglish";
import { familyRequirements } from "./familyRequirements";

export type GuideLanguage = "ar" | "en";

export type GuideLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type GuideAnswer = {
  id: string;
  title?: string;
  text: string;
  gulfText?: string;
  links?: GuideLink[];
};

export type GuideRetrieval = {
  answer: GuideAnswer;
  confidence: number;
  alternatives: GuideAnswer[];
};

type KnowledgeEntry = GuideAnswer & {
  title: string;
  examples: string[];
};

const pageLink = (label: string, href: string): GuideLink => ({ label, href });
const externalLink = (label: string, href: string): GuideLink => ({
  label,
  href,
  external: true,
});

const officialPortal = externalLink(
  "فتح بوابة الخدمات الرسمية",
  "https://eservices.sjc.gov.qa/"
);
const officialCourt = externalLink(
  "صفحة محكمة الأسرة الرسمية",
  "https://www.sjc.gov.qa/ar/Pages/CourtOfFamily.aspx"
);
const contactPage = externalLink(
  "صفحة التواصل الرسمية",
  "https://www.sjc.gov.qa/ar/Pages/ContactUs.aspx"
);
const contactLinks = [
  pageLink("الاتصال على 16007", "tel:16007"),
  pageLink("الاتصال على 109", "tel:109"),
  pageLink("البريد الإلكتروني info@sjc.gov.qa", "mailto:info@sjc.gov.qa"),
  contactPage,
];
const courtLocationLinks = [
  pageLink("عرض الموقع وبيانات التواصل", "/family-services#about-location"),
  ...contactLinks,
];

const officialPortalEn = externalLink(
  "Open the official services portal",
  "https://eservices.sjc.gov.qa/"
);
const officialCourtEn = externalLink(
  "Official Family Court page",
  "https://www.sjc.gov.qa/ar/Pages/CourtOfFamily.aspx"
);
const contactPageEn = externalLink(
  "Official contact page",
  "https://www.sjc.gov.qa/ar/Pages/ContactUs.aspx"
);
const contactLinksEn = [
  pageLink("Call 16007", "tel:16007"),
  pageLink("Call 109", "tel:109"),
  pageLink("Email info@sjc.gov.qa", "mailto:info@sjc.gov.qa"),
  contactPageEn,
];

const staticKnowledge: KnowledgeEntry[] = [
  {
    id: "greeting",
    title: "الترحيب",
    examples: [
      "السلام عليكم",
      "مرحبا",
      "هلا",
      "هلا والله",
      "صباح الخير",
      "مساء الخير",
      "مرحبتين",
    ],
    text: "هلا ومرحبًا بك. كيف أقدر أساعدك اليوم؟",
    gulfText: "هلا وغلا. كيف أقدر أساعدك اليوم؟",
  },
  {
    id: "thanks",
    title: "الشكر",
    examples: [
      "شكرا",
      "مشكور",
      "يعطيك العافية",
      "تسلم",
      "ما قصرت",
      "جزاك الله خير",
    ],
    text: "العفو. اكتب أي خدمة أو إجراء آخر تحتاجه وسأوجّهك إليه.",
    gulfText: "العفو وحاضرين. اكتب أي خدمة ثانية تحتاجها وبأوصلك لها.",
  },
  {
    id: "decline",
    title: "إنهاء المحادثة",
    examples: [
      "لا مش عايز",
      "لا شكرا",
      "مش محتاج",
      "لا خلاص",
      "ما أبي",
      "لا ما ابي",
      "خلاص مشكور",
    ],
    text: "تمام. أنا موجود إذا احتجت أي مساعدة.",
    gulfText: "تمام. أنا موجود إذا احتجت أي مساعدة.",
  },
  {
    id: "guide-identity",
    title: "هوية مرشد الموقع",
    examples: [
      "من انت",
      "منو انت",
      "ما وظيفتك",
      "ماذا تفعل",
      "وش تسوي",
      "مرشد الموقع",
      "هل انت بوت",
    ],
    text: "أنا مرشد الموقع. أشرح محتوى محكمة الأسرة وأوصلك إلى الخدمات والمتطلبات والمصادر الرسمية، ولا أقدّم استشارة قانونية.",
  },
  {
    id: "site-status",
    title: "صفة الموقع الرسمية",
    examples: [
      "هل الموقع رسمي",
      "هل هذا موقع المحكمة",
      "الموقع تابع للمحكمة",
      "هل تمثلون المحكمة",
      "هل المعلومات حكومية",
    ],
    text: "هذا الموقع الرسمي لمحكمة الأسرة في دولة قطر. ويمكنك كذلك الرجوع إلى صفحة المحكمة في موقع المجلس الأعلى للقضاء للتحقق من المعلومات والخدمات المنشورة.",
    links: [officialCourt],
  },
  {
    id: "about-court",
    title: "نبذة عن محكمة الأسرة",
    examples: [
      "ما هي محكمة الأسرة",
      "عرفني بمحكمة الأسرة",
      "نبذة عن المحكمة",
      "عن المحكمة",
      "ايش محكمة الاسرة",
      "المحكمة بتعمل ايه",
      "المحكمة شنو تسوي",
      "مش عارف المحكمة بتعمل ايه",
    ],
    text: "تختص محكمة الأسرة بالدعاوى والمنازعات المتعلقة بالأسرة والتركات، ومنها الطلاق والحضانة والنفقة والتوثيقات الأسرية، إلى جانب الصلح والإرشاد الأسري. اكتب موضوعك بطريقتك وسأوجّهك إلى المسار المناسب.",
    gulfText:
      "تختص محكمة الأسرة بالدعاوى والمنازعات المتعلقة بالأسرة والتركات، مثل الطلاق والحضانة والنفقة والتوثيقات الأسرية، إضافة إلى الصلح والإرشاد الأسري. اكتب موضوعك بطريقتك وسأوجّهك إلى المسار المناسب.",
    links: [
      pageLink("استعراض خدمات المحكمة", "/family-services#services-view"),
      pageLink("فتح دليل المتطلبات", "/family-services#requirements-guide"),
      pageLink("الموقع وبيانات التواصل", "/family-services#about-location"),
      pageLink(
        "الصلح والإرشاد الأسري",
        "/family-services#family-reconciliation"
      ),
    ],
  },
  {
    id: "service-discovery",
    title: "تحديد الخدمة المناسبة",
    examples: [
      "ما الخدمة المناسبة لحالتي",
      "اريد معرفة الخدمة المناسبة",
      "ساعدني اختار الخدمة",
      "ما اعرف اي خدمة اختار",
      "وجهني للخدمة المناسبة",
    ],
    text: "يسعدني توجيهك. اكتب باختصار الإجراء الذي تريد إنجازه أو صف حالتك بكلماتك، مثل: طلاق، حضانة، نفقة، توثيق، صلح أسري، أو طلب نسخة من مستند. ويمكنك أيضًا استعراض فئات الخدمات التالية.",
    gulfText:
      "يسعدني توجيهك. اكتب باختصار شنو الإجراء اللي تحتاجه أو صف حالتك بطريقتك، مثل: طلاق، حضانة، نفقة، توثيق، صلح أسري، أو طلب نسخة من مستند. وتقدر كذلك تستعرض فئات الخدمات التالية.",
    links: [
      pageLink("خدمات التقاضي", "/family-services#litigation-services"),
      pageLink(
        "خدمات التوثيقات الأسرية",
        "/family-services#family-documentation"
      ),
      pageLink(
        "الصلح والإرشاد الأسري",
        "/family-services#family-reconciliation"
      ),
      pageLink("النسخ والمستندات", "/family-services#copies-documents"),
    ],
  },
  {
    id: "court-president",
    title: "رئيس محكمة الأسرة",
    examples: [
      "من رئيس المحكمة",
      "اسم رئيس محكمة الاسرة",
      "من يدير المحكمة",
      "رئيس محكمة الاسرة الحالي",
      "القاضي حارب راشد المهندي",
      "السيره المهنيه لرئيس المحكمة",
    ],
    text: "يتولى سعادة القاضي حارب راشد المهندي رئاسة محكمة الأسرة. بدأ قاضيًا بالمحكمة الابتدائية عام 2008، ثم عُيّن رئيسًا بها عام 2013، وقاضيًا بمحكمة الاستئناف بأقدمية من 24 فبراير 2019، ثم نائبًا لرئيس محكمة الاستئناف بأقدمية من 24 فبراير 2025. كما ترأس لجانًا لفض المنازعات الإدارية والإيجارية، ويتابع سير العمل القضائي والإجرائي بمحكمة الأسرة وتطوير خدمات المتقاضين.",
    links: [
      pageLink("عرض صفحة رئيس المحكمة", "/family-services#about-president"),
    ],
  },
  {
    id: "court-jurisdiction",
    title: "اختصاص محكمة الأسرة",
    examples: [
      "ما اختصاص محكمة الأسرة",
      "المحكمة تختص في ماذا",
      "وش تنظر المحكمة",
      "اي قضايا تنظر فيها",
      "قضايا محكمة الاسرة",
      "هل تنظر في التركات",
    ],
    text: "تختص محكمة الأسرة بالدعاوى والمنازعات الناشئة عن الزواج وآثاره وانحلاله، ومنها النفقة والحضانة والرؤية والنسب، كما تشمل اختصاصاتها منازعات التركات وحقوق الورثة وشؤون القاصرين وفق قواعد الاختصاص القانونية.",
    links: [
      pageLink("عرض اختصاصات المحكمة", "/family-services#about-jurisdiction"),
      officialCourt,
    ],
  },
  {
    id: "court-structure",
    title: "هيكل محكمة الأسرة",
    examples: [
      "ما هيكل المحكمة",
      "محكمة جزئية",
      "محكمة كلية",
      "كم قاضي",
      "قاضي فرد",
      "ثلاثة قضاة",
      "كيف تتشكل المحكمة",
    ],
    text: "وفق المعلومات المنشورة، تتولى محكمة الأسرة الجزئية، المشكلة من قاضٍ فرد، الدعاوى التي يحددها المجلس الأعلى للقضاء، بينما تتولى محكمة الأسرة الكلية، المشكلة من ثلاثة قضاة، الدعاوى الداخلة في اختصاصها. وتُنظر الطعون أمام دوائر الأسرة بمحكمة الاستئناف.",
    links: [
      pageLink(
        "عرض هيكل واختصاص المحكمة",
        "/family-services#about-jurisdiction"
      ),
      officialCourt,
    ],
  },
  {
    id: "court-legal-basis",
    title: "تأسيس محكمة الأسرة والإطار القانوني",
    examples: [
      "متى تأسست محكمة الأسرة",
      "كيف تأسست المحكمة",
      "قانون انشاء محكمة الاسرة",
      "قرار 23 لسنة 2006",
      "قانون 22 لسنة 2006",
      "الأحوال الشخصية",
    ],
    text: "نص قانون الأسرة رقم (22) لسنة 2006 على أن تتولى دوائر في المحكمة الابتدائية ومحكمة الاستئناف الفصل في دعاوى الأسرة والتركات. وبقرار المجلس رقم (23) لسنة 2006 سُمّيت الدائرة المشكلة من قاضٍ فرد محكمة الأسرة الجزئية، والدائرة المشكلة من ثلاثة قضاة محكمة الأسرة الكلية. وكانت هذه المنازعات سابقًا ضمن قضايا الأحوال الشخصية.",
    links: [
      pageLink("قراءة نبذة المحكمة", "/family-services#about-overview"),
      officialCourt,
    ],
  },
  {
    id: "court-estates-minors",
    title: "التركات وشؤون القاصرين",
    examples: [
      "هل المحكمة تنظر التركات",
      "حقوق الورثة",
      "شؤون القاصرين",
      "منازعات الميراث",
      "تركة وورثة",
      "قضايا القاصرين",
    ],
    text: "يشمل اختصاص محكمة الأسرة المنازعات المتعلقة بالتركات وحقوق الورثة، كما تنظر الدائرة المختصة في الدعاوى المرتبطة بشؤون القاصرين وفق قواعد الاختصاص المقررة قانونًا.",
    links: [
      pageLink("عرض اختصاصات المحكمة", "/family-services#about-jurisdiction"),
    ],
  },
  {
    id: "court-enforcement",
    title: "الأوامر الوقتية وتنفيذ الأحكام",
    examples: [
      "من ينفذ حكم المحكمة",
      "تنفيذ الأحكام",
      "قاضي التنفيذ",
      "منازعات التنفيذ",
      "الأوامر الوقتية",
      "قرار وقتي",
    ],
    text: "تصدر الأوامر الوقتية المتعلقة بمسائل الأسرة وفقًا للقانون، ويتولى قضاة التنفيذ الإشراف على تنفيذ الأحكام، والفصل في منازعات التنفيذ الموضوعية والوقتية، وإصدار القرارات والأوامر المرتبطة بها.",
    links: [
      pageLink("عرض اختصاصات المحكمة", "/family-services#about-jurisdiction"),
    ],
  },
  {
    id: "statistics",
    title: "أرقام وإحصائيات المحكمة",
    examples: [
      "ارقام المحكمة",
      "احصائيات المحكمة",
      "نسبة الانجاز",
      "كم خدمة مقدمة",
      "عدد الجلسات الالكترونية",
      "نسبة التسجيل الالكتروني",
    ],
    text: "يعرض الموقع: نسبة إنجاز قضائي 97%، و20,875 خدمة مقدمة، و2,924 جلسة إلكترونية، ونسبة تسجيل إلكتروني 83%.",
    links: [pageLink("عرض الأرقام والإحصائيات", "/#performance")],
  },
  {
    id: "family-law",
    title: "قانون الأسرة",
    examples: [
      "قانون الاسرة",
      "قانون رقم 22",
      "الاطار القانوني",
      "الاطار التشريعي",
      "نص قانون الأسرة",
      "قانون الزواج والحضانة",
    ],
    text: "يربط الموقع بقانون الأسرة رقم (22) لسنة 2006، ويتناول الزواج والنفقات والفرقة والحضانة والوصية والإرث.",
    links: [
      externalLink(
        "فتح قانون الأسرة",
        "https://www.almeezan.qa/LawView.aspx?LawID=2558"
      ),
    ],
  },
  {
    id: "strategy",
    title: "استراتيجية محكمة الأسرة",
    examples: [
      "ما هي استراتيجية المحكمة",
      "استراتيجية المحكمه",
      "استراتيجيه المحكمه",
      "استراتيجية المجلس",
      "استراتيجية 2025 2030",
      "خطة المحكمة",
      "خطة تطوير القضاء",
    ],
    text: "تعمل محكمة الأسرة ضمن استراتيجية المجلس الأعلى للقضاء 2025-2030، نحو قضاء أسري متخصص وموثوق يحقق العدالة الناجزة ويحفظ الحقوق ويعزز التماسك الأسري. وتشمل أولوياتها كفاءة الفصل في الدعاوى، والعدالة التصالحية، والعدالة الرقمية، والحوكمة وجودة الخدمات.",
    links: [
      pageLink("عرض استراتيجية المحكمة", "/family-services#about-strategy"),
    ],
  },
  {
    id: "strategy-vision",
    title: "رؤية محكمة الأسرة",
    examples: [
      "ما رؤية المحكمة",
      "رؤيه محكمه الاسره",
      "الرؤية الاستراتيجية",
      "وش تطمح له المحكمة",
    ],
    text: "رؤية المحكمة هي: قضاء أسري متخصص وموثوق، يرسخ سيادة القانون، ويضمن الوصول إلى عدالة ناجزة تراعي طبيعة المنازعات الأسرية وخصوصيتها.",
    links: [pageLink("عرض الرؤية", "/family-services#about-strategy")],
  },
  {
    id: "strategy-mission",
    title: "رسالة محكمة الأسرة",
    examples: [
      "ما رسالة المحكمة",
      "رساله محكمه الاسره",
      "الرسالة الاستراتيجية",
      "مهمة المحكمة الاستراتيجية",
    ],
    text: "رسالة المحكمة هي توفير بيئة قضائية داعمة ومتطورة تقنيًا، تطبق أفضل الممارسات في إجراءات التقاضي وبدائل تسوية المنازعات، وتقدم خدمات واضحة وميسرة للمتقاضين.",
    links: [pageLink("عرض الرسالة", "/family-services#about-strategy")],
  },
  {
    id: "strategy-priorities",
    title: "الأولويات الاستراتيجية",
    examples: [
      "اولويات المحكمة",
      "الأولويات الاستراتيجية",
      "محاور استراتيجية المحكمة",
      "ما خطط تطوير المحكمة",
    ],
    text: "الأولويات الاستراتيجية الأربع هي: كفاءة الفصل في الدعاوى، والتماسك الأسري والعدالة التصالحية، والعدالة الرقمية، والحوكمة وجودة الخدمات.",
    links: [
      pageLink("عرض الأولويات الاستراتيجية", "/family-services#about-strategy"),
    ],
  },
  {
    id: "strategy-case-efficiency",
    title: "كفاءة الفصل في الدعاوى",
    examples: [
      "كفاءة الفصل في الدعاوى",
      "سرعة الفصل",
      "ادارة الدعاوى",
      "جودة الاحكام",
      "ضمانات التقاضي",
    ],
    text: "تستهدف المحكمة تطوير إجراءات العمل ورفع كفاءة إدارة الدعاوى بما يدعم سرعة الفصل، مع الحفاظ على جودة الأحكام وضمانات التقاضي.",
    links: [
      pageLink("عرض الأولويات الاستراتيجية", "/family-services#about-strategy"),
    ],
  },
  {
    id: "strategy-family-cohesion",
    title: "التماسك الأسري والعدالة التصالحية",
    examples: [
      "العدالة التصالحية",
      "التماسك الاسري",
      "الحلول الرضائية",
      "الوساطة والتصالح",
      "حماية الأسرة والأطفال",
    ],
    text: "تدعم المحكمة الحلول الرضائية والوساطة والتصالح متى أجاز القانون ذلك، مع مراعاة مصلحة الأسرة والأطفال وحماية حقوق جميع الأطراف.",
    links: [
      pageLink("عرض أولوية التماسك الأسري", "/family-services#about-strategy"),
    ],
  },
  {
    id: "strategy-digital-justice",
    title: "العدالة الرقمية",
    examples: [
      "العدالة الرقمية",
      "الخدمات الإلكترونية",
      "رحلة المتقاضي الرقمية",
      "الوصول الالكتروني",
      "رقمنة المحكمة",
    ],
    text: "تعني أولوية العدالة الرقمية توسيع الخدمات الإلكترونية وتبسيط رحلة المتقاضي، وتحسين الوصول الآمن والموثوق إلى المعلومات والإجراءات القضائية.",
    links: [
      pageLink("عرض أولوية العدالة الرقمية", "/family-services#about-strategy"),
    ],
  },
  {
    id: "strategy-governance",
    title: "الحوكمة وجودة الخدمات",
    examples: [
      "الحوكمة",
      "جودة الخدمات",
      "قياس الأداء",
      "توحيد الاجراءات",
      "ثقة المراجعين",
    ],
    text: "تركز أولوية الحوكمة وجودة الخدمات على تعزيز الشفافية، وقياس الأداء، وتوحيد الإجراءات، وتطوير تجربة المراجعين بما يرسخ الثقة في منظومة العدالة الأسرية.",
    links: [pageLink("عرض أولوية الحوكمة", "/family-services#about-strategy")],
  },
  {
    id: "official-sources",
    title: "المصادر والمراجع الرسمية",
    examples: [
      "ما المصدر",
      "المصادر الرسمية",
      "وين المرجع",
      "المجلس الاعلى للقضاء",
      "اريد معلومات رسمية",
      "تحقق من المعلومة",
    ],
    text: "للتحقق من المعلومات، راجع موقع المجلس الأعلى للقضاء وصفحة محكمة الأسرة الرسمية.",
    links: [
      externalLink("المجلس الأعلى للقضاء", "https://www.sjc.gov.qa/ar"),
      officialCourt,
    ],
  },
  {
    id: "latest-news",
    title: "آخر أخبار القضاء",
    examples: [
      "اخر الأخبار",
      "اخبار المحكمة",
      "وش الجديد",
      "عرض جميع الأخبار",
      "احدث اخبار القضاء",
    ],
    text: "يعرض الموقع أحدث الأخبار المنشورة من المجلس الأعلى للقضاء، ومنها مشاركة محكمة الأسرة في برنامج «كيف أصبحت»، وتسهيلات التقاضي لذوي الإعاقة، وتعريف طلبة «مهنتي مستقبلي» بالعمل القضائي.",
    links: [
      pageLink("عرض قسم الأخبار", "/#news"),
      externalLink(
        "عرض جميع الأخبار الرسمية",
        "https://www.sjc.gov.qa/ar/News/Pages/default.aspx"
      ),
    ],
  },
  {
    id: "news-family-court-radio",
    title: "محكمة الأسرة في برنامج كيف أصبحت",
    examples: [
      "برنامج كيف أصبحت",
      "محكمة الاسرة في الاذاعة",
      "البرنامج الاذاعي",
      "12 حلقة أسبوعية",
      "خبر التماسك الاسري",
    ],
    text: "بتاريخ 2 سبتمبر 2026، عرض الموقع خبر مشاركة محكمة الأسرة في برنامج «كيف أصبحت» الإذاعي ضمن 12 حلقة أسبوعية تتناول التماسك الأسري وحل المنازعات بالوسائل الودية.",
    links: [
      externalLink(
        "قراءة الخبر الرسمي",
        "https://www.sjc.gov.qa/ar/News/Pages/محكمة-الأسرة-تشارك-في-برنامج-كيف-أصبحت-الإذاعي-عبر-إذاعة-القران-الكريم.aspx"
      ),
    ],
  },
  {
    id: "news-accessible-justice",
    title: "تسهيلات التقاضي لذوي الإعاقة",
    examples: [
      "تسهيلات ذوي الاعاقة",
      "التقاضي لذوي الإعاقة",
      "الأمم المتحدة",
      "خدمات الترجمة والمساعدة القانونية",
      "التقاضي الالكتروني للمعاقين",
    ],
    text: "بتاريخ 16 أغسطس 2026، عرض الموقع خبر تقديم تجربة القضاء القطري أمام الأمم المتحدة في تيسير الوصول إلى العدالة لذوي الإعاقة، بما يشمل التقاضي الإلكتروني وخدمات الترجمة والمساعدة القانونية.",
    links: [
      externalLink(
        "قراءة الخبر الرسمي",
        "https://www.sjc.gov.qa/ar/News/Pages/القاضي-د.-علي-الجسيمان-يستعرض-أمام-الأمم-المتحدة-تسهيلات-التقاضي-لذوي-الإعاقة.aspx"
      ),
    ],
  },
  {
    id: "news-future-careers",
    title: "برنامج مهنتي مستقبلي والعمل القضائي",
    examples: [
      "مهنتي مستقبلي",
      "طلبة العمل القضائي",
      "المسارات المهنية القضائية",
      "محكمة الاستثمار والتجارة",
      "تعريف الطلاب بالقضاء",
    ],
    text: "بتاريخ 5 أغسطس 2026، عرض الموقع خبر استضافة محكمة الاستثمار والتجارة طلبة برنامج «مهنتي مستقبلي» لتعريفهم بطبيعة العمل القضائي والإداري وتعزيز وعيهم بالمسارات المهنية.",
    links: [
      externalLink(
        "قراءة الخبر الرسمي",
        "https://www.sjc.gov.qa/ar/News/Pages/محكمة-الاستثمار-والتجارة-تستضيف-طلبة-برنامج-«مهنتي-مستقبلي»-لتعزيز-الوعي-المهني.aspx"
      ),
    ],
  },
  {
    id: "site-rating",
    title: "تقييم الموقع",
    examples: [
      "كيف اقيم الموقع",
      "تقييم الموقع",
      "المحتوى مفيد",
      "وين النجوم",
      "اريد اعطي رأيي",
      "التقييم من خمس نجوم",
    ],
    text: "يمكنك استخدام قسم «تقييم الموقع» أسفل الصفحة: اختر نعم أو لا لسؤال فائدة المحتوى، ثم اختر تقييمًا من نجمة إلى خمس نجوم. يُحفظ اختيارك على جهازك.",
  },
  {
    id: "electronic-documentation-announcement",
    title: "خدمة التوثيق الإلكتروني الجديدة",
    examples: [
      "خدمة التوثيق الالكتروني الجديدة",
      "اعلان التوثيق",
      "وش الخدمة الجديدة",
      "إطلاق خدمة التوثيق",
      "رحلة قضائية اسرع",
    ],
    text: "يعرض شريط الأخبار إعلان إطلاق خدمة التوثيق الإلكتروني الجديدة بوصفها خطوة نحو رحلة قضائية أسرع وأسهل، ويربط بتفاصيل خدمات المحكمة.",
    links: [pageLink("الاطلاع على التفاصيل", "/family-services#services-view")],
  },
  {
    id: "legal-advice",
    title: "الاستشارة القانونية",
    examples: [
      "اريد استشارة",
      "احتاج محامي",
      "اعطني رأي قانوني",
      "فتوى قانونية",
      "تنصحني قانونيا",
      "هل اكسب القضية",
    ],
    text: "لا أستطيع تقديم رأي أو استشارة قانونية. أقدر أن أوصلك إلى المعلومات المنشورة والخدمة الرسمية أو بيانات التواصل مع الجهة المختصة.",
    links: [officialCourt, ...contactLinks],
  },
  {
    id: "print-page",
    title: "طباعة الصفحة وحفظ PDF",
    examples: [
      "كيف اطبع",
      "طباعة الصفحة",
      "احفظ الصفحة",
      "اريد pdf",
      "تنزيل الصفحة",
      "وين زر الطباعة",
    ],
    text: "استخدم زر «طباعة» في رأس الصفحة، ثم اختر الحفظ بصيغة PDF من نافذة الطباعة في جهازك.",
  },
  {
    id: "share-page",
    title: "مشاركة الصفحة",
    examples: [
      "كيف اشارك الصفحة",
      "مشاركة الموقع",
      "ارسل رابط الصفحة",
      "وين زر المشاركة",
      "ابي اشاركها",
    ],
    text: "استخدم زر «مشاركة الصفحة» الظاهر في الصفحة لفتح خيارات المشاركة المتاحة على جهازك.",
  },
  {
    id: "privacy-terms",
    title: "الخصوصية والشروط وخريطة الموقع",
    examples: [
      "سياسة الخصوصية",
      "شروط الاستخدام",
      "خريطة الموقع",
      "اخلاء المسؤولية",
      "الخصوصية",
      "الشروط",
    ],
    text: "يمكنك فتح صفحات الخصوصية وخريطة الموقع من الروابط الرسمية التالية.",
    links: [
      externalLink(
        "سياسة الخصوصية",
        "https://www.sjc.gov.qa/ar/pages/Privacy.aspx"
      ),
      externalLink(
        "خريطة الموقع",
        "https://www.sjc.gov.qa/ar/Pages/Sitemap.aspx"
      ),
    ],
  },
  {
    id: "requirements-overview",
    title: "دليل المتطلبات",
    examples: [
      "دليل المتطلبات",
      "ما المستندات المطلوبة",
      "وش الاوراق المطلوبة",
      "شنو اجيب",
      "ماذا احتاج قبل التقديم",
      "متطلبات الاجراءات",
      "قبل لا اروح المحكمة شنو اخذ معاي",
      "شنو اجهز قبل ما اروح",
    ],
    text: "دليل المتطلبات يجمع المتطلبات التمهيدية للطلاق والحضانة والنفقة والتوثيق. اختر نوع الإجراء لعرض التفاصيل.",
    links: [
      pageLink("فتح دليل المتطلبات", "/family-services#requirements-guide"),
    ],
  },
  {
    id: "court-visit",
    title: "زيارة محكمة الأسرة",
    examples: [
      "وين المحكمة ومتى دوامهم",
      "موقع المحكمة واوقات الدوام",
      "وين اروح ومتى تفتح المحكمة",
    ],
    text: "تقع محكمة الأسرة في مبنى السد بالدوحة. أوقات استقبال المراجعين من الأحد إلى الخميس، من 7:30 صباحًا إلى 1:30 ظهرًا، وقد تتغير خلال العطلات الرسمية.",
    gulfText:
      "محكمة الأسرة في مبنى السد بالدوحة. استقبال المراجعين من الأحد إلى الخميس، من 7:30 الصبح إلى 1:30 الظهر، والمواعيد ممكن تتغير في العطلات الرسمية.",
    links: courtLocationLinks,
  },
  {
    id: "lost-marriage-document",
    title: "وثيقة زواج مفقودة",
    examples: [
      "ضيعت وثيقة الزواج",
      "عقد الزواج ضاع",
      "بدل فاقد وثيقة الزواج",
      "ابي نسخة من عقد الزواج",
    ],
    text: "إذا كنت تقصد البطاقة الزوجية، يمكنك استخدام خدمة إصدار بدل فاقد أو تالف. أمّا إذا كنت تقصد نسخة رسمية من عقد الزواج، فراجع خدمات التوثيقات الأسرية أو تواصل مع الجهة المختصة لتأكيد الإجراء الصحيح.",
    gulfText:
      "إذا تقصد البطاقة الزوجية، استخدم خدمة بدل فاقد أو تالف. وإذا تقصد نسخة رسمية من عقد الزواج، راجع خدمات التوثيقات الأسرية أو تأكد من الإجراء عن طريق الجهة المختصة.",
    links: [
      pageLink(
        "عرض خدمات التوثيقات الأسرية",
        "/family-services#family-documentation"
      ),
      ...contactLinks,
    ],
  },
  {
    id: "divorce-pathway",
    title: "مسار الطلاق",
    examples: [
      "اريد الطلاق",
      "انا اريد الطلق",
      "اريد ان اطلق",
      "اريد ان اتطلق",
      "عايز اطلق",
      "عايزة اطلق",
      "ازاي اطلق",
      "كيف ابدا الطلاق",
      "انفصل عن زوجي",
      "انفصل عن زوجتي",
      "ماذا افعل للطلاق",
    ],
    text: "إذا كان الطرفان متفقين على الطلاق، فالمسار الأقرب هو خدمة إثبات الطلاق بالتراضي. وإذا كان هناك نزاع، فابدأ بخدمة قيد دعوى جديدة وراجع متطلبات الطلاق قبل التقديم.",
    gulfText:
      "إذا أنتم متفقين على الطلاق، فالمسار الأقرب هو إثبات الطلاق بالتراضي. وإذا فيه نزاع، ابدأ بخدمة قيد دعوى جديدة وراجع متطلبات الطلاق قبل التقديم.",
    links: [
      pageLink(
        "مراجعة متطلبات الطلاق",
        "/family-services#requirements-divorce"
      ),
      officialPortal,
    ],
  },
  {
    id: "custody-pathway",
    title: "مسار الحضانة",
    examples: [
      "اريد حضانة اطفالي",
      "عايز حضانة اولادي",
      "كيف اطلب الحضانة",
      "ارفع دعوى حضانة",
      "حقوق الحضانة",
      "استرد حضانة ابني",
    ],
    text: "لبدء طلب متعلق بالحضانة، راجع المتطلبات التمهيدية ثم استخدم خدمة قيد دعوى جديدة. جهّز البطاقة الشخصية والمذكرة الشارحة والمستندات المؤيدة، وقد تُطلب مستندات أخرى بحسب الحالة.",
    links: [
      pageLink("عرض متطلبات الحضانة", "/family-services#requirements-custody"),
      officialPortal,
    ],
  },
  {
    id: "maintenance-pathway",
    title: "مسار النفقة",
    examples: [
      "اريد نفقة",
      "عايز نفقة للاطفال",
      "كيف اطلب مصاريف اولادي",
      "ارفع دعوى نفقة",
      "زوجي لا يدفع النفقة",
      "طلب دعم مالي للاطفال",
    ],
    text: "لطلب النفقة، راجع متطلبات النفقة ثم ابدأ بقيد دعوى جديدة. جهّز المستندات المؤيدة وشهادة IBAN وحدد عناصر النفقة المطلوبة بوضوح.",
    links: [
      pageLink("عرض متطلبات النفقة", "/family-services#requirements-alimony"),
      officialPortal,
    ],
  },
  {
    id: "custody-maintenance-pathway",
    title: "الحضانة والنفقة",
    examples: [
      "ابي حضانة ونفقة",
      "عيالي معاي وهو ما يصرف",
      "اقدم حضانة ولا نفقة اول",
      "حضانة الاطفال ومصاريفهم",
    ],
    text: "يبدو أن سؤالك يجمع بين الحضانة والنفقة. راجع متطلبات كل مسار على حدة، ثم استخدم خدمة قيد دعوى جديدة للإجراء المناسب. قد تحتاج إلى البطاقة الشخصية والمذكرة الشارحة والمستندات المؤيدة، إضافة إلى شهادة IBAN في طلبات النفقة.",
    gulfText:
      "واضح إن سؤالك عن الحضانة والنفقة مع بعض. راجع متطلبات كل مسار، وبعدها استخدم خدمة قيد دعوى جديدة للإجراء المناسب. غالبًا تحتاج البطاقة الشخصية والمذكرة الشارحة والمستندات المؤيدة، ومع النفقة شهادة IBAN.",
    links: [
      pageLink("متطلبات الحضانة", "/family-services#requirements-custody"),
      pageLink("متطلبات النفقة", "/family-services#requirements-alimony"),
      officialPortal,
    ],
  },
  {
    id: "requirements-divorce",
    title: "متطلبات الطلاق",
    examples: [
      "متطلبات الطلاق",
      "اوراق الطلاق",
      "ابي اطلق وش المطلوب",
      "شنو احتاج للطلاق",
      "مستندات دعوى الطلاق",
      "كيف ارفع طلاق",
    ],
    text: "المتطلبات التمهيدية المعروضة للطلاق: البطاقة الشخصية إذا كان أحد الأطراف فردًا، والمذكرة الشارحة بصيغتي Word وPDF، وحافظة المستندات المؤيدة، وشهادة IBAN للمدعي. وقد يطلب النظام مستندات إضافية حسب الحالة.",
    gulfText:
      "المطلوب تمهيديًا للطلاق: البطاقة الشخصية إذا كان أحد الأطراف فردًا، والمذكرة الشارحة بصيغتي Word وPDF، وحافظة المستندات المؤيدة، وشهادة IBAN للمدعي. والنظام ممكن يطلب مستندات إضافية حسب الحالة.",
    links: [
      pageLink("عرض متطلبات الطلاق", "/family-services#requirements-divorce"),
    ],
  },
  {
    id: "requirements-custody",
    title: "متطلبات الحضانة",
    examples: [
      "متطلبات الحضانة",
      "اوراق الحضانة",
      "ابي ارفع حضانة",
      "شنو المطلوب للحضانة",
      "مستندات قضية حضانة",
      "حقوق عيالي",
    ],
    text: "المتطلبات التمهيدية المعروضة للحضانة: البطاقة الشخصية إذا كان أحد الأطراف فردًا، والمذكرة الشارحة بصيغتي Word وPDF، وحافظة المستندات المؤيدة، وبيانات الوكالة عند التقديم بواسطة محامٍ.",
    links: [
      pageLink("عرض متطلبات الحضانة", "/family-services#requirements-custody"),
    ],
  },
  {
    id: "requirements-alimony",
    title: "متطلبات النفقة",
    examples: [
      "متطلبات النفقة",
      "اوراق النفقة",
      "ابي ارفع نفقة",
      "شنو المطلوب للنفقة",
      "مصاريف العيال",
      "طلب مصروف الابناء",
    ],
    text: "المتطلبات التمهيدية المعروضة للنفقة: البطاقة الشخصية إذا كان أحد الأطراف فردًا، والمذكرة الشارحة وحافظة المستندات، وشهادة IBAN للمدعي، وحصر عناصر النفقة والطلبات المالية في صحيفة الدعوى.",
    links: [
      pageLink("عرض متطلبات النفقة", "/family-services#requirements-alimony"),
    ],
  },
  {
    id: "requirements-documentation",
    title: "متطلبات التوثيق",
    examples: [
      "متطلبات التوثيق",
      "اوراق التوثيق",
      "ماذا احتاج للتوثيق",
      "شنو المطلوب لتوثيق عقد",
      "توثيق اقرار",
      "متطلبات وثيقة اسرية",
    ],
    text: "المتطلبات التمهيدية المعروضة للتوثيق: الوثيقة الشخصية، وبيانات الوكالة إن كان مقدم الطلب وكيلًا، والمرفقات التي يحددها النظام حسب نوع التوثيق، والإقرار بصحة البيانات قبل الإرسال.",
    links: [
      pageLink(
        "عرض متطلبات التوثيق",
        "/family-services#requirements-documentation"
      ),
    ],
  },
  {
    id: "all-services",
    title: "خدمات المحكمة الإلكترونية",
    examples: [
      "الخدمات الالكترونية",
      "كل الخدمات",
      "ما الخدمات المتاحة",
      "وش الخدمات عندكم",
      "ابي اشوف المعاملات",
      "بوابة الخدمات",
    ],
    text: "يعرض الموقع خدمات التقاضي، والتوثيقات الأسرية، والصلح والإرشاد الأسري، والنسخ والمستندات، مع روابط مباشرة إلى البوابات الرسمية.",
    links: [
      pageLink("عرض خدمات المحكمة", "/family-services#services-view"),
      officialPortal,
    ],
  },
  {
    id: "complaints",
    title: "الشكاوى والتظلمات",
    examples: [
      "اريد اقدم شكوى",
      "كيف اشتكي",
      "عندي تظلم",
      "اقدم اعتراض",
      "وين الشكاوى",
      "شكوى على خدمة",
    ],
    text: "للتأكد من القناة الصحيحة للشكوى أو التظلّم، تواصل مع مركز الاتصال الموحد أو استخدم صفحة التواصل الرسمية.",
    links: contactLinks,
  },
  {
    id: "court-location",
    title: "موقع محكمة الأسرة",
    examples: [
      "وين اروح",
      "اين المحكمة",
      "موقع المحكمة",
      "عنوان محكمة الاسرة",
      "كيف اوصل",
      "مكان المحكمة",
      "هل اروح السد",
    ],
    text: "محكمة الأسرة في مبنى السد. يُفضّل التأكد من الجهة التي تحتاج مراجعتها عبر صفحة التواصل الرسمية قبل التوجه.",
    gulfText:
      "محكمة الأسرة في مبنى السد. قبل ما تروح، تأكد من الجهة اللي تحتاج تراجعها عبر صفحة التواصل الرسمية.",
    links: courtLocationLinks,
  },
  {
    id: "contact",
    title: "بيانات التواصل",
    examples: [
      "رقم المحكمة",
      "كيف اتواصل",
      "ابي اكلم المحكمة",
      "رقم الاتصال",
      "الهاتف",
      "اتصل على من",
      "البريد الالكتروني",
    ],
    text: "يمكنك التواصل مع مركز الاتصال الموحد على 16007 أو 109، أو عبر البريد الإلكتروني info@sjc.gov.qa، أو من خلال صفحة التواصل الرسمية. ويتيح نموذج التواصل في صفحة الموقع تجهيز رسالة تفتح في تطبيق البريد على جهازك.",
    gulfText:
      "تقدر تتواصل على 16007 أو 109، أو ترسل إلى info@sjc.gov.qa، أو تفتح صفحة التواصل الرسمية. نموذج التواصل في الموقع يجهّز لك الرسالة ويفتحها في تطبيق البريد على جهازك.",
    links: contactLinks,
  },
  {
    id: "working-hours",
    title: "ساعات العمل",
    examples: [
      "متى تفتح المحكمة",
      "ساعات العمل",
      "وقت الدوام",
      "متى يسكرون",
      "دوام المحكمة",
      "متى اروح",
    ],
    text: "أوقات استقبال المراجعين من الأحد إلى الخميس، من 7:30 صباحًا إلى 1:30 ظهرًا. قد تتغير المواعيد خلال العطلات الرسمية، لذلك يُفضّل التأكد قبل الزيارة.",
    links: courtLocationLinks,
  },
  {
    id: "fees",
    title: "رسوم الخدمات",
    examples: [
      "كم الرسوم",
      "بكم الخدمة",
      "كم تكلف",
      "السعر",
      "فلوس المعاملة",
      "هل الخدمة مجانية",
    ],
    text: "الرسوم تختلف حسب نوع الطلب والخدمة. افتح الخدمة المطلوبة للاطلاع على تفاصيلها، أو تأكد من مركز الاتصال الموحد.",
    links: [officialPortal, ...contactLinks],
  },
];

const englishStaticKnowledge: KnowledgeEntry[] = [
  {
    id: "greeting",
    title: "Welcome",
    examples: [
      "hello",
      "hi",
      "good morning",
      "good evening",
      "can you help me",
      "i need help",
    ],
    text: "Hello. Describe what you need to do, and I will direct you to the relevant service, requirements or official contact.",
  },
  {
    id: "thanks",
    title: "Thanks",
    examples: ["thank you", "thanks", "that helped", "great thanks"],
    text: "You are welcome. You can ask about another service, procedure or document at any time.",
  },
  {
    id: "decline",
    title: "End conversation",
    examples: [
      "no thanks",
      "not now",
      "i do not need anything",
      "that is all",
      "never mind",
    ],
    text: "All right. I am here if you need anything later.",
  },
  {
    id: "guide-identity",
    title: "About the guide",
    examples: [
      "who are you",
      "what can you do",
      "are you a bot",
      "how can you help",
    ],
    text: "I am the Family Court website guide. I can explain published information and direct you to services, requirements and official contacts. I cannot provide legal advice.",
  },
  {
    id: "site-status",
    title: "Official website",
    examples: [
      "is this official",
      "is this the court website",
      "does this represent the court",
      "official information",
    ],
    text: "This is the official website of the Family Court in the State of Qatar. You can also use the Supreme Judiciary Council page to verify published information and services.",
    links: [officialCourtEn],
  },
  {
    id: "about-court",
    title: "About the Family Court",
    examples: [
      "what is the family court",
      "tell me about the court",
      "about family court",
      "court overview",
    ],
    text: "The Family Court hears cases and disputes relating to family and inheritance matters within Qatar's published judicial structure.",
    links: [
      pageLink("Learn about the Family Court", "/#about"),
      officialCourtEn,
    ],
  },
  {
    id: "service-discovery",
    title: "Find the right service",
    examples: [
      "which service do i need",
      "help me find the right service",
      "choose a service for me",
      "i do not know which service to use",
    ],
    text: "Describe what you need to do in your own words—for example divorce, custody, maintenance, documentation, family reconciliation, or requesting a document copy. You can also browse the service categories below.",
    links: [
      pageLink("Litigation services", "/family-services#litigation-services"),
      pageLink("Family documentation", "/family-services#family-documentation"),
      pageLink(
        "Reconciliation and guidance",
        "/family-services#family-reconciliation"
      ),
      pageLink("Copies and documents", "/family-services#copies-documents"),
    ],
  },
  {
    id: "court-president",
    title: "President of the Family Court",
    examples: [
      "who is the court president",
      "name of the family court president",
      "who leads the court",
      "current family court president",
      "judge harib rashid al mohannadi",
      "court president biography",
    ],
    text: "H.E. Judge Harib Rashid Al Mohannadi serves as President of the Family Court. The website provides a professional profile and explains his role in overseeing the Court's judicial and procedural work.",
    links: [
      pageLink("View the Court President", "/family-services#about-president"),
    ],
  },
  {
    id: "court-jurisdiction",
    title: "Family Court jurisdiction",
    examples: [
      "what cases does the court hear",
      "court jurisdiction",
      "what does family court handle",
      "inheritance cases",
      "family disputes",
    ],
    text: "The Court handles family and inheritance matters under the applicable laws, including connected litigation, documentation and reconciliation pathways.",
    links: [
      pageLink(
        "View Court jurisdiction",
        "/family-services#about-jurisdiction"
      ),
      officialCourtEn,
    ],
  },
  {
    id: "court-structure",
    title: "Court structure",
    examples: [
      "how is the court structured",
      "single judge",
      "three judges",
      "summary family court",
      "plenary family court",
    ],
    text: "Published information describes a summary Family Court circuit that may be formed by one judge and a plenary circuit that may be formed by three judges, depending on the case.",
    links: [
      pageLink("Read the Court overview", "/family-services#about-overview"),
      officialCourtEn,
    ],
  },
  {
    id: "statistics",
    title: "Court facts and figures",
    examples: [
      "court statistics",
      "facts and figures",
      "completion rate",
      "online hearings",
      "services delivered",
    ],
    text: "The website presents key figures for judicial completion, delivered services, online hearings and electronic registration.",
    links: [pageLink("View facts and figures", "/#performance")],
  },
  {
    id: "family-law",
    title: "Family Law",
    examples: [
      "family law",
      "law number 22",
      "legal framework",
      "marriage custody law",
      "family law 2006",
    ],
    text: "Family Law No. 22 of 2006 covers marriage, maintenance, separation, custody, wills and inheritance.",
    links: [
      externalLink(
        "Open Family Law",
        "https://www.almeezan.qa/LawView.aspx?LawID=2558"
      ),
    ],
  },
  {
    id: "strategy",
    title: "Court strategy",
    examples: [
      "court strategy",
      "strategy 2025 2030",
      "digital justice",
      "restorative justice",
      "family cohesion",
    ],
    text: "The Court strategy section explains priorities connected to efficient justice, family cohesion, digital services and service quality.",
    links: [pageLink("View Court strategy", "/family-services#about-strategy")],
  },
  {
    id: "strategy-vision",
    title: "Family Court vision",
    examples: ["court vision", "family court vision", "strategic vision"],
    text: "The vision is specialised and trusted family justice that upholds the rule of law and provides timely access to justice while respecting the particular nature of family disputes.",
    links: [
      pageLink("View the Court vision", "/family-services#about-strategy"),
    ],
  },
  {
    id: "strategy-mission",
    title: "Family Court mission",
    examples: ["court mission", "family court mission", "strategic mission"],
    text: "The mission is to provide a supportive and technologically advanced judicial environment, apply leading practices in court procedures and dispute resolution, and offer clear, accessible services.",
    links: [
      pageLink("View the Court mission", "/family-services#about-strategy"),
    ],
  },
  {
    id: "strategy-priorities",
    title: "Strategic priorities",
    examples: ["strategic priorities", "court priorities", "strategy pillars"],
    text: "The four priorities are efficient case resolution; family cohesion and restorative justice; digital justice; and governance and service quality.",
    links: [
      pageLink("View strategic priorities", "/family-services#about-strategy"),
    ],
  },
  {
    id: "strategy-case-efficiency",
    title: "Efficient case resolution",
    examples: [
      "efficient case resolution",
      "timely cases",
      "case management",
      "quality of judgments",
    ],
    text: "This priority develops procedures and case management to support timely resolution while maintaining the quality of judgments and due-process safeguards.",
    links: [
      pageLink("View strategic priorities", "/family-services#about-strategy"),
    ],
  },
  {
    id: "strategy-family-cohesion",
    title: "Family cohesion and restorative justice",
    examples: [
      "family cohesion",
      "restorative justice",
      "mediation and settlement",
      "protect children",
    ],
    text: "This priority supports settlement, mediation and reconciliation where permitted by law, with regard for families, children and the rights of every party.",
    links: [
      pageLink(
        "View family cohesion priority",
        "/family-services#about-strategy"
      ),
    ],
  },
  {
    id: "strategy-digital-justice",
    title: "Digital justice",
    examples: [
      "digital justice",
      "electronic court services",
      "digital court journey",
      "online access",
    ],
    text: "Digital justice expands electronic services, simplifies the court-user journey and improves secure, reliable access to judicial information and procedures.",
    links: [
      pageLink(
        "View digital justice priority",
        "/family-services#about-strategy"
      ),
    ],
  },
  {
    id: "strategy-governance",
    title: "Governance and service quality",
    examples: [
      "governance",
      "service quality",
      "performance measurement",
      "consistent procedures",
    ],
    text: "This priority strengthens transparency, performance measurement and procedural consistency while improving the visitor experience and confidence in family justice.",
    links: [
      pageLink("View governance priority", "/family-services#about-strategy"),
    ],
  },
  {
    id: "official-sources",
    title: "Official sources",
    examples: [
      "official source",
      "where is the source",
      "supreme judiciary council",
      "verify information",
      "references",
    ],
    text: "Use the Supreme Judiciary Council website and its official Family Court page to verify published information.",
    links: [
      externalLink("Supreme Judiciary Council", "https://www.sjc.gov.qa/ar"),
      officialCourtEn,
    ],
  },
  {
    id: "legal-advice",
    title: "Legal advice",
    examples: [
      "i need legal advice",
      "do i need a lawyer",
      "will i win my case",
      "give me legal advice",
      "legal opinion",
    ],
    text: "I cannot provide legal advice or assess a case. I can direct you to published requirements, official services and contact channels.",
    links: [officialCourtEn, ...contactLinksEn],
  },
  {
    id: "requirements-overview",
    title: "Requirements guide",
    examples: [
      "requirements guide",
      "what documents do i need",
      "required documents",
      "paperwork",
      "what should i prepare",
      "documents needed",
    ],
    text: "The requirements guide covers preliminary documents for divorce, custody, maintenance and documentation procedures. Choose a procedure to view its details.",
    links: [
      pageLink(
        "Open the requirements guide",
        "/family-services#requirements-guide"
      ),
    ],
  },
  {
    id: "divorce-pathway",
    title: "Divorce pathway",
    examples: [
      "i want to get divorced",
      "i want a divorce",
      "how do i get divorced",
      "divorce my wife",
      "divorce my husband",
      "start a divorce",
      "separate from my spouse",
      "what should i do for divorce",
    ],
    text: "If both parties agree, the closest route is the amicable divorce confirmation service. If the divorce is disputed, start with filing a new case and review the divorce requirements before submitting.",
    links: [
      pageLink(
        "Review divorce requirements",
        "/family-services#requirements-divorce"
      ),
      officialPortalEn,
    ],
  },
  {
    id: "custody-pathway",
    title: "Custody pathway",
    examples: [
      "i want custody of my children",
      "how do i get child custody",
      "start a custody case",
      "apply for custody",
      "custody of my kids",
      "my child lives with the other parent",
    ],
    text: "To begin a custody request, review the preliminary requirements and then use the new case filing service. Prepare identification, an explanatory memorandum and supporting documents. Additional documents may be requested for the case.",
    links: [
      pageLink(
        "Review custody requirements",
        "/family-services#requirements-custody"
      ),
      officialPortalEn,
    ],
  },
  {
    id: "maintenance-pathway",
    title: "Maintenance pathway",
    examples: [
      "i need child support",
      "apply for alimony",
      "my spouse does not pay support",
      "start a maintenance case",
      "financial support for my children",
      "claim maintenance",
    ],
    text: "To request maintenance, review the maintenance requirements and then file a new case. Prepare supporting documents, the claimant's IBAN certificate and a clear list of the requested maintenance items.",
    links: [
      pageLink(
        "Review maintenance requirements",
        "/family-services#requirements-alimony"
      ),
      officialPortalEn,
    ],
  },
  {
    id: "requirements-divorce",
    title: "Divorce requirements",
    examples: [
      "divorce requirements",
      "divorce documents",
      "file for divorce",
      "divorce paperwork",
      "what do i need for divorce",
    ],
    text: "The preliminary divorce requirements shown are identification, an explanatory memorandum in Word and PDF formats, supporting documents and the claimant's IBAN certificate. The service may request additional documents for a specific case.",
    links: [
      pageLink(
        "View divorce requirements",
        "/family-services#requirements-divorce"
      ),
    ],
  },
  {
    id: "requirements-custody",
    title: "Custody requirements",
    examples: [
      "custody requirements",
      "custody documents",
      "file a custody case",
      "child custody paperwork",
      "what do i need for custody",
    ],
    text: "The preliminary custody requirements shown are identification, an explanatory memorandum in Word and PDF formats, supporting documents and agency details when a lawyer submits the request.",
    links: [
      pageLink(
        "View custody requirements",
        "/family-services#requirements-custody"
      ),
    ],
  },
  {
    id: "requirements-alimony",
    title: "Maintenance requirements",
    examples: [
      "maintenance requirements",
      "alimony documents",
      "child support case",
      "maintenance paperwork",
      "financial support",
    ],
    text: "The preliminary maintenance requirements shown include identification, an explanatory memorandum, supporting documents, the claimant's IBAN certificate and a clear list of requested maintenance items.",
    links: [
      pageLink(
        "View maintenance requirements",
        "/family-services#requirements-alimony"
      ),
    ],
  },
  {
    id: "requirements-documentation",
    title: "Documentation requirements",
    examples: [
      "documentation requirements",
      "notarisation documents",
      "certificate paperwork",
      "documents for notarisation",
    ],
    text: "Preliminary documentation requirements include identification, agency details when applicable, attachments requested for the selected service and confirmation that the submitted information is correct.",
    links: [
      pageLink(
        "View documentation requirements",
        "/family-services#requirements-documentation"
      ),
    ],
  },
  {
    id: "all-services",
    title: "Electronic Court services",
    examples: [
      "electronic services",
      "all services",
      "which service do i need",
      "available court services",
      "services portal",
    ],
    text: "Services are grouped into litigation, family documentation, reconciliation and guidance, and copies and documents. Tell me what you need to do and I can narrow the options.",
    links: [
      pageLink("Browse Court services", "/family-services#services-view"),
      officialPortalEn,
    ],
  },
  {
    id: "complaints",
    title: "Complaints and appeals",
    examples: [
      "make a complaint",
      "submit a complaint",
      "complain about a service",
      "file an appeal",
      "where can i complain",
    ],
    text: "Contact the unified call centre or use the official contact page to confirm the correct channel for a complaint or appeal.",
    links: contactLinksEn,
  },
  {
    id: "court-location",
    title: "Court location",
    examples: [
      "where is the court",
      "court address",
      "how do i get there",
      "family court location",
      "al sadd building",
      "map",
    ],
    text: "The Family Court is located in the Al Sadd building in Doha. Check the official contact details before travelling if you need to confirm the correct department.",
    links: [
      pageLink(
        "View location and visiting details",
        "/family-services#about-location"
      ),
      ...contactLinksEn,
    ],
  },
  {
    id: "contact",
    title: "Contact details",
    examples: [
      "contact the court",
      "court phone number",
      "telephone",
      "email address",
      "call centre",
      "how can i contact you",
    ],
    text: "You can call the unified contact centre on 16007 or use the official contact page.",
    links: contactLinksEn,
  },
  {
    id: "working-hours",
    title: "Opening hours",
    examples: [
      "opening hours",
      "working hours",
      "when does the court open",
      "visiting time",
      "when should i visit",
    ],
    text: "Visitor reception hours are Sunday to Thursday, from 7:30 am to 1:30 pm. Hours may change during official holidays.",
    links: [
      pageLink("View visiting details", "/family-services#about-location"),
      ...contactLinksEn,
    ],
  },
  {
    id: "fees",
    title: "Service fees",
    examples: [
      "service fee",
      "how much does it cost",
      "court fees",
      "is it free",
      "payment",
    ],
    text: "Fees depend on the request and service. Open the relevant official service to review its details, or confirm the fee through the unified contact centre.",
    links: [officialPortalEn, ...contactLinksEn],
  },
];

const serviceExamples: Record<string, string[]> = {
  "file-new-case": [
    "احتاج اقدم دعوه ايش اسوي",
    "كيف ارفع قضية",
    "ابي اقدم دعوى",
    "قيد دعوى جديدة",
    "ارفع دعوى اونلاين",
    "ابدأ قضية جديدة",
  ],
  "follow-cases": [
    "كيف اتابع قضيتي",
    "وين وصلت الدعوى",
    "متابعة الطلب القضائي",
    "حالة القضية",
    "ابي اتابع الدعوى",
  ],
  "hearing-appointments": [
    "متى جلستي",
    "موعد الجلسة",
    "كيف اعرف موعد المحكمة",
    "جدول الجلسات",
    "ابي اشوف جلستي",
  ],
  "court-requests": [
    "اقدم طلب قضائي",
    "ارفق مستند للقضية",
    "طلبات القضية",
    "معاملة قضائية",
  ],
  "marriage-appointment": [
    "ابي اتزوج",
    "كيف احجز زواج",
    "موعد عقد القران",
    "حجز عقد نكاح",
    "وين احجز موعد الزواج",
  ],
  "marriage-continuity": [
    "شهادة اني متزوج",
    "اثبات استمرار الزواج",
    "شهادة استمرار الزوجية",
    "اثبات الزوجية",
  ],
  "non-marriage-proof": [
    "ابي شهادة اني مو متزوج",
    "اثبات عدم الزواج",
    "شهادة عزوبية",
    "ما عندي زواج مسجل",
  ],
  "marriage-card": [
    "بطاقة الزواج ضاعت",
    "بدل فاقد البطاقة الزوجية",
    "البطاقة الزوجية تالفة",
    "اصدار بطاقة زوجية",
  ],
  "friendly-divorce": [
    "طلاق بالتراضي",
    "متفقين على الطلاق",
    "نوثق الطلاق بالتراضي",
    "طلاق ودي",
  ],
  "divorce-creation": [
    "انشاء اشهاد طلاق",
    "ابي وثيقة طلاق",
    "اصدار اشهاد الطلاق",
    "توثيق الطلاق",
  ],
  "marriage-officers": [
    "وين المأذون",
    "رقم مأذون شرعي",
    "المأذونين المعتمدين",
    "ابي مأذون زواج",
  ],
  "divorce-dislocation": [
    "ابي اخلع",
    "اثبات الخلع",
    "كيف اقدم خلع",
    "وثيقة خلع",
    "انا محتاجه اخلعه",
    "عايزه اخلع زوجي",
    "ابي اخلع زوجي",
    "شلون اقدم على الخلع",
  ],
  remarriage: [
    "ابي ارجع زوجتي",
    "اثبات الرجعة",
    "توثيق الرجوع بعد الطلاق",
    "اشهاد رجعة",
  ],
  "external-marriage-attestation": [
    "زواجي من خارج قطر",
    "تصديق عقد زواج خارجي",
    "اوثق عقد زواج من الخارج",
    "عقد زواج صادر خارج الدولة",
  ],
  "heirs-determination": [
    "حصر ورثة",
    "كيف اطلع حصر الورث",
    "صك الورثة",
    "ميراث وتركة",
    "من هم الورثة",
  ],
  "intoxicant-effect": ["شهادة اثر مسكر", "اثبات أثر مسكر", "شهادة سكر"],
  "travel-permission": [
    "اذن سفر",
    "شهادة السفر",
    "موافقة سفر",
    "اصدار اذن سفر",
  ],
  "passport-permission": [
    "اذن اصدار جواز",
    "شهادة جواز سفر",
    "موافقة استخراج جواز",
    "جواز للطفل",
  ],
  "child-support": [
    "شهادة نفقة طفل",
    "اثبات نفقة الابناء",
    "شهادة مصروف العيال",
  ],
  "relative-support": ["شهادة اعالة", "اثبات اني اعول اقاربي", "اعالة الاقارب"],
  "relationship-proof": ["اثبات صلة قرابة", "شهادة قرابة", "اثبت انه قريبي"],
  acknowledgment: ["شهادة اقرار", "اوثق اقرار", "اصدار اقرار"],
  "witness-document": ["توثيق شهادة شاهد", "اوثق كلام الشاهد", "شهادة شاهد"],
  "gift-certificate": [
    "شهادة هبة",
    "ابي اوثق هبة",
    "كيف اطلع هبة",
    "توثيق هدية",
  ],
  "will-certificate": [
    "شهادة وصية",
    "ابي اسوي وصية",
    "توثيق الوصية",
    "اصدار وصية",
  ],
  "agent-isolation": [
    "عزل وكيل",
    "ابي الغي الوكيل",
    "انهاء وكالة الوكيل",
    "اشيل الوكيل",
  ],
  "agent-resign": [
    "تنحي وكيل",
    "الوكيل يبي يتنحى",
    "استقالة الوكيل",
    "انهاء صفتي كوكيل",
  ],
  "family-reconciliation-request": [
    "طلب صلح اسري",
    "ابي نتصالح",
    "حل خلاف اسري",
    "نبي نتفاهم",
    "وساطة اسرية",
    "نبي نتصالح وين نسجل",
  ],
  "reconciliation-follow-up": [
    "متابعة ملف الصلح",
    "وين وصل التصالح",
    "موعد الصلح الاسري",
    "ابي اتابع ملف الصلح شلون",
  ],
  "family-guidance": [
    "احتاج ارشاد اسري",
    "دعم اسري",
    "مساعدة في خلاف عائلي",
    "مستشار اسري",
    "ابي استشارة زوجية",
    "وين اسجل للاستشارة الزوجية",
    "عندنا خلافات ونبي استشارة قبل الطلاق",
  ],
  "judgment-copy": [
    "ابي نسخة الحكم",
    "صورة من الحكم",
    "اطلع الحكم",
    "نسخة رسمية للقضية",
  ],
  "hearing-record-copy": [
    "نسخة محضر جلسة",
    "ابي محضر الجلسة",
    "صورة محضر المحكمة",
  ],
  "document-copy": [
    "صورة مستند من القضية",
    "نسخة من ملف الدعوى",
    "اطلب مستند قضائي",
  ],
  "document-verification": [
    "اتحقق من الوثيقة",
    "هل المستند صحيح",
    "تأكد من صحة الوثيقة",
    "فحص وثيقة قضائية",
  ],
};

const englishServiceExamples: Record<string, string[]> = {
  "file-new-case": [
    "start a court case",
    "bring a case to court",
    "make a new claim",
    "sue someone",
    "submit a family case",
  ],
  "follow-cases": [
    "track my case",
    "check my claim status",
    "what happened to my application",
    "follow my court request",
  ],
  "hearing-appointments": [
    "when is my hearing",
    "court date",
    "check my hearing date",
    "session schedule",
  ],
  "court-requests": [
    "send a request to the judge",
    "upload papers to my case",
    "submit documents for a case",
  ],
  "marriage-appointment": [
    "i want to get married",
    "book my wedding",
    "marriage contract appointment",
    "nikah appointment",
  ],
  "marriage-continuity": [
    "prove i am married",
    "marriage status certificate",
    "proof my marriage continues",
  ],
  "non-marriage-proof": [
    "prove i am single",
    "single status certificate",
    "certificate that i am not married",
  ],
  "marriage-card": [
    "lost marriage card",
    "damaged marriage card",
    "replace my marriage card",
  ],
  "friendly-divorce": [
    "we both agree to divorce",
    "mutual divorce",
    "amicable separation",
    "consensual divorce",
  ],
  "divorce-creation": [
    "issue a divorce certificate",
    "get divorce papers",
    "create divorce document",
    "proof of divorce",
  ],
  "marriage-officers": [
    "find a marriage officer",
    "authorised marriage registrar",
    "who can perform the marriage",
  ],
  "divorce-dislocation": [
    "khula",
    "khul divorce",
    "wife initiated divorce",
    "confirm a khul",
  ],
  remarriage: [
    "return to my wife after divorce",
    "reconcile after divorce",
    "document marital reconciliation",
  ],
  "external-marriage-attestation": [
    "married outside qatar",
    "legalise foreign marriage certificate",
    "attest overseas marriage",
  ],
  "heirs-determination": [
    "who are the heirs",
    "inheritance certificate",
    "estate heirs",
    "succession certificate",
  ],
  "intoxicant-effect": [
    "proof of intoxication",
    "intoxicant certificate",
    "alcohol effect certificate",
  ],
  "travel-permission": [
    "permission for my child to travel",
    "travel approval",
    "issue travel permission",
  ],
  "passport-permission": [
    "permission for child passport",
    "passport approval",
    "issue a passport for my child",
  ],
  "child-support": [
    "child maintenance certificate",
    "proof of child support",
    "children support certificate",
  ],
  "relative-support": [
    "prove i support a relative",
    "dependent relative certificate",
    "family support certificate",
  ],
  "relationship-proof": [
    "prove family relationship",
    "kinship certificate",
    "proof someone is my relative",
  ],
  acknowledgment: [
    "notarise an acknowledgment",
    "declaration certificate",
    "document my declaration",
  ],
  "witness-document": [
    "notarise witness statement",
    "official witness declaration",
    "certify witness testimony",
  ],
  "gift-certificate": [
    "document a gift",
    "gift deed",
    "issue gift certificate",
  ],
  "will-certificate": [
    "make a will",
    "document my will",
    "issue will certificate",
    "testament",
  ],
  "agent-isolation": [
    "remove my authorised agent",
    "cancel an agent",
    "dismiss my representative",
  ],
  "agent-resign": [
    "resign as an agent",
    "stop representing someone",
    "agent wants to withdraw",
  ],
  "family-reconciliation-request": [
    "we want to reconcile",
    "family mediation",
    "resolve a family dispute",
    "make peace with my spouse",
  ],
  "reconciliation-follow-up": [
    "track reconciliation request",
    "mediation appointment",
    "check family reconciliation file",
  ],
  "family-guidance": [
    "family counselling",
    "relationship guidance",
    "help with family conflict",
    "family support",
  ],
  "judgment-copy": [
    "copy of my judgment",
    "get the court decision",
    "official judgment copy",
  ],
  "hearing-record-copy": [
    "copy of hearing minutes",
    "court session record",
    "get hearing transcript",
  ],
  "document-copy": [
    "copy from my case file",
    "get a court document",
    "request case papers",
  ],
  "document-verification": [
    "check if document is genuine",
    "verify court paper",
    "validate judicial document",
  ],
};

const groupExamples: Record<string, string[]> = {
  "litigation-services": [
    "خدمات التقاضي",
    "الدعاوى والقضايا",
    "رفع ومتابعة القضايا",
    "الخدمات القضائية",
  ],
  "family-documentation": [
    "خدمات التوثيقات الاسرية",
    "وثائق الزواج والطلاق",
    "الشهادات الاسرية",
    "خدمات التوثيق",
  ],
  "family-reconciliation": [
    "الصلح والارشاد الاسري",
    "خدمات التصالح",
    "حل الخلافات الاسرية",
    "الدعم الاسري",
  ],
  "copies-documents": [
    "النسخ والمستندات",
    "نسخ الاحكام والمحاضر",
    "صور مستندات القضية",
    "التحقق من الوثائق",
  ],
};

const serviceReplyOverrides: Record<
  string,
  Pick<KnowledgeEntry, "text" | "gulfText" | "links">
> = {
  "file-new-case": {
    text: "الخدمة المناسبة هي «قيد دعوى جديدة». افتح البوابة الرسمية، وسجّل الدخول، واختر نوع الدعوى، ثم أكمل البيانات وأرفق المستندات المطلوبة. راجع دليل المتطلبات حسب موضوع الدعوى قبل الإرسال.",
    gulfText:
      "الخدمة المناسبة لك هي «قيد دعوى جديدة». افتح البوابة الرسمية وسجّل الدخول، واختَر نوع الدعوى، وبعدها كمّل البيانات وارفع المستندات المطلوبة. راجع دليل المتطلبات حسب موضوع دعواك قبل الإرسال.",
    links: [
      externalLink("فتح خدمة قيد دعوى جديدة", "https://eservices.sjc.gov.qa/"),
      pageLink("مراجعة دليل المتطلبات", "/family-services#requirements-guide"),
    ],
  },
};

const seenServices = new Set<string>();
const serviceKnowledge: KnowledgeEntry[] = courtServiceGroups.flatMap(group => {
  const groupEntry: KnowledgeEntry = {
    id: `group-${group.id}`,
    title: group.title,
    examples: [
      group.title,
      group.description,
      ...(groupExamples[group.id] ?? []),
    ],
    text: group.description,
    links: [pageLink(`عرض ${group.title}`, `/family-services#${group.id}`)],
  };

  const entries = group.services.flatMap(service => {
    if (seenServices.has(service.id)) return [];
    seenServices.add(service.id);
    const replyOverride = serviceReplyOverrides[service.id];
    return [
      {
        id: `service-${service.id}`,
        title: service.title,
        examples: [
          service.title,
          service.description,
          `اريد ${service.title}`,
          `كيف استخدم ${service.title}`,
          `وين الاقي ${service.title}`,
          ...(serviceExamples[service.id] ?? []),
        ],
        text:
          replyOverride?.text ??
          `الخدمة المناسبة هي «${service.title}»: ${service.description}. يمكنك فتحها مباشرة من الرابط الرسمي التالي.`,
        gulfText:
          replyOverride?.gulfText ??
          `الخدمة المناسبة لك هي «${service.title}»: ${service.description}. تقدر تفتحها مباشرة من الرابط الرسمي التالي.`,
        links: replyOverride?.links ?? [
          externalLink(`فتح خدمة ${service.title}`, service.href),
        ],
      } satisfies KnowledgeEntry,
    ];
  });

  return [groupEntry, ...entries];
});

const seenEnglishServices = new Set<string>();
const englishServiceKnowledge: KnowledgeEntry[] = courtServiceGroups.flatMap(
  group => {
    const groupCopy = familyServiceEnglishCopy[group.id];
    const groupEntry: KnowledgeEntry = {
      id: `group-${group.id}`,
      title: groupCopy.title,
      examples: [
        groupCopy.title,
        groupCopy.description,
        `show me ${groupCopy.title}`,
        `I need ${groupCopy.title}`,
      ],
      text: groupCopy.description,
      links: [
        pageLink(`View ${groupCopy.title}`, `/family-services#${group.id}`),
      ],
    };

    const entries = group.services.flatMap(service => {
      if (seenEnglishServices.has(service.id)) return [];
      seenEnglishServices.add(service.id);
      const serviceCopy = familyServiceEnglishCopy[service.id];
      return [
        {
          id: `service-${service.id}`,
          title: serviceCopy.title,
          examples: [
            serviceCopy.title,
            serviceCopy.description,
            `I need to ${serviceCopy.title}`,
            `How do I ${serviceCopy.title}`,
            `Where can I ${serviceCopy.title}`,
            ...(englishServiceExamples[service.id] ?? []),
          ],
          text: `The relevant service is “${serviceCopy.title}”. ${serviceCopy.description} You can open it through the official link below.`,
          links: [externalLink(`Open ${serviceCopy.title}`, service.href)],
        } satisfies KnowledgeEntry,
      ];
    });

    return [groupEntry, ...entries];
  }
);

const requirementExtraExamples: Record<string, string[]> = {
  "requirements-divorce": [
    "اوراق الطلاق",
    "ابي اطلق وش المطلوب",
    "شنو احتاج للطلاق",
    "مستندات دعوى الطلاق",
    "كيف ارفع طلاق",
  ],
  "requirements-custody": [
    "اوراق الحضانة",
    "ابي ارفع حضانة",
    "شنو المطلوب للحضانة",
    "مستندات قضية حضانة",
    "حقوق عيالي",
  ],
  "requirements-alimony": [
    "اوراق النفقة",
    "ابي ارفع نفقة",
    "شنو المطلوب للنفقة",
    "مصاريف العيال",
    "طلب مصروف الابناء",
  ],
  "requirements-documentation": [
    "اوراق التوثيق",
    "ماذا احتاج للتوثيق",
    "شنو المطلوب لتوثيق عقد",
    "توثيق اقرار",
    "متطلبات وثيقة اسرية",
  ],
};

const requirementKnowledge: KnowledgeEntry[] = familyRequirements.map(
  requirement => ({
    id: requirement.id,
    title: requirement.title,
    examples: [
      requirement.title,
      requirement.lead,
      ...requirement.items,
      ...(requirementExtraExamples[requirement.id] ?? []),
    ],
    text: `${requirement.lead} ${requirement.items.join(" ")}`,
    gulfText: `${requirement.lead} ${requirement.items.join(" ")}`,
    links: [
      pageLink(
        `عرض ${requirement.title}`,
        `/family-services#${requirement.id}`
      ),
      externalLink("عرض الدليل الرسمي", requirement.href),
    ],
  })
);

const englishRequirementKnowledge: KnowledgeEntry[] = familyRequirements.map(
  requirement => ({
    id: requirement.id,
    title: requirement.titleEn,
    examples: [requirement.titleEn, requirement.leadEn, ...requirement.itemsEn],
    text: `${requirement.leadEn} ${requirement.itemsEn.join(" ")}`,
    links: [
      pageLink(
        `View ${requirement.titleEn}`,
        `/family-services#${requirement.id}`
      ),
      externalLink("Open the official guide", requirement.href),
    ],
  })
);

const knowledgeByLanguage: Record<GuideLanguage, KnowledgeEntry[]> = {
  ar: [...requirementKnowledge, ...staticKnowledge, ...serviceKnowledge],
  en: [
    ...englishRequirementKnowledge,
    ...englishStaticKnowledge,
    ...englishServiceKnowledge,
  ],
};

const dialectPhrases: Array<[string, string]> = [
  ["وش اسوي", "ماذا افعل"],
  ["شنو اسوي", "ماذا افعل"],
  ["ايش اسوي", "ماذا افعل"],
  ["شسوي", "ماذا افعل"],
  ["وشلون", "كيف"],
  ["شلون", "كيف"],
  ["ازاي", "كيف"],
  ["فين", "اين"],
  ["وين", "اين"],
  ["ابغى", "اريد"],
  ["ابغي", "اريد"],
  ["بغيت", "اريد"],
  ["ابي", "اريد"],
  ["ودي", "اريد"],
  ["عايزه", "اريد"],
  ["عايزة", "اريد"],
  ["عاوزة", "اريد"],
  ["عايز", "اريد"],
  ["عاوز", "اريد"],
  ["احتاج", "اريد"],
  ["اروح", "اذهب"],
  ["اودي", "اذهب"],
  ["مو", "ليس"],
  ["مب", "ليس"],
  ["دعوه", "دعوي"],
  ["قضيه", "دعوي"],
  ["اوراق", "مستندات"],
  ["معامله", "خدمه"],
  ["عيال", "ابناء"],
  ["فلوس", "رسوم"],
  ["دوامهم", "ساعات العمل"],
  ["رقمهم", "رقم التواصل"],
  ["شنو", "ماذا"],
  ["ايش", "ماذا"],
  ["وش", "ماذا"],
];

const canonicalWords: Record<string, string> = {
  دعاوي: "دعوي",
  دعوات: "دعوي",
  قضيه: "دعوي",
  قضايا: "دعوي",
  ارفع: "تقديم",
  اقدم: "تقديم",
  قدم: "تقديم",
  قيد: "تقديم",
  ابدا: "تقديم",
  اطلع: "اصدار",
  استخرج: "اصدار",
  استخراج: "اصدار",
  اجيب: "اصدار",
  اوثق: "توثيق",
  تصديق: "توثيق",
  وثيقه: "توثيق",
  وثائق: "توثيق",
  متطلبات: "مطلوب",
  مستندات: "مطلوب",
  اوراق: "مطلوب",
  اتواصل: "تواصل",
  اكلم: "تواصل",
  اتصل: "تواصل",
  هاتف: "تواصل",
  موقع: "مكان",
  عنوان: "مكان",
  اوصل: "مكان",
  اذهب: "مكان",
  ولد: "طفل",
  بنت: "طفل",
  ابناء: "طفل",
  اطفال: "طفل",
  اولاد: "طفل",
  حضانه: "حضانه",
  حضانة: "حضانه",
  زوجه: "زوج",
  زوجيه: "زوج",
  متزوج: "زوج",
  زواج: "زواج",
  اطلق: "طلاق",
  اتطلق: "طلاق",
  تطلق: "طلاق",
  طلق: "طلاق",
  الطلق: "طلاق",
  مطلق: "طلاق",
  مطلقه: "طلاق",
  انفصل: "طلاق",
  انفصال: "طلاق",
  نفقه: "نفقه",
  مصاريف: "نفقه",
  اعاله: "نفقه",
  استراتيجيه: "استراتيجيه",
  استراتجيه: "استراتيجيه",
  استراتيجي: "استراتيجيه",
  استراتجي: "استراتيجيه",
  رؤيه: "رؤيه",
  روية: "رؤيه",
  رساله: "رساله",
  اولويات: "اولويه",
  أولويات: "اولويه",
  احصائيات: "احصائيه",
  ارقام: "احصائيه",
  إحصائيات: "احصائيه",
  ريس: "رئيس",
  الرئيس: "رئيس",
  اختصاصات: "اختصاص",
  تختص: "اختصاص",
};

const stopWords = new Set([
  "في",
  "من",
  "على",
  "الى",
  "عن",
  "او",
  "ثم",
  "مع",
  "هذا",
  "هذه",
  "ذلك",
  "انا",
  "انت",
  "هو",
  "هي",
  "لي",
  "عندي",
  "لو",
  "هل",
  "يا",
]);

export function normalizeArabic(value: string) {
  let normalized = value
    .toLowerCase()
    .replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed]/g, "")
    .replace(/ـ/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\u0621-\u063a\u0641-\u064a0-9a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  [...dialectPhrases]
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([phrase, replacement]) => {
      normalized = normalized.replaceAll(phrase, replacement);
    });

  return normalized.replace(/\s+/g, " ").trim();
}

function stemWord(word: string) {
  let stem = canonicalWords[word] ?? word;
  if (stem.startsWith("ال") && stem.length > 5) stem = stem.slice(2);
  if (stem.startsWith("و") && stem.length > 5) stem = stem.slice(1);
  return canonicalWords[stem] ?? stem;
}

const englishCanonicalWords: Record<string, string> = {
  cases: "case",
  claims: "case",
  lawsuit: "case",
  lawsuits: "case",
  services: "service",
  portal: "service",
  apply: "application",
  applying: "application",
  submit: "application",
  filing: "application",
  file: "application",
  documents: "requirement",
  document: "requirement",
  paperwork: "requirement",
  papers: "requirement",
  required: "requirement",
  requirements: "requirement",
  address: "location",
  directions: "location",
  map: "location",
  phone: "contact",
  call: "contact",
  email: "contact",
  hours: "working",
  opening: "working",
  timings: "working",
  children: "child",
  kids: "child",
  alimony: "maintenance",
  support: "maintenance",
  marriage: "marry",
  married: "marry",
  wedding: "marry",
  divorced: "divorce",
  divorcing: "divorce",
  separation: "divorce",
  separate: "divorce",
  custodial: "custody",
  parenting: "custody",
  visitation: "custody",
  spouse: "partner",
  husband: "partner",
  wife: "partner",
  inheritance: "heir",
  inherited: "heir",
  estate: "heir",
  succession: "heir",
  lawyer: "legal",
  attorney: "legal",
  solicitor: "legal",
};

const englishStopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "at",
  "can",
  "do",
  "for",
  "from",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "please",
  "the",
  "this",
  "to",
  "we",
  "with",
  "you",
  "want",
  "need",
  "get",
  "would",
  "like",
  "should",
  "could",
  "what",
  "when",
  "where",
  "who",
  "why",
  "how",
]);

function normalizeEnglish(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeText(value: string, language: GuideLanguage) {
  return language === "ar" ? normalizeArabic(value) : normalizeEnglish(value);
}

function stemToken(word: string, language: GuideLanguage) {
  if (language === "ar") return stemWord(word);
  let stem = englishCanonicalWords[word] ?? word;
  if (stem.endsWith("ies") && stem.length > 5) stem = `${stem.slice(0, -3)}y`;
  else if (stem.endsWith("ing") && stem.length > 6) stem = stem.slice(0, -3);
  else if (stem.endsWith("ed") && stem.length > 5) stem = stem.slice(0, -2);
  else if (stem.endsWith("s") && stem.length > 4) stem = stem.slice(0, -1);
  return englishCanonicalWords[stem] ?? stem;
}

function tokenizeText(value: string, language: GuideLanguage) {
  const ignored = language === "ar" ? stopWords : englishStopWords;
  return normalizeText(value, language)
    .split(" ")
    .map(word => stemToken(word, language))
    .filter(word => word.length > 1 && !ignored.has(word));
}

type SparseVector = Map<string, number>;

function rawVector(value: string, language: GuideLanguage): SparseVector {
  const tokens = tokenizeText(value, language);
  const vector = new Map<string, number>();
  const add = (key: string, weight: number) =>
    vector.set(key, (vector.get(key) ?? 0) + weight);

  tokens.forEach((token, index) => {
    add(`w:${token}`, 2.8);
    if (index < tokens.length - 1) add(`b:${token}_${tokens[index + 1]}`, 3.8);
    const padded = `^${token}$`;
    for (let cursor = 0; cursor <= padded.length - 3; cursor += 1)
      add(`c:${padded.slice(cursor, cursor + 3)}`, 0.32);
  });

  return vector;
}

type SearchIndex = {
  entries: KnowledgeEntry[];
  examples: Array<{
    entry: KnowledgeEntry;
    source: string;
    vector: SparseVector;
  }>;
  weightedVector: (value: string) => SparseVector;
};

function createSearchIndex(
  entries: KnowledgeEntry[],
  language: GuideLanguage
): SearchIndex {
  const rawExamples = entries.flatMap(entry =>
    Array.from(new Set([entry.title, ...entry.examples, entry.text])).map(
      source => ({ entry, source, vector: rawVector(source, language) })
    )
  );
  const documentFrequency = new Map<string, number>();
  rawExamples.forEach(({ vector }) =>
    vector.forEach((_, feature) =>
      documentFrequency.set(feature, (documentFrequency.get(feature) ?? 0) + 1)
    )
  );

  const weightedVector = (value: string) => {
    const vector = rawVector(value, language);
    const weighted = new Map<string, number>();
    let magnitude = 0;
    vector.forEach((termWeight, feature) => {
      const idf =
        Math.log(
          (rawExamples.length + 1) / ((documentFrequency.get(feature) ?? 0) + 1)
        ) + 1;
      const weight = termWeight * idf;
      weighted.set(feature, weight);
      magnitude += weight * weight;
    });
    const norm = Math.sqrt(magnitude) || 1;
    weighted.forEach((weight, feature) => weighted.set(feature, weight / norm));
    return weighted;
  };

  return {
    entries,
    weightedVector,
    examples: rawExamples.map(({ entry, source }) => ({
      entry,
      source,
      vector: weightedVector(source),
    })),
  };
}

const searchIndexes: Record<GuideLanguage, SearchIndex> = {
  ar: createSearchIndex(knowledgeByLanguage.ar, "ar"),
  en: createSearchIndex(knowledgeByLanguage.en, "en"),
};

function cosineSimilarity(left: SparseVector, right: SparseVector) {
  const [smaller, larger] =
    left.size < right.size ? [left, right] : [right, left];
  let score = 0;
  smaller.forEach((weight, feature) => {
    score += weight * (larger.get(feature) ?? 0);
  });
  return score;
}

function editDistance(left: string, right: string) {
  const previous = Array.from(
    { length: right.length + 1 },
    (_, index) => index
  );
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitution =
        previous[rightIndex - 1] +
        (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1);
      current[rightIndex] = Math.min(
        previous[rightIndex] + 1,
        current[rightIndex - 1] + 1,
        substitution
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length];
}

function tokensAreClose(left: string, right: string) {
  if (left === right) return true;
  const longest = Math.max(left.length, right.length);
  if (longest < 4) return false;
  return editDistance(left, right) <= (longest >= 8 ? 2 : 1);
}

function isGulfDialect(question: string) {
  return [
    "شنو",
    "وش",
    "شلون",
    "وين",
    "ابي",
    "أبي",
    "ابغي",
    "أبغي",
    "ابغى",
    "أبغى",
    "ودي",
    "شسوي",
    "مو",
    "مب",
    "هلا",
    "مرحبتين",
    "ايش",
  ].some(term => question.includes(term));
}

function inferQuestionLanguage(
  question: string,
  fallback: GuideLanguage
): GuideLanguage {
  if (/[\u0600-\u06ff]/.test(question)) return "ar";
  if (/[a-z]/i.test(question)) return "en";
  return fallback;
}

function isContextualFollowUp(question: string, language: GuideLanguage) {
  const normalized = normalizeText(question, language);
  const patterns =
    language === "ar"
      ? [
          "ماذا مطلوب",
          "كيف افعل",
          "كيف اقدم",
          "اين اذهب",
          "كم رسوم",
          "وبعدين",
          "ماذا بعد",
          "مستندات مطلوب",
          "اوراق مطلوب",
        ]
      : [
          "requirement",
          "how do that",
          "how apply",
          "where go",
          "how much",
          "what next",
          "and then",
          "which document",
        ];
  return (
    tokenizeText(question, language).length <= 5 &&
    patterns.some(pattern => normalized.includes(pattern))
  );
}

function isRequirementsFollowUp(question: string, language: GuideLanguage) {
  const tokens = tokenizeText(question, language);
  return tokens.includes(language === "ar" ? "مطلوب" : "requirement");
}

function addIntentBonus(
  bonuses: Map<string, number>,
  id: string,
  amount: number
) {
  bonuses.set(id, Math.max(amount, bonuses.get(id) ?? 0));
}

function getIntentBonuses(question: string, language: GuideLanguage) {
  const bonuses = new Map<string, number>();
  const normalized = normalizeText(question, language);

  if (language === "en") {
    const documentCue =
      /\b(document|documents|paperwork|papers|prepare|bring|take with me|required|requirements)\b/.test(
        normalized
      );
    const divorce = /\b(divorce|divorced|separate|separation)\b/.test(
      normalized
    );
    const custody = /\b(custody|custodial)\b/.test(normalized);
    const maintenance =
      /\b(maintenance|alimony|child support|does not pay|not paying)\b/.test(
        normalized
      );

    if (documentCue) {
      if (divorce) addIntentBonus(bonuses, "requirements-divorce", 0.62);
      else if (custody) addIntentBonus(bonuses, "requirements-custody", 0.62);
      else if (maintenance)
        addIntentBonus(bonuses, "requirements-alimony", 0.62);
      else addIntentBonus(bonuses, "requirements-overview", 0.58);
    } else {
      if (divorce) addIntentBonus(bonuses, "divorce-pathway", 0.5);
      if (custody) addIntentBonus(bonuses, "custody-pathway", 0.56);
      if (maintenance) addIntentBonus(bonuses, "maintenance-pathway", 0.58);
    }

    if (
      /\b(reconciliation|mediation)\b/.test(normalized) &&
      /\b(track|follow|file|appointment)\b/.test(normalized)
    ) {
      addIntentBonus(bonuses, "service-reconciliation-follow-up", 0.68);
    }
    if (
      /\b(court|judiciary|family)\b.*\b(strategy|strategic|2025|2030)\b|\bstrategy\b/.test(
        normalized
      )
    )
      addIntentBonus(bonuses, "strategy", 0.92);
    if (/\b(vision)\b/.test(normalized))
      addIntentBonus(bonuses, "strategy-vision", 0.92);
    if (/\b(mission)\b/.test(normalized))
      addIntentBonus(bonuses, "strategy-mission", 0.92);
    if (/\b(strategic priorities|priorities)\b/.test(normalized))
      addIntentBonus(bonuses, "strategy-priorities", 0.92);
    return bonuses;
  }

  const documentCue =
    /(مستند|اوراق|ورق|المطلوب|مطلوب|اجهز|جهز|اخذ معي|اخذ معاي|اخذ وياي|ااخذ معي|احتاج قبل|اجيب قبل|لازم.{0,12}معي|لازم.{0,12}معاي|لازم.{0,12}وياي|معي.{0,18}احتاج|معاي.{0,18}احتاج|وياي.{0,18}احتاج|شي ثاني)/.test(
      normalized
    );
  const divorce = /(طلاق|الطلق|اطلق|اتطلق|تطلق|انفصل)/.test(normalized);
  const custody = /(حضانه|حضان)/.test(normalized);
  const maintenance = /(نفقه|مصاريف|مصروف|يصرف|ما يدفع|مايدفع)/.test(
    normalized
  );
  const documentation = /(توثيق|اوثق|وثيقه)/.test(normalized);

  if (documentCue) {
    if (divorce) addIntentBonus(bonuses, "requirements-divorce", 0.64);
    else if (custody) addIntentBonus(bonuses, "requirements-custody", 0.64);
    else if (maintenance) addIntentBonus(bonuses, "requirements-alimony", 0.64);
    else if (documentation)
      addIntentBonus(bonuses, "requirements-documentation", 0.64);
    else addIntentBonus(bonuses, "requirements-overview", 0.6);
  } else {
    if (divorce) addIntentBonus(bonuses, "divorce-pathway", 0.5);
    if (custody) addIntentBonus(bonuses, "custody-pathway", 0.58);
    if (maintenance) addIntentBonus(bonuses, "maintenance-pathway", 0.62);
  }

  const reconciliation = /(صلح|تصالح)/.test(normalized);
  const followUp = /(اتابع|تابع|متابعه|ملف|موعد|وين وصل)/.test(normalized);
  if (reconciliation && followUp)
    addIntentBonus(bonuses, "service-reconciliation-follow-up", 0.72);
  else if (reconciliation && /(ابي|اريد|نبي|نسجل|طلب|نتصالح)/.test(normalized))
    addIntentBonus(bonuses, "service-family-reconciliation-request", 0.72);

  const maritalGuidance =
    /(استشاره زوجيه|استشاره اسريه|ارشاد اسري|مستشار اسري|خلافات.{0,24}استشاره|مشاكل.{0,24}استشاره)/.test(
      normalized
    );
  if (maritalGuidance) addIntentBonus(bonuses, "service-family-guidance", 0.86);

  if (/(الخلع|اخلع|خلع زوج|اخلعه)/.test(normalized)) {
    addIntentBonus(bonuses, "service-divorce-dislocation", 0.86);
  }

  if (custody && maintenance)
    addIntentBonus(bonuses, "custody-maintenance-pathway", 0.92);

  const lostMarriageDocument =
    /(ضيعت|ضاع|مفقود|بدل فاقد|نسخه).{0,24}(وثيقه الزواج|عقد الزواج)|(وثيقه الزواج|عقد الزواج).{0,24}(ضيعت|ضاع|مفقود|بدل فاقد|نسخه)/.test(
      normalized
    );
  if (lostMarriageDocument)
    addIntentBonus(bonuses, "lost-marriage-document", 0.82);

  const explicitLocation =
    /(وين المحكمه|المحكمه وين|اين المحكمه|المحكمه اين|موقع المحكمه|عنوان المحكمه|كيف اوصل|مكان المحكمه)/.test(
      normalized
    );
  const visitingHours =
    /(متى دوام|اوقات الدوام|وقت الدوام|متى تفتح|ساعات العمل)/.test(normalized);
  if (explicitLocation && visitingHours)
    addIntentBonus(bonuses, "court-visit", 0.82);
  if (visitingHours) addIntentBonus(bonuses, "working-hours", 0.66);
  if (explicitLocation && !documentCue)
    addIntentBonus(bonuses, "court-location", 0.58);

  // High-signal institutional terms must outrank generic words such as "المحكمة".
  // Character-level similarity remains available for misspellings, while these rules
  // anchor the intended topic before the fuzzy score is calibrated.
  if (
    /(استراتيجيه|استراتجيه|خطه.{0,18}(المحكمه|القضاء|المجلس)|2025.{0,8}2030)/.test(
      normalized
    )
  ) {
    addIntentBonus(bonuses, "strategy", 0.96);
  }
  if (
    /(رؤيه|رويه).{0,18}(المحكمه|الاسره|استراتيجيه)|ما.{0,8}(رؤيه|رويه)/.test(
      normalized
    )
  ) {
    addIntentBonus(bonuses, "strategy-vision", 0.98);
  }
  if (
    /رساله.{0,18}(المحكمه|الاسره|استراتيجيه)|ما.{0,8}رساله/.test(normalized)
  ) {
    addIntentBonus(bonuses, "strategy-mission", 0.98);
  }
  if (
    /(اولويه|اولويات|محاور).{0,20}(استراتيجيه|المحكمه)|خطط تطوير المحكمه/.test(
      normalized
    )
  ) {
    addIntentBonus(bonuses, "strategy-priorities", 0.98);
  }
  if (
    /(كفاءه الفصل|سرعه الفصل|اداره الدعاوي|جوده الاحكام|ضمانات التقاضي)/.test(
      normalized
    )
  ) {
    addIntentBonus(bonuses, "strategy-case-efficiency", 0.94);
  }
  if (
    /(ب?العداله التصالحيه|العداله التصالحيه|عداله تصالحيه|ب?التماسك الاسري|تماسك اسري|حلول رضاييه|وساطه وتصالح)/.test(
      normalized
    )
  ) {
    addIntentBonus(bonuses, "strategy-family-cohesion", 0.94);
  }
  if (/(عداله رقميه|رقمنه المحكمه|رحله المتقاضي الرقميه)/.test(normalized)) {
    addIntentBonus(bonuses, "strategy-digital-justice", 0.94);
  }
  if (/(حوكمه|قياس الاداء|توحيد الاجراءات|جوده الخدمات)/.test(normalized)) {
    addIntentBonus(bonuses, "strategy-governance", 0.94);
  }
  if (
    /(من.{0,8}رئيس المحكمه|اسم رئيس|حارب راشد المهندي|سيره.{0,12}رئيس)/.test(
      normalized
    )
  ) {
    addIntentBonus(bonuses, "court-president", 0.94);
  }
  if (
    /(قانون|قرار).{0,12}(22|23).{0,12}2006|متي تاسست|كيف تاسست|انشاء محكمه الاسره/.test(
      normalized
    )
  ) {
    addIntentBonus(bonuses, "court-legal-basis", 0.94);
  }
  if (
    /(قاضي فرد|ثلاثه قضاه|محكمه.{0,18}(الجزييه|جزييه)|محكمه.{0,18}(الكليه|كليه)|الفرق.{0,24}(الجزييه|جزييه).{0,12}(الكليه|كليه)|درجات التقاضي|دوائر المحكمه)/.test(
      normalized
    )
  ) {
    addIntentBonus(bonuses, "court-structure", 0.94);
  }
  if (
    /(تنفيذ الاحكام|قاضي التنفيذ|منازعات التنفيذ|اوامر وقتيه|امر وقتي)/.test(
      normalized
    )
  ) {
    addIntentBonus(bonuses, "court-enforcement", 0.94);
  }
  if (/(تركات|حقوق الورثه|شوون القاصرين|منازعات الميراث)/.test(normalized)) {
    addIntentBonus(bonuses, "court-estates-minors", 0.9);
  }
  if (
    /(اختصاص المحكمه|اختصاصات المحكمه|اي قضايا.{0,10}المحكمه|ماذا تنظر المحكمه)/.test(
      normalized
    )
  ) {
    addIntentBonus(bonuses, "court-jurisdiction", 0.9);
  }
  if (
    /(اخر الاخبار|اخبار المحكمه|عرض جميع الاخبار|احدث اخبار)/.test(normalized)
  ) {
    addIntentBonus(bonuses, "latest-news", 0.9);
  }
  if (/برنامج كيف اصبحت|12 حلقه/.test(normalized))
    addIntentBonus(bonuses, "news-family-court-radio", 0.94);
  if (/ذوي الاعاقه|الامم المتحده/.test(normalized))
    addIntentBonus(bonuses, "news-accessible-justice", 0.94);
  if (/مهنتي مستقبلي|طلبه.{0,12}العمل القضايي/.test(normalized))
    addIntentBonus(bonuses, "news-future-careers", 0.94);
  if (/(اقيم الموقع|تقييم الموقع|اعطي رايي|النجوم)/.test(normalized))
    addIntentBonus(bonuses, "site-rating", 0.9);

  return bonuses;
}

export function retrieveGuideAnswer(
  question: string,
  requestedLanguage: GuideLanguage = "ar",
  previousIntentId?: string
): GuideRetrieval | null {
  const language = inferQuestionLanguage(question, requestedLanguage);
  const index = searchIndexes[language];
  const previousEntry = previousIntentId
    ? index.entries.find(entry => entry.id === previousIntentId)
    : undefined;
  const contextual = Boolean(
    previousEntry && isContextualFollowUp(question, language)
  );
  const searchQuestion = contextual
    ? `${previousEntry?.title} ${question}`
    : question;
  const query = index.weightedVector(searchQuestion);
  const normalizedQuestion = normalizeText(question, language);
  const queryTokens = new Set(tokenizeText(searchQuestion, language));
  const intentBonuses = getIntentBonuses(searchQuestion, language);
  if (!query.size) return null;

  const scores = new Map<string, { entry: KnowledgeEntry; score: number }>();
  index.examples.forEach(({ entry, vector }) => {
    const normalizedTitle = normalizeText(entry.title, language);
    const titleTokens = tokenizeText(entry.title, language);
    const overlap =
      titleTokens.filter(token =>
        Array.from(queryTokens).some(queryToken =>
          tokensAreClose(token, queryToken)
        )
      ).length / Math.max(1, titleTokens.length);
    const exactTitleBonus = normalizedQuestion === normalizedTitle ? 0.28 : 0;
    const containedTitleBonus =
      normalizedTitle.length > 3 && normalizedQuestion.includes(normalizedTitle)
        ? 0.14
        : 0;
    const contextBonus = contextual && previousEntry?.id === entry.id ? 0.2 : 0;
    const intentBonus = intentBonuses.get(entry.id) ?? 0;
    const score =
      cosineSimilarity(query, vector) +
      exactTitleBonus +
      containedTitleBonus +
      overlap * 0.3 +
      contextBonus +
      intentBonus;
    const previous = scores.get(entry.id);
    if (!previous || score > previous.score)
      scores.set(entry.id, { entry, score });
  });

  const ranked = Array.from(scores.values()).sort((a, b) => b.score - a.score);
  const best = ranked[0];
  if (!best || best.score < 0.11) return null;
  const runnerUpScore = ranked[1]?.score ?? 0;
  const scoreMargin = Math.max(0, best.score - runnerUpScore);
  const calibratedConfidence =
    1 - Math.exp(-(best.score + Math.min(0.18, scoreMargin * 0.45)) * 1.9);

  const answer: GuideAnswer = {
    id: best.entry.id,
    title: best.entry.title,
    text:
      isGulfDialect(question) && best.entry.gulfText
        ? best.entry.gulfText
        : best.entry.text,
    links: best.entry.links,
  };

  return {
    answer,
    confidence: Math.min(0.99, Math.max(0.01, calibratedConfidence)),
    alternatives: ranked
      .slice(1)
      .filter(({ score }) => score >= Math.max(0.11, best.score - 0.1))
      .slice(0, 2)
      .map(({ entry }) => ({
        id: entry.id,
        title: entry.title,
        text: entry.text,
        links: entry.links,
      })),
  };
}

export function buildGuideReply(
  question: string,
  id: number,
  requestedLanguage: GuideLanguage = "ar",
  previousIntentId?: string
) {
  const language = inferQuestionLanguage(question, requestedLanguage);
  const previousEntry = previousIntentId
    ? searchIndexes[language].entries.find(
        entry => entry.id === previousIntentId
      )
    : undefined;
  if (
    previousEntry?.id.startsWith("service-") &&
    isRequirementsFollowUp(question, language)
  ) {
    return {
      id,
      sender: "guide" as const,
      intentId: previousEntry.id,
      matchedTitle: previousEntry.title,
      confidence: 100,
      text:
        language === "ar"
          ? `بالنسبة إلى «${previousEntry.title}»، قد تختلف المستندات بحسب بيانات الطلب. افتح الخدمة الرسمية أولًا لعرض المتطلبات الخاصة بحالتك قبل الإرسال.`
          : `For “${previousEntry.title}”, the required documents can vary with the application details. Open the official service first to review the requirements for your case before submitting.`,
      links: previousEntry.links,
    };
  }
  const result = retrieveGuideAnswer(question, language, previousIntentId);
  if (!result) {
    return {
      id,
      sender: "guide" as const,
      intentId: "unknown",
      matchedTitle: language === "ar" ? "إرشاد عام" : "General guidance",
      confidence: 0,
      text:
        language === "ar"
          ? "قارنت سؤالك بجميع الخدمات والموضوعات المتاحة، لكن لا توجد مطابقة آمنة حتى الآن. يمكنك فتح دليل الخدمات، أو كتابة الإجراء الذي تريد إنجازه، أو التواصل مباشرة على 16007."
          : "I compared your question with every available service and topic, but there is no safe match yet. You can browse the service guide, describe the action you want to complete, or call 16007.",
      links:
        language === "ar"
          ? [
              pageLink("عرض الخدمات", "/family-services#services-view"),
              pageLink("دليل المتطلبات", "/family-services#requirements-guide"),
              contactPage,
            ]
          : [
              pageLink("View services", "/family-services#services-view"),
              pageLink(
                "Requirements guide",
                "/family-services#requirements-guide"
              ),
              contactPageEn,
            ],
    };
  }

  if (["greeting", "thanks", "decline"].includes(result.answer.id)) {
    return {
      id,
      sender: "guide" as const,
      intentId: result.answer.id,
      text: result.answer.text,
      links: result.answer.links,
    };
  }

  return {
    id,
    sender: "guide" as const,
    intentId: result.answer.id,
    matchedTitle: result.answer.title,
    confidence: Math.round(result.confidence * 100),
    text: result.answer.text,
    links: result.answer.links,
  };
}

export const guideKnowledgeStats = {
  topics: knowledgeByLanguage.ar.length,
  services: seenServices.size,
  examples: searchIndexes.ar.examples.length + searchIndexes.en.examples.length,
};
