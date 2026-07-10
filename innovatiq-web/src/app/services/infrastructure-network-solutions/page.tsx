import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'IT Infrastructure Solutions | Enterprise Infrastructure',
  description: 'Innovatiq delivers enterprise IT infrastructure solutions including network design, server management, storage solutions, disaster recovery, and advanced network security.',
  keywords: 'IT Infrastructure, Enterprise Network, Server Management, Storage Solutions, Network Design, Disaster Recovery, IT Infrastructure Singapore, Advanced Infrastructure',
  alternates: { canonical: 'https://innovatiq.com.sg/services/infrastructure-network-solutions' },
  openGraph: {
    title: 'IT Infrastructure Solutions | Innovatiq Technologies',
    description: 'Robust enterprise IT infrastructure — network design, security, and scalable solutions for modern businesses.',
    url: 'https://innovatiq.com.sg/services/infrastructure-network-solutions',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Infrastructure Solutions | Innovatiq',
    description: 'Enterprise IT infrastructure built for performance, security, and scalability.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://innovatiq.com.sg/services/infrastructure-network-solutions#service',
      name: 'Enterprise IT Infrastructure Solutions',
      description: 'Innovatiq delivers enterprise IT infrastructure solutions including network design, server management, storage solutions, disaster recovery planning, and advanced network security for businesses in Singapore.',
      url: 'https://innovatiq.com.sg/services/infrastructure-network-solutions',
      provider: { '@id': 'https://innovatiq.com.sg/#organization' },
      serviceType: 'IT Infrastructure and Network Solutions',
      areaServed: 'Singapore',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What IT infrastructure services does Innovatiq provide?',
          acceptedAnswer: { '@type': 'Answer', text: 'Innovatiq provides network design and architecture, advanced network security, performance optimisation, network monitoring, disaster recovery planning, and cloud and virtualization integration services.' },
        },
        {
          '@type': 'Question',
          name: 'Does Innovatiq handle disaster recovery and business continuity?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq implements comprehensive disaster recovery and business continuity solutions including redundant systems, backup strategies, failover mechanisms, and geographically dispersed data solutions to minimise downtime.' },
        },
        {
          '@type': 'Question',
          name: 'Can Innovatiq integrate cloud with existing on-premises infrastructure?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, Innovatiq designs hybrid and multi-cloud architectures that seamlessly integrate on-premises infrastructure with cloud platforms — optimising connectivity and ensuring secure, distributed resource access.' },
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
        { '@type': 'ListItem', position: 3, name: 'Enterprise IT Infrastructure Solutions', item: 'https://innovatiq.com.sg/services/infrastructure-network-solutions' },
      ],
    },
  ],
};

export default function AdvancedInfraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageTemplate
        h1Title="Enterprise IT Infrastructure Solutions"
        badge="Advanced Infrastructure"
        title="Advanced Infrastructure & Network Solutions"
        subtitle="Advanced Infrastructure & Network Services refer to a suite of highly sophisticated solutions designed to optimise and enhance the performance, security, and reliability of computer networks."
        overview="These services encompass a wide range of technologies, methodologies, and tools aimed at ensuring that network infrastructures meet the demands of modern business environments. From network design and architecture to disaster recovery and cloud integration, we build robust foundations that support your business growth."
        overviewPoints={[
          'Network design, architecture, and implementation',
          'Advanced network security and intrusion prevention',
          'Performance optimisation and QoS management',
          'Disaster recovery and business continuity planning',
          'Virtualization and cloud integration',
        ]}
        benefits={[
          { title: 'Improved Performance', description: 'QoS, traffic prioritization, and load balancing deliver faster speeds, reduced latency, and better user experiences.', icon: 'Zap' },
          { title: 'Enhanced Security', description: 'Firewalls, IDS/IPS, encryption, and continuous monitoring protect your network from evolving cyber threats.', icon: 'Lock' },
          { title: 'Increased Reliability and Availability', description: 'Redundancy, failover, and disaster recovery strategies minimize downtime and ensure access to critical resources.', icon: 'RefreshCw' },
          { title: 'Scalability and Flexibility', description: 'Scalable architecture that adapts to evolving business needs and supports growth without disruption.', icon: 'TrendingUp' },
          { title: 'Cost Optimisation', description: 'Streamlined operations, resource optimization, and task automation reduce costs and improve efficiency.', icon: 'Coins' },
          { title: 'Compliance & Risk Management', description: 'Meet GDPR, HIPAA, PCI DSS, and SOX requirements with robust controls, access policies, and audit trails.', icon: 'ClipboardList' },
          { title: 'Simplified Management', description: 'Centralized platforms and automation tools reduce admin complexity, freeing IT teams for strategic work.', icon: 'Monitor' },
          { title: 'Emerging Technology Support', description: 'Infrastructure designed to integrate cloud, IoT, and SDN — enabling innovation and competitive agility.', icon: 'Rocket' },
        ]}
        processSteps={[
          { step: '1', title: 'Assess', description: 'Current state assessment and network capacity planning analysis.' },
          { step: '2', title: 'Design', description: 'Architect the optimal infrastructure solution for your specific needs.' },
          { step: '3', title: 'Deploy', description: 'Professional implementation with minimal business disruption.' },
          { step: '4', title: 'Manage', description: 'Ongoing management, monitoring, and optimisation.' },
        ]}
        color="#BE123C"
        detailCards={[
          { title: 'Network Design & Architecture', description: 'This involves the planning and implementation of network layouts, including the selection of hardware, software, protocols, and configurations to meet specific business requirements. Advanced services might involve designing resilient, scalable, and adaptable architectures capable of supporting emerging technologies such as cloud computing, IoT and SDN.' },
          { title: 'Network Security', description: 'Advanced security services are essential to protect networks from a myriad of threats, including malware, ransomware, phishing attacks, and data breaches. This may involve the deployment of advanced firewalls, intrusion detection/prevention systems (IDS/IPS), encryption technologies, secure access controls, and continuous monitoring solutions to identify and mitigate security risks in real-time.' },
          { title: 'Performance Optimisation', description: 'Advanced Infrastructure & Network Services focus on optimising network performance to ensure fast and reliable access to resources and applications. This may include implementing Quality of Service (QoS) policies, traffic shaping, load balancing, and WAN optimisation techniques to minimize latency, packet loss, and bottlenecks, particularly in large-scale distributed environments.' },
          { title: 'Network Monitoring & Management', description: 'Robust monitoring and management solutions are crucial for maintaining the health, availability, and performance of network infrastructures. Advanced services often utilize sophisticated monitoring tools, analytics platforms, and automation technologies to proactively identify issues, analyze traffic patterns, enforce compliance policies, and streamline administrative tasks.' },
          { title: 'Disaster Recovery & Business Continuity', description: 'Advanced Infrastructure & Network Services encompass comprehensive disaster recovery and business continuity planning to minimize downtime and data loss in the event of unforeseen disasters or disruptions. This may involve implementing redundant systems, backup and recovery strategies, failover mechanisms, and geographically dispersed data centres to ensure high availability and data integrity.' },
          { title: 'Virtualization & Cloud Integration', description: 'With the increasing adoption of virtualization and cloud computing technologies, advanced network services focus on seamlessly integrating on-premises infrastructure with virtualized environments and cloud platforms. This includes designing hybrid and multi-cloud architectures, optimising network connectivity, and implementing secure VPN solutions to facilitate seamless access to distributed resources.' },
          { title: 'Compliance & Regulatory Requirements', description: 'Advanced network infrastructure services address the complex regulatory and compliance requirements governing data privacy, security, and integrity. This involves implementing robust security controls, access policies, and audit trails to ensure compliance with industry standards such as GDPR, HIPAA, PCI DSS, and SOX.' },
        ]}
        serviceType="infrastructure"
      />
    </>
  );
}
