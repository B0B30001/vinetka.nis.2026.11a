import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinetla — Virtual School Tours & Digital Yearbooks",
  description:
    "Explore your school through immersive 360° panoramas and digital yearbook experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-[family-name:var(--font-sans)] min-h-dvh">
        {children}
      </body>
    </html>
  );
}
