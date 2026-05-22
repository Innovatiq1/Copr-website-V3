import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function ManagedITPage() {
  return (
    <ServicePageTemplate
      badge="Managed IT Services"
      title="Managed IT Services"
      subtitle="Focus on your business while we handle all your IT operations — proactively, reliably, and cost-efficiently."
      overview="Innovatiq's Managed IT Services provides end-to-end IT management, monitoring, and support, allowing your team to focus on strategic priorities. Our proactive approach minimizes downtime, reduces costs, and ensures your technology infrastructure always performs at its best."
      overviewPoints={[
        '24/7 helpdesk and technical support',
        'Proactive infrastructure monitoring and management',
        'Patch management and software updates',
        'Backup and disaster recovery management',
        'IT asset lifecycle management',
      ]}
      benefits={[
        { title: '24/7 Support', description: 'Round-the-clock monitoring and support with guaranteed response times.', icon: '🕐' },
        { title: 'Proactive Monitoring', description: 'Identify and resolve issues before they impact your business operations.', icon: '📡' },
        { title: 'Cost Predictability', description: 'Fixed monthly costs with no surprise IT bills or emergency expenses.', icon: '💰' },
        { title: 'SLA Guaranteed', description: 'Service level agreements with financial guarantees for uptime and response.', icon: '📋' },
        { title: 'Scalable Services', description: 'Easily scale support up or down as your business needs evolve.', icon: '📈' },
        { title: 'Certified Experts', description: 'Access to a team of certified engineers across all major technology platforms.', icon: '🏆' },
      ]}
      processSteps={[
        { step: '1', title: 'Onboard', description: 'Document your environment and establish monitoring baselines.' },
        { step: '2', title: 'Monitor', description: '24/7 automated monitoring of all systems and applications.' },
        { step: '3', title: 'Resolve', description: 'Proactive issue resolution before business impact occurs.' },
        { step: '4', title: 'Report', description: 'Regular reporting and strategic IT reviews with your team.' },
      ]}
      color="#10B981"
    />
  );
}
