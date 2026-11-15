/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Hand-drawn Paper Airplane with animated dashed flight loop trail
export const PaperAirplaneDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`overflow-visible select-none pointer-events-none ${className}`}
  >
    {/* Looped dashed flight trail with gentle march animation */}
    <path
      d="M15 105 C 35 115, 60 110, 50 85 C 40 60, 15 75, 35 55 C 55 35, 95 65, 115 40"
      stroke="#25283D"
      strokeWidth="2.2"
      strokeDasharray="5 5"
      strokeLinecap="round"
      className="doodle-stroke opacity-85 animate-dash-march"
    />
    {/* Paper Airplane with Coral & Butter Yellow details */}
    <g transform="translate(108, 12) rotate(18)">
      <polygon
        points="0,25 36,0 16,30"
        fill="#FFF8E9"
        stroke="#25283D"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polygon
        points="16,30 36,0 12,18"
        fill="#FFD078"
        stroke="#25283D"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polygon
        points="12,18 36,0 0,25"
        fill="#FFE8D0"
        stroke="#25283D"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <line
        x1="16"
        y1="30"
        x2="28"
        y2="10"
        stroke="#25283D"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

// Hand-drawn Squiggle / Zigzag
export const ZigzagDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#F4774F',
}) => (
  <svg
    viewBox="0 0 70 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M4 22 L18 8 L32 24 L46 7 L60 22 L66 14"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-stroke"
    />
  </svg>
);

// Hand-drawn loop-de-loop swirl
export const LoopSwirlDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#25283D',
}) => (
  <svg
    viewBox="0 0 90 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M10 45 C 20 48, 32 40, 36 28 C 42 12, 28 8, 22 22 C 16 38, 48 50, 62 30 C 72 16, 58 10, 52 24 C 48 38, 70 48, 82 34"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      className="doodle-stroke"
    />
  </svg>
);

// Hand-drawn Lightbulb with radiant sketch rays
export const LightbulbDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 70 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
  >
    {/* Radiating Rays */}
    <line x1="35" y1="5" x2="35" y2="13" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />
    <line x1="16" y1="12" x2="22" y2="18" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />
    <line x1="54" y1="12" x2="48" y2="18" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />
    <line x1="8" y1="32" x2="16" y2="34" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />
    <line x1="62" y1="32" x2="54" y2="34" stroke="#25283D" strokeWidth="2.4" strokeLinecap="round" />

    {/* Bulb body with butter yellow & soft turquoise highlight */}
    <path
      d="M24 60 C 18 54, 12 44, 14 34 C 16 22, 25 15, 35 15 C 45 15, 54 22, 56 34 C 58 44, 52 54, 46 60 Z"
      fill="#FFD078"
      stroke="#25283D"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <path
      d="M22 30 C 24 24, 30 19, 36 19"
      stroke="#FFF8E9"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Inner filament */}
    <path
      d="M29 45 L32 32 L38 32 L41 45"
      stroke="#25283D"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Base screw thread */}
    <rect x="26" y="60" width="18" height="5" rx="2" fill="#55CFC0" stroke="#25283D" strokeWidth="2.2" />
    <rect x="28" y="66" width="14" height="4" rx="2" fill="#25283D" stroke="#25283D" strokeWidth="1.8" />
    <path d="M31 71 C 32 75, 38 75, 39 71" stroke="#25283D" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// Card Corner Doodle: Compact, non-overlapping decorative sketch star & corner badge (replaces the old huge yellow arcs!)
export const CardCornerMarkDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#FFD078',
}) => (
  <div className={`absolute top-3.5 right-3.5 pointer-events-none select-none flex items-center gap-1 ${className}`}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 2 C 11 6, 6 11, 2 11 C 6 11, 11 16, 11 20 C 11 16, 16 11, 20 11 C 16 11, 11 6, 11 2 Z"
        fill={color}
        stroke="#25283D"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
    <span className="w-1.5 h-1.5 rounded-full bg-[#55CFC0] border border-[#25283D]" />
  </div>
);

// Hand-drawn Star / Sparkle
export const StarDoodle: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#25283D',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M12 2 C 12 7, 7 12, 2 12 C 7 12, 12 17, 12 22 C 12 17, 17 12, 22 12 C 17 12, 12 7, 12 2 Z"
      fill={color}
      stroke="#25283D"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn 4-point sparkle line star
export const SparkleLineDoodle: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#F4774F',
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <line x1="10" y1="2" x2="10" y2="18" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    <line x1="2" y1="10" x2="18" y2="10" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    <line x1="4" y1="4" x2="16" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="4" x2="4" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Curved hand-drawn connecting arrow for "Small idea. Better prompt." (Desktop)
export const DoodleArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 140 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M10 25 C 45 8, 90 12, 125 30"
      stroke="#F4774F"
      strokeWidth="3"
      strokeDasharray="6 4"
      strokeLinecap="round"
      className="animate-dash-march"
    />
    <path
      d="M112 18 L127 31 L110 38"
      stroke="#F4774F"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Downward curved connecting arrow for mobile comparison cards
export const DownwardDoodleArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 50 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M25 8 C 12 30, 38 45, 25 70"
      stroke="#F4774F"
      strokeWidth="3"
      strokeDasharray="5 4"
      strokeLinecap="round"
      className="animate-dash-march"
    />
    <path
      d="M16 60 L25 72 L34 60"
      stroke="#F4774F"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Curved underline doodle for headings
export const CurvedUnderlineDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#25283D',
}) => (
  <svg
    viewBox="0 0 170 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M2 9 C 50 2, 120 3, 168 8"
      stroke={color}
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  </svg>
);

// Tiny hand-drawn pencil doodle
export const DoodlePencilTiny: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <g transform="rotate(35 12 12)">
      <rect x="9" y="3" width="6" height="15" rx="1.5" fill="#FFD078" stroke="#25283D" strokeWidth="1.6" />
      <polygon points="9,18 15,18 12,23" fill="#F4774F" stroke="#25283D" strokeWidth="1.4" />
      <circle cx="12" cy="22" r="0.8" fill="#25283D" />
      <rect x="9" y="3" width="6" height="3" fill="#55CFC0" stroke="#25283D" strokeWidth="1.2" />
    </g>
  </svg>
);

// Corner sketch marks for container borders
export const CornerSketchDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path d="M4 24 L24 4" stroke="#F4774F" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 24 L24 12" stroke="#55CFC0" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// =========================================================================
// REFINED FEATURE ICONS (Prompt Builder, Image-to-Prompt, Prompt Improver)
// Conforming to: pencil + prompt sheet + sparkle, picture frame + magnifier + stars, sliders + lightbulb + arrow
// =========================================================================

// CARD 1: Prompt Builder (Pencil, Prompt Sheet, Sparkle)
export const PencilSheetIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Container background badge */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#FFE8D0" opacity="0.4" />

      {/* Prompt Sheet document */}
      <rect x="15" y="14" width="28" height="36" rx="4" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.2" />
      <line x1="20" y1="22" x2="33" y2="22" stroke="#25283D" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="28" x2="37" y2="28" stroke="#55CFC0" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="34" x2="31" y2="34" stroke="#25283D" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="40" x2="26" y2="40" stroke="#F4774F" strokeWidth="2" strokeLinecap="round" />

      {/* Hand-drawn Pencil drawing across */}
      <g transform="translate(24, 18) rotate(24)">
        <rect x="0" y="0" width="8" height="26" rx="2" fill="#FFD078" stroke="#25283D" strokeWidth="2" />
        <polygon points="0,26 8,26 4,32" fill="#F4774F" stroke="#25283D" strokeWidth="1.8" />
        <polygon points="3,30 5,30 4,32" fill="#25283D" />
        <rect x="0" y="0" width="8" height="5" fill="#55CFC0" stroke="#25283D" strokeWidth="1.8" />
      </g>

      {/* Sparkle */}
      <path
        d="M49 14 C 49 17, 46 20, 43 20 C 46 20, 49 23, 49 26 C 49 23, 52 20, 55 20 C 52 20, 49 17, 49 14 Z"
        fill="#8B7BE8"
        stroke="#25283D"
        strokeWidth="1.5"
      />
    </svg>
  </div>
);

// CARD 2: Image to Prompt (Picture Frame, Magnifying Glass, Tiny Stars)
export const PictureMagnifierIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Container background badge */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#CFF0E5" opacity="0.4" />

      {/* Picture Frame */}
      <rect x="13" y="15" width="34" height="26" rx="4" fill="#CFF0E5" stroke="#25283D" strokeWidth="2.2" />
      {/* Sun / Moon in frame */}
      <circle cx="21" cy="22" r="3.5" fill="#FFD078" stroke="#25283D" strokeWidth="1.6" />
      {/* Mountains in frame */}
      <polygon points="14,39 23,28 30,36 37,29 46,39" fill="#55CFC0" stroke="#25283D" strokeWidth="1.8" strokeLinejoin="round" />

      {/* Magnifying Glass analyzing the image */}
      <g transform="translate(32, 25)">
        <circle cx="12" cy="12" r="9" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.2" />
        <circle cx="12" cy="12" r="6" fill="#FFE8D0" opacity="0.6" />
        <line x1="18.5" y1="18.5" x2="26" y2="26" stroke="#25283D" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="20" x2="25" y2="25" stroke="#F4774F" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Tiny Stars around frame */}
      <path
        d="M10 13 C 10 14.5, 8.5 16, 7 16 C 8.5 16, 10 17.5, 10 19 C 10 17.5, 11.5 16, 13 16 C 11.5 16, 10 14.5, 10 13 Z"
        fill="#FFD078"
        stroke="#25283D"
        strokeWidth="1.2"
      />
      <circle cx="51" cy="18" r="2" fill="#8B7BE8" stroke="#25283D" strokeWidth="1.2" />
    </svg>
  </div>
);

// CARD 3: Prompt Improver (Sliders, Lightbulb, Hand-Drawn Arrow)
export const SlidersLightbulbIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Container background badge */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFF8E9" stroke="#25283D" strokeWidth="2.6" />
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#FFD078" opacity="0.3" />

      {/* Sliders Track */}
      <line x1="15" y1="20" x2="40" y2="20" stroke="#25283D" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="15" y1="30" x2="40" y2="30" stroke="#25283D" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="15" y1="40" x2="40" y2="40" stroke="#25283D" strokeWidth="2.2" strokeLinecap="round" />

      {/* Slider Knobs */}
      <circle cx="32" cy="20" r="4" fill="#F4774F" stroke="#25283D" strokeWidth="2" />
      <circle cx="22" cy="30" r="4" fill="#55CFC0" stroke="#25283D" strokeWidth="2" />
      <circle cx="35" cy="40" r="4" fill="#8B7BE8" stroke="#25283D" strokeWidth="2" />

      {/* Mini Idea Lightbulb on top right */}
      <g transform="translate(42, 10)">
        <circle cx="8" cy="8" r="6" fill="#FFD078" stroke="#25283D" strokeWidth="1.8" />
        <rect x="6" y="13" width="4" height="3" rx="1" fill="#25283D" />
        <line x1="8" y1="0" x2="8" y2="2" stroke="#25283D" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="14" y1="4" x2="12" y2="5" stroke="#25283D" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* Hand-drawn upward improvement arrow */}
      <path
        d="M20 48 C 30 50, 42 48, 48 38"
        stroke="#F4774F"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      <polygon points="46,35 52,38 48,43" fill="#F4774F" stroke="#25283D" strokeWidth="1.4" />
    </svg>
  </div>
);

// Distinctive PromptCraft Brand Symbol: Hand-drawn prompt bubble, crafting pencil & emerging AI sparkle star
export const PromptCraftLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <div className={`relative ${className} group-hover:-translate-y-0.5 transition-transform duration-200 select-none`}>
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full overflow-visible drop-shadow-[1.5px_1.5px_0px_#25283D]"
    >
      {/* Hand-drawn prompt speech bubble */}
      <path
        d="M5 6 C 5 3.8, 6.8 2.5, 9.5 2.5 L 23.5 2.5 C 26.2 2.5, 27.5 3.8, 27.5 6 L 27.5 18 C 27.5 20.2, 26.2 21.5, 23.5 21.5 L 14 21.5 L 8 26.5 L 9.5 21.5 L 5 21.5 C 2.8 21.5, 1.5 20.2, 1.5 18 L 1.5 6 Z"
        fill="#FFF8E9"
        stroke="#25283D"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Prompt lines inside */}
      <line x1="6.5" y1="8" x2="16" y2="8" stroke="#55CFC0" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="6.5" y1="12.5" x2="14" y2="12.5" stroke="#25283D" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="6.5" y1="17" x2="11" y2="17" stroke="#F4774F" strokeWidth="1.8" strokeLinecap="round" />

      {/* Creative Crafting Pencil angled across */}
      <g transform="translate(13.5, 9.5) rotate(22)">
        <rect x="0" y="0" width="4" height="11.5" rx="1" fill="#FFD078" stroke="#25283D" strokeWidth="1.3" />
        <polygon points="0,11.5 4,11.5 2,15.5" fill="#F4774F" stroke="#25283D" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="2" cy="15" r="0.5" fill="#25283D" />
        <rect x="0" y="0" width="4" height="2.2" rx="0.5" fill="#55CFC0" stroke="#25283D" strokeWidth="1.1" />
      </g>

      {/* Emerging 4-Point AI Sparkle Star on top right */}
      <path
        d="M28 2.5 C 28 4.8, 26 6.5, 23.5 6.5 C 26 6.5, 28 8.2, 28 10.5 C 28 8.2, 30 6.5, 32.5 6.5 C 30 6.5, 28 4.8, 28 2.5 Z"
        fill="#F4774F"
        stroke="#25283D"
        strokeWidth="1.3"
        strokeLinejoin="round"
        className="transition-transform duration-300 origin-[28px_6.5px] group-hover:scale-125 group-hover:rotate-15"
      />

      {/* Tiny companion accent dot */}
      <circle cx="32" cy="13.5" r="1.1" fill="#8B7BE8" />
    </svg>
  </div>
);

// Playful hand-drawn Magnifying Glass Doodle for Image to Prompt
export const MagnifyingGlassDoodle: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 40,
  color = '#F4774F',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`overflow-visible select-none inline-block ${className}`}
  >
    {/* Soft backdrop glow */}
    <circle cx="20" cy="20" r="14" fill="#CFF0E5" opacity="0.6" />
    
    {/* Outer Lens Rim */}
    <circle cx="20" cy="20" r="14" stroke="#25283D" strokeWidth="2.8" fill="#FFF8E9" />
    {/* Inner decorative dotted rim */}
    <circle cx="20" cy="20" r="10.5" stroke="#55CFC0" strokeWidth="1.8" strokeDasharray="3 3" />
    
    {/* Lens reflection sparkle */}
    <path
      d="M15 13 C 18 10, 23 10, 26 13"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="15" cy="19" r="1.5" fill="#FFD078" />

    {/* Handle with dual-color wrap */}
    <line x1="30" y1="30" x2="43" y2="43" stroke="#25283D" strokeWidth="5.5" strokeLinecap="round" />
    <line x1="31" y1="31" x2="41" y2="41" stroke={color} strokeWidth="3" strokeLinecap="round" />
    
    {/* Tiny sparkle accent on top right */}
    <path
      d="M36 8 C 36 10, 34 11.5, 32 11.5 C 34 11.5, 36 13, 36 15 C 36 13, 38 11.5, 40 11.5 C 38 11.5, 36 10, 36 8 Z"
      fill="#FFD078"
      stroke="#25283D"
      strokeWidth="1.2"
    />
  </svg>
);

// Playful hand-drawn Rocket & Growth Doodle for Prompt Improver
export const RocketGrowthDoodle: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 40,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`overflow-visible select-none inline-block ${className}`}
  >
    {/* Upward arched dotted trajectory trail */}
    <path
      d="M10 40 C 14 28, 22 22, 32 16"
      stroke="#25283D"
      strokeWidth="2"
      strokeDasharray="3 3"
      strokeLinecap="round"
    />

    {/* Rocket body angled upward-right */}
    <g transform="translate(20, 4) rotate(42)">
      {/* Fins */}
      <polygon points="2,16 -4,22 4,20" fill="#8B7BE8" stroke="#25283D" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="12,16 18,22 10,20" fill="#8B7BE8" stroke="#25283D" strokeWidth="1.4" strokeLinejoin="round" />
      
      {/* Exhaust Flame */}
      <polygon points="4,20 7,27 10,20" fill="#FFD078" stroke="#25283D" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="5,20 7,24 9,20" fill="#F4774F" />

      {/* Main Hull */}
      <path
        d="M2 18 C 2 8, 7 0, 7 0 C 7 0, 12 8, 12 18 Z"
        fill="#F4774F"
        stroke="#25283D"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Window Porthole */}
      <circle cx="7" cy="8" r="2.5" fill="#FFF8E9" stroke="#25283D" strokeWidth="1.2" />
      <circle cx="7.5" cy="7.5" r="0.8" fill="#55CFC0" />
    </g>

    {/* Sparkle Star at Peak */}
    <path
      d="M40 6 C 40 8.5, 38 10, 36 10 C 38 10, 40 11.5, 40 14 C 40 11.5, 42 10, 44 10 C 42 10, 40 8.5, 40 6 Z"
      fill="#FFD078"
      stroke="#25283D"
      strokeWidth="1.2"
    />
  </svg>
);



