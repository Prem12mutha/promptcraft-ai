/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StarDoodle, SparkleLineDoodle } from './Doodles.tsx';

interface HeroIllustrationProps {
  onSelectPromptSample?: (promptText: string) => void;
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = () => {
  return (
    <div className="relative w-full max-w-[600px] lg:max-w-[620px] mx-auto flex items-center justify-center select-none py-2">
      {/* Decorative Outer Accents (Subtle hand-drawn sparkles outside the artwork) */}

      {/* 2. Small hand-drawn sparkle near top right outer edge (above clock area) */}
      <div className="absolute -top-2 right-6 sm:right-12 z-10 pointer-events-none animate-soft-sparkle">
        <StarDoodle size={22} color="#F4774F" />
      </div>

      {/* 3. Tiny soft violet sparkle on the right side */}
      <div className="absolute top-24 -right-2 sm:-right-4 z-10 pointer-events-none">
        <SparkleLineDoodle size={18} color="#8B7BE8" />
      </div>

      {/* 4. Subtle curved dashed accent line at the bottom-left */}
      <svg
        className="absolute -bottom-4 -left-2 w-28 h-12 pointer-events-none overflow-visible opacity-75 hidden sm:block"
        viewBox="0 0 110 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 30 C 35 38, 70 25, 100 8"
          stroke="#25283D"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <circle cx="102" cy="7" r="2.5" fill="#55CFC0" />
      </svg>

      {/* ========================================================= */}
      {/* PRIMARY VISUAL: Exact Reference Cozy Laptop Illustration  */}
      {/* ========================================================= */}
      <div className="relative w-full flex items-center justify-center">
        <img
          src="/assets/aistudio/hero_cozy_laptop_illustration.png"
          onError={(e) => {
            // Safe fallback to raw original image if needed
            (e.currentTarget as HTMLImageElement).src =
              '/assets/aistudio/image_db9f7e8f.png';
          }}
          alt="Creative person sitting in cozy armchair with laptop, nighttime cityscape window, plants, table and clock"
          className="w-full h-auto max-h-[500px] lg:max-h-[530px] object-contain select-none"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};
