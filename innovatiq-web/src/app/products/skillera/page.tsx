import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function SkillEraPage() {
  return (
    <ProductPageTemplate
      name="SkillEra"
      subtitle="Training Management System"
      tagline="Empower Your Workforce with Next-Generation Training Management"
      badge="Most Popular Product"
      description="Managing training shouldn't be complicated. With Innovatiq SkillEra TMS, organizations can centralize scheduling, automate course delivery, monitor progress, and generate powerful insights — all from a single platform. Whether it's compliance, skill development, or enterprise-wide upskilling, our TMS ensures learning is structured, scalable, and impactful."
      highlights={[
        'Comprehensive Training Lifecycle Management — from planning to certification',
        'AI-Powered Training Recommendations based on skills gaps and performance data',
        'Advanced Analytics and Insights for data-driven decision-making',
        'Personalized Learning Experiences tailored to individual needs',
        'Streamlined Training Operations reducing administrative burden',
        'Multi-format content support (video, SCORM, PDF, virtual sessions)',
      ]}
      features={[
        { title: 'AI-Powered Recommendations', description: 'Leverage artificial intelligence to deliver personalized training recommendations based on learner preferences, skills gaps, and performance data.', icon: '🧠' },
        { title: 'Training Lifecycle Management', description: 'End-to-end management of the training lifecycle, from planning and scheduling to delivery, tracking, and reporting.', icon: '🔄' },
        { title: 'Advanced Analytics', description: 'Gain valuable insights into training effectiveness, learner engagement, and performance metrics through robust analytics and reporting tools.', icon: '📊' },
        { title: 'Automated Workflows', description: 'Automate training requests, approvals, scheduling, and notifications — reducing administrative burden and improving efficiency.', icon: '⚙️' },
        { title: 'SCORM Compliance', description: 'Deliver industry-standard, interactive learning content with ease and ensure compatibility across platforms.', icon: '✅' },
        { title: 'Smart Enrollment Control', description: 'Automates course access, enrolling the right users at the right time with less admin work and better accuracy.', icon: '🎯' },
        { title: 'Multi-Format Content', description: 'Support for videos, SCORM packages, PDFs, live virtual conference sessions, and dynamic multimedia content.', icon: '🎬' },
        { title: 'Mobile Accessibility', description: 'Access training anytime, anywhere, on any device with our mobile-responsive platform, ensuring seamless learning for remote users.', icon: '📱' },
        { title: 'Third-Party Integration', description: 'Connect seamlessly with HRMS, LMS, CRMs, ERPs, and other enterprise business tools.', icon: '🔗' },
      ]}
      gradient="linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)"
      color="#1D4ED8"
      productType="tms"
    />
  );
}
