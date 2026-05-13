import { GoogleGenerativeAI, Schema, SchemaType } from '@google/generative-ai';
import { Alignments, FluffDto, FluffGenerationArgs, ModelName } from '@shared/types/fluffDtos.js';
import { CrunchDocument } from '../models/crunchModel.ts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Define the schema for Gemini so it returns valid JSON
const responseSchema : Schema = {
  type: SchemaType.OBJECT,
  properties: {
    backstory: { type: SchemaType.STRING },
    personalityTraits: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    ideals: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    bonds: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    flaws: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    appearance: { type: SchemaType.STRING },
    alignment: { type: SchemaType.STRING, enum: Object.values(Alignments) },
    age: { type: SchemaType.NUMBER },
    height: { type: SchemaType.STRING },
    weight: { type: SchemaType.NUMBER },
  },
  required: ["backstory", "appearance", "alignment", "age", "height", "weight"],
} as any;

const DEFAULT_MODEL_NAME = "gemini-flash-latest";

export const generateFluff = async (crunch: CrunchDocument, args: FluffGenerationArgs): Promise<FluffDto> => {
  console.log(process.env.GEMINI_API_KEY);

  const modelName = args?.model as ModelName ?? DEFAULT_MODEL_NAME;
  console.log(modelName);

  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    }
  });

  const prompt = `
    Generate a D&D 5e character backstory and personality details for the following character:
    Race: ${crunch.race}
    Class: ${crunch.class}
    Level: ${crunch.level}
    Stats: STR ${crunch.strength}, DEX ${crunch.dexterity}, CON ${crunch.constitution}, 
           INT ${crunch.intelligence}, WIS ${crunch.wisdom}, CHA ${crunch.charisma}

    The backstory should be roughly 3 paragraphs. 
    Personality traits, ideals, bonds, and flaws should be concise 1-sentence hooks.
    Ensure the age, height, and weight make sense for a ${crunch.race}.
  `;
  
  const result = await model.generateContent(prompt);
  
  const aiData = JSON.parse(result.response.text());

  return {
    ...aiData,
    crunchId: crunch._id,
    generationMetadata: { prompt, model: modelName }
  }
};