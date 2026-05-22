import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function DigitalTransformationPage() {
  return (
    <ServicePageTemplate
      badge="Digital Transformation"
      title="Digital Transformation Services"
      subtitle="Reimagine your business with AI, automation, and modern digital platforms that drive sustainable competitive advantage."
      overview="Digital transformation is not just about technology — it's about fundamentally reimagining how your business operates and delivers value. Innovatiq guides enterprises through end-to-end transformation journeys, from strategy to execution, leveraging AI, cloud, data, and automation to create new business models and customer experiences."
      overviewPoints={[
        'End-to-end digital transformation strategy and execution',
        'AI and machine learning integration into business processes',
        'Process automation and intelligent workflow design',
        'Customer experience (CX) modernization',
        'Data analytics and business intelligence platforms',
      ]}
      benefits={[
        { title: 'Process Automation', description: 'Automate repetitive tasks and workflows, freeing your team for high-value work.', icon: '🤖' },
        { title: 'AI-Powered Insights', description: 'Harness AI and machine learning to gain deeper business intelligence.', icon: '🧠' },
        { title: 'Customer Experience', description: 'Create seamless, personalized digital experiences that delight customers.', icon: '✨' },
        { title: 'Operational Efficiency', description: 'Streamline operations and reduce costs through digital optimization.', icon: '⚙️' },
        { title: 'New Revenue Streams', description: 'Identify and capitalize on new business opportunities enabled by digital.', icon: '💡' },
        { title: 'Data-Driven Culture', description: 'Build a data-first culture with real-time analytics and dashboards.', icon: '📊' },
      ]}
      processSteps={[
        { step: '1', title: 'Vision', description: 'Define the digital vision and transformation objectives.' },
        { step: '2', title: 'Design', description: 'Design the target operating model and technology architecture.' },
        { step: '3', title: 'Build', description: 'Develop and deploy digital solutions in agile sprints.' },
        { step: '4', title: 'Scale', description: 'Scale successful pilots and embed change across the organization.' },
      ]}
      color="#8B5CF6"
    />
  );
}
