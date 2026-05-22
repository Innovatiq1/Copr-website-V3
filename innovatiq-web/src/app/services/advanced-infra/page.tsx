import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function AdvancedInfraPage() {
  return (
    <ServicePageTemplate
      badge="Advanced Infrastructure"
      title="Advanced Infrastructure Network Services"
      subtitle="Design and deploy enterprise-grade network and server infrastructure built for performance, reliability, and scale."
      overview="Innovatiq's Advanced Infrastructure practice delivers comprehensive network and infrastructure solutions for enterprise environments. From data center design to SD-WAN deployments, our certified engineers build robust foundations that support your business growth and digital transformation initiatives."
      overviewPoints={[
        'Data center design, build, and migration',
        'SD-WAN and next-generation networking',
        'Hyper-converged infrastructure (HCI) solutions',
        'Network security and segmentation',
        'Infrastructure performance optimization',
      ]}
      benefits={[
        { title: 'High Performance', description: 'Low-latency, high-throughput network infrastructure for demanding workloads.', icon: '⚡' },
        { title: 'Resilience', description: 'Redundant designs with automatic failover ensuring business continuity.', icon: '🔄' },
        { title: 'Modern Networking', description: 'SD-WAN and SASE solutions for modern distributed workforce environments.', icon: '🌐' },
        { title: 'Scalable Design', description: 'Future-proof architecture that scales with your business without full redesign.', icon: '📈' },
        { title: 'Security Embedded', description: 'Network security built-in from the design phase, not bolted on after.', icon: '🔒' },
        { title: 'Centralized Management', description: 'Single-pane-of-glass visibility and control across all infrastructure.', icon: '🖥️' },
      ]}
      processSteps={[
        { step: '1', title: 'Assess', description: 'Current state assessment and capacity planning analysis.' },
        { step: '2', title: 'Design', description: 'Architect the optimal infrastructure solution for your needs.' },
        { step: '3', title: 'Deploy', description: 'Professional implementation with minimal business disruption.' },
        { step: '4', title: 'Manage', description: 'Ongoing management, monitoring, and optimization.' },
      ]}
      color="#F59E0B"
    />
  );
}
