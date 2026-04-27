"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CloudRain,
  HardHat,
  Hammer,
  Phone,
  Snowflake,
  Sofa,
  Truck,
  X,
  type LucideIcon,
} from "lucide-react";
import { ServiceId, SERVICE_META, UNIVERSAL_DISCLAIMERS } from "@/lib/pricing";
import { Estimate, formatRange, widenedRange } from "@/lib/estimator";
import { estimateForService, type WizardState } from "./EstimatorWizard";

const ICONS: Record<ServiceId, LucideIcon> = {
  junk: Truck,
  construction: HardHat,
  "single-items": Sofa,
  "light-demo": Hammer,
  snow: Snowflake,
  gutters: CloudRain,
};

const ALL_SERVICES: ServiceId[] = [
  "junk",
  "construction",
  "single-items",
  "light-demo",
  "snow",
  "gutters",
];

function buildContactHref(
  estimates: Estimate[],
  totalLow: number,
  totalHigh: number | null,
  state: WizardState,
  requiresContact: boolean
): string {
  const params = new URLSearchParams({
    services: estimates.map((e) => e.service).join(","),
    estimateLow: String(totalLow),
    estimateHigh: totalHigh === null ? "open" : String(totalHigh),
    area: state.location.area,
  });
  if (state.contact.email) params.set("email", state.contact.email);
  if (state.location.phone) params.set("phone", state.location.phone);
  if (state.location.address) params.set("address", state.location.address);
  if (state.location.postal) params.set("postal", state.location.postal);
  if (state.contact.name) params.set("name", state.contact.name);
  if (requiresContact) params.set("requiresContact", "1");
  return `/#contact?${params.toString()}`;
}

export default function StepQuote({
  estimate,
  state,
  onJump,
  onRemoveFromStack,
}: {
  estimate: Estimate;
  state: WizardState;
  onJump: (step: 1 | 2 | 3 | 4 | 5) => void;
  onRemoveFromStack: (id: ServiceId) => void;
}) {
  // Build the stacked list. The current service was added to state.stack on
  // Step 5 entry, so this is normally a superset including the active service.
  const stackedIds = state.stack.length > 0 ? state.stack : estimate.service ? [estimate.service] : [];
  const stackedEstimates = stackedIds.map((id) => estimateForService(state, id));

  let totalLow = 0;
  let totalHigh: number | null = 0;
  for (const e of stackedEstimates) {
    totalLow += e.totalLow;
    if (totalHigh === null || e.totalHigh === null) totalHigh = null;
    else totalHigh += e.totalHigh;
  }
  const widened = widenedRange(totalLow, totalHigh, 5);
  const totalDisplay =
    stackedEstimates.every((e) => e.lineItems.length === 0)
      ? "Custom quote"
      : formatRange(widened.low, widened.high);

  const requiresContact = stackedEstimates.some((e) => e.requiresContact);
  const allContactItems = stackedEstimates.flatMap((e) => e.contactItems);
  const allNotes = Array.from(
    new Set(stackedEstimates.flatMap((e) => e.notes))
  );

  const remainingServices = ALL_SERVICES.filter((id) => !stackedIds.includes(id));
  const contactHref = buildContactHref(
    stackedEstimates,
    widened.low,
    widened.high,
    state,
    requiresContact
  );

  return (
    <div>
      <header className="mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/30 rounded-full px-3 py-1 mb-3">
          <CheckCircle2 className="w-4 h-4 text-brand" />
          <span className="text-brand text-xs uppercase tracking-wider font-bold">
            {stackedIds.length > 1 ? "Your bundled estimate" : "Your estimate"}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
          {stackedIds.length > 1
            ? "Here's your transparent bundled price"
            : "Here's your transparent price range"}
        </h2>
        <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
          Final quote is always confirmed before any work begins.
        </p>
      </header>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700 to-ink-800 p-5 sm:p-6">
        <ul className="space-y-4 mb-5 border-b border-white/10 pb-5">
          {stackedEstimates.map((e, idx) => {
            const Icon = ICONS[e.service];
            return (
              <li key={e.service}>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-brand/15 border border-brand/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-brand" />
                    </div>
                    <span className="text-brand text-xs uppercase tracking-wider font-bold truncate">
                      {e.serviceLabel}
                    </span>
                  </div>
                  {stackedIds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveFromStack(e.service)}
                      className="text-white/40 hover:text-red-400 transition-colors p-1 -m-1"
                      aria-label={`Remove ${e.serviceLabel} from quote`}
                      title={`Remove ${e.serviceLabel}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {e.lineItems.length > 0 ? (
                  <ul className="ml-9 space-y-1.5">
                    {e.lineItems.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-brand/60 mt-1.5 inline-block w-1 h-1 rounded-full bg-brand/60 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-white/90">
                            {line.label}
                            {line.qty && line.qty > 1 ? (
                              <span className="text-white/50"> × {line.qty}</span>
                            ) : null}
                          </div>
                          {line.note && (
                            <div className="text-white/40 text-xs mt-0.5">{line.note}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-9 text-white/50 text-sm italic">
                    Quoted directly — see contact section below.
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-baseline justify-between gap-4 mb-1">
          <span className="text-white/70 text-sm">
            {stackedIds.length > 1 ? "Estimated bundled total" : "Estimated total"}
          </span>
          <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
            {totalDisplay}
          </span>
        </div>
        <p className="text-right text-white/40 text-xs">+ GST</p>

        {requiresContact && allContactItems.length > 0 && (
          <div className="mt-5 rounded-xl border border-brand/30 bg-brand/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-brand" />
              <span className="text-white font-semibold text-sm">
                We&apos;ll quote these directly
              </span>
            </div>
            <ul className="space-y-1 text-sm text-white/80">
              {allContactItems.map((c, i) => (
                <li key={i}>
                  <span className="font-medium">{c.label}</span>
                  {c.note && <span className="text-white/50"> — {c.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ul className="mt-5 space-y-1.5 text-xs sm:text-sm text-white/60">
        {allNotes.map((n, i) => (
          <li key={`note-${i}`} className="flex items-start gap-2">
            <span className="text-brand mt-0.5">·</span>
            <span>{n}</span>
          </li>
        ))}
        {UNIVERSAL_DISCLAIMERS.map((d) => (
          <li key={d} className="flex items-start gap-2">
            <span className="text-brand mt-0.5">·</span>
            <span>{d}</span>
          </li>
        ))}
        {state.location.area === "Other" && (
          <li className="flex items-start gap-2">
            <span className="text-brand mt-0.5">·</span>
            <span>
              We&apos;ll confirm we can reach <strong>{state.location.area}</strong> before
              scheduling.
            </span>
          </li>
        )}
      </ul>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <Link
          href={contactHref}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-brand-hover shadow-lg shadow-brand/30 hover:shadow-2xl hover:shadow-brand/50 text-white text-base font-semibold rounded-full px-6 py-4 transition-all duration-300 hover:-translate-y-0.5"
        >
          {requiresContact ? "Continue to contact form" : "Book Now"}
          <ArrowRight className="w-5 h-5" />
        </Link>
        <span className="text-white/40 text-sm font-medium uppercase tracking-wider text-center sm:px-1">
          or
        </span>
        <a
          href="tel:5872889794"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-ink-900 border-2 border-white/80 text-white hover:bg-white hover:text-ink-900 rounded-full px-6 py-4 text-base font-semibold transition-all duration-300"
        >
          <Phone className="w-5 h-5" />
          Call / Text (587) 288-9794
        </a>
      </div>

      <button
        type="button"
        onClick={() => onJump(2)}
        className="mt-4 text-sm text-white/50 hover:text-brand transition-colors"
      >
        Edit details
      </button>

      {remainingServices.length > 0 && (
        <div className="mt-10 pt-8 border-t border-white/10">
          <h3 className="text-white font-bold text-base sm:text-lg mb-1">
            {stackedIds.length > 1 ? "Add another service" : "Need anything else?"}
          </h3>
          <p className="text-white/60 text-sm mb-4">
            Stack more services into this estimate — we&apos;ll keep the same crew on the same trip.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {remainingServices.map((id) => {
              const Icon = ICONS[id];
              const meta = SERVICE_META[id];
              return (
                <Link
                  key={id}
                  href={`/estimate?service=${id}`}
                  className="group flex items-center gap-3 rounded-xl p-4 border border-white/10 bg-white/[0.03] hover:border-brand/40 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-hover flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white text-sm font-semibold">{meta.label}</div>
                    <div className="text-white/50 text-xs truncate">{meta.tagline}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-brand transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
