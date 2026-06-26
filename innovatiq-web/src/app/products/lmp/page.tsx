import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function LMPPage() {
  return (
    <ProductPageTemplate
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
  );
}
