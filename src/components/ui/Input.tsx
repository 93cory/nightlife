"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
}

export default function Input({ label, icon, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <div className="text-[9px] tracking-[0.2em] text-muted uppercase mb-1.5">
          {icon && <span className="mr-1">{icon}</span>}
          {label}
        </div>
      )}
      <input
        className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-[10px] px-3.5 py-2.5 text-xs text-cream placeholder:text-muted/50 focus:outline-none focus:border-gold/40 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
