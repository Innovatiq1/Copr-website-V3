import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function SecurOnPage() {
  return (
    <ProductPageTemplate
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
  );
}
