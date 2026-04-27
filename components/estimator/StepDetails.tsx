"use client";

import { Pencil } from "lucide-react";
import { ServiceId, SERVICE_META } from "@/lib/pricing";
import type { WizardState } from "./EstimatorWizard";
import JunkInputs from "./services/JunkInputs";
import ConstructionInputs from "./services/ConstructionInputs";
import SingleItemsInputs from "./services/SingleItemsInputs";
import LightDemoInputs from "./services/LightDemoInputs";
import SnowInputs from "./services/SnowInputs";
import GuttersInputs from "./services/GuttersInputs";

export default function StepDetails({
  service,
  state,
  update,
  onChangeService,
}: {
  service: ServiceId;
  state: WizardState;
  update: <K extends keyof WizardState>(key: K, value: WizardState[K]) => void;
  onChangeService: () => void;
}) {
  const meta = SERVICE_META[service];

  return (
    <div>
      <header className="mb-6 sm:mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-brand text-xs uppercase tracking-wider font-semibold mb-2">
            {meta.label}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
            Tell us about the job
          </h2>
          <p className="text-white/70 text-sm sm:text-base">{meta.tagline}</p>
        </div>
        <button
          type="button"
          onClick={onChangeService}
          className="inline-flex items-center gap-1.5 text-white/60 hover:text-brand transition-colors text-xs sm:text-sm font-medium whitespace-nowrap mt-1"
        >
          <Pencil className="w-3.5 h-3.5" />
          Change
        </button>
      </header>

      {service === "junk" && (
        <JunkInputs value={state.junk} onChange={(v) => update("junk", v)} />
      )}
      {service === "construction" && (
        <ConstructionInputs
          value={state.construction}
          onChange={(v) => update("construction", v)}
        />
      )}
      {service === "single-items" && (
        <SingleItemsInputs
          value={state.singleItems}
          onChange={(v) => update("singleItems", v)}
        />
      )}
      {service === "light-demo" && (
        <LightDemoInputs value={state.lightDemo} onChange={(v) => update("lightDemo", v)} />
      )}
      {service === "snow" && (
        <SnowInputs value={state.snow} onChange={(v) => update("snow", v)} />
      )}
      {service === "gutters" && (
        <GuttersInputs value={state.gutters} onChange={(v) => update("gutters", v)} />
      )}
    </div>
  );
}
