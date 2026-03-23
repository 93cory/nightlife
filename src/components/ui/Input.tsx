"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-text-muted">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-surface-light border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all ${
              icon ? "pl-10" : ""
            } ${error ? "border-danger/50" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
