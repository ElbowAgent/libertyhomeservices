"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock,
  CloudRain,
  HardHat,
  Hammer,
  Snowflake,
  Sofa,
  Truck,
  Zap,
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

export default function InstantEstimateCard() {
  return (
    <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl p-7 sm:p-9">
      <div className="relative">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="inline-flex items-center gap-2 bg-brand/15 border border-brand/40 rounded-full px-3 py-1.5">
            <Zap className="w-4 h-4 text-brand" fill="currentColor" />
            <span className="text-brand text-xs uppercase tracking-wider font-bold">
              Instant Estimate
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-white/60 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>~2 min</span>
          </div>
        </div>

        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-[1.1]">
          Pick a service.
          <br />
          Get a price.
        </h3>
        <p className="text-white/70 text-base sm:text-lg mb-6">
          Transparent ranges. No call required.
        </p>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-6">
          {ORDER.map((id) => {
            const Icon = ICONS[id];
            const meta = SERVICE_META[id];
            return (
              <Link
                key={id}
                href={`/estimate?service=${id}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] hover:border-brand/60 hover:bg-white/[0.08] px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-hover flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                </div>
                <span className="text-white text-sm sm:text-base font-semibold leading-tight">
                  {meta.label}
                </span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/estimate"
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-brand-hover shadow-xl shadow-brand/40 hover:shadow-2xl hover:shadow-brand/60 text-white text-base sm:text-lg font-semibold rounded-xl py-4 transition-all duration-300 hover:-translate-y-0.5"
        >
          Start my estimate
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-center text-white/50 text-xs mt-3">
          Final quote always confirmed before work begins.
        </p>
      </div>
    </div>
  );
}
