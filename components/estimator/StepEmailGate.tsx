"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { Estimate } from "@/lib/estimator";
import QuoteCard from "./QuoteCard";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Contact = { email: string; name: string; revealed: boolean };

export default function StepEmailGate({
  estimate,
  contact,
  onChange,
  onReveal,
}: {
  estimate: Estimate;
  contact: Contact;
  onChange: (v: Contact) => void;
  onReveal: () => void;
}) {
  const [touched, setTouched] = useState(false);
  const valid = EMAIL_RE.test(contact.email.trim());

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onChange({ ...contact, revealed: true });
    onReveal();
  }

  const inputClass =
    "flex w-full rounded-md border bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/50 backdrop-blur-sm h-12 text-base px-3 py-1 transition-colors";

  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="text-brand text-xs uppercase tracking-wider font-semibold mb-2">
          Almost there
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
          Where should we send your estimate?
        </h2>
        <p className="text-white/70 text-sm sm:text-base">
          We&apos;ll email a copy and reach out within 24 hours to confirm.
        </p>
      </header>

      <div className="relative min-h-[460px] sm:min-h-[420px]">
        <motion.div
          animate={{
            filter: contact.revealed ? "blur(0px)" : "blur(8px)",
            opacity: contact.revealed ? 1 : 0.55,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className={contact.revealed ? "" : "pointer-events-none select-none"}
        >
          <QuoteCard estimate={estimate} step={4} compact />
        </motion.div>

        {!contact.revealed && (
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            onSubmit={submit}
            className="absolute inset-0 flex items-center justify-center p-3 sm:p-6"
          >
            <div className="w-full max-w-sm bg-ink-900/80 backdrop-blur-xl rounded-2xl border border-brand/30 shadow-2xl shadow-brand/20 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-brand" />
                <span className="text-brand text-xs uppercase tracking-wider font-bold">
                  Get your estimate
                </span>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold mb-1">
                Enter your email to reveal
              </h3>
              <p className="text-white/60 text-sm mb-4">
                No spam. We&apos;ll only use this to send your quote and confirm details.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  required
                  autoFocus
                  value={contact.email}
                  onChange={(e) => onChange({ ...contact, email: e.target.value })}
                  placeholder="you@example.com"
                  className={inputClass}
                  aria-invalid={touched && !valid}
                />
                {touched && !valid && (
                  <p className="text-red-400 text-xs">
                    Please enter a valid email address.
                  </p>
                )}
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => onChange({ ...contact, name: e.target.value })}
                  placeholder="Name (optional)"
                  className={inputClass}
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-brand-hover shadow-lg shadow-brand/30 hover:shadow-2xl hover:shadow-brand/50 text-white font-semibold rounded-xl py-3 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  Reveal my estimate
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
