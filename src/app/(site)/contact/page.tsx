import ContactHeroSection from "@/components/sections/ContactHeroSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Octoframes Studio",
  description:
    "Have any doubts? Reach out to Octoframes Studio. We're ready to help with your motion design, animation, and video editing projects.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full font-sans">
      <ContactHeroSection />
      {/* ContactFormSection is now rendered internally by ContactHeroSection */}
      <FAQSection />
      <CTASection />
    </div>
  );
}

