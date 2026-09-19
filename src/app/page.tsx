import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Categories from "@/components/Categories";
import Featured from "@/components/Featured";
import Moments from "@/components/Moments";
import Units from "@/components/Units";
import CTA from "@/components/CTA";
import Social from "@/components/Social";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <div className="grain relative">
        <Preloader />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Categories />
          <Featured />
          <Moments />
          <Units />
          <CTA />
          <Social />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
