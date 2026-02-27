import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import CelebrationOverlay from "@/components/CelebrationOverlay";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Founders Circle | Premium NFT Ecosystem",
  description: "Join the elite community of early adopters and founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable}`}>
        <AuthProvider>
          <CelebrationOverlay />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
