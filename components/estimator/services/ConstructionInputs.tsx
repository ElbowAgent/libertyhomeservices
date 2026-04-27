"use client";

import { CONSTRUCTION_TIERS } from "@/lib/pricing";
import TierPicker from "./TierPicker";
import HaulingToggle from "./HaulingToggle";

type Value = { tier: string; hauling: boolean };

export default function ConstructionInputs({
  value,
  onChange,
}: {
  value: Value;
  onChange: (v: Value) => void;
}) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h3 className="text-white font-semibold text-sm sm:text-base mb-3">
          How much material needs to go?
        </h3>
        <TierPicker
          tiers={CONSTRUCTION_TIERS}
          selected={value.tier}
          onSelect={(id) => onChange({ ...value, tier: id })}
        />
      </div>

      <div>
        <h3 className="text-white font-semibold text-sm sm:text-base mb-3">
          Where is the debris staged?
        </h3>
        <HaulingToggle
          hauling={value.hauling}
          onChange={(hauling) => onChange({ ...value, hauling })}
        />
      </div>
    </div>
  );
}
