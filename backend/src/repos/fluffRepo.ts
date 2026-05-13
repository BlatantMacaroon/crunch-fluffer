import { FluffArgs } from "@shared/types/fluffDtos.ts"
import { FluffDocument, FluffModel } from "../models/fluffModel.ts"

export const getByArgs = async (args: FluffArgs): Promise<FluffDocument[]> => {
    const filter: any = {};

    if (args.crunchId) filter.crunchId = { $eq: args.crunchId }
    const response = await FluffModel.find(filter);
    console.log(response);
    return response
}