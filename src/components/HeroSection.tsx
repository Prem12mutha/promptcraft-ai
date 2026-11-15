/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PaperAirplaneDoodle, ZigzagDoodle, StarDoodle, SparkleLineDoodle } from './Doodles.tsx';
import { HeroIllustration } from './HeroIllustration.tsx';
import { ArrowRight, Image as ImageIcon, Wand2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenBuilder: () => void;
  onOpenImageToPrompt: () => void;
  onSelectSamplePrompt: (promptText: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBuilder,
  onOpenImageToPrompt,
  onSelectSamplePrompt,
}) => {
  return (
    <section className="relative bg-[#FFD078] pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b-2 border-[#25283D]">
      {/* Decorative Zigzag in top-right area (matching screenshot) */}
      <div className="absolute top-6 right-8 md:right-16 hidden sm:block">
        <ZigzagDoodle className="w-16 h-8 opacity-90" color="#F4774F" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 z-10 flex flex-col items-start">
            {/* Organic Small Label Badge with Paper Airplane Doodle overhead */}
            <div className="relative mb-6 inline-block">
              {/* Paper airplane doodle soaring overhead */}
              <div className="absolute -top-14 left-8 sm:left-14 w-32 h-20 pointer-events-none">
                <PaperAirplaneDoodle className="w-full h-full" />
              </div>

              {/* Hand-drawn organic cloud pill for small label */}
              <div className="relative inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full shadow-[2px_2px_0px_0px_#25283D] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#25283D] transition-all cursor-default select-none">
                <span className="w-2 h-2 rounded-full bg-[#F4774F]" />
                <span className="text-xs font-bold tracking-wider text-[#25283D] uppercase font-display">
                  YOUR IDEAS, BETTER EXPRESSED
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="relative">
              {/* Small sparkle doodle near headline */}
              <div className="absolute -top-3 -right-6 hidden sm:block pointer-events-none">
                <StarDoodle size={22} color="#25283D" />
              </div>
              <div className="absolute -left-7 top-14 hidden sm:block pointer-events-none">
                <SparkleLineDoodle size={18} color="#8B7BE8" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] font-bold text-[#25283D] font-display tracking-tight text-balance">
                Turn your ideas into{' '}
                <span className="relative inline-block text-[#F4774F]">
                  better prompts.
                  {/* Playful underline arc under "better prompts" */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 overflow-visible pointer-events-none"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9 C 60 2, 140 3, 198 8"
                      stroke="#25283D"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="mt-7 text-lg sm:text-xl text-[#25283D]/90 font-medium leading-relaxed max-w-xl">
              Create powerful AI prompts from simple ideas, transform reference images into prompts, and refine every detail with ease.
            </p>

            {/* Two Prominent CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Button 1: Coral Orange with high contrast */}
              <button
                onClick={onOpenBuilder}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-[#F4774F] hover:bg-[#e0663e] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#25283D] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#25283D] rounded-full border-2 border-[#25283D] shadow-[3px_3px_0px_0px_#25283D] transition-all cursor-pointer"
              >
                <Wand2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>Build a Prompt</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Button 2: Light cream with navy text */}
              <button
                onClick={onOpenImageToPrompt}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-[#25283D] bg-[#FFF8E9] hover:bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#25283D] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#25283D] rounded-full border-2 border-[#25283D] shadow-[3px_3px_0px_0px_#25283D] transition-all cursor-pointer"
              >
                <ImageIcon className="w-5 h-5 text-[#8B7BE8] transition-transform group-hover:scale-110" />
                <span>Image to Prompt</span>
              </button>
            </div>

            {/* Subtle quick tips / metadata */}
            <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-[#25283D]/80">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25283D]" />
                Zero setup needed
              </span>
              <span>·</span>
              <span>Works for Midjourney, DALL-E, Flux & LLMs</span>
              <span>·</span>
              <span className="hidden sm:inline">100% Free Creative Studio</span>
            </div>
          </div>

          {/* Right Column: Creative Person with Laptop, Floating Cards & Doodles */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <HeroIllustration onSelectPromptSample={onSelectSamplePrompt} />
          </div>
        </div>
      </div>
    </section>
  );
};
