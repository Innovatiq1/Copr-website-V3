import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function AdvancedInfraPage() {
  return (
    <ServicePageTemplate
      badge="Advanced Infrastructure"
      title="Advanced Infrastructure & Network Solutions"
      subtitle="Advanced Infrastructure & Network Services refer to a suite of highly sophisticated solutions designed to optimize and enhance the performance, security, and reliability of computer networks."
      overview="These services encompass a wide range of technologies, methodologies, and tools aimed at ensuring that network infrastructures meet the demands of modern business environments. From network design and architecture to disaster recovery and cloud integration, we build robust foundations that support your business growth."
      overviewPoints={[
        'Network design, architecture, and implementation',
        'Advanced network security and intrusion prevention',
        'Performance optimization and QoS management',
        'Disaster recovery and business continuity planning',
        'Virtualization and cloud integration',
      ]}
      benefits={[
        { title: 'Improved Performance', description: 'Optimize network performance through Quality of Service (QoS), traffic prioritization, and load balancing — leading to faster data transfer speeds, reduced latency, and enhanced user experiences.', icon: '⚡' },
        { title: 'Enhanced Security', description: 'Employ advanced security measures such as firewalls, intrusion detection/prevention systems (IDS/IPS), encryption, and continuous monitoring to protect networks from cyber threats.', icon: '🔒' },
        { title: 'Increased Reliability and Availability', description: 'Ensure high availability by implementing redundancy, failover mechanisms, and disaster recovery strategies — minimizing downtime and ensuring uninterrupted access to critical resources.', icon: '🔄' },
        { title: 'Scalability and Flexibility', description: 'Designed to be scalable and adaptable to accommodate evolving business needs and technological advancements, providing the flexibility to support growth and innovation.', icon: '📈' },
        { title: 'Cost Optimization', description: 'Streamlining network operations, optimizing resource utilization, and automating repetitive tasks helps organizations reduce operational costs and improve cost efficiency.', icon: '💰' },
        { title: 'Compliance & Risk Management', description: 'Address regulatory compliance requirements and mitigate risks associated with data privacy, security, and integrity — ensuring compliance with GDPR, HIPAA, PCI DSS, and SOX.', icon: '📋' },
        { title: 'Simplified Management and Administration', description: 'Advance Infra Network Services often include centralized management platforms and automation tools that simplify network administration tasks. This reduces the complexity of managing heterogeneous network environments and allows IT teams to focus on strategic initiatives rather than routine maintenance.', icon: '🖥️' },
        { title: 'Support for Emerging Technologies', description: 'Advance Infra Network Services are designed to support emerging technologies such as cloud computing, IoT (Internet of Things), and SDN (Software-Defined Networking). By integrating these technologies into their network infrastructure, organizations can leverage new opportunities for innovation, agility, and competitive advantage.', icon: '🚀' },
      ]}
      processSteps={[
        { step: '1', title: 'Assess', description: 'Current state assessment and network capacity planning analysis.' },
        { step: '2', title: 'Design', description: 'Architect the optimal infrastructure solution for your specific needs.' },
        { step: '3', title: 'Deploy', description: 'Professional implementation with minimal business disruption.' },
        { step: '4', title: 'Manage', description: 'Ongoing management, monitoring, and optimization.' },
      ]}
      color="#BE123C"
      detailCards={[
        { title: 'Network Design & Architecture', description: 'This involves the planning and implementation of network layouts, including the selection of hardware, software, protocols, and configurations to meet specific business requirements. Advanced services might involve designing resilient, scalable, and adaptable architectures capable of supporting emerging technologies such as cloud computing, IoT and SDN.' },
        { title: 'Network Security', description: 'Advanced security services are essential to protect networks from a myriad of threats, including malware, ransomware, phishing attacks, and data breaches. This may involve the deployment of advanced firewalls, intrusion detection/prevention systems (IDS/IPS), encryption technologies, secure access controls, and continuous monitoring solutions to identify and mitigate security risks in real-time.' },
        { title: 'Performance Optimization', description: 'Advance Infra Network Service focus on optimizing network performance to ensure fast and reliable access to resources and applications. This may include implementing Quality of Service (QoS) policies, traffic shaping, load balancing, and WAN optimization techniques to minimize latency, packet loss, and bottlenecks, particularly in large-scale distributed environments.' },
        { title: 'Network Monitoring & Management', description: 'Robust monitoring and management solutions are crucial for maintaining the health, availability, and performance of network infrastructures. Advanced services often utilize sophisticated monitoring tools, analytics platforms, and automation technologies to proactively identify issues, analyze traffic patterns, enforce compliance policies, and streamline administrative tasks.' },
        { title: 'Disaster Recovery & Business Continuity', description: 'Advance Infra Network Services encompass comprehensive disaster recovery and business continuity planning to minimize downtime and data loss in the event of unforeseen disasters or disruptions. This may involve implementing redundant systems, backup and recovery strategies, failover mechanisms, and geographically dispersed data centres to ensure high availability and data integrity.' },
        { title: 'Virtualization & Cloud Integration', description: 'With the increasing adoption of virtualization and cloud computing technologies, advanced network services focus on seamlessly integrating on-premises infrastructure with virtualized environments and cloud platforms. This includes designing hybrid and multi-cloud architectures, optimizing network connectivity, and implementing secure VPN solutions to facilitate seamless access to distributed resources.' },
        { title: 'Compliance & Regulatory Requirements', description: 'Advanced network infrastructure services address the complex regulatory and compliance requirements governing data privacy, security, and integrity. This involves implementing robust security controls, access policies, and audit trails to ensure compliance with industry standards such as GDPR, HIPAA, PCI DSS, and SOX.' },
      ]}
      serviceType="infrastructure"
    />
  );
}
