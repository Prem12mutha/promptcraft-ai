/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight, HelpCircle, Sparkles } from 'lucide-react';
import { StarDoodle, SparkleLineDoodle } from './Doodles.tsx';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: 'What is PromptCraft AI?',
    answer:
      'PromptCraft AI helps you turn simple ideas into detailed, structured prompts for AI image-generation and language-model tools.',
  },
  {
    id: 2,
    question: 'How does the Prompt Builder work?',
    answer:
      'Describe your idea, choose relevant options such as style, lighting, camera angle, and aspect ratio, then generate a more detailed prompt that you can copy and use.',
  },
  {
    id: 3,
    question: 'What is Image to Prompt?',
    answer:
      'Upload a reference image to analyze its visible subject, composition, lighting, colors, atmosphere, and style, then generate a descriptive prompt inspired by those visual characteristics.',
  },
  {
    id: 4,
    question: 'How does the Prompt Improver help?',
    answer:
      'It helps refine an existing prompt by identifying missing context, improving clarity, and suggesting more specific instructions while preserving your original intent.',
  },
  {
    id: 5,
    question: 'Which AI tools can I use the prompts with?',
    answer:
      'Prompts can be adapted for compatible AI image generators and language models. Results and supported syntax vary by platform.',
  },
  {
    id: 6,
    question: 'Is PromptCraft AI free to use?',
    answer:
      'PromptCraft AI is designed to make prompt creation approachable. Core builder, analyzer, and improver tools are readily accessible directly in your browser without mandatory sign-up.',
  },
  {
    id: 7,
    question: 'Do I need to be an expert at prompting?',
    answer:
      'No. Start with a simple idea and use the available tools to explore how context, detail, style, and constraints can make instructions clearer.',
  },
  {
    id: 8,
    question: 'Does Image to Prompt recreate an image exactly?',
    answer:
      'No. It produces a descriptive interpretation of the visible image. The resulting prompt can guide a similar creation, but it cannot guarantee an identical result.',
  },
];

export const FAQSection: React.FC = () => {
  // Closed by default; allows toggling any question open or closed
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Split into 2 columns for desktop (left: 1, 2, 3, 4; right: 5, 6, 7, 8)
  const leftColumn = FAQ_DATA.slice(0, 4);
  const rightColumn = FAQ_DATA.slice(4, 8);

  return (
    <section id="faq" className="relative bg-[#FFF8E9] py-16 md:py-24 border-b-2 border-[#25283D] overflow-hidden scroll-mt-6">
      {/* Decorative Doodles in corners */}
      <div className="absolute top-10 right-8 sm:right-16 pointer-events-none hidden sm:block">
        <StarDoodle size={24} color="#FFD078" />
      </div>
      <div className="absolute bottom-12 left-8 pointer-events-none hidden sm:block">
        <SparkleLineDoodle size={20} color="#F4774F" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FFD078] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] font-display mb-3.5 shadow-[1.5px_1.5px_0px_0px_#25283D]">
            <HelpCircle className="w-3.5 h-3.5 text-[#F4774F]" />
            <span>Common Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25283D] font-display tracking-tight text-balance">
            Curious minds ask good questions.
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-[#25283D]/80 font-medium leading-relaxed max-w-xl mx-auto">
            Everything you need to know before turning your ideas into{' '}
            <span className="text-[#F4774F] font-bold underline decoration-[#F4774F]/40 decoration-2 underline-offset-4">
              better prompts
            </span>
            .
          </p>
        </div>

        {/* 2-Column Desktop Grid / 1-Column Mobile Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumn.map((item) => {
              const isOpen = openItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white border-2 border-[#25283D] rounded-2xl p-4 sm:p-5 shadow-[2.5px_2.5px_0px_0px_#25283D] transition-all hover:translate-y-[-1px] hover:shadow-[3.5px_3.5px_0px_0px_#25283D]"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full text-left flex items-center justify-between gap-3 font-display font-bold text-base sm:text-lg text-[#25283D] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4774F] rounded-lg"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#55CFC0] group-hover:bg-[#F4774F] transition-colors shrink-0" />
                      <span>{item.question}</span>
                    </span>
                    <span
                      className={`p-1.5 rounded-full bg-[#FFF8E9] border border-[#25283D] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-90 bg-[#FFD078]' : 'group-hover:translate-x-0.5'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 text-[#25283D]" />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      className="mt-3.5 pt-3.5 border-t border-[#25283D]/10 text-sm text-[#25283D]/80 font-medium leading-relaxed"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColumn.map((item) => {
              const isOpen = openItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white border-2 border-[#25283D] rounded-2xl p-4 sm:p-5 shadow-[2.5px_2.5px_0px_0px_#25283D] transition-all hover:translate-y-[-1px] hover:shadow-[3.5px_3.5px_0px_0px_#25283D]"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full text-left flex items-center justify-between gap-3 font-display font-bold text-base sm:text-lg text-[#25283D] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4774F] rounded-lg"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#8B7BE8] group-hover:bg-[#F4774F] transition-colors shrink-0" />
                      <span>{item.question}</span>
                    </span>
                    <span
                      className={`p-1.5 rounded-full bg-[#FFF8E9] border border-[#25283D] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-90 bg-[#FFD078]' : 'group-hover:translate-x-0.5'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 text-[#25283D]" />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      className="mt-3.5 pt-3.5 border-t border-[#25283D]/10 text-sm text-[#25283D]/80 font-medium leading-relaxed"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiet support note below accordion */}
        <div className="mt-12 text-center text-xs sm:text-sm font-semibold text-[#25283D]/70 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#F4774F]" />
          <span>Have a question not listed here? Try building a prompt in the studio to see how it works!</span>
        </div>
      </div>
    </section>
  );
};
