import {
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Info,
  LoaderCircle,
  MessageCircleQuestion,
  Send,
  X,
} from "lucide-react";
import guideAvatar from "../assets/chat-guide/family-court-guide-person.png";
import { buildGuideReply, type GuideLink } from "../data/chatKnowledge";
import { useLanguage } from "../contexts/LanguageContext";
import { sitePath } from "../lib/sitePath";
import "./ChatGuide.css";

type GuideMessage = {
  id: number;
  sender: "guide" | "visitor";
  text: string;
  links?: GuideLink[];
  intentId?: string;
  matchedTitle?: string;
  confidence?: number;
};

type WidgetPosition = { x: number; y: number };
type ViewportSize = { width: number; height: number };

const launcherSize = 72;
const widgetPositionKey = "qfc-chat-widget-position";

const viewportSize = (): ViewportSize =>
  typeof window === "undefined"
    ? { width: 1280, height: 800 }
    : { width: window.innerWidth, height: window.innerHeight };

const viewportMargin = (width: number) => (width <= 560 ? 12 : 20);

const clampWidgetPosition = (
  position: WidgetPosition,
  viewport = viewportSize()
): WidgetPosition => {
  const margin = viewportMargin(viewport.width);
  return {
    x: Math.min(
      Math.max(margin, position.x),
      Math.max(margin, viewport.width - launcherSize - margin)
    ),
    y: Math.min(
      Math.max(margin, position.y),
      Math.max(margin, viewport.height - launcherSize - margin)
    ),
  };
};

const snapWidgetPosition = (
  position: WidgetPosition,
  viewport = viewportSize()
): WidgetPosition => {
  const clamped = clampWidgetPosition(position, viewport);
  const margin = viewportMargin(viewport.width);
  const maxX = Math.max(margin, viewport.width - launcherSize - margin);
  const maxY = Math.max(margin, viewport.height - launcherSize - margin);
  const cornerSnapDistance = 96;
  let y = clamped.y;

  if (clamped.y <= margin + cornerSnapDistance) y = margin;
  if (clamped.y >= maxY - cornerSnapDistance) y = maxY;

  return {
    x: clamped.x + launcherSize / 2 < viewport.width / 2 ? margin : maxX,
    y,
  };
};

const initialWidgetPosition = (): WidgetPosition => {
  const viewport = viewportSize();
  const margin = viewportMargin(viewport.width);
  const fallback = {
    x: viewport.width - launcherSize - margin,
    y: viewport.height - launcherSize - margin,
  };

  if (typeof window === "undefined") return fallback;
  try {
    const stored = JSON.parse(
      window.localStorage.getItem(widgetPositionKey) ?? "null"
    ) as Partial<WidgetPosition> | null;
    if (stored && Number.isFinite(stored.x) && Number.isFinite(stored.y)) {
      return clampWidgetPosition(
        { x: Number(stored.x), y: Number(stored.y) },
        viewport
      );
    }
  } catch {
    /* A malformed saved position should never prevent the guide from opening. */
  }
  return fallback;
};

const panelPosition = (position: WidgetPosition, viewport: ViewportSize) => {
  const mobile = viewport.width <= 560;
  const margin = viewportMargin(viewport.width);
  const width = mobile
    ? viewport.width - 24
    : Math.min(400, viewport.width - 32);
  const height = mobile
    ? Math.min(580, viewport.height - 104)
    : Math.min(600, viewport.height - 104);
  const preferredLeft =
    position.x + launcherSize / 2 > viewport.width / 2
      ? position.x + launcherSize - width
      : position.x;
  const preferredTop =
    position.y + launcherSize / 2 > viewport.height / 2
      ? position.y - height - 12
      : position.y + launcherSize + 12;
  const closeButtonClearance = 68;
  const maxTop = Math.max(
    margin,
    viewport.height - height - closeButtonClearance - margin
  );

  return {
    left: Math.min(
      Math.max(margin, preferredLeft),
      Math.max(margin, viewport.width - width - margin)
    ),
    top: Math.min(Math.max(margin, preferredTop), maxTop),
    width,
    height,
  };
};

const guideUi = {
  ar: {
    welcome:
      "مرحبًا، صف لي ما تحتاجه وسأرشدك إلى الخدمة المناسبة والخطوات الرسمية.",
    nudgeMessage: "مرحبًا، أنا مرشد محكمة الأسرة. كيف أساعدك؟",
    title: "مرشد محكمة الأسرة",
    availability: "إرشاد رقمي لخدمات المحكمة",
    close: "إغلاق المرشد",
    disclaimer: "معلومات إرشادية من خدمات المحكمة، وليست استشارة قانونية.",
    suggestedLinks: "روابط مقترحة",
    suggestionsLabel: "كيف أستطيع مساعدتك؟",
    matchLabel: "نسبة المطابقة",
    generalLabel: "إجابة عامة",
    typing: "جارٍ تحليل سؤالك…",
    inputLabel: "اكتب سؤالك",
    placeholder: "اكتب سؤالك أو صف الإجراء المطلوب…",
    send: "إرسال السؤال",
    open: "فتح مرشد محكمة الأسرة",
    move: "اسحب لتحريك المرشد",
    suggestions: [
      { label: "إجراءات الطلاق", query: "ناوية أطلق شنو الأوراق اللي أجهزها؟" },
      {
        label: "الحضانة والنفقة",
        query: "عيالي معاي وأبوهم ما يصرف عليهم، أبي الحضانة والنفقة",
      },
      { label: "استشارة زوجية", query: "أبي استشارة زوجية" },
      { label: "الموقع والدوام", query: "وين المحكمة ومتى دوامهم" },
    ],
  },
  en: {
    welcome:
      "Hello. Describe what you need and I will guide you to the relevant service and official next steps.",
    nudgeMessage: "Hello, I’m the Family Court guide. How can I help?",
    title: "Family Court guide",
    availability: "Digital guidance for Court services",
    close: "Close the guide",
    disclaimer: "Guidance based on Court services. This is not legal advice.",
    suggestedLinks: "Suggested links",
    suggestionsLabel: "How can I help?",
    matchLabel: "Match confidence",
    generalLabel: "General answer",
    typing: "Reviewing your question…",
    inputLabel: "Enter your question",
    placeholder: "Ask a question or describe what you need…",
    send: "Send question",
    open: "Open the Family Court guide",
    move: "Drag to move the guide",
    suggestions: [
      {
        label: "Divorce process",
        query: "What documents do I need before filing for divorce?",
      },
      {
        label: "Custody and maintenance",
        query:
          "My children live with me and their father does not support them",
      },
      { label: "Marital consultation", query: "I need a marital consultation" },
      {
        label: "Location and hours",
        query: "Where is the court and when is it open?",
      },
    ],
  },
} as const;

export function ChatGuide() {
  const { language, direction } = useLanguage();
  const ui = guideUi[language];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<GuideMessage[]>(() => [
    {
      id: 1,
      sender: "guide",
      text: guideUi[language].welcome,
      intentId: "greeting",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [nudgeState, setNudgeState] = useState<
    "hidden" | "visible" | "leaving"
  >("hidden");
  const [position, setPosition] = useState<WidgetPosition>(
    initialWidgetPosition
  );
  const [viewport, setViewport] = useState<ViewportSize>(viewportSize);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const panelCloseRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseTimerRef = useRef<number | null>(null);
  const nextIdRef = useRef(2);
  const positionRef = useRef(position);
  const suppressToggleRef = useRef(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origin: WidgetPosition;
    current: WidgetPosition;
    moved: boolean;
  } | null>(null);

  const applyVisualPosition = (nextPosition: WidgetPosition) => {
    const root = rootRef.current;
    if (root) {
      root.style.left = `${nextPosition.x}px`;
      root.style.top = `${nextPosition.y}px`;
    }
    const panel = panelRef.current;
    if (panel) {
      const nextPanelPosition = panelPosition(nextPosition, viewportSize());
      panel.style.left = `${nextPanelPosition.left}px`;
      panel.style.top = `${nextPanelPosition.top}px`;
      const panelClose = panelCloseRef.current;
      if (panelClose) {
        panelClose.style.left = `${nextPanelPosition.left + 8}px`;
        panelClose.style.top = `${nextPanelPosition.top + nextPanelPosition.height + 12}px`;
      }
    }
  };

  useEffect(() => {
    if (responseTimerRef.current) window.clearTimeout(responseTimerRef.current);
    nextIdRef.current = 2;
    setTyping(false);
    setInput("");
    setMessages([
      {
        id: 1,
        sender: "guide",
        text: guideUi[language].welcome,
        intentId: "greeting",
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (open) {
      setNudgeState("hidden");
      return;
    }

    const showTimer = window.setTimeout(() => setNudgeState("visible"), 700);
    const leaveTimer = window.setTimeout(() => setNudgeState("leaving"), 5200);
    const hideTimer = window.setTimeout(() => setNudgeState("hidden"), 5650);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, [language, open]);

  useEffect(() => {
    positionRef.current = position;
    window.localStorage.setItem(widgetPositionKey, JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    const keepWidgetInView = () => {
      const nextViewport = viewportSize();
      const nextPosition = clampWidgetPosition(
        positionRef.current,
        nextViewport
      );
      positionRef.current = nextPosition;
      setViewport(nextViewport);
      setPosition(nextPosition);
    };
    window.addEventListener("resize", keepWidgetInView);
    return () => window.removeEventListener("resize", keepWidgetInView);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      if (responseTimerRef.current)
        window.clearTimeout(responseTimerRef.current);
    };
  }, []);

  const ask = (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || typing) return;

    const visitorMessage: GuideMessage = {
      id: nextIdRef.current++,
      sender: "visitor",
      text: question,
    };
    setMessages(current => [...current, visitorMessage]);
    setInput("");
    setTyping(true);
    const previousIntentId = [...messages]
      .reverse()
      .find(
        message => message.sender === "guide" && message.intentId
      )?.intentId;

    responseTimerRef.current = window.setTimeout(() => {
      setMessages(current => [
        ...current,
        buildGuideReply(
          question,
          nextIdRef.current++,
          language,
          previousIntentId
        ),
      ]);
      setTyping(false);
    }, 520);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(input);
  };

  const followLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: GuideLink
  ) => {
    setOpen(false);
    if (
      link.external ||
      !link.href.startsWith("/family-services#") ||
      window.location.pathname !== sitePath("/family-services")
    )
      return;

    event.preventDefault();
    const nextHash = link.href.slice(link.href.indexOf("#"));
    window.history.pushState(null, "", nextHash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const toggleGuide = () => {
    if (suppressToggleRef.current) {
      suppressToggleRef.current = false;
      return;
    }
    setNudgeState("hidden");
    setOpen(current => !current);
  };

  const startDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    if (
      (event.target as HTMLElement).closest("button") &&
      event.currentTarget.classList.contains("court-guide-header")
    )
      return;

    const rect = rootRef.current?.getBoundingClientRect();
    const origin = clampWidgetPosition(
      rect ? { x: rect.left, y: rect.top } : positionRef.current
    );
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin,
      current: origin,
      moved: false,
    };
    setNudgeState("hidden");
    suppressToggleRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return;

    drag.moved = true;
    suppressToggleRef.current = true;
    rootRef.current?.classList.add("is-dragging");
    drag.current = clampWidgetPosition({
      x: drag.origin.x + deltaX,
      y: drag.origin.y + deltaY,
    });
    applyVisualPosition(drag.current);
  };

  const endDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    rootRef.current?.classList.remove("is-dragging");
    dragRef.current = null;
    if (drag.moved) {
      const snappedPosition = snapWidgetPosition(drag.current);
      applyVisualPosition(snappedPosition);
      positionRef.current = snappedPosition;
      setPosition(snappedPosition);
    }
  };

  const currentPanelPosition = panelPosition(position, viewport);
  const currentPanelClosePosition = {
    left: currentPanelPosition.left + 8,
    top: currentPanelPosition.top + currentPanelPosition.height + 12,
  };

  return (
    <div
      ref={rootRef}
      className={`court-guide-root${open ? " is-open" : ""}`}
      dir={direction}
      style={{
        left: position.x,
        top: position.y,
        right: "auto",
        bottom: "auto",
      }}
    >
      {open && (
        <section
          ref={panelRef}
          id="court-guide-panel"
          className="court-guide-panel"
          role="dialog"
          aria-labelledby="court-guide-title"
          style={currentPanelPosition}
        >
          <header
            className="court-guide-header"
            title={ui.move}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <span className="court-guide-header-avatar">
              <img
                src={guideAvatar}
                alt=""
                width={448}
                height={512}
                draggable={false}
              />
            </span>
            <span className="court-guide-heading">
              <strong id="court-guide-title">{ui.title}</strong>
              <small>{ui.availability}</small>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={ui.close}
            >
              <X size={21} aria-hidden="true" />
            </button>
          </header>

          <div className="court-guide-disclaimer">
            <Info size={14} aria-hidden="true" />
            <span>{ui.disclaimer}</span>
          </div>

          <div
            className="court-guide-messages"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map(message => (
              <article
                key={message.id}
                className={`court-guide-message is-${message.sender}`}
              >
                {message.sender === "guide" && (
                  <span
                    className="court-guide-message-avatar"
                    aria-hidden="true"
                  >
                    <img
                      src={guideAvatar}
                      alt=""
                      width={448}
                      height={512}
                      draggable={false}
                    />
                  </span>
                )}
                <div className="court-guide-message-card">
                  {message.sender === "guide" && message.matchedTitle && (
                    <div className="court-guide-match">
                      <strong>{message.matchedTitle}</strong>
                      <small>
                        {message.confidence
                          ? `${ui.matchLabel} ${message.confidence}%`
                          : ui.generalLabel}
                      </small>
                    </div>
                  )}
                  <p>{message.text}</p>
                  {message.links && (
                    <nav aria-label={ui.suggestedLinks}>
                      {message.links.map(link => (
                        <a
                          key={`${message.id}-${link.href}-${link.label}`}
                          href={link.external ? link.href : sitePath(link.href)}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noreferrer" : undefined}
                          onClick={event => followLink(event, link)}
                        >
                          <span>{link.label}</span>
                          {link.external ? (
                            <ExternalLink size={15} aria-hidden="true" />
                          ) : language === "en" ? (
                            <ArrowRight size={16} aria-hidden="true" />
                          ) : (
                            <ArrowLeft size={16} aria-hidden="true" />
                          )}
                        </a>
                      ))}
                    </nav>
                  )}
                </div>
              </article>
            ))}

            {messages.length === 1 && (
              <div
                className="court-guide-suggestions"
                aria-label={ui.suggestionsLabel}
              >
                <p>{ui.suggestionsLabel}</p>
                {ui.suggestions.map(({ label, query }) => (
                  <button key={label} type="button" onClick={() => ask(query)}>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}

            {typing && (
              <div className="court-guide-typing" role="status">
                <LoaderCircle size={17} aria-hidden="true" />
                <span>{ui.typing}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="court-guide-composer" onSubmit={submit}>
            <label htmlFor="court-guide-input">{ui.inputLabel}</label>
            <div>
              <input
                ref={inputRef}
                id="court-guide-input"
                value={input}
                onChange={event => setInput(event.target.value)}
                placeholder={ui.placeholder}
                autoComplete="off"
                disabled={typing}
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label={ui.send}
              >
                <Send size={20} aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      )}

      {open && (
        <button
          ref={panelCloseRef}
          className="court-guide-panel-close"
          type="button"
          onClick={() => setOpen(false)}
          aria-label={ui.close}
          style={currentPanelClosePosition}
        >
          <X size={24} aria-hidden="true" />
        </button>
      )}

      {!open && nudgeState !== "hidden" && (
        <div
          className={`court-guide-nudge${position.x < viewport.width / 2 ? " is-east" : ""} is-${nudgeState}`}
          aria-hidden="true"
        >
          <p>{ui.nudgeMessage}</p>
        </div>
      )}

      <button
        className={`court-guide-launcher ${position.x < viewport.width / 2 ? "is-east" : "is-west"}`}
        type="button"
        aria-expanded={open}
        aria-controls="court-guide-panel"
        aria-label={open ? ui.close : `${ui.open}. ${ui.move}`}
        title={ui.move}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={event => event.preventDefault()}
        onClick={toggleGuide}
      >
        {open ? (
          <X size={28} aria-hidden="true" />
        ) : (
          <span className="court-guide-launcher-portrait">
            <img
              src={guideAvatar}
              alt=""
              width={448}
              height={512}
              draggable={false}
            />
          </span>
        )}
        {!open && (
          <span className="court-guide-badge" aria-hidden="true">
            <MessageCircleQuestion size={14} />
          </span>
        )}
      </button>
    </div>
  );
}
