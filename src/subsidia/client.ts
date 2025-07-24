import {createClient} from '@subsidia-ch/sdk';
import {redisClient} from '@/redis';

let clientInstance: Awaited<ReturnType<typeof createClient>> | null = null;

export async function getSubsidiaClient() {
    if (!clientInstance) {
        clientInstance = await createClient({
            environment: process.env.SUBSIDIA_ENVIRONMENT as 'PROD' | 'PRE' | 'STA',
            apiKey: process.env.SUBSIDIA_API_KEY || '',
            apiSecret: process.env.SUBSIDIA_API_SECRET || '',
            customFetch: fetch,
            setCachedToken: async (token) => {
                await redisClient.set('SUBSIDIA_ACCESS_TOKEN', token);
            },
            getCachedToken: async () => {
                return await redisClient.get('SUBSIDIA_ACCESS_TOKEN');
            },
        });
    }
    return clientInstance;
}

