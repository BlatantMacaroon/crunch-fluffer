import * as crunchService from '../services/crunchService.ts';
import { Request, Response } from 'express';
import { CrunchArgs, CrunchDto } from '../../../shared/types/crunchDtos.ts';

export const create = async (req: Request, res: Response) => {
    try {
        const created = await crunchService.create(req.body as CrunchDto);

        res.status(201).json(created.toJSON());
    }
    catch (err) {
        res.status(400).json({ 
            errorMessage: "Failed to create.", 
            innerError: err });
    }
}

export const getByArgs = async (req: Request, res: Response) => {
    try {
        const result = await crunchService.getByArgs(req.params as CrunchArgs)

        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({errorMessage: "Fail!"}); //todo: add some better handling
    }
}