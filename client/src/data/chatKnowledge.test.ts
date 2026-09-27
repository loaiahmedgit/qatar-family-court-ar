import { describe, expect, it } from "vitest";
import { buildGuideReply, retrieveGuideAnswer } from "./chatKnowledge";
import { courtServiceGroups } from "./familyServices";
import { familyRequirements } from "./familyRequirements";

const match = (question: string) => retrieveGuideAnswer(question, "ar");

describe("Family Court guide Gulf Arabic intent matching", () => {
  it("treats a greeting as conversation rather than a scored search result", () => {
    const reply = buildGuideReply("مرحبا", 1, "ar");
    expect(reply.intentId).toBe("greeting");
    expect(reply).not.toHaveProperty("matchedTitle");
    expect(reply).not.toHaveProperty("confidence");
    expect(reply.text).toContain("كيف أقدر أساعدك اليوم؟");
  });

  it.each([
    ["قبل لا اروح المحكمه شنو اخذ معاي؟", "requirements-overview"],
    ["ناوية أطلق بس مب عارفة شنو أجهز", "requirements-divorce"],
    ["أبي حضانة عيالي ومب عارفة شسوي", "custody-pathway"],
    ["إذا أبي حضانة ولدي شنو الأوراق اللي يحتاجونها؟", "requirements-custody"],
    ["زوجي ما يصرف ع العيال شسوي", "maintenance-pathway"],
    ["أبي أتابع ملف الصلح شلون؟", "service-reconciliation-follow-up"],
    ["نبي نتصالح وين نسجل", "service-family-reconciliation-request"],
    ["أبي استشارة زوجية الرابط وين", "service-family-guidance"],
    ["انا محتاجه اخلعه", "khula-pathway"],
    ["أبي أخلع زوجي شلون أقدم؟", "khula-pathway"],
    ["وين المحكمة ومتى دوامهم", "court-visit"],
    ["ضيعت وثيقة الزواج شلون أطلع بدل فاقد؟", "lost-marriage-document"],
    [
      "أنا وزوجي منفصلين وعيالي معاي وهو ما يصرف عليهم ومب عارفة أقدّم حضانة ولا نفقة أول",
      "custody-maintenance-pathway",
    ],
    ["انا اريد الطلق", "divorce-pathway"],
    ["انا اريد ان أطلق", "divorce-pathway"],
  ])("matches %s", (question, expectedId) => {
    const result = match(question);
    expect(result?.answer.id).toBe(expectedId);
    expect(result?.confidence ?? 0).toBeGreaterThanOrEqual(0.7);
  });

  it.each([
    ["ابي اطلق شنو اخذ وياي", "requirements-divorce"],
    ["المحكمة وين", "court-location"],
    ["متى الدوام", "working-hours"],
  ])("handles short Gulf phrasing: %s", (question, expectedId) => {
    expect(match(question)?.answer.id).toBe(expectedId);
  });

  it.each([
    ["الخلع", "khula-pathway"],
    ["كيف أبدأ إجراءات الخلع؟", "khula-pathway"],
    ["زوجي رافض الخلع", "khula-pathway"],
    ["عايزة أرفع دعوى خلع", "khula-pathway"],
    ["إثبات الخلع", "service-divorce-dislocation"],
    ["الخلع تم وعايزة أوثقه", "service-divorce-dislocation"],
    ["عايزة وثيقة خلع", "service-divorce-dislocation"],
    ["اتفقنا على الخلع ونبي نثبته", "service-divorce-dislocation"],
  ])("distinguishes starting khula from documenting it: %s", (question, expectedId) => {
    expect(match(question)?.answer.id).toBe(expectedId);
  });

  it("answers a general khula request with both routes instead of one proof service", () => {
    const reply = buildGuideReply("انا اريد الخلع", 1, "ar");
    expect(reply.intentId).toBe("khula-pathway");
    expect(reply.text).toContain("مساران");
    expect(reply.links?.map(({ label }) => label)).toEqual([
      "بدء دعوى من خدمات التقاضي",
      "فتح خدمة إثبات الخلع",
      "مراجعة متطلبات الطلاق",
    ]);
  });

  it.each([
    ["الزوج رافض الطلاق وعايزة أرفع قضية", "divorce-pathway"],
    ["طلاق بالتراضي", "service-friendly-divorce"],
    ["أصدر إشهاد طلاق", "service-divorce-creation"],
    ["الأطفال مع الأب وعايزة أرفع حضانة", "custody-pathway"],
    ["ما يصرف على الأطفال", "maintenance-pathway"],
    ["شهادة نفقة طفل", "service-child-support"],
    ["إثبات استمرار الزواج", "service-marriage-continuity"],
    ["شهادة إثبات عدم الزواج", "service-non-marriage-proof"],
    ["توثيق الرجعة", "service-remarriage"],
    ["تصديق عقد زواج من خارج الدولة", "service-external-marriage-attestation"],
    ["نبي نتصالح", "service-family-reconciliation-request"],
    ["وين وصل ملف التصالح", "service-reconciliation-follow-up"],
  ])("separates a general situation from a specific proof or follow-up service: %s", (question, expectedId) => {
    expect(match(question)?.answer.id).toBe(expectedId);
  });

  it.each([
    ["khula", "khula-pathway"],
    ["how do I start khula", "khula-pathway"],
    ["my husband refuses khula", "khula-pathway"],
    ["khula confirmation", "service-divorce-dislocation"],
    ["document an agreed khula", "service-divorce-dislocation"],
  ])("keeps the same khula distinction in English: %s", (question, expectedId) => {
    expect(retrieveGuideAnswer(question, "en")?.answer.id).toBe(expectedId);
  });

  it.each([
    ["my spouse refuses divorce", "divorce-pathway"],
    ["mutual divorce", "service-friendly-divorce"],
    ["issue a divorce certificate", "service-divorce-creation"],
    ["start a custody case", "custody-pathway"],
    ["my spouse does not pay child support", "maintenance-pathway"],
    ["child maintenance certificate", "service-child-support"],
  ])("separates general and documentary routes in English: %s", (question, expectedId) => {
    expect(retrieveGuideAnswer(question, "en")?.answer.id).toBe(expectedId);
  });

  it.each(["الطقس حلو اليوم", "أبي أشتري سيارة"])(
    "does not invent a match for %s",
    question => {
      expect(match(question)).toBeNull();
    }
  );

  it("offers the local location and contact section for location questions", () => {
    const result = match("وين موقع المحكمة");
    expect(result?.answer.id).toBe("court-location");
    expect(result?.answer.links?.[0]).toEqual({
      label: "عرض الموقع وبيانات التواصل",
      href: "/family-services#about-location",
    });
  });

  it("gives lost visitors a professional overview with clear next steps", () => {
    const result = match("أنا تايه ومش عارف المحكمة بتعمل ايه");
    expect(result?.answer.id).toBe("about-court");
    expect(result?.answer.links?.map(({ label }) => label)).toEqual([
      "استعراض خدمات المحكمة",
      "فتح دليل الخدمات",
      "الموقع وبيانات التواصل",
      "التصالح والإرشاد الأسري",
      "شؤون المحضونين",
    ]);
  });

  it("turns the service finder suggestion into a guided choice", () => {
    const result = match("ما الخدمة المناسبة لحالتي؟");
    expect(result?.answer.id).toBe("service-discovery");
    expect(result?.answer.links?.map(({ label }) => label)).toEqual([
      "خدمات التقاضي",
      "الخدمات الرضائية",
      "التصالح والإرشاد الأسري",
      "شؤون المحضونين",
    ]);
  });

  it.each([
    ["ما هي استراتيجيه المحكمه؟", "strategy"],
    ["معرفش الاستراتجيه بتاعت المحكمة", "strategy"],
    ["شنو رؤية محكمة الأسرة؟", "strategy-vision"],
    ["وش رسالة المحكمة؟", "strategy-mission"],
    ["ما الأولويات الاستراتيجية؟", "strategy-priorities"],
    ["كيف ترفعون كفاءة الفصل في الدعاوى؟", "strategy-case-efficiency"],
    ["شنو المقصود بالعدالة التصالحية؟", "strategy-family-cohesion"],
    ["حدثني عن العدالة الرقمية", "strategy-digital-justice"],
    ["كيف تطبق المحكمة الحوكمة وجودة الخدمات؟", "strategy-governance"],
    ["متى تأسست محكمة الأسرة وعلى أي قانون؟", "court-legal-basis"],
    ["شنو الفرق بين محكمة الأسرة الجزئية والكلية؟", "court-structure"],
    ["من المسؤول عن تنفيذ الأحكام والأوامر الوقتية؟", "court-enforcement"],
    ["هل المحكمة تنظر حقوق الورثة وشؤون القاصرين؟", "court-estates-minors"],
    ["من رئيس المحكمة وما سيرته؟", "court-president"],
    ["كيف أقيم الموقع بالنجوم؟", "site-rating"],
    ["وش آخر أخبار المحكمة؟", "latest-news"],
    ["ما قصة برنامج كيف أصبحت؟", "news-family-court-radio"],
    ["ما تسهيلات التقاضي لذوي الإعاقة؟", "news-accessible-justice"],
    ["ما هو برنامج مهنتي مستقبلي؟", "news-future-careers"],
  ])("covers institutional site detail: %s", (question, expectedId) => {
    const result = match(question);
    expect(result?.answer.id).toBe(expectedId);
    expect(result?.confidence ?? 0).toBeGreaterThanOrEqual(0.75);
  });

  it.each(
    familyRequirements.map(requirement => [requirement.title, requirement.id])
  )("indexes requirement source automatically: %s", (question, expectedId) => {
    expect(match(question)?.answer.id).toBe(expectedId);
  });

  const uniqueServices = Array.from(
    new Map(
      courtServiceGroups
        .flatMap(
          group =>
            group.services ??
            group.sections?.flatMap(section => section.services) ??
            []
        )
        .map(service => [service.id, service])
    ).values()
  );

  it.each(
    uniqueServices.map(service => [service.title, `service-${service.id}`])
  )(
    "indexes every displayed service automatically: %s",
    (question, expectedId) => {
      expect(match(question)?.answer.id).toBe(expectedId);
    }
  );

  it.each(courtServiceGroups.map(group => [group.title, `group-${group.id}`]))(
    "indexes every displayed service group: %s",
    (question, expectedId) => {
      expect(match(question)?.answer.id).toBe(expectedId);
    }
  );

  it.each(
    courtServiceGroups.flatMap(group =>
      (group.sections ?? []).map(section => [
        section.title,
        `group-${section.id}`,
      ])
    )
  )("indexes every displayed service section: %s", (question, expectedId) => {
    expect(match(question)?.answer.id).toBe(expectedId);
  });

  it.each([
    ["What is the court strategy?", "strategy"],
    ["What is the Family Court vision?", "strategy-vision"],
    ["What is the Court mission?", "strategy-mission"],
    ["What are the strategic priorities?", "strategy-priorities"],
  ])("covers bilingual strategy detail: %s", (question, expectedId) => {
    const result = retrieveGuideAnswer(question, "en");
    expect(result?.answer.id).toBe(expectedId);
    expect(result?.confidence ?? 0).toBeGreaterThanOrEqual(0.75);
  });
});
