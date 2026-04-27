"use client";

import { HTMLAttributes } from "react";

interface SkeletonBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * A single reusable glass-morphic pulsing skeleton block.
 * Compose these together to build skeleton layouts.
 */
export default function SkeletonBlock({ className = "", ...props }: SkeletonBlockProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/[0.04] border border-white/[0.05] backdrop-blur-sm relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary-500/5 before:to-transparent before:animate-shimmer ${className}`}
      {...props}
    />
  );
}
