import * as crunchRepo from '../repos/crunchRepo.js';
import { FluffDocument, FluffModel } from '../models/fluffModel.js';
import { generateFluff } from './aiService.js';
import { FluffArgs, FluffGenerationArgs } from '@shared/types/fluffDtos.ts';
import * as fluffRepo from '../repos/fluffRepo.js';

export const generate = async (crunchId: string, args: FluffGenerationArgs): Promise<FluffDocument> => {
    const crunch = await crunchRepo.getById(crunchId);
    if (!crunch) throw new Error('Character stats not found');

    const generatedFluff = await generateFluff(crunch, args);

    return await FluffModel.create({...generatedFluff, crunchId});
}

export const getByArgs = async (args: FluffArgs): Promise<FluffDocument[]> => {
    return await fluffRepo.getByArgs(args);
}