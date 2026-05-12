import { CrunchArgs, CrunchDto } from '../../../shared/types/crunchDtos.ts';
import { CrunchDocument } from '../models/crunchModel.ts';
import * as crunchRepo from '../repos/crunchRepo.ts';

export const create = async (data: CrunchDto): Promise<CrunchDocument> => {
    return await crunchRepo.create(data);
}

export const getByArgs = async (args: CrunchArgs): Promise<CrunchDocument[]> => {
    return await crunchRepo.getByArgs(args);
}