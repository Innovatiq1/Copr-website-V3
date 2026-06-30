import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function CyberSecurityPage() {
  return (
    <ServicePageTemplate
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
  );
}
