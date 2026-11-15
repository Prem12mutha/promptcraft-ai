/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useId } from 'react';
import {
  Wand2,
  Copy,
  Check,
  RefreshCw,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Layers,
  Terminal,
  HelpCircle,
  TrendingUp,
  FileText,
  Sliders,
  Gauge,
  Image as ImageIcon,
} from 'lucide-react';
import { Navbar } from './Navbar.tsx';
import { Footer } from './Footer.tsx';
import {
  StarDoodle,
  SparkleLineDoodle,
  LoopSwirlDoodle,
  RocketGrowthDoodle,
} from './Doodles.tsx';
import { improvePromptWithGemini, isGeminiConfigured } from '../lib/gemini.ts';

interface PromptImproverPageProps {
  onNavigate: (path: string) => void;
  initialPrompt?: string;
}

export type IntendedPurpose =
  | 'Image generation'
  | 'Writing and content'
  | 'Coding and development'
  | 'Learning and research'
  | 'Marketing and business'
  | 'General purpose';

export type TargetAiTool =
  | 'General AI'
  | 'ChatGPT'
  | 'Gemini'
  | 'Midjourney'
  | 'DALL·E'
  | 'Flux';

export type ImprovementGoal =
  | 'Add more detail'
  | 'Improve clarity'
  | 'Add useful context'
  | 'Make it more creative'
  | 'Make it more professional'
  | 'Improve structure'
  | 'Keep it concise';

export type DetailLevel =
  | 'Light refinement'
  | 'Balanced improvement'
  | 'Detailed enhancement';

interface QualityBreakdown {
  clarity: number;
  context: number;
  specificity: number;
  structure: number;
  outputExpectations: number;
  total: number;
}

interface ChangeCard {
  title: string;
  badge: string;
  description: string;
  why: string;
}

const EXAMPLE_PROMPTS = [
  {
    label: 'Write a professional email',
    purpose: 'Writing and content' as IntendedPurpose,
    tool: 'ChatGPT' as TargetAiTool,
    text: 'Write an email to a client asking for feedback on the website mockup we sent last week and schedule a call.',
  },
  {
    label: 'Create a modern portfolio website',
    purpose: 'Coding and development' as IntendedPurpose,
    tool: 'Gemini' as TargetAiTool,
    text: 'Create a modern portfolio website for a frontend designer with dark mode, animations, and a project gallery.',
  },
  {
    label: 'Generate a cinematic city image',
    purpose: 'Image generation' as IntendedPurpose,
    tool: 'Midjourney' as TargetAiTool,
    text: 'A futuristic city in the rain with glowing neon signs and flying cars.',
  },
  {
    label: 'Explain a technical topic simply',
    purpose: 'Learning and research' as IntendedPurpose,
    tool: 'General AI' as TargetAiTool,
    text: 'Explain quantum computing to someone with no physics background.',
  },
];

export const PromptImproverPage: React.FC<PromptImproverPageProps> = ({
  onNavigate,
  initialPrompt = '',
}) => {
  // ----------------------------------------------------
  // Form State
  // ----------------------------------------------------
  const [originalPrompt, setOriginalPrompt] = useState<string>(
    initialPrompt ||
      'A cute robot exploring an ancient enchanted forest with glowing mushrooms.'
  );

  const [intendedPurpose, setIntendedPurpose] =
    useState<IntendedPurpose>('Image generation');
  const [targetTool, setTargetTool] = useState<TargetAiTool>('Midjourney');

  const [selectedGoals, setSelectedGoals] = useState<ImprovementGoal[]>([
    'Improve clarity',
    'Add useful context',
    'Improve structure',
  ]);

  const [detailLevel, setDetailLevel] =
    useState<DetailLevel>('Balanced improvement');
  const [extraKnowledge, setExtraKnowledge] = useState<string>('');

  // ----------------------------------------------------
  // Results State
  // ----------------------------------------------------
  const [improvedPrompt, setImprovedPrompt] = useState<string>('');
  const [isImproving, setIsImproving] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [hasProcessed, setHasProcessed] = useState<boolean>(false);
  const [activeChanges, setActiveChanges] = useState<ChangeCard[]>([]);

  // Accessible IDs
  const originalPromptId = useId();
  const intendedPurposeId = useId();
  const targetToolId = useId();
  const extraKnowledgeId = useId();

  // If initialPrompt changes from parent (e.g., sent from Image to Prompt or Prompt Builder)
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      setOriginalPrompt(initialPrompt);
      // Auto-detect purpose if image flags are present
      if (
        initialPrompt.includes('--ar') ||
        initialPrompt.includes('photograph') ||
        initialPrompt.includes('cinematic')
      ) {
        setIntendedPurpose('Image generation');
        if (initialPrompt.includes('--v') || initialPrompt.includes('--ar')) {
          setTargetTool('Midjourney');
        }
      }
    }
  }, [initialPrompt]);

  // ----------------------------------------------------
  // Heuristic Quality Evaluation Engine
  // ----------------------------------------------------
  const calculateQualityScore = (text: string): QualityBreakdown => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        clarity: 0,
        context: 0,
        specificity: 0,
        structure: 0,
        outputExpectations: 0,
        total: 0,
      };
    }

    const words = trimmed.split(/\s+/).length;

    // 1. Clarity (0 - 20)
    let clarity = 8;
    if (words > 12) clarity += 4;
    if (
      /\b(must|should|ensure|avoid|specifically|focus on|step-by-step)\b/i.test(
        trimmed
      )
    ) {
      clarity += 5;
    }
    if (!/\b(stuff|things|etc|something|like)\b/i.test(trimmed)) clarity += 3;
    clarity = Math.min(20, Math.max(5, clarity));

    // 2. Context (0 - 20)
    let context = 6;
    if (
      /\b(audience|user|client|environment|setting|background|domain|scenario|for)\b/i.test(
        trimmed
      )
    ) {
      context += 7;
    }
    if (words > 25) context += 4;
    if (trimmed.length > 120) context += 3;
    context = Math.min(20, Math.max(4, context));

    // 3. Specificity (0 - 20)
    let specificity = 6;
    if (
      /\b(lighting|texture|color|tone|voice|stack|framework|metric|resolution|ratio)\b/i.test(
        trimmed
      )
    ) {
      specificity += 8;
    }
    if (/\d+/.test(trimmed)) specificity += 3;
    if (words > 35) specificity += 3;
    specificity = Math.min(20, Math.max(4, specificity));

    // 4. Structure (0 - 20)
    let structure = 6;
    if (
      trimmed.includes('\n') ||
      trimmed.includes('#') ||
      trimmed.includes('- ') ||
      trimmed.includes(':')
    ) {
      structure += 8;
    }
    if (
      trimmed.includes('1.') ||
      trimmed.includes('2.') ||
      trimmed.includes(';')
    ) {
      structure += 4;
    }
    if (words > 20) structure += 2;
    structure = Math.min(20, Math.max(5, structure));

    // 5. Output Expectations (0 - 20)
    let output = 6;
    if (
      /\b(format|output|deliverable|code|markdown|json|table|bullet points|draft|render|--ar)\b/i.test(
        trimmed
      )
    ) {
      output += 8;
    }
    if (
      /\b(length|concise|detailed|examples|summary|no preamble)\b/i.test(trimmed)
    ) {
      output += 6;
    }
    output = Math.min(20, Math.max(4, output));

    const total = clarity + context + specificity + structure + output;
    return {
      clarity,
      context,
      specificity,
      structure,
      outputExpectations: output,
      total: Math.min(100, Math.max(10, total)),
    };
  };

  const originalScore = calculateQualityScore(originalPrompt);
  const improvedScore = calculateQualityScore(improvedPrompt);

  // ----------------------------------------------------
  // Deterministic Rule-Based Improvement Engine
  // ----------------------------------------------------
  const improvePromptLogic = (): { prompt: string; changes: ChangeCard[] } => {
    const raw = originalPrompt.trim();
    const changes: ChangeCard[] = [];
    const isConcise = selectedGoals.includes('Keep it concise');
    const isCreative = selectedGoals.includes('Make it more creative');
    const isProfessional = selectedGoals.includes('Make it more professional');
    const wantsDetail = selectedGoals.includes('Add more detail');
    const wantsContext = selectedGoals.includes('Add useful context');
    const wantsStructure = selectedGoals.includes('Improve structure');
    const extra = extraKnowledge.trim();

    // ==========================================
    // CASE A: IMAGE GENERATION
    // ==========================================
    if (
      intendedPurpose === 'Image generation' ||
      targetTool === 'Midjourney' ||
      targetTool === 'Flux' ||
      targetTool === 'DALL·E'
    ) {
      let coreSubject = raw.replace(/\s+/g, ' ');

      // Extract subject hooks
      let lightingHook = isCreative
        ? 'ethereal twilight illumination with volumetric light beams and soft bioluminescent rim reflections'
        : 'cinematic golden hour sunlight with soft diffused shadows and subtle natural highlights';

      let styleHook = isCreative
        ? 'tactile storybook concept art aesthetic with rich painterly brushstrokes and fine micro-textures'
        : isProfessional
        ? 'photorealistic 35mm optical capture, natural color science, fine film grain, Hasselblad render'
        : 'crisp cinematic realism, balanced dynamic range, rich atmospheric depth';

      let compositionHook = 'wide-angle perspective with balanced rule-of-thirds focal depth';

      if (detailLevel === 'Light refinement') {
        const result = `${coreSubject}, ${lightingHook}, ${styleHook}${
          extra ? `, ${extra}` : ''
        }`;
        const finalPrompt =
          targetTool === 'Midjourney'
            ? `${result} --ar 16:9 --v 6.1`
            : targetTool === 'Flux'
            ? `${result} --aspect 16:9 --raw`
            : result;

        changes.push({
          title: 'Atmospheric Lighting Added',
          badge: 'Lighting',
          description: `Infused "${lightingHook}" to elevate visual dimension without distorting the original concept.`,
          why: 'Lighting is the #1 factor in transforming flat generative images into emotionally compelling artwork.',
        });
        changes.push({
          title: 'Optical Rigor & Style',
          badge: 'Style & Medium',
          description: `Specified "${styleHook}" to prevent generic smoothing and artifacting.`,
          why: 'Clear medium descriptors guide diffusion model weights to render authentic material textures.',
        });

        return { prompt: finalPrompt, changes };
      }

      // Balanced or Detailed
      let enhanced = `${coreSubject}, situated in an immersive environmental setting with layered foreground and background depth. Illuminated by ${lightingHook}, framed in ${compositionHook}. Rendered with ${styleHook}, 8k resolution, photorealistic micro-details, zero motion blur`;
      if (extra) enhanced += `, special directive: ${extra}`;

      if (targetTool === 'Midjourney') {
        enhanced += ' --ar 16:9 --v 6.1 --stylize 250 --quality 2';
      } else if (targetTool === 'Flux') {
        enhanced += ' --aspect 16:9 --raw --steps 30';
      } else if (targetTool === 'DALL·E') {
        enhanced = `A detailed photographic composition: ${enhanced}. Natural optical clarity, no watermark.`;
      }

      changes.push({
        title: 'Context & Environment Added',
        badge: 'Context added',
        description:
          'Expanded the subject with multi-layered environmental depth and focal hierarchy.',
        why: 'Isolated subjects often float awkwardly; contextual staging gives the image a realistic spatial sense.',
      });
      changes.push({
        title: 'Lighting & Atmosphere Calibrated',
        badge: 'Lighting and tone',
        description: `Introduced ${lightingHook} to establish mood and depth.`,
        why: 'Lighting defines texture, mood, and contrast across generative diffusion renders.',
      });
      changes.push({
        title: 'Model Flags & Parameters Appended',
        badge: 'Syntax specified',
        description:
          targetTool === 'Midjourney'
            ? 'Appended optimal Midjourney parameter syntax (--ar 16:9 --v 6.1 --stylize 250).'
            : 'Configured model-native aspect ratio and render flags.',
        why: 'Native flags prevent parser misinterpretation and enforce the desired composition format.',
      });

      return { prompt: enhanced, changes };
    }

    // ==========================================
    // CASE B: CODING & DEVELOPMENT
    // ==========================================
    if (intendedPurpose === 'Coding and development') {
      let role = 'Principal Software Engineer and System Architect';
      let format = 'Production-grade code with TypeScript types, error handling, and unit test strategy';

      if (isConcise) {
        format = 'Concise, clean code with strict types and zero fluff';
      }

      const prompt = `You are a ${role}.

# Objective
${raw}

# Implementation Requirements
1. **Production Quality**: Provide complete, fully typed implementation. Do NOT use placeholder comments like "// implement here".
2. **Defensive Programming**: Include comprehensive input validation, error boundaries, and defensive edge-case handling.
3. **Architecture & Standards**: Follow SOLID principles, clean module separation, and industry best practices.
${extra ? `4. **Specific Constraint**: ${extra}\n` : ''}
# Output Deliverables
- Fully working implementation code.
- Key architectural decisions and trade-offs explained in 2-3 concise bullet points.
- Brief verification example or test case demonstrating usage.`;

      changes.push({
        title: 'Senior Engineering Persona Defined',
        badge: 'Role specified',
        description: `Set system persona to "${role}" to elevate the technical precision of the response.`,
        why: 'Framing the model with senior persona prompts it to prioritize maintainability and edge cases.',
      });
      changes.push({
        title: 'Deliverable Expectations Formalized',
        badge: 'Output format specified',
        description:
          'Structured the output into complete code, architectural trade-offs, and verification test cases.',
        why: 'Eliminates vague placeholder code and ensures you receive runnable, enterprise-grade output.',
      });
      if (wantsContext || extra) {
        changes.push({
          title: 'Defensive Constraints & Edge Cases Added',
          badge: 'Constraints added',
          description:
            'Mandated strict typing, error handling, and defensive edge-case coverage.',
          why: 'Prevents superficial happy-path code that breaks in real production environments.',
        });
      }

      return { prompt, changes };
    }

    // ==========================================
    // CASE C: WRITING, MARKETING, LEARNING, GENERAL
    // ==========================================
    let persona = 'Expert Communications Specialist & Subject Matter Authority';
    if (intendedPurpose === 'Marketing and business') {
      persona = 'Elite Conversion Copywriter and Brand Strategist';
    } else if (intendedPurpose === 'Learning and research') {
      persona = 'World-Class Educator and Technical Explainer';
    }

    let toneDirective = isProfessional
      ? 'Authoritative, polished, and executive-ready'
      : isCreative
      ? 'Evocative, narrative-driven, and captivating'
      : 'Clear, engaging, and highly articulate';

    let lengthDirective = isConcise
      ? 'Keep explanations razor-sharp and tightly edited. Avoid pleasantries, repetitive transitions, or fluff.'
      : 'Provide comprehensive depth with practical examples, clear transitions, and actionable takeaways.';

    const prompt = `You are an ${persona}.

# Core Request
${raw}

# Instructions & Guidelines
- **Tone & Voice**: ${toneDirective}.
- **Audience Context**: Written for a curious, discerning reader who values clarity and substance.
- **Clarity & Flow**: ${lengthDirective}.
${extra ? `- **Mandatory Constraints**: ${extra}.\n` : ''}
# Structure & Format
1. Open with an impactful, engaging hook that immediately defines the core value.
2. Organize main arguments or insights into logical sections with descriptive headings.
3. Conclude with a memorable summary and 2-3 actionable next steps or alternative perspectives.`;

    changes.push({
      title: 'Structural Hierarchy & Sections Added',
      badge: 'Structure improved',
      description:
        'Reorganized the prompt into Objective, Tone Guidelines, and Concrete Deliverables.',
      why: 'Markdown headers provide clear boundaries for LLM attention heads, preventing hallucination.',
    });
    changes.push({
      title: 'Tone and Voice Rigor Defined',
      badge: 'Tone and style refined',
      description: `Specified "${toneDirective}" to align the model with your exact desired register.`,
      why: 'Explicit voice parameters stop models from falling back on generic, overly cheerful assistant boilerplate.',
    });
    changes.push({
      title: 'Audience & Scope Boundaries Clarified',
      badge: 'Context added',
      description:
        'Framed the target reader and added concrete structural deliverables.',
      why: 'Grounds the generation in real-world application rather than abstract definitions.',
    });

    return { prompt, changes };
  };

  // ----------------------------------------------------
  // Execution Handlers
  // ----------------------------------------------------
  const handleImprove = async () => {
    if (!originalPrompt.trim()) {
      setErrorMessage(
        'Please enter a prompt to improve. You can also pick an example below!'
      );
      return;
    }

    setErrorMessage(null);
    setIsImproving(true);

    if (isGeminiConfigured) {
      try {
        const aiResult = await improvePromptWithGemini(originalPrompt, {
          targetTool,
          goals: selectedGoals,
          intendedPurpose,
          extraKnowledge,
        });

        if (aiResult && aiResult.improvedPrompt) {
          setImprovedPrompt(aiResult.improvedPrompt);
          if (aiResult.changes && aiResult.changes.length > 0) {
            setActiveChanges(
              aiResult.changes.map((c) => ({
                title: c.title,
                badge: c.tag || 'AI Optimized',
                description: c.description,
                why: 'Optimized by Google Gemini prompt engineering model.',
              }))
            );
          }
          setIsImproving(false);
          setHasProcessed(true);
          return;
        }
      } catch (err) {
        console.warn('Gemini prompt improvement error, falling back to local engine:', err);
      }
    }

    // Local deterministic engine fallback
    setTimeout(() => {
      const { prompt, changes } = improvePromptLogic();
      setImprovedPrompt(prompt);
      setActiveChanges(changes);
      setIsImproving(false);
      setHasProcessed(true);
    }, 600);
  };

  // Run automatically on first mount if initialPrompt exists
  useEffect(() => {
    if (originalPrompt.trim() && !improvedPrompt) {
      const { prompt, changes } = improvePromptLogic();
      setImprovedPrompt(prompt);
      setActiveChanges(changes);
      setHasProcessed(true);
    }
  }, []);

  const handleGoalToggle = (goal: ImprovementGoal) => {
    if (selectedGoals.includes(goal)) {
      if (selectedGoals.length > 1) {
        setSelectedGoals(selectedGoals.filter((g) => g !== goal));
      }
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleSelectExample = (ex: (typeof EXAMPLE_PROMPTS)[0]) => {
    setOriginalPrompt(ex.text);
    setIntendedPurpose(ex.purpose);
    setTargetTool(ex.tool);
    setErrorMessage(null);

    // Auto improve the selected example
    setTimeout(() => {
      const { prompt, changes } = improvePromptLogic();
      setImprovedPrompt(prompt);
      setActiveChanges(changes);
      setHasProcessed(true);
    }, 150);
  };

  const handleClear = () => {
    setOriginalPrompt('');
    setImprovedPrompt('');
    setExtraKnowledge('');
    setHasProcessed(false);
    setErrorMessage(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(improvedPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = improvedPrompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    }
  };

  const originalWordCount = originalPrompt.trim()
    ? originalPrompt.trim().split(/\s+/).length
    : 0;
  const improvedWordCount = improvedPrompt.trim()
    ? improvedPrompt.trim().split(/\s+/).length
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E9] text-[#25283D] selection:bg-[#FFD078] selection:text-[#25283D]">
      {/* Top Navbar */}
      <Navbar
        onOpenWorkspace={() => onNavigate('/prompt-improver')}
        onNavigate={onNavigate}
      />

      <main className="flex-1 pb-20">
        {/* ========================================================= */}
        {/* 1. PAGE HEADER WITH BREADCRUMB & ROCKET DOODLE            */}
        {/* ========================================================= */}
        <section className="relative bg-[#FFD078] border-b-2 border-[#25283D] py-10 sm:py-14 overflow-hidden">
          {/* Background decorative doodles */}
          <div className="absolute top-4 right-8 pointer-events-none hidden sm:block">
            <LoopSwirlDoodle className="w-16 h-10 opacity-70" color="#25283D" />
          </div>
          <div className="absolute bottom-3 left-6 pointer-events-none hidden md:block">
            <StarDoodle size={22} color="#F4774F" />
          </div>

          <div className="max-w-7xl mx-auto px-6">
            {/* Top Row: Breadcrumb & Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs sm:text-sm font-bold"
              >
                <button
                  onClick={() => onNavigate('/')}
                  className="text-[#25283D] hover:text-[#F4774F] hover:underline transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Home</span>
                </button>
                <span className="text-[#25283D]/40">/</span>
                <span className="text-[#F4774F]">Prompt Improver</span>
              </nav>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onNavigate('/prompt-builder')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF8E9] hover:bg-white text-xs font-bold text-[#25283D] rounded-full border border-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D] transition-all cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5 text-[#F4774F]" />
                  <span>Prompt Builder</span>
                </button>

                <button
                  onClick={() => onNavigate('/image-to-prompt')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#CFF0E5] hover:bg-[#b5ebd9] text-xs font-bold text-[#25283D] rounded-full border border-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D] transition-all cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#25283D]" />
                  <span>Image to Prompt</span>
                </button>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]">
                  <span className="w-2 h-2 rounded-full bg-[#8B7BE8] animate-pulse" />
                  <span className="tracking-wider uppercase font-display">
                    PROMPT IMPROVER STUDIO
                  </span>
                </div>
              </div>
            </div>

            {/* Headline with Rocket Doodle */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3.5 flex-wrap">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#25283D] tracking-tight leading-[1.15]">
                  Make every prompt{' '}
                  <span className="relative inline-block text-[#F4774F]">
                    work harder.
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
                </h1>

                {/* Handcrafted Rocket Doodle */}
                <div className="animate-gentle-float">
                  <RocketGrowthDoodle size={44} />
                </div>
              </div>

              <p className="mt-4 text-base sm:text-lg text-[#25283D]/90 font-medium leading-relaxed">
                Refine your instructions, add missing context, and turn vague ideas
                into clear, effective prompts.
              </p>

              {/* Feature Note Banner */}
              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFF8E9]/80 backdrop-blur-xs border border-[#25283D]/30 rounded-xl text-xs font-bold text-[#25283D]">
                <TrendingUp className="w-3.5 h-3.5 text-[#F4774F]" />
                <span>
                  Clearer instructions. Better-structured prompts. More control over your results.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. MAIN WORKSPACE: 2-COLUMN RESPONSIVE LAYOUT             */}
        {/* ========================================================= */}
        <div className="max-w-7xl mx-auto px-6 pt-10 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ----------------------------------------------------- */}
            {/* LEFT COLUMN: ORIGINAL PROMPT & IMPROVEMENT CONTROLS   */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-6">
              {/* Card 1: Your Original Prompt */}
              <div className="bg-white rounded-3xl border-3 border-[#25283D] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#25283D] space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#25283D]/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FFE8D0] border-2 border-[#25283D] flex items-center justify-center text-[#F4774F] shadow-[1.5px_1.5px_0px_0px_#25283D]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold font-display text-[#25283D]">
                        Your original prompt
                      </h2>
                      <p className="text-[11px] font-semibold text-[#25283D]/65">
                        Paste your draft or pick a sample below
                      </p>
                    </div>
                  </div>

                  {originalPrompt && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#25283D]/70 hover:text-red-600 bg-[#FFF8E9] hover:bg-red-50 rounded-lg border border-[#25283D]/20 transition-colors cursor-pointer"
                      title="Clear prompt"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>

                {/* Validation Error */}
                {errorMessage && (
                  <div className="p-3 bg-red-50 border-2 border-red-400 rounded-xl flex items-center gap-2 text-xs font-bold text-red-700 shadow-[1.5px_1.5px_0px_0px_#F87171]">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Textarea */}
                <div className="space-y-1.5">
                  <textarea
                    id={originalPromptId}
                    value={originalPrompt}
                    onChange={(e) => {
                      setOriginalPrompt(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    rows={5}
                    placeholder="Example: Create a website for my college tech fest..."
                    className="w-full p-4 bg-[#FFF8E9]/60 border-2 border-[#25283D] rounded-2xl text-xs sm:text-sm font-medium text-[#25283D] placeholder:text-[#25283D]/40 focus:outline-none focus:ring-2 focus:ring-[#F4774F] focus:bg-white shadow-[2px_2px_0px_0px_#25283D] transition-all"
                  />

                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#25283D]/60 px-1">
                    <span>
                      Original Quality Score:{' '}
                      <strong className="text-[#25283D] font-mono">
                        {originalScore.total}/100
                      </strong>
                    </span>
                    <span className="font-mono">
                      {originalWordCount} words · {originalPrompt.length} chars
                    </span>
                  </div>
                </div>

                {/* Example Chips */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#25283D]/75">
                    <Sparkles className="w-3.5 h-3.5 text-[#F4774F]" />
                    <span>Try an example prompt:</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_PROMPTS.map((ex, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectExample(ex)}
                        className="px-3 py-1.5 bg-[#FFF8E9] hover:bg-[#FFD078] text-[#25283D] text-xs font-semibold rounded-full border border-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D] active:translate-y-0.5 transition-all cursor-pointer text-left"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Purpose & Target AI Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-[#25283D]/10">
                  <div className="space-y-1">
                    <label
                      htmlFor={intendedPurposeId}
                      className="text-xs font-bold uppercase tracking-wider text-[#25283D]"
                    >
                      Intended Purpose
                    </label>
                    <div className="relative">
                      <select
                        id={intendedPurposeId}
                        value={intendedPurpose}
                        onChange={(e) =>
                          setIntendedPurpose(e.target.value as IntendedPurpose)
                        }
                        className="w-full appearance-none px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-bold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                      >
                        <option value="Image generation">Image generation</option>
                        <option value="Writing and content">Writing and content</option>
                        <option value="Coding and development">Coding and development</option>
                        <option value="Learning and research">Learning and research</option>
                        <option value="Marketing and business">Marketing and business</option>
                        <option value="General purpose">General purpose</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor={targetToolId}
                      className="text-xs font-bold uppercase tracking-wider text-[#25283D]"
                    >
                      Target AI Tool
                    </label>
                    <div className="relative">
                      <select
                        id={targetToolId}
                        value={targetTool}
                        onChange={(e) =>
                          setTargetTool(e.target.value as TargetAiTool)
                        }
                        className="w-full appearance-none px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-bold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                      >
                        <option value="General AI">General AI</option>
                        <option value="ChatGPT">ChatGPT (GPT-4o)</option>
                        <option value="Gemini">Gemini (2.5 Flash / Pro)</option>
                        <option value="Midjourney">Midjourney (v6.1)</option>
                        <option value="DALL·E">DALL·E 3</option>
                        <option value="Flux">Flux (Dev / Schnell)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Improvement Controls */}
              <div className="bg-[#D0F1E7] rounded-3xl border-3 border-[#25283D] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#25283D] space-y-5">
                <div className="flex items-center gap-2.5 pb-2 border-b-2 border-[#25283D]/15">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#25283D] flex items-center justify-center text-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D]">
                    <Sliders className="w-4 h-4 text-[#8B7BE8]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-[#25283D]">
                      How should we improve it?
                    </h3>
                    <p className="text-[11px] font-semibold text-[#25283D]/70">
                      Select multiple improvement goals and detail level
                    </p>
                  </div>
                </div>

                {/* Multi-Select Goals */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#25283D] block">
                    Improvement Goals (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        'Add more detail',
                        'Improve clarity',
                        'Add useful context',
                        'Make it more creative',
                        'Make it more professional',
                        'Improve structure',
                        'Keep it concise',
                      ] as ImprovementGoal[]
                    ).map((goal) => {
                      const isSelected = selectedGoals.includes(goal);
                      return (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => handleGoalToggle(goal)}
                          className={`px-3 py-1.5 rounded-xl border-2 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#F4774F] text-white border-[#25283D] shadow-[2px_2px_0px_0px_#25283D]'
                              : 'bg-white text-[#25283D] border-[#25283D]/40 hover:border-[#25283D]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          <span>{goal}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Detail Level Selector */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#25283D] block">
                    Detail Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        'Light refinement',
                        'Balanced improvement',
                        'Detailed enhancement',
                      ] as DetailLevel[]
                    ).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setDetailLevel(lvl)}
                        className={`py-2 px-2 text-center rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                          detailLevel === lvl
                            ? 'bg-[#8B7BE8] text-white border-[#25283D] shadow-[2px_2px_0px_0px_#25283D]'
                            : 'bg-white text-[#25283D] border-[#25283D]/40 hover:border-[#25283D]'
                        }`}
                      >
                        {lvl.replace(' improvement', '').replace(' enhancement', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Extra Knowledge */}
                <div className="space-y-1.5 pt-1">
                  <label
                    htmlFor={extraKnowledgeId}
                    className="text-xs font-bold uppercase tracking-wider text-[#25283D] flex items-center gap-1"
                  >
                    <span>Anything else the AI should know?</span>
                    <span className="font-normal text-[#25283D]/60">(Optional)</span>
                  </label>
                  <input
                    id={extraKnowledgeId}
                    type="text"
                    value={extraKnowledge}
                    onChange={(e) => setExtraKnowledge(e.target.value)}
                    placeholder="e.g. For a senior executive audience, avoid buzzwords..."
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm text-[#25283D] placeholder:text-[#25283D]/40 focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D]"
                  />
                </div>

                {/* Prominent Coral Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleImprove}
                    disabled={isImproving}
                    className="w-full py-3.5 px-6 rounded-full border-2 border-[#25283D] font-bold text-sm sm:text-base flex items-center justify-center gap-2 bg-[#F4774F] hover:bg-[#e0663e] text-white shadow-[3px_3px_0px_0px_#25283D] active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    {isImproving ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Refining and Structuring...</span>
                      </>
                    ) : (
                      <>
                        <span>Improve My Prompt →</span>
                        <TrendingUp className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------- */}
            {/* RIGHT COLUMN: IMPROVED RESULTS & QUALITY CHECK        */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-6 lg:sticky lg:top-8 space-y-6">
              {/* Card 1: Your Improved Prompt */}
              <div className="bg-[#FFE8D0]/60 rounded-3xl border-3 border-[#25283D] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#25283D] space-y-5">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]">
                    <span className="w-2 h-2 rounded-full bg-[#55CFC0] animate-pulse" />
                    <span className="tracking-wider uppercase font-display">
                      YOUR IMPROVED PROMPT
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-[#25283D] text-[11px] font-bold text-[#25283D]">
                      <Terminal className="w-3 h-3 text-[#F4774F]" />
                      <span>{targetTool}</span>
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#25283D]/70">
                      {improvedWordCount} words · {improvedPrompt.length} chars
                    </span>
                  </div>
                </div>

                {/* Editable Text Area */}
                <div className="relative">
                  <textarea
                    value={improvedPrompt}
                    onChange={(e) => setImprovedPrompt(e.target.value)}
                    rows={9}
                    className="w-full p-4 bg-white border-2 border-[#25283D] rounded-2xl text-xs sm:text-sm font-mono leading-relaxed text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[3px_3px_0px_0px_#25283D] resize-y select-text min-h-[200px]"
                    placeholder="Your improved prompt will appear here after clicking 'Improve My Prompt'..."
                  />
                  <div className="absolute top-2.5 right-2.5 pointer-events-none">
                    <span className="text-[10px] font-bold text-[#25283D]/40 uppercase tracking-widest bg-white/80 px-1.5 py-0.5 rounded border border-[#25283D]/10">
                      EDITABLE
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-1">
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!improvedPrompt.trim()}
                    className={`w-full py-3 px-6 rounded-full border-2 border-[#25283D] font-bold text-sm flex items-center justify-center gap-2 shadow-[2.5px_2.5px_0px_0px_#25283D] active:translate-y-0.5 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-[#55CFC0] text-[#25283D]'
                        : 'bg-[#F4774F] hover:bg-[#e0663e] text-white'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Improved Prompt</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleImprove}
                      disabled={isImproving}
                      className="py-2.5 px-4 bg-white hover:bg-[#FFF8E9] text-[#25283D] text-xs font-bold rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] active:translate-y-0.5 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${
                          isImproving ? 'animate-spin text-[#F4774F]' : ''
                        }`}
                      />
                      <span>Regenerate</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleClear}
                      className="py-2.5 px-4 bg-white hover:bg-[#FFF8E9] text-[#25283D]/80 hover:text-red-600 text-xs font-bold rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] active:translate-y-0.5 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Prompt Quality Check */}
              <div className="bg-white rounded-3xl border-3 border-[#25283D] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#25283D] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#25283D]/10">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-[#8B7BE8]" />
                    <h3 className="text-base sm:text-lg font-bold font-display text-[#25283D]">
                      Prompt Quality Check
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#25283D]/60">
                      Score:
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full border-2 border-[#25283D] text-xs font-bold font-mono shadow-[1.5px_1.5px_0px_0px_#25283D] ${
                        improvedScore.total >= 80
                          ? 'bg-[#CFF0E5] text-[#25283D]'
                          : 'bg-[#FFD078] text-[#25283D]'
                      }`}
                    >
                      {improvedScore.total}/100
                    </span>
                  </div>
                </div>

                {/* Score Progress Bars */}
                <div className="space-y-3">
                  {[
                    {
                      label: 'Clarity',
                      score: improvedScore.clarity,
                      max: 20,
                      color: 'bg-[#55CFC0]',
                    },
                    {
                      label: 'Context',
                      score: improvedScore.context,
                      max: 20,
                      color: 'bg-[#8B7BE8]',
                    },
                    {
                      label: 'Specificity',
                      score: improvedScore.specificity,
                      max: 20,
                      color: 'bg-[#F4774F]',
                    },
                    {
                      label: 'Structure',
                      score: improvedScore.structure,
                      max: 20,
                      color: 'bg-[#FFD078]',
                    },
                    {
                      label: 'Output expectations',
                      score: improvedScore.outputExpectations,
                      max: 20,
                      color: 'bg-[#25283D]',
                    },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-[#25283D]">
                        <span>{item.label}</span>
                        <span className="font-mono">
                          {item.score}/{item.max}
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#FFF8E9] border border-[#25283D]/30 overflow-hidden">
                        <div
                          className={`h-full ${item.color} transition-all duration-500`}
                          style={{
                            width: `${(item.score / item.max) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-[#25283D]/70 leading-relaxed bg-[#FFF8E9] p-3 rounded-xl border border-[#25283D]/15">
                  <span className="font-bold text-[#25283D]">
                    Heuristic Quality Estimate:
                  </span>{' '}
                  Scores reflect syntactic presence of specific directives, persona framing,
                  and deliverable boundaries. Recalculates dynamically with your edits.
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. "WHAT CHANGED?" & COMPACT BEFORE/AFTER COMPARISON       */}
          {/* ========================================================= */}
          {hasProcessed && (
            <section className="mt-14 sm:mt-18 pt-10 border-t-3 border-[#25283D] space-y-10 animate-fade-in">
              {/* Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CFF0E5] border border-[#25283D] rounded-full text-xs font-bold text-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D] mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#F4774F]" />
                    <span className="tracking-wider uppercase font-display">
                      TRANSFORMATION BREAKDOWN
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#25283D]">
                    What changed in your prompt?
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#25283D] rounded-full text-xs font-semibold text-[#25283D]">
                  <span>Quality Lift:</span>
                  <span className="font-bold text-[#F4774F] font-mono">
                    +{Math.max(0, improvedScore.total - originalScore.total)} pts
                  </span>
                </div>
              </div>

              {/* Concise Change Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeChanges.map((change, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border-2 border-[#25283D] p-5 shadow-[4px_4px_0px_0px_#25283D] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-display text-[#25283D]">
                        {change.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#FFF8E9] border border-[#25283D] text-[10px] font-bold text-[#F4774F]">
                        {change.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-[#25283D] leading-relaxed">
                      {change.description}
                    </p>

                    <div className="pt-2 border-t border-[#25283D]/10 text-[11px] text-[#25283D]/70 leading-normal">
                      <strong className="text-[#25283D]">Why this matters:</strong>{' '}
                      {change.why}
                    </div>
                  </div>
                ))}
              </div>

              {/* Compact Before & After Comparison */}
              <div className="bg-[#FFF8E9] rounded-3xl border-3 border-[#25283D] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#25283D] space-y-6">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#25283D]">
                  <CheckCircle2 className="w-4 h-4 text-[#55CFC0]" />
                  <span>Before & After Comparison</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  {/* Before Box */}
                  <div className="bg-white/80 rounded-2xl border-2 border-[#25283D]/40 p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-[#25283D]/70">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#25283D]/10 text-[#25283D]">
                          Original Prompt
                        </span>
                        <span className="font-mono text-[#25283D]/60">
                          Score: {originalScore.total}/100
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-[#25283D]/80 leading-relaxed italic">
                        "{originalPrompt}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#25283D]/10 flex items-center justify-between text-[11px] text-[#25283D]/60 font-semibold">
                      <span>Vague scope & missing parameters</span>
                      <span>{originalWordCount} words</span>
                    </div>
                  </div>

                  {/* After Box */}
                  <div className="bg-[#CFF0E5]/60 rounded-2xl border-2 border-[#25283D] p-5 shadow-[3px_3px_0px_0px_#25283D] space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-[#25283D]">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#55CFC0] text-[#25283D] border border-[#25283D]">
                          Improved Prompt
                        </span>
                        <span className="font-mono font-bold text-[#25283D]">
                          Score: {improvedScore.total}/100
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-[#25283D] leading-relaxed line-clamp-4">
                        {improvedPrompt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#25283D]/15 flex items-center justify-between text-[11px] text-[#25283D] font-bold">
                      <span className="text-[#F4774F]">
                        Structured, high-clarity & model-optimized
                      </span>
                      <span>{improvedWordCount} words</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <Footer
        onSelectFeature={(feature) => {
          if (feature === 'builder') onNavigate('/prompt-builder');
          else if (feature === 'image') onNavigate('/image-to-prompt');
          else if (feature === 'improver') onNavigate('/prompt-improver');
          else onNavigate('/');
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
};
