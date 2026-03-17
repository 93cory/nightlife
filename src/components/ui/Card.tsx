interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "accent";
  className?: string;
}

const variants = {
  default: "bg-dark-2 border-white/[0.04]",
  gold: "bg-gradient-to-br from-gold/[0.12] to-gold/[0.03] border-gold/20",
  accent: "bg-gradient-to-br from-accent/[0.08] to-accent/[0.02] border-accent/20",
};

export default function Card({ children, variant = "default", className = "" }: CardProps) {
  return (
    <div className={`border rounded-[14px] p-3 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
