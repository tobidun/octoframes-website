"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Neon Genesis",
    category: "3D Animation",
    client: "TechFlow Inc.",
    year: "2024",
    image: "/image-1.jpg",
    content: [
      { type: "image", src: "/image-1.jpg" },
      { type: "image", src: "/image-2.jpg" },
      { type: "image", src: "/image-3.jpg" },
      { type: "image", src: "/image-4.jpg" },
      { type: "image", src: "/image-5.jpg" },
    ],
  },
  {
    id: 2,
    title: "Quantum Pay",
    category: "Motion Graphics",
    client: "Fintech Co",
    year: "2024",
    image: "/image-2.jpg",
    content: [
      { type: "image", src: "/image-2.jpg" },
      { type: "image", src: "/image-3.jpg" },
      { type: "image", src: "/image-4.jpg" },
      { type: "image", src: "/image-5.jpg" },
      { type: "image", src: "/image-6.jpg" },
    ],
  },
  {
    id: 3,
    title: "Echo Brand Reveal",
    category: "VFX & Compositing",
    client: "Echo Sound",
    year: "2023",
    image: "/image-3.jpg",
    content: [
      { type: "image", src: "/image-3.jpg" },
      { type: "image", src: "/image-4.jpg" },
      { type: "image", src: "/image-5.jpg" },
      { type: "image", src: "/image-6.jpg" },
      { type: "image", src: "/image-1.jpg" },
    ],
  },
  {
    id: 4,
    title: "Aura Skincare",
    category: "Product Rendering",
    client: "Aura Beauty",
    year: "2023",
    image: "/image-4.jpg",
    content: [
      { type: "image", src: "/image-4.jpg" },
      { type: "image", src: "/image-5.jpg" },
      { type: "image", src: "/image-6.jpg" },
      { type: "image", src: "/image-1.jpg" },
      { type: "image", src: "/image-2.jpg" },
    ],
  },
  {
    id: 5,
    title: "Nexus Cyber",
    category: "Brand Campaign",
    client: "Nexus Sec",
    year: "2025",
    image: "/image-5.jpg",
    content: [
      { type: "image", src: "/image-5.jpg" },
      { type: "image", src: "/image-6.jpg" },
      { type: "image", src: "/image-1.jpg" },
      { type: "image", src: "/image-2.jpg" },
      { type: "image", src: "/image-3.jpg" },
    ],
  },
  {
    id: 6,
    title: "Stellar OS",
    category: "UI/UX Animation",
    client: "Stellar Systems",
    year: "2025",
    image: "/image-6.jpg",
    content: [
      { type: "image", src: "/image-6.jpg" },
      { type: "image", src: "/image-1.jpg" },
      { type: "image", src: "/image-2.jpg" },
      { type: "image", src: "/image-3.jpg" },
      { type: "image", src: "/image-4.jpg" },
    ],
  },
];

export default function PortfolioGridSection() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof PORTFOLIO_ITEMS)[0] | null
  >(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  return (
    <>
      <section className="relative w-full bg-black pb-12">
        {/* Intense Top-Focused Glow Engine (Reaches up to Hero Button) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-[10%] md:-top-[20%] left-1/2 -translate-x-1/2 w-[80%] md:w-[50%] h-[40%] bg-primary-500/40 blur-[120px] rounded-full mix-blend-screen opacity-90 pointer-events-none" />
          <div className="absolute -top-[5%] md:-top-[10%] left-1/2 -translate-x-1/2 w-[100%] md:w-[80%] h-[50%] bg-[#471fc7]/20 blur-[150px] rounded-[60px] opacity-80 animate-pulse mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-[#471fc7]/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          {/* Tab Frame Wrapper */}
          <div className="relative w-full rounded-md p-2 md:p-3 border border-[#222] bg-black shadow-[0_0_100px_rgba(88,37,216,0.4)]">
            {/* Inner Content Border & Inset Shadow */}
            <div className="relative w-full h-full rounded-md border border-primary-500/30 bg-[#050505] shadow-[inset_0_0_40px_rgba(88,37,216,0.15)] p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {PORTFOLIO_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => setSelectedProject(item)}
                    className="relative w-full aspect-[4/3] rounded-md overflow-hidden group cursor-pointer bg-white/[0.03] backdrop-blur-md border border-white/[0.08] transition-all duration-500 hover:border-[#5825d8]/50 hover:shadow-[0_0_30px_rgba(88,37,216,0.2)]"
                  >
                    {/* Image Background */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* The Hover Reveal Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Details Content (Translates UP on Hover) */}
                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <h3 className="text-sm md:text-base font-bold text-white mb-1 leading-tight text-shadow-sm">
                        {item.title}
                      </h3>

                      <div className="flex items-center justify-between">
                        {/* Author / Client */}
                        <p className="text-white/90 text-xs md:text-[13px] font-medium">
                          {item.client}
                        </p>

                        {/* Likes and Views Metrics */}
                        <div className="flex items-center gap-3 text-white font-bold text-xs">
                          <span className="flex items-center gap-1">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.68L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18.28C19.13 21 19.86 20.48 20.18 19.71L22.86 13.47C22.95 13.22 23 12.96 23 12.69V10Z" />
                            </svg>
                            0
                          </span>
                          <span className="flex items-center gap-1">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" />
                            </svg>
                            13
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex justify-center bg-black/90 backdrop-blur-xl overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="fixed top-6 right-6 lg:top-10 lg:right-10 z-[210] w-12 h-12 flex justify-center items-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all text-white border border-white/20 backdrop-blur-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Content Scroll Container */}
            <div className="w-full max-w-6xl mx-auto py-16 px-4 md:px-8">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-10 text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300 font-medium">
                  <span className="px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm">
                    {selectedProject.category}
                  </span>
                  <span>•</span>
                  <span>Client: {selectedProject.client}</span>
                  <span>•</span>
                  <span>{selectedProject.year}</span>
                </div>
              </motion.div>

              {/* Project Collage / Media Reel */}
              <div className="w-full flex flex-col gap-3 md:gap-4">
                {/* Top 2 Items: Full Width Cinematic Rows */}
                {selectedProject.content.slice(0, 2).map((media, i) => (
                  <motion.div
                    key={`full-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                    className="relative w-full aspect-[4/3] md:aspect-video rounded-md overflow-hidden border border-white/10 bg-[#0a0a0c]"
                  >
                    <Image
                      src={media.src}
                      alt={`${selectedProject.title} Focus ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                  </motion.div>
                ))}

                {/* Remaining Items: Collage Matrix Layout below the 2nd image */}
                {selectedProject.content.length > 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-4xl mx-auto"
                  >
                    {selectedProject.content.slice(2).map((media, i) => (
                      <div
                        key={`collage-${i}`}
                        className="relative w-full aspect-[4/5] md:aspect-square rounded-md overflow-hidden border border-white/10 bg-[#0a0a0c]"
                      >
                        <Image
                          src={media.src}
                          alt={`${selectedProject.title} Collage ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 400px"
                        />
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
