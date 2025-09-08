'use client';

import QRCode from 'react-qr-code';

type SignUpQRCodeProps = {
    hash: string;
}

export default function SignUpQRCode({hash}: SignUpQRCodeProps) {
    return (
        <div className="max-w-lg mx-auto">
            <QRCode
                size={256}
                style={{height: 'auto', maxWidth: '100%', width: '100%'}}
                viewBox={`0 0 256 256`}
                value={hash}/>
        </div>
    )
}