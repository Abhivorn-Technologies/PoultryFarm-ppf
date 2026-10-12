"use client";

import React from "react";

export function TrustedBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative select-none pointer-events-auto transition-transform duration-300 hover:scale-105 p-1 sm:p-2 ${className}`}
      role="img"
      aria-label="Trusted Poultry Industry Since 2011 Seal"
    >
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full overflow-visible drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold Gradient for Laurel Wreath & Rings */}
          <linearGradient id="badgeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECC85D" />
            <stop offset="25%" stopColor="#FFF4BC" />
            <stop offset="50%" stopColor="#C99726" />
            <stop offset="75%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#9C6B10" />
          </linearGradient>

          {/* Deep Forest Green Radial Gradient */}
          <radialGradient id="badgeGreenDisk" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#0E4527" />
            <stop offset="65%" stopColor="#08301B" />
            <stop offset="100%" stopColor="#041B0E" />
          </radialGradient>

          {/* Gold Text Gradient */}
          <linearGradient id="badgeTextGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9D2" />
            <stop offset="45%" stopColor="#F5D061" />
            <stop offset="100%" stopColor="#D4A017" />
          </linearGradient>

          {/* Shadow Filter */}
          <filter id="badgeInnerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset dx="0" dy="3" />
            <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
            <feFlood floodColor="#000000" floodOpacity="0.5" />
            <feComposite in2="shadowDiff" operator="in" />
            <feComposite in2="SourceGraphic" operator="over" />
          </filter>

          {/* 3D Beveled Gold Star Definition */}
          <g id="beveledGoldStar">
            {/* Light Facets */}
            <path d="M 0,0 L 0,-10 L 2.94,-3.09 Z" fill="#FFF6C2" />
            <path d="M 0,0 L 9.51,-3.09 L 4.24,0.74 Z" fill="#FFE894" />
            <path d="M 0,0 L 6.26,7.87 L 0,3.31 Z" fill="#FFE27A" />
            <path d="M 0,0 L -6.26,7.87 L -4.24,0.74 Z" fill="#FFF2B2" />
            <path d="M 0,0 L -9.51,-3.09 L -2.94,-3.09 Z" fill="#FFF6C2" />
            {/* Shaded / Metallic Facets */}
            <path d="M 0,0 L 0,-10 L -2.94,-3.09 Z" fill="#C99424" />
            <path d="M 0,0 L 9.51,-3.09 L 2.94,-3.09 Z" fill="#B88218" />
            <path d="M 0,0 L 6.26,7.87 L 4.24,0.74 Z" fill="#A87514" />
            <path d="M 0,0 L -6.26,7.87 L 0,3.31 Z" fill="#B88218" />
            <path d="M 0,0 L -9.51,-3.09 L -4.24,0.74 Z" fill="#C99424" />
          </g>
        </defs>

        {/* Outer Laurel Wreath Leaves (Left and Right Arcs) */}
        <g fill="url(#badgeGoldGrad)" stroke="#8C5C08" strokeWidth="0.5">
          {/* Left Laurel Leaves */}
          <path d="M 52,192 C 34,170 25,142 26,112 C 27,82 38,56 58,36" fill="none" stroke="url(#badgeGoldGrad)" strokeWidth="3" strokeLinecap="round" />
          {/* Leaves along left arc */}
          <path d="M 56,190 C 44,196 36,190 38,182 C 40,174 50,178 56,190 Z" />
          <path d="M 44,174 C 30,178 24,170 28,162 C 32,154 40,160 44,174 Z" />
          <path d="M 36,154 C 22,156 18,146 22,138 C 27,130 34,138 36,154 Z" />
          <path d="M 30,132 C 16,132 14,120 18,112 C 23,104 30,114 30,132 Z" />
          <path d="M 28,108 C 16,106 14,94 20,86 C 26,78 30,90 28,108 Z" />
          <path d="M 32,84 C 20,80 20,68 28,60 C 35,54 37,68 32,84 Z" />
          <path d="M 40,62 C 30,54 32,42 42,36 C 50,32 50,46 40,62 Z" />
          <path d="M 54,42 C 46,32 52,22 62,20 C 70,18 68,32 54,42 Z" />

          {/* Right Laurel Leaves */}
          <path d="M 188,192 C 206,170 215,142 214,112 C 213,82 202,56 182,36" fill="none" stroke="url(#badgeGoldGrad)" strokeWidth="3" strokeLinecap="round" />
          {/* Leaves along right arc */}
          <path d="M 184,190 C 196,196 204,190 202,182 C 200,174 190,178 184,190 Z" />
          <path d="M 196,174 C 210,178 216,170 212,162 C 208,154 200,160 196,174 Z" />
          <path d="M 204,154 C 218,156 222,146 218,138 C 213,130 206,138 204,154 Z" />
          <path d="M 210,132 C 224,132 226,120 222,112 C 217,104 210,114 210,132 Z" />
          <path d="M 212,108 C 224,106 226,94 220,86 C 214,78 210,90 212,108 Z" />
          <path d="M 208,84 C 220,80 220,68 212,60 C 205,54 203,68 208,84 Z" />
          <path d="M 200,62 C 210,54 208,42 198,36 C 190,32 190,46 200,62 Z" />
          <path d="M 186,42 C 194,32 188,22 178,20 C 170,18 172,32 186,42 Z" />

          {/* Bottom Laurel Ribbon Tie */}
          <path d="M 106,206 C 114,200 126,200 134,206 C 142,212 144,222 136,224 C 124,226 116,226 104,224 C 96,222 98,212 106,206 Z" fill="url(#badgeGoldGrad)" />
          <circle cx="120" cy="208" r="5" fill="url(#badgeGoldGrad)" />
        </g>

        {/* Outer Gold Border Ring */}
        <circle cx="120" cy="116" r="82" fill="none" stroke="url(#badgeGoldGrad)" strokeWidth="6" />
        <circle cx="120" cy="116" r="77" fill="none" stroke="#7A5208" strokeWidth="1" />
        
        {/* Inner Emerald Green Disk */}
        <circle cx="120" cy="116" r="76" fill="url(#badgeGreenDisk)" />
        <circle cx="120" cy="116" r="74" fill="none" stroke="url(#badgeGoldGrad)" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Five Golden Stars Arc — Completely Visible, Crisp & Symmetrical */}
        <g filter="drop-shadow(0 1.5px 3px rgba(0,0,0,0.7))">
          {/* Star 1 (Far Left) */}
          <use href="#beveledGoldStar" transform="translate(82, 75) rotate(-22) scale(0.68)" />
          {/* Star 2 (Mid Left) */}
          <use href="#beveledGoldStar" transform="translate(100, 67) rotate(-11) scale(0.86)" />
          {/* Star 3 (Center - Prominent Crown Star) */}
          <use href="#beveledGoldStar" transform="translate(120, 63) rotate(0) scale(1.18)" />
          {/* Star 4 (Mid Right) */}
          <use href="#beveledGoldStar" transform="translate(140, 67) rotate(11) scale(0.86)" />
          {/* Star 5 (Far Right) */}
          <use href="#beveledGoldStar" transform="translate(158, 75) rotate(22) scale(0.68)" />
        </g>

        {/* Text: TRUSTED */}
        <text
          x="120"
          y="100"
          textAnchor="middle"
          fill="url(#badgeTextGold)"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="13"
          letterSpacing="2.5"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
        >
          TRUSTED
        </text>

        {/* Text: POULTRY INDUSTRY */}
        <text
          x="120"
          y="117"
          textAnchor="middle"
          fill="url(#badgeTextGold)"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="10"
          letterSpacing="1.4"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
        >
          POULTRY INDUSTRY
        </text>

        {/* Divider: — SINCE — */}
        <g stroke="url(#badgeGoldGrad)" strokeWidth="1" strokeLinecap="round">
          <line x1="76" y1="128" x2="98" y2="128" />
          <line x1="142" y1="128" x2="164" y2="128" />
        </g>
        <text
          x="120"
          y="131"
          textAnchor="middle"
          fill="url(#badgeTextGold)"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="8.5"
          letterSpacing="1.8"
        >
          SINCE
        </text>

        {/* Text: 2011 (Large Bold Hero Year) */}
        <text
          x="120"
          y="164"
          textAnchor="middle"
          fill="url(#badgeTextGold)"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="29"
          letterSpacing="1"
          filter="drop-shadow(0 2px 3px rgba(0,0,0,0.9))"
        >
          2011
        </text>
      </svg>
    </div>
  );
}

export default TrustedBadge;
