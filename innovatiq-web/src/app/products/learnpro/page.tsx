import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function LearnProPage() {
  return (
    <ProductPageTemplate
      name="LearnPro"
      subtitle="Learning Management System"
      tagline="Inspire. Engage. Achieve."
      description="Deliver impactful training experiences with a platform designed to engage learners, track performance, and simplify management. Innovatiq LMS empowers organizations to upskill teams effortlessly and achieve measurable learning outcomes. Traditional training methods can be time-consuming and hard to track — our LMS centralizes learning into a single, easy-to-use platform where organizations can design, deliver, and monitor training programs with efficiency."
      highlights={[
        'Comprehensive Customization — tailor the platform to your unique needs and branding',
        'Advanced Analytics — insights into learner progress, engagement, and performance',
        'Mobile Accessibility — access training anytime, anywhere, on any device',
        'Enhanced Learning Experience with interactive features and personalized paths',
        'Scalability & Flexibility to adapt to changing business needs',
        'SCORM Compliance and multi-format dynamic content support',
      ]}
      features={[
        { title: 'Comprehensive Customization', description: 'Our LMS offers unparalleled customization options, allowing businesses to tailor the platform to their unique needs and branding with logo, theme, and white-label options.', icon: '🎨' },
        { title: 'Advanced Analytics', description: 'Gain valuable insights into learner progress, engagement, and performance with our robust analytics and reporting tools.', icon: '📊' },
        { title: 'AI-Powered Recommendations', description: 'Suggests personalized courses to each learner based on their role, progress, and goals — ensuring relevant and timely learning.', icon: '🧠' },
        { title: 'Smart Proctoring System', description: 'Ensure exam integrity with automated online invigilation tools and a dynamic certificate builder for course completions.', icon: '🔍' },
        { title: 'Assessments & Quizzes', description: 'Measure learner progress with customizable tests and evaluations, including SCORM-compliant interactive content delivery.', icon: '📝' },
        { title: 'Multi-Channel Support', description: 'Connect with learners through email, SMS, and in-app messaging with customizable branded email templates for every learning milestone.', icon: '💬' },
        { title: 'Video & Virtual Conference', description: 'Deliver live and recorded sessions with dynamic content support for PDF, Doc, Audio, and Video formats for flexible learning.', icon: '🎬' },
        { title: 'Multi-Tenant Support', description: 'Serve multiple clients or departments from one centralized platform with role-based permissions and flexible system configuration.', icon: '🏢' },
        { title: 'Third-Party Integration', description: 'Connect seamlessly with CRMs, ERPs, and other business tools with integrated payment gateways and multicurrency support.', icon: '🔗' },
      ]}
      gradient="linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%)"
      color="#1D4ED8"
      productType="lms"
    />
  );
}
