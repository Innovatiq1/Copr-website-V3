import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function DigitalTransformationPage() {
  return (
    <ServicePageTemplate
      badge="Digital Transformation"
      title="Digital Transformation for Modern Enterprises"
      subtitle="At Innovatiq, we help organisations strategically adopt digital technologies to modernize operations, enhance efficiency, and drive sustainable growth."
      overview="Our end-to-end transformation framework, integrating strategy, AI-driven technology, and organisational culture, enables businesses to achieve digital maturity and stay competitive in a rapidly evolving landscape. Our AI-driven Digital Transformation services integrate strategy, technology, and culture into a unified framework that empowers organisations to embrace intelligent automation and accelerate innovation."
      overviewPoints={[
        'End-to-end digital transformation strategy and execution',
        'AI and machine learning integration into business processes',
        'Intelligent automation and workflow optimisation',
        'Customer experience (CX) modernization with AI insights',
        'Data analytics and business intelligence platforms',
      ]}
      benefits={[
        { title: 'AI-Driven End-to-End Transformation', description: 'Integrate strategy, technology, and culture into a unified AI-driven framework to embrace automation and achieve sustainable growth.', icon: 'Bot' },
        { title: 'AI-Enhanced Customer Experience', description: 'Elevate customer engagement through personalised experiences, predictive service delivery, and smarter interaction models powered by AI.', icon: 'Sparkles' },
        { title: 'AI-Driven Competitive Advantage', description: 'Embed intelligence into business processes and decision-making to strengthen your brand and stay ahead of market shifts.', icon: 'Brain' },
        { title: 'Operational Efficiency', description: 'Streamline operations and reduce costs through digital optimisation and intelligent process automation across your organisation.', icon: 'Settings' },
        { title: 'New Revenue Streams', description: 'Identify and capitalize on new business opportunities unlocked by digital transformation and AI-driven innovation.', icon: 'Lightbulb' },
        { title: 'Data-Driven Culture', description: 'Build a data-first culture with real-time analytics, dashboards, and insights that drive informed decision-making at every level.', icon: 'BarChart3' },
      ]}
      processSteps={[
        { step: '1', title: 'Vision', description: 'Define the digital vision and transformation objectives.' },
        { step: '2', title: 'Design', description: 'Design the target operating model and AI-driven technology architecture.' },
        { step: '3', title: 'Build', description: 'Develop and deploy digital solutions in agile sprints.' },
        { step: '4', title: 'Scale', description: 'Scale successful pilots and embed change across the organisation.' },
      ]}
      color="#BE123C"
      serviceType="digital"
    />
  );
}
