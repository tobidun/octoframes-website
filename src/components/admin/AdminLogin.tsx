"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface AdminLoginProps {
  onSuccess: () => void;
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const pwRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(234,116,54,0.35),transparent)] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md rounded-[32px] p-2 border border-[#222] bg-black shadow-[0_0_80px_rgba(234,116,54,0.4)]"
      >
        <div className="rounded-3xl border border-primary-500/30 bg-[#050505] shadow-[inset_0_0_40px_rgba(234,116,54,0.15)] p-10">
          <h1 className="text-2xl font-bold text-white mb-1">Admin Portal</h1>
          <p className="text-white/40 text-sm mb-8">Enter your password to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              ref={pwRef}
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              autoFocus
              className={`w-full px-4 py-3.5 bg-white/[0.04] border rounded-md text-white placeholder-gray-600 text-sm focus:outline-none focus:bg-white/[0.06] transition-all duration-200 ${
                pwError
                  ? "border-red-500/70 animate-pulse"
                  : "border-white/[0.08] focus:border-primary-500/50"
              }`}
            />
            {pwError && (
              <p className="text-red-400 text-xs">Incorrect password</p>
            )}
            <button
              type="submit"
              className="w-full py-3.5 rounded-md bg-gradient-to-b from-primary-500 to-primary-700 text-white font-semibold text-sm border border-white/20 shadow-[0_0_24px_rgba(234,116,54,0.4)] hover:shadow-[0_0_40px_rgba(234,116,54,0.6)] transition-all duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
