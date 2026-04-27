export type ServiceId =
  | "junk"
  | "construction"
  | "single-items"
  | "light-demo"
  | "snow"
  | "gutters";

export type LoadTier = {
  id: "min" | "quarter" | "half" | "three-quarter" | "full";
  label: string;
  volume: string;
  price: number;
  popular?: boolean;
};

export const JUNK_TIERS: readonly LoadTier[] = [
  { id: "min", label: "Minimum Load", volume: "1.5 cu yd or less", price: 50 },
  { id: "quarter", label: "¼ Load", volume: "2.5 cu yd", price: 75 },
  { id: "half", label: "½ Load", volume: "5 cu yd", price: 150, popular: true },
  { id: "three-quarter", label: "¾ Load", volume: "7.5 cu yd", price: 225 },
  { id: "full", label: "Full Load", volume: "10 cu yd", price: 300 },
] as const;

export const CONSTRUCTION_TIERS: readonly LoadTier[] = [
  { id: "min", label: "Minimum Load", volume: "1.5 cu yd or less", price: 50 },
  { id: "quarter", label: "¼ Load", volume: "2.5 cu yd", price: 100 },
  { id: "half", label: "½ Load", volume: "5 cu yd", price: 190, popular: true },
  { id: "three-quarter", label: "¾ Load", volume: "7.5 cu yd", price: 275 },
  { id: "full", label: "Full Load", volume: "10 cu yd", price: 360 },
] as const;

export const HAULING_SURCHARGE = { low: 25, high: 50 } as const;

export type SingleItemCategory = "furniture" | "appliances" | "specialty";

export type SingleItem = {
  id: string;
  label: string;
  category: SingleItemCategory;
  low?: number;
  high?: number;
  contactOnly?: boolean;
  note?: string;
};

export const SINGLE_ITEMS: readonly SingleItem[] = [
  { id: "sofa", label: "Sofa / Couch", category: "furniture", low: 50, high: 75 },
  { id: "sectional", label: "Sectional Sofa", category: "furniture", low: 80, high: 100 },
  { id: "loveseat", label: "Loveseat / Chair", category: "furniture", low: 50, high: 75 },
  { id: "mattress", label: "Mattress", category: "furniture", low: 50, high: 75 },
  { id: "box-spring", label: "Box Spring", category: "furniture", low: 50, high: 75 },
  { id: "table", label: "Table", category: "furniture", low: 50, high: 75 },
  { id: "bed-frame", label: "Bed Frame", category: "furniture", low: 50, high: 75 },
  { id: "desk", label: "Desk", category: "furniture", low: 50, high: 75 },
  { id: "bookshelf", label: "Bookshelf", category: "furniture", low: 50, high: 75 },
  { id: "dresser", label: "Dresser", category: "furniture", low: 50, high: 75 },

  { id: "fridge", label: "Refrigerator", category: "appliances", low: 75, high: 100 },
  { id: "washer-dryer", label: "Washer or Dryer", category: "appliances", low: 50, high: 75, note: "Per unit" },
  { id: "hot-water-tank", label: "Hot Water Tank", category: "appliances", low: 50, high: 75 },
  { id: "dishwasher", label: "Dishwasher", category: "appliances", low: 50, high: 75 },
  { id: "stove", label: "Stove", category: "appliances", low: 50, high: 75 },
  { id: "ac", label: "Air Conditioner", category: "appliances", low: 50, high: 75 },

  { id: "tv", label: "TV (flat screen)", category: "specialty", low: 50, high: 75 },
  {
    id: "exercise",
    label: "Exercise Equipment",
    category: "specialty",
    low: 75,
    high: 100,
    note: "Treadmill, elliptical, etc.",
  },
  { id: "tires", label: "Tires (up to 5)", category: "specialty", low: 50, high: 50 },
  {
    id: "piano",
    label: "Piano (upright)",
    category: "specialty",
    low: 100,
    high: 150,
    note: "Demolition only — no transport or donation",
  },
  {
    id: "pool-table",
    label: "Pool Table",
    category: "specialty",
    low: 100,
    high: 150,
    note: "Demolition only — no transport or donation",
  },
  {
    id: "hot-tub",
    label: "Hot Tub / Spa",
    category: "specialty",
    contactOnly: true,
    note: "Quoted directly — final price depends on size, location, and disposal",
  },
] as const;

export type DemoKind = "deck" | "fence" | "shed" | "flooring";

export const LIGHT_DEMO_RATE = 60;

export const LIGHT_DEMO_KINDS: readonly { id: DemoKind; label: string; sizingHint: string }[] = [
  { id: "deck", label: "Deck Removal", sizingHint: "Small deck ≈ 3 cu yd · large deck ≈ 6–10 cu yd" },
  { id: "fence", label: "Fence Removal", sizingHint: "20 ft fence ≈ 2 cu yd · full yard ≈ 4–6 cu yd" },
  { id: "shed", label: "Shed Demolition", sizingHint: "Standard 8x10 shed ≈ 4 cu yd" },
  { id: "flooring", label: "Flooring Removal", sizingHint: "300 sq ft ≈ 2 cu yd" },
] as const;

export type SnowPlanId = "per-visit" | "seasonal" | "commercial";

export const SNOW_OPTIONS: readonly {
  id: SnowPlanId;
  label: string;
  startingAt: number | null;
  unit: string;
  detail: string;
  contactOnly?: boolean;
}[] = [
  {
    id: "per-visit",
    label: "Per Visit",
    startingAt: 25,
    unit: "visit",
    detail: "City sidewalk + path to door",
  },
  {
    id: "seasonal",
    label: "Seasonal Contract",
    startingAt: 125,
    unit: "month",
    detail: "Unlimited visits, Nov–Mar",
  },
  {
    id: "commercial",
    label: "Commercial / Large Property",
    startingAt: null,
    unit: "",
    detail: "Quoted on-site",
    contactOnly: true,
  },
] as const;

export type GutterTierId = "bungalow" | "two-storey" | "large";

export const GUTTER_TIERS: readonly {
  id: GutterTierId;
  label: string;
  detail: string;
  low: number;
  high: number | null;
}[] = [
  {
    id: "bungalow",
    label: "Standard Bungalow",
    detail: "Up to 1,500 sq ft",
    low: 100,
    high: 150,
  },
  {
    id: "two-storey",
    label: "Two-Storey Home",
    detail: "Standard two-storey",
    low: 150,
    high: 250,
  },
  {
    id: "large",
    label: "Large / Custom Home",
    detail: "2,500+ sq ft",
    low: 250,
    high: null,
  },
] as const;

export const SERVICE_AREAS = ["Calgary", "Chestermere", "Airdrie"] as const;
export type ServiceArea = (typeof SERVICE_AREAS)[number] | "Other";

export const UNIVERSAL_DISCLAIMERS = [
  "All prices in CAD, plus GST",
  "Estimate only — firm quote provided before work begins",
  "Final price may vary based on weight, accessibility, distance, volume, and disposal rates",
] as const;

export const SERVICE_META: Record<
  ServiceId,
  { label: string; description: string; tagline: string }
> = {
  junk: {
    label: "Junk Removal",
    description: "Furniture, appliances, household clutter — gone same week.",
    tagline: "Curbside pickup. Includes labour, fuel, and disposal.",
  },
  construction: {
    label: "Construction Cleanup",
    description: "Flooring, lumber, drywall, and renovation debris hauled away.",
    tagline: "Curbside pickup. Includes labour, fuel, and disposal.",
  },
  "single-items": {
    label: "Single Items",
    description: "Just one or two pieces? Pick the items, get a quick range.",
    tagline: "Furniture, appliances, electronics, and specialty items.",
  },
  "light-demo": {
    label: "Light Demolition",
    description: "Deck, fence, shed, or flooring removal with cleanup.",
    tagline: "$60 per cubic yard. Haul-away included.",
  },
  snow: {
    label: "Snow Removal",
    description: "Per-visit clears or seasonal contracts across Calgary.",
    tagline: "Final price depends on property and add-ons.",
  },
  gutters: {
    label: "Gutter Cleaning",
    description: "Full debris removal and downspout flush.",
    tagline: "Priced by home type.",
  },
};

export const CROSS_SELL: Record<ServiceId, ServiceId[]> = {
  junk: ["gutters", "snow"],
  construction: ["light-demo", "junk"],
  "single-items": ["junk", "gutters"],
  "light-demo": ["construction", "junk"],
  snow: ["gutters", "junk"],
  gutters: ["junk", "snow"],
};
