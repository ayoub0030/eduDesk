import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { OcrProvider } from "@/lib/ocr-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyTube - Learning Platform",
  description: "Interactive learning platform for students and teachers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white min-h-screen text-gray-900`}>
        <OcrProvider>
          <main className="flex flex-col w-full h-full min-h-screen">
            {children}
          </main>
          <Toaster />
        </OcrProvider>
      </body>
    </html>
  );
}
