import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "green" | "yellow" | "pink" | "cream";
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = "green",
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col mb-12 max-w-3xl", alignClasses[align], className)}>
      {badge && (
        <Badge variant={badgeVariant} className="mb-3.5 shadow-sm">
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-green-950 tracking-tight leading-[1.15]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-brand-gray-600 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
