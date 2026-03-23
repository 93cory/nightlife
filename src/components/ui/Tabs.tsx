"use client";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tabs({ tabs, active, onChange, className = "" }: TabsProps) {
  return (
    <div
      className={`flex gap-1 overflow-x-auto scrollbar-none pb-1 ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
            active === tab.id
              ? "bg-gold/15 text-gold"
              : "text-text-muted hover:text-foreground hover:bg-surface-light"
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                active === tab.id
                  ? "bg-gold/20 text-gold"
                  : "bg-surface-lighter text-text-dim"
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
