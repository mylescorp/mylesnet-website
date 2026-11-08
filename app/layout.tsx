import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteUrl } from "@/lib/site";

const body = Inter({ subsets: ["latin"], variable: "--font-inter" });
const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "MylesNet | WiFi access and support", template: "%s | MylesNet" },
  description: "Straightforward WiFi access, transparent voucher pricing, and direct support from MylesNet.",
  openGraph: { type: "website", locale: "en", siteName: "MylesNet", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `(()=>{try{const saved=localStorage.getItem('mylesnet-theme');const system=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=saved==='dark'||saved==='light'?saved:system}catch{document.documentElement.dataset.theme='light'}})()`;
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body className={`${body.variable} ${heading.variable}`}><Header /><main>{children}</main><Footer /><Analytics /></body></html>;
}
