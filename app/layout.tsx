import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

let title = "DashGen – AI Dashboard Generator";
let description = "Generate beautiful, interactive dashboards from your data with advanced AI";
let url = "https://dashgen.app/";
let ogimage = "https://dashgen.app/og-image.png";
let sitename = "DashGen";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <head>
        <PlausibleProvider domain="xcoder.app" />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
