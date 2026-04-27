"use client";

import { useState } from "react";
import { Info, Minus, Plus } from "lucide-react";
import { DemoKind, LIGHT_DEMO_KINDS, LIGHT_DEMO_RATE } from "@/lib/pricing";

type Value = { kind: DemoKind; cubicYards: number };

export default function LightDemoInputs({
  value,
  onChange,
}: {
  value: Value;
  onChange: (v: Value) => void;
}) {
  const [showHint, setShowHint] = useState(false);
  const active = LIGHT_DEMO_KINDS.find((k) => k.id === value.kind);

  function setYards(y: number) {
    const clamped = Math.max(0, Math.round(y * 10) / 10);
    onChange({ ...value, cubicYards: clamped });
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h3 className="text-white font-semibold text-sm sm:text-base mb-3">
          What needs to come down?
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {LIGHT_DEMO_KINDS.map((k) => {
            const isActive = value.kind === k.id;
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => onChange({ ...value, kind: k.id })}
                className={[
                  "rounded-xl p-3 sm:p-4 border text-left transition-all duration-300 hover:-translate-y-0.5",
                  isActive
                    ? "bg-gradient-to-br from-brand/20 to-brand/5 border-brand shadow-lg shadow-brand/20"
                    : "bg-white/[0.03] border-white/10 hover:border-brand/40",
                ].join(" ")}
              >
                <div className="text-white text-sm sm:text-base font-semibold">{k.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm sm:text-base">Estimated cubic yards</h3>
          <button
            type="button"
            onClick={() => setShowHint((s) => !s)}
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-brand transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            Sizing guide
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setYards(value.cubicYards - 1)}
            disabled={value.cubicYards <= 0}
            className="w-11 h-11 rounded-full bg-white/5 border border-white/15 text-white hover:border-brand hover:text-brand disabled:opacity-30 transition-colors flex items-center justify-center"
            aria-label="Decrease cubic yards"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            min={0}
            step={0.5}
            value={value.cubicYards}
            onChange={(e) => setYards(parseFloat(e.target.value) || 0)}
            className="flex-1 max-w-[160px] h-11 rounded-md bg-white/10 border border-white/20 text-white text-center text-base font-semibold focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/50 backdrop-blur-sm transition-colors"
          />
          <button
            type="button"
            onClick={() => setYards(value.cubicYards + 1)}
            className="w-11 h-11 rounded-full bg-white/5 border border-white/15 text-white hover:border-brand hover:text-brand transition-colors flex items-center justify-center"
            aria-label="Increase cubic yards"
          >
            <Plus className="w-4 h-4" />
          </button>
          <span className="text-white/60 text-sm ml-1">cu yd</span>
        </div>

        {showHint && active && (
          <div className="mt-3 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
            <Info className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
            <div className="text-white/70 leading-relaxed">
              <span className="font-semibold text-white">{active.label}:</span> {active.sizingHint}
              <div className="text-white/50 text-xs mt-1">
                Not sure? Pick your best guess — we&apos;ll confirm on-site before work begins.
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-white/70">
          ${LIGHT_DEMO_RATE} per cubic yard · includes haul-away and cleanup
        </div>
      </div>
    </div>
  );
}
