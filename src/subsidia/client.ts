import { createClient } from '@subsidia-ch/sdk';

const globalForSubsidia = globalThis as unknown as {
    subsidiaClient: Awaited<ReturnType<typeof createClient>> | undefined;
};

export async function getSubsidiaClient() {
    if (!globalForSubsidia.subsidiaClient) {
        globalForSubsidia.subsidiaClient = await createClient({
            environment: process.env.SUBSIDIA_ENVIRONMENT as 'PROD' | 'PRE' | 'STA',
            apiKey: process.env.SUBSIDIA_API_KEY || '',
            apiSecret: process.env.SUBSIDIA_API_SECRET || '',
            customFetch: fetch,
        });
    }
    return globalForSubsidia.subsidiaClient;
}

