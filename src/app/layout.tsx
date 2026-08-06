import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "DearDiary • Your Private Space for Memories & Emotions",
  description: "A private, beautiful, and end-to-end encrypted digital diary. Write daily journals, record voice notes, track mood analytics, preserve photo albums, and seal future time-capsule letters.",
  keywords: ["digital diary", "private journal", "mood tracker", "future letters", "photo album vault", "memory timeline", "aesthetic journal"],
  openGraph: {
    title: "DearDiary • Private Digital Diary & Memory Preservation",
    description: "Preserve life's softest moments with rich text journaling, voice clips, mood trends, photo albums, and time-capsule letters.",
    url: "https://deardiary.app",
    siteName: "DearDiary",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "DearDiary Digital Diary Application"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DearDiary • Private Digital Diary",
    description: "A private, calming, aesthetic digital diary for memories, mood tracking, and future letters."
  }
};

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
              "name": "DearDiary",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "All",
              "description": "A private, beautiful digital diary where users write memories, store photos, record emotions, and seal future letters.",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
