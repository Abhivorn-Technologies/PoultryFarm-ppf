"use client";

import React from "react";
import { PhotographicHero } from "./PhotographicHero";

export interface HeroProps {
  onSelectCategory?: (slug: string) => void;
}

export function Hero({ onSelectCategory }: HeroProps) {
  return <PhotographicHero onSelectCategory={onSelectCategory} />;
}

export { PhotographicHero, Hero as HeroSection };
