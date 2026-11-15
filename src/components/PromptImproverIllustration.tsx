/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const PromptImproverIllustration: React.FC<{ className?: string }> = ({
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
          <filter id="piShadow" x="-10%" y="-10%" width="125%" height="130%">
            <feDropShadow dx="3" dy="4" stdDeviation="3" floodColor="#25283D" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Soft Organic Background Shape (Pale Mint / Cream) */}
        <path
          d="M70 200 C 60 90, 170 45, 280 40 C 390 35, 490 90, 485 210 C 480 330, 400 410, 270 410 C 140 410, 80 310, 70 200 Z"
          fill="#CFF0E5"
          opacity="0.45"
        />

        {/* LEFT ARTIFACT: Before & After Prompt Comparison Sheet */}
        <g transform="translate(25, 75)" filter="url(#piShadow)" className="animate-gentle-float">
          <rect x="0" y="0" width="205" height="155" rx="16" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />

          {/* Sheet Header */}
          <rect x="12" y="14" width="4" height="12" rx="2" fill="#F4774F" />
          <text x="22" y="24" fontFamily="Fredoka, sans-serif" fontSize="11" fontWeight="700" fill="#25283D">
            PROMPT REFINEMENT
          </text>
          <text x="145" y="24" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" fill="#8B7BE8">
            +300%
          </text>

          {/* "BEFORE" Section */}
          <g transform="translate(12, 34)">
            <rect x="0" y="0" width="181" height="42" rx="8" fill="#FFE8D0" stroke="#25283D" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="8" y="15" fontFamily="Fredoka, sans-serif" fontSize="9.5" fontWeight="700" fill="#F4774F">
              BEFORE:
            </text>
            <text x="8" y="32" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600" fill="#25283D">
              "A cat sitting in a basket."
            </text>
          </g>

          {/* Central Transformation Arrow */}
          <g transform="translate(102, 82)">
            <path d="M0 -3 L0 9 M-3 6 L0 9 L3 6" stroke="#F4774F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* "AFTER" Section */}
          <g transform="translate(12, 94)">
            <rect x="0" y="0" width="181" height="48" rx="8" fill="#FFFFFF" stroke="#25283D" strokeWidth="1.8" />
            <div className="flex items-center">
              <text x="8" y="15" fontFamily="Fredoka, sans-serif" fontSize="9.5" fontWeight="700" fill="#55CFC0">
                AFTER ENHANCEMENT:
              </text>
              <circle cx="165" cy="11" r="5" fill="#55CFC0" />
              <path d="M163 11 L164.5 12.5 L167.5 9.5" stroke="#FFF8E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </div>
            <text x="8" y="31" fontFamily="DM Sans, sans-serif" fontSize="10.5" fontWeight="600" fill="#25283D">
              "Fluffy calico kitten in sunlit
            </text>
            <text x="8" y="43" fontFamily="DM Sans, sans-serif" fontSize="10" fontWeight="600" fill="#25283D">
              wicker, soft fur, rim light..."
            </text>
          </g>
        </g>

        {/* Floating Tuning Sliders (Above and to Right of Sheet) */}
        <g transform="translate(45, 248)" filter="url(#piShadow)" className="hover-wiggle">
          <rect x="0" y="0" width="165" height="74" rx="14" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.2" />

          {/* Slider 1: Clarity */}
          <text x="12" y="20" fontFamily="Fredoka, sans-serif" fontSize="9" fontWeight="700" fill="#25283D">
            DETAIL DENSITY
          </text>
          <line x1="12" y1="28" x2="153" y2="28" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="125" cy="28" r="6" fill="#F4774F" stroke="#25283D" strokeWidth="2" />

          {/* Slider 2: Atmosphere */}
          <text x="12" y="48" fontFamily="Fredoka, sans-serif" fontSize="9" fontWeight="700" fill="#25283D">
            ATMOSPHERE & LIGHTING
          </text>
          <line x1="12" y1="56" x2="153" y2="56" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="95" cy="56" r="6" fill="#55CFC0" stroke="#25283D" strokeWidth="2" />
        </g>

        {/* Connecting Doodle Arrow */}
        <path
          d="M235 150 C 270 120, 310 130, 340 160"
          stroke="#F4774F"
          strokeWidth="2.8"
          strokeDasharray="5 4"
          strokeLinecap="round"
          className="animate-dash-march"
        />
        <polygon points="338,150 348,162 334,166" fill="#F4774F" stroke="#25283D" strokeWidth="1.4" />

        {/* Radiant Idea Lightbulb at the connection apex */}
        <g transform="translate(265, 75)" className="animate-soft-sparkle">
          <circle cx="20" cy="20" r="18" fill="#FFD078" stroke="#25283D" strokeWidth="2.4" />
          <path d="M14 16 C 18 11, 22 11, 26 16" stroke="#25283D" strokeWidth="1.8" strokeLinecap="round" />
          {/* Radiating Rays */}
          <line x1="20" y1="-3" x2="20" y2="2" stroke="#25283D" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="39" y1="5" x2="35" y2="9" stroke="#25283D" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="44" y1="20" x2="39" y2="20" stroke="#25283D" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="1" y1="11" x2="5" y2="14" stroke="#25283D" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="16" y="36" width="8" height="4" rx="1.5" fill="#55CFC0" stroke="#25283D" strokeWidth="1.2" />
        </g>

        {/* RIGHT: Creative Person Refining Prompt at Laptop */}
        <g transform="translate(300, 130)">
          {/* Desk Surface */}
          <line x1="30" y1="180" x2="190" y2="180" stroke="#25283D" strokeWidth="3" strokeLinecap="round" />
          <line x1="170" y1="180" x2="185" y2="260" stroke="#25283D" strokeWidth="3" strokeLinecap="round" />
          <rect x="25" y="170" width="165" height="12" rx="5" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />

          {/* Stool */}
          <ellipse cx="60" cy="230" rx="28" ry="8" fill="#FFD078" stroke="#25283D" strokeWidth="2.4" />
          <line x1="40" y1="235" x2="32" y2="270" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="80" y1="235" x2="88" y2="270" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />

          {/* Legs & Shoes */}
          <path
            d="M50 195 L45 252 L70 252"
            stroke="#25283D"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="62" y="246" width="22" height="9" rx="4" fill="#F4774F" stroke="#25283D" strokeWidth="1.8" />

          {/* Torso: Soft Violet Top with Coral Accents */}
          <path
            d="M34 100 C 34 78, 84 78, 88 100 L84 185 C 84 190, 38 190, 38 185 Z"
            fill="#8B7BE8"
            stroke="#25283D"
            strokeWidth="2.8"
          />
          <path
            d="M48 82 C 55 76, 68 76, 75 82 L72 98 C 65 102, 56 102, 50 98 Z"
            fill="#FFE8D0"
            stroke="#25283D"
            strokeWidth="2"
          />

          {/* Head & Hair */}
          <circle cx="61" cy="54" r="17" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
          {/* Hair */}
          <path
            d="M44 50 C 44 32, 78 32, 78 50 C 75 57, 69 61, 61 61 C 52 61, 46 57, 44 50 Z"
            fill="#25283D"
          />
          <circle cx="69" cy="30" r="9" fill="#25283D" />
          {/* Glasses & Smile */}
          <circle cx="54" cy="54" r="4.5" fill="none" stroke="#25283D" strokeWidth="1.8" />
          <line x1="58.5" y1="54" x2="64" y2="54" stroke="#25283D" strokeWidth="1.8" />
          <path d="M56 62 C 60 65, 64 64, 66 61" stroke="#25283D" strokeWidth="1.6" strokeLinecap="round" fill="none" />

          {/* Arms typing on laptop */}
          <path
            d="M46 115 C 58 128, 80 130, 102 132"
            fill="none"
            stroke="#8B7BE8"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx="94" cy="130" r="4.5" fill="#55CFC0" stroke="#25283D" strokeWidth="1.6" />
          <circle cx="104" cy="132" r="4.5" fill="#FFF8E9" stroke="#25283D" strokeWidth="1.8" />

          {/* Laptop on desk */}
          <g transform="translate(95, 90)">
            <polygon points="0,42 66,42 60,50 -6,50" fill="#25283D" stroke="#25283D" strokeWidth="2.4" />
            <polygon points="8,2 66,0 64,42 8,42" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
            <rect x="14" y="8" width="42" height="6" rx="2" fill="#55CFC0" />
            <rect x="14" y="18" width="32" height="4" rx="1" fill="#F4774F" />
            <rect x="14" y="26" width="36" height="4" rx="1" fill="#FFD078" />
          </g>
        </g>

        {/* Small floating sparkles and stars */}
        <g transform="translate(485, 95)" className="animate-soft-sparkle">
          <path d="M6 0 C 6 3, 3 6, 0 6 C 3 6, 6 9, 6 12 C 6 9, 9 6, 12 6 C 9 6, 6 3, 6 0 Z" fill="#F4774F" />
        </g>
        <g transform="translate(20, 45)">
          <path d="M5 0 C 5 2.5, 2.5 5, 0 5 C 2.5 5, 5 7.5, 5 10 C 5 7.5, 7.5 5, 10 5 C 7.5 5, 5 2.5, 5 0 Z" fill="#FFD078" />
        </g>
        <g transform="translate(460, 275)">
          <circle cx="5" cy="5" r="2.5" fill="#55CFC0" />
        </g>
      </svg>
    </div>
  );
};
