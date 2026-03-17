interface LogoProps {
  size?: "sm" | "md" | "lg";
  color?: "gold" | "accent";
  className?: string;
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-[28px]",
  lg: "text-5xl",
};

export default function Logo({ size = "md", color = "gold", className = "" }: LogoProps) {
  return (
    <div className={`text-center ${className}`}>
      <div
        className={`font-display tracking-[0.2em] ${sizeClasses[size]} ${
          color === "gold" ? "text-gold" : "text-accent"
        }`}
        style={{ textShadow: `0 0 60px ${color === "gold" ? "rgba(201,168,76,0.25)" : "rgba(255,75,110,0.25)"}` }}
      >
        NIGHTLIFE
      </div>
      <div className="text-[8px] tracking-[0.4em] text-muted uppercase mt-0.5">
        Gabon · L&apos;art de la nuit
      </div>
    </div>
  );
}
