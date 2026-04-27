"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Info, Minus, Plus } from "lucide-react";
import { SINGLE_ITEMS, SingleItem, SingleItemCategory } from "@/lib/pricing";

type Value = { items: { id: string; qty: number }[] };

const CATEGORIES: { id: SingleItemCategory; label: string }[] = [
  { id: "furniture", label: "Furniture" },
  { id: "appliances", label: "Appliances" },
  { id: "specialty", label: "Electronics & Specialty" },
];

export default function SingleItemsInputs({
  value,
  onChange,
}: {
  value: Value;
  onChange: (v: Value) => void;
}) {
  const [open, setOpen] = useState<Record<SingleItemCategory, boolean>>({
    furniture: true,
    appliances: false,
    specialty: false,
  });

  const qtyById = useMemo(() => {
    const m: Record<string, number> = {};
    for (const i of value.items) m[i.id] = i.qty;
    return m;
  }, [value.items]);

  function setQty(id: string, qty: number) {
    const next = value.items.filter((i) => i.id !== id);
    if (qty > 0) next.push({ id, qty });
    onChange({ items: next });
  }

  function addItem(item: SingleItem) {
    setQty(item.id, item.contactOnly ? 1 : (qtyById[item.id] ?? 0) + 1);
  }

  const hasContactOnly = value.items.some((sel) => {
    const item = SINGLE_ITEMS.find((i) => i.id === sel.id);
    return item?.contactOnly;
  });

  return (
    <div className="space-y-3 sm:space-y-4">
      {CATEGORIES.map((cat) => {
        const items = SINGLE_ITEMS.filter((i) => i.category === cat.id);
        const isOpen = open[cat.id];
        const countInCat = items.reduce((acc, i) => acc + (qtyById[i.id] ?? 0), 0);
        return (
          <section
            key={cat.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpen((o) => ({ ...o, [cat.id]: !o[cat.id] }))}
              className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold text-sm sm:text-base">{cat.label}</span>
                {countInCat > 0 && (
                  <span className="bg-brand/20 text-brand text-xs font-bold px-2 py-0.5 rounded-full border border-brand/40">
                    {countInCat}
                  </span>
                )}
              </div>
              <ChevronDown
                className={[
                  "w-4 h-4 text-white/60 transition-transform duration-300",
                  isOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>
            {isOpen && (
              <ul className="divide-y divide-white/5 border-t border-white/5">
                {items.map((item) => {
                  const qty = qtyById[item.id] ?? 0;
                  const selected = qty > 0;
                  return (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-white text-sm font-medium">{item.label}</div>
                        {(item.contactOnly || item.note) && (
                          <div className="text-xs text-white/50 mt-0.5 flex flex-wrap items-center gap-2">
                            {item.contactOnly && (
                              <span className="text-brand/80 font-semibold uppercase tracking-wider text-[10px]">
                                Contact only
                              </span>
                            )}
                            {item.note && <span className="text-white/40">{item.note}</span>}
                          </div>
                        )}
                      </div>
                      {item.contactOnly ? (
                        <button
                          type="button"
                          onClick={() => setQty(item.id, selected ? 0 : 1)}
                          className={[
                            "text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors whitespace-nowrap",
                            selected
                              ? "bg-brand text-white border-brand"
                              : "bg-white/5 text-white/80 border-white/15 hover:border-brand/60 hover:text-brand",
                          ].join(" ")}
                        >
                          {selected ? "Added" : "Add"}
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-full p-1">
                          <button
                            type="button"
                            onClick={() => setQty(item.id, Math.max(0, qty - 1))}
                            disabled={qty === 0}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-brand hover:bg-white/5 disabled:opacity-30 transition-colors"
                            aria-label={`Decrease ${item.label}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-white text-sm font-semibold w-6 text-center tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => addItem(item)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-brand hover:bg-brand/15 transition-colors"
                            aria-label={`Increase ${item.label}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}

      {hasContactOnly && (
        <div className="flex items-start gap-3 rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm">
          <Info className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
          <p className="text-white/80 leading-relaxed">
            Hot-tub jobs are quoted directly. We&apos;ll route you to our contact team after this
            step so we can confirm size, location, and disposal.
          </p>
        </div>
      )}
    </div>
  );
}
