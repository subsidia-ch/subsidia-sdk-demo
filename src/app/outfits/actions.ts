'use server';

import { GetOutfitsParams } from '@subsidia-ch/sdk';
import { subsidiaClient } from '@/subsidia/client';

export async function getOutfits(params: GetOutfitsParams) {
    return await subsidiaClient.outfit.getOutfits(params);
}