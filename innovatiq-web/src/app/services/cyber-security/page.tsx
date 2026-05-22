import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function CyberSecurityPage() {
  return (
    <ServicePageTemplate
      badge="Cyber Security"
      title="Cyber Security Solutions"
      subtitle="Protect your business from evolving cyber threats with comprehensive security solutions built for the modern threat landscape."
      overview="In today's digital world, cyber threats are more sophisticated and frequent than ever. Innovatiq's Cyber Security team provides end-to-end protection — from vulnerability assessments and penetration testing to 24/7 security operations and incident response — keeping your business safe and compliant."
      overviewPoints={[
        'Comprehensive security assessments and audits',
        'Security Operations Center (SOC) services',
        'Penetration testing and vulnerability management',
        'Zero-trust architecture implementation',
        'Regulatory compliance (PDPA, ISO 27001, SOC 2)',
      ]}
      benefits={[
        { title: 'Threat Detection', description: 'Real-time monitoring and AI-powered threat detection across all environments.', icon: '🔍' },
        { title: 'Incident Response', description: 'Rapid response team to contain, analyze, and remediate security incidents.', icon: '🚨' },
        { title: 'Compliance', description: 'Meet PDPA, GDPR, ISO 27001, and industry-specific regulatory requirements.', icon: '📋' },
        { title: 'Identity Security', description: 'Zero-trust identity and access management to prevent unauthorized access.', icon: '🔑' },
        { title: 'Data Protection', description: 'Encryption, DLP, and backup solutions protecting your critical business data.', icon: '🛡️' },
        { title: 'Security Training', description: 'Employee awareness training to build a security-first culture.', icon: '🎓' },
      ]}
      processSteps={[
        { step: '1', title: 'Assess', description: 'Identify vulnerabilities and security gaps across your environment.' },
        { step: '2', title: 'Design', description: 'Build a comprehensive security architecture and roadmap.' },
        { step: '3', title: 'Deploy', description: 'Implement security controls, tools, and monitoring systems.' },
        { step: '4', title: 'Monitor', description: 'Ongoing 24/7 monitoring, threat hunting, and incident response.' },
      ]}
      color="#D4174A"
    />
  );
}
