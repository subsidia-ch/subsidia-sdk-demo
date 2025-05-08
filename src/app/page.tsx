import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
    return (
        <div>
            <h1 className="text-4xl mb-8">Subsidia SDK Demo</h1>

            <div>
                <h2 className="mb-6 font-bold text-2xl">Pages</h2>
                <ul className="list-disc pl-4">
                    <li>
                        <Link href={'/outfits'} title={'Outfits'} className="text-gray-800 underline">
                            Outfits
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
