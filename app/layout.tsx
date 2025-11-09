import type { Metadata } from "next";
import { Geist, Geist_Mono, Story_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const storyScript = Story_Script({
  variable: "--font-story-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sadaqat Arts Painter",
  description: "Best Mural Painter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${storyScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
