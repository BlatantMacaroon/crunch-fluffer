export interface FluffDto {
    crunchId: string;
    backstory: string;
    personalityTraits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
    appearance: string;
    alignment: Alignment;
    age: number;
    height: string;
    weight: number;

    source: string;
    isApproved: boolean;

    generationMetadata?: {
        prompt: string;
        model: string;
    }
}

export const Alignments = {
    LawfulGood: 'LG',
    NeutralGood: 'G',
    ChaoticGood: 'CG',
    LawfulNeutral: 'L',
    TrueNeutral: 'N',
    ChaoticNeutral: 'C',
    LawfulEvil: 'LE',
    NeutralEvil: 'E',
    ChaoticEvil: 'CE',
    Unaligned: 'U'
} as const;

export type Alignment = typeof Alignments[keyof typeof Alignments];

export interface FluffGenerationArgs {
    model?: ModelName,
    themeKeywords?: string[]
} 

export const ModelNames = {
    GeminiFlashFastest: 'gemini-flash-fastest',
    Gemini25FlashLite: 'gemini-2.5-flash-lite',
    Gemini3FlashPreview: 'gemini-3-flash-preview',
    GeminiFlashLiteLatest: 'gemini-flash-lite-latest'
} as const;

export type ModelName = typeof ModelNames[keyof typeof ModelNames];