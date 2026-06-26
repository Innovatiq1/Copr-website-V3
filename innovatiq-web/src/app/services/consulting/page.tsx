import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function ConsultingPage() {
  return (
    <ServicePageTemplate
      badge="IT Consulting"
      title="Strategic IT Consulting Services"
      subtitle="Our Consulting Services provide strategic guidance, expertise, and tailored solutions to help businesses navigate complex challenges, drive innovation, and achieve sustainable growth."
      overview="With our integrated approach, industry insights, and collaborative partnership, we empower organisations to unlock their full potential and achieve their business objectives. As your trusted advisor and strategic partner, we collaborate closely with your team to understand your unique business challenges, goals, and aspirations."
      overviewPoints={[
        'Strategic guidance and IT roadmap development',
        'Customised solutions aligned with business objectives',
        'Industry insights and market trend analysis',
        'Enterprise architecture design and review',
        'Vendor evaluation and change management coaching',
      ]}
      benefits={[
        { title: 'Strategic Partnership', description: 'We collaborate closely with your team to understand your unique challenges and develop customised strategies that drive tangible outcomes.', icon: 'Handshake' },
        { title: 'Tailored Solutions', description: 'Tailored recommendations aligned with your business objectives and market trends — helping you overcome challenges and seize opportunities.', icon: 'Target' },
        { title: 'Business Transformation', description: 'Leverage our expertise and proven methodologies to optimise operations, drive efficiency, and foster innovation across your organisation.', icon: 'Rocket' },
        { title: 'Cost Optimisation', description: 'Identify inefficiencies and optimise technology spend for maximum ROI, ensuring every investment supports your core business objectives.', icon: 'Coins' },
        { title: 'Risk Management', description: 'Proactively identify and mitigate technology risks before they impact business continuity or bottom line.', icon: 'AlertTriangle' },
        { title: 'Governance Frameworks', description: 'Implement IT governance structures that ensure accountability, performance, and alignment across your organisation.', icon: 'BarChart3' },
      ]}
      processSteps={[
        { step: '1', title: 'Discovery', description: 'Deep-dive assessment of current state, challenges, and objectives.' },
        { step: '2', title: 'Analysis', description: 'Gap analysis and opportunity identification across technology domains.' },
        { step: '3', title: 'Strategy', description: 'Development of actionable roadmap with clear milestones and priorities.' },
        { step: '4', title: 'Execute', description: 'Support through implementation and measure business outcomes.' },
      ]}
      color="#BE123C"
      serviceType="consulting"
    />
  );
}
