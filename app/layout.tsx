import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Roasted Nomad | Coffee, Brunch & Cocktails — Winnipeg',
  description: 'Roasted Nomad is Winnipeg\'s warmest corner. Coffee, brunch, and cocktails at 393 Marion Street in St. Boniface. Open Tuesday–Sunday 8AM–2:30PM. First come, first served.',
  keywords: 'Roasted Nomad, Winnipeg brunch, Winnipeg coffee shop, St. Boniface restaurant, brunch Winnipeg, coffee Winnipeg, cocktails Winnipeg, Marion Street cafe, eggs benedict Winnipeg, best brunch Winnipeg',
  authors: [{ name: 'Roasted Nomad' }],
  creator: 'Roasted Nomad',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://roasted-nomad.vercel.app',
    siteName: 'Roasted Nomad',
    title: 'Roasted Nomad | Coffee, Brunch & Cocktails — Winnipeg',
    description: 'Winnipeg\'s warmest corner. Coffee, brunch, and cocktails at 393 Marion Street. Open Tue–Sun 8AM–2:30PM.',
    images: [
      {
        url: '/images/interior-dining.jpg',
        width: 1200,
        height: 630,
        alt: 'Roasted Nomad interior — Coffee, Brunch & Cocktails in Winnipeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roasted Nomad | Coffee, Brunch & Cocktails — Winnipeg',
    description: 'Winnipeg\'s warmest corner. Coffee, brunch, and cocktails at 393 Marion Street.',
    images: ['/images/interior-dining.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://roasted-nomad.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Inter:wght@400;500;600;800&family=Pinyon+Script&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(require('../public/schema.json')) }}
        />
      </head>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
