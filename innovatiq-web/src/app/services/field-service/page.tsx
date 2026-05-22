import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function FieldServicePage() {
  return (
    <ServicePageTemplate
      badge="Field Services"
      title="Professional Field Services"
      subtitle="On-site technical expertise delivered by certified professionals wherever you need it across the region."
      overview="Innovatiq's Field Services team provides on-site technical support, installation, maintenance, and repair services across Singapore, Malaysia, and India. Our certified field engineers are equipped with the tools and expertise to handle everything from equipment installation to complex infrastructure projects."
      overviewPoints={[
        'Hardware installation and configuration',
        'On-site break-fix and maintenance support',
        'Network cabling and structured cabling',
        'Equipment refresh and lifecycle management',
        'Multi-site rollout and deployment projects',
      ]}
      benefits={[
        { title: 'Rapid Response', description: 'Certified field engineers deployed quickly to minimize downtime.', icon: '🚀' },
        { title: 'Expert Technicians', description: 'Factory-certified technicians for major hardware and network vendors.', icon: '👷' },
        { title: 'Regional Coverage', description: 'Field service coverage across Singapore, Malaysia, and India.', icon: '🗺️' },
        { title: 'Project Management', description: 'Dedicated project managers ensuring on-time, on-budget delivery.', icon: '📊' },
        { title: 'Spare Parts Logistics', description: 'Managed spare parts inventory for rapid hardware replacement.', icon: '📦' },
        { title: 'Compliance Documentation', description: 'Detailed service reports and documentation for audit and compliance.', icon: '📋' },
      ]}
      processSteps={[
        { step: '1', title: 'Request', description: 'Submit service request through portal, phone, or email.' },
        { step: '2', title: 'Dispatch', description: 'Qualified engineer dispatched based on skills and location.' },
        { step: '3', title: 'Execute', description: 'Professional on-site service delivery with full documentation.' },
        { step: '4', title: 'Report', description: 'Detailed service report and sign-off with quality check.' },
      ]}
      color="#06B6D4"
    />
  );
}
