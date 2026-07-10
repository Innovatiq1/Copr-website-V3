import type { Metadata } from 'next';
import ProductPageTemplate from '@/components/ProductPageTemplate';

export const metadata: Metadata = {
  title: 'Learning Motivational Platform | LMP | Innovatiq Technologies',
  description: 'Innovatiq\'s Learning Motivational Platform (LMP) uses AI-powered adaptive learning, gamification, and personalised paths to boost learner engagement and performance in corporate training.',
  keywords: 'Learning Motivational Platform, LMP, Gamified Learning, AI Learning Platform, Corporate Training Motivation, Learner Engagement Software, Adaptive Learning Singapore',
  alternates: { canonical: 'https://innovatiq.com.sg/product/learning-motivational-platform' },
  openGraph: {
    title: 'AI-Powered Learning Motivational Platform',
    description: 'Boost learner engagement and performance with Innovatiq LMP — gamification, adaptive learning, and personalised journeys.',
    url: 'https://innovatiq.com.sg/product/learning-motivational-platform',
    siteName: 'Innovatiq Technologies',
    images: [{ url: '/logo/logo.png', width: 1200, height: 630, alt: 'Innovatiq Technologies' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learning Motivational Platform | Innovatiq',
    description: 'AI-powered gamified learning to drive motivation, engagement, and training completion rates.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://innovatiq.com.sg/product/learning-motivational-platform#software',
      name: 'LMP — Learning Motivational Platform',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'The Learning Motivational Platform (LMP) by Innovatiq Technologies uses AI-powered adaptive learning and gamification to boost learner motivation and drive training completion in corporate environments.',
      url: 'https://innovatiq.com.sg/product/learning-motivational-platform',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'SGD', description: 'Free trial available' },
      publisher: { '@id': 'https://innovatiq.com.sg/#organization' },
    },
    {
      '@type': 'Product',
      '@id': 'https://innovatiq.com.sg/product/learning-motivational-platform#product',
      name: 'Learning Motivational Platform (LMP)',
      description: 'AI-powered gamified learning platform for boosting learner engagement, motivation, and training completion through personalised learning paths and performance analytics.',
      brand: { '@type': 'Brand', name: 'Innovatiq Technologies' },
      url: 'https://innovatiq.com.sg/product/learning-motivational-platform',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Learning Motivational Platform?',
          acceptedAnswer: { '@type': 'Answer', text: 'The Learning Motivational Platform (LMP) by Innovatiq Technologies uses AI-powered adaptive learning and gamification to boost learner motivation and improve training completion rates in corporate settings.' },
        },
        {
          '@type': 'Question',
          name: 'How does LMP use gamification?',
          acceptedAnswer: { '@type': 'Answer', text: 'LMP uses points, badges, and recognition programs to celebrate learning achievements, drive course completion, and foster a culture of continuous growth among learners.' },
        },
        {
          '@type': 'Question',
          name: 'Does LMP provide learning analytics?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, LMP includes integrated learning analytics for tracking learner progress, engagement, and performance, enabling data-driven decisions for training improvement.' },
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
        { '@type': 'ListItem', position: 3, name: 'Learning Motivational Platform', item: 'https://innovatiq.com.sg/product/learning-motivational-platform' },
      ],
    },
  ],
};

export default function LMPPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageTemplate
        h1Title="AI-Powered Learning Motivational Platform"
        heroImageAlt="Learning Motivation Dashboard"
        name="LMP"
        subtitle="AI-Powered Learning Motivational Platform"
        tagline="Engage & Inspire Learners — Turning Learning Into a Rewarding Experience"
        description="Boost learner motivation and performance with Innovatiq's Learning Motivational Platform. Our LMP combines gamification, recognition, and personalised learning paths to keep participants engaged throughout their journey, fostering a culture of continuous growth."
        highlights={[
          'AI-Powered Adaptive Learning catering to unique needs and learning styles',
          'Integrated Learning Analytics for data-driven improvement',
          'Gamification & Rewards — celebrates achievements to drive completion',
          'Enhanced Engagement & Retention through visually rich interactive content',
        ]}
        features={[
          { title: 'AI-Powered Adaptive Learning', description: 'Our LMP utilises advanced AI algorithms to deliver adaptive learning experiences that cater to the unique needs and learning styles of each individual learner.', icon: 'Brain' },
          { title: 'Integrated Learning Analytics', description: 'Gain actionable insights into learner progress, engagement, and performance with robust analytics and reporting tools, enabling data-driven decision-making and continuous improvement.', icon: 'BarChart3' },
          { title: 'Interactive Multimedia Content', description: 'Engage learners and enhance learning experiences with interactive multimedia content such as videos, simulations, and gamified activities, fostering active participation and knowledge retention.', icon: 'Film' },
          { title: 'Personalised Learning Paths', description: 'Tailor learning paths and content to each learner\'s proficiency level, preferences, and learning objectives — maximising engagement and knowledge retention.', icon: 'Map' },
          { title: 'Performance Monitoring', description: 'Track learner performance metrics, identify areas for improvement, and optimise training strategies and content to maximise learning effectiveness.', icon: 'TrendingUp' },
          { title: 'Gamification & Rewards', description: 'Transform training into a rewarding experience with points, badges, and recognition programs that celebrate learning achievements and drive completion.', icon: 'Medal' },
          { title: 'Social Learning Features', description: 'Social feeds, peer recognition, and collaborative features that celebrate learning achievements and foster a community of continuous growth.', icon: 'ThumbsUp' },
          { title: 'Manager Insights Dashboard', description: 'Dashboards giving managers visibility into team motivation, engagement levels, and learning trends to support strategic talent development.', icon: 'Trophy' },
          { title: 'Talent Development Investment', description: 'Invest in our LMP to drive superior learning outcomes — providing personalised and adaptive learning experiences that improve learner engagement, performance, and satisfaction.', icon: 'Lightbulb' },
        ]}
        overviewPills={[
          { title: 'Personalised Learning Journeys', icon: 'Brain' },
          { title: 'Smart Content Recommendations', icon: 'Lightbulb' },
          { title: 'AI Learning Assistant', icon: 'Bot' },
          { title: 'Skill Gap Analysis', icon: 'Target' },
          { title: 'Performance Analytics', icon: 'BarChart3' },
          { title: 'Gamified Learning Experience', icon: 'Medal' },
        ]}
        gradient="linear-gradient(135deg, #881337 0%, #BE123C 50%, #E11D48 100%)"
        color="#BE123C"
        productType="lmp"
      />
    </>
  );
}
