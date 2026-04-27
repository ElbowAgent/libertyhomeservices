"use client";

import Link from "next/link";
import { Target, Shield, CircleCheckBig, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const blocks = [
  {
    icon: Target,
    title: "Our Story",
    body: "Founded by Jordan Swaim in 2022, Liberty Home Services was built on a commitment to exceptional service and customer satisfaction. What started as a junk removal company has grown to include comprehensive hauling and snow removal services for Calgary residents and businesses.",
  },
  {
    icon: Shield,
    title: "Why Choose Us",
    body: "As a locally owned Calgary business, we understand the unique needs of our community. We pride ourselves on transparent pricing, reliable service, and going the extra mile for every customer. Our highly-rated team treats your property with respect and delivers results that exceed expectations.",
  },
  {
    icon: CircleCheckBig,
    title: "Our Commitment",
    body: "From junk removal to snow clearing, we handle every project with professionalism and care. Customer satisfaction isn't just a goal—it's our guarantee. We're not satisfied until you're completely happy with our work.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-ink-900 to-ink-700"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-8 sm:space-y-12">
            {blocks.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-4 sm:gap-6 justify-center text-left"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand/30">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                      {b.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-sm sm:text-base">{b.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 sm:mt-12"
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand to-brand-hover hover:shadow-xl hover:shadow-brand/40 text-white font-semibold rounded-full px-8 py-4 transition-all duration-300 hover:-translate-y-1"
            >
              <Calendar className="w-5 h-5" />
              More About Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
