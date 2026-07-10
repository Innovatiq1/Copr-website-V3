import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'IT Consulting Services | Business Technology Consulting',
  description: 'Innovatiq IT Consulting Services provide strategic technology guidance, IT roadmap development, enterprise architecture, and digital strategy for businesses in Singapore.',
  keywords: 'IT Consulting, Technology Consulting, Digital Strategy, Enterprise Consulting, Business Technology, IT Roadmap, Enterprise Architecture, Singapore',
  alternates: { canonical: 'https://innovatiq.com.sg/services/it-consulting-services' },
  openGraph: {
    title: 'IT Consulting Services | Innovatiq Technologies',
    description: 'Strategic IT consulting to align technology with your business goals and drive sustainable growth.',
    url: 'https://innovatiq.com.sg/services/it-consulting-services',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Consulting Services | Innovatiq',
    description: 'Expert IT consulting to guide your technology strategy and business transformation.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://innovatiq.com.sg/services/it-consulting-services#service',
      name: 'IT Consulting & Technology Advisory Services',
      description: 'Innovatiq IT Consulting Services provide strategic technology guidance, IT roadmap development, enterprise architecture review, and vendor evaluation for businesses in Singapore.',
      url: 'https://innovatiq.com.sg/services/it-consulting-services',
      provider: { '@id': 'https://innovatiq.com.sg/#organization' },
      serviceType: 'IT Consulting and Advisory',
      areaServed: 'Singapore',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What IT consulting services does Innovatiq offer?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq offers strategic IT roadmap development, enterprise architecture design, vendor evaluation, change management coaching, gap analysis, and technology advisory services tailored to your business objectives.' },
        },
        {
          '@type': 'Question',
          name: 'How does Innovatiq approach IT consulting engagements?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq follows a four-stage process: Discovery (understanding challenges and objectives), Analysis (gap analysis and opportunity identification), Strategy (actionable roadmap development), and Execution (implementation support and outcome measurement).' },
        },
        {
          '@type': 'Question',
          name: 'Can Innovatiq help with IT governance frameworks?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq implements IT governance structures that ensure accountability, performance, and alignment — helping organisations manage risk and improve technology investment returns.' },
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
        { '@type': 'ListItem', position: 3, name: 'IT Consulting Services', item: 'https://innovatiq.com.sg/services/it-consulting-services' },
      ],
    },
  ],
};

export default function ConsultingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageTemplate
        h1Title="IT Consulting & Technology Advisory Services"
        badge="IT Consulting"
        title="Strategic IT Consulting Services"
        subtitle="Our Consulting Services provide strategic guidance, expertise, and tailored solutions to help businesses navigate complex challenges, drive innovation, and achieve sustainable growth."
        overview="With our integrated approach, industry insights, and collaborative partnership, we empower organisations to unlock their full potential and achieve their business objectives. As your trusted advisor and strategic partner, we collaborate closely with your team to understand your unique business challenges, goals, and aspirations."
        overviewPoints={[
          'Strategic guidance and IT roadmap development',
          'Customised solutions aligned with business objectives',
          'Industry insights and market trend analysis',
          'Enterprise architecture design and review',
          'Vendor evaluation and change management coaching',
        ]}
        benefits={[
          { title: 'Strategic Partnership', description: 'We collaborate closely with your team to understand your unique challenges and develop customised strategies that drive tangible outcomes.', icon: 'Handshake' },
          { title: 'Tailored Solutions', description: 'Tailored recommendations aligned with your business objectives and market trends — helping you overcome challenges and seize opportunities.', icon: 'Target' },
          { title: 'Business Transformation', description: 'Leverage our expertise and proven methodologies to optimise operations, drive efficiency, and foster innovation across your organisation.', icon: 'Rocket' },
          { title: 'Cost Optimisation', description: 'Identify inefficiencies and optimise technology spend for maximum ROI, ensuring every investment supports your core business objectives.', icon: 'Coins' },
          { title: 'Risk Management', description: 'Proactively identify and mitigate technology risks before they impact business continuity or bottom line.', icon: 'AlertTriangle' },
          { title: 'Governance Frameworks', description: 'Implement IT governance structures that ensure accountability, performance, and alignment across your organisation.', icon: 'BarChart3' },
        ]}
        processSteps={[
          { step: '1', title: 'Discovery', description: 'Deep-dive assessment of current state, challenges, and objectives.' },
          { step: '2', title: 'Analysis', description: 'Gap analysis and opportunity identification across technology domains.' },
          { step: '3', title: 'Strategy', description: 'Development of actionable roadmap with clear milestones and priorities.' },
          { step: '4', title: 'Execute', description: 'Support through implementation and measure business outcomes.' },
        ]}
        color="#BE123C"
        serviceType="consulting"
      />
    </>
  );
}
