"use client";

import { Info } from "lucide-react";
import { SNOW_OPTIONS, SnowPlanId } from "@/lib/pricing";

type Value = { plan: SnowPlanId };

export default function SnowInputs({
  value,
  onChange,
}: {
  value: Value;
  onChange: (v: Value) => void;
}) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h3 className="text-white font-semibold text-sm sm:text-base mb-3">
          Pick a plan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {SNOW_OPTIONS.map((opt) => {
            const isActive = value.plan === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange({ plan: opt.id })}
                className={[
                  "rounded-xl p-4 border text-left transition-all duration-300 hover:-translate-y-0.5",
                  isActive
                    ? "bg-gradient-to-br from-brand/20 to-brand/5 border-brand shadow-lg shadow-brand/20"
                    : "bg-white/[0.03] border-white/10 hover:border-brand/40",
                ].join(" ")}
              >
                <div className="text-white text-sm sm:text-base font-semibold">{opt.label}</div>
                <div className="text-xs text-white/50 mt-0.5">{opt.detail}</div>
                {opt.startingAt === null && (
                  <div className="mt-3 text-brand/80 text-xs font-semibold uppercase tracking-wider">
                    Contact only
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
        <Info className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
        <p className="text-white/70 leading-relaxed">
          Snow pricing is finalized after we see the property — these are starting points.
          Driveways, back paths, corner sidewalks, and patios add cost.
        </p>
      </div>
    </div>
  );
}
