/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const PromptBuilderIllustration: React.FC<{ className?: string }> = ({
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
          <filter id="pbShadow" x="-10%" y="-10%" width="125%" height="130%">
            <feDropShadow dx="3" dy="4" stdDeviation="3" floodColor="#25283D" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Soft Organic Background Shape (Mint / Cream) */}
        <path
          d="M60 210 C 50 110, 160 50, 270 45 C 380 40, 480 90, 490 200 C 500 310, 410 395, 290 405 C 170 415, 70 310, 60 210 Z"
          fill="#CFF0E5"
          opacity="0.45"
        />

        {/* Studio Desk Surface */}
        <g transform="translate(110, 260)">
          {/* Desk Legs */}
          <line x1="45" y1="50" x2="25" y2="150" stroke="#25283D" strokeWidth="3" strokeLinecap="round" />
          <line x1="265" y1="50" x2="285" y2="150" stroke="#25283D" strokeWidth="3" strokeLinecap="round" />
          <line x1="35" y1="120" x2="275" y2="120" stroke="#25283D" strokeWidth="2" strokeLinecap="round" />

          {/* Desktop Table */}
          <rect x="20" y="40" width="270" height="14" rx="6" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.8" />

          {/* Coffee Mug */}
          <rect x="245" y="24" width="16" height="18" rx="4" fill="#8B7BE8" stroke="#25283D" strokeWidth="2" />
          <path d="M261 29 C 266 29, 266 36, 261 36" stroke="#25283D" strokeWidth="2" fill="none" />
          <path d="M253 16 C 255 11, 252 7, 255 2" stroke="#25283D" strokeWidth="1.6" strokeLinecap="round" />

          {/* Notebook & Pencil */}
          <rect x="40" y="34" width="34" height="8" rx="2" fill="#FFE8D0" stroke="#25283D" strokeWidth="1.8" />
          <line x1="38" y1="32" x2="68" y2="32" stroke="#F4774F" strokeWidth="2.2" strokeLinecap="round" />
        </g>

        {/* Creative Person at Desk */}
        <g transform="translate(190, 150)">
          {/* Stool / Chair Seat */}
          <ellipse cx="65" cy="220" rx="34" ry="9" fill="#FFD078" stroke="#25283D" strokeWidth="2.6" />
          <line x1="42" y1="225" x2="35" y2="260" stroke="#25283D" strokeWidth="2.6" strokeLinecap="round" />
          <line x1="88" y1="225" x2="95" y2="260" stroke="#25283D" strokeWidth="2.6" strokeLinecap="round" />

          {/* Legs */}
          <path
            d="M52 185 L48 245 L72 245"
            stroke="#25283D"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Shoe */}
          <rect x="62" y="238" width="22" height="9" rx="4" fill="#F4774F" stroke="#25283D" strokeWidth="1.8" />

          {/* Torso: Coral Orange Top with Turquoise Collar */}
          <path
            d="M38 95 C 38 72, 88 72, 92 95 L88 175 C 88 182, 42 182, 42 175 Z"
            fill="#F4774F"
            stroke="#25283D"
            strokeWidth="2.8"
          />
          <path
            d="M50 78 C 58 72, 72 72, 80 78 L78 94 C 70 98, 60 98, 52 94 Z"
            fill="#55CFC0"
            stroke="#25283D"
            strokeWidth="2"
          />

          {/* Head & Hair */}
          <circle cx="65" cy="50" r="17" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
          {/* Chic Hair */}
          <path
            d="M49 46 C 49 28, 81 28, 81 46 C 78 53, 72 57, 65 57 C 56 57, 50 53, 49 46 Z"
            fill="#25283D"
          />
          <circle cx="73" cy="26" r="9" fill="#25283D" />
          {/* Glasses & Smile */}
          <circle cx="58" cy="50" r="4.5" fill="none" stroke="#25283D" strokeWidth="1.8" />
          <line x1="62.5" y1="50" x2="68" y2="50" stroke="#25283D" strokeWidth="1.8" />
          <path d="M60 58 C 64 61, 68 60, 70 57" stroke="#25283D" strokeWidth="1.6" strokeLinecap="round" fill="none" />

          {/* Arms reaching to laptop */}
          <path
            d="M50 110 C 62 122, 85 126, 108 128"
            fill="none"
            stroke="#F4774F"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx="98" cy="126" r="4.5" fill="#55CFC0" stroke="#25283D" strokeWidth="1.6" />
          <circle cx="110" cy="128" r="4.5" fill="#FFF8E9" stroke="#25283D" strokeWidth="1.8" />

          {/* Laptop on desk */}
          <g transform="translate(100, 85)">
            <polygon points="0,42 66,42 60,50 -6,50" fill="#25283D" stroke="#25283D" strokeWidth="2.4" />
            <polygon points="8,2 66,0 64,42 8,42" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
            <rect x="14" y="8" width="42" height="6" rx="2" fill="#8B7BE8" />
            <rect x="14" y="18" width="30" height="4" rx="1" fill="#55CFC0" />
            <rect x="14" y="26" width="38" height="4" rx="1" fill="#FFD078" />
          </g>
        </g>

        {/* LEFT ARTIFACT: Simple Thought / Idea Card */}
        <g transform="translate(30, 95)" filter="url(#pbShadow)" className="animate-gentle-float">
          <rect x="0" y="0" width="130" height="60" rx="12" fill="#FFE8D0" stroke="#25283D" strokeWidth="2.2" strokeDasharray="4 3" />
          <text x="12" y="22" fontFamily="Fredoka, sans-serif" fontSize="10" fontWeight="700" fill="#25283D">
            RAW THOUGHT:
          </text>
          <text x="12" y="42" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" fill="#F4774F">
            "Neon rain city"
          </text>
        </g>

        {/* Swooping curved dashed arrow from simple thought to structured prompt */}
        <path
          d="M165 115 C 210 95, 270 75, 330 95"
          stroke="#F4774F"
          strokeWidth="2.6"
          strokeDasharray="5 4"
          strokeLinecap="round"
          className="animate-dash-march"
        />
        <polygon points="325,90 336,97 325,103" fill="#F4774F" stroke="#25283D" strokeWidth="1.4" />

        {/* Glowing Magic Wand at the transformation apex */}
        <g transform="translate(245, 45) rotate(-20)" className="hover-wiggle">
          <rect x="0" y="0" width="7" height="60" rx="3.5" fill="#25283D" />
          <rect x="0" y="0" width="7" height="15" rx="3.5" fill="#55CFC0" />
          <rect x="0" y="45" width="7" height="15" rx="3.5" fill="#F4774F" />
          <path d="M3.5 -12 C 3.5 -5, -4 4, 3.5 4 C 11 4, 3.5 -5, 3.5 -12 Z" fill="#8B7BE8" />
          <circle cx="3.5" cy="-3" r="6" fill="#8B7BE8" stroke="#25283D" strokeWidth="1.8" />
          <circle cx="3.5" cy="-3" r="2.5" fill="#FFF8E9" />
        </g>

        {/* RIGHT ARTIFACT: Large Structured Output Prompt Card */}
        <g transform="translate(325, 75)" filter="url(#pbShadow)" className="animate-gentle-float-alt">
          <rect x="0" y="0" width="195" height="115" rx="16" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
          <div className="p-3">
            {/* Header */}
            <rect x="12" y="14" width="4" height="12" rx="2" fill="#55CFC0" />
            <text x="22" y="24" fontFamily="Fredoka, sans-serif" fontSize="11" fontWeight="700" fill="#25283D">
              STRUCTURED PROMPT
            </text>
            <text x="156" y="24" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700" fill="#F4774F">
              v6.1
            </text>

            {/* Prompt sentence */}
            <text x="12" y="46" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600" fill="#25283D">
              "A cyberpunk megacity at
            </text>
            <text x="12" y="62" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600" fill="#25283D">
              twilight, neon reflection..."
            </text>

            {/* Chips */}
            <g transform="translate(12, 78)">
              <rect x="0" y="0" width="52" height="18" rx="6" fill="#CFF0E5" stroke="#25283D" strokeWidth="1.2" />
              <text x="7" y="13" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="700" fill="#25283D">
                Cinematic
              </text>

              <rect x="58" y="0" width="52" height="18" rx="6" fill="#FFD078" stroke="#25283D" strokeWidth="1.2" />
              <text x="65" y="13" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="700" fill="#25283D">
                Volumetric
              </text>

              <rect x="116" y="0" width="52" height="18" rx="6" fill="#F4774F" stroke="#25283D" strokeWidth="1.2" />
              <text x="123" y="13" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="700" fill="#FFF8E9">
                --ar 16:9
              </text>
            </g>
          </div>
        </g>

        {/* Floating Miniature Artwork Previews */}
        <g transform="translate(360, 230) rotate(5)" filter="url(#pbShadow)" className="hover-wiggle">
          <rect x="0" y="0" width="70" height="60" rx="8" fill="#FFF8E9" stroke="#25283D" strokeWidth="2" />
          <rect x="5" y="6" width="60" height="40" rx="4" fill="#181829" />
          <circle cx="50" cy="18" r="7" fill="#FFD078" />
          <polygon points="8,44 26,24 46,44" fill="#F4774F" />
          <polygon points="30,44 48,30 62,44" fill="#55CFC0" />
          <text x="8" y="54" fontFamily="Fredoka, sans-serif" fontSize="7.5" fontWeight="700" fill="#25283D">
            Neon 8K
          </text>
        </g>

        {/* Small Sparkles and Stars */}
        <g transform="translate(180, 50)" className="animate-soft-sparkle">
          <path d="M6 0 C 6 3, 3 6, 0 6 C 3 6, 6 9, 6 12 C 6 9, 9 6, 12 6 C 9 6, 6 3, 6 0 Z" fill="#8B7BE8" />
        </g>
        <g transform="translate(480, 50)">
          <path d="M5 0 C 5 2.5, 2.5 5, 0 5 C 2.5 5, 5 7.5, 5 10 C 5 7.5, 7.5 5, 10 5 C 7.5 5, 5 2.5, 5 0 Z" fill="#FFD078" />
        </g>
        <g transform="translate(40, 220)">
          <circle cx="6" cy="6" r="3" fill="#55CFC0" />
        </g>
      </svg>
    </div>
  );
};
