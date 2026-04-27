"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { formatRange, widenedRange } from "@/lib/estimator";

const STEP_PROGRESS: Record<number, number> = {
  2: 40,
  3: 75,
  4: 100,
};

const STEP_LABEL: Record<number, string> = {
  2: "Initial estimate",
  3: "Refining estimate",
  4: "Your estimate",
};

const STEP_SUBLINE: Record<number, string> = {
  2: "Updates as you answer · Range narrows with each step",
  3: "Almost there · Range tightens as we learn more",
  4: "Final estimate range",
};

export default function LivePricePreview({
  totalLow,
  totalHigh,
  serviceCount,
  isCustomQuote,
  step,
}: {
  totalLow: number;
  totalHigh: number | null;
  serviceCount: number;
  isCustomQuote: boolean;
  step: number;
}) {
  const widened = widenedRange(totalLow, totalHigh, step);
  const display = isCustomQuote ? "Custom quote" : formatRange(widened.low, widened.high);

  const baseLabel = STEP_LABEL[step] ?? "Estimated range";
  const label = serviceCount > 1 ? `Bundled estimate · ${serviceCount} services` : baseLabel;
  const progress = STEP_PROGRESS[step] ?? 0;
  const subline =
    serviceCount > 1
      ? "Stacked across selected services · narrows with each step"
      : STEP_SUBLINE[step] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/15 via-brand/5 to-transparent backdrop-blur-md px-5 sm:px-7 py-4 sm:py-5 shadow-xl shadow-brand/15"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand/20 border border-brand/50 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] sm:text-xs uppercase tracking-wider font-bold text-brand">
              {label}
            </div>
            {subline && (
              <div className="text-[11px] sm:text-xs text-white/50 truncate">{subline}</div>
            )}
          </div>
        </div>
        <motion.div
          key={display}
          initial={{ scale: 0.92, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent tabular-nums whitespace-nowrap"
        >
          {display}
        </motion.div>
      </div>

      <div className="mt-3 sm:mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand to-brand-hover rounded-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  );
}
