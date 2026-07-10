import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProductsSection from '@/components/home/ProductsSection';
import CounterSection from '@/components/CounterSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import VideoSection from '@/components/VideoSection';

export const metadata: Metadata = {
  title: 'Innovatiq Technologies | AI-Powered Digital Transformation',
  description: 'Innovatiq Technologies delivers AI-powered Digital Transformation, Managed IT Services, Cloud, Cyber Security, CRM, HRMS, LMS, and enterprise software solutions.',
  keywords: 'AI-Powered Patch Management System, AI Training Management System, AI Solutions Singapore, AI-Powered Managed IT Services, AI-Powered Cloud Services, AI-Powered Cyber Security, Enterprise Software, AI-Powered CRM Software, AI-Powered ATS Software, AI-Powered Learning Management System',
  alternates: { canonical: 'https://innovatiq.com.sg/' },
  openGraph: {
    title: 'AI-Powered IT Solutions | Innovatiq Technologies',
    description: 'Accelerate business growth with AI-powered Digital Transformation, Cloud, Cyber Security, Managed IT Services, CRM, HRMS, and Learning Solutions.',
    url: 'https://innovatiq.com.sg/',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered IT Solutions | Innovatiq Technologies',
    description: 'Helping businesses innovate with AI, Cloud, Cyber Security, Digital Transformation, CRM, HRMS, and LMS solutions.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://innovatiq.com.sg/#organization',
      name: 'Innovatiq Technologies',
      url: 'https://innovatiq.com.sg',
      logo: 'https://innovatiq.com.sg/logo/logo.png',
      email: 'info@innovatiq.com.sg',
      telephone: '+6567420955',
      sameAs: [],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://innovatiq.com.sg/#localbusiness',
      name: 'Innovatiq Technologies',
      url: 'https://innovatiq.com.sg',
      telephone: '+6567420955',
      email: 'info@innovatiq.com.sg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '60 Paya Lebar Road, #04-44, Paya Lebar Square',
        addressLocality: 'Singapore',
        postalCode: '409051',
        addressCountry: 'SG',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://innovatiq.com.sg/#website',
      url: 'https://innovatiq.com.sg',
      name: 'Innovatiq Technologies',
      publisher: { '@id': 'https://innovatiq.com.sg/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://innovatiq.com.sg' },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ProductsSection />
      <CounterSection />
      <TestimonialsSection />
      <VideoSection filterType="home" />
      <CtaSection />
    </>
  );
}
