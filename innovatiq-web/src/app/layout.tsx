import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Innovatiq Technologies | AI-Powered Digital Transformation",
  description: "Innovatiq Technologies delivers cutting-edge IT solutions, cloud services, cyber security, and digital transformation services across Singapore, India, and Malaysia.",
  keywords: "IT solutions, digital transformation, cloud services, cyber security, managed IT, Singapore",
  icons: {
    icon: "/images/innovatiq-logo.png",
    apple: "/images/innovatiq-logo.png",
    shortcut: "/images/innovatiq-logo.png",
  },
  openGraph: {
    title: "Innovatiq Technologies",
    description: "AI-Powered Digital Transformation & IT Solutions",
    images: ["/images/innovatiq-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="antialiased font-[family-name:var(--font-sans)]">
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div style={{ position: 'absolute', top: 0, right: 0, width: '60vw', height: '50vh', background: 'radial-gradient(ellipse at top right, rgba(190,18,60,0.04) 0%, transparent 65%)', }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50vw', height: '50vh', background: 'radial-gradient(ellipse at bottom left, rgba(244,63,94,0.03) 0%, transparent 65%)', }} />
        </div>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
