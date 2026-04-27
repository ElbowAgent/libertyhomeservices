"use client";

import { Home, Truck } from "lucide-react";

export default function HaulingToggle({
  hauling,
  onChange,
}: {
  hauling: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={[
          "flex items-start gap-3 rounded-xl p-4 border text-left transition-all duration-300",
          !hauling
            ? "bg-gradient-to-br from-brand/15 to-brand/5 border-brand/60"
            : "bg-white/[0.03] border-white/10 hover:border-brand/40",
        ].join(" ")}
      >
        <Truck
          className={!hauling ? "w-5 h-5 text-brand mt-0.5" : "w-5 h-5 text-white/50 mt-0.5"}
        />
        <div>
          <div className="text-white text-sm font-semibold">Items at curbside</div>
          <div className="text-white/60 text-xs mt-0.5">No interior hauling needed</div>
        </div>
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={[
          "flex items-start gap-3 rounded-xl p-4 border text-left transition-all duration-300",
          hauling
            ? "bg-gradient-to-br from-brand/15 to-brand/5 border-brand/60"
            : "bg-white/[0.03] border-white/10 hover:border-brand/40",
        ].join(" ")}
      >
        <Home
          className={hauling ? "w-5 h-5 text-brand mt-0.5" : "w-5 h-5 text-white/50 mt-0.5"}
        />
        <div>
          <div className="text-white text-sm font-semibold">Inside home or yard</div>
          <div className="text-white/60 text-xs mt-0.5">We&apos;ll haul it out</div>
        </div>
      </button>
    </div>
  );
}
