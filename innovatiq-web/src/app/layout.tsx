import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://innovatiq.com.sg'),
  title: "Innovatiq Technologies | AI-Powered Digital Transformation",
  description: "Innovatiq Technologies delivers cutting-edge IT solutions, cloud services, cyber security, and digital transformation services across Singapore, India, and Malaysia.",
  keywords: "IT solutions, digital transformation, cloud services, cyber security, managed IT, Singapore",
  icons: {
    icon: [
      { url: '/logo/logo.png', type: 'image/png', sizes: '716x646' },
      { url: '/logo/logo.png', type: 'image/png', sizes: '32x32' },
      { url: '/logo/logo.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/logo/logo.png', sizes: '180x180' }],
    shortcut: '/logo/logo.png',
  },
  openGraph: {
    title: "Innovatiq Technologies",
    description: "AI-Powered Digital Transformation & IT Solutions",
    url: "https://innovatiq.com.sg",
    siteName: "Innovatiq Technologies",
    images: [
      {
        url: "/logo/logo.png",
        width: 716,
        height: 646,
        alt: "Innovatiq Technologies Logo",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Innovatiq Technologies",
    description: "AI-Powered Digital Transformation & IT Solutions",
    images: ["/logo/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TSG4PM3G');
        `}</Script>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6P7TMDL8DF" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6P7TMDL8DF');
        `}</Script>
      </head>
      <body className="antialiased font-[family-name:var(--font-sans)]">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TSG4PM3G"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div style={{ position: 'absolute', top: 0, right: 0, width: '60vw', height: '50vh', background: 'radial-gradient(ellipse at top right, rgba(190,18,60,0.04) 0%, transparent 65%)', }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50vw', height: '50vh', background: 'radial-gradient(ellipse at bottom left, rgba(244,63,94,0.03) 0%, transparent 65%)', }} />
        </div>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
