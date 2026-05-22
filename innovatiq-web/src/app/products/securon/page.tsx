import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function SecurOnPage() {
  return (
    <ProductPageTemplate
      name="SecurOn"
      subtitle="Patch Management System"
      tagline="Automated Security Patching for Enterprise Systems."
      description="SecurOn is an enterprise-grade Patch Management System that automates the discovery, assessment, and deployment of security patches across your entire IT infrastructure. Say goodbye to manual patch cycles and compliance gaps — SecurOn keeps your systems secure, compliant, and fully up-to-date."
      highlights={[
        'Automated patch discovery and vulnerability scanning',
        'Zero-downtime patch deployment scheduling',
        'Compliance reporting for PDPA, ISO 27001, SOC 2',
        'Multi-platform support (Windows, Linux, macOS)',
        'Third-party application patching',
        'Rollback capabilities for failed patches',
      ]}
      features={[
        { title: 'Auto Discovery', description: 'Automatically discover all endpoints and software across your network environment.', icon: '🔍' },
        { title: 'Vulnerability Scan', description: 'Continuous vulnerability scanning to identify security gaps before attackers do.', icon: '🛡️' },
        { title: 'Smart Scheduling', description: 'AI-powered patch scheduling that minimizes downtime during business hours.', icon: '📅' },
        { title: 'Compliance Reports', description: 'Automated compliance reports for audit readiness and regulatory requirements.', icon: '📋' },
        { title: 'Rollback Support', description: 'One-click rollback capability if a patch causes unexpected issues.', icon: '↩️' },
        { title: 'Multi-Platform', description: 'Support for Windows, Linux, macOS, and major third-party applications.', icon: '💻' },
        { title: 'Dashboard Analytics', description: 'Real-time security posture dashboard showing patch compliance across all systems.', icon: '📊' },
        { title: 'Approval Workflows', description: 'Configurable approval workflows ensuring patches are tested and approved before deployment.', icon: '✅' },
        { title: 'Alert System', description: 'Instant alerts for critical vulnerabilities with recommended remediation actions.', icon: '🚨' },
      ]}
      gradient="linear-gradient(135deg, #065f46 0%, #064e3b 100%)"
      color="#065f46"
    />
  );
}
