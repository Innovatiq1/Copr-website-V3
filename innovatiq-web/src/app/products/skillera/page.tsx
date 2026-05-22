import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function SkillEraPage() {
  return (
    <ProductPageTemplate
      name="SkillEra"
      subtitle="Training Management System"
      tagline="Smart Learning. Simplified Growth."
      badge="Most Popular Product"
      description="SkillEra is an AI-powered Training Management System that transforms how organizations plan, deliver, and measure employee training. From scheduling and resource management to certification tracking and ROI analytics, SkillEra provides complete visibility into your training ecosystem."
      highlights={[
        'AI-powered training recommendations based on skills gaps',
        'Complete training lifecycle management in one platform',
        'Advanced analytics and ROI measurement',
        'Automated workflows and approval processes',
        'Multi-format content support (video, SCORM, PDF)',
        'Mobile-first design for learning on the go',
      ]}
      features={[
        { title: 'AI Recommendations', description: 'Intelligent algorithms analyze skill gaps and recommend personalized training paths for each employee.', icon: '🧠' },
        { title: 'Training Lifecycle', description: 'Manage the complete training lifecycle from planning to delivery, tracking, and certification.', icon: '🔄' },
        { title: 'Analytics Dashboard', description: 'Real-time dashboards showing training completion, performance metrics, and business impact.', icon: '📊' },
        { title: 'Automated Workflows', description: 'Automate training requests, approvals, scheduling, and notifications to save admin time.', icon: '⚙️' },
        { title: 'Resource Management', description: 'Efficiently manage trainers, venues, equipment, and training materials in one place.', icon: '📦' },
        { title: 'Compliance Tracking', description: 'Ensure mandatory training compliance with automated reminders and certification management.', icon: '✅' },
        { title: 'Multi-Format Content', description: 'Support for videos, SCORM packages, PDFs, live sessions, and virtual training delivery.', icon: '🎬' },
        { title: 'Mobile Learning', description: 'Responsive mobile app allowing employees to learn anywhere, anytime, on any device.', icon: '📱' },
        { title: 'Integration Ready', description: 'Seamless integration with HRMS, LMS, Active Directory, and enterprise systems.', icon: '🔗' },
      ]}
      gradient="linear-gradient(135deg, #D4174A 0%, #A8102E 100%)"
      color="#D4174A"
    />
  );
}
