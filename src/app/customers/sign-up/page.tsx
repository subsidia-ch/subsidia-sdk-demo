import {Suspense} from 'react';
import SignUpForm from '@/components/customers/sign-up/sign-up-form';
import {getSubsidiaClient} from '@/subsidia/client';

export default async function CustomersSignUp() {
    const client = await getSubsidiaClient();
    const countries = await client.country.getCountries({
        requestOptions: {
            cache: 'force-cache',
        },
    });

    return (
        <div>
            <h1 className="text-4xl mb-6">Customer Sign Up</h1>
            <Suspense>
                <SignUpForm countries={countries}/>
            </Suspense>
        </div>
    );
}