import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function ConsultingPage() {
  return (
    <ServicePageTemplate
      badge="IT Consulting"
      title="Strategic IT Consulting"
      subtitle="Align technology with your business strategy and unlock new growth opportunities with expert IT advisory services."
      overview="Innovatiq's IT consulting team brings decades of experience helping enterprises make smarter technology investments. From IT strategy and roadmap development to vendor selection and change management, we provide the guidance needed to transform technology from a cost center into a competitive advantage."
      overviewPoints={[
        'IT strategy development and digital roadmaps',
        'Technology portfolio assessment and rationalization',
        'Enterprise architecture design and review',
        'Vendor evaluation and procurement advisory',
        'Change management and transformation coaching',
      ]}
      benefits={[
        { title: 'Strategic Alignment', description: 'Ensure every technology investment supports your core business objectives.', icon: '🎯' },
        { title: 'Cost Optimization', description: 'Identify inefficiencies and optimize technology spend for maximum ROI.', icon: '💰' },
        { title: 'Risk Management', description: 'Proactively identify and mitigate technology risks before they impact business.', icon: '⚠️' },
        { title: 'Innovation Roadmap', description: 'Build a clear path to adopt emerging technologies like AI and automation.', icon: '🗺️' },
        { title: 'Vendor Management', description: 'Optimize your vendor relationships and negotiate better contract terms.', icon: '🤝' },
        { title: 'Governance Frameworks', description: 'Implement IT governance structures that ensure accountability and performance.', icon: '📊' },
      ]}
      processSteps={[
        { step: '1', title: 'Discovery', description: 'Deep-dive assessment of current state, challenges, and objectives.' },
        { step: '2', title: 'Analysis', description: 'Gap analysis and opportunity identification across technology domains.' },
        { step: '3', title: 'Strategy', description: 'Development of actionable roadmap with clear milestones and priorities.' },
        { step: '4', title: 'Execute', description: 'Support through implementation and measure business outcomes.' },
      ]}
      color="#9B7522"
    />
  );
}
