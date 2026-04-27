import {
  CONSTRUCTION_TIERS,
  CROSS_SELL,
  DemoKind,
  GUTTER_TIERS,
  GutterTierId,
  HAULING_SURCHARGE,
  JUNK_TIERS,
  LIGHT_DEMO_RATE,
  LoadTier,
  SERVICE_META,
  SINGLE_ITEMS,
  SNOW_OPTIONS,
  ServiceId,
  SingleItem,
  SnowPlanId,
} from "./pricing";

export type LineItem = {
  label: string;
  qty?: number;
  low: number;
  high: number | null;
  note?: string;
};

export type Estimate = {
  service: ServiceId;
  serviceLabel: string;
  lineItems: LineItem[];
  totalLow: number;
  totalHigh: number | null;
  requiresContact: boolean;
  contactItems: { label: string; note?: string }[];
  notes: string[];
  crossSell: ServiceId[];
};

function tierById(tiers: readonly LoadTier[], id: string): LoadTier | undefined {
  return tiers.find((t) => t.id === id);
}

function withHauling(base: LineItem[], hauling: boolean): LineItem[] {
  if (!hauling) return base;
  return [
    ...base,
    {
      label: "Interior hauling (from inside home or yard)",
      low: HAULING_SURCHARGE.low,
      high: HAULING_SURCHARGE.high,
    },
  ];
}

function totals(items: LineItem[]): { low: number; high: number | null } {
  let low = 0;
  let high: number | null = 0;
  for (const item of items) {
    const qty = item.qty ?? 1;
    low += item.low * qty;
    if (high === null || item.high === null) {
      high = null;
    } else {
      high += item.high * qty;
    }
  }
  return { low, high };
}

function baseEstimate(service: ServiceId): Pick<Estimate, "service" | "serviceLabel" | "crossSell"> {
  return {
    service,
    serviceLabel: SERVICE_META[service].label,
    crossSell: CROSS_SELL[service] ?? [],
  };
}

export function estimateJunk(input: { tier: string; hauling: boolean }): Estimate {
  const tier = tierById(JUNK_TIERS, input.tier);
  if (!tier) throw new Error(`Unknown junk tier: ${input.tier}`);
  const items = withHauling(
    [{ label: `${tier.label} (${tier.volume})`, low: tier.price, high: tier.price }],
    input.hauling
  );
  const t = totals(items);
  return {
    ...baseEstimate("junk"),
    lineItems: items,
    totalLow: t.low,
    totalHigh: t.high,
    requiresContact: false,
    contactItems: [],
    notes: ["Includes labour, loading, fuel, disposal fees, and area cleanup."],
  };
}

export function estimateConstruction(input: { tier: string; hauling: boolean }): Estimate {
  const tier = tierById(CONSTRUCTION_TIERS, input.tier);
  if (!tier) throw new Error(`Unknown construction tier: ${input.tier}`);
  const items = withHauling(
    [{ label: `${tier.label} (${tier.volume})`, low: tier.price, high: tier.price }],
    input.hauling
  );
  const t = totals(items);
  return {
    ...baseEstimate("construction"),
    lineItems: items,
    totalLow: t.low,
    totalHigh: t.high,
    requiresContact: false,
    contactItems: [],
    notes: ["Materials: flooring, lumber, drywall, and similar renovation debris."],
  };
}

export function estimateSingleItems(input: {
  items: { id: string; qty: number }[];
}): Estimate {
  const lineItems: LineItem[] = [];
  const contactItems: { label: string; note?: string }[] = [];

  for (const sel of input.items) {
    if (sel.qty <= 0) continue;
    const item: SingleItem | undefined = SINGLE_ITEMS.find((i) => i.id === sel.id);
    if (!item) continue;
    if (item.contactOnly) {
      contactItems.push({ label: item.label, note: item.note });
      continue;
    }
    if (item.low === undefined || item.high === undefined) continue;
    lineItems.push({
      label: item.label,
      qty: sel.qty,
      low: item.low,
      high: item.high,
      note: item.note,
    });
  }

  const t = totals(lineItems);
  return {
    ...baseEstimate("single-items"),
    lineItems,
    totalLow: t.low,
    totalHigh: t.high,
    requiresContact: contactItems.length > 0,
    contactItems,
    notes:
      contactItems.length > 0
        ? ["Specialty items below are quoted directly — we'll reach out to confirm details."]
        : [],
  };
}

const DEMO_LABELS: Record<DemoKind, string> = {
  deck: "Deck Removal",
  fence: "Fence Removal",
  shed: "Shed Demolition",
  flooring: "Flooring Removal",
};

export function estimateLightDemo(input: { kind: DemoKind; cubicYards: number }): Estimate {
  const yards = Math.max(0, Math.round(input.cubicYards * 10) / 10);
  const total = yards * LIGHT_DEMO_RATE;
  const lineItems: LineItem[] = [
    {
      label: `${DEMO_LABELS[input.kind]} — ${yards} cu yd @ $${LIGHT_DEMO_RATE}/cu yd`,
      low: total,
      high: total,
    },
  ];
  return {
    ...baseEstimate("light-demo"),
    lineItems,
    totalLow: total,
    totalHigh: total,
    requiresContact: yards === 0,
    contactItems: [],
    notes: ["Includes haul-away and cleanup.", "Not sure on volume? We'll confirm on-site."],
  };
}

export function estimateSnow(input: { plan: SnowPlanId }): Estimate {
  const opt = SNOW_OPTIONS.find((o) => o.id === input.plan);
  if (!opt) throw new Error(`Unknown snow plan: ${input.plan}`);

  if (opt.contactOnly || opt.startingAt === null) {
    return {
      ...baseEstimate("snow"),
      lineItems: [],
      totalLow: 0,
      totalHigh: null,
      requiresContact: true,
      contactItems: [{ label: opt.label, note: opt.detail }],
      notes: ["Commercial and large-property pricing is quoted on-site."],
    };
  }

  const lineItems: LineItem[] = [
    {
      label: `${opt.label} (starting at, per ${opt.unit})`,
      low: opt.startingAt,
      high: null,
      note: opt.detail,
    },
  ];
  return {
    ...baseEstimate("snow"),
    lineItems,
    totalLow: opt.startingAt,
    totalHigh: null,
    requiresContact: false,
    contactItems: [],
    notes: [
      "Final price depends on property size and add-ons.",
      "Driveways, back paths, corner sidewalks, and patios add cost.",
    ],
  };
}

export function estimateGutters(input: { homeType: GutterTierId }): Estimate {
  const tier = GUTTER_TIERS.find((g) => g.id === input.homeType);
  if (!tier) throw new Error(`Unknown gutter tier: ${input.homeType}`);
  const lineItems: LineItem[] = [
    {
      label: `${tier.label} — ${tier.detail}`,
      low: tier.low,
      high: tier.high,
    },
  ];
  return {
    ...baseEstimate("gutters"),
    lineItems,
    totalLow: tier.low,
    totalHigh: tier.high,
    requiresContact: false,
    contactItems: [],
    notes: ["Includes full debris removal and downspout flush."],
  };
}

export function formatRange(low: number, high: number | null): string {
  if (high === null) return `$${low}+`;
  if (low === high) return `$${low}`;
  return `$${low}–$${high}`;
}

const CONFIDENCE_PADDING: Record<number, number> = {
  2: 0.5,
  3: 0.3,
  4: 0.2,
  5: 0.15,
};

const round5 = (n: number) => Math.round(n / 5) * 5;

export function widenedRange(
  low: number,
  high: number | null,
  step: number
): { low: number; high: number | null } {
  const pct = CONFIDENCE_PADDING[step] ?? 0.15;
  if (high === null) {
    return { low: Math.max(0, round5(low * (1 - pct))), high: null };
  }
  const mid = (low + high) / 2;
  const newLow = Math.max(0, round5(mid * (1 - pct)));
  const newHigh = Math.max(newLow, round5(mid * (1 + pct)));
  return { low: newLow, high: newHigh };
}
