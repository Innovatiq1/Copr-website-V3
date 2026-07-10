import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Cyber Security Services | Enterprise Security Solutions',
  description: 'Protect your organization with Innovatiq AI-Powered Cyber Security including vulnerability assessment, penetration testing, endpoint security, and threat monitoring.',
  keywords: 'Cyber Security, Cyber Security Singapore, Vulnerability Assessment, Endpoint Security, Penetration Testing, IT Security, Threat Protection, Security Consulting',
  alternates: { canonical: 'https://innovatiq.com.sg/services/cyber-security-services' },
  openGraph: {
    title: 'Cyber Security Services | Innovatiq',
    description: 'Protect your business with advanced cyber security and threat protection solutions.',
    url: 'https://innovatiq.com.sg/services/cyber-security-services',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Security Services',
    description: 'Enterprise-grade cyber security for modern organizations.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://innovatiq.com.sg/services/cyber-security-services#service',
      name: 'Cyber Security Services & Enterprise Protection',
      description: 'Innovatiq provides AI-powered cyber security services including vulnerability assessment, penetration testing, endpoint security, and continuous threat monitoring for enterprise organisations.',
      url: 'https://innovatiq.com.sg/services/cyber-security-services',
      provider: { '@id': 'https://innovatiq.com.sg/#organization' },
      serviceType: 'Cyber Security Services',
      areaServed: 'Singapore',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What cyber security services does Innovatiq provide?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq provides proactive threat detection, vulnerability management, penetration testing, endpoint security, incident response, compliance assurance (PDPA, ISO 27001, GDPR), and security awareness training.' },
        },
        {
          '@type': 'Question',
          name: 'Does Innovatiq offer 24/7 security monitoring?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq delivers continuous 24/7 threat monitoring, threat hunting, and incident response capabilities to keep your organisation secure around the clock.' },
        },
        {
          '@type': 'Question',
          name: 'Does Innovatiq\'s cyber security cover regulatory compliance?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq helps organisations achieve and maintain compliance with PDPA, GDPR, ISO 27001, and industry-specific security standards through robust controls and audit-ready frameworks.' },
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
        { '@type': 'ListItem', position: 3, name: 'Cyber Security Services', item: 'https://innovatiq.com.sg/services/cyber-security-services' },
      ],
    },
  ],
};

export default function CyberSecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageTemplate
        h1Title="Cyber Security Services & Enterprise Protection"
        badge="Cyber Security"
        title="Advanced Cybersecurity Solutions"
        subtitle="Our Cyber Security services offer comprehensive protection against evolving cyber threats, safeguarding businesses from data breaches, malware attacks, and other cyber risks."
        overview="With our proactive approach to cybersecurity, advanced threat detection, and incident response capabilities, we help organisations build resilience and defend against cyber threats effectively. Our comprehensive protection covers everything from vulnerability management to 24/7 security operations."
        overviewPoints={[
          'Proactive threat detection and continuous monitoring',
          'Advanced incident response and recovery capabilities',
          'Data protection, encryption, and access control',
          'Regulatory compliance (PDPA, ISO 27001, GDPR)',
          'Security risk assessment and mitigation strategies',
        ]}
        benefits={[
          { title: 'Proactive Threat Detection', description: 'Continuous monitoring to identify and neutralize threats before they escalate — keeping your business one step ahead.', icon: 'Search' },
          { title: 'Enhanced Data Protection', description: 'Secure sensitive data, prevent unauthorized access, and maintain regulatory compliance across your entire environment.', icon: 'Shield' },
          { title: 'Risk Mitigation', description: 'Reduce exposure to financial, reputational, and legal damage by proactively managing your cyber risk posture.', icon: 'AlertTriangle' },
          { title: 'Incident Response', description: 'Rapid response team to contain, analyze, and remediate security incidents — minimizing downtime and business impact.', icon: 'Siren' },
          { title: 'Compliance Assurance', description: 'Meet PDPA, GDPR, ISO 27001, and industry-specific regulatory requirements with confidence and audit readiness.', icon: 'ClipboardList' },
          { title: 'Security Awareness', description: 'Employee awareness training and security culture building to make your people your strongest security asset.', icon: 'GraduationCap' },
        ]}
        processSteps={[
          { step: '1', title: 'Assess', description: 'Identify vulnerabilities and security gaps across your environment.' },
          { step: '2', title: 'Design', description: 'Build a comprehensive security architecture and roadmap.' },
          { step: '3', title: 'Deploy', description: 'Implement security controls, tools, and monitoring systems.' },
          { step: '4', title: 'Monitor', description: 'Ongoing 24/7 monitoring, threat hunting, and incident response.' },
        ]}
        color="#BE123C"
        serviceType="cyber"
      />
    </>
  );
}
