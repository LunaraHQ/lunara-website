import HeroSection from "../components/HeroSection";
import FeatureGrid from "../components/FeatureGrid";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-[#1a103e] via-[#6E41FF] to-[#130b24] min-h-screen flex flex-col">
      {/* Main Hero Section */}
      <HeroSection />
      {/* Feature Grid Section (3 highlights) */}
      <FeatureGrid />
      {/* Modular Features + Security + Pricing */}
      <HomeContent />
      {/* Footer */}
      <Footer />
    </main>
  );
}
