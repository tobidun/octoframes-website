"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MediaUpload from "@/components/admin/MediaUpload";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSettings(data.settings || {});
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleUpdate = async (key: string, value: string) => {
    setMessage("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      if (res.ok) {
        setSettings((prev: any) => ({ ...prev, [key]: value }));
        setMessage("Setting updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Failed to update setting:", err);
      setMessage("Failed to update setting.");
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-10">
        <div className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mb-2 leading-none">Studio Management</div>
        <h2 className="text-3xl font-black text-white tracking-tight leading-none">General Settings</h2>
      </div>

      <div className="space-y-8">
        {/* Hero Video Setting */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
        >
          <div className="flex flex-col gap-6">
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">Hero Video</h3>
              <p className="text-white/30 text-sm leading-relaxed max-w-md">
                Upload or link the main hero video for the homepage.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Preview or Upload */}
              <div className="w-full md:w-2/3">
                {settings.hero_video_url ? (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 group">
                    <video 
                      src={settings.hero_video_url} 
                      autoPlay 
                      loop 
                      muted 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={() => handleUpdate("hero_video_url", "")}
                        className="px-6 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-red-600 transition-colors"
                      >
                        Remove Video
                      </button>
                    </div>
                  </div>
                ) : (
                  <MediaUpload 
                    label="Upload Hero Video" 
                    accept="video/*"
                    onUpload={(url) => handleUpdate("hero_video_url", url)} 
                  />
                )}
              </div>

              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest text-white/40 mb-2 pl-1">Direct URL Link</label>
                  <input 
                    type="text"
                    value={settings.hero_video_url || ""}
                    onChange={(e) => setSettings((prev: any) => ({ ...prev, hero_video_url: e.target.value }))}
                    onBlur={(e) => handleUpdate("hero_video_url", e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/[0.08] text-white text-sm focus:outline-none focus:border-primary-500/50 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                    Live Preview Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        {message && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-8 right-8 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold text-sm shadow-2xl z-50 flex items-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {message}
          </motion.div>
        )}

        <div className="pt-12 border-t border-white/[0.06]">
           <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-center">
             More settings coming soon: SEO, Analytics, Contact Email
           </p>
        </div>
      </div>
    </div>
  );
}
