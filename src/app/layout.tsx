import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RK ENTERPRISES | Hardware, Cement, Steel & Pipes Store - Parchur",
  description: "Wholesale and retail dealers in UltraTech, Deccan, Sagar Cement, Tata Tiscon & Vizag Steel TMT bars (8mm, 10mm, 12mm), MS & GI Pipes, JSW & Jindal Roofing Sheets, CPVC & PVC Plumbing joints, HDPE and Garden pipes. Near APSRTC Bus Stand, Parchur, Bapatla Dist - 523169. Call: 9948847768 / 9063646468.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans selection:bg-amber-200 selection:text-neutral-900">
        {children}
      </body>
    </html>
  );
}
