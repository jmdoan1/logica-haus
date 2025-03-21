import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import ProgressWheel from "./components/progress-wheel";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LogicaHaus",
    template: "%s | LogicaHaus",
  },
  description: "Custom Software Engineering Solutions",
  openGraph: {
    title: "LogicaHaus",
    description: "Custom Software Engineering Solutions",
    url: baseUrl,
    siteName: "LogicaHaus",
    locale: "en_US",
    type: "website",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    images: "/og-image.png",
  },
  keywords: [
    "LogicaHaus",
    "logic",
    "software development",
    "bespoke software",
    "bespoke",
    "Tulsa",
    "Oklahoma",
    "Florida",
    "Jacksonville",
    "custom",
    "US",
    "USA",
    "U.S.",
    "U.S.A",
    "America",
    "American",
    "software",
    "frontend",
    "backend",
    "API",
    "database",
    "sql",
    "mongodb",
    "app developer",
    "web developer",
    "development",
    "agency",
    "developer",
    "freelance",
    "custom",
    "custom software",
    "bots",
    "scripts",
    "Slack",
  ],
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
  generator: "Next.js",
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      id="canvas"
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <link rel="icon" href="/assets/logo/logo-1-light-w-bg.svg" />
        <Script src="../progress.js" strategy="afterInteractive" />
        {/* <Script src="../hacker.js" strategy="afterInteractive" /> */}
      </head>
      <body className="antialiased mx-4 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-4 flex flex-col px-2 md:px-0">
          <ProgressWheel />
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
