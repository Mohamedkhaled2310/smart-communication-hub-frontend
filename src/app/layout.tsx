import type { Metadata } from "next";
import { Changa } from "next/font/google";
import "./globals.css";

const changa = Changa({
  subsets: ["latin", "arabic"], // include arabic for proper Arabic rendering
  variable: "--font-changa",
  weight: ["400", "500", "600", "700"], // adjust weights as needed
});

export const metadata: Metadata = {
  title: "Twasol",
  description: "A smart communication hub for seamless connectivity.",
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
