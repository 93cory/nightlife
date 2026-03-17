"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  gold: "bg-gradient-to-br from-gold to-gold-light text-night-black font-bold",
  accent: "bg-gradient-to-br from-accent to-orange-400 text-white font-bold",
  outline: "border border-white/10 text-cream bg-transparent hover:bg-white/5",
  ghost: "text-muted hover:text-cream bg-transparent",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-3 text-sm rounded-xl",
  lg: "w-full py-3.5 text-base rounded-xl",
};

export default function Button({
  variant = "gold",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`font-display tracking-widest text-center transition-all active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
