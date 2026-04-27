"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    initial: "M",
    name: "Melody Guilloux",
    when: "4 months ago",
    body: "Jordan was great to deal with. He came the same day and removed everything so efficiently. His company name is great because getting all the stuff out of the house was liberating. Thank you for your help Jordan!",
  },
  {
    initial: "G",
    name: "Gaurav Dhillon",
    when: "6 months ago",
    body: "Best service and efficiency. Both men worked hard tearing down our bed frames with ease, fast and efficient!",
  },
  {
    initial: "J",
    name: "Joel Birney",
    when: "11 months ago",
    body: "Came by CRAZY quick, great price, and helped carry everything. 10/10",
  },
];

const googleReviewUrl =
  "https://www.google.com/search?q=Liberty+Junk+Removal+%26+Hauling+Calgary";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-ink-700 to-ink-900">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-brand text-sm font-semibold tracking-wider uppercase mb-3">
            Google Reviews
          </span>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-5xl font-bold bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
              4.9
            </span>
            <div className="flex items-center gap-1 text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={22} fill="currentColor" />
              ))}
            </div>
          </div>
          <p className="text-white/60">(10+ reviews)</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gradient-to-br from-ink-600 to-ink-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-hover text-white font-bold flex items-center justify-center text-lg shadow-lg shadow-brand/30">
                  {r.initial}
                </div>
                <div>
                  <p className="font-semibold text-white">{r.name}</p>
                  <p className="text-sm text-white/50">{r.when}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-brand mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-white/70 leading-relaxed">{r.body}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ink-900 border-2 border-white text-white hover:bg-white hover:text-ink-900 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300"
          >
            Review us on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
