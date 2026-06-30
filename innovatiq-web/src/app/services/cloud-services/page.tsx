import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function CloudPage() {
  return (
    <ServicePageTemplate
      badge="Cloud Services"
      title="Secure Cloud Services"
      subtitle="Our Cloud Services empower businesses to scale, innovate, and succeed in the digital era. We enable organisations to harness the power of the cloud to drive agility, efficiency, and growth."
      overview="With our comprehensive suite of cloud solutions — including Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS) — we help organisations harness the power of the cloud. Whether you're starting your cloud journey or optimising an existing environment, our certified cloud architects deliver solutions that reduce costs, improve agility, and enhance security."
      overviewPoints={[
        'IaaS, PaaS, and SaaS solutions tailored to your business',
        'Seamless cloud migration with minimal disruption',
        'Cost optimisation and resource utilization management',
        'Cloud security and compliance frameworks',
        '24/7 cloud operations and monitoring',
      ]}
      benefits={[
        { title: 'Scalability and Flexibility', description: 'Scale resources up or down on-demand without upfront investments — adapting instantly to changing business needs.', icon: 'TrendingUp' },
        { title: 'Enhanced Business Agility', description: 'Rapidly deploy and scale resources to respond to market changes, seize opportunities, and innovate faster.', icon: 'Zap' },
        { title: 'Cost Optimisation', description: 'Pay-as-you-go cloud model reduces capital expenses and delivers better cost predictability for your IT spend.', icon: 'Coins' },
        { title: 'Enhanced Security', description: 'Enterprise-grade security controls with automated threat detection and continuous monitoring protecting your cloud environment.', icon: 'Lock' },
        { title: 'High Availability', description: 'Multi-region failover and disaster recovery ensuring uninterrupted access to critical resources and applications.', icon: 'Globe' },
        { title: 'Managed Operations', description: 'Fully managed cloud operations so your team can focus on core business objectives and innovation.', icon: 'Settings' },
      ]}
      processSteps={[
        { step: '1', title: 'Assessment', description: 'Evaluate current infrastructure and define cloud readiness.' },
        { step: '2', title: 'Strategy', description: 'Design the optimal cloud architecture and migration plan.' },
        { step: '3', title: 'Migration', description: 'Execute phased migration with zero-downtime approach.' },
        { step: '4', title: 'Optimise', description: 'Continuous optimisation for performance and cost efficiency.' },
      ]}
      color="#F43F5E"
      serviceType="cloud"
    />
  );
}
