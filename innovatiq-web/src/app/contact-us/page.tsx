import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Innovatiq Technologies | AI-powered IT Solutions',
  description: 'Contact Innovatiq Technologies for AI-powered IT Solutions, Digital Transformation, Cloud Services, Cyber Security, Managed IT Services, and enterprise software.',
  keywords: 'Contact Innovatiq, IT Company Singapore, AI Solutions Singapore, Cloud Services, Managed IT, Cyber Security, Technology Consulting, Innovatiq Technologies',
  alternates: { canonical: 'https://innovatiq.com.sg/contact-us' },
  openGraph: {
    title: 'Contact Innovatiq Technologies',
    description: 'Connect with our experts to discuss AI, Cloud, Cyber Security, Managed IT, and Digital Transformation solutions.',
    url: 'https://innovatiq.com.sg/contact-us',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Innovatiq Technologies',
    description: 'Talk to our AI and IT experts to accelerate your digital transformation journey.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://innovatiq.com.sg/contact-us#contactpage',
      url: 'https://innovatiq.com.sg/contact-us',
      name: 'Contact Innovatiq Technologies',
      description: 'Contact Innovatiq Technologies for AI-powered IT Solutions, Digital Transformation, Cloud Services, Cyber Security, and Managed IT Services.',
      isPartOf: { '@id': 'https://innovatiq.com.sg/#website' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://innovatiq.com.sg/#organization',
      name: 'Innovatiq Technologies',
      url: 'https://innovatiq.com.sg',
      logo: 'https://innovatiq.com.sg/logo/logo.png',
      email: 'info@innovatiq.com.sg',
      telephone: '+6567420955',
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
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://innovatiq.com.sg' },
        { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://innovatiq.com.sg/contact-us' },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
