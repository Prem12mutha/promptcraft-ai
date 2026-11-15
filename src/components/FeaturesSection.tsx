/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LightbulbDoodle, LoopSwirlDoodle, StarDoodle, SparkleLineDoodle } from './Doodles.tsx';
import { ArrowUpRight } from 'lucide-react';

interface FeaturesSectionProps {
  onSelectFeature: (feature: 'builder' | 'image' | 'improver') => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectFeature }) => {
  return (
    <section id="features" className="relative bg-[#CFF0E5] py-16 md:py-28 border-b-2 border-[#25283D] overflow-hidden">
      {/* Subtle Background Doodles */}
      <div className="absolute top-6 right-6 md:right-16 hidden sm:block pointer-events-none">
        <LoopSwirlDoodle className="w-20 h-14 opacity-80" color="#25283D" />
      </div>
      <div className="absolute top-1/4 left-6 hidden lg:block pointer-events-none">
        <StarDoodle size={22} color="#55CFC0" />
      </div>
      <div className="absolute top-2/3 right-8 hidden lg:block pointer-events-none">
        <SparkleLineDoodle size={22} color="#F4774F" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* ========================================================= */}
        {/* SECTION HEADER: "Everything you need to create better prompts" */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 md:mb-24">
          {/* Left: Heading with playful hand-drawn lightbulb */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3.5 px-3.5 py-1 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full shadow-[2px_2px_0px_0px_#25283D]">
              <span className="w-2 h-2 rounded-full bg-[#55CFC0]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#25283D] font-display">
                Studio Capabilities
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25283D] font-display leading-[1.15] tracking-tight text-balance">
              Everything you need to create{' '}
              <span className="inline-flex items-center gap-2 relative">
                better prompts.
                <LightbulbDoodle className="w-10 h-12 -mt-2 -rotate-6 shrink-0" />
              </span>
            </h2>
          </div>

          {/* Right: Supporting paragraph and Explore button */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between space-y-5">
            <p className="text-base sm:text-lg text-[#25283D]/90 font-medium leading-relaxed lg:text-right">
              Build prompts from scratch with contextual intelligence, transform any reference photo into rich descriptive prompts, and refine existing instructions with clear explanations of what changed.
            </p>
            <button
              onClick={() => onSelectFeature('builder')}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#25283D] hover:bg-[#1a1c2b] active:scale-98 rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#F4774F] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Explore Studio Workspace</span>
              <ArrowUpRight className="w-4 h-4 text-[#55CFC0]" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* THREE VERTICALLY STACKED ALTERNATING FEATURE ROWS         */}
        {/* ========================================================= */}
        <div className="space-y-20 md:space-y-28">
          {/* ------------------------------------------------------- */}
          {/* ROW 1 — PROMPT BUILDER (Text Left, Illustration Right)  */}
          {/* ------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Text Block on Left */}
            <div className="lg:col-span-6 flex flex-col items-start">
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] font-display mb-4 shadow-[2px_2px_0px_0px_#25283D]">
                <span className="w-2 h-2 rounded-full bg-[#F4774F]" />
                <span>01 — PROMPT BUILDER</span>
              </div>

              {/* Heading */}
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#25283D] font-display leading-[1.15] tracking-tight mb-5">
                Ideas into{' '}
                <span className="relative inline-block text-[#F4774F]">
                  powerful prompts.
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 overflow-visible pointer-events-none"
                    viewBox="0 0 160 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7 C 50 2, 110 3, 158 6"
                      stroke="#25283D"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#25283D]/90 font-medium leading-relaxed max-w-xl mb-7">
                Turn a simple idea into a detailed prompt with the right context, style, lighting, mood, and composition.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => onSelectFeature('builder')}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-[#F4774F] hover:bg-[#e0663e] active:scale-98 rounded-full border-2 border-[#25283D] shadow-[3px_3px_0px_0px_#25283D] transition-all cursor-pointer"
              >
                <span>Build a Prompt</span>
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* Illustration on Right (IMAGE 1: Person sitting in chair with laptop, plant, yellow background) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[440px] flex items-center justify-center">
                {/* Subtle outer decorative accents */}
                <div className="absolute -top-3 -right-3 z-10 pointer-events-none animate-soft-sparkle">
                  <StarDoodle size={20} color="#F4774F" />
                </div>
                <div className="absolute -bottom-2 -left-2 z-10 pointer-events-none">
                  <SparkleLineDoodle size={18} color="#55CFC0" />
                </div>

                {/* Contained image presentation with warm peach backing */}
                <div className="relative w-full bg-[#FFE8D0]/80 rounded-[2.25rem] p-4 sm:p-5 border-2 border-[#25283D] shadow-[4px_4px_0px_0px_#25283D] flex items-center justify-center">
                  <img
                    src="/assets/aistudio/image_7d7ba6ec.png"
                    alt="Creative person sitting in chair using laptop with potted plant and warm yellow background"
                    className="w-full h-auto max-h-[380px] object-contain rounded-2xl select-none"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* ROW 2 — IMAGE TO PROMPT (Illustration Left, Text Right) */}
          {/* ------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Illustration on Left (order-2 on mobile, order-1 on desktop) */}
            <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
              <div className="relative w-full max-w-[440px] flex items-center justify-center">
                {/* Subtle outer decorative accents */}
                <div className="absolute -top-3 -left-3 z-10 pointer-events-none animate-soft-sparkle">
                  <StarDoodle size={20} color="#8B7BE8" />
                </div>
                <div className="absolute -bottom-2 -right-2 z-10 pointer-events-none">
                  <SparkleLineDoodle size={18} color="#FFD078" />
                </div>

                {/* Contained image presentation with soft lavender backing */}
                <div className="relative w-full bg-[#F4F0FF] rounded-[2.25rem] p-4 sm:p-5 border-2 border-[#25283D] shadow-[4px_4px_0px_0px_#25283D] flex items-center justify-center">
                  <img
                    src="/assets/aistudio/image_1ce4459a.png"
                    alt="Girl holding magnifying glass in front of her face, wearing purple top"
                    className="w-full h-auto max-h-[380px] object-contain rounded-2xl select-none"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Text Block on Right (order-1 on mobile, order-2 on desktop) */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start">
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] font-display mb-4 shadow-[2px_2px_0px_0px_#25283D]">
                <span className="w-2 h-2 rounded-full bg-[#55CFC0]" />
                <span>02 — IMAGE TO PROMPT</span>
              </div>

              {/* Heading */}
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#25283D] font-display leading-[1.15] tracking-tight mb-5">
                See it. Describe it.{' '}
                <span className="relative inline-block text-[#8B7BE8]">
                  Create it.
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 overflow-visible pointer-events-none"
                    viewBox="0 0 140 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7 C 45 2, 95 3, 138 6"
                      stroke="#25283D"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#25283D]/90 font-medium leading-relaxed max-w-xl mb-7">
                Upload a reference image and turn its visual details into a descriptive prompt, including its subject, colors, lighting, composition, and artistic style.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => onSelectFeature('image')}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-[#F4774F] hover:bg-[#e0663e] active:scale-98 rounded-full border-2 border-[#25283D] shadow-[3px_3px_0px_0px_#25283D] transition-all cursor-pointer"
              >
                <span>Analyze an Image</span>
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* ROW 3 — PROMPT IMPROVER (Text Left, Illustration Right) */}
          {/* ------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Text Block on Left */}
            <div className="lg:col-span-6 flex flex-col items-start">
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] font-display mb-4 shadow-[2px_2px_0px_0px_#25283D]">
                <span className="w-2 h-2 rounded-full bg-[#8B7BE8]" />
                <span>03 — PROMPT IMPROVER</span>
              </div>

              {/* Heading */}
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#25283D] font-display leading-[1.15] tracking-tight mb-5">
                Make every word{' '}
                <span className="relative inline-block text-[#F4774F]">
                  work better.
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 overflow-visible pointer-events-none"
                    viewBox="0 0 170 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7 C 50 2, 115 3, 168 6"
                      stroke="#25283D"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#25283D]/90 font-medium leading-relaxed max-w-xl mb-7">
                Refine your prompts, discover missing details, and understand how to make your instructions clearer and more effective.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => onSelectFeature('improver')}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-[#F4774F] hover:bg-[#e0663e] active:scale-98 rounded-full border-2 border-[#25283D] shadow-[3px_3px_0px_0px_#25283D] transition-all cursor-pointer"
              >
                <span>Improve a Prompt</span>
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* Illustration on Right (IMAGE 3: Coral rocket launching beside ascending bar chart with gears and pale blue background) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[440px] flex items-center justify-center">
                {/* Subtle outer decorative accents */}
                <div className="absolute -top-3 -right-3 z-10 pointer-events-none animate-soft-sparkle">
                  <StarDoodle size={20} color="#FFD078" />
                </div>
                <div className="absolute -bottom-2 -left-2 z-10 pointer-events-none">
                  <SparkleLineDoodle size={18} color="#8B7BE8" />
                </div>

                {/* Contained image presentation with pale sky-blue backing */}
                <div className="relative w-full bg-[#EBF3FF] rounded-[2.25rem] p-4 sm:p-5 border-2 border-[#25283D] shadow-[4px_4px_0px_0px_#25283D] flex items-center justify-center">
                  <img
                    src="/assets/aistudio/image_abbb02d9.png"
                    alt="Coral rocket launching beside ascending bar chart with gears and pale blue circular background"
                    className="w-full h-auto max-h-[380px] object-contain rounded-2xl select-none"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
