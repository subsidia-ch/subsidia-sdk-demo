import { notFound } from 'next/navigation';
import { subsidiaClient } from '@/subsidia/client';
import Image from 'next/image';

export default async function OutfitId({
                                           params,
                                       }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    if (!parseInt(id)) {
        return notFound();
    }

    try {
        const outfit = await subsidiaClient.outfit.getOutfitById({
            id: parseInt(id),
            fetchOptions: {
                cache: 'no-store',
            },
        });

        return (
            <div>
                <h1 className="text-4xl mb-6">{outfit.name}</h1>
                {outfit.description && (
                    <div className="mb-8 text-xl">{outfit.description}</div>
                )}
                {outfit.assetRelations?.assetRelations?.length && (
                    <div className="grid grid-cols-2 gap-4">
                        {outfit.assetRelations.assetRelations.map((assetRelation) => (
                            <Image className="aspect-square w-full object-cover rounded-lg border border-gray-900" key={assetRelation.id} src={assetRelation.asset?.url || ''} alt={outfit.name} width={500} height={500} />
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        return notFound();
    }
}