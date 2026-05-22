import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function LMPPage() {
  return (
    <ProductPageTemplate
      name="LMP"
      subtitle="Learning Motivational Platform"
      tagline="Boost Learner Engagement with Gamification."
      description="The Learning Motivational Platform (LMP) uses the power of gamification, rewards, and social competition to dramatically increase learner engagement and training completion rates. Transform mandatory training into experiences employees actually want to participate in."
      highlights={[
        'Gamification mechanics — points, badges, leaderboards',
        'Personalized rewards and recognition programs',
        'Team challenges and competitive learning events',
        'Progress visualization with achievement milestones',
        'Manager dashboards for team motivation insights',
        'Integration with SkillEra and LearnPro',
      ]}
      features={[
        { title: 'Points & Badges', description: 'Award points and digital badges for completing courses, achieving milestones, and demonstrating skills.', icon: '🏅' },
        { title: 'Leaderboards', description: 'Dynamic leaderboards fostering healthy competition among peers and teams across the organization.', icon: '🏆' },
        { title: 'Challenges', description: 'Create time-limited learning challenges and competitions to drive engagement spikes.', icon: '⚡' },
        { title: 'Rewards Catalog', description: 'Redeemable rewards catalog where employees convert earned points into real benefits.', icon: '🎁' },
        { title: 'Social Features', description: 'Social feeds, shout-outs, and peer recognition features that celebrate learning achievements.', icon: '👏' },
        { title: 'Progress Paths', description: 'Visual learning journeys with clear milestones that motivate learners to complete their paths.', icon: '🗺️' },
        { title: 'Manager Insights', description: 'Dashboards giving managers visibility into team motivation, engagement, and learning trends.', icon: '📊' },
        { title: 'Notifications', description: 'Personalized push notifications and nudges keeping learners engaged and on track.', icon: '🔔' },
        { title: 'Analytics', description: 'Deep engagement analytics showing what motivates your workforce and drives completion.', icon: '📈' },
      ]}
      gradient="linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)"
      color="#7c3aed"
    />
  );
}
