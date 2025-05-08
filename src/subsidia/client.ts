import { createClient } from '@subsidia/sdk';

export const subsidiaClient = await createClient({
    environment: process.env.SUBSIDIA_ENVIRONMENT as 'PROD' | 'PRE' | 'STA',
    apiKey: process.env.SUBSIDIA_API_KEY || '',
    apiSecret: process.env.SUBSIDIA_API_SECRET || '',
    customFetch: fetch,
});

