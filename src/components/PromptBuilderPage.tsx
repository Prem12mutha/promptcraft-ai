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
  Sliders,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  Info,
  CheckCircle2,
  Layers,
  Terminal,
  Cpu,
  Image as ImageIcon,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from './Navbar.tsx';
import { Footer } from './Footer.tsx';
import { StarDoodle, SparkleLineDoodle, LoopSwirlDoodle } from './Doodles.tsx';

interface PromptBuilderPageProps {
  onNavigate: (path: string) => void;
  onSendToImprover?: (promptText: string) => void;
}

export type TargetAiTool = 'ChatGPT' | 'Gemini' | 'Midjourney' | 'DALL·E' | 'Flux' | 'General AI';
export type PromptType = 'Image Generation' | 'Writing' | 'Coding' | 'Marketing' | 'General Purpose';

interface ExampleIdea {
  label: string;
  tool: TargetAiTool;
  type: PromptType;
  prompt: string;
  style?: string;
  mood?: string;
  aspectRatio?: string;
}

const EXAMPLE_IDEAS: ExampleIdea[] = [
  {
    label: 'Cyberpunk Tokyo Ramen Bar',
    tool: 'Midjourney',
    type: 'Image Generation',
    prompt: 'A tiny neon-lit ramen stall tucked into a rainy Tokyo alleyway at 3am, steam billowing from simmering broth, rain-slicked cobblestone reflections',
    style: 'Cinematic Photorealism',
    mood: 'Atmospheric & Moody',
    aspectRatio: '16:9',
  },
  {
    label: 'Ceramic Artisan Portrait',
    tool: 'Flux',
    type: 'Image Generation',
    prompt: 'An elderly ceramic artisan shaping raw terracotta on a spinning pottery wheel in a sun-drenched Mediterranean workshop, dust particles dancing in the air',
    style: 'Photorealistic Studio',
    mood: 'Warm & Golden',
    aspectRatio: '3:2',
  },
  {
    label: 'SaaS Hero Copy for Eco-Sneakers',
    tool: 'ChatGPT',
    type: 'Marketing',
    prompt: 'Compelling landing page hero headline, sub-headline, and key value propositions for zero-carbon sneakers made from recycled ocean plastic',
  },
  {
    label: 'FastAPI Microservice with Rate Limiting',
    tool: 'Gemini',
    type: 'Coding',
    prompt: 'An asynchronous Python FastAPI microservice architecture with Redis sliding-window rate limiting, Pydantic v2 schemas, and health checks',
  },
  {
    label: 'Isometric Floating Fantasy Library',
    tool: 'Midjourney',
    type: 'Image Generation',
    prompt: 'A whimsical floating island housing an ancient medieval circular library, spiraling staircases, glowing golden runes, miniature flying book dragons',
    style: '3D Isometric Render',
    mood: 'Ethereal & Dreamy',
    aspectRatio: '1:1',
  },
];

export const PromptBuilderPage: React.FC<PromptBuilderPageProps> = ({ onNavigate, onSendToImprover }) => {
  // ----------------------------------------------------
  // Form State
  // ----------------------------------------------------
  const [coreIdea, setCoreIdea] = useState(
    'A cozy midnight attic artist studio with rain drumming on a skylight, a sleeping tabby cat, warm glowing desk lamp, and shelves of paints'
  );
  const [targetTool, setTargetTool] = useState<TargetAiTool>('Midjourney');
  const [promptType, setPromptType] = useState<PromptType>('Image Generation');

  // Image Generation options
  const [artStyle, setArtStyle] = useState('Cinematic Photorealism');
  const [mood, setMood] = useState('Warm & Golden');
  const [lighting, setLighting] = useState('Studio Softbox & Rim Light');
  const [cameraAngle, setCameraAngle] = useState('Wide-Angle Cinematic Shot');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [negativePrompt, setNegativePrompt] = useState('blurry, oversaturated, deformed hands, extra limbs, low quality watermark, bad anatomy');

  // Text/Writing options
  const [writingTone, setWritingTone] = useState('Conversational & Engaging');
  const [targetAudience, setTargetAudience] = useState('Curious General Audience');
  const [outputFormat, setOutputFormat] = useState('Actionable Narrative with Step-by-Step Breakdown');

  // Coding options
  const [techStack, setTechStack] = useState('TypeScript & React / Node.js');
  const [taskScope, setTaskScope] = useState('Full Implementation with Error Handling & Edge Cases');
  const [codeStyle, setCodeStyle] = useState('Production-grade with Strict Types & Comments');

  // Marketing options
  const [campaignGoal, setCampaignGoal] = useState('Product Launch & High-Converting Engagement');
  const [brandTone, setBrandTone] = useState('Modern, Bold & Trustworthy');
  const [callToAction, setCallToAction] = useState('Start Free Prototyping Today');

  // General purpose options
  const [outputDepth, setOutputDepth] = useState('Comprehensive & Step-by-Step Structure');
  const [reasoningMode, setReasoningMode] = useState('Step-by-step reasoning before final conclusion');

  // Custom constraints & additional details
  const [additionalDetails, setAdditionalDetails] = useState('');

  // ----------------------------------------------------
  // Assembly & Output State
  // ----------------------------------------------------
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isRebuilding, setIsRebuilding] = useState(false);
  const [lastBuildTimestamp, setLastBuildTimestamp] = useState<Date>(new Date());

  // IDs for accessibility
  const coreIdeaId = useId();
  const targetToolId = useId();
  const promptTypeId = useId();
  const artStyleId = useId();
  const moodId = useId();
  const lightingId = useId();
  const cameraAngleId = useId();
  const negativePromptId = useId();
  const writingToneId = useId();
  const targetAudienceId = useId();
  const outputFormatId = useId();
  const techStackId = useId();
  const taskScopeId = useId();
  const codeStyleId = useId();
  const campaignGoalId = useId();
  const brandToneId = useId();
  const callToActionId = useId();
  const outputDepthId = useId();
  const reasoningModeId = useId();
  const additionalDetailsId = useId();

  // ----------------------------------------------------
  // Prompt Assembly Engine
  // ----------------------------------------------------
  const assemblePrompt = (): string => {
    const trimmedIdea = coreIdea.trim() || 'A creative concept';
    const trimmedDetails = additionalDetails.trim();

    if (promptType === 'Image Generation') {
      if (targetTool === 'Midjourney') {
        const parts = [trimmedIdea];
        if (artStyle && artStyle !== 'None / Raw') parts.push(`${artStyle.toLowerCase()} aesthetic`);
        if (lighting) parts.push(`illuminated by ${lighting.toLowerCase()}`);
        if (cameraAngle) parts.push(cameraAngle.toLowerCase());
        if (mood) parts.push(`evoking a ${mood.toLowerCase()} atmosphere`);
        parts.push('subtle micro-textures, 8k resolution, photorealistic depth of field');
        if (trimmedDetails) parts.push(trimmedDetails);

        let finalPrompt = parts.join(', ');
        finalPrompt += ` --ar ${aspectRatio} --v 6.1 --stylize 250 --quality 2`;
        if (negativePrompt.trim()) {
          finalPrompt += ` --no ${negativePrompt.trim()}`;
        }
        return finalPrompt;
      }

      if (targetTool === 'Flux') {
        const parts = [trimmedIdea];
        if (artStyle && artStyle !== 'None / Raw') parts.push(`rendered in ${artStyle.toLowerCase()}`);
        if (cameraAngle) parts.push(cameraAngle.toLowerCase());
        if (lighting) parts.push(lighting.toLowerCase());
        if (mood) parts.push(`mood: ${mood.toLowerCase()}`);
        parts.push('intricate detail, rich dynamic range, crisp optical textures, uncompressed aesthetic');
        if (trimmedDetails) parts.push(trimmedDetails);

        let finalPrompt = parts.join(', ');
        finalPrompt += ` --aspect ${aspectRatio} --raw --steps 30`;
        return finalPrompt;
      }

      if (targetTool === 'DALL·E') {
        const stylePhrase = artStyle && artStyle !== 'None / Raw' ? `Created in a ${artStyle.toLowerCase()} style` : 'Captured in natural realism';
        const lightingPhrase = lighting ? `bathed in ${lighting.toLowerCase()}` : '';
        const cameraPhrase = cameraAngle ? `shot from a ${cameraAngle.toLowerCase()}` : '';
        const moodPhrase = mood ? `The atmosphere feels distinctively ${mood.toLowerCase()}` : '';
        const constraintPhrase = trimmedDetails ? `Key details to preserve: ${trimmedDetails}.` : '';
        const negativePhrase = negativePrompt.trim() ? `Avoid: ${negativePrompt.trim()}.` : '';

        return `${stylePhrase}: ${trimmedIdea}. ${lightingPhrase ? `${lightingPhrase}. ` : ''}${cameraPhrase ? `${cameraPhrase}. ` : ''}${moodPhrase ? `${moodPhrase}. ` : ''}${constraintPhrase} ${negativePhrase} Ensure composition respects a ${aspectRatio} aspect ratio format with ultra-fine textures and crisp natural clarity.`.replace(/\s+/g, ' ').trim();
      }

      // ChatGPT / Gemini / General AI for Image Prompts
      return `Generate a high-fidelity image based on the following specifications:

- Subject: ${trimmedIdea}
- Visual Style: ${artStyle}
- Lighting: ${lighting}
- Perspective / Camera: ${cameraAngle}
- Atmosphere / Mood: ${mood}
- Target Aspect Ratio: ${aspectRatio}
${trimmedDetails ? `- Specific Constraints: ${trimmedDetails}\n` : ''}${negativePrompt.trim() ? `- Negative Constraints (Exclude): ${negativePrompt.trim()}\n` : ''}- Quality Standards: Highly detailed, photorealistic micro-textures, balanced color palette, zero artifacting.`;
    }

    if (promptType === 'Writing') {
      if (targetTool === 'ChatGPT' || targetTool === 'Gemini' || targetTool === 'General AI') {
        return `You are a master creative writer and editor specializing in high-impact prose.

# Task & Core Concept
${trimmedIdea}

# Style & Audience Guidelines
- Tone & Voice: ${writingTone}
- Target Audience: ${targetAudience}
- Expected Format: ${outputFormat}

# Instructions
1. Hook the reader immediately with an evocative opening sentence.
2. Develop the ideas with concrete examples, authentic emotional resonance, and clear transitions.
3. Keep sentence variety dynamic, avoiding cliches, buzzwords, or repetitive phrasing.
${trimmedDetails ? `4. Specific Constraints: ${trimmedDetails}\n` : ''}
Provide a polished, ready-to-publish draft followed by 3 suggested alternative headlines.`;
      }

      return `Draft a comprehensive piece based on: "${trimmedIdea}".
Tone: ${writingTone}
Audience: ${targetAudience}
Format: ${outputFormat}
${trimmedDetails ? `Constraints: ${trimmedDetails}` : ''}`;
    }

    if (promptType === 'Coding') {
      return `You are a Principal Software Engineer and Staff Architect.

# Objective
Implement the following feature:
${trimmedIdea}

# Technical Environment & Constraints
- Tech Stack: ${techStack}
- Scope of Work: ${taskScope}
- Code Quality Standard: ${codeStyle}
${trimmedDetails ? `- Additional Requirements: ${trimmedDetails}\n` : ''}
# Delivery Requirements
1. Provide complete, fully functional, production-ready code. Do NOT use placeholder comments like "// implement here".
2. Include comprehensive TypeScript types, input validation, and defensive error handling.
3. Account for edge cases, performance implications, and asynchronous safety.
4. Provide a brief explanation of architectural decisions and step-by-step instructions for testing.`;
    }

    if (promptType === 'Marketing') {
      return `You are an elite Direct-Response Copywriter and Brand Strategist.

# Campaign Brief
${trimmedIdea}

# Strategy Parameters
- Campaign Objective: ${campaignGoal}
- Brand Voice & Tone: ${brandTone}
- Primary Call to Action: ${callToAction}
${trimmedDetails ? `- Brand Guidelines & Constraints: ${trimmedDetails}\n` : ''}
# Deliverables
1. **Hook / Hero Headlines**: 3 high-converting variations (curiosity, benefit-driven, pain-point).
2. **Body Copy**: Value proposition highlighting customer transformations rather than mere features.
3. **Social Proof & Objections**: Address top 2 common objections seamlessly.
4. **Closing CTA**: Urgent, compelling microcopy driving the target action.`;
    }

    // General Purpose
    return `You are an expert AI advisor and problem-solving partner.

# Request
${trimmedIdea}

# Output Configuration
- Depth & Structure: ${outputDepth}
- Reasoning Approach: ${reasoningMode}
${trimmedDetails ? `- Key Constraints: ${trimmedDetails}\n` : ''}
# Instructions
Analyze the request thoroughly, organize your response with clear markdown headings, bullet points, and actionable takeaways, and highlight any potential pitfalls or counter-intuitive considerations.`;
  };

  // Re-generate prompt whenever options change
  useEffect(() => {
    const assembled = assemblePrompt();
    setGeneratedPrompt(assembled);
    setLastBuildTimestamp(new Date());
  }, [
    coreIdea,
    targetTool,
    promptType,
    artStyle,
    mood,
    lighting,
    cameraAngle,
    aspectRatio,
    negativePrompt,
    writingTone,
    targetAudience,
    outputFormat,
    techStack,
    taskScope,
    codeStyle,
    campaignGoal,
    brandTone,
    callToAction,
    outputDepth,
    reasoningMode,
    additionalDetails,
  ]);

  const handleManualRebuild = () => {
    setIsRebuilding(true);
    setTimeout(() => {
      setGeneratedPrompt(assemblePrompt());
      setIsRebuilding(false);
      setLastBuildTimestamp(new Date());
    }, 280);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = generatedPrompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    }
  };

  const handleClear = () => {
    setCoreIdea('');
    setAdditionalDetails('');
    setNegativePrompt('');
  };

  const handleSelectExample = (ex: ExampleIdea) => {
    setCoreIdea(ex.prompt);
    setTargetTool(ex.tool);
    setPromptType(ex.type);
    if (ex.style) setArtStyle(ex.style);
    if (ex.mood) setMood(ex.mood);
    if (ex.aspectRatio) setAspectRatio(ex.aspectRatio);
  };

  const wordCount = generatedPrompt.trim() ? generatedPrompt.trim().split(/\s+/).length : 0;
  const charCount = generatedPrompt.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E9] text-[#25283D] selection:bg-[#FFD078] selection:text-[#25283D]">
      {/* Top Navigation */}
      <Navbar
        onOpenWorkspace={() => onNavigate('/prompt-builder')}
        onNavigate={onNavigate}
      />

      {/* Main Studio Area */}
      <main className="flex-1 pb-16">
        {/* ========================================================= */}
        {/* 1. STUDIO HEADER WITH BREADCRUMB & BACK BUTTON            */}
        {/* ========================================================= */}
        <section className="relative bg-[#FFD078] border-b-2 border-[#25283D] py-10 sm:py-14 overflow-hidden">
          {/* Subtle background doodles */}
          <div className="absolute top-4 right-8 pointer-events-none hidden sm:block">
            <LoopSwirlDoodle className="w-16 h-10 opacity-70" color="#25283D" />
          </div>
          <div className="absolute bottom-3 left-6 pointer-events-none hidden md:block">
            <StarDoodle size={20} color="#F4774F" />
          </div>

          <div className="max-w-7xl mx-auto px-6">
            {/* Top Row: Back to Home button + Studio Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('/')}
                  className="group inline-flex items-center gap-2 px-4 py-2 bg-[#FFF8E9] hover:bg-white text-xs sm:text-sm font-bold text-[#25283D] rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back to Home</span>
                </button>

                <button
                  onClick={() => onNavigate('/image-to-prompt')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#CFF0E5] hover:bg-[#b5ebd9] text-xs sm:text-sm font-bold text-[#25283D] rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-[#25283D]" />
                  <span>Image to Prompt</span>
                </button>

                <button
                  onClick={() => {
                    if (onSendToImprover) onSendToImprover(generatedPrompt);
                    else onNavigate('/prompt-improver');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FFE8D0] hover:bg-[#ffd6b0] text-xs sm:text-sm font-bold text-[#25283D] rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-[#F4774F]" />
                  <span>Prompt Improver</span>
                </button>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]">
                <span className="w-2 h-2 rounded-full bg-[#55CFC0] animate-pulse" />
                <span className="tracking-wider uppercase font-display">PROMPT BUILDER STUDIO</span>
              </div>
            </div>

            {/* Main Headline & Description */}
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#25283D] tracking-tight leading-[1.15]">
                Turn your ideas into{' '}
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
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#25283D]/90 font-medium leading-relaxed">
                Configure style, lighting, camera angles, or structured reasoning constraints.
                The builder automatically formats production-ready prompts for your selected AI tool.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. TWO-COLUMN WORKSPACE: FORM (LEFT) + OUTPUT (RIGHT)     */}
        {/* ========================================================= */}
        <div className="max-w-7xl mx-auto px-6 pt-10 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ----------------------------------------------------- */}
            {/* LEFT PANEL: BUILD YOUR PROMPT FORM (7 cols)          */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-7 bg-white rounded-3xl border-3 border-[#25283D] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#25283D] space-y-6">
              {/* Panel Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#25283D]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE8D0] border-2 border-[#25283D] flex items-center justify-center text-[#F4774F] shadow-[2px_2px_0px_0px_#25283D]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-display text-[#25283D]">Build your prompt</h2>
                    <p className="text-xs font-semibold text-[#25283D]/70">Configure your parameters and creative intent</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#25283D]/75 hover:text-[#F4774F] bg-[#FFF8E9] hover:bg-[#FFE8D0] rounded-lg border border-[#25283D]/20 transition-colors cursor-pointer"
                  title="Clear inputs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>

              {/* 1. Core Idea / Subject */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={coreIdeaId} className="text-sm font-bold text-[#25283D] flex items-center gap-1.5">
                    <span>Core Idea or Subject</span>
                    <span className="text-[#F4774F] font-bold">*</span>
                  </label>
                  <span className="text-[11px] font-semibold text-[#25283D]/60">Plain English is perfect</span>
                </div>

                <textarea
                  id={coreIdeaId}
                  value={coreIdea}
                  onChange={(e) => setCoreIdea(e.target.value)}
                  rows={3}
                  placeholder="Describe your subject, character, environment, or the question you want answered..."
                  className="w-full px-4 py-3 bg-[#FFF8E9]/50 border-2 border-[#25283D] rounded-2xl text-sm sm:text-base font-medium text-[#25283D] placeholder:text-[#25283D]/40 focus:outline-none focus:ring-2 focus:ring-[#F4774F] focus:bg-white transition-all shadow-[2px_2px_0px_0px_#25283D]"
                />

                {/* Example Quick-Pick Chips */}
                <div className="pt-1">
                  <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-[#25283D]/70">
                    <Sparkles className="w-3.5 h-3.5 text-[#F4774F]" />
                    <span>Try an example idea:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_IDEAS.map((ex, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectExample(ex)}
                        className="px-3 py-1.5 bg-[#FFF8E9] hover:bg-[#FFD078] text-[#25283D] text-xs font-semibold rounded-full border border-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D] active:translate-y-0.5 transition-all cursor-pointer text-left"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2 & 3. Target Tool & Prompt Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Target AI Tool */}
                <div className="space-y-1.5">
                  <label htmlFor={targetToolId} className="text-xs font-bold uppercase tracking-wider text-[#25283D]">
                    Target AI Tool
                  </label>
                  <div className="relative">
                    <select
                      id={targetToolId}
                      value={targetTool}
                      onChange={(e) => setTargetTool(e.target.value as TargetAiTool)}
                      className="w-full appearance-none px-4 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-sm font-bold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                    >
                      <option value="Midjourney">Midjourney (v6.1)</option>
                      <option value="ChatGPT">ChatGPT (GPT-4o)</option>
                      <option value="Gemini">Gemini (2.5 Flash / Pro)</option>
                      <option value="Flux">Flux (Schnell / Dev)</option>
                      <option value="DALL·E">DALL·E 3</option>
                      <option value="General AI">General Purpose AI</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Prompt Type */}
                <div className="space-y-1.5">
                  <label htmlFor={promptTypeId} className="text-xs font-bold uppercase tracking-wider text-[#25283D]">
                    Prompt Type
                  </label>
                  <div className="relative">
                    <select
                      id={promptTypeId}
                      value={promptType}
                      onChange={(e) => setPromptType(e.target.value as PromptType)}
                      className="w-full appearance-none px-4 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-sm font-bold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                    >
                      <option value="Image Generation">Image Generation</option>
                      <option value="Writing">Writing & Copywriting</option>
                      <option value="Coding">Coding & Architecture</option>
                      <option value="Marketing">Marketing & Launch</option>
                      <option value="General Purpose">General Purpose / Analysis</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 4. CONDITIONAL FIELDS ACCORDING TO PROMPT TYPE */}

              {/* A. IMAGE GENERATION CONTROLS */}
              {promptType === 'Image Generation' && (
                <div className="pt-4 border-t-2 border-[#25283D]/10 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25283D]">
                    <span className="w-2 h-2 rounded-full bg-[#55CFC0]" />
                    <span>Visual & Composition Controls</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Art Style */}
                    <div className="space-y-1.5">
                      <label htmlFor={artStyleId} className="text-xs font-bold text-[#25283D]">Art Style</label>
                      <div className="relative">
                        <select
                          id={artStyleId}
                          value={artStyle}
                          onChange={(e) => setArtStyle(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                        >
                          <option value="Cinematic Photorealism">Cinematic Photorealism</option>
                          <option value="Photorealistic Studio">Photorealistic Studio</option>
                          <option value="Minimalist Flat Vector">Minimalist Flat Vector</option>
                          <option value="3D Isometric Render">3D Isometric Render</option>
                          <option value="Digital Concept Art">Digital Concept Art</option>
                          <option value="Watercolor & Ink">Watercolor & Ink</option>
                          <option value="Anime & Studio Ghibli">Anime & Studio Ghibli</option>
                          <option value="Vintage Film 35mm">Vintage Film 35mm</option>
                          <option value="Cyberpunk Neon">Cyberpunk Neon</option>
                          <option value="None / Raw">None / Unstyled</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Mood / Atmosphere */}
                    <div className="space-y-1.5">
                      <label htmlFor={moodId} className="text-xs font-bold text-[#25283D]">Mood & Atmosphere</label>
                      <div className="relative">
                        <select
                          id={moodId}
                          value={mood}
                          onChange={(e) => setMood(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                        >
                          <option value="Warm & Golden">Warm & Golden</option>
                          <option value="Atmospheric & Moody">Atmospheric & Moody</option>
                          <option value="Vibrant & Energetic">Vibrant & Energetic</option>
                          <option value="Ethereal & Dreamy">Ethereal & Dreamy</option>
                          <option value="Dark & Mystical">Dark & Mystical</option>
                          <option value="Serene & Minimalist">Serene & Minimalist</option>
                          <option value="Epic & Heroic">Epic & Heroic</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Lighting */}
                    <div className="space-y-1.5">
                      <label htmlFor={lightingId} className="text-xs font-bold text-[#25283D]">Lighting Setup</label>
                      <div className="relative">
                        <select
                          id={lightingId}
                          value={lighting}
                          onChange={(e) => setLighting(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                        >
                          <option value="Golden Hour Sunlight">Golden Hour Sunlight</option>
                          <option value="Volumetric Cinematic Lighting">Volumetric Cinematic Rays</option>
                          <option value="Studio Softbox & Rim Light">Studio Softbox & Rim Light</option>
                          <option value="Neon Cyberpunk Glow">Neon Cyberpunk Glow</option>
                          <option value="Moody Low-Key Chiaroscuro">Moody Low-Key Chiaroscuro</option>
                          <option value="Diffused Overcast Daylight">Diffused Overcast Daylight</option>
                          <option value="Bioluminescent">Bioluminescent Glow</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Camera Angle */}
                    <div className="space-y-1.5">
                      <label htmlFor={cameraAngleId} className="text-xs font-bold text-[#25283D]">Camera Perspective</label>
                      <div className="relative">
                        <select
                          id={cameraAngleId}
                          value={cameraAngle}
                          onChange={(e) => setCameraAngle(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                        >
                          <option value="Wide-Angle Cinematic Shot">Wide-Angle Cinematic Shot</option>
                          <option value="Eye-Level Portrait">Eye-Level Portrait</option>
                          <option value="Dramatic Low-Angle Hero Shot">Dramatic Low-Angle Hero Shot</option>
                          <option value="Top-Down Isometric Flat Lay">Top-Down Isometric Flat Lay</option>
                          <option value="Extreme Macro Detail">Extreme Macro Detail</option>
                          <option value="Drone Aerial Vista">Drone Aerial Vista</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Aspect Ratio Button Selector */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#25283D] block">
                      Aspect Ratio
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { ratio: '1:1', label: '1:1', desc: 'Square' },
                        { ratio: '4:3', label: '4:3', desc: 'Classic' },
                        { ratio: '3:2', label: '3:2', desc: 'Photo' },
                        { ratio: '16:9', label: '16:9', desc: 'Wide' },
                        { ratio: '9:16', label: '9:16', desc: 'Story' },
                      ].map((item) => (
                        <button
                          key={item.ratio}
                          type="button"
                          onClick={() => setAspectRatio(item.ratio)}
                          className={`py-2 px-2 flex flex-col items-center justify-center rounded-xl border-2 transition-all cursor-pointer ${
                            aspectRatio === item.ratio
                              ? 'bg-[#F4774F] text-white border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] font-bold scale-[1.02]'
                              : 'bg-[#FFF8E9] text-[#25283D] border-[#25283D]/40 hover:border-[#25283D] font-medium'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-bold font-mono">{item.label}</span>
                          <span className="text-[10px] opacity-85 hidden sm:inline">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Negative Prompt */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <label htmlFor={negativePromptId} className="text-xs font-bold text-[#25283D] flex items-center gap-1.5">
                        <span>Negative Prompt (Exclude)</span>
                        <span className="text-[10px] text-[#25283D]/60 font-normal">--no flag</span>
                      </label>
                    </div>
                    <input
                      id={negativePromptId}
                      type="text"
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="e.g. blurry, text, bad hands, low resolution..."
                      className="w-full px-3.5 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm text-[#25283D] placeholder:text-[#25283D]/40 focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D]"
                    />
                  </div>
                </div>
              )}

              {/* B. WRITING CONTROLS */}
              {promptType === 'Writing' && (
                <div className="pt-4 border-t-2 border-[#25283D]/10 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25283D]">
                    <span className="w-2 h-2 rounded-full bg-[#8B7BE8]" />
                    <span>Writing & Editorial Parameters</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor={writingToneId} className="text-xs font-bold text-[#25283D]">Tone of Voice</label>
                      <select
                        id={writingToneId}
                        value={writingTone}
                        onChange={(e) => setWritingTone(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      >
                        <option value="Conversational & Engaging">Conversational & Engaging</option>
                        <option value="Authoritative & Academic">Authoritative & Academic</option>
                        <option value="Storytelling & Evocative">Storytelling & Evocative</option>
                        <option value="Humorous & Witty">Humorous & Witty</option>
                        <option value="Concise & Direct">Concise & Direct</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={targetAudienceId} className="text-xs font-bold text-[#25283D]">Target Audience</label>
                      <select
                        id={targetAudienceId}
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      >
                        <option value="Curious General Audience">Curious General Audience</option>
                        <option value="Industry Executives & Leaders">Industry Executives</option>
                        <option value="Creative Designers & Makers">Creative Designers</option>
                        <option value="Beginners & Students">Beginners & Students</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={outputFormatId} className="text-xs font-bold text-[#25283D]">Output Format</label>
                      <select
                        id={outputFormatId}
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      >
                        <option value="Actionable Narrative with Step-by-Step Breakdown">Step-by-step Narrative</option>
                        <option value="In-depth Longform Article">Longform Article</option>
                        <option value="Bite-sized Bullet Points">Bite-sized Bullets</option>
                        <option value="Executive Briefing">Executive Briefing</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* C. CODING CONTROLS */}
              {promptType === 'Coding' && (
                <div className="pt-4 border-t-2 border-[#25283D]/10 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25283D]">
                    <span className="w-2 h-2 rounded-full bg-[#55CFC0]" />
                    <span>Engineering & Architecture Constraints</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor={techStackId} className="text-xs font-bold text-[#25283D]">Tech Stack</label>
                      <select
                        id={techStackId}
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      >
                        <option value="TypeScript & React / Node.js">TypeScript & React</option>
                        <option value="Python & FastAPI / Celery">Python & FastAPI</option>
                        <option value="Go / Rust Microservices">Go / Rust</option>
                        <option value="PostgreSQL & SQL Drizzle">PostgreSQL / SQL</option>
                        <option value="HTML & Tailwind CSS">Tailwind CSS</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={taskScopeId} className="text-xs font-bold text-[#25283D]">Task Scope</label>
                      <select
                        id={taskScopeId}
                        value={taskScope}
                        onChange={(e) => setTaskScope(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      >
                        <option value="Full Implementation with Error Handling & Edge Cases">Full Implementation</option>
                        <option value="Architecture & Schema Design">Architecture / Schema</option>
                        <option value="Bug Fix & Refactoring">Bug Fix & Refactoring</option>
                        <option value="Unit & Integration Tests">Unit Tests</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={codeStyleId} className="text-xs font-bold text-[#25283D]">Code Strictness</label>
                      <select
                        id={codeStyleId}
                        value={codeStyle}
                        onChange={(e) => setCodeStyle(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      >
                        <option value="Production-grade with Strict Types & Comments">Production Strict Types</option>
                        <option value="Minimal Reproducible Example">Minimal Reproducible</option>
                        <option value="High Performance / Zero-Copy">High Performance</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* D. MARKETING CONTROLS */}
              {promptType === 'Marketing' && (
                <div className="pt-4 border-t-2 border-[#25283D]/10 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25283D]">
                    <span className="w-2 h-2 rounded-full bg-[#F4774F]" />
                    <span>Marketing Campaign & Conversion Strategy</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor={campaignGoalId} className="text-xs font-bold text-[#25283D]">Campaign Goal</label>
                      <select
                        id={campaignGoalId}
                        value={campaignGoal}
                        onChange={(e) => setCampaignGoal(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      >
                        <option value="Product Launch & High-Converting Engagement">Product Launch</option>
                        <option value="Landing Page Conversion Lift">Landing Page</option>
                        <option value="Email Nurture Sequence">Email Sequence</option>
                        <option value="Organic Social Storytelling">Social Storytelling</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={brandToneId} className="text-xs font-bold text-[#25283D]">Brand Voice</label>
                      <select
                        id={brandToneId}
                        value={brandTone}
                        onChange={(e) => setBrandTone(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      >
                        <option value="Modern, Bold & Trustworthy">Modern & Bold</option>
                        <option value="Playful & Irreverent">Playful & Irreverent</option>
                        <option value="Luxury & Exclusive">Luxury & Exclusive</option>
                        <option value="Direct & Urgent">Direct & Urgent</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={callToActionId} className="text-xs font-bold text-[#25283D]">Primary CTA</label>
                      <input
                        id={callToActionId}
                        type="text"
                        value={callToAction}
                        onChange={(e) => setCallToAction(e.target.value)}
                        placeholder="e.g. Claim 14-day free trial"
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* E. GENERAL PURPOSE CONTROLS */}
              {promptType === 'General Purpose' && (
                <div className="pt-4 border-t-2 border-[#25283D]/10 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25283D]">
                    <span className="w-2 h-2 rounded-full bg-[#FFD078]" />
                    <span>Reasoning & Depth Controls</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor={outputDepthId} className="text-xs font-bold text-[#25283D]">Output Depth</label>
                      <select
                        id={outputDepthId}
                        value={outputDepth}
                        onChange={(e) => setOutputDepth(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      >
                        <option value="Comprehensive & Step-by-Step Structure">Comprehensive & Step-by-Step</option>
                        <option value="Executive Summary (Direct, high-level)">Executive Summary</option>
                        <option value="Deep Technical Audit">Deep Technical Audit</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={reasoningModeId} className="text-xs font-bold text-[#25283D]">Reasoning Mode</label>
                      <select
                        id={reasoningModeId}
                        value={reasoningMode}
                        onChange={(e) => setReasoningMode(e.target.value)}
                        className="w-full px-3 py-2 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-semibold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]"
                      >
                        <option value="Step-by-step reasoning before final conclusion">Chain-of-Thought (Step-by-step)</option>
                        <option value="Answer directly, then provide supporting rationale">Direct Answer First</option>
                        <option value="Socratic inquiry and pros/cons analysis">Pros & Cons Evaluation</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Additional details / custom constraints */}
              <div className="pt-2 space-y-1.5">
                <label htmlFor={additionalDetailsId} className="text-xs font-bold uppercase tracking-wider text-[#25283D]">
                  Additional Details & Custom Constraints <span className="font-normal text-[#25283D]/60">(Optional)</span>
                </label>
                <textarea
                  id={additionalDetailsId}
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  rows={2}
                  placeholder="e.g. Include specific brand colors #F4774F, do not use corporate buzzwords, adhere to GDPR principles..."
                  className="w-full px-4 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm text-[#25283D] placeholder:text-[#25283D]/40 focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D]"
                />
              </div>

              {/* Form Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleManualRebuild}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4774F] hover:bg-[#e0663e] active:scale-98 text-white font-bold text-sm rounded-full border-2 border-[#25283D] shadow-[3px_3px_0px_0px_#25283D] transition-all cursor-pointer"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Update Generated Prompt</span>
                </button>

                <div className="text-xs font-semibold text-[#25283D]/70 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#55CFC0]" />
                  <span>Real-time syntax formatted for {targetTool}</span>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------- */}
            {/* RIGHT PANEL: GENERATED PROMPT OUTPUT (5 cols)         */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-5">
              <div className="bg-[#FFE8D0]/50 rounded-3xl border-3 border-[#25283D] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#25283D] flex flex-col space-y-5">
                {/* Panel Top: Label & Live Indicator */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]">
                    <span className="w-2 h-2 rounded-full bg-[#55CFC0] animate-ping" />
                    <span className="tracking-wider uppercase font-display">YOUR GENERATED PROMPT</span>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-[#25283D]/70">
                    {wordCount} words · {charCount} chars
                  </span>
                </div>

                {/* Selected Settings Summary Chips */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFF8E9] border border-[#25283D] text-[11px] font-bold text-[#25283D]">
                    <Terminal className="w-3 h-3 text-[#F4774F]" />
                    <span>{targetTool}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFF8E9] border border-[#25283D] text-[11px] font-bold text-[#25283D]">
                    <Layers className="w-3 h-3 text-[#55CFC0]" />
                    <span>{promptType}</span>
                  </span>
                  {promptType === 'Image Generation' && (
                    <>
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#FFF8E9] border border-[#25283D] text-[11px] font-bold text-[#25283D] font-mono">
                        --ar {aspectRatio}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#FFF8E9] border border-[#25283D] text-[11px] font-bold text-[#25283D] truncate max-w-[120px]">
                        {artStyle}
                      </span>
                    </>
                  )}
                  {promptType === 'Coding' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#FFF8E9] border border-[#25283D] text-[11px] font-bold text-[#25283D] truncate max-w-[140px]">
                      {techStack}
                    </span>
                  )}
                </div>

                {/* Editable Textarea for Prompt */}
                <div className="relative">
                  <textarea
                    value={generatedPrompt}
                    onChange={(e) => setGeneratedPrompt(e.target.value)}
                    rows={12}
                    className="w-full p-4 bg-white border-2 border-[#25283D] rounded-2xl text-xs sm:text-sm font-mono leading-relaxed text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[3px_3px_0px_0px_#25283D] resize-y select-text min-h-[260px] max-h-[440px]"
                    title="You can edit the prompt text directly"
                  />
                  <div className="absolute top-2.5 right-2.5 pointer-events-none">
                    <span className="text-[10px] font-bold text-[#25283D]/40 uppercase tracking-widest bg-white/80 px-1.5 py-0.5 rounded border border-[#25283D]/10">
                      EDITABLE
                    </span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-3 pt-1">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`w-full py-3.5 px-6 rounded-full border-2 border-[#25283D] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_#25283D] active:translate-y-0.5 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-[#55CFC0] text-[#25283D]'
                        : 'bg-[#F4774F] hover:bg-[#e0663e] text-white'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-5 h-5 stroke-[2.5]" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleManualRebuild}
                      disabled={isRebuilding}
                      className="py-2.5 px-4 bg-white hover:bg-[#FFF8E9] text-[#25283D] text-xs font-bold rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] active:translate-y-0.5 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isRebuilding ? 'animate-spin text-[#F4774F]' : ''}`} />
                      <span>Rebuild</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleClear}
                      className="py-2.5 px-4 bg-white hover:bg-[#FFF8E9] text-[#25283D]/80 hover:text-red-600 text-xs font-bold rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] active:translate-y-0.5 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear Form</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSendToImprover) onSendToImprover(generatedPrompt);
                      else onNavigate('/prompt-improver');
                    }}
                    className="w-full py-2.5 px-4 bg-[#8B7BE8] hover:bg-[#7866dc] text-white text-xs sm:text-sm font-bold rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] active:translate-y-0.5 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Send to Prompt Improver</span>
                  </button>
                </div>

                {/* Pro Tips / Syntax Notes */}
                <div className="pt-2 border-t border-[#25283D]/15">
                  <div className="bg-[#FFF8E9] rounded-xl p-3 border border-[#25283D]/20 text-[11px] text-[#25283D]/80 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#F4774F] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#25283D]">Engine Syntax Insight: </span>
                      {targetTool === 'Midjourney' && (
                        <span>Midjourney parameter flags (<code className="font-mono font-bold text-[#25283D]">--ar</code>, <code className="font-mono font-bold text-[#25283D]">--v 6.1</code>, <code className="font-mono font-bold text-[#25283D]">--no</code>) are placed at the end so the model parser processes tokens in the optimal order.</span>
                      )}
                      {targetTool === 'Flux' && (
                        <span>Flux models perform best with natural English descriptors, avoiding keyword comma salads and prioritizing lighting realism.</span>
                      )}
                      {targetTool === 'ChatGPT' && (
                        <span>Markdown headers and structured sections dramatically reduce hallucination in GPT-4o and o-series reasoning models.</span>
                      )}
                      {targetTool === 'Gemini' && (
                        <span>Clear numbered steps and role-definition provide peak steerability with Gemini 2.5 models.</span>
                      )}
                      {targetTool === 'DALL·E' && (
                        <span>DALL·E 3 prefers comprehensive natural sentences rather than comma-separated keywords.</span>
                      )}
                      {targetTool === 'General AI' && (
                        <span>Structured prompt hierarchy ensures maximum compatibility across open-weights models and commercial APIs.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
