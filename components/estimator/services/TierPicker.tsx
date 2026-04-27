"use client";

import { LoadTier } from "@/lib/pricing";

export default function TierPicker({
  tiers,
  selected,
  onSelect,
}: {
  tiers: readonly LoadTier[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3">
      {tiers.map((t) => {
        const active = selected === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            className={[
              "relative text-left rounded-xl p-4 border transition-all duration-300 hover:-translate-y-0.5",
              active
                ? "bg-gradient-to-br from-brand/20 to-brand/5 border-brand shadow-lg shadow-brand/20"
                : "bg-white/[0.03] border-white/10 hover:border-brand/40 hover:bg-white/[0.06]",
              t.popular ? "ring-1 ring-brand/30" : "",
            ].join(" ")}
          >
            {t.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center bg-gradient-to-r from-brand to-brand-hover text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shadow-md shadow-brand/30 whitespace-nowrap">
                Most Popular
              </span>
            )}
            <div className="text-white font-bold text-sm sm:text-base">{t.label}</div>
            <div className="text-white/50 text-[11px] sm:text-xs mt-0.5">{t.volume}</div>
          </button>
        );
      })}
    </div>
  );
}
