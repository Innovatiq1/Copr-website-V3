import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'SecurOn Patch Management System | Innovatiq Technologies',
  description: 'SecurOn by Innovatiq is an AI-powered Patch Management System that automates vulnerability detection, patch deployment, and compliance monitoring across enterprise IT infrastructure.',
  keywords: 'Patch Management System, PMS, SecurOn, AI Cyber Security, Vulnerability Management, IT Security Software, Endpoint Protection Singapore',
  alternates: { canonical: 'https://innovatiq.com.sg/product/securon-patch-management-system' },
  openGraph: {
    title: 'SecurOn AI Patch Management System',
    description: 'Automate patch deployment, monitor vulnerabilities, and ensure compliance with SecurOn\'s AI-powered security platform.',
    url: 'https://innovatiq.com.sg/product/securon-patch-management-system',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SecurOn Patch Management | Innovatiq',
    description: 'AI-driven patch management — proactive vulnerability detection, auto-deployment, and compliance assurance.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://innovatiq.com.sg/product/securon-patch-management-system#software',
      name: 'SecurOn',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Web',
      description: 'SecurOn is an AI-powered Patch Management System that automates vulnerability detection and patch deployment across enterprise IT infrastructure to maintain security and compliance.',
      url: 'https://innovatiq.com.sg/product/securon-patch-management-system',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'SGD', description: 'Free trial available' },
      publisher: { '@id': 'https://innovatiq.com.sg/#organization' },
    },
    {
      '@type': 'Product',
      '@id': 'https://innovatiq.com.sg/product/securon-patch-management-system#product',
      name: 'SecurOn Patch Management System',
      description: 'AI-powered Patch Management System for automated vulnerability detection, patch deployment, and compliance monitoring across enterprise IT infrastructure.',
      brand: { '@type': 'Brand', name: 'Innovatiq Technologies' },
      url: 'https://innovatiq.com.sg/product/securon-patch-management-system',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is SecurOn?',
          acceptedAnswer: { '@type': 'Answer', text: 'SecurOn is an AI-powered Patch Management System by Innovatiq Technologies that automates vulnerability detection and patch deployment across enterprise IT infrastructure.' },
        },
        {
          '@type': 'Question',
          name: 'Does SecurOn support compliance monitoring?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, SecurOn includes a compliance dashboard that monitors adherence to security and regulatory patching standards, keeping your organisation audit-ready.' },
        },
        {
          '@type': 'Question',
          name: 'Can SecurOn manage multiple clients or departments?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, SecurOn supports multi-tenant management for centralised control of multiple clients or departments with an overview dashboard showing all tenant details and patch status.' },
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
        { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://innovatiq.com.sg/#products' },
        { '@type': 'ListItem', position: 3, name: 'SecurOn Patch Management System', item: 'https://innovatiq.com.sg/product/securon-patch-management-system' },
      ],
    },
  ],
};

export default function SecurOnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageTemplate
        h1Title="SecurOn AI Patch Management System"
        heroImageAlt="Patch Management Dashboard"
        name="SecurOn"
        subtitle="AI-Powered Patch Management System"
        tagline="Stay Secure. Stay Compliant. Stay Ahead."
        description="Safeguard your business from vulnerabilities with SecurOn's AI-powered Patch Management System. Our platform simplifies vulnerability management by intelligently automating patch deployment across servers, endpoints, and applications, keeping your infrastructure resilient against cyber threats."
        highlights={[
          'AI-Driven Proactive Protection — detects and resolves vulnerabilities automatically',
          'Intelligent Proactive Support & Management with continuous monitoring',
          'AI-Powered Threat Mitigation using CVE database analysis',
          'Granular Security and Compliance Assurance aligned to regulatory standards',
        ]}
        features={[
          { title: 'AI Patch Management', description: 'Optimises patch deployment through AI-driven prioritisation and automation — continuously analysing CVE data to predict, identify, and address potential threats before they are exploited.', icon: 'Bot' },
          { title: 'Network-Based Asset Scan', description: 'Automatically detects and inventories all devices in the network, with manual upload option for offline or non-networked assets.', icon: 'Search' },
          { title: 'Real-Time Monitoring', description: 'Tracks patch status and system health continuously for quick response with an AI-powered dashboard delivering intelligent insights and predictive recommendations.', icon: 'Radio' },
          { title: 'Compliance Dashboard', description: 'Monitors adherence to security and regulatory patching standards — ensuring your organisation stays secure, compliant, and audit-ready at all times.', icon: 'ClipboardList' },
          { title: 'Backup & Rollback', description: 'Protects systems by creating recovery points before patching, with one-click rollback capability if a patch causes unexpected issues.', icon: 'Undo' },
          { title: 'Patch Approval Workflow', description: 'Adds an approval workflow for controlled patch deployment — offers both auto and manual patch options for maximum flexibility.', icon: 'CheckCircle2' },
          { title: 'Seamless Integration', description: 'Easily connects with existing ITSM, endpoint, and monitoring tools for a unified security operations experience.', icon: 'Link2' },
          { title: 'Multi-Tenant Management', description: 'Enables centralised management of multiple clients or departments securely, with an overview dashboard of all tenant details and patch status.', icon: 'Building2' },
          { title: 'Role-Based Security', description: 'Secure login with 2FA and role-based permissions provide granular access control to protect sensitive data and operations.', icon: 'Lock' },
        ]}
        overviewPills={[
          { title: 'AI-Based Vulnerability Detection', icon: 'Bot' },
          { title: 'Intelligent Patch Recommendations', icon: 'Lightbulb' },
          { title: 'Automated Patch Prioritization', icon: 'Settings' },
          { title: 'Predictive Threat Analysis', icon: 'Brain' },
          { title: 'AI-Powered Compliance Monitoring', icon: 'ClipboardList' },
          { title: 'Security Risk Scoring & Insights', icon: 'Shield' },
        ]}
        gradient="linear-gradient(135deg, #881337 0%, #BE123C 50%, #E11D48 100%)"
        color="#BE123C"
        productType="pms"
      />
    </>
  );
}
