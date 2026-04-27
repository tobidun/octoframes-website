import HeroSection from "@/components/sections/HeroSection";
import MotionSection from "@/components/sections/MotionSection";
import BrandsSection from "@/components/sections/BrandsSection";
import PartnersSection from "@/components/sections/PartnersSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col w-full font-sans">
      <HeroSection />
      <MotionSection />
      <BrandsSection />
      <PartnersSection />
      <CTASection />
      <FAQSection />
    </div>
  );
}
