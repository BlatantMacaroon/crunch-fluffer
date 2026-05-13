import * as crunchService from '../services/crunchService.ts';
import { Request, Response } from 'express';
import { CrunchArgs, CrunchDto } from '@shared/types/crunchDtos.ts';
import { asyncHandler } from '../utils/asyncHandler.ts';

export const create = asyncHandler(async (req: Request, res: Response) => {
    const created = await crunchService.create(req.body as CrunchDto);
    res.status(201).json(created.toJSON());        
});

export const getByArgs = asyncHandler(async (req: Request, res: Response) => {
    const result = await crunchService.getByArgs(req.params as CrunchArgs)
    res.status(200).json(result);
});

export const get = asyncHandler(async (req: Request, res: Response) => {
    const result = await crunchService.getById(req.params.id as string);

    if (!result)
        return res.status(404).json({ message: "Crunch not found" });

    else res.status(200).json(result.toJSON());
});