"use client";

import { useRef, useState } from "react";

interface MediaUploadProps {
  onUpload: (url: string) => void;
  label?: string;
  accept?: string;
}

export default function MediaUpload({ 
  onUpload, 
  label = "Upload Media",
  accept = "image/*,video/*" 
}: MediaUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Get signature from our API
      const timestamp = Math.round(new Date().getTime() / 1000);
      const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "motiongads";
      
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        body: JSON.stringify({
          paramsToSign: {
            timestamp,
            folder,
          },
        }),
      });
      const { signature } = await signRes.json();

      // 2. Upload directly to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "");
      formData.append("folder", folder);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
        accept={accept}
      />
      
      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex flex-col items-center justify-center py-8 border-2 border-dashed border-white/[0.08] rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary-500/40 transition-all group relative overflow-hidden"
      >
        {isUploading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Uploading...</span>
            </div>
          </div>
        )}

        <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <span className="text-white font-bold text-[11px] uppercase tracking-widest">{label}</span>
        <span className="text-white/20 text-[10px] mt-1 italic">Direct File Upload</span>
      </button>
    </div>
  );
}
