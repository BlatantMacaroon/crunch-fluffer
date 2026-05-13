import { Schema, model, Document } from 'mongoose';
import { CrunchDto, Classes, Races } from '@shared/types/crunchDtos.js';

export interface CrunchDocument extends CrunchDto, Document {}

const oneToTwenty = { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 20, 
    validate: { 
        validator: Number.isInteger, 
        message: '{VALUE} is not an integer' 
    }
};

const crunchSchema = new Schema<CrunchDocument>({
    strength: oneToTwenty,
    dexterity: oneToTwenty,
    constitution: oneToTwenty,
    intelligence: oneToTwenty,
    wisdom: oneToTwenty,
    charisma: oneToTwenty,
    class: {
        type: String,
        required: true,
        enum: Object.values(Classes)
    },
    race: {
        type: String,
        required: true,
        enum: Object.values(Races)
    },
    level: oneToTwenty
}, { timestamps: true });

export const CrunchModel = model<CrunchDocument>('Crunch', crunchSchema);