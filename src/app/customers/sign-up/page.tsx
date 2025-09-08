import {Suspense} from 'react';
import SignUpForm from '@/components/customers/sign-up/sign-up-form';

export default async function CustomersSignUp() {
    return (
        <div>
            <h1 className="text-4xl mb-6">Customer Sign Up</h1>
            <Suspense>
                <SignUpForm/>
            </Suspense>
        </div>
    );
}