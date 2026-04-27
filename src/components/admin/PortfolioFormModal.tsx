"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Portfolio, ContentItem } from "./types";

interface PortfolioFormModalProps {
  editTarget: Portfolio | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function PortfolioFormModal({
  editTarget,
  onClose,
  onSaved,
}: PortfolioFormModalProps) {
  const [pform, setPform] = useState({
    title: editTarget?.title ?? "",
    category: editTarget?.category ?? "",
    client: editTarget?.client ?? "",
    year: editTarget?.year ?? new Date().getFullYear().toString(),
    image: editTarget?.image ?? "",
  });
  const [contentItems, setContentItems] = useState<ContentItem[]>(
    editTarget?.content ?? []
  );
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const addContentItem = () => {
    setContentItems((prev) => [...prev, { type: "image", src: "" }]);
  };

  const updateContentItem = (index: number, updates: Partial<ContentItem>) => {
    setContentItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...updates } : item))
    );
  };

  const removeContentItem = (index: number) =>
    setContentItems((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus("idle");
    try {
      // Filter out empty items
      const cleanedContent = contentItems.filter(item => item.src.trim() !== "");
      const payload = { ...pform, content: cleanedContent };
      const url = editTarget ? `/api/portfolio/${editTarget.id}` : "/api/portfolio";
      const method = editTarget ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setSaveStatus("success");
      onSaved();
      setTimeout(() => onClose(), 900);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-xl flex items-start justify-center overflow-y-auto py-10 px-4"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl rounded-[28px] p-2 border border-[#222] bg-black shadow-[0_0_80px_rgba(88,37,216,0.4)]"
      >
        <div className="rounded-2xl border border-primary-500/30 bg-[#050505] shadow-[inset_0_0_30px_rgba(88,37,216,0.1)] p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {editTarget ? "Edit Project" : "New Project"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-white/40 mb-1.5 pl-1">Title *</label>
                <input
                  required
                  value={pform.title}
                  onChange={(e) => setPform((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Project Title"
                  className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-white placeholder-gray-700 text-sm focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-white/40 mb-1.5 pl-1">Category *</label>
                <input
                  required
                  value={pform.category}
                  onChange={(e) => setPform((p) => ({ ...p, category: e.target.value }))}
                  placeholder="e.g. Motion Graphics"
                  className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-white placeholder-gray-700 text-sm focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-white/40 mb-1.5 pl-1">Client *</label>
                <input
                  required
                  value={pform.client}
                  onChange={(e) => setPform((p) => ({ ...p, client: e.target.value }))}
                  placeholder="Client Name"
                  className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-white placeholder-gray-700 text-sm focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-white/40 mb-1.5 pl-1">Year</label>
                <input
                  value={pform.year}
                  onChange={(e) => setPform((p) => ({ ...p, year: e.target.value }))}
                  placeholder="2025"
                  className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-white placeholder-gray-700 text-sm focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                />
              </div>
            </div>

            {/* Hero image */}
            <div>
              <label className="block text-[10px] uppercase font-black tracking-widest text-white/40 mb-1.5 pl-1">Hero Image URL</label>
              <input
                value={pform.image}
                onChange={(e) => setPform((p) => ({ ...p, image: e.target.value }))}
                placeholder="https://... or /image-1.jpg"
                className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-md text-white placeholder-gray-700 text-sm focus:outline-none focus:border-primary-500/50 transition-all font-medium"
              />
            </div>

            {/* Collage items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pl-1">
                <label className="block text-[10px] uppercase font-black tracking-widest text-white/40 font-medium">
                  Collage Media ({contentItems.length} items)
                </label>
                <button
                  type="button"
                  onClick={addContentItem}
                  className="text-[10px] uppercase font-black tracking-widest text-primary-400 hover:text-white transition-colors"
                >
                  + Add Item
                </button>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {contentItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-300"
                  >
                    <select
                      value={item.type}
                      onChange={(e) => updateContentItem(i, { type: e.target.value as any })}
                      className="w-24 px-2 py-2 bg-white/[0.04] border border-white/[0.08] rounded-md text-white text-[11px] font-bold uppercase focus:outline-none focus:border-primary-500/50 transition-all cursor-pointer"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="gif">GIF</option>
                    </select>
                    <input
                      value={item.src}
                      onChange={(e) => updateContentItem(i, { src: e.target.value })}
                      placeholder="Media URL (direct link)"
                      className="flex-1 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-md text-white placeholder-gray-700 text-xs focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => removeContentItem(i)}
                      className="p-2.5 rounded-md hover:bg-red-500/10 text-red-400/40 hover:text-red-400 transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ))}

                {contentItems.length === 0 && (
                  <div 
                    onClick={addContentItem}
                    className="h-20 border border-dashed border-white/[0.08] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] transition-all group"
                  >
                    <span className="text-white/10 group-hover:text-white/30 text-xs font-bold uppercase tracking-widest">No media items yet</span>
                    <span className="text-primary-500/40 group-hover:text-primary-500 text-[10px] font-black uppercase tracking-widest mt-1">+ Click to add media</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-4 rounded-md bg-gradient-to-b from-primary-500 to-primary-700 text-white font-bold text-sm border border-white/20 shadow-[0_0_24px_rgba(88,37,216,0.4)] hover:shadow-[0_0_40px_rgba(88,37,216,0.6)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {saving ? "Transmitting..." : editTarget ? "Commit Changes" : "Deploy Project"}
              </button>
            </div>

            {saveStatus === "success" && (
              <p className="text-center text-green-400 text-xs font-bold uppercase tracking-widest animate-pulse">✓ Mission Accomplished!</p>
            )}
            {saveStatus === "error" && (
              <p className="text-center text-red-500 text-xs font-bold uppercase tracking-widest">
                ✕ Transmission Interrupted. Try again.
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
