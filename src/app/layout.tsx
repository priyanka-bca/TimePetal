import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth";
import { AuthModal } from "@/components/auth-modal";

export const metadata: Metadata = {
  title: "TimePetal • Your Private Space for Memories & Emotions",
  description: "A private, beautiful digital diary. Write daily journals, track mood analytics, preserve photo albums, and plant future time-capsule letters.",
  keywords: ["digital diary", "timepetal", "private journal", "mood tracker", "future letters", "photo album vault", "memory timeline", "aesthetic journal"],
  openGraph: {
    title: "TimePetal • Private Digital Diary & Memory Preservation",
    description: "Preserve life's softest moments with rich text journaling, mood trends, photo albums, and time-capsule letters.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://time-petal.vercel.app",
    siteName: "TimePetal",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "TimePetal Digital Diary Application"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "TimePetal • Private Digital Diary",
    description: "A private, calming, aesthetic digital diary for memories, mood tracking, and future letters."
  }
};

import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "TimePetal",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "All",
              "description": "A private, beautiful digital diary where users write memories, store photos, record emotions, and plant future letters.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <ThemeProvider>
            <AuthProvider>
              {children}
              <AuthModal />
            </AuthProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
