import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useLanguage } from "../contexts/LanguageContext";
import { sitePath } from "../lib/sitePath";

const newsItems = [
  {
    id: "family-court-radio",
    date: "2026-09-02",
    title: {
      ar: "محكمة الأسرة تشارك في برنامج «كيف أصبحت» الإذاعي",
      en: "Family Court joins the radio programme ‘How I Became’",
    },
    summary: {
      ar: "مشاركة توعوية تمتد في 12 حلقة أسبوعية وتتناول التماسك الأسري وحل المنازعات بالوسائل الودية.",
      en: "A 12-episode weekly series discussing family cohesion and the amicable resolution of family disputes.",
    },
    image: "/images/news/family-court-radio.jpg",
    imagePosition: "center 12%",
    href: "https://www.sjc.gov.qa/ar/News/Pages/محكمة-الأسرة-تشارك-في-برنامج-كيف-أصبحت-الإذاعي-عبر-إذاعة-القران-الكريم.aspx",
  },
  {
    id: "accessible-justice",
    date: "2026-08-16",
    title: {
      ar: "تسهيلات التقاضي لذوي الإعاقة أمام الأمم المتحدة",
      en: "Accessible litigation services presented at the United Nations",
    },
    summary: {
      ar: "استعراض لتجربة القضاء القطري في تيسير الوصول إلى العدالة، بما يشمل التقاضي الإلكتروني وخدمات الترجمة والمساعدة القانونية.",
      en: "An overview of Qatar’s work to improve access to justice through e-litigation, interpretation and legal assistance.",
    },
    image: "/images/news/accessible-justice.jpg",
    imagePosition: "center 8%",
    href: "https://www.sjc.gov.qa/ar/News/Pages/القاضي-د.-علي-الجسيمان-يستعرض-أمام-الأمم-المتحدة-تسهيلات-التقاضي-لذوي-الإعاقة.aspx",
  },
  {
    id: "future-careers",
    date: "2026-08-05",
    title: {
      ar: "طلبة «مهنتي مستقبلي» يتعرّفون على العمل القضائي",
      en: "‘My Career, My Future’ students explore judicial work",
    },
    summary: {
      ar: "استضافت محكمة الاستثمار والتجارة طلبة البرنامج لتعريفهم بطبيعة العمل القضائي والإداري وتعزيز وعيهم بالمسارات المهنية.",
      en: "The Investment and Trade Court welcomed programme participants to introduce them to judicial and administrative work.",
    },
    image: "/images/news/future-careers.jpg",
    imagePosition: "center 7%",
    href: "https://www.sjc.gov.qa/ar/News/Pages/محكمة-الاستثمار-والتجارة-تستضيف-طلبة-برنامج-«مهنتي-مستقبلي»-لتعزيز-الوعي-المهني.aspx",
  },
] as const;

export function LatestNews() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const { language, direction } = useLanguage();
  const isEnglish = language === "en";
  const dateFormatter = new Intl.DateTimeFormat(isEnglish ? "en-GB" : "ar-QA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  useEffect(() => {
    if (!carouselApi) return;

    const updateActiveSlide = () =>
      setActiveIndex(carouselApi.selectedScrollSnap());
    updateActiveSlide();
    carouselApi.on("select", updateActiveSlide);
    carouselApi.on("reInit", updateActiveSlide);

    return () => {
      carouselApi.off("select", updateActiveSlide);
      carouselApi.off("reInit", updateActiveSlide);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi || paused || reducedMotion) return;

    const interval = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 3000);

    return () => window.clearInterval(interval);
  }, [activeIndex, carouselApi, paused, reducedMotion]);

  return (
    <section
      id="news"
      className="latest-news"
      aria-labelledby="latest-news-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="latest-news-shell section-shell">
        <header className="latest-news-heading">
          <h2 id="latest-news-title">
            {isEnglish ? "Latest news" : "آخر الأخبار"}
          </h2>
          <a
            href="https://www.sjc.gov.qa/ar/News/Pages/default.aspx"
            target="_blank"
            rel="noreferrer"
          >
            {isEnglish ? "View all news" : "عرض جميع الأخبار"}{" "}
            {isEnglish ? (
              <ArrowRight size={17} aria-hidden="true" />
            ) : (
              <ArrowUpLeft size={17} aria-hidden="true" />
            )}
          </a>
        </header>

        <Carousel
          className="latest-news-carousel"
          dir={direction}
          opts={{ loop: true, direction }}
          setApi={setCarouselApi}
          aria-label={isEnglish ? "Latest news carousel" : "عارض آخر الأخبار"}
        >
          <CarouselContent className="latest-news-track">
            {newsItems.map((news, index) => (
              <CarouselItem
                className="latest-news-slide"
                key={news.id}
                aria-label={`${index + 1} / ${newsItems.length}`}
              >
                <article className="latest-news-feature">
                  <figure className="latest-news-visual">
                    <img
                      src={sitePath(news.image)}
                      alt={news.title[language]}
                      width={1200}
                      height={1600}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      style={{ objectPosition: news.imagePosition }}
                    />
                  </figure>

                  <div className="latest-news-copy">
                    <time dateTime={news.date}>
                      {dateFormatter.format(new Date(`${news.date}T12:00:00Z`))}
                    </time>
                    <h3>{news.title[language]}</h3>
                    <p>{news.summary[language]}</p>
                    <Button asChild size="lg" className="latest-news-read">
                      <a href={news.href} target="_blank" rel="noreferrer">
                        {isEnglish ? "Read more" : "اقرأ المزيد"}
                        {isEnglish ? (
                          <ArrowRight
                            data-icon="inline-end"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowUpLeft
                            data-icon="inline-end"
                            aria-hidden="true"
                          />
                        )}
                      </a>
                    </Button>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div
            className="latest-news-navigation"
            aria-label={isEnglish ? "Browse news" : "التنقل بين الأخبار"}
          >
            {newsItems.map((news, index) => (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                key={news.id}
                className="latest-news-dot-control"
                onClick={() => carouselApi?.scrollTo(index)}
                aria-label={
                  isEnglish
                    ? `Show article ${index + 1}: ${news.title.en}`
                    : `عرض الخبر ${index + 1}: ${news.title.ar}`
                }
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span className="latest-news-dot" aria-hidden="true" />
              </Button>
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
