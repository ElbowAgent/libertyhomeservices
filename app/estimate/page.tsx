import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EstimatorWizard from "@/components/estimator/EstimatorWizard";

export const metadata: Metadata = {
  title: "Get Your Estimate | Liberty Home Services",
  description:
    "Get a free, transparent estimate for junk removal, construction cleanup, snow, gutters, and more in Calgary. Takes about two minutes.",
};

export default function EstimatePage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-28 sm:pt-32 pb-16 bg-gradient-to-b from-ink-700 to-ink-900">
        <Suspense fallback={null}>
          <EstimatorWizard />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
