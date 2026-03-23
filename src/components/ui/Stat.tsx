import { TrendingUp, TrendingDown } from "lucide-react";

interface StatProps {
  label: string;
  value: string;
  unit?: string;
  change?: string;
  trend?: "up" | "down";
  icon?: React.ReactNode;
}

export default function Stat({
  label,
  value,
  unit,
  change,
  trend,
  icon,
}: StatProps) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        {icon && (
          <div className="p-2 rounded-lg bg-gold/10 text-gold">{icon}</div>
        )}
        {change && trend && (
          <span
            className={`flex items-center gap-0.5 text-xs font-medium ${
              trend === "up" ? "text-success" : "text-danger"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-text-muted mt-0.5">
        {unit && <span className="text-text-dim">{unit} — </span>}
        {label}
      </p>
    </div>
  );
}
