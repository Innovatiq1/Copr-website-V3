import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'IT Field Services | Onsite Technical Support',
  description: 'Innovatiq IT Field Services provide onsite technical support, hardware maintenance, breakfix services, and 24/7 technician dispatch for businesses across Singapore.',
  keywords: 'IT Field Services, Onsite IT Support, Hardware Support, Technical Support, Breakfix Services, Field Technician, IT Maintenance Singapore',
  alternates: { canonical: 'https://innovatiq.com.sg/services/field-service-management' },
  openGraph: {
    title: 'IT Field Services | Innovatiq Technologies',
    description: 'Professional onsite IT support and breakfix services with 24/7 technician dispatch.',
    url: 'https://innovatiq.com.sg/services/field-service-management',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Field Services | Innovatiq',
    description: 'Professional onsite IT support and rapid hardware breakfix services.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://innovatiq.com.sg/services/field-service-management#service',
      name: 'Professional IT Field Services',
      description: 'Innovatiq IT Field Services provide onsite technical support, hardware maintenance, breakfix services, service desk management, and 24/7 technician dispatch across Singapore.',
      url: 'https://innovatiq.com.sg/services/field-service-management',
      provider: { '@id': 'https://innovatiq.com.sg/#organization' },
      serviceType: 'IT Field Services and Onsite Support',
      areaServed: 'Singapore',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What IT field services does Innovatiq provide?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq provides onsite breakfix support, L1 troubleshooting, hardware replacement, vendor coordination, service desk management, warehousing, and 24/7 technician dispatch services.' },
        },
        {
          '@type': 'Question',
          name: 'How quickly does Innovatiq dispatch field technicians?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq dispatches qualified technicians promptly based on skills and location — available around the clock to minimise downtime and restore operations quickly.' },
        },
        {
          '@type': 'Question',
          name: 'Does Innovatiq provide transparent pricing for field services?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq provides comprehensive quotes upfront with clear, cost-effective pricing — no hidden surprises.' },
        },
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://innovatiq.com.sg/#organization',
      name: 'Innovatiq Technologies',
      url: 'https://innovatiq.com.sg',
      logo: 'https://innovatiq.com.sg/logo/logo.png',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://innovatiq.com.sg' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://innovatiq.com.sg/#services' },
        { '@type': 'ListItem', position: 3, name: 'IT Field Services', item: 'https://innovatiq.com.sg/services/field-service-management' },
      ],
    },
  ],
};

export default function FieldServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageTemplate
        h1Title="Professional IT Field Services"
        badge="Field Services"
        title="Professional IT Field Services"
        subtitle="At Innovatiq, we understand the critical importance of maintaining uninterrupted operations in today's fast-paced digital landscape. That's why we offer comprehensive breakfix support services."
        overview="Our dedicated team of skilled technicians is equipped with the expertise and tools necessary to diagnose, troubleshoot, and resolve a wide range of software, hardware, and network-related issues. Our technicians are available around the clock to provide timely assistance and minimize downtime — whether it's resolving software glitches, replacing hardware, or restoring network connectivity."
        overviewPoints={[
          'Troubleshooting and L1 support for all IT issues',
          'Seamless vendor support and coordination',
          'Comprehensive service desk management',
          'Warehousing and component replacement services',
          'Breakfix support with 24/7 technician dispatch',
        ]}
        benefits={[
          { title: 'Local Support', description: 'Swift dispatch of qualified technicians to your site for any break/fix need — wherever you are.', icon: 'MapPin' },
          { title: 'Technician Management', description: 'End-to-end dispatch management — from site evaluation and check-in to ticket closure — handled seamlessly.', icon: 'HardHat' },
          { title: 'Highly Qualified Technicians', description: 'Rigorously screened, skilled field technicians available around the clock to restore your operations fast.', icon: 'Trophy' },
          { title: 'Swift Problem Resolution', description: 'Prompt diagnosis, effective solutions, and efficient fixes — minimizing disruption to your business operations.', icon: 'Rocket' },
          { title: 'Customised Solutions', description: 'Break-fix services tailored to your specific technology environment and business requirements.', icon: 'Target' },
          { title: 'Transparent Pricing', description: 'Comprehensive quotes provided upfront — clear, cost-effective pricing with no hidden surprises.', icon: 'Coins' },
        ]}
        processSteps={[
          { step: '1', title: 'Request', description: 'Submit service request through portal, phone, or email.' },
          { step: '2', title: 'Dispatch', description: 'Qualified engineer dispatched based on skills and location.' },
          { step: '3', title: 'Execute', description: 'Professional on-site service delivery with full documentation.' },
          { step: '4', title: 'Report', description: 'Detailed service report and sign-off shared with client within 24 hours.' },
        ]}
        color="#BE123C"
        serviceType="field"
      />
    </>
  );
}
