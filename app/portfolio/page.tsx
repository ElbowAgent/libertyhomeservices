import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PortfolioGallery from "@/components/PortfolioGallery";
import { portfolioProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio | Liberty Home Services",
  description:
    "Recent junk removal, hauling, and snow clearing projects in Calgary. Click any project to view before & after photos.",
};

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-ink-900">
        <section className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-br from-ink-900 via-ink-700 to-ink-900 text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 0%, rgba(233,117,36,0.3), transparent 50%), radial-gradient(circle at 80% 100%, rgba(233,117,36,0.2), transparent 50%)",
            }}
          />
          <div className="relative max-w-site mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <span className="inline-block text-brand text-sm font-semibold tracking-wider uppercase mb-4">
              Our Work
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Recent{" "}
              <span className="inline-block bg-gradient-to-r from-brand to-brand-hover px-5 sm:px-7 pt-3 pb-4 rounded-xl leading-none shadow-2xl shadow-brand/40">
                Projects
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              See the transformation! Click any project to view before &amp; after photos.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-ink-900 to-ink-700">
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
            <PortfolioGallery projects={portfolioProjects} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
