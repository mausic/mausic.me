import "css/tailwind.css";
import "css/custom.css";
// import 'pliny/search/algolia.css'

import { Inter } from "next/font/google";
import { Analytics, AnalyticsConfig } from "pliny/analytics";
import { SearchProvider, SearchConfig } from "pliny/search";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteMetadata from "@/data/siteMetadata";
import { ThemeProviders } from "./theme-providers";
import { Metadata } from "next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import SectionContainer from "@/components/SectionContainer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: "summary_large_image",
    images: [siteMetadata.socialBanner],
    description: siteMetadata.description,
    creator: siteMetadata.twitter,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        <ThemeProviders>
          <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-svh flex-col bg-background">
                <div data-wrapper="" className="flex flex-1 flex-col">
                  <Header />
                  <div className="mx-auto w-full flex-1">
                    <SectionContainer>
                      <main className="px-4">{children}</main>
                    </SectionContainer>
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </SearchProvider>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <VercelAnalytics />
          <Toaster />
        </ThemeProviders>
      </body>
    </html>
  );
}
