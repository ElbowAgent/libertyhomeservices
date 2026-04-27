"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PortfolioGallery from "./PortfolioGallery";
import { portfolioProjects } from "@/lib/projects";

const featured = portfolioProjects.slice(0, 3);

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-ink-900 to-ink-700"
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
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
            See how we&apos;ve helped Calgary residents declutter and maintain their properties
          </p>
        </motion.div>

        <PortfolioGallery projects={featured} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-ink-900 border-2 border-white text-white hover:bg-white hover:text-ink-900 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
