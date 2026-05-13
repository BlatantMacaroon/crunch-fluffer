import { FluffArgs, FluffGenerationArgs } from '@shared/types/fluffDtos.ts';
import * as fluffService from '../services/fluffService.ts';
import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.ts';

export const generate = asyncHandler(async (req: Request, res: Response) => {
    const args = req.body as FluffGenerationArgs;
    const result = await fluffService.generate(req.params.crunchId as string, args);
    res.status(201).json(result.toJSON());
});

export const getByArgs = asyncHandler(async (req: Request, res: Response) => {
    console.log("here");
    const { crunchId } = req.query;

    const args: FluffArgs = { 
        crunchId: typeof crunchId === 'string' ? crunchId : undefined 
    };

    const result = await fluffService.getByArgs(args);
    res.status(200).json(result);
});