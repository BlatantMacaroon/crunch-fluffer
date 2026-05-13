import { Schema, model, Document, Types } from 'mongoose';
import { Alignments, FluffDto } from '@shared/types/fluffDtos.js';

export interface FluffDocument extends Omit<FluffDto, 'crunchId'>, Document {
    crunchId: Types.ObjectId
}

const fluffSchema = new Schema<FluffDocument>({
    crunchId: { type: Types.ObjectId, ref: 'Crunch', required: true },
    backstory: { type: String, required: true },
    personalityTraits: [{ type: String }],
    ideals: [{ type: String }],
    bonds: [{ type: String }],
    flaws: [{ type: String }],
    appearance: { type: String, required: true },
    alignment: {
        type: String,
        enum: Object.values(Alignments),
        required: true        
    },
    age: { type: Number, required: true, min: 0 },
    height: { type: String, required: true },
    weight: { type: Number, required: true, min: 0 },

    source: {
        type: String,
        enum: ['AI', 'MANUAL'],
        default: 'AI'
    },
    isApproved: { type: Boolean, default: false },

    generationMetadata: {
        prompt: { type: String },
        model: { type: String }
    }
}, { timestamps: true });

export const FluffModel = model<FluffDocument>('Fluff', fluffSchema);