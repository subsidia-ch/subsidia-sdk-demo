import { createClient } from '@subsidia-ch/sdk';

let clientInstance: Awaited<ReturnType<typeof createClient>> | null = null;

export async function getSubsidiaClient() {
    if (!clientInstance) {
        clientInstance = await createClient({
            environment: process.env.SUBSIDIA_ENVIRONMENT as 'PROD' | 'PRE' | 'STA',
            apiKey: process.env.SUBSIDIA_API_KEY || '',
            apiSecret: process.env.SUBSIDIA_API_SECRET || '',
            customFetch: fetch,
        });
    }
    return clientInstance;
}

