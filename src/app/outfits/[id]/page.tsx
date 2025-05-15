import {notFound} from 'next/navigation';
import {subsidiaClient} from '@/subsidia/client';
import Image from 'next/image';
import {formatPriceAmount} from '@subsidia-ch/sdk';

export default async function OutfitId({
                                           params,
                                       }: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params;

    if (!parseInt(id)) {
        return notFound();
    }

    try {
        const [outfit, outfitItems] = await Promise.all([
            subsidiaClient.outfit.getOutfitById({
                id: parseInt(id),
                fetchOptions: {
                    cache: 'default',
                },
            }),
            subsidiaClient.outfitItem.getOutfitItems({
                filterOptions: {
                    outfitId: parseInt(id),
                },
                fetchOptions: {
                    cache: 'default',
                },
            }),
        ]);

        if (!outfit) {
            return notFound();
        }

        return (
            <div>
                <h1 className="text-4xl mb-6">{outfit.name}</h1>
                {outfit.description && (
                    <div className="mb-8 text-xl">{outfit.description}</div>
                )}
                {outfit.assetRelations?.assetRelations?.length && (
                    <div className="grid grid-cols-2 gap-4">
                        {outfit.assetRelations.assetRelations.map((assetRelation) => (
                            <Image className="aspect-square w-full object-cover rounded-lg border border-gray-900"
                                   key={assetRelation.id} src={assetRelation.asset?.url || ''} alt={outfit.name} width={500}
                                   height={500}/>
                        ))}
                    </div>
                )}
                {outfitItems.outfitItems.length > 0 && (
                    <div className="my-8">
                        <h2 className="text-3xl mb-4">Outfit Items:</h2>
                        <ul className="list-disc pl-6">
                            {outfitItems.outfitItems.map((item) => (
                                <li key={item.id} className="mb-2">
                                    {item.article?.name} - {item.sizeLabel} - {formatPriceAmount(item.price)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        return notFound();
    }
}