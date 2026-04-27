import Script from "next/script";

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="py-3 sm:py-4 lg:py-6 bg-gradient-to-b from-ink-700 to-ink-900"
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12">
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="lazyOnload"
        />
        <div
          className="elfsight-app-9153a3da-5c71-4d97-b526-ca65ff63e841"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
}
