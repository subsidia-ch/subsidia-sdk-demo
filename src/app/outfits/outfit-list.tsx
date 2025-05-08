'use client';

import { GetOutfits, Outfit } from '@subsidia/sdk';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useDebounce from '@/hooks/useDebounce';
import { getOutfits } from '@/app/outfits/actions';

type OutfitListProps = {
    initialOutfitResponse: GetOutfits;
}

export default function OutfitList({ initialOutfitResponse }: OutfitListProps) {
    const [latestOutfitResponse, setLatestOutfitResponse] = useState<GetOutfits>(initialOutfitResponse);
    const [outfits, setOutfits] = useState<Outfit[]>(initialOutfitResponse.outfits);
    const [name, setName] = useState<string>('');
    const [brandLabel, setBrandLabel] = useState<string | undefined>(undefined);
    const [consultantId, setConsultantId] = useState<string | undefined>(undefined);

    const debouncedName = useDebounce<string>(name, 300);

    const fetchOutfits = async () => {
        const outfitResponse = await getOutfits({
            filterOptions: {
                name: debouncedName,
                brandLabel,
                consultantId,
            },
            paginationOptions: {
                size: 2,
            },
        });

        setLatestOutfitResponse(outfitResponse);
        setOutfits(outfitResponse.outfits);
    };

    const loadMore = async () => {
        const outfitResponse = await getOutfits({
            link: latestOutfitResponse.nextLink,
        });

        setLatestOutfitResponse(outfitResponse);
        setOutfits([...outfits, ...outfitResponse.outfits]);
    };

    useEffect(() => {
        if (debouncedName !== (latestOutfitResponse.filterOptions.name || '')) {
            void fetchOutfits();
        }
    }, [debouncedName]);

    useEffect(() => {
        if (brandLabel !== (latestOutfitResponse.filterOptions.brandLabel) || consultantId !== (latestOutfitResponse.filterOptions.consultantId)) {
            void fetchOutfits();
        }
    }, [brandLabel, consultantId]);

    return (
        <div>
            <div className="mb-8 grid gap-6">
                <input type="text"
                       className="w-full p-4 border border-gray-900 rounded-lg"
                       placeholder="Search for outfits..."
                       onChange={(e) => setName(e.target.value)}
                       value={name} />
                {initialOutfitResponse.outfitItemBrands.brands.length && (
                    <select name="brand" className="w-full p-4 border border-gray-900 rounded-lg"
                            value={brandLabel}
                            onChange={(e) => setBrandLabel(e.target.value || undefined)}>
                        <option value="">Select a brand</option>
                        {initialOutfitResponse.outfitItemBrands.brands.map((brand) => (
                            <option value={brand.name} key={brand.name}>{brand.name}</option>
                        ))}
                    </select>
                )}
                {initialOutfitResponse.outfitConsultants.consultants.length && (
                    <select name="consultant" className="w-full p-4 border border-gray-900 rounded-lg"
                            value={consultantId}
                            onChange={(e) => setConsultantId(e.target.value || undefined)}>
                        <option value="">Select a consultant</option>
                        {initialOutfitResponse.outfitConsultants.consultants.map((brand) => (
                            <option value={brand.id} key={brand.id}>{brand.name}</option>
                        ))}
                    </select>
                )}
            </div>

            {outfits.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {outfits.map((outfit) => (
                            <Link href={`/outfits/${outfit.id}`} title={outfit.name} key={outfit.id}
                                  className="border border-gray-900 rounded-xl p-4 transition-all bg-white hover:bg-gray-50 hover:shadow-md">
                                <div className="mb-4">
                                    {outfit.assetRelations?.assetRelations?.length ? (
                                        <Image src={outfit.assetRelations.assetRelations[0].asset?.url || ''}
                                               className="aspect-square object-cover rounded-lg"
                                               alt={outfit.name} width={400} height={400} />
                                    ) : (
                                        <>PLACEHOLDER</>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl">{outfit.name}</h3>
                                    <div className="text-base">
                                        {outfit.description}
                                    </div>
                                    {outfit.consultant && (
                                        <div className="text-sm">
                                            {outfit.consultant.name}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    {latestOutfitResponse.nextLink && (
                        <div className="mt-6 flex justify-center">
                            <button onClick={() => void loadMore()}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-200 cursor-pointer rounded-lg">
                                Load more
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    No outfits found.
                </div>
            )}
        </div>
    );
}