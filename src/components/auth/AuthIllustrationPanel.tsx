/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PromptCraftLogoIcon } from '../Doodles.tsx';

interface AuthIllustrationPanelProps {
  onNavigateHome: () => void;
}

export const AuthIllustrationPanel: React.FC<AuthIllustrationPanelProps> = ({ onNavigateHome }) => {
  return (
    <div className="relative w-full md:w-[52%] lg:w-[54%] min-h-[320px] md:min-h-screen bg-[#E8F7FF] flex flex-col justify-between overflow-hidden select-none">
      {/* Top Header with Brand Return Link */}
      <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#25283D] hover:text-[#37B8E8] transition-colors cursor-pointer bg-white/70 hover:bg-white px-3.5 py-2 rounded-full border border-[#DCE4EA] shadow-xs backdrop-blur-xs"
          title="Return to PromptCraft AI Home"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <PromptCraftLogoIcon className="w-5 h-5 shrink-0" />
          <span className="font-display">PromptCraft AI</span>
        </button>

        <span className="hidden sm:inline-block text-[11px] font-semibold text-[#788493] tracking-wide uppercase">
          AI Studio Workspace
        </span>
      </div>

      {/* Main Illustration Area: Scaled cleanly edge-to-edge */}
      <div className="relative flex-1 w-full flex items-end justify-center md:justify-start px-2 sm:px-6 md:px-0">
        <div className="relative w-full h-full max-h-[720px] flex items-end justify-center">
          <img
            src="/assets/aistudio/auth_illustration_clean.png"
            alt="Person working on a desktop computer by large daylight office windows"
            className="w-full h-full max-h-[700px] object-contain object-bottom md:object-left-bottom pointer-events-none"
            loading="eager"
          />
        </div>
      </div>

      {/* Bottom subtle ambient accent */}
      <div className="relative z-10 px-8 py-4 hidden md:flex items-center justify-between text-[11px] font-medium text-[#788493]/75 border-t border-[#DCE4EA]/60 bg-[#E8F7FF]/50 backdrop-blur-xs">
        <span>© {new Date().getFullYear()} PromptCraft AI</span>
        <span>Creative Prompt Engineering</span>
      </div>
    </div>
  );
};
