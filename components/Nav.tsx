"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Facebook } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
];

const FACEBOOK_URL = "https://www.facebook.com/libertyhomeservicescalgary";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4">
      <nav className="max-w-site mx-auto bg-ink-900/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl shadow-brand/30 px-4 sm:px-8 py-3 sm:py-4 transition-all duration-300 border border-brand/30">
        <div className="flex items-center justify-between">
          <Link href="#home" className="flex items-center" aria-label="Liberty Home Services">
            <Image
              src="/images/logo.png"
              alt="Liberty Home Services"
              width={220}
              height={64}
              priority
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
              style={{ transform: "scale(1.1)" }}
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white hover:text-brand transition-colors duration-300 text-[15px] font-medium whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border-[3px] border-brand text-brand hover:bg-gradient-to-r hover:from-brand hover:to-brand-hover hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-md shadow-brand/30"
            >
              <Facebook className="w-5 h-5" strokeWidth={2.5} fill="currentColor" />
            </a>
            <Link
              href="/#contact"
              className="px-6 xl:px-8 py-2.5 xl:py-3 bg-gradient-to-r from-brand to-brand-hover text-white rounded-full font-semibold shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/50 transition-all duration-300 text-[15px] whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-white p-2"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <ul className="lg:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-white hover:text-brand transition-colors py-2 text-[15px] font-medium"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-3 mt-2">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border-[3px] border-brand text-brand hover:bg-gradient-to-r hover:from-brand hover:to-brand-hover hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-md shadow-brand/30"
              >
                <Facebook className="w-5 h-5" strokeWidth={2.5} fill="currentColor" />
              </a>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="inline-block bg-gradient-to-r from-brand to-brand-hover text-white px-6 py-3 rounded-full font-semibold text-[15px] transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
