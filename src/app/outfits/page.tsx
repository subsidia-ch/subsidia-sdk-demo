import OutfitList from '@/app/outfits/outfit-list';
import { getOutfits } from '@/app/outfits/actions';

export default async function Outfits() {
    const outfitResponse = await getOutfits({
        paginationOptions: {
            size: 2,
        },
        fetchOptions: {
            cache: 'no-store',
        },
    });

    return (
        <div>
            <h1 className="text-4xl mb-6">Outfits</h1>
            <OutfitList initialOutfitResponse={outfitResponse} />
        </div>
    );
}