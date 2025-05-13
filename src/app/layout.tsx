import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Subsidia SDK Demo',
    description: 'Demo NextJS Application for Subsidia SDK',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <header className="sticky top-0 w-full bg-white shadow-md">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                <Link href={'/'}>
                    <Image
                        src="/logo.svg"
                        alt="Subsidia Logo"
                        width={180}
                        height={38}
                        priority
                    />
                </Link>
            </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {children}
        </div>
        </body>
        </html>
    );
}
