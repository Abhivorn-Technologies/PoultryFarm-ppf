"use client";

import React from "react";
import { PhotographicHero } from "./PhotographicHero";

export interface HeroProps {
  onSelectCategory?: (slug: string) => void;
  categories?: any[];
}

export function Hero({ onSelectCategory, categories }: HeroProps) {
  return <PhotographicHero onSelectCategory={onSelectCategory} categories={categories} />;
}

export { PhotographicHero, Hero as HeroSection };
