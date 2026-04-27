"use client";

const STEPS = [
  { n: 1, label: "Service" },
  { n: 2, label: "Details" },
  { n: 3, label: "Location" },
  { n: 4, label: "Reveal" },
  { n: 5, label: "Quote" },
] as const;

export default function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-3">
      {STEPS.map((s, idx) => {
        const done = step > s.n;
        const active = step === s.n;
        return (
          <li key={s.n} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  active
                    ? "bg-gradient-to-r from-brand to-brand-hover text-white shadow-lg shadow-brand/40"
                    : done
                    ? "bg-brand/20 text-brand border border-brand/40"
                    : "bg-white/5 text-white/40 border border-white/10",
                ].join(" ")}
              >
                {s.n}
              </div>
              <span
                className={[
                  "hidden sm:block text-[11px] uppercase tracking-wider font-medium transition-colors",
                  active ? "text-brand" : done ? "text-white/70" : "text-white/40",
                ].join(" ")}
              >
                {s.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <span
                className={[
                  "h-px w-6 sm:w-10 transition-colors duration-300",
                  step > s.n ? "bg-brand/60" : "bg-white/10",
                ].join(" ")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
