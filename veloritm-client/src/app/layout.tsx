import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { AppChrome } from "@/components/layout/AppChrome";
import { CookieConsent } from "@/components/CookieConsent";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  display: "swap",
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — велосипеди, запчастини й аксесуари в Україні`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "велосипеди",
    "купити велосипед",
    "велозапчастини",
    "велоаксесуари",
    "сервісний центр",
    "MTB",
    "шосейний велосипед",
    "електровелосипед",
    "Кременчук",
    "Україна",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "uk-UA": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    alternateLocale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: site.name,
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
    title: site.name,
    description: site.description,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#06081a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uk"
      translate="no"
      suppressHydrationWarning
      className={`${inter.variable} ${oswald.variable}`}
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body suppressHydrationWarning>
        <AppChrome>{children}</AppChrome>
        <CookieConsent />
        <JsonLd data={organizationLd()} id="ld-organization" />
        <JsonLd data={websiteLd()} id="ld-website" />
      </body>
    </html>
  );
}
