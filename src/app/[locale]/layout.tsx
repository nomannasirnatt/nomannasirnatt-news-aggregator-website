import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PageParamsType } from '@/types';
import Providers from "../provider";
import Header from "@/components/Header";
import Head from 'next/head';
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "THE LOST CHAPTER",
  description: "THE LOST CHAPTER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: PageParamsType;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className} suppressHydrationWarning={true}>
          <Header />
          <main><Providers>{children}</Providers></main>
      </body>
    </html>
  );
}
