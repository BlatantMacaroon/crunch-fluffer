import * as crunchRepo from '../repos/crunchRepo.js';
import { FluffDocument, FluffModel } from '../models/fluffModel.js';
import { generateFluff } from './aiService.js';
import { FluffGenerationArgs } from '@shared/types/fluffDtos.ts';

export const generate = async (crunchId: string, args: FluffGenerationArgs): Promise<FluffDocument> => {
    const crunch = await crunchRepo.getById(crunchId);
    if (!crunch) throw new Error('Character stats not found');

    const generatedFluff = await generateFluff(crunch, args);

    return await FluffModel.create({...generatedFluff, crunchId});
}