"use client";

import {
  CloudRain,
  HardHat,
  Hammer,
  Snowflake,
  Sofa,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { ServiceId, SERVICE_META } from "@/lib/pricing";

const ICONS: Record<ServiceId, LucideIcon> = {
  junk: Truck,
  construction: HardHat,
  "single-items": Sofa,
  "light-demo": Hammer,
  snow: Snowflake,
  gutters: CloudRain,
};

const ORDER: ServiceId[] = [
  "junk",
  "construction",
  "single-items",
  "light-demo",
  "snow",
  "gutters",
];

export default function StepServiceSelect({
  selected,
  onSelect,
}: {
  selected: ServiceId | null;
  onSelect: (id: ServiceId) => void;
}) {
  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          What can we help with?
        </h2>
        <p className="text-white/70 text-sm sm:text-base">
          Pick the service that best fits your job. You can change this later.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {ORDER.map((id) => {
          const Icon = ICONS[id];
          const meta = SERVICE_META[id];
          const isActive = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={[
                "group relative text-left rounded-xl sm:rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:-translate-y-1",
                isActive
                  ? "bg-gradient-to-br from-brand/15 to-brand/5 border-brand/60 shadow-xl shadow-brand/20"
                  : "bg-white/[0.03] border-white/10 hover:border-brand/40 hover:bg-white/[0.06]",
              ].join(" ")}
            >
              <div className="flex items-start gap-4">
                <div
                  className={[
                    "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-brand to-brand-hover shadow-lg shadow-brand/40"
                      : "bg-white/5 group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-hover",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "w-6 h-6 sm:w-7 sm:h-7 transition-colors",
                      isActive ? "text-white" : "text-brand group-hover:text-white",
                    ].join(" ")}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">{meta.label}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{meta.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
