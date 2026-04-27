import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, User } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
];

const services = [
  { href: "/#services", label: "Junk Removal" },
  { href: "/#services", label: "Hauling Services" },
  { href: "/#services", label: "Snow Removal" },
  { href: "/#services", label: "View All Services" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-ink-900 to-ink-800 border-t border-brand/20">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Liberty Home Services"
              width={200}
              height={48}
              className="h-12 w-auto object-contain mb-6"
              style={{ transform: "scale(1.1)", transformOrigin: "left center" }}
            />
            <p className="text-white/70 leading-relaxed mb-6">
              Liberating you from clutter! Locally owned and operated since 2022, serving Calgary
              with professional junk removal and property services.
            </p>
            <a
              href="tel:5872889794"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover transition-colors"
            >
              <Phone size={16} />
              Need Urgent Service?
            </a>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-brand">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-white/70 hover:text-brand transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-brand">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-white/70 hover:text-brand transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-brand">Get in Touch</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <User size={16} className="text-brand mt-1 flex-shrink-0" />
                <span>
                  <span className="block text-xs text-white/50">Owner</span>
                  Jordan Swaim
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-brand mt-1 flex-shrink-0" />
                <a
                  href="mailto:jordan@libertyhomeservices.ca"
                  className="hover:text-brand transition-colors break-all"
                >
                  jordan@libertyhomeservices.ca
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-brand mt-1 flex-shrink-0" />
                <a href="tel:5872889794" className="hover:text-brand transition-colors">
                  (587) 288-9794
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-brand mt-1 flex-shrink-0" />
                <span>
                  3062 30A Street SE
                  <br />
                  Calgary, AB T2B 0S7
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-white/50">
          <p>© 2025 Liberty Home Services LLC | All Rights Reserved</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand transition-colors">
              Privacy Policy
            </Link>
            <span>
              Developed by{" "}
              <a
                href="https://alturosdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors"
              >
                Alturos Digital
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
