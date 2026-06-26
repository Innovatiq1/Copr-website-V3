import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function LearnProPage() {
  return (
    <ProductPageTemplate
      name="LearnPro"
      subtitle="Learning Management System"
      tagline="Inspire. Engage. Achieve."
      description="Deliver impactful training experiences with a platform designed to engage learners, track performance, and simplify management. Innovatiq LMS centralises learning into a single, easy-to-use platform where organisations can design, deliver, and monitor training programs with efficiency."
      highlights={[
        'Comprehensive Customization — white-label options to tailor the platform',
        'Advanced Analytics — insights into learner progress and engagement',
        'Mobile Accessibility — access training anytime, anywhere, on any device',
        'SCORM Compliance and multi-format dynamic content support',
      ]}
      features={[
        { title: 'Comprehensive Customization', description: 'Our LMS offers unparalleled customization options, allowing businesses to tailor the platform to their unique needs and branding with logo, theme, and white-label options.', icon: 'Palette' },
        { title: 'Advanced Analytics', description: 'Gain valuable insights into learner progress, engagement, and performance with our robust analytics and reporting tools.', icon: 'BarChart3' },
        { title: 'AI-Powered Recommendations', description: 'Suggests personalised courses to each learner based on their role, progress, and goals — ensuring relevant and timely learning.', icon: 'Brain' },
        { title: 'Smart Proctoring System', description: 'Ensure exam integrity with automated online invigilation tools and a dynamic certificate builder for course completions.', icon: 'Search' },
        { title: 'Assessments & Quizzes', description: 'Measure learner progress with customizable tests and evaluations, including SCORM-compliant interactive content delivery.', icon: 'FileText' },
        { title: 'Multi-Channel Support', description: 'Connect with learners through email, SMS, and in-app messaging with customizable branded email templates for every learning milestone.', icon: 'MessageSquare' },
        { title: 'Video & Virtual Conference', description: 'Deliver live and recorded sessions with dynamic content support for PDF, DOC, Audio, and Video formats for flexible learning.', icon: 'Film' },
        { title: 'Multi-Tenant Support', description: 'Serve multiple clients or departments from one centralised platform with role-based permissions and flexible system configuration.', icon: 'Building2' },
        { title: 'Third-Party Integration', description: 'Connect seamlessly with CRMs, ERPs, and other business tools with integrated payment gateways and multicurrency support.', icon: 'Link2' },
      ]}
      overviewPills={[
        { title: 'AI Course Content Generation', icon: 'Bot' },
        { title: 'AI-Based Question Bank Creation', icon: 'FileText' },
        { title: 'Automated Assessment & Grading', icon: 'CheckCircle2' },
        { title: 'Personalised Learning Paths', icon: 'Brain' },
        { title: 'AI Chatbot for Learner Support', icon: 'MessageSquare' },
        { title: 'Predictive Student Success Analytics', icon: 'TrendingUp' },
      ]}
      gradient="linear-gradient(135deg, #881337 0%, #BE123C 50%, #E11D48 100%)"
      color="#BE123C"
      productType="lms"
    />
  );
}
