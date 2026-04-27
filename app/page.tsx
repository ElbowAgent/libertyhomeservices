import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Testimonials />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
