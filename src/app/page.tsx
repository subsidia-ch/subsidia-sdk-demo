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
                    <li>
                        <Link href={'/customers/sign-up'} title={'Customer Sign-Up'} className="text-gray-800 underline">
                            Customer Sign-Up
                        </Link>
                    </li>
                    <li>
                        <Link href={'/customers/sign-up?requiredFields=firstName,lastName,street,zipCode'} title={'Customer Sign-Up'} className="text-gray-800 underline">
                            Customer Sign-Up with additional required fields
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
