interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings: Record<string, string> = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export default function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl ${
        paddings[padding]
      } ${
        hover
          ? "hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5 transition-all"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
