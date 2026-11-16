import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DemoBanner } from "@/components/demo-banner";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["500", "600"] });

export const metadata: Metadata = {
  title: "GalleryBoard: a live whiteboard for every student",
  description:
    "Students join with a code and draw on their own private board. The teacher sees every board update live, side by side.",
};

export const viewport: Viewport = {
  themeColor: "#f9f9f7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <DemoBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
