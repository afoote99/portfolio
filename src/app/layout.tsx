import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Allan Foote — AI Application Developer",
  description:
    "I build AI-powered products end to end — shipping LLM applications with Claude and OpenAI. An interactive map of the things I've built.",
  openGraph: {
    title: "Allan Foote — AI Application Developer",
    description:
      "I build AI-powered products end to end. An interactive map of the things I've built.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
