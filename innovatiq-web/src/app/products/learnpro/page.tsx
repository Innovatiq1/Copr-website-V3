import ProductPageTemplate from '@/components/ProductPageTemplate';

export default function LearnProPage() {
  return (
    <ProductPageTemplate
      name="LearnPro"
      subtitle="Learning Management System"
      tagline="Next-Gen LMS Platform for Modern Organizations."
      description="LearnPro is a powerful Learning Management System that enables organizations to create, manage, and deliver engaging online training programs at scale. With an intuitive course builder, rich media support, and detailed analytics, LearnPro makes corporate learning effective and measurable."
      highlights={[
        'Drag-and-drop course builder with rich media support',
        'Blended learning — online, virtual, and in-person',
        'Automated certification and renewal management',
        'Social learning features for collaborative development',
        'Detailed learner analytics and progress tracking',
        'SCORM/xAPI compliant content library',
      ]}
      features={[
        { title: 'Course Builder', description: 'Intuitive drag-and-drop course builder with support for videos, quizzes, and interactive content.', icon: '✏️' },
        { title: 'Progress Tracking', description: 'Real-time visibility into learner progress, completion rates, and assessment scores.', icon: '📈' },
        { title: 'Certifications', description: 'Automated certificate generation and management with expiry tracking and renewal reminders.', icon: '🎓' },
        { title: 'Social Learning', description: 'Discussion forums, peer reviews, and collaborative learning features to boost engagement.', icon: '💬' },
        { title: 'Assessments', description: 'Multiple assessment types including quizzes, assignments, and practical evaluations.', icon: '📝' },
        { title: 'Blended Learning', description: 'Combine online, virtual classroom, and in-person training in a unified learning journey.', icon: '🔀' },
        { title: 'Content Library', description: 'Centralized content library with version control and SCORM/xAPI compliance.', icon: '📚' },
        { title: 'White Labeling', description: 'Fully customizable interface with your branding, colors, and domain.', icon: '🎨' },
        { title: 'Multi-Language', description: 'Support for multiple languages to serve your global workforce effectively.', icon: '🌍' },
      ]}
      gradient="linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)"
      color="#1e40af"
    />
  );
}
