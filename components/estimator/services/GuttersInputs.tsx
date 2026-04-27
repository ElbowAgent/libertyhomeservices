"use client";

import { GUTTER_TIERS, GutterTierId } from "@/lib/pricing";

type Value = { homeType: GutterTierId };

export default function GuttersInputs({
  value,
  onChange,
}: {
  value: Value;
  onChange: (v: Value) => void;
}) {
  return (
    <div>
      <h3 className="text-white font-semibold text-sm sm:text-base mb-3">
        What kind of home is it?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {GUTTER_TIERS.map((tier) => {
          const isActive = value.homeType === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => onChange({ homeType: tier.id })}
              className={[
                "rounded-xl p-4 border text-left transition-all duration-300 hover:-translate-y-0.5",
                isActive
                  ? "bg-gradient-to-br from-brand/20 to-brand/5 border-brand shadow-lg shadow-brand/20"
                  : "bg-white/[0.03] border-white/10 hover:border-brand/40",
              ].join(" ")}
            >
              <div className="text-white text-sm sm:text-base font-semibold">{tier.label}</div>
              <div className="text-xs text-white/50 mt-0.5">{tier.detail}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
