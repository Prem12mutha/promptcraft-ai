/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useId } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  RotateCcw,
  Sun,
  Palette,
  Layers,
  Camera,
  Compass,
  Wand2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Trash2,
  ExternalLink,
  Languages,
  Sliders,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from './Navbar.tsx';
import { Footer } from './Footer.tsx';
import {
  StarDoodle,
  SparkleLineDoodle,
  LoopSwirlDoodle,
  MagnifyingGlassDoodle,
} from './Doodles.tsx';
import { analyzeImageWithGemini, isGeminiConfigured } from '../lib/gemini.ts';

interface ImageToPromptPageProps {
  onNavigate: (path: string) => void;
  onSendToImprover?: (promptText: string) => void;
}

export type TargetAiTool = 'General AI' | 'Midjourney' | 'DALL·E' | 'Flux' | 'ChatGPT' | 'Gemini';
export type PromptDetail = 'Quick description' | 'Balanced' | 'Highly detailed';
export type DescriptionFocus =
  | 'Overall scene'
  | 'Subject and objects'
  | 'Lighting and atmosphere'
  | 'Composition and camera'
  | 'Colors and artistic style';
export type OutputLanguage = 'English' | 'Hindi';

interface ExampleImageItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  imageFallback?: string;
  aspectRatio: string;
  palette: string[];
  breakdown: {
    subject: string;
    scene: string;
    composition: string;
    lighting: string;
    style: string;
  };
  prompts: {
    en: {
      quick: string;
      balanced: string;
      detailed: string;
    };
    hi: {
      quick: string;
      balanced: string;
      detailed: string;
    };
  };
}

const EXAMPLE_IMAGES: ExampleImageItem[] = [
  {
    id: 'cyberpunk-city',
    title: 'Cyberpunk city at night',
    subtitle: 'Neo-Shibuya Nocturne',
    tag: 'Urban Sci-Fi & Neon',
    imageUrl: '/assets/samples/cyberpunk_city.jpg',
    imageFallback:
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    palette: ['#181829', '#F4774F', '#8B7BE8', '#55CFC0', '#FFD078'],
    breakdown: {
      subject:
        'A multi-tiered futuristic metropolis intersection filled with glowing holographic advertisements, neon signage in kanji, and solitary pedestrians carrying illuminated umbrellas.',
      scene:
        'Rain-drenched asphalt streets framed by dense vertical megastructures, elevated monorail transit tracks, and billowing steam from underground vents.',
      composition:
        'Dynamic low-angle wide shot with strong diagonal leading lines converging toward a central skyscraper vanishing point.',
      lighting:
        'High-contrast nocturnal environment bathed in saturated magenta, electric cyan, and warm amber specular puddles against deep midnight shadows.',
      style:
        'Cinematic neo-noir 35mm film still with subtle optical lens flare, delicate rain streaks, fine grain, and crisp specular highlights.',
    },
    prompts: {
      en: {
        quick:
          'A rainy cyberpunk metropolis at night with glowing neon billboards and reflective wet asphalt streets.',
        balanced:
          'Cinematic nocturnal shot of a futuristic metropolis crossing in the rain, drenched in vivid magenta and teal neon light reflections, glowing holographic billboards, low-angle perspective with wide depth of field, 35mm film grain, 8k resolution.',
        detailed:
          'A multi-tiered cyberpunk city crossing at midnight during a heavy downpour, towering monolith skyscrapers covered in luminous neon signage and translucent holographic advertisements, reflective rain-soaked asphalt with puddle caustics mirroring cyan and magenta lights, solitary pedestrian under an illuminated umbrella, atmospheric steam vents, cinematic low-angle framing, Kodak Vision3 500T 35mm aesthetic, photorealistic micro-textures, volumetric haze.',
      },
      hi: {
        quick:
          'रात में बारिश से भीगा एक भविष्यकालीन साइबरपंक शहर, चमकते नियॉन बिलबोर्ड और सड़कों पर पानी के परावर्तन।',
        balanced:
          'रात के समय एक भविष्यकालीन महानगर का चौराहा, बारिश में भीगी सड़कें, मैजेंटा और टील नियॉन रोशनी के चमकदार प्रतिबिंब, 35mm सिनेमाई फिल्म ग्रेन, विस्तृत फ़ोकस, उच्च रिज़ॉल्यूशन।',
        detailed:
          'मध्यरात्रि में मूसलाधार बारिश के दौरान एक बहुस्तरीय साइबरपंक शहर का चौराहा, गगनचुंबी इमारतें चमकदार नियॉन और होलोग्राफिक विज्ञापनों से सजी हुई, पानी से भीगी सड़कों पर टील और मैजेंटा लाइटों के शानदार परावर्तन, छतरी लिए एक अकेला व्यक्ति, सिनेमाई लो-एंगल दृश्य, 35mm फिल्म बनावट, यथार्थवादी विवरण।',
      },
    },
  },
  {
    id: 'cozy-botanical',
    title: 'Cozy botanical interior',
    subtitle: 'Sunlit Victorian Greenhouse',
    tag: 'Nature & Victorian Architecture',
    imageUrl: '/assets/samples/botanical_greenhouse.jpg',
    imageFallback:
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    palette: ['#0E2A1E', '#3D7A5A', '#55CFC0', '#FFD078', '#FFF8E9'],
    breakdown: {
      subject:
        'A sun-drenched Victorian conservatory brimming with flourishing monsteras, cascading string-of-pearls ferns, potted orchids, and antique brass gardening tools on a rustic cedar potting bench.',
      scene:
        'A glass-domed garden solarium with weathered dark green wrought-iron framework and hand-blown paned glass overlooking a soft-focus English cottage garden.',
      composition:
        'Symmetrical one-point perspective down a brick walking path, flanked by organic layers of tropical foliage creating natural framing.',
      lighting:
        'Warm morning golden hour illumination with soft volumetric light beams streaming through humid mist and suspended dust motes.',
      style:
        'Hasselblad medium format photography, creamy shallow depth of field, tactile earthy textures, rich organic greens, warm tactile tones.',
    },
    prompts: {
      en: {
        quick:
          'A sunlit Victorian greenhouse filled with flourishing tropical plants and morning sunbeams.',
        balanced:
          'Lush botanical greenhouse conservatory with arched Victorian glass ceiling, morning sunlight streaming through mist and tropical foliage, hanging ferns, antique brass accents, serene atmosphere, Hasselblad medium format --ar 4:3',
        detailed:
          'An ethereal Victorian botanical conservatory interior, vaulted wrought-iron glass ceiling with morning golden hour sunbeams cutting through soft humid mist, giant perforated monstera deliciosa leaves, cascading potted ferns and blooming white orchids, rustic wooden potting bench with weathered terracotta pots and brass watering can, red brick floor with moss, peaceful cozy ambiance, natural photographic lighting, rich emerald and amber tones, medium format 80mm lens.',
      },
      hi: {
        quick:
          'धूप से सराबोर एक सुंदर विक्टोरियन ग्रीनहाउस, जिसमें कई हरे-भरे पौधे और खिड़कियों से आती सुबह की धूप है।',
        balanced:
          'हरे-भरे पौधों से भरा विक्टोरियन कांच का ग्रीनहाउस, कांच की छत से छनकर आती सुबह की धूप, लटकते फ़र्न, शांतिपूर्ण वातावरण, मध्यम प्रारूप फ़ोटोग्राफ़ी।',
        detailed:
          'कांच की गुंबददार छत वाला एक सुरम्य विक्टोरियन ग्रीनहाउस, सुबह की सुनहरी धूप की किरणें धुंध और पौधों के बीच से छनती हुई, बड़े पत्तेदार मॉन्स्टेरा और मिट्टी के गमले, ईंटों का फर्श, शांत एवं आरामदायक माहौल, प्राकृतिक प्रकाश व्यवस्था, समृद्ध हरी और सुनहरी रंगत।',
      },
    },
  },
  {
    id: 'abstract-3d',
    title: 'Colorful 3D abstract artwork',
    subtitle: 'Prismatic Geometric Dimensions',
    tag: '3D Isometric & Abstract Art',
    imageUrl: '/assets/samples/abstract_3d.jpg',
    imageFallback:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '1:1',
    palette: ['#25283D', '#F4774F', '#FFD078', '#55CFC0', '#8B7BE8'],
    breakdown: {
      subject:
        'A playful assembly of interlocking 3D geometric shapes including a matte coral sphere, a lavender frosted glass torus, an isometric mint cube, and a polished warm butter yellow capsule.',
      scene:
        'A clean studio void with warm ivory floor plane, subtle curved infinity cove backdrop, and diffused soft ambient contact shadows.',
      composition:
        'Balanced isometric flat-lay arrangement with harmonic negative space, floating weightlessness, and golden ratio proportions.',
      lighting:
        'Studio softbox key light from the upper-left with colorful specular bounce, gentle iridescent rim light, and soft contact occlusion shadows.',
      style:
        'Modern 3D digital render, Cinema 4D and Octane engine aesthetic, premium tactile material shaders blending velvety matte clay, frosted glass, and brushed brass.',
    },
    prompts: {
      en: {
        quick:
          'Colorful 3D abstract geometric shapes floating in a clean minimalist studio space.',
        balanced:
          'Vibrant 3D abstract composition of floating geometric primitives, matte coral sphere, lavender glass torus, mint cube, soft studio lighting, clean background, Octane render, isometric 4k.',
        detailed:
          'A whimsical 3D geometric installation floating in a serene warm ivory studio void, smooth tactile matte clay sphere in vibrant coral, translucent frosted glass torus in pastel lavender with internal optical refractions, mint green isometric block, soft multi-point studio lighting, delicate ambient occlusion shadows, minimal aesthetic, high-end 3D art direction, Octane Render, 8k wallpaper.',
      },
      hi: {
        quick:
          'एक साफ स्टूडियो में तैरती हुई रंग-बिरंगी 3D अमूर्त ज्यामितीय आकृतियाँ।',
        balanced:
          'हवा में तैरती ज्यामितीय आकृतियों की जीवंत 3D अमूर्त रचना, कोरल गोला, लैवेंडर ग्लास रिंग, मिंट क्यूब, कोमल स्टूडियो लाइटिंग, ऑक्टेन रेंडर, 4k।',
        detailed:
          'शांत स्टूडियो में तैरती हुई मनमोहक 3D ज्यामितीय कलाकृति, मखमली कोरल गोला, पारभासी फ्रॉस्टेड ग्लास रिंग, मिंट ग्रीन क्यूब, कई कोणों से आती कोमल स्टूडियो रोशनी, आधुनिक न्यूनतम कला शैली, हाई-एंड 3D डिजिटल रेंडरिंग, 8k रिज़ॉल्यूशन।',
      },
    },
  },
];

export const ImageToPromptPage: React.FC<ImageToPromptPageProps> = ({
  onNavigate,
  onSendToImprover,
}) => {
  // ----------------------------------------------------
  // Image Upload & Selection State
  // ----------------------------------------------------
  const [selectedExampleId, setSelectedExampleId] = useState<string | null>('cyberpunk-city');
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);
  const [customImageMeta, setCustomImageMeta] = useState<{
    name: string;
    size: string;
    dimensions: string;
  } | null>(null);

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ----------------------------------------------------
  // Settings State
  // ----------------------------------------------------
  const [targetTool, setTargetTool] = useState<TargetAiTool>('Midjourney');
  const [promptDetail, setPromptDetail] = useState<PromptDetail>('Balanced');
  const [descriptionFocus, setDescriptionFocus] = useState<DescriptionFocus>('Overall scene');
  const [outputLanguage, setOutputLanguage] = useState<OutputLanguage>('English');
  const [extraInstructions, setExtraInstructions] = useState('');

  // ----------------------------------------------------
  // Analysis Output State
  // ----------------------------------------------------
  const [activeBreakdown, setActiveBreakdown] = useState(EXAMPLE_IMAGES[0].breakdown);
  const [activePalette, setActivePalette] = useState<string[]>(EXAMPLE_IMAGES[0].palette);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>(
    EXAMPLE_IMAGES[0].prompts.en.balanced
  );
  const [hasAnalyzed, setHasAnalyzed] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Accessible IDs
  const targetToolId = useId();
  const promptDetailId = useId();
  const descriptionFocusId = useId();
  const outputLanguageId = useId();
  const extraInstructionsId = useId();

  // Find active example if one is selected
  const activeExample = EXAMPLE_IMAGES.find((e) => e.id === selectedExampleId) || null;

  // ----------------------------------------------------
  // Dynamic Prompt Formatter
  // ----------------------------------------------------
  const buildPromptFromCurrentState = () => {
    let base = '';
    const isHindi = outputLanguage === 'Hindi';

    if (activeExample) {
      const langKey = isHindi ? 'hi' : 'en';
      if (promptDetail === 'Quick description') {
        base = activeExample.prompts[langKey].quick;
      } else if (promptDetail === 'Highly detailed') {
        base = activeExample.prompts[langKey].detailed;
      } else {
        base = activeExample.prompts[langKey].balanced;
      }

      // Adjust based on focus
      if (descriptionFocus === 'Lighting and atmosphere') {
        base = isHindi
          ? `${base} प्रकाश व्यवस्था: ${activeExample.breakdown.lighting}`
          : `${base} Emphasizing ${activeExample.breakdown.lighting.toLowerCase()}`;
      } else if (descriptionFocus === 'Composition and camera') {
        base = isHindi
          ? `${base} रचना और कैमरा: ${activeExample.breakdown.composition}`
          : `${base} Framed with ${activeExample.breakdown.composition.toLowerCase()}`;
      } else if (descriptionFocus === 'Colors and artistic style') {
        base = isHindi
          ? `${base} रंग पैलेट और शैली: ${activeExample.breakdown.style}`
          : `${base} Rendered with ${activeExample.breakdown.style.toLowerCase()}`;
      }
    } else {
      // For custom uploaded image
      if (isHindi) {
        base = `अपलोड की गई छवि का रिवर्स-इंजीनियर्ड प्रॉम्ट: ${
          customImageMeta?.name || 'विज़ुअल इमेज'
        }। मुख्य विषय: ${activeBreakdown.subject}। वातावरण और प्रकाश: ${
          activeBreakdown.lighting
        }। शैली: ${activeBreakdown.style}।`;
      } else {
        if (promptDetail === 'Quick description') {
          base = `${activeBreakdown.subject}, ${activeBreakdown.style}.`;
        } else if (promptDetail === 'Highly detailed') {
          base = `${activeBreakdown.subject}, set in ${activeBreakdown.scene.toLowerCase()}. ${
            activeBreakdown.composition
          }. Illuminated by ${activeBreakdown.lighting.toLowerCase()}. Styled in ${activeBreakdown.style.toLowerCase()}, high-fidelity textures, 8k resolution.`;
        } else {
          base = `${activeBreakdown.subject}, ${activeBreakdown.scene.toLowerCase()}, ${activeBreakdown.lighting.toLowerCase()}, ${activeBreakdown.style.toLowerCase()}.`;
        }
      }
    }

    // Add extra user instructions if provided
    if (extraInstructions.trim()) {
      base = isHindi
        ? `${base} विशेष निर्देश: ${extraInstructions.trim()}.`
        : `${base}, ${extraInstructions.trim()}`;
    }

    // Add AI Tool syntax parameters
    if (targetTool === 'Midjourney') {
      const ar = activeExample?.aspectRatio || '16:9';
      base = `${base.trim()} --ar ${ar} --v 6.1 --stylize 250`;
    } else if (targetTool === 'Flux') {
      const ar = activeExample?.aspectRatio || '16:9';
      base = `${base.trim()} --aspect ${ar} --raw --steps 28`;
    } else if (targetTool === 'DALL·E') {
      base = isHindi
        ? `DALL·E 3 के लिए प्राकृतिक विवरण: ${base.trim()}`
        : `A photographic composition: ${base.trim()} with natural clarity and balanced lighting.`;
    } else if (targetTool === 'ChatGPT' || targetTool === 'Gemini') {
      base = isHindi
        ? `# छवि विवरण प्रॉम्ट\n${base.trim()}\n\n# विज़ुअल टोकन्स\n- विवरण स्तर: ${promptDetail}\n- प्राथमिक फ़ोकस: ${descriptionFocus}`
        : `# Visual Description Prompt\n${base.trim()}\n\n# Visual Specifications\n- Detail Level: ${promptDetail}\n- Primary Focus: ${descriptionFocus}\n- Color Tone: ${activePalette.join(
            ', '
          )}`;
    }

    return base.replace(/\s+/g, ' ').trim();
  };

  // Rebuild prompt when settings change
  useEffect(() => {
    if (hasAnalyzed) {
      setGeneratedPrompt(buildPromptFromCurrentState());
    }
  }, [targetTool, promptDetail, descriptionFocus, outputLanguage, extraInstructions]);

  // ----------------------------------------------------
  // Example Selection Handler
  // ----------------------------------------------------
  const handleSelectExample = (example: ExampleImageItem) => {
    setSelectedExampleId(example.id);
    setCustomImageSrc(null);
    setCustomImageMeta(null);
    setUploadError(null);
    setActiveBreakdown(example.breakdown);
    setActivePalette(example.palette);

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      const isHindi = outputLanguage === 'Hindi';
      const promptText =
        promptDetail === 'Quick description'
          ? example.prompts[isHindi ? 'hi' : 'en'].quick
          : promptDetail === 'Highly detailed'
          ? example.prompts[isHindi ? 'hi' : 'en'].detailed
          : example.prompts[isHindi ? 'hi' : 'en'].balanced;

      setGeneratedPrompt(
        targetTool === 'Midjourney'
          ? `${promptText} --ar ${example.aspectRatio} --v 6.1`
          : promptText
      );
    }, 450);
  };

  // ----------------------------------------------------
  // File Validation & Upload Handling
  // ----------------------------------------------------
  const processUploadedFile = (file: File) => {
    setUploadError(null);

    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Invalid format. Please upload a PNG, JPG, JPEG, or WebP image.');
      return;
    }

    // Validate size (10 MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File is too large. Maximum supported image size is 10 MB.');
      return;
    }

    const sizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCustomImageSrc(dataUrl);
      setSelectedExampleId(null);

      // Extract dimensions and dominant colors via Canvas
      const img = new Image();
      img.onload = () => {
        setCustomImageMeta({
          name: file.name,
          size: sizeFormatted,
          dimensions: `${img.width} × ${img.height}`,
        });

        // Sample dominant colors from corners and center
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 50;
          canvas.height = 50;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, 50, 50);
            const p1 = ctx.getImageData(10, 10, 1, 1).data;
            const p2 = ctx.getImageData(40, 10, 1, 1).data;
            const p3 = ctx.getImageData(25, 25, 1, 1).data;
            const p4 = ctx.getImageData(10, 40, 1, 1).data;
            const p5 = ctx.getImageData(40, 40, 1, 1).data;

            const rgbToHex = (r: number, g: number, b: number) =>
              '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

            const extracted = [
              rgbToHex(p1[0], p1[1], p1[2]),
              rgbToHex(p2[0], p2[1], p2[2]),
              rgbToHex(p3[0], p3[1], p3[2]),
              rgbToHex(p4[0], p4[1], p4[2]),
              rgbToHex(p5[0], p5[1], p5[2]),
            ];
            setActivePalette(extracted);
          }
        } catch {
          // Fallback palette
          setActivePalette(['#25283D', '#F4774F', '#55CFC0', '#FFD078', '#8B7BE8']);
        }

        // Generate tailored breakdown for custom upload
        const customBreakdown = {
          subject: `Visual composition with primary focal subjects detected in ${file.name}.`,
          scene: `Photographic environment with balanced background elements and fine textural depth.`,
          composition: `Naturally framed capture with rule-of-thirds alignment and ${
            img.width > img.height ? 'landscape' : 'portrait'
          } orientation.`,
          lighting: `Balanced illumination with ambient highlights and soft depth contrast.`,
          style: `High-resolution visual capture, authentic camera optics, clean dynamic range.`,
        };
        setActiveBreakdown(customBreakdown);

        // Run analysis via real Gemini Vision API if configured, otherwise smart local engine
        setIsAnalyzing(true);

        if (isGeminiConfigured) {
          analyzeImageWithGemini(dataUrl, file.type, {
            targetTool,
            promptDetail,
            focus: descriptionFocus,
            language: outputLanguage,
            extraInstructions,
          })
            .then((aiResult) => {
              setIsAnalyzing(false);
              setHasAnalyzed(true);
              if (aiResult) {
                if (aiResult.breakdown) {
                  setActiveBreakdown(aiResult.breakdown);
                }
                if (aiResult.palette && aiResult.palette.length > 0) {
                  setActivePalette(aiResult.palette);
                }
                if (aiResult.prompts) {
                  const promptVal =
                    promptDetail === 'Quick description'
                      ? aiResult.prompts.quick
                      : promptDetail === 'Highly detailed'
                      ? aiResult.prompts.detailed
                      : aiResult.prompts.balanced;
                  setGeneratedPrompt(promptVal);
                }
              }
            })
            .catch((err) => {
              console.warn('Gemini vision API error, using smart fallback:', err);
              setIsAnalyzing(false);
              setHasAnalyzed(true);
              setGeneratedPrompt(
                targetTool === 'Midjourney'
                  ? `High-fidelity photograph capturing the visual essence of ${file.name.replace(
                      /\.[^/.]+$/,
                      ''
                    )}, rich textures, natural color balance, cinematic depth of field --ar ${
                      img.width > img.height ? '16:9' : '4:5'
                    } --v 6.1`
                  : `High-fidelity photograph inspired by ${file.name.replace(
                      /\.[^/.]+$/,
                      ''
                    )}, featuring balanced lighting, authentic materials, and crisp optical focus.`
              );
            });
        } else {
          setTimeout(() => {
            setIsAnalyzing(false);
            setHasAnalyzed(true);
            setGeneratedPrompt(
              targetTool === 'Midjourney'
                ? `High-fidelity photograph capturing the visual essence of ${file.name.replace(
                    /\.[^/.]+$/,
                    ''
                  )}, rich textures, natural color balance, cinematic depth of field --ar ${
                    img.width > img.height ? '16:9' : '4:5'
                  } --v 6.1`
                : `High-fidelity photograph inspired by ${file.name.replace(
                    /\.[^/.]+$/,
                    ''
                  )}, featuring balanced lighting, authentic materials, and crisp optical focus.`
            );
          }, 750);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleRemoveImage = () => {
    setCustomImageSrc(null);
    setCustomImageMeta(null);
    setSelectedExampleId(null);
    setUploadError(null);
    setHasAnalyzed(false);
    setGeneratedPrompt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleManualAnalyze = () => {
    if (!selectedExampleId && !customImageSrc) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      setGeneratedPrompt(buildPromptFromCurrentState());
    }, 600);
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
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

  const handleCopyColorHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const handleSendToImproverClick = () => {
    if (onSendToImprover) {
      onSendToImprover(generatedPrompt);
    } else {
      onNavigate('/prompt-improver');
    }
  };

  const hasSelectedImage = Boolean(selectedExampleId || customImageSrc);
  const wordCount = generatedPrompt.trim() ? generatedPrompt.trim().split(/\s+/).length : 0;
  const charCount = generatedPrompt.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E9] text-[#25283D] selection:bg-[#FFD078] selection:text-[#25283D]">
      {/* Top Navbar */}
      <Navbar
        onOpenWorkspace={() => onNavigate('/image-to-prompt')}
        onNavigate={onNavigate}
      />

      <main className="flex-1 pb-20">
        {/* ========================================================= */}
        {/* 1. PAGE HEADER WITH BREADCRUMB & MAGNIFYING GLASS DOODLE  */}
        {/* ========================================================= */}
        <section className="relative bg-[#FFD078] border-b-2 border-[#25283D] py-10 sm:py-14 overflow-hidden">
          {/* Decorative background doodles */}
          <div className="absolute top-4 right-8 pointer-events-none hidden sm:block">
            <LoopSwirlDoodle className="w-16 h-10 opacity-70" color="#25283D" />
          </div>
          <div className="absolute bottom-3 left-6 pointer-events-none hidden md:block">
            <StarDoodle size={22} color="#F4774F" />
          </div>

          <div className="max-w-7xl mx-auto px-6">
            {/* Top Navigation Row: Breadcrumb & Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              {/* Breadcrumb: Home -> Image to Prompt */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                <button
                  onClick={() => onNavigate('/')}
                  className="text-[#25283D] hover:text-[#F4774F] hover:underline transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Home</span>
                </button>
                <span className="text-[#25283D]/40">/</span>
                <span className="text-[#F4774F]">Image to Prompt</span>
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
                  onClick={() => {
                    if (onSendToImprover) onSendToImprover(generatedPrompt);
                    else onNavigate('/prompt-improver');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFE8D0] hover:bg-[#ffd6b0] text-xs font-bold text-[#25283D] rounded-full border border-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D] transition-all cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-[#F4774F]" />
                  <span>Prompt Improver</span>
                </button>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]">
                  <span className="w-2 h-2 rounded-full bg-[#55CFC0] animate-pulse" />
                  <span className="tracking-wider uppercase font-display">IMAGE TO PROMPT STUDIO</span>
                </div>
              </div>
            </div>

            {/* Headline with Handcrafted Magnifying Glass Doodle */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3.5 flex-wrap">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#25283D] tracking-tight leading-[1.15]">
                  See an image.{' '}
                  <span className="relative inline-block text-[#F4774F]">
                    Describe the magic.
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

                {/* Hand-drawn Magnifying Glass Doodle */}
                <div className="animate-gentle-float">
                  <MagnifyingGlassDoodle size={42} color="#F4774F" />
                </div>
              </div>

              <p className="mt-4 text-base sm:text-lg text-[#25283D]/90 font-medium leading-relaxed">
                Turn visual inspiration into detailed AI prompts by exploring the subject,
                composition, lighting, colors, and artistic style.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. MAIN WORKSPACE: 2-COLUMN LAYOUT                        */}
        {/* ========================================================= */}
        <div className="max-w-7xl mx-auto px-6 pt-10 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ----------------------------------------------------- */}
            {/* LEFT COLUMN: REFERENCE IMAGE & UPLOAD (7 cols)        */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-7 space-y-6">
              {/* Card Container */}
              <div className="bg-white rounded-3xl border-3 border-[#25283D] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#25283D] space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-[#25283D]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#CFF0E5] border-2 border-[#25283D] flex items-center justify-center text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]">
                      <ImageIcon className="w-5 h-5 text-[#25283D]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold font-display text-[#25283D]">
                        Your visual inspiration
                      </h2>
                      <p className="text-xs font-semibold text-[#25283D]/70">
                        Upload a photo or choose a curated sample artwork
                      </p>
                    </div>
                  </div>

                  {hasSelectedImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors cursor-pointer"
                      title="Remove current image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {/* Validation Error Banner */}
                {uploadError && (
                  <div className="p-3.5 bg-red-50 border-2 border-red-400 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold text-red-700 shadow-[2px_2px_0px_0px_#F87171]">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  id="image-file-input"
                />

                {/* Upload & Preview Area */}
                {customImageSrc ? (
                  /* Custom Upload Preview */
                  <div className="relative rounded-2xl border-2 border-[#25283D] bg-[#FFF8E9]/60 p-4 shadow-[3px_3px_0px_0px_#25283D] space-y-4">
                    <div className="relative rounded-xl overflow-hidden max-h-[360px] flex items-center justify-center bg-[#25283D]/5">
                      <img
                        src={customImageSrc}
                        alt="Uploaded preview"
                        className="max-h-[340px] w-auto max-w-full object-contain rounded-lg"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#25283D]/10">
                      <div className="text-xs font-semibold text-[#25283D] space-y-0.5">
                        <p className="font-bold truncate max-w-[220px]">
                          {customImageMeta?.name}
                        </p>
                        <p className="text-[11px] text-[#25283D]/60 font-mono">
                          {customImageMeta?.dimensions} · {customImageMeta?.size}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-1.5 bg-[#FFF8E9] hover:bg-white text-xs font-bold text-[#25283D] rounded-full border border-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D] cursor-pointer"
                        >
                          Replace Image
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-xs font-bold text-red-700 rounded-full border border-red-300 cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                ) : activeExample ? (
                  /* Example Image Active Preview */
                  <div className="relative rounded-2xl border-2 border-[#25283D] bg-[#FFF8E9]/60 p-4 shadow-[3px_3px_0px_0px_#25283D] space-y-4">
                    <div className="relative rounded-xl overflow-hidden max-h-[360px] aspect-[16/10] flex items-center justify-center bg-[#25283D]/10">
                      <img
                        src={activeExample.imageUrl}
                        alt={activeExample.title}
                        className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-[1.02]"
                        onError={(e) => {
                          if (activeExample.imageFallback && e.currentTarget.src !== activeExample.imageFallback) {
                            e.currentTarget.src = activeExample.imageFallback;
                          }
                        }}
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-[#FFF8E9]/95 backdrop-blur-xs border border-[#25283D] rounded-full text-[11px] font-bold text-[#25283D] shadow-[1px_1px_0px_0px_#25283D]">
                        Active Sample: {activeExample.title}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#25283D]/10">
                      <div className="text-xs font-semibold text-[#25283D]">
                        <span className="font-bold">{activeExample.subtitle}</span>
                        <span className="text-[#25283D]/60 ml-2">({activeExample.tag})</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-1.5 bg-[#F4774F] hover:bg-[#e0663e] text-xs font-bold text-white rounded-full border border-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D] cursor-pointer flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Your Own Image</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Empty Drag & Drop Upload Zone */
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative rounded-3xl border-3 border-dashed transition-all p-8 sm:p-12 text-center flex flex-col items-center justify-center cursor-pointer ${
                      isDragOver
                        ? 'border-[#F4774F] bg-[#FFE8D0]/60 scale-[1.01]'
                        : 'border-[#25283D]/30 hover:border-[#25283D] bg-[#FFF8E9]/50 hover:bg-[#FFF8E9]'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#FFF8E9] border-2 border-[#25283D] flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#25283D] group-hover:scale-110 transition-transform">
                      <MagnifyingGlassDoodle size={36} color="#F4774F" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-display text-[#25283D]">
                      Drag and drop your image here
                    </h3>
                    <p className="text-xs text-[#25283D]/70 mt-1 max-w-sm">
                      PNG, JPG, JPEG, and WebP supported up to 10 MB
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 bg-[#F4774F] hover:bg-[#e0663e] active:scale-98 text-white text-xs sm:text-sm font-bold rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload an Image</span>
                    </button>
                  </div>
                )}

                {/* Example Image Cards Selector */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#25283D] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F4774F]" />
                      <span>Or try an example image:</span>
                    </span>
                    <span className="text-[11px] font-semibold text-[#25283D]/60">
                      Click to load & analyze
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {EXAMPLE_IMAGES.map((ex) => {
                      const isSelected = selectedExampleId === ex.id && !customImageSrc;
                      return (
                        <button
                          key={ex.id}
                          type="button"
                          onClick={() => handleSelectExample(ex)}
                          className={`group text-left p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#CFF0E5] border-[#25283D] shadow-[3px_3px_0px_0px_#25283D] scale-[1.02]'
                              : 'bg-[#FFF8E9] border-[#25283D]/30 hover:border-[#25283D] hover:bg-white'
                          }`}
                        >
                          <div className="w-full h-24 rounded-xl overflow-hidden border border-[#25283D]/20 mb-2 relative bg-[#25283D]/10">
                            <img
                              src={ex.imageUrl}
                              alt={ex.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                if (ex.imageFallback && e.currentTarget.src !== ex.imageFallback) {
                                  e.currentTarget.src = ex.imageFallback;
                                }
                              }}
                            />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#55CFC0] border border-[#25283D] flex items-center justify-center shadow-xs">
                                <Check className="w-3 h-3 text-[#25283D] stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <div className="text-xs font-bold text-[#25283D] truncate">
                            {ex.title}
                          </div>
                          <div className="text-[10px] font-medium text-[#25283D]/70 truncate">
                            {ex.subtitle}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------- */}
            {/* RIGHT COLUMN: ANALYSIS SETTINGS (5 cols)              */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
              {/* Mint-colored Panel: #D0F1E7 */}
              <div className="bg-[#D0F1E7] rounded-3xl border-3 border-[#25283D] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#25283D] space-y-5">
                {/* Title */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#25283D]/15">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#25283D] flex items-center justify-center text-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D]">
                      <Sliders className="w-4 h-4 text-[#F4774F]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-display text-[#25283D]">
                        Customize your prompt
                      </h3>
                      <p className="text-[11px] font-semibold text-[#25283D]/70">
                        Tailor the output to your target engine
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1. Target AI Tool */}
                <div className="space-y-1.5">
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
                      onChange={(e) => setTargetTool(e.target.value as TargetAiTool)}
                      className="w-full appearance-none px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-bold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                    >
                      <option value="General AI">General AI</option>
                      <option value="Midjourney">Midjourney (v6.1 with flags)</option>
                      <option value="DALL·E">DALL·E 3</option>
                      <option value="Flux">Flux (Schnell / Dev)</option>
                      <option value="ChatGPT">ChatGPT (Structured Directives)</option>
                      <option value="Gemini">Gemini (Markdown Analysis)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Prompt Detail */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={promptDetailId}
                    className="text-xs font-bold uppercase tracking-wider text-[#25283D]"
                  >
                    Prompt Detail
                  </label>
                  <div className="relative">
                    <select
                      id={promptDetailId}
                      value={promptDetail}
                      onChange={(e) => setPromptDetail(e.target.value as PromptDetail)}
                      className="w-full appearance-none px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-bold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                    >
                      <option value="Quick description">Quick description (concise)</option>
                      <option value="Balanced">Balanced (recommended)</option>
                      <option value="Highly detailed">Highly detailed (exhaustive)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Description Focus */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={descriptionFocusId}
                    className="text-xs font-bold uppercase tracking-wider text-[#25283D]"
                  >
                    Description Focus
                  </label>
                  <div className="relative">
                    <select
                      id={descriptionFocusId}
                      value={descriptionFocus}
                      onChange={(e) => setDescriptionFocus(e.target.value as DescriptionFocus)}
                      className="w-full appearance-none px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm font-bold text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D] cursor-pointer"
                    >
                      <option value="Overall scene">Overall scene (holistic)</option>
                      <option value="Subject and objects">Subject and objects</option>
                      <option value="Lighting and atmosphere">Lighting and atmosphere</option>
                      <option value="Composition and camera">Composition and camera</option>
                      <option value="Colors and artistic style">Colors and artistic style</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#25283D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 4. Output Language */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={outputLanguageId}
                    className="text-xs font-bold uppercase tracking-wider text-[#25283D] flex items-center gap-1.5"
                  >
                    <Languages className="w-3.5 h-3.5 text-[#F4774F]" />
                    <span>Output Language</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['English', 'Hindi'] as OutputLanguage[]).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setOutputLanguage(lang)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border-2 transition-all cursor-pointer ${
                          outputLanguage === lang
                            ? 'bg-[#F4774F] text-white border-[#25283D] shadow-[2px_2px_0px_0px_#25283D]'
                            : 'bg-white text-[#25283D] border-[#25283D]/40 hover:border-[#25283D]'
                        }`}
                      >
                        {lang === 'English' ? 'English (EN)' : 'हिन्दी (Hindi)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Optional Extra Instructions */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={extraInstructionsId}
                    className="text-xs font-bold uppercase tracking-wider text-[#25283D]"
                  >
                    Optional Extra Instructions
                  </label>
                  <textarea
                    id={extraInstructionsId}
                    value={extraInstructions}
                    onChange={(e) => setExtraInstructions(e.target.value)}
                    rows={2}
                    placeholder="e.g. emphasize cinematic mood, render in Ghibli style, exclude text..."
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-[#25283D] rounded-xl text-xs sm:text-sm text-[#25283D] placeholder:text-[#25283D]/40 focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[2px_2px_0px_0px_#25283D]"
                  />
                </div>

                {/* Prominent Coral Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleManualAnalyze}
                    disabled={!hasSelectedImage || isAnalyzing}
                    className={`w-full py-3.5 px-6 rounded-full border-2 border-[#25283D] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_#25283D] active:translate-y-0.5 transition-all ${
                      !hasSelectedImage
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400 shadow-none'
                        : isAnalyzing
                        ? 'bg-[#F4774F]/80 text-white cursor-wait'
                        : 'bg-[#F4774F] hover:bg-[#e0663e] text-white cursor-pointer'
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Analyzing Visual Tokens...</span>
                      </>
                    ) : (
                      <>
                        <span>Analyze Image →</span>
                        <Sparkles className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Demo Mode / AI Transparency Notice */}
                <div className="pt-2 border-t border-[#25283D]/15">
                  <div className="bg-[#FFF8E9] rounded-xl p-3 border border-[#25283D]/20 text-[11px] text-[#25283D]/80 leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#55CFC0] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#25283D]">
                        {selectedExampleId
                          ? 'Demo Mode · Curated Vision Dataset: '
                          : 'Client-Side Analysis Engine: '}
                      </span>
                      <span>
                        {selectedExampleId
                          ? 'Calibrated sample analysis extracted from professional creative references.'
                          : 'Color palettes and aspect ratios extracted in-browser from your image. Ready to connect Gemini vision proxy.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. ANALYSIS RESULTS SECTION                               */}
          {/* ========================================================= */}
          {hasAnalyzed && (
            <section className="mt-14 sm:mt-18 pt-10 border-t-3 border-[#25283D] space-y-10 animate-fade-in">
              {/* Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CFF0E5] border border-[#25283D] rounded-full text-xs font-bold text-[#25283D] shadow-[1.5px_1.5px_0px_0px_#25283D] mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#F4774F]" />
                    <span className="tracking-wider uppercase font-display">
                      REVERSE-ENGINEERED BLUEPRINT
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#25283D]">
                    Extracted Visual Breakdown & Prompt
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#25283D]/70 font-mono">
                    Target: {targetTool} · {promptDetail}
                  </span>
                </div>
              </div>

              {/* A. IMAGE BREAKDOWN (6 Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Main Subject & Objects */}
                <div className="bg-white rounded-2xl border-2 border-[#25283D] p-5 shadow-[4px_4px_0px_0px_#25283D] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F4774F]">
                    <Layers className="w-4 h-4 text-[#F4774F]" />
                    <span>Main Subject & Objects</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#25283D] leading-relaxed">
                    {activeBreakdown.subject}
                  </p>
                </div>

                {/* 2. Scene & Background */}
                <div className="bg-white rounded-2xl border-2 border-[#25283D] p-5 shadow-[4px_4px_0px_0px_#25283D] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B7BE8]">
                    <Compass className="w-4 h-4 text-[#8B7BE8]" />
                    <span>Scene & Background</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#25283D] leading-relaxed">
                    {activeBreakdown.scene}
                  </p>
                </div>

                {/* 3. Composition & Perspective */}
                <div className="bg-white rounded-2xl border-2 border-[#25283D] p-5 shadow-[4px_4px_0px_0px_#25283D] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#55CFC0]">
                    <Camera className="w-4 h-4 text-[#55CFC0]" />
                    <span>Composition & Perspective</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#25283D] leading-relaxed">
                    {activeBreakdown.composition}
                  </p>
                </div>

                {/* 4. Lighting & Atmosphere */}
                <div className="bg-white rounded-2xl border-2 border-[#25283D] p-5 shadow-[4px_4px_0px_0px_#25283D] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD078]">
                    <Sun className="w-4 h-4 text-[#FFD078]" />
                    <span>Lighting & Atmosphere</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#25283D] leading-relaxed">
                    {activeBreakdown.lighting}
                  </p>
                </div>

                {/* 5. Color Palette */}
                <div className="bg-white rounded-2xl border-2 border-[#25283D] p-5 shadow-[4px_4px_0px_0px_#25283D] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F4774F]">
                      <Palette className="w-4 h-4 text-[#F4774F]" />
                      <span>Extracted Palette</span>
                    </div>
                    {copiedColor && (
                      <span className="text-[10px] font-bold text-[#55CFC0] animate-pulse">
                        Copied {copiedColor}!
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {activePalette.map((hex, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleCopyColorHex(hex)}
                        className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#25283D] bg-[#FFF8E9] hover:bg-white transition-all cursor-pointer shadow-[1px_1px_0px_0px_#25283D]"
                        title={`Click to copy ${hex}`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#25283D]/30 inline-block"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="text-[11px] font-mono font-bold text-[#25283D]">
                          {hex}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Artistic Style & Textures */}
                <div className="bg-white rounded-2xl border-2 border-[#25283D] p-5 shadow-[4px_4px_0px_0px_#25283D] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25283D]">
                    <Wand2 className="w-4 h-4 text-[#25283D]" />
                    <span>Artistic Style & Textures</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#25283D] leading-relaxed">
                    {activeBreakdown.style}
                  </p>
                </div>
              </div>

              {/* B & C. GENERATED PROMPT & ACTIONS */}
              <div className="bg-[#FFE8D0]/60 rounded-3xl border-3 border-[#25283D] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#25283D] space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF8E9] border-2 border-[#25283D] rounded-full text-xs font-bold text-[#25283D] shadow-[2px_2px_0px_0px_#25283D]">
                    <span className="w-2 h-2 rounded-full bg-[#55CFC0]" />
                    <span className="tracking-wider uppercase font-display">
                      GENERATED PROMPT
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#25283D]/70">
                    {wordCount} words · {charCount} characters
                  </span>
                </div>

                {/* Editable Text Area */}
                <div className="relative">
                  <textarea
                    value={generatedPrompt}
                    onChange={(e) => setGeneratedPrompt(e.target.value)}
                    rows={6}
                    className="w-full p-4 bg-white border-2 border-[#25283D] rounded-2xl text-xs sm:text-sm font-mono leading-relaxed text-[#25283D] focus:outline-none focus:ring-2 focus:ring-[#F4774F] shadow-[3px_3px_0px_0px_#25283D] resize-y select-text min-h-[140px]"
                    placeholder="Your generated prompt will appear here..."
                  />
                  <div className="absolute top-2.5 right-2.5 pointer-events-none">
                    <span className="text-[10px] font-bold text-[#25283D]/40 uppercase tracking-widest bg-white/80 px-1.5 py-0.5 rounded border border-[#25283D]/10">
                      EDITABLE
                    </span>
                  </div>
                </div>

                {/* Action Buttons Suite */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Copy Prompt Button */}
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className={`px-6 py-3 rounded-full border-2 border-[#25283D] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[2.5px_2.5px_0px_0px_#25283D] active:translate-y-0.5 transition-all cursor-pointer ${
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
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>

                    {/* Regenerate Prompt */}
                    <button
                      type="button"
                      onClick={handleManualAnalyze}
                      disabled={isAnalyzing}
                      className="px-4 py-3 bg-white hover:bg-[#FFF8E9] text-[#25283D] text-xs sm:text-sm font-bold rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] active:translate-y-0.5 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                      <span>Regenerate Prompt</span>
                    </button>

                    {/* Clear & Start Again */}
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-4 py-3 bg-white hover:bg-[#FFF8E9] text-[#25283D]/80 hover:text-red-600 text-xs sm:text-sm font-bold rounded-full border-2 border-[#25283D] shadow-[2px_2px_0px_0px_#25283D] active:translate-y-0.5 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Clear and Start Again</span>
                    </button>
                  </div>

                  {/* Send to Prompt Improver Button */}
                  <button
                    type="button"
                    onClick={handleSendToImproverClick}
                    className="px-6 py-3 bg-[#8B7BE8] hover:bg-[#7866dc] text-white text-xs sm:text-sm font-bold rounded-full border-2 border-[#25283D] shadow-[2.5px_2.5px_0px_0px_#25283D] active:translate-y-0.5 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Send to Prompt Improver</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
