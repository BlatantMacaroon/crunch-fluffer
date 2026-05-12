import { Schema, model, Document } from 'mongoose';
import { CrunchDto, Class, Race } from '../../../shared/types/crunchDtos.ts';

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
        enum: Object.values(Class)
    },
    race: {
        type: String,
        required: true,
        enum: Object.values(Race)
    },
    level: oneToTwenty
}, { timestamps: true });

export const CrunchModel = model<CrunchDocument>('Crunch', crunchSchema);