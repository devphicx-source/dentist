import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DentaCare Premium | Best Dentist in Your City",
  description:
    "Advanced, pain-free dental treatments with world-class care. Transform your smile with our expert dental team. Serving patients with 15+ years of experience.",
  keywords: [
    "best dentist",
    "dental clinic",
    "teeth whitening",
    "dental implants",
    "root canal treatment",
    "smile makeover",
    "invisalign",
    "braces",
  ],
  openGraph: {
    title: "DentaCare Premium | Transform Your Smile",
    description:
      "Advanced, pain-free dental treatments with world-class care.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
