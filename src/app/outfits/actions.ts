'use server';

import { GetOutfitsParams } from '@subsidia-ch/sdk';
import { getSubsidiaClient } from '@/subsidia/client';

export async function getOutfits(params: GetOutfitsParams) {
    const subsidiaClient = await getSubsidiaClient();

    return await subsidiaClient.outfit.getOutfits(params);
}