import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://unpkg.com/framer-motion@10.12.16/dist/framer-motion.js" strategy="afterInteractive" />
      </head>
      <body className={`${inter.className} bg-gray-100`}>
        {children}
      </body>
    </html>
  );
}
