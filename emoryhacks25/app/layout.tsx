import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "GalleryBoard",
  description: "Individual whiteboards for collaborative classrooms",
};

// Using Lato from Google Fonts
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: "300",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
