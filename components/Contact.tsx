"use client";

import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 lg:py-32 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/90 to-ink-900/70" />
      <div className="absolute inset-0 bg-gradient-to-tr from-brand/30 via-brand/10 to-transparent mix-blend-overlay" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-site mx-auto px-4 sm:px-6 lg:px-12 text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
          Transform Your Property Today
        </h2>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Ready to declutter, clean, or maintain your property? Reach out to us for expert service
          at competitive prices. Jordan and his team are here to help!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:5872889794"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-brand to-brand-hover shadow-xl shadow-brand/30 hover:shadow-2xl hover:shadow-brand/50 text-white text-lg font-semibold rounded-full px-8 py-4 transition-all duration-300 hover:-translate-y-1"
          >
            <Phone className="w-5 h-5" />
            (587) 288-9794
          </a>
          <span className="text-white/60">or</span>
          <Link
            href="#home"
            className="inline-flex items-center gap-2 bg-ink-900 border-2 border-white text-white hover:bg-white hover:text-ink-900 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300"
          >
            <Calendar className="w-5 h-5" />
            Get a Quote
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
