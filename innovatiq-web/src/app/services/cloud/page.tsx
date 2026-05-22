import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function CloudPage() {
  return (
    <ServicePageTemplate
      badge="Cloud Services"
      title="Cloud Infrastructure & Migration"
      subtitle="Accelerate your cloud journey with scalable, secure, and cost-efficient cloud solutions designed for enterprise workloads."
      overview="Innovatiq's Cloud Services practice helps enterprises design, migrate, and optimize their cloud infrastructure. Whether you're starting your cloud journey or optimizing an existing environment, our certified cloud architects deliver solutions that reduce costs, improve agility, and enhance security."
      overviewPoints={[
        'Multi-cloud strategy and architecture design',
        'Seamless cloud migration with minimal disruption',
        'Cost optimization and FinOps best practices',
        'Cloud security and compliance frameworks',
        '24/7 cloud operations and monitoring',
      ]}
      benefits={[
        { title: 'Scalability', description: 'Scale resources instantly to meet demand spikes without over-provisioning.', icon: '📈' },
        { title: 'Cost Reduction', description: 'Reduce infrastructure costs by up to 40% through rightsizing and optimization.', icon: '💰' },
        { title: 'Business Agility', description: 'Deploy new services in hours, not months, enabling faster time to market.', icon: '⚡' },
        { title: 'Enhanced Security', description: 'Enterprise-grade security controls with automated threat detection.', icon: '🔒' },
        { title: 'High Availability', description: '99.99% uptime SLAs with multi-region failover and disaster recovery.', icon: '🌐' },
        { title: 'Managed Operations', description: 'Fully managed cloud operations so your team can focus on innovation.', icon: '⚙️' },
      ]}
      processSteps={[
        { step: '1', title: 'Assessment', description: 'Evaluate current infrastructure and define cloud readiness.' },
        { step: '2', title: 'Strategy', description: 'Design the optimal cloud architecture and migration plan.' },
        { step: '3', title: 'Migration', description: 'Execute phased migration with zero-downtime approach.' },
        { step: '4', title: 'Optimize', description: 'Continuous optimization for performance and cost efficiency.' },
      ]}
      color="#3B82F6"
    />
  );
}
