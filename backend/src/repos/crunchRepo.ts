import { CrunchArgs, CrunchDto } from '../../../shared/types/crunchDtos.ts';
import { CrunchDocument, CrunchModel } from '../models/crunchModel.ts';

export const create = async (data: CrunchDto): Promise<CrunchDocument> => {
    return await CrunchModel.create(data);
}

export const getByArgs = async (args: CrunchArgs): Promise<CrunchDocument[]> => {
    
    const filter : any = {};

    if (args.classes?.length)
        filter.classes = { $in: args.classes }
    
    return await CrunchModel.find(filter);
} 