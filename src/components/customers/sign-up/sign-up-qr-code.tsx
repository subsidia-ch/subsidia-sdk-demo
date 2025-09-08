'use client';

import QRCode from 'react-qr-code';
import {useSearchParams} from 'next/navigation';
import {format} from 'date-fns';

type SignUpQRCodeProps = {
    hash: string;
}

export default function SignUpQRCode({hash}: SignUpQRCodeProps) {
    const searchParams = useSearchParams();

    const validTill = searchParams.get('validTill');

    return (
        <div className="max-w-lg mx-auto">
            <QRCode
                size={256}
                style={{height: 'auto', maxWidth: '100%', width: '100%'}}
                viewBox={`0 0 256 256`}
                value={hash}/>
            {validTill && (
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        This QR code is valid until {format(validTill, 'dd.MM.yyyy HH:mm')}.
                    </p>
                </div>
            )}
        </div>
    )
}