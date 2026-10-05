import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "yellow" | "pink" | "gray" | "cream" | "outline";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  variant = "green",
  size = "md",
  children,
  className,
  ...props
}: BadgeProps) {
  const variantClasses = {
    green: "bg-brand-green-100 text-brand-green-800 border-brand-green-200/60",
    yellow: "bg-brand-yellow-100 text-brand-yellow-800 border-brand-yellow-300/60",
    pink: "bg-brand-pink-100 text-brand-pink-700 border-brand-pink-200/60",
    gray: "bg-brand-gray-100 text-brand-gray-700 border-brand-gray-200",
    cream: "bg-brand-cream text-brand-green-900 border-brand-cream-muted",
    outline: "bg-transparent text-brand-green-800 border-brand-green-600/40",
  };

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 font-medium rounded-md",
    md: "text-xs px-3 py-1 font-semibold rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border tracking-wide uppercase transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
