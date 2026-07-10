import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'AI-Powered Cloud Services | Cloud Migration & Management',
  description: 'Innovatiq Cloud Services provide cloud migration, infrastructure management, cloud security, backup, disaster recovery, and scalable cloud solutions.',
  keywords: 'Cloud Services, Cloud Migration, Cloud Computing, AWS, Microsoft Azure, Google Cloud, Cloud Infrastructure, Managed Cloud, Singapore',
  alternates: { canonical: 'https://innovatiq.com.sg/services/cloud-services' },
  openGraph: {
    title: 'Cloud Services Singapore | Innovatiq',
    description: 'Scale your business with secure cloud infrastructure and migration services.',
    url: 'https://innovatiq.com.sg/services/cloud-services',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloud Services Singapore',
    description: 'Secure, scalable cloud solutions for modern businesses.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://innovatiq.com.sg/services/cloud-services#service',
      name: 'Cloud Services & Cloud Infrastructure Solutions',
      description: 'Innovatiq Cloud Services provide cloud migration, infrastructure management, cloud security, backup, disaster recovery, and scalable cloud solutions for businesses in Singapore.',
      url: 'https://innovatiq.com.sg/services/cloud-services',
      provider: { '@id': 'https://innovatiq.com.sg/#organization' },
      serviceType: 'Cloud Computing and Migration',
      areaServed: 'Singapore',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What cloud services does Innovatiq provide?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq provides IaaS, PaaS, and SaaS cloud solutions, cloud migration, cloud security, cost optimisation, disaster recovery, and 24/7 managed cloud operations for AWS, Microsoft Azure, and Google Cloud environments.' },
        },
        {
          '@type': 'Question',
          name: 'Does Innovatiq support cloud migration?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq delivers seamless cloud migration with a phased approach — from assessment and strategy through to zero-downtime migration and continuous optimisation.' },
        },
        {
          '@type': 'Question',
          name: 'Is cloud security included in Innovatiq\'s cloud services?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq includes enterprise-grade cloud security with automated threat detection, continuous monitoring, access controls, and compliance frameworks in all cloud service engagements.' },
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
        { '@type': 'ListItem', position: 3, name: 'Cloud Services', item: 'https://innovatiq.com.sg/services/cloud-services' },
      ],
    },
  ],
};

export default function CloudPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageTemplate
        h1Title="Cloud Services & Cloud Infrastructure Solutions"
        badge="Cloud Services"
        title="Secure Cloud Services"
        subtitle="Our Cloud Services empower businesses to scale, innovate, and succeed in the digital era. We enable organisations to harness the power of the cloud to drive agility, efficiency, and growth."
        overview="With our comprehensive suite of cloud solutions — including Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS) — we help organisations harness the power of the cloud. Whether you're starting your cloud journey or optimising an existing environment, our certified cloud architects deliver solutions that reduce costs, improve agility, and enhance security."
        overviewPoints={[
          'IaaS, PaaS, and SaaS solutions tailored to your business',
          'Seamless cloud migration with minimal disruption',
          'Cost optimisation and resource utilization management',
          'Cloud security and compliance frameworks',
          '24/7 cloud operations and monitoring',
        ]}
        benefits={[
          { title: 'Scalability and Flexibility', description: 'Scale resources up or down on-demand without upfront investments — adapting instantly to changing business needs.', icon: 'TrendingUp' },
          { title: 'Enhanced Business Agility', description: 'Rapidly deploy and scale resources to respond to market changes, seize opportunities, and innovate faster.', icon: 'Zap' },
          { title: 'Cost Optimisation', description: 'Pay-as-you-go cloud model reduces capital expenses and delivers better cost predictability for your IT spend.', icon: 'Coins' },
          { title: 'Enhanced Security', description: 'Enterprise-grade security controls with automated threat detection and continuous monitoring protecting your cloud environment.', icon: 'Lock' },
          { title: 'High Availability', description: 'Multi-region failover and disaster recovery ensuring uninterrupted access to critical resources and applications.', icon: 'Globe' },
          { title: 'Managed Operations', description: 'Fully managed cloud operations so your team can focus on core business objectives and innovation.', icon: 'Settings' },
        ]}
        processSteps={[
          { step: '1', title: 'Assessment', description: 'Evaluate current infrastructure and define cloud readiness.' },
          { step: '2', title: 'Strategy', description: 'Design the optimal cloud architecture and migration plan.' },
          { step: '3', title: 'Migration', description: 'Execute phased migration with zero-downtime approach.' },
          { step: '4', title: 'Optimise', description: 'Continuous optimisation for performance and cost efficiency.' },
        ]}
        color="#F43F5E"
        serviceType="cloud"
      />
    </>
  );
}
