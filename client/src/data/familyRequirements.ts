import {
  DocumentValidationIcon,
  HandHelpingIcon,
  HeartbreakIcon,
  UserLove02Icon,
} from "@hugeicons/core-free-icons";

const filingGuide =
  "https://www.sjc.gov.qa/UserManuals/%D9%82%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AF%D8%B9%D8%A7%D9%88%D9%89%20-%20%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D9%85%D9%88%D9%86.pdf";

export const familyRequirements = [
  {
    id: "requirements-divorce",
    title: "متطلبات الطلاق",
    titleEn: "Divorce requirements",
    icon: HeartbreakIcon,
    lead: "متطلبات تمهيدية لطلبات الطلاق أمام محكمة الأسرة.",
    leadEn:
      "Preliminary requirements for divorce applications before the Family Court.",
    items: [
      "البطاقة الشخصية إذا كان أحد أطراف الدعوى فرداً.",
      "المذكرة الشارحة بصيغتي Word وPDF.",
      "حافظة المستندات المؤيدة للطلب.",
      "شهادة رقم الحساب المصرفي IBAN للمدعي.",
    ],
    itemsEn: [
      "Qatar ID when a party to the case is an individual.",
      "Explanatory memorandum in Word and PDF formats.",
      "A bundle of documents supporting the request.",
      "The claimant’s IBAN certificate.",
    ],
    href: filingGuide,
  },
  {
    id: "requirements-custody",
    title: "متطلبات الحضانة",
    titleEn: "Custody requirements",
    icon: UserLove02Icon,
    lead: "متطلبات تمهيدية لطلبات الحضانة وحقوق الأبناء.",
    leadEn:
      "Preliminary requirements for custody and children’s rights applications.",
    items: [
      "البطاقة الشخصية إذا كان أحد أطراف الدعوى فرداً.",
      "المذكرة الشارحة بصيغتي Word وPDF.",
      "حافظة المستندات المؤيدة للطلب.",
      "بيانات الوكالة عند التقديم بواسطة محامٍ.",
    ],
    itemsEn: [
      "Qatar ID when a party to the case is an individual.",
      "Explanatory memorandum in Word and PDF formats.",
      "A bundle of documents supporting the request.",
      "Power of attorney details when filing through a lawyer.",
    ],
    href: filingGuide,
  },
  {
    id: "requirements-alimony",
    title: "متطلبات النفقة",
    titleEn: "Maintenance requirements",
    icon: HandHelpingIcon,
    lead: "متطلبات تمهيدية لطلبات النفقة بأنواعها.",
    leadEn: "Preliminary requirements for different maintenance applications.",
    items: [
      "البطاقة الشخصية إذا كان أحد أطراف الدعوى فرداً.",
      "المذكرة الشارحة وحافظة المستندات المؤيدة للطلب.",
      "شهادة رقم الحساب المصرفي IBAN للمدعي.",
      "حصر عناصر النفقة والطلبات المالية في صحيفة الدعوى.",
    ],
    itemsEn: [
      "Qatar ID when a party to the case is an individual.",
      "Explanatory memorandum and supporting document bundle.",
      "The claimant’s IBAN certificate.",
      "A clear list of maintenance elements and financial requests in the statement of claim.",
    ],
    href: "https://encyclop.sjc.gov.qa/lawlib/Images/court_family/laws/22-2006/1.pdf",
  },
  {
    id: "requirements-documentation",
    title: "متطلبات التوثيق",
    titleEn: "Documentation requirements",
    icon: DocumentValidationIcon,
    lead: "متطلبات تمهيدية لتوثيق العقود والإقرارات الأسرية.",
    leadEn:
      "Preliminary requirements for notarising family contracts and declarations.",
    items: [
      "الوثيقة الشخصية لمقدم الطلب.",
      "بيانات الوكالة إذا كان مقدم الطلب وكيلاً.",
      "المرفقات التي يحددها النظام حسب نوع التوثيق.",
      "الإقرار بصحة البيانات قبل إرسال الطلب.",
    ],
    itemsEn: [
      "The applicant’s identity document.",
      "Power of attorney details when the applicant is acting as an agent.",
      "Attachments requested by the system for the selected documentation type.",
      "Confirmation that the information is correct before submission.",
    ],
    href: "https://www.sjc.gov.qa/ar/Pages/family-services.aspx",
  },
] as const;
