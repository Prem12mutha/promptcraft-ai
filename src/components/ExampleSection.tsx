/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import {
  DoodleArrow,
  DownwardDoodleArrow,
  CurvedUnderlineDoodle,
  DoodlePencilTiny,
  StarDoodle,
  SparkleLineDoodle,
} from './Doodles.tsx';

interface ExamplePair {
  id: string;
  category: string;
  before: string;
  beforeCaption: string;
  after: string;
  highlightedAfter: React.ReactNode;
  improvements: { text: string; dotColor: string }[];
}

const EXAMPLES: ExamplePair[] = [
  {
    id: 'city',
    category: 'Architecture & Sci-Fi',
    before: 'A futuristic city.',
    beforeCaption: 'Missing lighting, camera direction, and visual detail.',
    after:
      'A futuristic megacity at night, illuminated by coral and violet neon lights, reflective streets, cinematic atmosphere, aerial perspective, intricate architecture, and atmospheric fog.',
    highlightedAfter: (
      <>
        A futuristic megacity at night, illuminated by{' '}
        <span className="font-semibold text-[#F4774F] bg-[#FFE8D0]/80 px-1.5 py-0.5 rounded border-b border-[#F4774F]/40">
          coral and violet neon lights
        </span>
        , reflective streets,{' '}
        <span className="font-semibold text-[#8B7BE8] bg-[#EDE9FE] px-1.5 py-0.5 rounded border-b border-[#8B7BE8]/40">
          cinematic atmosphere
        </span>
        ,{' '}
        <span className="font-semibold text-[#188B7E] bg-[#CFF0E5] px-1.5 py-0.5 rounded border-b border-[#55CFC0]/60">
          aerial perspective
        </span>
        , intricate architecture, and atmospheric fog.
      </>
    ),
    improvements: [
      { text: 'Lighting and time of day', dotColor: '#55CFC0' },
      { text: 'Camera perspective', dotColor: '#8B7BE8' },
      { text: 'Atmospheric depth', dotColor: '#F4774F' },
      { text: 'Architectural detail', dotColor: '#55CFC0' },
    ],
  },
  {
    id: 'portrait',
    category: 'Portrait Photography',
    before: 'Portrait of a female scientist.',
    beforeCaption: 'Missing character context, camera lens, and color temperature.',
    after:
      'Expressive medium-close portrait of an astrophysicist in a modern observatory, rim-lit by deep indigo and golden twilight, natural skin texture, bokeh star chart backdrop, Hasselblad 80mm lens aesthetic.',
    highlightedAfter: (
      <>
        Expressive medium-close portrait of an astrophysicist in a modern observatory,{' '}
        <span className="font-semibold text-[#F4774F] bg-[#FFE8D0]/80 px-1.5 py-0.5 rounded border-b border-[#F4774F]/40">
          rim-lit by deep indigo and golden twilight
        </span>
        , natural skin texture,{' '}
        <span className="font-semibold text-[#8B7BE8] bg-[#EDE9FE] px-1.5 py-0.5 rounded border-b border-[#8B7BE8]/40">
          bokeh star chart backdrop
        </span>
        ,{' '}
        <span className="font-semibold text-[#188B7E] bg-[#CFF0E5] px-1.5 py-0.5 rounded border-b border-[#55CFC0]/60">
          Hasselblad 80mm lens aesthetic
        </span>
        .
      </>
    ),
    improvements: [
      { text: 'Subject & narrative context', dotColor: '#55CFC0' },
      { text: 'Lighting & rim highlights', dotColor: '#8B7BE8' },
      { text: 'Camera lens & focal depth', dotColor: '#F4774F' },
      { text: 'Atmospheric backdrop', dotColor: '#55CFC0' },
    ],
  },
  {
    id: 'cafe',
    category: '3D Isometric & Concept Art',
    before: 'A coffee shop interior.',
    beforeCaption: 'Missing art style framing, sensory atmosphere, and props.',
    after:
      'Charming warm isometric cutaway of an artisan coffee roastery, morning sunshine streaming through paned windows, steam rising from ceramic mugs, wooden counters, lush hanging ferns, cozy storybook color palette.',
    highlightedAfter: (
      <>
        Charming warm isometric cutaway of an artisan coffee roastery,{' '}
        <span className="font-semibold text-[#F4774F] bg-[#FFE8D0]/80 px-1.5 py-0.5 rounded border-b border-[#F4774F]/40">
          morning sunshine streaming through paned windows
        </span>
        ,{' '}
        <span className="font-semibold text-[#8B7BE8] bg-[#EDE9FE] px-1.5 py-0.5 rounded border-b border-[#8B7BE8]/40">
          steam rising from ceramic mugs
        </span>
        , wooden counters, lush hanging ferns,{' '}
        <span className="font-semibold text-[#188B7E] bg-[#CFF0E5] px-1.5 py-0.5 rounded border-b border-[#55CFC0]/60">
          cozy storybook color palette
        </span>
        .
      </>
    ),
    improvements: [
      { text: 'Isometric cutaway framing', dotColor: '#55CFC0' },
      { text: 'Sensory warmth & steam', dotColor: '#8B7BE8' },
      { text: 'Lighting & morning sun', dotColor: '#F4774F' },
      { text: 'Curated color palette', dotColor: '#55CFC0' },
    ],
  },
];

interface ExampleSectionProps {
  onLoadIntoImprover: (text: string) => void;
}

export const ExampleSection: React.FC<ExampleSectionProps> = ({ onLoadIntoImprover }) => {
  const [selectedExample, setSelectedExample] = useState<ExamplePair>(EXAMPLES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedExample.after);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section id="examples" className="relative bg-[#FFF8E9] py-14 md:py-20 border-b-2 border-[#25283D] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FFD078] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] font-display mb-3 shadow-[1.5px_1.5px_0px_0px_#25283D]">
            <Sparkles className="w-3.5 h-3.5 text-[#F4774F]" />
            <span>Before & After Transformation</span>
          </div>

          <h2 className="relative inline-block text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25283D] font-display tracking-tight">
            <span>Small idea. </span>
            <span className="relative inline-block text-[#F4774F]">
              Better prompt.
              <CurvedUnderlineDoodle
                color="#F4774F"
                className="absolute -bottom-2.5 left-0 w-full h-3 pointer-events-none"
              />
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#25283D]/80 font-medium leading-relaxed max-w-xl mx-auto">
            Watch a simple idea transform into a detailed prompt, ready to guide your favorite AI tools.
          </p>

          {/* Interactive example category tabs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.id}
                onClick={() => {
                  setSelectedExample(ex);
                  setCopied(false);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full border-2 border-[#25283D] transition-all cursor-pointer ${
                  selectedExample.id === ex.id
                    ? 'bg-[#25283D] text-[#FFF8E9] shadow-[2px_2px_0px_0px_#F4774F] translate-y-[-1px]'
                    : 'bg-[#FFF8E9] text-[#25283D] hover:bg-[#FFE8D0] hover:shadow-[1.5px_1.5px_0px_0px_#25283D]'
                }`}
              >
                {ex.category}
              </button>
            ))}
          </div>
        </div>

        {/* Cream-colored comparison container */}
        <div className="relative max-w-4xl mx-auto bg-[#FFF8E9] border-2 border-[#25283D] rounded-3xl p-6 sm:p-9 shadow-[4px_4px_0px_0px_#25283D]">
          {/* Decorative Corner Sparkle */}
          <div className="absolute top-4 right-4 pointer-events-none">
            <StarDoodle size={18} color="#FFD078" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 md:gap-5 items-stretch">
            {/* BEFORE Box: Soft peach (#FFE8D0) surface with dashed border and tiny pencil doodle */}
            <div className="md:col-span-5 bg-[#FFE8D0] border-2 border-dashed border-[#25283D]/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full min-h-[190px]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <DoodlePencilTiny className="w-4 h-4 text-[#25283D]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#25283D]/75 font-display">
                    Before · Simple Idea
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#25283D] font-display leading-snug">
                  "{selectedExample.before}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#25283D]/15 flex items-center gap-2 text-xs font-semibold text-[#25283D]/75">
                <span className="w-2 h-2 rounded-full bg-[#F4774F] shrink-0" />
                <span>{selectedExample.beforeCaption}</span>
              </div>
            </div>

            {/* Connecting Doodle Arrow (Desktop: horizontal DoodleArrow; Mobile: downward DownwardDoodleArrow) */}
            <div className="md:col-span-1 flex items-center justify-center py-2 md:py-0">
              <div className="hidden md:block w-20">
                <DoodleArrow className="w-full h-auto" />
              </div>
              <div className="md:hidden flex items-center justify-center py-1">
                <DownwardDoodleArrow className="w-8 h-14" />
              </div>
            </div>

            {/* AFTER Box: Clean white/ivory surface with coral sparkle and highlighted text */}
            <div className="md:col-span-5 bg-white border-2 border-[#25283D] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-[2px_2px_0px_0px_#25283D] h-full min-h-[190px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F4774F] font-display">
                    <Sparkles className="w-3.5 h-3.5 text-[#F4774F]" />
                    After · PromptCraft Enhanced
                  </span>
                  <SparkleLineDoodle size={16} color="#FFD078" />
                </div>
                <p className="text-sm sm:text-base font-medium text-[#25283D] leading-relaxed">
                  "{selectedExample.highlightedAfter}"
                </p>
              </div>

              {/* Action Bar */}
              <div className="mt-5 pt-4 border-t border-[#25283D]/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border-2 border-[#25283D] transition-all cursor-pointer ${
                    copied
                      ? 'bg-[#CFF0E5] text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]'
                      : 'bg-[#F4774F] hover:bg-[#e0663e] text-white shadow-[2px_2px_0px_0px_#25283D]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#25283D]" />
                      <span>Copied to clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onLoadIntoImprover(selectedExample.before)}
                  className="text-xs font-bold text-[#8B7BE8] hover:text-[#F4774F] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Open in Improver →
                </button>
              </div>
            </div>
          </div>

          {/* Clean row of 4 applied improvements below */}
          <div className="mt-6 pt-5 border-t border-[#25283D]/10">
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-[#25283D]">
              <span className="font-bold text-[#25283D]/80 mr-1 font-display">Applied:</span>
              {selectedExample.improvements.map((imp, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 bg-[#FFF8E9] px-3 py-1.5 rounded-full border border-[#25283D]/20 shadow-[1px_1px_0px_0px_#25283D]"
                >
                  <span
                    className="w-2 h-2 rounded-full border border-[#25283D]/40 shrink-0"
                    style={{ backgroundColor: imp.dotColor }}
                  />
                  <span>{imp.text}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
