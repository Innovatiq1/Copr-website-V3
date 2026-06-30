import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function SkillEraPage() {
  return (
    <ProductPageTemplate
      name="SkillEra"
      subtitle="Training Management System"
      tagline="Empower Your Workforce with Next-Generation Training Management"
      badge="Most Popular Product"
      description="Managing training shouldn't be complicated. With Innovatiq SkillEra TMS, organisations can centralise scheduling, automate course delivery, monitor progress, and generate powerful insights — all from a single platform. Whether it's compliance, skill development, or enterprise-wide upskilling, our TMS ensures learning is structured, scalable, and impactful."
      highlights={[
        'Comprehensive Training Lifecycle Management — from planning to certification',
        'AI-Powered Training Recommendations based on skills gaps and performance data',
        'Advanced Analytics and Insights for data-driven decision-making',
        'Personalised Learning Experiences tailored to individual needs',
        'Streamlined Training Operations, reducing administrative burden',
        'Multi-format content support (video, SCORM, PDF, virtual sessions)',
      ]}
      features={[
        { title: 'AI-Powered Recommendations', description: 'Leverage artificial intelligence to deliver personalised training recommendations based on learner preferences, skills gaps, and performance data.', icon: 'Brain' },
        { title: 'Training Lifecycle Management', description: 'End-to-end management of the training lifecycle, from planning and scheduling to delivery, tracking, and reporting.', icon: 'RefreshCw' },
        { title: 'Advanced Analytics', description: 'Gain valuable insights into training effectiveness, learner engagement, and performance metrics through robust analytics and reporting tools.', icon: 'BarChart3' },
        { title: 'Automated Workflows', description: 'Automate training requests, approvals, scheduling, and notifications — reducing administrative burden and improving efficiency.', icon: 'Settings' },
        { title: 'SCORM Compliance', description: 'Deliver industry-standard, interactive learning content with ease and ensure compatibility across platforms.', icon: 'CheckCircle2' },
        { title: 'Smart Enrollment Control', description: 'Automates course access, enrolling the right users at the right time with less admin work and better accuracy.', icon: 'Target' },
        { title: 'Multi-Format Content', description: 'Support for videos, SCORM packages, PDFs, live virtual conference sessions, and dynamic multimedia content.', icon: 'Film' },
        { title: 'Mobile Accessibility', description: 'Access training anytime, anywhere, on any device with our mobile-responsive platform, ensuring seamless learning for remote users.', icon: 'Smartphone' },
        { title: 'Third-Party Integration', description: 'Connect seamlessly with HRMS, LMS, CRMs, ERPs, and other enterprise business tools.', icon: 'Link2' },
      ]}
      overviewPills={[
        { title: 'AI-Generated Courses & Training Content', icon: 'Bot' },
        { title: 'AI-Based Assessments & Quizzes', icon: 'FileText' },
        { title: 'Personalised Learning Recommendations', icon: 'Brain' },
        { title: 'AI-Powered Analytics & Insights', icon: 'BarChart3' },
        { title: 'AI Learning Assistant / Chatbot', icon: 'MessageSquare' },
        { title: 'Intelligent Skill Gap Analysis', icon: 'Target' },
      ]}
      gradient="linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)"
      color="#BE123C"
      productType="tms"
      trialBadge="Start Your FREE 3-Month Trial Today!"
    />
  );
}
