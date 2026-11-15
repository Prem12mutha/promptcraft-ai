/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const ImageToPromptIllustration: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div className={`relative w-full max-w-[520px] mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 540 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <filter id="ipShadow" x="-10%" y="-10%" width="125%" height="130%">
            <feDropShadow dx="3" dy="4" stdDeviation="3" floodColor="#25283D" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Soft Organic Background Shape (Warm Ivory / Pale Peach) */}
        <path
          d="M80 190 C 70 85, 180 40, 290 45 C 400 50, 490 100, 480 220 C 470 340, 390 410, 260 405 C 130 400, 90 295, 80 190 Z"
          fill="#FFE8D0"
          opacity="0.55"
        />

        {/* LEFT ARTIFACT: Reference Image Being Analyzed */}
        <g transform="translate(30, 80) rotate(-4)" filter="url(#ipShadow)" className="animate-gentle-float">
          {/* Framed Polaroid Artwork */}
          <rect x="0" y="0" width="165" height="185" rx="14" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
          {/* Washi tape on top */}
          <polygon points="50,-6 115,-6 110,8 45,8" fill="#55CFC0" stroke="#25283D" strokeWidth="1.4" />

          {/* Reference Image Canvas (Vibrant Sunset Landscape) */}
          <rect x="12" y="16" width="141" height="120" rx="8" fill="#143329" stroke="#25283D" strokeWidth="1.8" />
          {/* Mountains & Golden Sun */}
          <circle cx="112" cy="45" r="20" fill="#FFD078" />
          <polygon points="12,136 60,65 105,136" fill="#F4774F" stroke="#25283D" strokeWidth="1.6" />
          <polygon points="68,136 108,85 152,136" fill="#8B7BE8" stroke="#25283D" strokeWidth="1.6" />
          <polygon points="100,136 128,102 153,136" fill="#55CFC0" stroke="#25283D" strokeWidth="1.4" />

          {/* Label & Upload indicator */}
          <text x="14" y="156" fontFamily="Fredoka, sans-serif" fontSize="11" fontWeight="700" fill="#25283D">
            REF: Alpine Glow
          </text>
          <g transform="translate(122, 144)">
            <circle cx="10" cy="10" r="10" fill="#CFF0E5" stroke="#25283D" strokeWidth="1.4" />
            <path d="M10 14 L10 6 M7 9 L10 6 L13 9" stroke="#25283D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* Color Palette Swatch Strip Floating Below Reference Photo */}
        <g transform="translate(45, 290) rotate(2)" filter="url(#ipShadow)">
          <rect x="0" y="0" width="150" height="36" rx="10" fill="#FFF8E9" stroke="#25283D" strokeWidth="2" />
          <circle cx="22" cy="18" r="9" fill="#143329" stroke="#25283D" strokeWidth="1.2" />
          <circle cx="50" cy="18" r="9" fill="#F4774F" stroke="#25283D" strokeWidth="1.2" />
          <circle cx="78" cy="18" r="9" fill="#FFD078" stroke="#25283D" strokeWidth="1.2" />
          <circle cx="106" cy="18" r="9" fill="#55CFC0" stroke="#25283D" strokeWidth="1.2" />
          <circle cx="132" cy="18" r="9" fill="#8B7BE8" stroke="#25283D" strokeWidth="1.2" />
        </g>

        {/* Dynamic Curved Connecting Arrow leading to Generated Prompt */}
        <path
          d="M195 160 C 235 140, 270 145, 305 180"
          stroke="#F4774F"
          strokeWidth="2.8"
          strokeDasharray="5 4"
          strokeLinecap="round"
          className="animate-dash-march"
        />
        <polygon points="302,172 312,183 298,187" fill="#F4774F" stroke="#25283D" strokeWidth="1.4" />

        {/* CENTER-RIGHT: Creative Person Examining with Magnifying Glass */}
        <g transform="translate(195, 140)">
          {/* Stool */}
          <ellipse cx="65" cy="225" rx="30" ry="8" fill="#55CFC0" stroke="#25283D" strokeWidth="2.4" />
          <line x1="45" y1="230" x2="38" y2="265" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="85" y1="230" x2="92" y2="265" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />

          {/* Legs & Shoes */}
          <path
            d="M55 190 L50 248 L75 248"
            stroke="#25283D"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="66" y="242" width="22" height="9" rx="4" fill="#55CFC0" stroke="#25283D" strokeWidth="1.8" />

          {/* Torso: Butter Yellow Sweater with Coral Stripes */}
          <path
            d="M40 98 C 40 75, 90 75, 94 98 L90 180 C 90 186, 44 186, 44 180 Z"
            fill="#FFD078"
            stroke="#25283D"
            strokeWidth="2.8"
          />
          <line x1="44" y1="125" x2="92" y2="125" stroke="#F4774F" strokeWidth="3" />
          <line x1="44" y1="145" x2="92" y2="145" stroke="#F4774F" strokeWidth="3" />

          {/* Head & Hair */}
          <circle cx="67" cy="52" r="17" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
          <path
            d="M50 48 C 50 30, 83 30, 83 48 C 80 55, 74 59, 67 59 C 58 59, 52 55, 50 48 Z"
            fill="#25283D"
          />
          <circle cx="75" cy="28" r="9" fill="#25283D" />
          {/* Eyes looking intently toward left photo */}
          <circle cx="61" cy="52" r="2.5" fill="#25283D" />
          <circle cx="71" cy="52" r="2.5" fill="#25283D" />
          <path d="M62 60 C 65 62, 69 62, 72 60" stroke="#25283D" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Hand holding big Magnifying Glass aimed toward reference picture */}
          <path
            d="M50 115 C 30 118, 0 115, -25 110"
            fill="none"
            stroke="#FFD078"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx="-25" cy="110" r="5" fill="#FFF8E9" stroke="#25283D" strokeWidth="1.8" />

          {/* Large Handcrafted Magnifying Glass */}
          <g transform="translate(-55, 80) rotate(-15)">
            <circle cx="0" cy="0" r="26" fill="#CFF0E5" fillOpacity="0.4" stroke="#25283D" strokeWidth="3.2" />
            <circle cx="0" cy="0" r="20" fill="none" stroke="#55CFC0" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="18" y1="18" x2="42" y2="42" stroke="#25283D" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="18" y1="18" x2="40" y2="40" stroke="#F4774F" strokeWidth="3" strokeLinecap="round" />
            {/* Sparkle inside glass lens */}
            <path d="M-6 -6 L-6 6 M-12 0 L0 0" stroke="#FFF8E9" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>

        {/* RIGHT ARTIFACT: Reverse-Engineered Prompt Card */}
        <g transform="translate(325, 95)" filter="url(#ipShadow)" className="animate-gentle-float-alt">
          <rect x="0" y="0" width="190" height="135" rx="16" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
          {/* Header */}
          <rect x="12" y="14" width="4" height="12" rx="2" fill="#8B7BE8" />
          <text x="22" y="24" fontFamily="Fredoka, sans-serif" fontSize="11" fontWeight="700" fill="#25283D">
            EXTRACTED PROMPT
          </text>
          <text x="145" y="24" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" fill="#55CFC0">
            RAW REF
          </text>

          {/* Generated prompt text */}
          <text x="12" y="46" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600" fill="#25283D">
            "Majestic alpine peaks in
          </text>
          <text x="12" y="62" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600" fill="#25283D">
            golden hour mist, vivid
          </text>
          <text x="12" y="78" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600" fill="#25283D">
            twilight gradient..."
          </text>

          {/* Tags */}
          <g transform="translate(12, 94)">
            <rect x="0" y="0" width="60" height="18" rx="6" fill="#CFF0E5" stroke="#25283D" strokeWidth="1.2" />
            <text x="6" y="13" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="700" fill="#25283D">
              Golden Hour
            </text>

            <rect x="66" y="0" width="50" height="18" rx="6" fill="#FFD078" stroke="#25283D" strokeWidth="1.2" />
            <text x="73" y="13" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="700" fill="#25283D">
              Alpine 8K
            </text>

            <rect x="122" y="0" width="44" height="18" rx="6" fill="#F4774F" stroke="#25283D" strokeWidth="1.2" />
            <text x="129" y="13" fontFamily="DM Sans, sans-serif" fontSize="8.5" fontWeight="700" fill="#FFF8E9">
              --ar 4:3
            </text>
          </g>
        </g>

        {/* Secondary Art Frame Thumbnail (Isometric Style Preview) */}
        <g transform="translate(365, 255) rotate(-5)" filter="url(#ipShadow)">
          <rect x="0" y="0" width="65" height="55" rx="8" fill="#FFF8E9" stroke="#25283D" strokeWidth="2" />
          <rect x="5" y="6" width="55" height="35" rx="4" fill="#CFF0E5" />
          <circle cx="45" cy="18" r="6" fill="#FFD078" />
          <polygon points="10,38 28,20 45,38" fill="#8B7BE8" />
          <text x="8" y="49" fontFamily="Fredoka, sans-serif" fontSize="7.5" fontWeight="700" fill="#25283D">
            Style: Concept
          </text>
        </g>

        {/* Small floating stars and sparkles */}
        <g transform="translate(260, 45)" className="animate-soft-sparkle">
          <path d="M7 0 C 7 3.5, 3.5 7, 0 7 C 3.5 7, 7 10.5, 7 14 C 7 10.5, 10.5 7, 14 7 C 10.5 7, 7 3.5, 7 0 Z" fill="#F4774F" />
        </g>
        <g transform="translate(500, 75)">
          <path d="M5 0 C 5 2.5, 2.5 5, 0 5 C 2.5 5, 5 7.5, 5 10 C 5 7.5, 7.5 5, 10 5 C 7.5 5, 5 2.5, 5 0 Z" fill="#55CFC0" />
        </g>
        <g transform="translate(20, 275)">
          <circle cx="5" cy="5" r="2.5" fill="#8B7BE8" />
        </g>
      </svg>
    </div>
  );
};
