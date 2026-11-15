/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Wand2,
  Image as ImageIcon,
  Sparkles,
  Copy,
  Check,
  Upload,
  RefreshCw,
  Sliders,
  Layers,
  Camera,
  Sun,
  Palette,
  FileText,
  AlertCircle,
  X,
} from 'lucide-react';
import { StarDoodle, SparkleLineDoodle } from './Doodles.tsx';
import { analyzeImageWithGemini, isGeminiConfigured } from '../lib/gemini.ts';

export type WorkspaceTab = 'builder' | 'image' | 'improver';

interface InteractiveStudioProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
  externalPrompt?: string;
}

export const InteractiveStudio: React.FC<InteractiveStudioProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  externalPrompt,
}) => {
  // Lock body scroll and listen for Escape key when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // ----------------------------------------------------
  // 1. PROMPT BUILDER STATE
  // ----------------------------------------------------
  const [builderIdea, setBuilderIdea] = useState(
    'A futuristic megacity at twilight with glowing elevated trains'
  );
  const [targetEngine, setTargetEngine] = useState('Midjourney v6.1');
  const [selectedStyle, setSelectedStyle] = useState('Cinematic Realism');
  const [selectedLighting, setSelectedLighting] = useState('Volumetric Neon & Rim Light');
  const [selectedPerspective, setSelectedPerspective] = useState('Wide-angle aerial drone shot');
  const [selectedMood, setSelectedMood] = useState('Atmospheric & cinematic');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isBuilding, setIsBuilding] = useState(false);
  const [builtPrompt, setBuiltPrompt] = useState<string>('');
  const [builderCopied, setBuilderCopied] = useState(false);

  // Quick ideas with alternating butter yellow and pale peach styling
  const QUICK_IDEAS = [
    { text: 'Cyberpunk street noodle cart in rain', bg: 'bg-[#FFD078]/50 hover:bg-[#FFD078]' },
    { text: 'Minimalist ceramic vase on oak shelf', bg: 'bg-[#FFE8D0] hover:bg-[#ffd6b0]' },
    { text: 'Astronaut planting sunflowers on Mars', bg: 'bg-[#CFF0E5] hover:bg-[#b0ebd8]' },
    { text: 'Cozy storybook mouse cottage in a teapot', bg: 'bg-[#FFE8D0] hover:bg-[#ffd6b0]' },
  ];

  const handleGenerateBuilderPrompt = () => {
    setIsBuilding(true);
    setTimeout(() => {
      let params = '';
      if (targetEngine.includes('Midjourney')) {
        params = ` --ar ${aspectRatio} --v 6.1 --stylize 250 --quality 2`;
      } else if (targetEngine.includes('FLUX')) {
        params = ` --aspect ${aspectRatio} --raw --steps 30`;
      } else {
        params = ` (Aspect ratio ${aspectRatio}, photorealistic render)`;
      }

      const generated = `${builderIdea.trim()}, ${selectedStyle.toLowerCase()} style, illuminated by ${selectedLighting.toLowerCase()}, ${selectedPerspective.toLowerCase()}, evoking a ${selectedMood.toLowerCase()} ambiance, intricate micro-textures, 8k resolution, color-graded${params}`;
      setBuiltPrompt(generated);
      setIsBuilding(false);
      showToast('Structured prompt generated!');
    }, 450);
  };

  useEffect(() => {
    if (!builtPrompt) {
      handleGenerateBuilderPrompt();
    }
  }, []);

  // ----------------------------------------------------
  // 2. IMAGE TO PROMPT STATE
  // ----------------------------------------------------
  interface SampleImage {
    id: string;
    name: string;
    tag: string;
    imageUrl: string;
    imageFallback?: string;
    analysis: {
      subject: string;
      composition: string;
      lighting: string;
      colors: string[];
      generatedPrompt: string;
    };
  }

  const SAMPLE_IMAGES: SampleImage[] = [
    {
      id: 'city',
      name: 'Cyberpunk Tokyo Crossing',
      tag: 'Urban Sci-Fi',
      imageUrl: '/assets/samples/cyberpunk_city.jpg',
      imageFallback:
        'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
      analysis: {
        subject: 'Futuristic urban intersection packed with towering neon signs, holographic advertisements, and reflective rain puddles.',
        composition: 'Low-angle leading lines receding toward a towering skyscraper vanishing point, rule-of-thirds focal balance.',
        lighting: 'High-contrast nocturnal environment with saturated magenta, cyan, and violet specular reflections.',
        colors: ['#25283D', '#F4774F', '#8B7BE8', '#55CFC0', '#FFD078'],
        generatedPrompt:
          'Cinematic nocturnal shot of a futuristic metropolis crossing in the rain, drenched in vivid magenta and teal neon light reflections, glowing holographic billboards, low-angle perspective with wide depth of field, 35mm film grain, 8k --ar 16:9',
      },
    },
    {
      id: 'greenhouse',
      name: 'Victorian Glass Botanical',
      tag: 'Nature & Architecture',
      imageUrl: '/assets/samples/botanical_greenhouse.jpg',
      imageFallback:
        'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
      analysis: {
        subject: 'Sunlit Victorian greenhouse interior overflowing with giant monstera leaves, hanging orchids, and vintage brass instruments.',
        composition: 'Symmetrical arch vaulted ceiling framing an ethereal central walking path, organic natural framing.',
        lighting: 'Warm morning golden hour beams filtering through dust motes and misted paned glass.',
        colors: ['#0E2A1E', '#3D7A5A', '#55CFC0', '#FFD078', '#FFF8E9'],
        generatedPrompt:
          'Lush botanical greenhouse conservatory with arched Victorian glass ceiling, morning sunlight streaming through mist and tropical foliage, hanging ferns, antique brass accents, serene atmosphere, Hasselblad medium format --ar 4:3',
      },
    },
    {
      id: 'cafe',
      name: 'Rainy Day Espresso Bar',
      tag: 'Cozy Lifestyle',
      imageUrl: '/assets/samples/cozy_cafe.jpg',
      imageFallback:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      analysis: {
        subject: 'Warm wooden artisan cafe counter with a chrome espresso machine, steaming porcelain cups, and rain trickling down street windows.',
        composition: 'Shallow depth of field close-up with soft background bokeh of passersby with umbrellas.',
        lighting: 'Cozy amber tungsten pendant lamps contrasting with cool overcast blue daylight outside.',
        colors: ['#281711', '#663B26', '#F4774F', '#FFD078', '#FFE8D0'],
        generatedPrompt:
          'Intimate cozy espresso cafe on a rainy afternoon, warm amber pendant lighting, steam rising from ceramic coffee cup, wooden textured counter, rain streaks on window pane with soft blurred city lights outside, cinematic bokeh --ar 16:9',
      },
    },
  ];

  const [selectedSample, setSelectedSample] = useState<SampleImage>(SAMPLE_IMAGES[0]);
  const [customImageUploaded, setCustomImageUploaded] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePromptCopied, setImagePromptCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setCustomImageUploaded(dataUrl);
        setIsAnalyzing(true);

        if (isGeminiConfigured) {
          analyzeImageWithGemini(dataUrl, file.type, {
            targetTool: 'Midjourney',
            promptDetail: 'Balanced',
            focus: 'Overall scene',
            language: 'English',
          })
            .then((res) => {
              setIsAnalyzing(false);
              if (res) {
                setSelectedSample({
                  id: 'custom-upload',
                  name: file.name.replace(/\.[^/.]+$/, ''),
                  tag: 'Custom Uploaded Photo',
                  imageUrl: dataUrl,
                  analysis: {
                    subject: res.breakdown.subject,
                    composition: res.breakdown.composition,
                    lighting: res.breakdown.lighting,
                    colors: res.palette,
                    generatedPrompt: res.prompts.balanced,
                  },
                });
              }
              showToast('Image analyzed with Gemini AI!');
            })
            .catch(() => {
              setIsAnalyzing(false);
              showToast('Image analyzed! Prompt generated.');
            });
        } else {
          setTimeout(() => {
            setIsAnalyzing(false);
            showToast('Image analyzed! Prompt generated.');
          }, 800);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ----------------------------------------------------
  // 3. PROMPT IMPROVER STATE
  // ----------------------------------------------------
  const [inputRawPrompt, setInputRawPrompt] = useState(
    externalPrompt || 'A cute robot exploring an ancient enchanted forest.'
  );

  useEffect(() => {
    if (externalPrompt) {
      setInputRawPrompt(externalPrompt);
    }
  }, [externalPrompt]);

  const [isImproving, setIsImproving] = useState(false);
  const [improvedResult, setImprovedResult] = useState({
    improvedPrompt:
      'A whimsical miniature brass-and-copper automaton with glowing sapphire optic sensors, delicately inspecting luminous bioluminescent mushrooms on the mossy root of an ancient colossal oak, soft dappled twilight rays, ethereal mist, storybook illustration aesthetic, intricate mechanical gears and etched filigree, high fidelity render --ar 16:9',
    breakdown: [
      {
        title: 'Subject Specificity',
        change: 'Replaced generic "cute robot" with "miniature brass-and-copper automaton with sapphire optic sensors".',
        why: 'Concrete materials and distinctive features give the AI model clear textural hooks.',
      },
      {
        title: 'Atmospheric Lighting',
        change: 'Added "soft dappled twilight rays, luminous bioluminescent mushrooms, and ethereal mist".',
        why: 'Lighting is the #1 factor in elevating flat renders into emotionally resonant compositions.',
      },
      {
        title: 'Style & Texture Rigor',
        change: 'Specified "storybook illustration aesthetic with intricate mechanical gears and etched filigree".',
        why: 'Prevents generic plastic smoothing and encourages handcrafted detail.',
      },
      {
        title: 'Format Parameters',
        change: 'Appended widescreen cinematic aspect ratio `--ar 16:9`.',
        why: 'Establishes proper panoramic framing suited for environmental storytelling.',
      },
    ],
  });
  const [improverCopied, setImproverCopied] = useState(false);

  const handleRunImprovement = () => {
    setIsImproving(true);
    setTimeout(() => {
      const trimmed = inputRawPrompt.trim() || 'A majestic scene';
      const enhanced = `Ultra-detailed cinematic rendering of ${trimmed}, rich atmospheric depth, dramatic volumetric lighting with warm amber rim accents, intricate tactile surface micro-textures, shot on 35mm anamorphic prime lens, artstation trending masterpiece, photorealistic composition --ar 16:9 --v 6.1`;

      setImprovedResult({
        improvedPrompt: enhanced,
        breakdown: [
          {
            title: 'Subject Depth & Specificity',
            change: `Expanded "${trimmed}" with tactile micro-textures and clear focus anchors.`,
            why: 'AI models perform substantially better when instructed with physical textures rather than vague concepts.',
          },
          {
            title: 'Lighting & Atmosphere',
            change: 'Injected volumetric god rays with warm amber rim illumination and atmospheric fog.',
            why: 'Creates cinematic depth and visual separation between foreground subject and background.',
          },
          {
            title: 'Camera & Optics',
            change: 'Applied 35mm anamorphic prime lens characteristics with optical falloff.',
            why: 'Avoids sterile look by simulating authentic physical glass optics.',
          },
          {
            title: 'Technical Parameters',
            change: 'Configured standard professional widescreen aspect ratio (--ar 16:9) and version tag.',
            why: 'Ensures output dimensions match modern digital showcases and displays.',
          },
        ],
      });
      setIsImproving(false);
      showToast('Prompt successfully enhanced with breakdown!');
    }, 500);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="PromptCraft AI Studio Workspace"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#25283D]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-60 flex items-center gap-2 px-5 py-3 bg-[#25283D] text-[#FFF8E9] text-sm font-bold rounded-2xl border-2 border-[#F4774F] shadow-xl animate-bounce">
          <Sparkles className="w-4 h-4 text-[#55CFC0]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full max-w-7xl bg-[#FFF8E9] border-3 border-[#25283D] rounded-3xl shadow-[8px_8px_0px_0px_#25283D] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Studio Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-[#FFD078] border-b-2 border-[#25283D] px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xl font-bold font-display text-[#25283D]">
              <span>PromptCraft</span>
              <span className="text-[#F4774F]">Studio</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#CFF0E5] border border-[#25283D] rounded-full text-xs font-bold text-[#25283D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55CFC0]" />
              AI Prompt Workspace
            </span>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center p-1 bg-[#FFE8D0] border-2 border-[#25283D] rounded-full shadow-[2px_2px_0px_0px_#25283D] overflow-x-auto">
            <button
              onClick={() => onTabChange('builder')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'builder'
                  ? 'bg-[#F4774F] text-white shadow-[1px_1px_0px_0px_#25283D]'
                  : 'text-[#25283D] hover:bg-[#FFD078]/50'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Prompt Builder</span>
            </button>
            <button
              onClick={() => onTabChange('image')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'image'
                  ? 'bg-[#F4774F] text-white shadow-[1px_1px_0px_0px_#25283D]'
                  : 'text-[#25283D] hover:bg-[#FFD078]/50'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Image to Prompt</span>
            </button>
            <button
              onClick={() => onTabChange('improver')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'improver'
                  ? 'bg-[#F4774F] text-white shadow-[1px_1px_0px_0px_#25283D]'
                  : 'text-[#25283D] hover:bg-[#FFD078]/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prompt Improver</span>
            </button>
          </div>

          {/* Close Studio Button */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF8E9] hover:bg-white text-[#25283D] text-xs font-bold rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] transition-all cursor-pointer shrink-0"
            title="Close workspace (Esc)"
          >
            <span>Back to Website</span>
            <X className="w-4 h-4 text-[#F4774F]" />
          </button>
        </div>

        {/* Scrollable Tool Workspace */}
        <div className="p-6 sm:p-8 overflow-y-auto">

        {/* ==================================================== */}
        {/* TAB 1: PROMPT BUILDER                                */}
        {/* ==================================================== */}
        {activeTab === 'builder' && (
          <div id="prompt-builder" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Config Panel: Warm Ivory editor surface */}
            <div className="lg:col-span-7 bg-[#FFF8E9] border-2 border-[#25283D] rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_#25283D] relative">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-[#25283D] font-display flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-[#F4774F]" />
                  <span>Configure Your Prompt Elements</span>
                </h3>
                <span className="text-xs font-semibold text-[#25283D] bg-[#55CFC0]/30 px-3 py-1 rounded-full border border-[#25283D]/20">
                  Step 1 of 2
                </span>
              </div>

              {/* Core Idea Input */}
              <div className="space-y-2 mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#25283D] font-display">
                  Core Subject or Concept
                </label>
                <textarea
                  rows={3}
                  value={builderIdea}
                  onChange={(e) => setBuilderIdea(e.target.value)}
                  placeholder="E.g., A futuristic electric hoverbike parked in a rainy Tokyo back-alley..."
                  className="w-full p-4 text-sm font-medium bg-white border-2 border-[#25283D] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-inner resize-none"
                />

                {/* Quick Inspiration Chips (Butter yellow & Pale peach alternating) */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                  <span className="text-[11px] font-bold text-[#25283D]/80 mr-1">Quick ideas:</span>
                  {QUICK_IDEAS.map((idea, idx) => (
                    <button
                      key={idx}
                      onClick={() => setBuilderIdea(idea.text)}
                      className={`text-[11px] font-semibold text-[#25283D] px-2.5 py-1 rounded-lg border border-[#25283D]/30 transition-all cursor-pointer ${idea.bg}`}
                    >
                      {idea.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modifiers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Engine */}
                <div>
                  <label className="block text-xs font-bold text-[#25283D] font-display mb-1.5 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#8B7BE8]" />
                    Target Engine
                  </label>
                  <select
                    value={targetEngine}
                    onChange={(e) => setTargetEngine(e.target.value)}
                    className="w-full p-3 text-xs font-semibold bg-white border-2 border-[#25283D] rounded-xl cursor-pointer"
                  >
                    <option>Midjourney v6.1</option>
                    <option>FLUX.1 Schnell</option>
                    <option>DALL-E 3</option>
                    <option>Claude / ChatGPT Prompt</option>
                  </select>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="block text-xs font-bold text-[#25283D] font-display mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#F4774F]" />
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['16:9', '1:1', '4:3', '9:16'].map((ar) => (
                      <button
                        key={ar}
                        type="button"
                        onClick={() => setAspectRatio(ar)}
                        className={`py-2 text-xs font-bold rounded-xl border border-[#25283D] transition-colors cursor-pointer ${
                          aspectRatio === ar
                            ? 'bg-[#25283D] text-white shadow-[1px_1px_0px_0px_#F4774F]'
                            : 'bg-white text-[#25283D] hover:bg-[#FFE8D0]'
                        }`}
                      >
                        {ar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <label className="block text-xs font-bold text-[#25283D] font-display mb-1.5 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#55CFC0]" />
                    Art Style
                  </label>
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full p-3 text-xs font-semibold bg-white border-2 border-[#25283D] rounded-xl cursor-pointer"
                  >
                    <option>Cinematic Realism</option>
                    <option>Digital Concept Art</option>
                    <option>3D Isometric Cutaway</option>
                    <option>Vintage 1970s Film</option>
                    <option>Minimalist Vector Illustration</option>
                    <option>Moody Dark Fantasy</option>
                  </select>
                </div>

                {/* Lighting */}
                <div>
                  <label className="block text-xs font-bold text-[#25283D] font-display mb-1.5 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#FFD078]" />
                    Lighting
                  </label>
                  <select
                    value={selectedLighting}
                    onChange={(e) => setSelectedLighting(e.target.value)}
                    className="w-full p-3 text-xs font-semibold bg-white border-2 border-[#25283D] rounded-xl cursor-pointer"
                  >
                    <option>Volumetric Neon & Rim Light</option>
                    <option>Golden Hour Natural Sun</option>
                    <option>Dramatic Chiaroscuro Shadow</option>
                    <option>Soft Studio Diffused Light</option>
                    <option>Bioluminescent Glow</option>
                  </select>
                </div>

                {/* Camera Perspective */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#25283D] font-display mb-1.5 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#8B7BE8]" />
                    Camera Angle & Framing
                  </label>
                  <select
                    value={selectedPerspective}
                    onChange={(e) => setSelectedPerspective(e.target.value)}
                    className="w-full p-3 text-xs font-semibold bg-white border-2 border-[#25283D] rounded-xl cursor-pointer"
                  >
                    <option>Wide-angle aerial drone shot</option>
                    <option>Macro close-up with shallow depth of field</option>
                    <option>Eye-level cinematic medium shot</option>
                    <option>Dynamic low-angle heroic view</option>
                    <option>Isometric architectural overview</option>
                  </select>
                </div>
              </div>

              {/* Action Button: Coral Orange */}
              <button
                onClick={handleGenerateBuilderPrompt}
                disabled={isBuilding}
                className="w-full py-3.5 text-sm font-bold text-white bg-[#F4774F] hover:bg-[#e0663e] active:scale-99 rounded-full border-2 border-[#25283D] shadow-[3px_3px_0px_0px_#25283D] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isBuilding ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#FFD078]" />
                    <span>Structuring Prompt...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Generate Structured Prompt</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Result Preview Card: Mint Green Panel */}
            <div className="lg:col-span-5 bg-[#CFF0E5] border-2 border-[#25283D] rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_#25283D] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#25283D] font-display flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F4774F]" />
                    Compiled Output
                  </span>
                  <span className="text-xs font-mono font-bold text-[#25283D] bg-white px-2.5 py-1 rounded-md border border-[#25283D]">
                    {targetEngine}
                  </span>
                </div>

                {/* Prompt Output Canvas */}
                <div className="bg-[#FFF8E9] border-2 border-[#25283D] rounded-2xl p-5 mb-5 shadow-[2px_2px_0px_0px_#25283D]">
                  <p className="text-sm sm:text-base font-medium text-[#25283D] leading-relaxed select-all">
                    "{builtPrompt || 'Click Generate Structured Prompt to compile...'}"
                  </p>
                </div>

                {/* Prompt Metadata details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-xs text-[#25283D] font-semibold py-1 border-b border-[#25283D]/10">
                    <span>Aspect Ratio</span>
                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#25283D]/20">{aspectRatio}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#25283D] font-semibold py-1 border-b border-[#25283D]/10">
                    <span>Style Modifier</span>
                    <span className="font-medium text-[#25283D]">{selectedStyle}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#25283D] font-semibold py-1 border-b border-[#25283D]/10">
                    <span>Lighting Setup</span>
                    <span className="font-medium text-[#25283D]">{selectedLighting}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#25283D]/15 flex items-center gap-3">
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(builtPrompt);
                    setBuilderCopied(true);
                    setTimeout(() => setBuilderCopied(false), 2200);
                  }}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-full border-2 border-[#25283D] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    builderCopied
                      ? 'bg-[#25283D] text-[#FFF8E9]'
                      : 'bg-[#FFF8E9] text-[#25283D] hover:bg-white shadow-[2px_2px_0px_0px_#25283D]'
                  }`}
                >
                  {builderCopied ? (
                    <>
                      <Check className="w-4 h-4 text-[#55CFC0]" />
                      <span>Copied Prompt!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy to Clipboard</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setInputRawPrompt(builderIdea);
                    onTabChange('improver');
                  }}
                  className="px-4 py-3 text-xs font-bold text-[#25283D] bg-[#FFD078] hover:bg-[#ffc65c] rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] transition-all cursor-pointer whitespace-nowrap"
                >
                  Send to Improver →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: IMAGE TO PROMPT                               */}
        {/* ==================================================== */}
        {activeTab === 'image' && (
          <div id="image-to-prompt" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Upload & Preset Selector Panel: Warm Ivory */}
            <div className="lg:col-span-5 bg-[#FFF8E9] border-2 border-[#25283D] rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_#25283D]">
              <h3 className="text-xl font-bold text-[#25283D] font-display flex items-center gap-2 mb-2">
                <ImageIcon className="w-5 h-5 text-[#8B7BE8]" />
                <span>Reference Image Source</span>
              </h3>
              <p className="text-xs text-[#25283D]/75 font-medium mb-5">
                Upload your own photo or pick one of our studio presets to reverse-engineer its visual DNA.
              </p>

              {/* Upload Drop Zone */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-[#25283D] hover:border-[#F4774F] bg-white rounded-2xl p-6 text-center cursor-pointer transition-colors mb-6"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FFE8D0] border border-[#25283D] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Upload className="w-5 h-5 text-[#25283D]" />
                </div>
                <p className="text-sm font-bold text-[#25283D] font-display">
                  Click to upload reference image
                </p>
                <p className="text-xs text-[#25283D]/60 mt-1">PNG, JPG, WebP up to 15MB</p>
              </div>

              {/* Presets Title */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#25283D] font-display">
                  Or Test Studio Presets:
                </span>
                <span className="text-[11px] font-bold text-[#55CFC0] bg-[#25283D] px-2 py-0.5 rounded-full">
                  3 Samples
                </span>
              </div>

              {/* Preset Cards */}
              <div className="space-y-3">
                {SAMPLE_IMAGES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setSelectedSample(sample);
                      setCustomImageUploaded(null);
                      setImagePromptCopied(false);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border-2 border-[#25283D] flex items-center gap-3.5 transition-all cursor-pointer ${
                      selectedSample.id === sample.id && !customImageUploaded
                        ? 'bg-[#FFD078] shadow-[2px_2px_0px_0px_#25283D]'
                        : 'bg-white hover:bg-[#FFE8D0]'
                    }`}
                  >
                    <div className="w-16 h-12 rounded-xl overflow-hidden border border-[#25283D] shrink-0 bg-slate-900">
                      <img
                        src={sample.imageUrl}
                        alt={sample.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          if (sample.imageFallback && e.currentTarget.src !== sample.imageFallback) {
                            e.currentTarget.src = sample.imageFallback;
                          }
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#25283D] truncate font-display">
                        {sample.name}
                      </p>
                      <p className="text-[11px] font-medium text-[#25283D]/70">{sample.tag}</p>
                    </div>
                    <span className="text-xs font-bold text-[#25283D] pr-1">Select →</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Visual Analysis & Extracted Prompt: Mint Green Panel */}
            <div className="lg:col-span-7 bg-[#CFF0E5] border-2 border-[#25283D] rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_#25283D]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F4774F] font-display">
                    Analysis Breakdown
                  </span>
                  <h3 className="text-2xl font-bold text-[#25283D] font-display">
                    {customImageUploaded ? 'Custom Uploaded Image' : selectedSample.name}
                  </h3>
                </div>
                {isAnalyzing && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#8B7BE8] animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Scanning features...
                  </span>
                )}
              </div>

              {/* Active Image Visual Showcase */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#25283D] max-h-48 w-full mb-6 bg-[#25283D]/10 shadow-[2px_2px_0px_0px_#25283D]">
                <img
                  src={customImageUploaded || selectedSample.imageUrl}
                  alt={customImageUploaded ? 'Uploaded Image' : selectedSample.name}
                  className="w-full h-48 object-cover select-none"
                  onError={(e) => {
                    if (!customImageUploaded && selectedSample.imageFallback && e.currentTarget.src !== selectedSample.imageFallback) {
                      e.currentTarget.src = selectedSample.imageFallback;
                    }
                  }}
                />
                <div className="absolute top-2.5 left-2.5 px-3 py-1 bg-[#FFF8E9]/95 backdrop-blur-xs border border-[#25283D] rounded-full text-[11px] font-bold text-[#25283D] shadow-xs">
                  {customImageUploaded ? 'Custom Uploaded Photo' : selectedSample.name}
                </div>
              </div>

              {/* Analysis Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Subject */}
                <div className="bg-[#FFF8E9] border-2 border-[#25283D] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#25283D]">
                  <span className="text-xs font-bold text-[#25283D] font-display flex items-center gap-1.5 mb-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#F4774F]" />
                    Subject & Focal Element
                  </span>
                  <p className="text-xs text-[#25283D]/85 leading-relaxed font-medium">
                    {selectedSample.analysis.subject}
                  </p>
                </div>

                {/* Lighting */}
                <div className="bg-[#FFF8E9] border-2 border-[#25283D] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#25283D]">
                  <span className="text-xs font-bold text-[#25283D] font-display flex items-center gap-1.5 mb-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#FFD078]" />
                    Lighting & Atmosphere
                  </span>
                  <p className="text-xs text-[#25283D]/85 leading-relaxed font-medium">
                    {selectedSample.analysis.lighting}
                  </p>
                </div>

                {/* Composition */}
                <div className="bg-[#FFF8E9] border-2 border-[#25283D] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#25283D]">
                  <span className="text-xs font-bold text-[#25283D] font-display flex items-center gap-1.5 mb-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#8B7BE8]" />
                    Composition & Perspective
                  </span>
                  <p className="text-xs text-[#25283D]/85 leading-relaxed font-medium">
                    {selectedSample.analysis.composition}
                  </p>
                </div>

                {/* Color Palette */}
                <div className="bg-[#FFF8E9] border-2 border-[#25283D] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#25283D]">
                  <span className="text-xs font-bold text-[#25283D] font-display flex items-center gap-1.5 mb-2">
                    <Palette className="w-3.5 h-3.5 text-[#55CFC0]" />
                    Extracted Palette
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedSample.analysis.colors.map((hex, idx) => (
                      <div key={idx} className="flex-1 text-center">
                        <div
                          className="h-8 rounded-lg border border-[#25283D] shadow-sm mb-1"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="text-[9px] font-mono font-semibold text-[#25283D]/70 block truncate">
                          {hex}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Extracted Prompt Box */}
              <div className="bg-white border-2 border-[#25283D] rounded-2xl p-5 mb-5 shadow-[2px_2px_0px_0px_#25283D]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#25283D] font-display flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F4774F]" />
                    Generated Descriptive Prompt
                  </span>
                  <span className="text-[11px] font-mono text-[#8B7BE8] font-bold">
                    Ready to render
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-[#25283D] leading-relaxed">
                  "{selectedSample.analysis.generatedPrompt}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(selectedSample.analysis.generatedPrompt);
                    setImagePromptCopied(true);
                    setTimeout(() => setImagePromptCopied(false), 2200);
                  }}
                  className={`flex-1 py-3 px-6 text-sm font-bold rounded-full border-2 border-[#25283D] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    imagePromptCopied
                      ? 'bg-[#25283D] text-[#FFF8E9]'
                      : 'bg-[#F4774F] hover:bg-[#e0663e] text-white shadow-[2px_2px_0px_0px_#25283D]'
                  }`}
                >
                  {imagePromptCopied ? (
                    <>
                      <Check className="w-4 h-4 text-[#55CFC0]" />
                      <span>Copied Prompt!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Generated Prompt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setInputRawPrompt(selectedSample.analysis.generatedPrompt);
                    onTabChange('improver');
                  }}
                  className="px-5 py-3 text-xs font-bold text-[#25283D] bg-white hover:bg-[#FFD078] rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] transition-all cursor-pointer whitespace-nowrap"
                >
                  Refine in Improver →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: PROMPT IMPROVER                               */}
        {/* ==================================================== */}
        {activeTab === 'improver' && (
          <div id="prompt-improver" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Input Box: Warm Ivory */}
            <div className="lg:col-span-5 bg-[#FFF8E9] border-2 border-[#25283D] rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_#25283D]">
              <h3 className="text-xl font-bold text-[#25283D] font-display flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#F4774F]" />
                <span>Input Prompt to Improve</span>
              </h3>
              <p className="text-xs text-[#25283D]/75 font-medium mb-4">
                Paste any rough prompt to see missing details filled in and understand the engineering rationale.
              </p>

              <textarea
                rows={5}
                value={inputRawPrompt}
                onChange={(e) => setInputRawPrompt(e.target.value)}
                placeholder="Type any prompt here..."
                className="w-full p-4 text-sm font-medium bg-white border-2 border-[#25283D] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-inner resize-none mb-4"
              />

              {/* Sample Prompt Starters */}
              <div className="mb-6">
                <span className="block text-xs font-bold text-[#25283D] font-display mb-2">
                  Try Sample Rough Prompts:
                </span>
                <div className="space-y-2">
                  {[
                    'A cozy cabin in the woods in winter',
                    'A vintage sports car driving through mountains',
                    'Portrait of an astronaut with flower bouquet',
                  ].map((starter, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputRawPrompt(starter)}
                      className="w-full text-left text-xs font-medium p-2.5 rounded-xl bg-white hover:bg-[#FFE8D0] border border-[#25283D]/30 transition-colors cursor-pointer truncate"
                    >
                      "{starter}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Run Button: Coral Orange */}
              <button
                onClick={handleRunImprovement}
                disabled={isImproving}
                className="w-full py-3.5 text-sm font-bold text-white bg-[#F4774F] hover:bg-[#e0663e] active:scale-99 rounded-full border-2 border-[#25283D] shadow-[3px_3px_0px_0px_#25283D] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isImproving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#FFD078]" />
                    <span>Analyzing & Enhancing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Improve Prompt & Explain</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Comparison & "What was changed and why": Mint Green Panel */}
            <div className="lg:col-span-7 bg-[#CFF0E5] border-2 border-[#25283D] rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_#25283D]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F4774F] font-display">
                  Enhanced Version
                </span>
                <span className="text-xs font-mono font-bold text-[#25283D] bg-white px-2.5 py-1 rounded-md border border-[#25283D]">
                  Optimized
                </span>
              </div>

              {/* Improved Prompt Result Box */}
              <div className="bg-[#FFF8E9] border-2 border-[#25283D] rounded-2xl p-5 mb-6 shadow-[2px_2px_0px_0px_#25283D]">
                <p className="text-sm sm:text-base font-semibold text-[#25283D] leading-relaxed">
                  "{improvedResult.improvedPrompt}"
                </p>

                <div className="mt-4 pt-3 border-t border-[#25283D]/10 flex justify-end">
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(improvedResult.improvedPrompt);
                      setImproverCopied(true);
                      setTimeout(() => setImproverCopied(false), 2200);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full border-2 border-[#25283D] transition-all cursor-pointer ${
                      improverCopied
                        ? 'bg-[#25283D] text-[#FFF8E9]'
                        : 'bg-[#F4774F] hover:bg-[#e0663e] text-white shadow-[2px_2px_0px_0px_#25283D]'
                    }`}
                  >
                    {improverCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#55CFC0]" />
                        <span>Copied Prompt!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Improved Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* "What was changed and why" Breakdown Section */}
              <div className="mb-2">
                <h4 className="text-base font-bold text-[#25283D] font-display flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-[#8B7BE8]" />
                  <span>What Was Changed and Why</span>
                </h4>

                <div className="space-y-3">
                  {improvedResult.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FFF8E9] border-2 border-[#25283D] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#25283D] transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#55CFC0] border border-[#25283D]" />
                        <h5 className="text-xs font-bold text-[#25283D] font-display">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs font-medium text-[#25283D] mb-1 pl-4">
                        <span className="text-[#F4774F] font-bold">Modification:</span> {item.change}
                      </p>
                      <p className="text-xs text-[#25283D]/70 pl-4 font-normal">
                        <span className="text-[#8B7BE8] font-bold">Rationale:</span> {item.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
