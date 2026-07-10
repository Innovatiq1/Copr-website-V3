import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Managed IT Services Singapore | 24/7 IT Support',
  description: 'Innovatiq provides Managed IT Services including infrastructure management, helpdesk support, network monitoring, cloud management, and proactive IT support.',
  keywords: 'Managed IT Services, IT Support Singapore, IT Infrastructure, Network Monitoring, Helpdesk Services, Managed Services, IT Outsourcing, Business IT Solutions',
  alternates: { canonical: 'https://innovatiq.com.sg/services/managed-it-services' },
  openGraph: {
    title: 'Managed IT Services Singapore | Innovatiq',
    description: 'Reliable managed IT services with proactive monitoring and expert support.',
    url: 'https://innovatiq.com.sg/services/managed-it-services',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Managed IT Services',
    description: 'Reliable IT support that keeps your business running.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://innovatiq.com.sg/services/managed-it-services#service',
      name: 'Managed IT Services for Modern Businesses',
      description: 'Innovatiq provides managed IT services including infrastructure management, helpdesk support, network monitoring, cloud management, and 24/7 proactive IT support for businesses in Singapore.',
      url: 'https://innovatiq.com.sg/services/managed-it-services',
      provider: { '@id': 'https://innovatiq.com.sg/#organization' },
      serviceType: 'Managed IT Services',
      areaServed: 'Singapore',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What managed IT services does Innovatiq provide?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq provides IT infrastructure management, 24/7 helpdesk support, network monitoring, proactive maintenance, IT staffing, and managed cloud operations for organisations in Singapore.' },
        },
        {
          '@type': 'Question',
          name: 'Does Innovatiq offer 24/7 IT support?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq provides 24/7 helpdesk and technical support with SLA guarantees, proactive monitoring, and rapid issue resolution to minimise downtime.' },
        },
        {
          '@type': 'Question',
          name: 'Can Innovatiq scale IT support as my business grows?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq\'s managed IT services are fully scalable — you can increase or decrease resources to match changing business demands without disruption to your operations.' },
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
        { '@type': 'ListItem', position: 3, name: 'Managed IT Services', item: 'https://innovatiq.com.sg/services/managed-it-services' },
      ],
    },
  ],
};

export default function ManagedITPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageTemplate
        h1Title="Managed IT Services for Modern Businesses"
        badge="Managed IT Services"
        title="Reliable Managed IT Services"
        subtitle="In the rapidly evolving world of technology, businesses often find it challenging to keep up with the pace while ensuring operational efficiency. This is where IT Staffing and Managed Services come into play."
        overview="Our IT Staffing and Managed Services offer a comprehensive solution to meet your organisation's talent needs and IT infrastructure management requirements. With a focus on delivering top-notch talent and ensuring the smooth operation of your IT systems, we provide a seamless experience that allows you to focus on your core business objectives while we handle the rest."
        overviewPoints={[
          'Extensive network of highly skilled IT professionals',
          'Customised solution design aligned with your strategic goals',
          'Proactive monitoring, maintenance, and support',
          'Scalable staffing to match evolving business needs',
          '24/7 helpdesk and technical support with SLA guarantee',
        ]}
        benefits={[
          { title: 'Extensive Talent Network', description: 'Quickly identify and onboard skilled IT professionals to meet your specific project or staffing requirements.', icon: 'Users' },
          { title: 'Customised Solution Design', description: 'Solutions designed around your unique staffing needs and strategic goals — not a one-size-fits-all approach.', icon: 'Target' },
          { title: 'Proactive Support & Management', description: 'Proactive monitoring, maintenance, and support ensuring optimal performance and security with minimal downtime.', icon: 'Radio' },
          { title: 'Enhanced Productivity', description: 'Access top-tier IT talent who deliver results from day one, boosting team output and project success.', icon: 'Zap' },
          { title: 'Scalability and Flexibility', description: 'Scale your IT resources up or down to match changing business demands without disruption.', icon: 'TrendingUp' },
          { title: 'Reduced Downtime and Risk', description: 'Outsourced infrastructure management reduces downtime risk, data breaches, and security incidents.', icon: 'Shield' },
        ]}
        processSteps={[
          { step: '1', title: 'Onboard', description: 'Document your environment and establish monitoring baselines.' },
          { step: '2', title: 'Monitor', description: '24/7 automated monitoring of all systems and applications.' },
          { step: '3', title: 'Resolve', description: 'Proactive issue resolution before business impact occurs.' },
          { step: '4', title: 'Report', description: 'Regular reporting and strategic IT reviews with your team.' },
        ]}
        color="#BE123C"
        investmentCards={[
          { title: 'Cost Savings', description: 'By leveraging our managed services and staffing solutions, organisations can significantly reduce operational costs associated with hiring, training, and managing in-house IT staff, as well as ongoing infrastructure maintenance and upgrades — enabling smarter budget allocation.', icon: 'Coins' },
          { title: 'Strategic Investment', description: 'Invest in our IT Staffing and Managed Services to align your workforce and IT capabilities with your strategic objectives. By partnering with us, you can ensure that your staffing and IT infrastructure investments are aligned with your business goals, enabling you to achieve better outcomes, drive innovation, and maintain a competitive edge in the marketplace.', icon: 'BarChart3' },
          { title: 'Focus on Core Competencies', description: 'By entrusting your IT staffing and infrastructure management to us, your organisation can redirect valuable time, resources, and leadership attention towards core business activities and strategic initiatives — driving growth and improving your overall competitive advantage.', icon: 'Target' },
        ]}
        serviceType="managedIT"
      />
    </>
  );
}
