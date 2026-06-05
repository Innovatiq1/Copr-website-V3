import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function SecurOnPage() {
  return (
    <ProductPageTemplate
      name="SecurOn"
      subtitle="AI-Powered Patch Management System"
      tagline="Stay Secure. Stay Compliant. Stay Ahead."
      description="Safeguard your business from vulnerabilities with Securon's AI-powered Patch Management System. Our intelligent platform leverages AI to automate patching, streamline compliance, and keep your IT infrastructure secure, up-to-date, and resilient against evolving cyber threats. The AI-powered Innovatiq Patch Management System simplifies vulnerability management by intelligently automating patch deployment across servers, endpoints, and applications."
      highlights={[
        'AI-Driven Proactive Protection — detects, prioritizes, and resolves vulnerabilities automatically',
        'Tailored AI-Enhanced Solutions designed for your unique security landscape',
        'Intelligent Proactive Support & Management with continuous monitoring',
        'AI-Powered Proactive Threat Mitigation using CVE database analysis',
        'AI-Enhanced Efficiency and Automation for seamless patching',
        'AI-Driven Security and Compliance Assurance aligned to regulatory standards',
      ]}
      features={[
        { title: 'AI Patch Management', description: 'Optimizes patch deployment through AI-driven prioritization and automation — continuously analysing CVE data to predict, identify, and address potential threats before they are exploited.', icon: '🤖' },
        { title: 'Network-Based Asset Scan', description: 'Automatically detects and inventories all devices in the network, with manual upload option for offline or non-networked assets.', icon: '🔍' },
        { title: 'Real-Time Monitoring', description: 'Tracks patch status and system health continuously for quick response with an AI-powered dashboard delivering intelligent insights and predictive recommendations.', icon: '📡' },
        { title: 'Compliance Dashboard', description: 'Monitors adherence to security and regulatory patching standards — ensuring your organization stays secure, compliant, and audit-ready at all times.', icon: '📋' },
        { title: 'Backup & Rollback', description: 'Protects systems by creating recovery points before patching, with one-click rollback capability if a patch causes unexpected issues.', icon: '↩️' },
        { title: 'Patch Approval Workflow', description: 'Adds an approval workflow for controlled patch deployment — offer both auto and manual patch options for maximum flexibility.', icon: '✅' },
        { title: 'Seamless Integration', description: 'Easily connects with existing ITSM, endpoint, and monitoring tools for a unified security operations experience.', icon: '🔗' },
        { title: 'Multi-Tenant Management', description: 'Enables centralized management of multiple clients or departments securely, with an overview dashboard of all tenant details and patch status.', icon: '🏢' },
        { title: 'Role-Based Security', description: 'Secure login with 2FA and role-based permissions provide granular access control to protect sensitive data and operations.', icon: '🔒' },
      ]}
      gradient="linear-gradient(135deg, #065f46 0%, #064e3b 100%)"
      color="#065f46"
      productType="pms"
    />
  );
}
