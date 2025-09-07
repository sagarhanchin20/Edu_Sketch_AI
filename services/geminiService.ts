
import { GoogleGenAI, Type } from "@google/genai";
import { TextGuideResponse } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textGuideSchema = {
  type: Type.OBJECT,
  properties: {
    panels: {
      type: Type.ARRAY,
      description: "An array of 5 panels explaining the concept.",
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.INTEGER, description: "The step number (1-5)." },
          title: { type: Type.STRING, description: "The title for this step." },
          explanation: { type: Type.STRING, description: "The simple explanation for this step." },
          image_prompt: { type: Type.STRING, description: "A detailed prompt for an AI image generator to create the panel's illustration." }
        },
        required: ["step", "title", "explanation", "image_prompt"]
      }
    }
  },
  required: ["panels"]
};

export const generateTextGuide = async (concept: string): Promise<TextGuideResponse> => {
  const prompt = `
    You are EduSketch AI, an expert educational illustrator and teaching assistant. 
    Your task is to generate a visual, beginner-friendly learning guide for the concept: "${concept}".

    Instructions:
    1. Break the concept into 5 distinct, logical steps or stages.
    2. For each step, provide:
       - A short, clear title.
       - A concise, easy-to-read explanation (2-3 sentences) suitable for a beginner.
       - A detailed image prompt for an AI image generator to create an illustration for that step.
    3. The image prompts must describe a comic-style scene or diagram. They must maintain consistent characters (if any), colors, and art style across all 5 panels. 
    The style is a friendly, freehand illustration with smooth, clean lines, a light background with pastel highlights, and subtle patterned backgrounds.

    Your output MUST be a JSON object that strictly follows the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: textGuideSchema,
      },
    });

    const jsonText = response.text.trim();
    // It's good practice to validate the parsed object, but we trust the schema here.
    return JSON.parse(jsonText) as TextGuideResponse;
  } catch (error) {
    console.error("Error generating text guide:", error);
    throw new Error("Failed to generate the educational guide from the text model.");
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  const fullPrompt = `${prompt}, in a freehand illustration style with smooth, clean lines. Light background with pastel highlights. Subtle patterned backgrounds that harmonize with the color palette. Consistent characters and art style. Interaction-ready composition.`;
  
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '16:9',
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("Image generation returned no images.");
    }
    
    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/png;base64,${base64ImageBytes}`;
  } catch (error) {
      console.error("Error generating image:", error);
      // Fallback to a placeholder service if generation fails
      return `https://picsum.photos/seed/${Math.random()}/1280/720`;
  }
};
