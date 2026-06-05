import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function DigitalTransformationPage() {
  return (
    <ServicePageTemplate
      badge="Digital Transformation"
      title="Digital Transformation for Modern Enterprises"
      subtitle="At Innovatiq, we help organizations strategically adopt digital technologies to modernize operations, enhance efficiency, and drive sustainable growth."
      overview="Our end-to-end transformation framework, integrating strategy, AI-driven technology, and organizational culture, enables businesses to achieve digital maturity and stay competitive in a rapidly evolving landscape. Our AI-driven Digital Transformation services integrate strategy, technology, and culture into a unified framework that empowers organizations to embrace intelligent automation and accelerate innovation."
      overviewPoints={[
        'End-to-end digital transformation strategy and execution',
        'AI and machine learning integration into business processes',
        'Intelligent automation and workflow optimization',
        'Customer experience (CX) modernization with AI insights',
        'Data analytics and business intelligence platforms',
      ]}
      benefits={[
        { title: 'AI-Powered Holistic Transformation', description: 'Our AI-driven services integrate strategy, technology, and culture into a unified framework that empowers organizations to embrace intelligent automation and achieve sustainable, long-term growth.', icon: '🤖' },
        { title: 'AI-Enhanced Customer Experience', description: 'Leveraging AI technologies and data-driven insights, businesses can elevate customer engagement through hyper-personalized experiences, predictive service delivery, and smarter interaction models.', icon: '✨' },
        { title: 'AI-Driven Competitive Advantage', description: 'Gain a strategic edge with our AI-powered approach. By embedding intelligence into business processes and decision-making, organizations can strengthen their brand and anticipate market shifts.', icon: '🧠' },
        { title: 'Operational Efficiency', description: 'Streamline operations and reduce costs through digital optimization and intelligent process automation across your organization.', icon: '⚙️' },
        { title: 'New Revenue Streams', description: 'Identify and capitalize on new business opportunities unlocked by digital transformation and AI-driven innovation.', icon: '💡' },
        { title: 'Data-Driven Culture', description: 'Build a data-first culture with real-time analytics, dashboards, and insights that drive informed decision-making at every level.', icon: '📊' },
      ]}
      processSteps={[
        { step: '1', title: 'Vision', description: 'Define the digital vision and transformation objectives.' },
        { step: '2', title: 'Design', description: 'Design the target operating model and AI-driven technology architecture.' },
        { step: '3', title: 'Build', description: 'Develop and deploy digital solutions in agile sprints.' },
        { step: '4', title: 'Scale', description: 'Scale successful pilots and embed change across the organization.' },
      ]}
      color="#8B5CF6"
      serviceType="digital"
    />
  );
}
