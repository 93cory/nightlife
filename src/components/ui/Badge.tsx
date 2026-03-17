interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "accent" | "success" | "muted";
  className?: string;
}

const variants = {
  gold: "bg-gold text-night-black",
  accent: "bg-accent text-white",
  success: "bg-success text-night-black",
  muted: "border border-white/10 text-muted",
};

export default function Badge({ children, variant = "gold", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[7px] font-bold tracking-[0.2em] uppercase ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
