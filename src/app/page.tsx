import GallerySection from "../app/components/GallerySection";
import Hero from "../app/components/Hero";
import HowItWorksSection from "../app/components/HowItWorksSection";
import WhySection from "../app/components/WhySection";

export default function HomePage() {
  return (
    <>
      <Hero />

      <main style={{ background: "#11151C" }}>
        <WhySection />
        <HowItWorksSection />
        <GallerySection />
      </main>

      {/* PAS DE FOOTER */}
    </>
  );
}
