import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/chatbot/ChatWidget";

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
  title: "Dr. Navneet Agrawal | Pediatric Dentist in Indore | Agrawal Dental Care",
  description:
    "Expert pediatric dental care in Indore by Dr. Navneet Agrawal. Specializing in child dentistry, painless treatments, and smile transformations at Agrawal Dental Care Indore.",
  keywords: [
    "Pediatric Dentist Indore",
    "Pedodontist Indore",
    "Child Dentist Indore",
    "Agrawal Dental Care Indore",
    "Dr. Navneet Agrawal",
    "Best Kids Dentist Indore",
    "Painless Dental Treatment Indore",
  ],
  openGraph: {
    title: "Dr. Navneet Agrawal | Best Pediatric Dentist in Indore",
    description:
      "Transform your child's smile with expert care at Agrawal Dental Care Indore by Dr. Navneet Agrawal.",
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
        <ChatWidget />
      </body>
    </html>
  );
}
