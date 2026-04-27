"use client";

import InstantEstimateCard from "./InstantEstimateCard";
import { Phone, MapPin } from "lucide-react";
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
        <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-14 items-center">
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
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 leading-relaxed max-w-2xl"
            >
              Locally owned and operated since 2022. We deliver exceptional junk removal, hauling,
              and snow removal services with fair, transparent pricing and reliable customer care.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-brand font-semibold text-base sm:text-lg mb-8"
            >
              Get a free estimate in under two minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="tel:5872889794"
                className="inline-flex items-center gap-2 bg-ink-900 border-2 border-white text-white hover:bg-white hover:text-ink-900 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Call / Text
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
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
            className="lg:justify-self-end w-full max-w-[600px] justify-self-center"
          >
            <InstantEstimateCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
