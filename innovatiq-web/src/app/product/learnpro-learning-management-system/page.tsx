import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'LearnPro Learning Management System | Innovatiq Technologies',
  description: 'LearnPro by Innovatiq is a feature-rich LMS that helps organisations design, deliver, and track online training programs with AI-powered learning paths and advanced analytics.',
  keywords: 'Learning Management System, LMS, LearnPro, Online Training Platform, E-learning Software, Corporate LMS Singapore, AI Learning Platform',
  alternates: { canonical: 'https://innovatiq.com.sg/product/learnpro-learning-management-system' },
  openGraph: {
    title: 'LearnPro AI Learning Management System',
    description: 'Deliver impactful learning experiences with LearnPro LMS — personalised paths, advanced analytics, and SCORM compliance.',
    url: 'https://innovatiq.com.sg/product/learnpro-learning-management-system',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnPro LMS | Innovatiq Technologies',
    description: 'Feature-rich LMS for corporate training — AI recommendations, multi-format content, and mobile access.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://innovatiq.com.sg/product/learnpro-learning-management-system#software',
      name: 'LearnPro',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'LearnPro is a feature-rich Learning Management System for designing, delivering, and tracking corporate training programs with AI-powered learning paths and advanced analytics.',
      url: 'https://innovatiq.com.sg/product/learnpro-learning-management-system',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'SGD', description: 'Free trial available' },
      publisher: { '@id': 'https://innovatiq.com.sg/#organization' },
    },
    {
      '@type': 'Product',
      '@id': 'https://innovatiq.com.sg/product/learnpro-learning-management-system#product',
      name: 'LearnPro Learning Management System',
      description: 'AI-powered Learning Management System for online training delivery, learner analytics, and personalised learning path management.',
      brand: { '@type': 'Brand', name: 'Innovatiq Technologies' },
      url: 'https://innovatiq.com.sg/product/learnpro-learning-management-system',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is LearnPro?',
          acceptedAnswer: { '@type': 'Answer', text: 'LearnPro is an AI-powered Learning Management System (LMS) by Innovatiq Technologies for designing, delivering, and tracking corporate training programs with personalised learning paths.' },
        },
        {
          '@type': 'Question',
          name: 'Does LearnPro support mobile learning?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, LearnPro is fully mobile-responsive and supports learning anytime, anywhere, on any device.' },
        },
        {
          '@type': 'Question',
          name: 'What content formats does LearnPro support?',
          acceptedAnswer: { '@type': 'Answer', text: 'LearnPro supports video, SCORM, PDF, DOC, audio, and live virtual conference sessions for flexible learning delivery.' },
        },
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://innovatiq.com.sg/#organization',
      name: 'Innovatiq Technologies',
      url: 'https://innovatiq.com.sg',
      logo: 'https://innovatiq.com.sg/logo/logo.png',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://innovatiq.com.sg' },
        { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://innovatiq.com.sg/#products' },
        { '@type': 'ListItem', position: 3, name: 'LearnPro Learning Management System', item: 'https://innovatiq.com.sg/product/learnpro-learning-management-system' },
      ],
    },
  ],
};

export default function LearnProPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageTemplate
        h1Title="LearnPro AI Learning Management System"
        heroImageAlt="LearnPro LMS Dashboard"
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
    </>
  );
}
