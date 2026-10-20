import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import SurveyModal from "@/components/SurveyModal";
import AttributionInit from "@/components/AttributionInit";
import { siteConfig } from "@/lib/site-config";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} — Private PPO Health Coverage, Reviewed By A Licensed Advisor`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Private PPO Health Coverage`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    images: [{ url: siteConfig.brand.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Private PPO Health Coverage`,
    description: siteConfig.description,
    images: [siteConfig.brand.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#173966",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName || siteConfig.name,
    alternateName: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}${siteConfig.brand.logo}`,
    description: siteConfig.description,
    areaServed: "US",
    ...(siteConfig.showPhone && siteConfig.phoneTel
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            telephone: siteConfig.phoneTel,
            contactType: "customer service",
            areaServed: "US",
            availableLanguage: "English",
          },
        }
      : {}),
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh pb-16 lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <AttributionInit />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCTA />
        <SurveyModal />
        <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(schema)}
        </Script>
      </body>
    </html>
  );
}
