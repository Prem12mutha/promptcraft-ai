/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';

// Retrieve Gemini API Key from Vite environment or process define
const apiKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
  (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
  '';

export const isGeminiConfigured = Boolean(
  apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10
);

// Instantiate Google GenAI client safely if key is available
export const geminiClient = isGeminiConfigured ? new GoogleGenAI({ apiKey }) : null;

// Primary and fallback models verified for this environment
const PRIMARY_MODEL = 'gemini-3.5-flash-lite';
const FALLBACK_MODEL = 'gemini-3.5-flash';

/**
 * Safely parse JSON from Gemini's text response, stripping markdown backticks
 */
function cleanAndParseJson<T>(rawText: string, fallback: T): T {
  try {
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
    }
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn('Failed to parse Gemini JSON response, falling back:', err);
    return fallback;
  }
}

// =========================================================================
// 1. IMAGE TO PROMPT (Multimodal Vision Analysis)
// =========================================================================

export interface GeminiImageAnalysisResult {
  breakdown: {
    subject: string;
    scene: string;
    composition: string;
    lighting: string;
    style: string;
  };
  palette: string[];
  prompts: {
    quick: string;
    balanced: string;
    detailed: string;
  };
}

export async function analyzeImageWithGemini(
  imageBase64: string,
  mimeType: string,
  options: {
    targetTool: string;
    promptDetail: string;
    focus: string;
    language: string;
    extraInstructions?: string;
  }
): Promise<GeminiImageAnalysisResult | null> {
  if (!geminiClient) {
    console.warn('Gemini API is not configured.');
    return null;
  }

  // Ensure clean base64 data without data-URL prefix
  const cleanBase64 = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;

  const promptText = `You are a world-class prompt engineer and computer vision expert.
Analyze this image thoroughly to reverse-engineer its visual DNA and create optimized prompts for AI generation tools (such as ${options.targetTool}).

Parameters:
- Target Tool: ${options.targetTool}
- Level of Detail: ${options.promptDetail}
- Focus Area: ${options.focus}
- Output Language: ${options.language}
${options.extraInstructions ? `- User Extra Directives: ${options.extraInstructions}` : ''}

Respond STRICTLY in JSON format with no preamble or commentary, matching this structure:
{
  "breakdown": {
    "subject": "Clear description of the main subject/focal point",
    "scene": "Environment, background, setting, and spatial context",
    "composition": "Camera perspective, framing, shot type, focal length, angle",
    "lighting": "Illumination source, quality, color temperature, shadows",
    "style": "Artistic medium, renderer/film stock, texture, aesthetics"
  },
  "palette": ["#Hex1", "#Hex2", "#Hex3", "#Hex4", "#Hex5"],
  "prompts": {
    "quick": "Short punchy 1-sentence prompt for quick generation",
    "balanced": "Detailed 2-3 sentence prompt with balanced keywords and style tags",
    "detailed": "Comprehensive prompt with micro-textures, camera specs, lighting, and rendering parameters for ${options.targetTool}"
  }
}`;

  try {
    const res = await geminiClient.models.generateContent({
      model: PRIMARY_MODEL,
      contents: [
        {
          inlineData: {
            mimeType,
            data: cleanBase64,
          },
        },
        { text: promptText },
      ],
    });

    return cleanAndParseJson<GeminiImageAnalysisResult | null>(res.text || '', null);
  } catch (err: any) {
    console.warn('Primary model error, attempting fallback:', err.message);
    try {
      const fallbackRes = await geminiClient.models.generateContent({
        model: FALLBACK_MODEL,
        contents: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          { text: promptText },
        ],
      });
      return cleanAndParseJson<GeminiImageAnalysisResult | null>(fallbackRes.text || '', null);
    } catch (fallbackErr: any) {
      console.error('Gemini vision analysis failed:', fallbackErr);
      return null;
    }
  }
}

// =========================================================================
// 2. PROMPT IMPROVER (Prompt Analysis, Scoring & Enhancement)
// =========================================================================

export interface GeminiPromptImprovementResult {
  improvedPrompt: string;
  scores: {
    clarity: number;
    context: number;
    specificity: number;
    structure: number;
    outputExpectations: number;
    total: number;
  };
  changes: Array<{
    id: string;
    title: string;
    description: string;
    tag: string;
    color: string;
  }>;
  alternatives?: Array<{
    title: string;
    prompt: string;
  }>;
}

export async function improvePromptWithGemini(
  originalPrompt: string,
  options: {
    targetTool: string;
    goals: string[];
    intendedPurpose: string;
    extraKnowledge?: string;
  }
): Promise<GeminiPromptImprovementResult | null> {
  if (!geminiClient) {
    console.warn('Gemini API is not configured.');
    return null;
  }

  const promptText = `You are a Principal Prompt Engineer. Transform and elevate the user's raw prompt into a production-grade prompt optimized for ${options.targetTool}.

Original Prompt:
"""
${originalPrompt}
"""

Requirements:
- Target AI Model: ${options.targetTool}
- Intended Purpose: ${options.intendedPurpose}
- Selected Optimization Goals: ${options.goals.join(', ')}
${options.extraKnowledge ? `- Additional Domain Knowledge: ${options.extraKnowledge}` : ''}

Respond STRICTLY in JSON format with no markdown preamble:
{
  "improvedPrompt": "The fully elevated, ready-to-run prompt with exact syntax, formatting, and parameters for ${options.targetTool}",
  "scores": {
    "clarity": 18,
    "context": 19,
    "specificity": 19,
    "structure": 18,
    "outputExpectations": 18,
    "total": 92
  },
  "changes": [
    {
      "id": "change-1",
      "title": "Specific Enhancement Title",
      "description": "Explanation of what was improved and why",
      "tag": "Lighting / Structure / Detail",
      "color": "#F4774F"
    }
  ],
  "alternatives": [
    {
      "title": "Concise & Fast",
      "prompt": "An alternate streamlined version"
    },
    {
      "title": "Cinematic & Hyper-detailed",
      "prompt": "An alternate richly descriptive version"
    }
  ]
}`;

  try {
    const res = await geminiClient.models.generateContent({
      model: PRIMARY_MODEL,
      contents: [{ text: promptText }],
    });

    return cleanAndParseJson<GeminiPromptImprovementResult | null>(res.text || '', null);
  } catch (err: any) {
    console.warn('Primary model error in prompt improver, trying fallback:', err.message);
    try {
      const fallbackRes = await geminiClient.models.generateContent({
        model: FALLBACK_MODEL,
        contents: [{ text: promptText }],
      });
      return cleanAndParseJson<GeminiPromptImprovementResult | null>(fallbackRes.text || '', null);
    } catch (fallbackErr: any) {
      console.error('Gemini prompt improvement failed:', fallbackErr);
      return null;
    }
  }
}

