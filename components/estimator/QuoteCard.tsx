"use client";

import { Phone } from "lucide-react";
import { Estimate, formatRange, widenedRange } from "@/lib/estimator";

export default function QuoteCard({
  estimate,
  step = 5,
  compact = false,
}: {
  estimate: Estimate;
  step?: number;
  compact?: boolean;
}) {
  const widened = widenedRange(estimate.totalLow, estimate.totalHigh, step);
  const totalDisplay =
    estimate.lineItems.length === 0
      ? "Custom quote"
      : formatRange(widened.low, widened.high);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700 to-ink-800 p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <p className="text-brand text-xs uppercase tracking-wider font-bold">
          {estimate.serviceLabel}
        </p>
        <p className="text-white/40 text-xs">Estimate</p>
      </div>

      {estimate.lineItems.length > 0 && (
        <ul className="space-y-2 mb-5 border-b border-white/10 pb-5">
          {estimate.lineItems.map((line, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-brand mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-white/90">
                  {line.label}
                  {line.qty && line.qty > 1 ? (
                    <span className="text-white/50"> × {line.qty}</span>
                  ) : null}
                </div>
                {line.note && <div className="text-white/40 text-xs mt-0.5">{line.note}</div>}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-baseline justify-between gap-4 mb-1">
        <span className="text-white/70 text-sm">Estimated total</span>
        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
          {totalDisplay}
        </span>
      </div>
      <p className="text-right text-white/40 text-xs">+ GST</p>

      {estimate.requiresContact && estimate.contactItems.length > 0 && (
        <div className="mt-5 rounded-xl border border-brand/30 bg-brand/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-brand" />
            <span className="text-white font-semibold text-sm">We&apos;ll quote these directly</span>
          </div>
          <ul className="space-y-1 text-sm text-white/80">
            {estimate.contactItems.map((c) => (
              <li key={c.label}>
                <span className="font-medium">{c.label}</span>
                {c.note && <span className="text-white/50"> — {c.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!compact && estimate.notes.length > 0 && (
        <ul className="mt-4 space-y-1 text-xs text-white/50">
          {estimate.notes.map((n, i) => (
            <li key={i}>· {n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
