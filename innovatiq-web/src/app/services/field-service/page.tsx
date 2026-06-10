import ServicePageTemplate from '@/components/ServicePageTemplate';

export default function FieldServicePage() {
  return (
    <ServicePageTemplate
      badge="Field Services"
      title="Professional IT Field Services"
      subtitle="At Innovatiq, we understand the critical importance of maintaining uninterrupted operations in today's fast-paced digital landscape. That's why we offer comprehensive breakfix support services."
      overview="Our dedicated team of skilled technicians is equipped with the expertise and tools necessary to diagnose, troubleshoot, and resolve a wide range of software, hardware, and network-related issues. Our technicians are available around the clock to provide timely assistance and minimize downtime — whether it's resolving software glitches, replacing hardware, or restoring network connectivity."
      overviewPoints={[
        'Troubleshooting and L1 support for all IT issues',
        'Seamless vendor support and coordination',
        'Comprehensive service desk management',
        'Warehousing and component replacement services',
        'Breakfix support with 24/7 technician dispatch',
      ]}
      benefits={[
        { title: 'Local Support', description: 'We manage a wide array of field services, catering to diverse needs. Whether you require a break/fix solution nearby, we swiftly dispatch a technician with the necessary qualifications to your site.', icon: '📍' },
        { title: 'Technician Management', description: 'Our dispatch services encompass everything from site evaluation to technician preparation, check-in, check-out, and ticket closure — ensuring a seamless process from start to finish.', icon: '👷' },
        { title: 'Highly Qualified Technicians', description: 'Utilizing our Partner Alliance, rigorously screened talent pool, and advanced ticketing technology, we deploy skilled field technicians around the clock to swiftly restore your operations.', icon: '🏆' },
        { title: 'Swift Problem Resolution', description: 'Our support services assure swift and effective resolution of issues. Our technicians are committed to promptly diagnosing issues, devising effective solutions, and implementing fixes efficiently.', icon: '🚀' },
        { title: 'Customized Solutions', description: 'We understand that each business has distinct characteristics and technology obstacles that demand individualized care. Our break-fix support services are crafted to meet your particular requirements.', icon: '🎯' },
        { title: 'Cost Effective & Transparent Pricing', description: 'We provide cost-effective and transparent pricing for our break-fix support services, furnishing comprehensive quotes in advance so you can make well-informed decisions for your business.', icon: '💰' },
      ]}
      processSteps={[
        { step: '1', title: 'Request', description: 'Submit service request through portal, phone, or email.' },
        { step: '2', title: 'Dispatch', description: 'Qualified engineer dispatched based on skills and location.' },
        { step: '3', title: 'Execute', description: 'Professional on-site service delivery with full documentation.' },
        { step: '4', title: 'Report', description: 'Detailed service report and sign-off with quality check.' },
      ]}
      color="#1D4ED8"
      serviceType="field"
    />
  );
}
