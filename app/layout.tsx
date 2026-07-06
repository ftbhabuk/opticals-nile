import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, IBM_Plex_Sans } from 'next/font/google'
import { Courier_Prime } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _courierPrime = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"] });
const _ibmPlexSans = IBM_Plex_Sans({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Nile Opticals — Premium Eyewear & Medical Eye Care in Pokhara',
  description: 'Crystal clear vision for everyone. Premium eyeglasses, designer sunglasses, and certified eye care on Newroad, Pokhara. 15+ years trusted service with 500+ frame styles.',
  keywords: ['opticals pokhara', 'eyeglasses pokhara', 'eye exam pokhara', 'designer frames', 'medical eye care', 'sunglasses pokhara'],
  authors: [{ name: 'Nile Opticals' }],
  openGraph: {
    title: 'Nile Opticals — Premium Eyewear in Pokhara',
    description: 'Crystal clear vision for everyone. Premium eyeglasses, sunglasses, and medical eye care.',
    type: 'website',
    url: 'https://nileopticals.com',
    siteName: 'Nile Opticals',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nile Opticals — Premium Eyewear in Pokhara',
    description: 'Crystal clear vision for everyone. Premium eyeglasses, sunglasses, and medical eye care.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#F5F4F0]">
      <body className={`font-sans antialiased bg-[#F5F4F0]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
