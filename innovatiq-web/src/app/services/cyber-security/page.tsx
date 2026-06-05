import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function CyberSecurityPage() {
  return (
    <ServicePageTemplate
      badge="Cyber Security"
      title="Advanced Cybersecurity Solutions"
      subtitle="Our Cyber Security services offer comprehensive protection against evolving cyber threats, safeguarding businesses from data breaches, malware attacks, and other cyber risks."
      overview="With our proactive approach to cybersecurity, advanced threat detection, and incident response capabilities, we help organizations build resilience and defend against cyber threats effectively. Our comprehensive protection covers everything from vulnerability management to 24/7 security operations."
      overviewPoints={[
        'Proactive threat detection and continuous monitoring',
        'Advanced incident response and recovery capabilities',
        'Data protection, encryption, and access control',
        'Regulatory compliance (PDPA, ISO 27001, GDPR)',
        'Security risk assessment and mitigation strategies',
      ]}
      benefits={[
        { title: 'Proactive Threat Detection', description: 'Our Cloud Services offer unparalleled monitoring capabilities, allowing businesses to identify and neutralize threats before they escalate into larger problems.', icon: '🔍' },
        { title: 'Enhanced Data Protection', description: 'By securing sensitive data, preventing unauthorized access, and mitigating cyber threats, we help businesses protect their valuable assets and maintain regulatory compliance.', icon: '🛡️' },
        { title: 'Risk Mitigation', description: 'Invest in our Cyber Security services to mitigate cyber risks and protect your business from potential financial, reputational, and legal damages.', icon: '⚠️' },
        { title: 'Incident Response', description: 'Rapid response team to contain, analyze, and remediate security incidents — minimizing downtime and business impact.', icon: '🚨' },
        { title: 'Compliance Assurance', description: 'Meet PDPA, GDPR, ISO 27001, and industry-specific regulatory requirements with confidence and audit readiness.', icon: '📋' },
        { title: 'Security Awareness', description: 'Employee awareness training and security culture building to make your people your strongest security asset.', icon: '🎓' },
      ]}
      processSteps={[
        { step: '1', title: 'Assess', description: 'Identify vulnerabilities and security gaps across your environment.' },
        { step: '2', title: 'Design', description: 'Build a comprehensive security architecture and roadmap.' },
        { step: '3', title: 'Deploy', description: 'Implement security controls, tools, and monitoring systems.' },
        { step: '4', title: 'Monitor', description: 'Ongoing 24/7 monitoring, threat hunting, and incident response.' },
      ]}
      color="#D4174A"
      serviceType="cyber"
    />
  );
}
