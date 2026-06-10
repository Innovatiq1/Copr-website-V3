import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function ManagedITPage() {
  return (
    <ServicePageTemplate
      badge="Managed IT Services"
      title="Reliable Managed IT Services"
      subtitle="In the rapidly evolving world of technology, businesses often find it challenging to keep up with the pace while ensuring operational efficiency. This is where IT Staffing and Managed Services come into play."
      overview="Our IT Staffing and Managed Services offer a comprehensive solution to meet your organization's talent needs and IT infrastructure management requirements. With a focus on delivering top-notch talent and ensuring the smooth operation of your IT systems, we provide a seamless experience that allows you to focus on your core business objectives while we handle the rest."
      overviewPoints={[
        'Extensive network of highly skilled IT professionals',
        'Customized solution design aligned with your strategic goals',
        'Proactive monitoring, maintenance, and support',
        'Scalable staffing to match evolving business needs',
        '24/7 helpdesk and technical support with SLA guarantee',
      ]}
      benefits={[
        { title: 'Extensive Talent Network', description: 'Our IT Staffing and Managed Services boast an extensive network of highly skilled IT professionals, ensuring we can quickly identify and onboard the best talent to meet your specific project or staffing needs.', icon: '👥' },
        { title: 'Customized Solution Design', description: 'We work closely with your organization to understand your unique staffing requirements and business objectives, allowing us to design customized solutions that align with your strategic goals.', icon: '🎯' },
        { title: 'Proactive Support & Management', description: 'Our Managed Services provide proactive monitoring, maintenance, and support for your IT infrastructure, ensuring optimal performance, reliability, and security while minimizing downtime.', icon: '📡' },
        { title: 'Enhanced Productivity', description: 'By providing access to top-tier IT talent, we enable your organization to augment its workforce with skilled professionals who can hit the ground running, contributing to increased productivity and project success.', icon: '⚡' },
        { title: 'Scalability and Flexibility', description: 'Our IT Staffing and Managed Services offer scalability and flexibility to adapt to your changing business needs and fluctuating IT demands, ensuring you have the right resources in place.', icon: '📈' },
        { title: 'Reduced Downtime and Risk', description: 'By outsourcing the management of your IT infrastructure, you can reduce the risk of downtime, data breaches, and security incidents, safeguarding your business continuity and bottom line.', icon: '🛡️' },
      ]}
      processSteps={[
        { step: '1', title: 'Onboard', description: 'Document your environment and establish monitoring baselines.' },
        { step: '2', title: 'Monitor', description: '24/7 automated monitoring of all systems and applications.' },
        { step: '3', title: 'Resolve', description: 'Proactive issue resolution before business impact occurs.' },
        { step: '4', title: 'Report', description: 'Regular reporting and strategic IT reviews with your team.' },
      ]}
      color="#BE123C"
      investmentCards={[
        { title: 'Cost Savings', description: 'By leveraging our managed services and staffing solutions, organizations can significantly reduce operational costs associated with hiring, training, and managing in-house IT staff, as well as ongoing infrastructure maintenance and upgrades — enabling smarter budget allocation.', icon: '💰' },
        { title: 'Strategic Investment', description: 'Invest in our IT Staffing and Managed Services to align your workforce and IT capabilities with your strategic objectives. By partnering with us, you can ensure that your staffing and IT infrastructure investments are aligned with your business goals, enabling you to achieve better outcomes, drive innovation, and maintain a competitive edge in the marketplace.', icon: '📊' },
        { title: 'Focus on Core Competencies', description: 'By entrusting your IT staffing and infrastructure management to us, your organization can redirect valuable time, resources, and leadership attention towards core business activities and strategic initiatives — driving growth and improving your overall competitive advantage.', icon: '🎯' },
      ]}
      serviceType="managedIT"
    />
  );
}
