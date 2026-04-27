"use client";

import Link from "next/link";
import { Trash2, Truck, Snowflake } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Trash2,
    title: "Junk Removal",
    price: "Starting at $50",
    body: "Fast and efficient removal of unwanted items from your property. We handle everything from furniture to appliances with care and professionalism.",
  },
  {
    icon: Truck,
    title: "Hauling Services",
    price: "$60 per hour",
    body: "Professional hauling for residential and commercial needs. Safe transportation of your items wherever they need to go across Calgary.",
  },
  {
    icon: Snowflake,
    title: "Snow Removal",
    price: "Starting at $25",
    body: "Reliable snow clearing to keep your property safe and accessible throughout Calgary's winter months with prompt service.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-ink-700 to-ink-900"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive solutions for all your property maintenance needs in Calgary
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-gradient-to-br from-ink-600 to-ink-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/5"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-brand/30">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  {s.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
                    {s.price}
                  </span>
                </div>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6">{s.body}</p>
                <Link
                  href="#contact"
                  className="block w-full text-center bg-gradient-to-r from-brand to-brand-hover shadow-md shadow-brand/30 hover:shadow-xl hover:shadow-brand/50 text-white font-semibold rounded-xl py-2 px-4 transition-all duration-300 hover:-translate-y-1"
                >
                  Book Now
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
