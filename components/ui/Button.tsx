import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "cream";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "right",
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary:
      "bg-brand-green-700 hover:bg-brand-green-800 text-white shadow-soft hover:shadow-hover border border-transparent active:scale-[0.98]",
    secondary:
      "bg-brand-green-100 hover:bg-brand-green-200 text-brand-green-900 border border-brand-green-200 active:scale-[0.98]",
    accent:
      "bg-brand-yellow-500 hover:bg-brand-yellow-600 text-brand-gray-900 font-semibold shadow-soft hover:shadow-hover active:scale-[0.98]",
    pink:
      "bg-brand-pink-500 hover:bg-brand-pink-600 text-white shadow-soft hover:shadow-hover active:scale-[0.98]",
    outline:
      "border-2 border-brand-green-700 text-brand-green-800 hover:bg-brand-green-50 active:scale-[0.98]",
    ghost:
      "text-brand-gray-700 hover:text-brand-green-700 hover:bg-brand-green-50/50",
    cream:
      "bg-brand-cream hover:bg-white text-brand-green-900 border border-brand-cream-muted shadow-sm hover:shadow-soft",
  };

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5 font-medium",
    md: "text-sm px-5 py-2.5 rounded-xl gap-2 font-semibold",
    lg: "text-base px-6 py-3.5 rounded-xl gap-2.5 font-bold",
    xl: "text-lg px-8 py-4 rounded-2xl gap-3 font-bold",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variantClasses[variant as keyof typeof variantClasses] || variantClasses.primary,
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === "right" && (
        <span className="shrink-0 transition-transform group-hover:translate-x-1">{icon}</span>
      )}
    </button>
  );
}
