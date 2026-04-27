import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liberty Home Services | Professional Junk Removal in Calgary",
  description:
    "Locally owned and operated since 2022. Liberty Home Services delivers exceptional junk removal, hauling, and snow removal in Calgary with fair, transparent pricing.",
  metadataBase: new URL("https://libertyhomeservices.ca"),
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Liberty Home Services",
    description: "Professional Junk Removal in Calgary",
    url: "https://libertyhomeservices.ca",
    siteName: "Liberty Home Services",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink-700 text-white antialiased">{children}</body>
    </html>
  );
}
