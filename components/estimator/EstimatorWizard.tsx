"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceId, ServiceArea, GutterTierId } from "@/lib/pricing";
import {
  Estimate,
  estimateConstruction,
  estimateGutters,
  estimateJunk,
  estimateLightDemo,
  estimateSingleItems,
  estimateSnow,
} from "@/lib/estimator";
import Stepper from "./Stepper";
import StepServiceSelect from "./StepServiceSelect";
import StepDetails from "./StepDetails";
import StepLocation from "./StepLocation";
import StepEmailGate from "./StepEmailGate";
import StepQuote from "./StepQuote";
import LivePricePreview from "./LivePricePreview";

export type WizardState = {
  service: ServiceId | null;
  stack: ServiceId[];
  junk: { tier: string; hauling: boolean };
  construction: { tier: string; hauling: boolean };
  singleItems: { items: { id: string; qty: number }[] };
  lightDemo: { kind: "deck" | "fence" | "shed" | "flooring"; cubicYards: number };
  snow: { plan: "per-visit" | "seasonal" | "commercial" };
  gutters: { homeType: GutterTierId };
  location: {
    area: ServiceArea;
    address: string;
    postal: string;
    phone: string;
    preferredContact: "email" | "phone";
    notes: string;
  };
  contact: { email: string; name: string; revealed: boolean };
};

const INITIAL_STATE: WizardState = {
  service: null,
  stack: [],
  junk: { tier: "half", hauling: false },
  construction: { tier: "half", hauling: false },
  singleItems: { items: [] },
  lightDemo: { kind: "deck", cubicYards: 3 },
  snow: { plan: "per-visit" },
  gutters: { homeType: "bungalow" },
  location: {
    area: "Calgary",
    address: "",
    postal: "",
    phone: "",
    preferredContact: "email",
    notes: "",
  },
  contact: { email: "", name: "", revealed: false },
};

const VALID_PREFILLS: ServiceId[] = [
  "junk",
  "construction",
  "single-items",
  "light-demo",
  "snow",
  "gutters",
];

function isLocationFilled(loc: WizardState["location"]): boolean {
  return (
    loc.address.trim().length >= 3 &&
    loc.postal.trim().length >= 3 &&
    loc.phone.replace(/\D/g, "").length >= 10
  );
}

export function estimateForService(state: WizardState, id: ServiceId): Estimate {
  switch (id) {
    case "junk":
      return estimateJunk(state.junk);
    case "construction":
      return estimateConstruction(state.construction);
    case "single-items":
      return estimateSingleItems(state.singleItems);
    case "light-demo":
      return estimateLightDemo(state.lightDemo);
    case "snow":
      return estimateSnow(state.snow);
    case "gutters":
      return estimateGutters(state.gutters);
  }
}

export default function EstimatorWizard() {
  const params = useSearchParams();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const topRef = useRef<HTMLDivElement | null>(null);
  const isInitial = useRef(true);

  useEffect(() => {
    const prefill = params.get("service");
    if (prefill && VALID_PREFILLS.includes(prefill as ServiceId)) {
      setState((s) => ({ ...s, service: prefill as ServiceId }));
      setStep(2);
    }
  }, [params]);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  // When user reaches Step 5, commit the current service to the stack.
  useEffect(() => {
    if (step === 5 && state.service && !state.stack.includes(state.service)) {
      const committed = state.service;
      setState((s) =>
        s.stack.includes(committed) ? s : { ...s, stack: [...s.stack, committed] }
      );
    }
  }, [step, state.service, state.stack]);

  const estimate: Estimate | null = useMemo(() => {
    if (!state.service) return null;
    return estimateForService(state, state.service);
  }, [state]);

  const runningStack = useMemo(() => {
    const ids =
      state.service && !state.stack.includes(state.service)
        ? [...state.stack, state.service]
        : state.stack;
    return ids.map((id) => estimateForService(state, id));
  }, [state]);

  const runningTotal = useMemo(() => {
    let low = 0;
    let high: number | null = 0;
    for (const e of runningStack) {
      low += e.totalLow;
      if (high === null || e.totalHigh === null) high = null;
      else high += e.totalHigh;
    }
    const isCustom = runningStack.length > 0 && runningStack.every((e) => e.lineItems.length === 0);
    return { low, high, count: runningStack.length, isCustom };
  }, [runningStack]);

  const canAdvance = useMemo(() => {
    if (step === 1) return !!state.service;
    if (step === 2) {
      if (state.service === "single-items") {
        return state.singleItems.items.length > 0;
      }
      if (state.service === "light-demo") return state.lightDemo.cubicYards > 0;
      return true;
    }
    if (step === 3) {
      const { address, postal, phone } = state.location;
      const phoneDigits = phone.replace(/\D/g, "");
      return (
        address.trim().length >= 3 &&
        postal.trim().length >= 3 &&
        phoneDigits.length >= 10
      );
    }
    return true;
  }, [step, state]);

  function next() {
    if (!canAdvance) return;
    setStep((s) => {
      let nextStep = Math.min(5, s + 1) as 1 | 2 | 3 | 4 | 5;
      // Skip Step 3 if location already filled (loop-back).
      if (nextStep === 3 && isLocationFilled(state.location)) {
        nextStep = 4;
      }
      // Skip Step 4 if email already revealed (loop-back).
      if (nextStep === 4 && state.contact.revealed) {
        nextStep = 5;
      }
      return nextStep;
    });
  }
  function back() {
    setStep((s) => {
      let prevStep = Math.max(1, s - 1) as 1 | 2 | 3 | 4 | 5;
      // Mirror skip on the way back.
      if (prevStep === 4 && state.contact.revealed) prevStep = 3;
      if (prevStep === 3 && isLocationFilled(state.location)) prevStep = 2;
      return prevStep;
    });
  }

  function update<K extends keyof WizardState>(key: K, value: WizardState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function pickService(id: ServiceId) {
    setState((s) => ({ ...s, service: id }));
    setStep(2);
  }

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
      <div ref={topRef} className="max-w-3xl mx-auto scroll-mt-28">
        {step < 5 && (
          <div className="mb-8 sm:mb-12 text-center">
            <p className="text-brand font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3">
              Free Estimate
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Get your estimate in under two minutes
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
              Tell us a bit about the job and we&apos;ll show a transparent price range. Final quote
              is always confirmed before we start.
            </p>
          </div>
        )}

        <Stepper step={step} />

        {(step === 2 || step === 3) && estimate && (
          <div className="mt-6 sm:mt-10">
            <LivePricePreview
              totalLow={runningTotal.low}
              totalHigh={runningTotal.high}
              serviceCount={runningTotal.count}
              isCustomQuote={runningTotal.isCustom}
              step={step}
            />
          </div>
        )}

        <div className={[
          (step === 2 || step === 3) ? "mt-0" : "mt-6 sm:mt-10",
          "bg-gradient-to-br from-ink-600 to-ink-700 rounded-2xl sm:rounded-3xl border border-white/5 shadow-2xl p-5 sm:p-8 md:p-10",
        ].join(" ")}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {step === 1 && (
                <StepServiceSelect selected={state.service} onSelect={pickService} />
              )}
              {step === 2 && state.service && (
                <StepDetails
                  service={state.service}
                  state={state}
                  update={update}
                  onChangeService={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <StepLocation
                  value={state.location}
                  onChange={(loc) => update("location", loc)}
                />
              )}
              {step === 4 && estimate && (
                <StepEmailGate
                  estimate={estimate}
                  contact={state.contact}
                  onChange={(c) => update("contact", c)}
                  onReveal={() => {
                    setState((s) => ({ ...s, contact: { ...s.contact, revealed: true } }));
                    setTimeout(() => setStep(5), 700);
                  }}
                />
              )}
              {step === 5 && estimate && (
                <StepQuote
                  estimate={estimate}
                  state={state}
                  onJump={(s) => setStep(s)}
                  onRemoveFromStack={(id) =>
                    setState((s) => ({
                      ...s,
                      stack: s.stack.filter((x) => x !== id),
                      service: s.service === id ? null : s.service,
                    }))
                  }
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {step < 4 && (
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-3 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              type="button"
              onClick={next}
              disabled={!canAdvance}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand to-brand-hover shadow-lg shadow-brand/30 hover:shadow-2xl hover:shadow-brand/50 text-white text-base sm:text-lg font-semibold rounded-full px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors px-4 py-3 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {state.contact.revealed && (
              <button
                type="button"
                onClick={() => setStep(5)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-brand to-brand-hover shadow-lg shadow-brand/30 hover:shadow-2xl hover:shadow-brand/50 text-white text-base sm:text-lg font-semibold rounded-full px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 hover:-translate-y-0.5"
              >
                View estimate
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
