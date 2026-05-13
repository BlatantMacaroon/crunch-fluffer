import { FluffGenerationArgs } from '@shared/types/fluffDtos.ts';
import * as fluffService from '../services/fluffService.ts';
import { Request, Response } from 'express';

export const generate = async (req: Request, res: Response) => {
    try {
        const args = req.body as FluffGenerationArgs;

        const result = await fluffService.generate(req.params.crunchId as string, args);

        res.status(201).json(result.toJSON());
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Failed to generate or save.",
            details: err
        });
    }
}