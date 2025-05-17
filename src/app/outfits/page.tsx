import OutfitList from '@/app/outfits/outfit-list';
import { getOutfits } from '@/app/outfits/actions';

export default async function Outfits() {
    const outfitResponse = await getOutfits({
        pagination: {
            size: 2,
        },
        requestOptions: {
            cache: 'force-cache',
        },
    });

    return (
        <div>
            <h1 className="text-4xl mb-6">Outfits</h1>
            <OutfitList initialOutfitResponse={outfitResponse} />
        </div>
    );
}