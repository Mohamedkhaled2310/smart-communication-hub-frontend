import type { Metadata } from "next";
import { Changa } from "next/font/google";
import "./globals.css";

const changa = Changa({
  subsets: ["latin", "arabic"],
  variable: "--font-changa",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tawassul",
  description: "A smart communication hub for seamless connectivity.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${changa.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
