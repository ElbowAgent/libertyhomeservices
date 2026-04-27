"use client";

import { AlertTriangle, Mail, Phone } from "lucide-react";
import { SERVICE_AREAS, ServiceArea } from "@/lib/pricing";

type LocationValue = {
  area: ServiceArea;
  address: string;
  postal: string;
  phone: string;
  preferredContact: "email" | "phone";
  notes: string;
};

const AREAS: ServiceArea[] = [...SERVICE_AREAS, "Other"];

export default function StepLocation({
  value,
  onChange,
}: {
  value: LocationValue;
  onChange: (v: LocationValue) => void;
}) {
  const inputClass =
    "flex w-full rounded-md border bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/50 backdrop-blur-sm h-12 text-base px-3 py-1 transition-colors";

  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="text-brand text-xs uppercase tracking-wider font-semibold mb-2">Location</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
          Where is the job?
        </h2>
        <p className="text-white/70 text-sm sm:text-base">
          We serve Calgary and nearby. We&apos;ll use this to confirm we can reach you and price
          travel correctly.
        </p>
      </header>

      <div className="space-y-5">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            City <span className="text-brand">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {AREAS.map((a) => {
              const isActive = value.area === a;
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => onChange({ ...value, area: a })}
                  className={[
                    "rounded-xl p-3 border text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-brand/20 to-brand/5 border-brand text-white shadow-lg shadow-brand/20"
                      : "bg-white/[0.03] border-white/10 text-white/80 hover:border-brand/40 hover:text-white",
                  ].join(" ")}
                >
                  {a}
                </button>
              );
            })}
          </div>
          {value.area === "Other" && (
            <div className="mt-3 flex items-start gap-3 rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm">
              <AlertTriangle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
              <p className="text-white/80 leading-relaxed">
                We may not service your area yet — submit anyway and we&apos;ll confirm whether we
                can reach you.
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2" htmlFor="address">
            Street address <span className="text-brand">*</span>
          </label>
          <input
            id="address"
            type="text"
            required
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
            placeholder="123 Example St SE"
            autoComplete="street-address"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2" htmlFor="postal">
              Postal code <span className="text-brand">*</span>
            </label>
            <input
              id="postal"
              type="text"
              required
              value={value.postal}
              onChange={(e) => onChange({ ...value, postal: e.target.value.toUpperCase() })}
              placeholder="T2B 0S7"
              autoComplete="postal-code"
              maxLength={7}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2" htmlFor="phone">
              Phone <span className="text-brand">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={value.phone}
              onChange={(e) => onChange({ ...value, phone: e.target.value })}
              placeholder="(587) 123-4567"
              autoComplete="tel"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            How should we get back to you?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...value, preferredContact: "email" })}
              className={[
                "flex items-center justify-center gap-2 rounded-xl p-3 border text-sm font-semibold transition-all duration-300",
                value.preferredContact === "email"
                  ? "bg-gradient-to-br from-brand/20 to-brand/5 border-brand text-white"
                  : "bg-white/[0.03] border-white/10 text-white/80 hover:border-brand/40",
              ].join(" ")}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...value, preferredContact: "phone" })}
              className={[
                "flex items-center justify-center gap-2 rounded-xl p-3 border text-sm font-semibold transition-all duration-300",
                value.preferredContact === "phone"
                  ? "bg-gradient-to-br from-brand/20 to-brand/5 border-brand text-white"
                  : "bg-white/[0.03] border-white/10 text-white/80 hover:border-brand/40",
              ].join(" ")}
            >
              <Phone className="w-4 h-4" />
              Phone / Text
            </button>
          </div>
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2" htmlFor="notes">
            Anything we should know about the property?{" "}
            <span className="text-white/40 font-normal">(optional)</span>
          </label>
          <textarea
            id="notes"
            value={value.notes}
            onChange={(e) => onChange({ ...value, notes: e.target.value })}
            rows={3}
            placeholder="Stairs, narrow access, gate code, parking notes…"
            className="flex w-full rounded-md border bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/50 backdrop-blur-sm text-base px-3 py-3 transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
}
