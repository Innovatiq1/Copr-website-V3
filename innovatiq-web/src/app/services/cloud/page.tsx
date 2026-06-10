import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function CloudPage() {
  return (
    <ServicePageTemplate
      badge="Cloud Services"
      title="Cloud Services Providers | Secure Cloud Services"
      subtitle="Our Cloud Services empower businesses to scale, innovate, and succeed in the digital era. We enable organizations to harness the power of the cloud to drive agility, efficiency, and growth."
      overview="With our comprehensive suite of cloud solutions — including Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS) — we help organizations harness the power of the cloud. Whether you're starting your cloud journey or optimizing an existing environment, our certified cloud architects deliver solutions that reduce costs, improve agility, and enhance security."
      overviewPoints={[
        'IaaS, PaaS, and SaaS solutions tailored to your business',
        'Seamless cloud migration with minimal disruption',
        'Cost optimization and resource utilization management',
        'Cloud security and compliance frameworks',
        '24/7 cloud operations and monitoring',
      ]}
      benefits={[
        { title: 'Scalability and Flexibility', description: 'Scale resources up or down on-demand to meet changing business needs and seasonal fluctuations, without significant upfront investments or infrastructure provisioning.', icon: '📈' },
        { title: 'Enhanced Business Agility', description: 'Rapidly deploy and scale resources so businesses can respond quickly to market changes, seize new opportunities, and innovate faster, gaining a competitive edge.', icon: '⚡' },
        { title: 'Cost Optimization', description: 'Leverage cloud resources on a pay-as-you-go model to reduce capital expenses, minimize IT infrastructure costs, and achieve better cost predictability.', icon: '💰' },
        { title: 'Enhanced Security', description: 'Enterprise-grade security controls with automated threat detection and continuous monitoring protecting your cloud environment.', icon: '🔒' },
        { title: 'High Availability', description: 'Multi-region failover and disaster recovery ensuring uninterrupted access to critical resources and applications.', icon: '🌐' },
        { title: 'Managed Operations', description: 'Fully managed cloud operations so your team can focus on core business objectives and innovation.', icon: '⚙️' },
      ]}
      processSteps={[
        { step: '1', title: 'Assessment', description: 'Evaluate current infrastructure and define cloud readiness.' },
        { step: '2', title: 'Strategy', description: 'Design the optimal cloud architecture and migration plan.' },
        { step: '3', title: 'Migration', description: 'Execute phased migration with zero-downtime approach.' },
        { step: '4', title: 'Optimize', description: 'Continuous optimization for performance and cost efficiency.' },
      ]}
      color="#F43F5E"
      serviceType="cloud"
    />
  );
}
