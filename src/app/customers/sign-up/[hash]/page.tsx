import {redirect} from 'next/navigation';
import SignUpQRCode from '@/components/customers/sign-up/sign-up-qr-code';
import {Suspense} from 'react';

export default async function CustomerSignUpHashPage({params}: { params: Promise<{ hash: string }> }) {
    const {hash} = await params;

    if (!hash) {
        redirect('/customers/sign-up');
    }

    return (
        <div>
            <h1 className="text-4xl mb-4 text-center">Thank you for signing up!</h1>
            <h3 className="text-2xl mb-6 text-center">You can show this QR-Code to the cashier</h3>

            <Suspense>
                <SignUpQRCode hash={hash}/>
            </Suspense>
        </div>
    );
}