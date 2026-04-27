"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const projectTypes = ["Junk Removal", "Hauling Services", "Snow Removal", "Other"];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "flex w-full rounded-md border bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/50 backdrop-blur-sm h-12 text-base px-3 py-1 shadow-sm transition-colors";

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Get Your Free Quote</h3>
      <p className="text-white/70 mb-6">
        Fill out the form and we&apos;ll get back to you within 24 hours
      </p>

      {submitted ? (
        <div className="text-brand text-center py-8 font-semibold">
          Thanks — we&apos;ll be in touch within 24 hours.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" required placeholder="Your Name *" className={inputClass} />
          <input type="email" name="email" required placeholder="Email Address *" className={inputClass} />
          <input type="tel" name="phone" required placeholder="Phone Number *" className={inputClass} />
          <div className="relative">
            <select
              name="projectType"
              required
              defaultValue=""
              className={`${inputClass} appearance-none pr-10 cursor-pointer`}
            >
              <option value="" disabled className="bg-ink-700">
                Project Type *
              </option>
              {projectTypes.map((t) => (
                <option key={t} value={t} className="bg-ink-700">
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand to-brand-hover shadow-lg shadow-brand/30 hover:shadow-2xl hover:shadow-brand/50 text-white font-semibold text-lg rounded-xl py-3 transition-all duration-300 hover:-translate-y-1"
          >
            Get Free Quote
          </button>
        </form>
      )}
    </div>
  );
}
