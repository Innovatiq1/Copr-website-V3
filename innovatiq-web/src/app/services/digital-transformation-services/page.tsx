import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'AI-Powered Digital Transformation | AI Business Solutions',
  description: 'Empower your business with AI-powered Digital Transformation services, workflow automation, cloud adoption, and enterprise modernization by Innovatiq.',
  keywords: 'Digital Transformation, AI Digital Transformation, Business Process Automation, Enterprise Modernization, Workflow Automation, Digital Consulting, Business Innovation, Singapore',
  alternates: { canonical: 'https://innovatiq.com.sg/services/digital-transformation-services' },
  openGraph: {
    title: 'Digital Transformation Services | Innovatiq',
    description: 'Transform business operations with AI, automation, cloud technologies, and enterprise modernization.',
    url: 'https://innovatiq.com.sg/services/digital-transformation-services',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Transformation Services',
    description: 'Accelerate innovation with AI-powered digital transformation.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://innovatiq.com.sg/services/digital-transformation-services#service',
      name: 'AI-Powered Digital Transformation Services',
      description: 'Innovatiq delivers AI-powered digital transformation services including workflow automation, cloud adoption, and enterprise modernization for businesses in Singapore.',
      url: 'https://innovatiq.com.sg/services/digital-transformation-services',
      provider: { '@id': 'https://innovatiq.com.sg/#organization' },
      serviceType: 'Digital Transformation Consulting',
      areaServed: 'Singapore',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is AI-powered Digital Transformation?',
          acceptedAnswer: { '@type': 'Answer', text: 'AI-powered Digital Transformation involves integrating artificial intelligence into business processes, workflows, and operations to drive automation, improve efficiency, and enable data-driven decision-making across the enterprise.' },
        },
        {
          '@type': 'Question',
          name: 'What digital transformation services does Innovatiq provide?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq provides end-to-end digital transformation strategy, AI integration into business processes, intelligent workflow automation, customer experience modernization, and data analytics platforms.' },
        },
        {
          '@type': 'Question',
          name: 'How does Innovatiq approach digital transformation?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq follows a phased approach: Vision (defining objectives), Design (target operating model), Build (agile development), and Scale (embedding change organisation-wide).' },
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
        { '@type': 'ListItem', position: 3, name: 'Digital Transformation Services', item: 'https://innovatiq.com.sg/services/digital-transformation-services' },
      ],
    },
  ],
};

export default function DigitalTransformationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageTemplate
        h1Title="AI-Powered Digital Transformation Services"
        badge="Digital Transformation"
        title="Digital Transformation for Modern Enterprises"
        subtitle="At Innovatiq, we help organisations strategically adopt digital technologies to modernize operations, enhance efficiency, and drive sustainable growth."
        overview="Our end-to-end transformation framework, integrating strategy, AI-driven technology, and organisational culture, enables businesses to achieve digital maturity and stay competitive in a rapidly evolving landscape. Our AI-driven Digital Transformation services integrate strategy, technology, and culture into a unified framework that empowers organisations to embrace intelligent automation and accelerate innovation."
        overviewPoints={[
          'End-to-end digital transformation strategy and execution',
          'AI and machine learning integration into business processes',
          'Intelligent automation and workflow optimisation',
          'Customer experience (CX) modernization with AI insights',
          'Data analytics and business intelligence platforms',
        ]}
        benefits={[
          { title: 'AI-Driven End-to-End Transformation', description: 'Integrate strategy, technology, and culture into a unified AI-driven framework to embrace automation and achieve sustainable growth.', icon: 'Bot' },
          { title: 'AI-Enhanced Customer Experience', description: 'Elevate customer engagement through personalised experiences, predictive service delivery, and smarter interaction models powered by AI.', icon: 'Sparkles' },
          { title: 'AI-Driven Competitive Advantage', description: 'Embed intelligence into business processes and decision-making to strengthen your brand and stay ahead of market shifts.', icon: 'Brain' },
          { title: 'Operational Efficiency', description: 'Streamline operations and reduce costs through digital optimisation and intelligent process automation across your organisation.', icon: 'Settings' },
          { title: 'New Revenue Streams', description: 'Identify and capitalize on new business opportunities unlocked by digital transformation and AI-driven innovation.', icon: 'Lightbulb' },
          { title: 'Data-Driven Culture', description: 'Build a data-first culture with real-time analytics, dashboards, and insights that drive informed decision-making at every level.', icon: 'BarChart3' },
        ]}
        processSteps={[
          { step: '1', title: 'Vision', description: 'Define the digital vision and transformation objectives.' },
          { step: '2', title: 'Design', description: 'Design the target operating model and AI-driven technology architecture.' },
          { step: '3', title: 'Build', description: 'Develop and deploy digital solutions in agile sprints.' },
          { step: '4', title: 'Scale', description: 'Scale successful pilots and embed change across the organisation.' },
        ]}
        color="#BE123C"
        serviceType="digital"
      />
    </>
  );
}
