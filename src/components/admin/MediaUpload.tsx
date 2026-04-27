"use client";

import { CldUploadWidget } from "next-cloudinary";

interface MediaUploadProps {
  onUpload: (url: string) => void;
  label?: string;
}

export default function MediaUpload({ onUpload, label = "Upload Media" }: MediaUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "motiongads_preset"}
      onSuccess={(result: any) => {
        if (result?.info?.secure_url) {
          onUpload(result.info.secure_url);
        }
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="w-full flex flex-col items-center justify-center py-8 border-2 border-dashed border-white/[0.08] rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary-500/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <span className="text-white font-bold text-[11px] uppercase tracking-widest">{label}</span>
            <span className="text-white/20 text-[10px] mt-1 italic">Images, Videos, or GIFs</span>
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
