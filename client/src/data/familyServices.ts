import {
  Agreement01Icon,
  Airplane01Icon,
  CalendarHeartIcon,
  Certificate02Icon,
  ChildIcon,
  CourtHouseIcon,
  DocumentValidationIcon,
  FileValidationIcon,
  GiftIcon,
  HandHelpingIcon,
  HouseHeartIcon,
  JusticeScale01Icon,
  LegalDocument01Icon,
  LegalDocument02Icon,
  LicenseIcon,
  LinkSquare01Icon,
  PassportValidIcon,
  Stamp02Icon,
  UserEdit01Icon,
  UserGroupIcon,
  UserMultiple02Icon,
  UserRemove01Icon,
  WeddingIcon,
} from "@hugeicons/core-free-icons";

export type FamilyService = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: typeof Agreement01Icon;
};

export type FamilyServiceGroup = {
  id: string;
  title: string;
  description: string;
  services: FamilyService[];
};

export const familyServiceGroups: FamilyServiceGroup[] = [
  {
    id: "marriage-divorce",
    title: "الزواج والطلاق",
    description: "خدمات المواعيد والوثائق والإثباتات المرتبطة بالزواج والطلاق.",
    services: [
      {
        id: "marriage-appointment",
        title: "حجز موعد زواج",
        description: "حجز موعد لمراجعة المحكمة لإتمام عقد الزواج",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/marriage/Marriageappointment",
        icon: CalendarHeartIcon,
      },
      {
        id: "marriage-continuity",
        title: "شهادة استمرار الزوجية",
        description: "إصدار شهادة استمرار الزوجية إلكترونياً",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/marriage/marriage-continuity-certificate",
        icon: HouseHeartIcon,
      },
      {
        id: "non-marriage-proof",
        title: "شهادة إثبات عدم الزواج",
        description: "إصدار شهادة بعدم الزواج إلكترونياً",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/marriage/non-marriage-proof-certificate",
        icon: Certificate02Icon,
      },
      {
        id: "marriage-card",
        title: "البطاقة الزوجية",
        description: "إصدار بدل فاقد أو تالف للبطاقة الزوجية",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/marriage/marriage-card",
        icon: WeddingIcon,
      },
      {
        id: "friendly-divorce",
        title: "إثبات الطلاق بالتراضي",
        description: "إتمام وإصدار وثيقة الطلاق بالتراضي",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/divorce/Friendlydivorceproof",
        icon: Agreement01Icon,
      },
      {
        id: "divorce-creation",
        title: "إنشاء إشهاد طلاق",
        description: "تقديم طلب إنشاء إشهاد طلاق عبر البوابة الرسمية",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/divorce/divorceCreation",
        icon: LegalDocument01Icon,
      },
      {
        id: "marriage-officers",
        title: "المأذونون الشرعيون",
        description: "الوصول إلى صفحة المأذونين الشرعيين المعتمدة",
        href: "https://www.sjc.gov.qa/AR/Pages/MarriageOfficers.aspx",
        icon: CourtHouseIcon,
      },
      {
        id: "divorce-dislocation",
        title: "إثبات الخلع",
        description: "تقديم طلب إثبات الخلع إلكترونياً",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/divorce/divorce-dislocation",
        icon: LinkSquare01Icon,
      },
      {
        id: "remarriage",
        title: "إثبات الرجعة",
        description: "تقديم طلب إثبات الرجعة عبر البوابة الرسمية",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/divorce/Remarriage",
        icon: JusticeScale01Icon,
      },
      {
        id: "external-marriage-attestation",
        title: "تصديق عقد زواج من خارج الدولة",
        description: "طلب تصديق عقد زواج صادر من خارج دولة قطر",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/marriage/attestation-external-marriage-contract",
        icon: Stamp02Icon,
      },
    ],
  },
  {
    id: "family-certificates",
    title: "التركات والشهادات الأسرية",
    description: "طلبات حصر الورثة والشهادات والإقرارات ذات الصلة بالأسرة.",
    services: [
      {
        id: "heirs-determination",
        title: "حصر الورثة",
        description: "إصدار صك حصر الورثة إلكترونياً",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/heir/HeirsDetermination",
        icon: UserGroupIcon,
      },
      {
        id: "intoxicant-effect",
        title: "شهادة إثبات أثر مُسكر",
        description: "تقديم طلب شهادة إثبات أثر مُسكر",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/certificates/AtharMaskar",
        icon: LicenseIcon,
      },
      {
        id: "travel-permission",
        title: "شهادة إذن سفر",
        description: "طلب إصدار شهادة إذن سفر",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/certificates/travel-issuance-certificate",
        icon: Airplane01Icon,
      },
      {
        id: "passport-permission",
        title: "شهادة إصدار جواز سفر",
        description: "طلب إصدار شهادة مرتبطة بإصدار جواز السفر",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/certificates/passport-issuance-certificate",
        icon: PassportValidIcon,
      },
      {
        id: "child-support",
        title: "شهادة نفقة طفل",
        description: "طلب إصدار شهادة نفقة طفل",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/certificates/childSupport",
        icon: ChildIcon,
      },
      {
        id: "relative-support",
        title: "شهادة إعالة الأقارب",
        description: "طلب إصدار شهادة إعالة الأقارب",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/certificates/relativesupport",
        icon: HandHelpingIcon,
      },
      {
        id: "relationship-proof",
        title: "شهادة إثبات صلة قرابة",
        description: "طلب إصدار شهادة تثبت صلة القرابة",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/certificates/proofofrelation",
        icon: UserMultiple02Icon,
      },
      {
        id: "acknowledgment",
        title: "شهادة إقرار",
        description: "تقديم طلب توثيق شهادة إقرار",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/certificates/acknowledgment-certificate",
        icon: DocumentValidationIcon,
      },
      {
        id: "witness-document",
        title: "توثيق شهادة شاهد",
        description: "تقديم طلب توثيق شهادة شاهد",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/certificates/witness-doc-certificate",
        icon: FileValidationIcon,
      },
      {
        id: "gift-certificate",
        title: "شهادة هبة",
        description: "تقديم طلب إصدار شهادة هبة",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/certificates/gift-certificate",
        icon: GiftIcon,
      },
      {
        id: "will-certificate",
        title: "شهادة وصية",
        description: "تقديم طلب إصدار شهادة وصية",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/certificates/will-certificate",
        icon: LegalDocument02Icon,
      },
    ],
  },
  {
    id: "agency-services",
    title: "الوكالات الأسرية",
    description: "خدمات تعديل صفة الوكيل أو إنهاء الوكالة عبر البوابة الرسمية.",
    services: [
      {
        id: "agent-isolation",
        title: "عزل وكيل",
        description: "تقديم طلب عزل وكيل إلكترونياً",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/general-info/agent-isolation",
        icon: UserRemove01Icon,
      },
      {
        id: "agent-resign",
        title: "تنحي وكيل",
        description: "تقديم طلب تنحي وكيل إلكترونياً",
        href: "https://tawtheeqat.sjc.gov.qa/SJC/#/services/general-info/agent-resign",
        icon: UserEdit01Icon,
      },
    ],
  },
];

const featuredServiceIds = [
  "heirs-determination",
  "friendly-divorce",
  "marriage-card",
  "non-marriage-proof",
  "marriage-continuity",
  "marriage-appointment",
] as const;

const allFamilyServices = familyServiceGroups.flatMap(group => group.services);

const electronicCourtPortal = "https://eservices.sjc.gov.qa/";
const litigantRequestsForm = "https://forms.cloud.microsoft/r/MgGrV4DwmR";
const maritalConsultationsForm =
  "https://forms.cloud.microsoft/pages/responsepage.aspx?id=1fH65s_5sU-aorLsyeS5IeMPr8scmsxPpS484X85VjRUNlJHVjI5RlQ1T0Y4Q1VNMktWRk5LMUE0Wi4u&route=shorturl";

export const courtServiceGroups: FamilyServiceGroup[] = [
  {
    id: "litigation-services",
    title: "خدمات التقاضي",
    description:
      "خدمات رفع الدعاوى ومتابعة الطلبات والمواعيد والإجراءات القضائية إلكترونياً.",
    services: [
      {
        id: "file-new-case",
        title: "قيد دعوى جديدة",
        description:
          "الانتقال إلى بوابة الخدمات الإلكترونية لبدء إجراءات قيد الدعوى",
        href: electronicCourtPortal,
        icon: LegalDocument01Icon,
      },
      {
        id: "follow-cases",
        title: "متابعة الدعاوى والطلبات",
        description: "متابعة حالة الدعاوى والطلبات القضائية المقدمة إلكترونياً",
        href: electronicCourtPortal,
        icon: CourtHouseIcon,
      },
      {
        id: "hearing-appointments",
        title: "مواعيد الجلسات",
        description: "الوصول إلى مواعيد الجلسات والخدمات المرتبطة بها",
        href: electronicCourtPortal,
        icon: CalendarHeartIcon,
      },
      {
        id: "court-requests",
        title: "الطلبات القضائية",
        description: "تقديم الطلبات والمستندات المرتبطة بالدعوى إلكترونياً",
        href: electronicCourtPortal,
        icon: FileValidationIcon,
      },
    ],
  },
  {
    id: "family-documentation",
    title: "خدمات التوثيقات الأسرية",
    description:
      "إجراءات ووثائق الزواج والطلاق والتركات والشهادات والوكالات الأسرية.",
    services: allFamilyServices,
  },
  {
    id: "family-reconciliation",
    title: "الصلح والإرشاد الأسري",
    description:
      "خدمات التصالح والإرشاد والدعم للمساعدة في معالجة الخلافات الأسرية.",
    services: [
      {
        id: "family-reconciliation-request",
        title: "طلب التصالح الأسري",
        description: "بدء إجراءات التصالح الأسري عبر القنوات القضائية الرسمية",
        href: maritalConsultationsForm,
        icon: Agreement01Icon,
      },
      {
        id: "reconciliation-follow-up",
        title: "متابعة ملف التصالح",
        description:
          "متابعة الطلبات والمواعيد المرتبطة بإجراءات التصالح الأسري",
        href: maritalConsultationsForm,
        icon: UserMultiple02Icon,
      },
      {
        id: "family-guidance",
        title: "الإرشاد والدعم الأسري",
        description: "الوصول إلى خدمات الإرشاد والمساندة الأسرية المتاحة",
        href: maritalConsultationsForm,
        icon: HandHelpingIcon,
      },
    ],
  },
  {
    id: "copies-documents",
    title: "النسخ والمستندات",
    description:
      "طلبات النسخ الرسمية ومحاضر الجلسات والمستندات القضائية ذات الصلة.",
    services: [
      {
        id: "judgment-copy",
        title: "طلب نسخة حكم",
        description: "طلب نسخة رسمية من الحكم عبر بوابة الخدمات الإلكترونية",
        href: litigantRequestsForm,
        icon: LegalDocument02Icon,
      },
      {
        id: "hearing-record-copy",
        title: "طلب نسخة محضر جلسة",
        description: "تقديم طلب للحصول على نسخة من محضر الجلسة",
        href: litigantRequestsForm,
        icon: DocumentValidationIcon,
      },
      {
        id: "document-copy",
        title: "طلب صورة مستند",
        description: "طلب صورة من المستندات القضائية المتاحة في ملف الدعوى",
        href: litigantRequestsForm,
        icon: FileValidationIcon,
      },
      {
        id: "document-verification",
        title: "التحقق من الوثائق",
        description: "الوصول إلى خدمة التحقق من صحة الوثائق القضائية",
        href: electronicCourtPortal,
        icon: LicenseIcon,
      },
    ],
  },
];

export const featuredFamilyServices = featuredServiceIds.map(
  id => allFamilyServices.find(service => service.id === id)!
);
