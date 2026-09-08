import { animate, useInView } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  locale?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  locale = "ar-QA",
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const getDecimalPlaces = (value: number) => {
    const text = value.toString();
    if (!text.includes(".")) return 0;

    const decimals = text.split(".")[1];
    return Number.parseInt(decimals, 10) !== 0 ? decimals.length : 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const formattedNumber = Intl.NumberFormat(locale, {
        useGrouping: Boolean(separator),
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals,
      }).format(latest);

      return separator
        ? formattedNumber.replace(/[,\u066C]/g, separator)
        : formattedNumber;
    },
    [locale, maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === "down" ? to : from);
    }
  }, [direction, formatValue, from, to]);

  useEffect(() => {
    if (!isInView || !startWhen) return;

    const startValue = direction === "down" ? to : from;
    const endValue = direction === "down" ? from : to;
    let controls: { stop: () => void } | undefined;
    const startTimer = window.setTimeout(() => {
      onStart?.();
      controls = animate(startValue, endValue, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: latest => {
          if (ref.current) ref.current.textContent = formatValue(latest);
        },
        onComplete: () => {
          if (ref.current) ref.current.textContent = formatValue(endValue);
          onEnd?.();
        },
      });
    }, delay * 1000);

    return () => {
      window.clearTimeout(startTimer);
      controls?.stop();
    };
  }, [
    delay,
    direction,
    duration,
    formatValue,
    from,
    isInView,
    onEnd,
    onStart,
    startWhen,
    to,
  ]);

  return <span ref={ref} className={className} aria-hidden="true" />;
}
