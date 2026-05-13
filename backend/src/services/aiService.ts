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
  required: [
    "backstory", "personalityTraits", "ideals", "bonds", "flaws", 
    "appearance", "alignment", "age", "height", "weight"
  ],
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
  You are an expert RPG Narrative Designer. Your task is to synthesize a character's mechanical data into a cohesive, high-quality literary profile.

  MECHANICAL DATA:
  - Context: ${crunch.race} ${crunch.class}, Level ${crunch.level}
  - Stats: STR:${crunch.strength}, DEX:${crunch.dexterity}, CON:${crunch.constitution}, 
           INT:${crunch.intelligence}, WIS:${crunch.wisdom}, CHA:${crunch.charisma}
  - Keywords: ${ args.themeKeywords?.length ? args.themeKeywords.join(', ') : "fantasy" }

  NARRATIVE ANALYSIS DIRECTIVES:
  1. ANALYZE "GOODNESS OF FIT": 
     - Evaluate the synergy or friction between the Race, Class, and Stats. 
     - Is this a "Paragon" (perfectly optimized stats for the class)? If so, describe their effortless mastery or the weight of high expectations.
     - Is this an "Outlier" (unusual race/class combo or low primary stats)? If so, the backstory MUST center on why they defied convention or how they compensate for their deficiencies.
     - If they have a high stat that is "useless" for their class (e.g., a 16 STR Wizard), explain how that physical reality shaped their past.
  
  2. THEME:
      - You need to consider the theme keywords provided above and incorporate them into the response. 
      - These themes should colour everything. Consider not just the word provided but how it would sculpt the setting and the character belonging to it.
      - For example, "nautical" should result in a character whose profession (such as sailor) brings them near the sea, or who was raised there.
      - "Space" would suggest a campaign that takes place in space, which would then shift every aspect of the output in that direction. 

  3. LEVEL-APPROPRIATE SCALE:
     - At Level ${crunch.level}, their history should match their power. 
     - Level 1-2: Local stakes, raw talent, or recent tragedy.
     - Level 3-5: Growing reputation, a specific famous deed, or a dangerous secret.

  4. SENSORY TRANSLATION:
     - Translate all stats into physical tells. High CON is 'unshakeable vitality' or 'thick, scarred skin.' Low DEX is 'heavy-footed' or 'deliberate, slow movements.'
     - NEVER mention numbers or game mechanics (e.g., no "Strength," "Stats," "Level," or "18").

  5. ARRAY REQUIREMENTS:
     - You MUST provide at least TWO (2) distinct entries for Personality Traits, Ideals, Bonds, and Flaws. Make them specific to this character's unique stat/class combination.
  
  JSON STRUCTURE:
  - backstory: 3 paragraphs (Origins, The Choice, The Current Path).
  - appearance: Focus on posture, clothing, and how their physical stats manifest.
  - alignment: Must be a logical result of the backstory.
  - personalityTraits, ideals, bonds, flaws: Arrays with at least 2 entries each.
`;
  
  const result = await model.generateContent(prompt);
  
  const aiData = JSON.parse(result.response.text());

  return {
    ...aiData,
    crunchId: crunch._id,
    generationMetadata: { prompt, model: modelName }
  }
};