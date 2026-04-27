"use client";

import Link from "next/link";
import ContactForm from "./ContactForm";
import { Calendar, ArrowRight, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(7,7,7,0.75), rgba(7,7,7,0.75)), url('/images/hero-bg.png')",
      }}
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 w-full py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-brand font-semibold text-sm sm:text-base uppercase tracking-wider mb-4"
            >
              Liberating You From Clutter
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
            >
              Professional Junk Removal in{" "}
              <span className="inline-block bg-gradient-to-r from-brand to-brand-hover px-5 sm:px-7 pt-3 pb-4 mt-3 rounded-xl leading-none shadow-2xl shadow-brand/40">
                Calgary
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl"
            >
              Locally owned and operated since 2022. We deliver exceptional junk removal, hauling,
              and snow removal services with fair, transparent pricing and reliable customer care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-brand to-brand-hover shadow-xl shadow-brand/30 hover:shadow-2xl hover:shadow-brand/50 text-white text-lg font-semibold rounded-full px-8 py-4 transition-all duration-300 hover:-translate-y-1"
              >
                <Calendar className="w-6 h-6" />
                Get a Quote
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 bg-ink-900 border-2 border-white text-white hover:bg-white hover:text-ink-900 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                See Our Work
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-brand">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-white font-semibold">4.9/5</span>
                <span className="text-white/60">10+ Google Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin size={16} className="text-brand" />
                <span>Locally Owned &amp; Operated</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:justify-self-end w-full max-w-[480px] justify-self-center"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
