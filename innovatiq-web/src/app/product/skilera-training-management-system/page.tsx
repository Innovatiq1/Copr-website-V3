import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'SkillEra Training Management System | Innovatiq Technologies',
  description: 'SkillEra by Innovatiq is an AI-powered Training Management System (TMS) that automates training scheduling, tracks compliance, and delivers personalised learning experiences for enterprise teams.',
  keywords: 'Training Management System, TMS, SkillEra, AI Training Platform, Employee Training Software, Compliance Training, Corporate Training Management Singapore',
  alternates: { canonical: 'https://innovatiq.com.sg/product/skilera-training-management-system' },
  openGraph: {
    title: 'SkillEra AI-Powered Training Management System',
    description: 'Automate training operations, track compliance, and deliver personalised learning with SkillEra TMS.',
    url: 'https://innovatiq.com.sg/product/skilera-training-management-system',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillEra Training Management System | Innovatiq',
    description: 'AI-powered TMS for enterprise training — scheduling, tracking, compliance, and analytics.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://innovatiq.com.sg/product/skilera-training-management-system#software',
      name: 'SkillEra',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'SkillEra is an AI-powered Training Management System that automates training scheduling, tracks compliance, and delivers personalised learning experiences for enterprise teams.',
      url: 'https://innovatiq.com.sg/product/skilera-training-management-system',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'SGD', description: 'Free 3-month trial available' },
      publisher: { '@id': 'https://innovatiq.com.sg/#organization' },
    },
    {
      '@type': 'Product',
      '@id': 'https://innovatiq.com.sg/product/skilera-training-management-system#product',
      name: 'SkillEra Training Management System',
      description: 'AI-powered Training Management System for enterprise training lifecycle management, compliance tracking, and personalised learning delivery.',
      brand: { '@type': 'Brand', name: 'Innovatiq Technologies' },
      url: 'https://innovatiq.com.sg/product/skilera-training-management-system',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is SkillEra?',
          acceptedAnswer: { '@type': 'Answer', text: 'SkillEra is an AI-powered Training Management System (TMS) by Innovatiq Technologies that automates training scheduling, compliance tracking, and personalised learning for enterprise teams.' },
        },
        {
          '@type': 'Question',
          name: 'Does SkillEra support SCORM compliance?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, SkillEra supports SCORM-compliant content and multiple formats including video, PDF, and virtual conference sessions.' },
        },
        {
          '@type': 'Question',
          name: 'Can SkillEra integrate with HRMS and LMS systems?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, SkillEra integrates seamlessly with HRMS, LMS, CRM, ERP, and other enterprise tools for a unified training ecosystem.' },
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
        { '@type': 'ListItem', position: 3, name: 'SkillEra Training Management System', item: 'https://innovatiq.com.sg/product/skilera-training-management-system' },
      ],
    },
  ],
};

export default function SkillEraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageTemplate
        h1Title="SkillEra AI-Powered Training Management System"
        heroImageAlt="SkillEra Training Management System"
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
    </>
  );
}
