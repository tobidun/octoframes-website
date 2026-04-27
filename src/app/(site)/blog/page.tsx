import type { Metadata } from "next";
import BlogHeroSection from "@/components/sections/BlogHeroSection";
import BlogGridSection from "@/components/sections/BlogGridSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Blog — Octoframes Studio",
  description:
    "Motion design insights, behind-the-scenes stories, and creative tips from the Octoframes studio team.",
};

export default function BlogPage() {
  return (
    <div className="flex flex-col w-full font-sans">
      <BlogHeroSection />
      <BlogGridSection />
      <CTASection />
    </div>
  );
}
