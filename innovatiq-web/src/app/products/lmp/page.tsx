import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function LMPPage() {
  return (
    <ProductPageTemplate
      name="LMP"
      subtitle="Learning Motivational Platform"
      tagline="Engage & Inspire Learners — Turning Learning Into a Rewarding Experience"
      description="Boost learner motivation and performance with Innovatiq's Learning Motivational Platform. Our LMP is designed to make learning more engaging, personalized, and impactful — helping organizations create a culture of continuous growth. Training is only effective when learners stay motivated. Innovatiq's LMP combines gamification, recognition, and personalized learning paths to keep participants engaged throughout their journey."
      highlights={[
        'AI-Powered Adaptive Learning catering to unique needs and learning styles',
        'Integrated Learning Analytics for data-driven decision-making and improvement',
        'Interactive Multimedia Content — videos, simulations, and gamified activities',
        'Personalized Learning Paths tailored to each learner\'s proficiency and objectives',
        'Performance Monitoring & Optimization for continuous improvement',
        'Enhanced Engagement & Retention through visually rich interactive content',
      ]}
      features={[
        { title: 'AI-Powered Adaptive Learning', description: 'Our LMP utilizes advanced AI algorithms to deliver adaptive learning experiences that cater to the unique needs and learning styles of each individual learner.', icon: '🧠' },
        { title: 'Integrated Learning Analytics', description: 'Gain actionable insights into learner progress, engagement, and performance with robust analytics and reporting tools, enabling data-driven decision-making and continuous improvement.', icon: '📊' },
        { title: 'Interactive Multimedia Content', description: 'Engage learners and enhance learning experiences with interactive multimedia content such as videos, simulations, and gamified activities, fostering active participation and knowledge retention.', icon: '🎬' },
        { title: 'Personalized Learning Paths', description: 'Tailor learning paths and content to each learner\'s proficiency level, preferences, and learning objectives — maximizing engagement and knowledge retention.', icon: '🗺️' },
        { title: 'Performance Monitoring', description: 'Track learner performance metrics, identify areas for improvement, and optimize training strategies and content to maximize learning effectiveness.', icon: '📈' },
        { title: 'Gamification & Rewards', description: 'Transform training into a rewarding experience with points, badges, and recognition programs that celebrate learning achievements and drive completion.', icon: '🏅' },
        { title: 'Social Learning Features', description: 'Social feeds, peer recognition, and collaborative features that celebrate learning achievements and foster a community of continuous growth.', icon: '👏' },
        { title: 'Manager Insights Dashboard', description: 'Dashboards giving managers visibility into team motivation, engagement levels, and learning trends to support strategic talent development.', icon: '🏆' },
        { title: 'Talent Development Investment', description: 'Invest in our LMP to drive superior learning outcomes — providing personalized and adaptive learning experiences that improve learner engagement, performance, and satisfaction.', icon: '💡' },
      ]}
      gradient="linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)"
      color="#7c3aed"
      productType="lmp"
    />
  );
}
