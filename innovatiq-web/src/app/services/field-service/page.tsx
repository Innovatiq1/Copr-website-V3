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
        { title: 'Local Support', description: 'Swift dispatch of qualified technicians to your site for any break/fix need — wherever you are.', icon: 'MapPin' },
        { title: 'Technician Management', description: 'End-to-end dispatch management — from site evaluation and check-in to ticket closure — handled seamlessly.', icon: 'HardHat' },
        { title: 'Highly Qualified Technicians', description: 'Rigorously screened, skilled field technicians available around the clock to restore your operations fast.', icon: 'Trophy' },
        { title: 'Swift Problem Resolution', description: 'Prompt diagnosis, effective solutions, and efficient fixes — minimizing disruption to your business operations.', icon: 'Rocket' },
        { title: 'Customised Solutions', description: 'Break-fix services tailored to your specific technology environment and business requirements.', icon: 'Target' },
        { title: 'Transparent Pricing', description: 'Comprehensive quotes provided upfront — clear, cost-effective pricing with no hidden surprises.', icon: 'Coins' },
      ]}
      processSteps={[
        { step: '1', title: 'Request', description: 'Submit service request through portal, phone, or email.' },
        { step: '2', title: 'Dispatch', description: 'Qualified engineer dispatched based on skills and location.' },
        { step: '3', title: 'Execute', description: 'Professional on-site service delivery with full documentation.' },
        { step: '4', title: 'Report', description: 'Detailed service report and sign-off shared with client within 24 hours.' },
      ]}
      color="#BE123C"
      serviceType="field"
    />
  );
}
