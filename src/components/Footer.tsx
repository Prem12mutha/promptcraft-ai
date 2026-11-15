/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { PromptCraftLogoIcon, StarDoodle, SparkleLineDoodle, PaperAirplaneDoodle } from './Doodles.tsx';

interface FooterProps {
  onSelectFeature: (feature: 'builder' | 'image' | 'improver') => void;
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectFeature, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#FFD078] text-[#25283D] overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. TOP ILLUSTRATED ROLLING HILLS TRANSITION                               */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden leading-none select-none pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-20 md:h-28 object-fill block"
          preserveAspectRatio="none"
        >
          {/* Back rolling hill layer (Golden Amber #FFAF38) */}
          <path
            d="M0 60 C 240 10, 480 80, 720 40 C 960 0, 1200 65, 1440 30 L 1440 120 L 0 120 Z"
            fill="#FFAF38"
            opacity="0.5"
          />
          {/* Mid rolling hill layer (Coral Orange #F4774F) */}
          <path
            d="M0 80 C 280 40, 520 95, 800 55 C 1080 15, 1260 70, 1440 50 L 1440 120 L 0 120 Z"
            fill="#F4774F"
            opacity="0.35"
          />
          {/* Front rolling hill layer (Warm Butter Yellow #FFD078) */}
          <path
            d="M0 95 C 320 60, 640 110, 960 75 C 1200 45, 1360 80, 1440 70 L 1440 120 L 0 120 Z"
            fill="#FFD078"
          />
        </svg>

        {/* Small silhouette trees & shrubs along the top hill ridge */}
        <div className="absolute bottom-1 left-6 sm:left-14 opacity-75 hidden sm:block">
          <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
            <path d="M10 30 C 10 18, 16 12, 22 12 C 28 12, 34 18, 34 30 Z" fill="#F4774F" opacity="0.8" />
            <path d="M40 30 C 40 22, 45 16, 50 16 C 55 16, 60 22, 60 30 Z" fill="#E06138" opacity="0.7" />
            <path d="M68 30 C 68 14, 76 6, 85 6 C 94 6, 102 14, 102 30 Z" fill="#F4774F" opacity="0.85" />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN FOOTER CONTENT: CTA & CREATIVE ILLUSTRATION                       */}
      {/* ========================================================================= */}
      <div className="relative max-w-7xl mx-auto px-6 pt-4 pb-12 sm:pb-16">
        {/* Floating decorative doodles */}
        <div className="absolute top-2 right-12 hidden lg:block pointer-events-none">
          <StarDoodle size={24} color="#F4774F" />
        </div>
        <div className="absolute top-1/2 left-4 hidden xl:block pointer-events-none">
          <SparkleLineDoodle size={22} color="#8B7BE8" />
        </div>

        {/* Main Landscape CTA Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 sm:mb-20">
          {/* Left Column: CTA Headline, Supporting text, and Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Small Label Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] font-display mb-5 shadow-[2px_2px_0px_0px_#25283D]">
              <span className="w-2 h-2 rounded-full bg-[#F4774F]" />
              <span className="tracking-wider uppercase">YOUR NEXT GREAT IDEA STARTS HERE</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25283D] font-display leading-[1.12] tracking-tight text-balance mb-4">
              Ready to create something{' '}
              <span className="relative inline-block text-[#F4774F]">
                brilliant?
                {/* Playful underline squiggle */}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5 overflow-visible pointer-events-none"
                  viewBox="0 0 160 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 7 C 45 2, 105 3, 158 6" stroke="#25283D" strokeWidth="2.8" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#25283D]/90 font-medium leading-relaxed max-w-xl mb-8">
              Start with an idea. Shape it into a prompt. Bring your imagination to life.
            </p>

            {/* Action Bar (Matching reference with prominent button & secondary link) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto">
              {/* Primary Button */}
              <button
                onClick={() => onSelectFeature('builder')}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-[#F4774F] hover:bg-[#e0663e] active:scale-98 rounded-full border-2 border-[#25283D] shadow-[3.5px_3.5px_0px_0px_#25283D] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Start Creating for Free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary Link */}
              <a
                href="#features"
                onClick={(e) => handleScrollTo('features', e)}
                className="text-sm sm:text-base font-bold text-[#25283D] hover:text-[#F4774F] underline underline-offset-4 decoration-2 decoration-[#25283D]/40 hover:decoration-[#F4774F] transition-colors py-2 cursor-pointer"
              >
                Explore the tools →
              </a>
            </div>

            {/* Subtle trust note */}
            <div className="mt-7 flex items-center gap-3 text-xs font-semibold text-[#25283D]/75">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55CFC0]" />
              <span>Instant browser access</span>
              <span>·</span>
              <span>No mandatory account setup</span>
              <span>·</span>
              <span>Exports clean syntax</span>
            </div>
          </div>

          {/* Right Column: High-quality illustration of creative person working on laptop with plants & cat */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">
              {/* Soaring paper airplane / kite doodle overhead */}
              <div className="absolute -top-12 -left-8 sm:-left-12 w-28 h-18 pointer-events-none z-10 hidden sm:block">
                <PaperAirplaneDoodle className="w-full h-full" />
              </div>

              {/* Decorative sparkle in corner */}
              <div className="absolute -top-3 -right-3 z-10 pointer-events-none">
                <StarDoodle size={22} color="#F4774F" />
              </div>
              <div className="absolute -bottom-2 -left-2 z-10 pointer-events-none">
                <SparkleLineDoodle size={18} color="#55CFC0" />
              </div>

              {/* Framed Editorial Illustration Card */}
              <div className="relative rounded-3xl p-3.5 sm:p-4 bg-[#FFF8E9] border-3 border-[#25283D] shadow-[6px_6px_0px_0px_#25283D] overflow-hidden group">
                <img
                  src="/assets/aistudio/image_ed0c2fe8.png"
                  alt="Creative person working comfortably on laptop with plants, coffee, and a cat"
                  className="w-full h-auto object-cover rounded-2xl select-none transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />

                {/* Organic Pill Caption */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between px-3.5 py-1.5 bg-[#FFF8E9]/95 backdrop-blur-xs border-2 border-[#25283D] rounded-full shadow-[2px_2px_0px_0px_#25283D] text-[11px] font-bold text-[#25283D]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#55CFC0]" />
                    <span>Creative Studio Lounge</span>
                  </span>
                  <span className="text-[#F4774F] font-mono">v6.1 Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FOOTER NAVIGATION COLUMNS (Matching PromptCraft identity)              */}
        {/* ========================================================================= */}
        <div className="pt-12 border-t-2 border-[#25283D]/15 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('/');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2.5 text-2xl font-bold font-display tracking-tight group select-none"
              aria-label="PromptCraft AI Home"
            >
              <PromptCraftLogoIcon className="w-8 h-8 shrink-0" />
              <span className="flex items-center tracking-tight leading-none">
                <span className="text-[#25283D]">Prompt</span>
                <span className="text-[#F4774F]">Craft</span>
              </span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider rounded-md bg-[#55CFC0] text-[#25283D] border border-[#25283D] shadow-[1px_1px_0px_0px_#25283D] leading-none shrink-0">
                AI
              </span>
            </a>

            <p className="text-sm text-[#25283D]/80 font-medium leading-relaxed max-w-sm">
              Better prompts begin with better ideas. Build, analyze, and refine prompts with confidence.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF8E9] border border-[#25283D]/30 rounded-full text-xs font-semibold text-[#25283D]">
              <span className="w-2 h-2 rounded-full bg-[#55CFC0]" />
              <span>Friendly AI studio for curious creators</span>
            </div>
          </div>

          {/* Explore Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#25283D] font-display">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#25283D]/80">
              <li>
                <button
                  onClick={() => onSelectFeature('builder')}
                  className="hover:text-[#F4774F] transition-colors cursor-pointer text-left"
                >
                  Prompt Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectFeature('image')}
                  className="hover:text-[#F4774F] transition-colors cursor-pointer text-left"
                >
                  Image to Prompt
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectFeature('improver')}
                  className="hover:text-[#F4774F] transition-colors cursor-pointer text-left"
                >
                  Prompt Improver
                </button>
              </li>
              <li>
                <a
                  href="#examples"
                  onClick={(e) => handleScrollTo('examples', e)}
                  className="hover:text-[#F4774F] transition-colors cursor-pointer block"
                >
                  Examples
                </a>
              </li>
            </ul>
          </div>

          {/* Learn Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#25283D] font-display">
              Learn
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#25283D]/80">
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleScrollTo('features', e)}
                  className="hover:text-[#F4774F] transition-colors cursor-pointer block"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#examples"
                  onClick={(e) => handleScrollTo('examples', e)}
                  className="hover:text-[#F4774F] transition-colors cursor-pointer block"
                >
                  Prompting Tips
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleScrollTo('faq', e)}
                  className="hover:text-[#F4774F] transition-colors cursor-pointer block"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#25283D] font-display">
              Account & Connect
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#25283D]/80">
              <li>
                <button
                  onClick={() => onNavigate?.('/login')}
                  className="hover:text-[#F4774F] transition-colors cursor-pointer block text-left"
                >
                  Log In to Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('/signup')}
                  className="hover:text-[#F4774F] transition-colors cursor-pointer block text-left"
                >
                  Create Account
                </button>
              </li>
              <li>
                <a
                  href="mailto:hello@promptcraft.ai"
                  className="hover:text-[#F4774F] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Feedback & Support</span>
                  <span className="text-xs">↗</span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] font-medium text-[#25283D]/70 block">
                Crafted for all leading generative models.
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM COPYRIGHT BAR                                                   */}
        {/* ========================================================================= */}
        <div className="mt-12 pt-6 border-t border-[#25283D]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#25283D]/70">
          <p>© {currentYear} PromptCraft AI. Made for curious minds.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with taste, doodles & creativity</span>
            <Heart className="w-3.5 h-3.5 text-[#F4774F] fill-[#F4774F]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
