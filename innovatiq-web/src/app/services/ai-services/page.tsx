import type { Metadata } from 'next';
import AIServicesClient from './AIServicesClient';

export const metadata: Metadata = {
  title: 'AI Services Singapore | Artificial Intelligence Solutions',
  description: 'Accelerate business growth with Innovatiq AI Services. We deliver AI automation, Generative AI, Machine Learning, chatbots, and intelligent business solutions.',
  keywords: 'AI Services Singapore, Artificial Intelligence Solutions, AI Development, Generative AI, Machine Learning, AI Automation, Enterprise AI, AI Consulting, Business Automation, Innovatiq Technologies',
  alternates: { canonical: 'https://innovatiq.com.sg/services/ai-services' },
  openGraph: {
    title: 'AI Services | Innovatiq Technologies',
    description: 'Transform your business with AI-powered automation, machine learning, and intelligent enterprise solutions.',
    url: 'https://innovatiq.com.sg/services/ai-services',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Services Singapore',
    description: 'AI solutions that automate, innovate, and accelerate business growth.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://innovatiq.com.sg/services/ai-services#service',
      name: 'AI Services & Artificial Intelligence Solutions',
      description: 'Innovatiq delivers enterprise AI services including AI automation, Generative AI, Machine Learning, chatbots, and intelligent business solutions for digital transformation.',
      url: 'https://innovatiq.com.sg/services/ai-services',
      provider: { '@id': 'https://innovatiq.com.sg/#organization' },
      serviceType: 'AI Consulting and Development',
      areaServed: 'Singapore',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What AI services does Innovatiq offer?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq offers AI consulting, AI transformation roadmaps, intelligent automation, document processing, knowledge assistants, AI agents and copilots, and enterprise AI development services.' },
        },
        {
          '@type': 'Question',
          name: 'Does Innovatiq provide Generative AI solutions?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq develops Generative AI applications including content generation, knowledge assistants, AI copilots, and intelligent chatbots for enterprise use cases.' },
        },
        {
          '@type': 'Question',
          name: 'Which industries does Innovatiq serve with AI?',
          acceptedAnswer: { '@type': 'Answer', text: "Innovatiq's AI services are deployed across healthcare, banking and financial services, manufacturing, government, education, and retail sectors." },
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
        { '@type': 'ListItem', position: 3, name: 'AI Services', item: 'https://innovatiq.com.sg/services/ai-services' },
      ],
    },
  ],
};

export default function AIServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AIServicesClient />
    </>
  );
}
