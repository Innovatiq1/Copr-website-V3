import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function ConsultingPage() {
  return (
    <ServicePageTemplate
      badge="IT Consulting"
      title="Strategic IT Consulting Services"
      subtitle="Our Consulting Services provide strategic guidance, expertise, and tailored solutions to help businesses navigate complex challenges, drive innovation, and achieve sustainable growth."
      overview="With our multidisciplinary approach, industry insights, and collaborative partnership, we empower organizations to unlock their full potential and achieve their business objectives. As your trusted advisor and strategic partner, we collaborate closely with your team to understand your unique business challenges, goals, and aspirations."
      overviewPoints={[
        'Strategic guidance and IT roadmap development',
        'Customized solutions aligned with business objectives',
        'Industry insights and market trend analysis',
        'Enterprise architecture design and review',
        'Vendor evaluation and change management coaching',
      ]}
      benefits={[
        { title: 'Strategic Partnership', description: 'As your trusted advisor, we collaborate closely with your team to understand unique business challenges and develop customized strategies that drive tangible business outcomes.', icon: '🤝' },
        { title: 'Tailored Solutions', description: 'Our Consulting Services offer tailored recommendations aligned with your business objectives, industry dynamics, and market trends — enabling you to overcome challenges and capitalize on opportunities.', icon: '🎯' },
        { title: 'Business Transformation', description: 'Invest in our Consulting Services to embark on a journey of business transformation. By leveraging our expertise and proven methodologies, you can optimize operations, drive efficiency, and foster innovation.', icon: '🚀' },
        { title: 'Cost Optimization', description: 'Identify inefficiencies and optimize technology spend for maximum ROI, ensuring every investment supports your core business objectives.', icon: '💰' },
        { title: 'Risk Management', description: 'Proactively identify and mitigate technology risks before they impact business continuity or bottom line.', icon: '⚠️' },
        { title: 'Governance Frameworks', description: 'Implement IT governance structures that ensure accountability, performance, and alignment across your organization.', icon: '📊' },
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
