import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information that you provide directly to us, such as when you fill out a contact form, apply for a job, request a demo, or subscribe to our communications. This may include your name, email address, phone number, company name, job title, and any other information you choose to provide.

We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about your visit such as pages viewed and links clicked.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:
• Respond to your inquiries and provide the services you request
• Send you technical notices, updates, security alerts, and support messages
• Send promotional communications, such as information about products, services, and events
• Monitor and analyze trends, usage, and activities in connection with our services
• Detect, investigate, and prevent fraudulent transactions and other illegal activities
• Comply with legal obligations and enforce our terms and policies`,
  },
  {
    title: '3. Information Sharing',
    content: `We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
• With your consent
• To our trusted service providers who assist in operating our website or conducting our business
• When required by law or to protect our rights
• In connection with a merger, acquisition, or sale of all or a portion of our assets

We require all third parties to respect the security of your personal data and to treat it in accordance with applicable law.`,
  },
  {
    title: '4. Data Security',
    content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure server connections, and access controls.

However, no security system is impenetrable and we cannot guarantee the security of our systems 100%. In the event that your personal information is compromised as a result of a breach, we will notify you as required by applicable law.`,
  },
  {
    title: '5. Cookies and Tracking Technologies',
    content: `We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.`,
  },
  {
    title: '6. Your Rights',
    content: `Depending on your location, you may have certain rights regarding your personal information, including:
• The right to access the personal information we hold about you
• The right to request correction of inaccurate personal information
• The right to request deletion of your personal information
• The right to object to processing of your personal information
• The right to data portability

To exercise any of these rights, please contact us using the information provided below.`,
  },
  {
    title: '7. Retention of Data',
    content: `We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need personal data, we securely delete or anonymize it.`,
  },
  {
    title: '8. Contact Us',
    content: `If you have any questions about this Privacy Policy or our data practices, please contact us at:

Innovatiq Technologies
229 Mountbatten Rd, #01-11, Mountbatten Square
Singapore 398007
Email: info@innovatiq.com.sg
Phone: +(65) 674-20955`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        badge="Legal"
        title="Privacy Policy & Terms"
        subtitle="Last updated: January 1, 2026. Please read this Privacy Policy carefully."
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="p-8 rounded-2xl mb-8 border border-[#1D4ED8]/20"
              style={{ background: 'rgba(29,78,216,0.04)' }}>
              <p className="text-gray-600 leading-relaxed">
                Innovatiq Technologies (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website or use our services. By using our services, you agree to the
                collection and use of information in accordance with this policy.
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section, i) => (
                <div key={i} className="border-b border-gray-100 pb-8 last:border-0">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
