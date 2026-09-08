import { useState } from "react";
import { Star } from "lucide-react";
import "./SiteRating.css";

type SiteRatingProps = {
  language: "ar" | "en";
};

type StoredFeedback = {
  helpful: "yes" | "no" | null;
  rating: number;
};

const emptyFeedback: StoredFeedback = { helpful: null, rating: 0 };

const readFeedback = (): StoredFeedback => {
  if (typeof window === "undefined") return emptyFeedback;
  try {
    const stored = JSON.parse(
      window.localStorage.getItem(
        `qfc-site-feedback:${window.location.pathname}`
      ) ?? "null"
    ) as Partial<StoredFeedback> | null;
    return {
      helpful:
        stored?.helpful === "yes" || stored?.helpful === "no"
          ? stored.helpful
          : null,
      rating:
        Number.isInteger(stored?.rating) &&
        Number(stored?.rating) >= 1 &&
        Number(stored?.rating) <= 5
          ? Number(stored?.rating)
          : 0,
    };
  } catch {
    return emptyFeedback;
  }
};

const copy = {
  ar: {
    question: "هل وجدت محتوى هذا الموقع مفيدًا؟",
    yes: "نعم",
    no: "لا",
    rating: "تقييم الموقع",
    rate: "قيّم الموقع",
    star: (value: number) => `تقييم ${value} من 5`,
    thanks: "شكرًا لمشاركتك",
  },
  en: {
    question: "Did you find this website's content useful?",
    yes: "Yes",
    no: "No",
    rating: "Rate the website",
    rate: "Website rating",
    star: (value: number) => `Rate ${value} out of 5`,
    thanks: "Thank you for your feedback",
  },
} as const;

export function SiteRating({ language }: SiteRatingProps) {
  const ui = copy[language];
  const [feedback, setFeedback] = useState<StoredFeedback>(readFeedback);
  const [previewRating, setPreviewRating] = useState(0);

  const saveFeedback = (next: StoredFeedback) => {
    setFeedback(next);
    window.localStorage.setItem(
      `qfc-site-feedback:${window.location.pathname}`,
      JSON.stringify(next)
    );
  };

  return (
    <section className="site-rating" aria-label={ui.rate}>
      <div className="section-shell site-rating-inner">
        <p className="site-rating-question">{ui.question}</p>

        <div className="site-rating-helpful" aria-label={ui.question}>
          <button
            type="button"
            className={feedback.helpful === "yes" ? "is-selected" : ""}
            aria-pressed={feedback.helpful === "yes"}
            onClick={() => saveFeedback({ ...feedback, helpful: "yes" })}
          >
            {ui.yes}
          </button>
          <button
            type="button"
            className={feedback.helpful === "no" ? "is-selected" : ""}
            aria-pressed={feedback.helpful === "no"}
            onClick={() => saveFeedback({ ...feedback, helpful: "no" })}
          >
            {ui.no}
          </button>
        </div>

        <div className="site-rating-stars-wrap">
          <span>{ui.rating}</span>
          <div
            className="site-rating-stars"
            role="radiogroup"
            aria-label={ui.rate}
            onMouseLeave={() => setPreviewRating(0)}
          >
            {[1, 2, 3, 4, 5].map(value => {
              const active = value <= (previewRating || feedback.rating);
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={feedback.rating === value}
                  aria-label={ui.star(value)}
                  className={active ? "is-active" : ""}
                  onFocus={() => setPreviewRating(value)}
                  onBlur={() => setPreviewRating(0)}
                  onMouseEnter={() => setPreviewRating(value)}
                  onClick={() => saveFeedback({ ...feedback, rating: value })}
                >
                  <Star
                    size={24}
                    strokeWidth={1.8}
                    fill={active ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {(feedback.helpful || feedback.rating > 0) && (
          <p className="site-rating-thanks" role="status">
            {ui.thanks}
          </p>
        )}
      </div>
    </section>
  );
}
