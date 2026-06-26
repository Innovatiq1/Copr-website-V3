import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import { Shield, Database, Share2, Lock, Cookie, UserCheck, Clock, Mail, MapPin, Phone } from 'lucide-react';

const COLOR = '#BE123C';

const sections = [
  {
    icon: Database,
    title: '1. Information We Collect',
    content: [
      { type: 'text', value: 'We collect information that you provide directly to us, such as when you fill out a contact form, apply for a job, request a demo, or subscribe to our communications. This may include your name, email address, phone number, company name, job title, and any other information you choose to provide.' },
      { type: 'text', value: 'We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about your visit such as pages viewed and links clicked.' },
    ],
  },
  {
    icon: Shield,
    title: '2. How We Use Your Information',
    content: [
      { type: 'text', value: 'We use the information we collect to:' },
      { type: 'bullets', value: [
        'Respond to your inquiries and provide the services you request',
        'Send you technical notices, updates, security alerts, and support messages',
        'Send promotional communications, such as information about products, services, and events',
        'Monitor and analyze trends, usage, and activities in connection with our services',
        'Detect, investigate, and prevent fraudulent transactions and other illegal activities',
        'Comply with legal obligations and enforce our terms and policies',
      ]},
    ],
  },
  {
    icon: Share2,
    title: '3. Information Sharing',
    content: [
      { type: 'text', value: 'We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:' },
      { type: 'bullets', value: [
        'With your consent',
        'To our trusted service providers who assist in operating our website or conducting our business',
        'When required by law or to protect our rights',
        'In connection with a merger, acquisition, or sale of all or a portion of our assets',
      ]},
      { type: 'text', value: 'We require all third parties to respect the security of your personal data and to treat it in accordance with applicable law.' },
    ],
  },
  {
    icon: Lock,
    title: '4. Data Security',
    content: [
      { type: 'text', value: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure server connections, and access controls.' },
      { type: 'text', value: 'However, no security system is impenetrable and we cannot guarantee the security of our systems 100%. In the event that your personal information is compromised as a result of a breach, we will notify you as required by applicable law.' },
    ],
  },
  {
    icon: Cookie,
    title: '5. Cookies and Tracking Technologies',
    content: [
      { type: 'text', value: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.' },
      { type: 'text', value: 'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.' },
    ],
  },
  {
    icon: UserCheck,
    title: '6. Your Rights',
    content: [
      { type: 'text', value: 'Depending on your location, you may have certain rights regarding your personal information, including:' },
      { type: 'bullets', value: [
        'The right to access the personal information we hold about you',
        'The right to request correction of inaccurate personal information',
        'The right to request deletion of your personal information',
        'The right to object to processing of your personal information',
        'The right to data portability',
      ]},
      { type: 'text', value: 'To exercise any of these rights, please contact us using the information provided below.' },
    ],
  },
  {
    icon: Clock,
    title: '7. Retention of Data',
    content: [
      { type: 'text', value: 'We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need personal data, we securely delete or anonymize it.' },
    ],
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

      {/* Intro */}
      <section className="relative pt-8 pb-16 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden flex"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: `1px solid rgba(190,18,60,0.18)` }}>
              {/* Left panel — brand color */}
              <div className="hidden sm:flex flex-col items-center justify-center px-7 py-8 shrink-0 gap-4 relative overflow-hidden"
                style={{ background: `linear-gradient(160deg, #9F1239 0%, #BE123C 60%, #E11D48 100%)`, minWidth: '120px' }}>
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <Shield size={32} className="text-white relative z-10" strokeWidth={1.5} />
                <p className="text-[10px] font-black uppercase tracking-widest text-center relative z-10 leading-tight" style={{ color: 'rgba(255,255,255,0.92)' }}>Privacy<br/>Policy</p>
              </div>
              {/* Right panel — content */}
              <div className="p-7 flex-1" style={{ background: '#FFFFFF' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: `${COLOR}10`, color: COLOR, border: `1px solid ${COLOR}25` }}>Overview</span>
                </div>
                <p className="text-base font-bold mb-3" style={{ color: '#1a1a1a' }}>Our Commitment to Your Privacy</p>
                <p className="text-[14.5px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>
                  Innovatiq Technologies (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                  when you visit our website or use our services. By using our services, you agree to the
                  collection and use of information in accordance with this policy.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Sections */}
      <section className="relative py-16 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {sections.map((section, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div className="rounded-2xl p-7 relative overflow-hidden"
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid rgba(190,18,60,0.18)`,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                  }}>
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full"
                    style={{ background: COLOR, opacity: 0.7 }} />
                  <div className="flex items-center gap-3 mb-4 pl-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${COLOR}10`, border: `1.5px solid ${COLOR}20` }}>
                      <section.icon size={18} style={{ color: COLOR }} strokeWidth={1.75} />
                    </div>
                    <h2 className="text-lg font-bold" style={{ color: '#1a1a1a' }}>{section.title}</h2>
                  </div>
                  <div className="pl-3 space-y-3">
                    {section.content.map((block, j) =>
                      block.type === 'text' ? (
                        <p key={j} className="text-[14.5px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>
                          {block.value as string}
                        </p>
                      ) : (
                        <ul key={j} className="space-y-2 mt-1">
                          {(block.value as string[]).map((item, k) => (
                            <li key={k} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: COLOR }} />
                              <span className="text-[14.5px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="relative py-16 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, ${COLOR}07 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden flex flex-col sm:flex-row"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)' }}>

              {/* Left — brand panel */}
              <div className="relative sm:w-64 shrink-0 p-8 flex flex-col justify-between overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #9F1239 0%, #BE123C 55%, #E11D48 100%)' }}>
                {/* Decorative circles */}
                <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }} />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
                <svg className="absolute top-4 right-4 opacity-10" width="72" height="72" viewBox="0 0 80 80" fill="none">
                  <path d="M80 0 A22 22 0 0 1 58 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M80 0 A42 42 0 0 1 38 42" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M80 0 A62 62 0 0 1 18 62" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.28)' }}>
                    <Mail size={22} style={{ color: '#ffffff' }} strokeWidth={1.75} />
                  </div>
                  <p className="font-black text-lg leading-snug mb-1" style={{ color: '#ffffff' }}>8. Contact Us</p>
                  <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.90)' }}>Innovatiq Technologies</p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.85)' }}>Singapore — Asia Pacific</p>
                </div>
                <div className="relative z-10 mt-8">
                  <p className="text-[12px] font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    Have questions about our Privacy Policy or data practices? We&apos;re here to help.
                  </p>
                </div>
              </div>

              {/* Right — contact details */}
              <div className="flex-1 flex flex-col divide-y" style={{ background: '#FFFFFF', borderColor: 'rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-4 px-7 py-5 group hover:bg-[rgba(190,18,60,0.02)] transition-colors">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${COLOR}08`, border: `1.5px solid ${COLOR}18` }}>
                    <MapPin size={18} style={{ color: COLOR }} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: COLOR }}>Address</p>
                    <p className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>229 Mountbatten Rd, #01-11, Mountbatten Square, Singapore 398007</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-7 py-5 group hover:bg-[rgba(190,18,60,0.02)] transition-colors">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${COLOR}08`, border: `1.5px solid ${COLOR}18` }}>
                    <Mail size={18} style={{ color: COLOR }} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: COLOR }}>Email</p>
                    <a href="mailto:info@innovatiq.com.sg" className="text-sm font-semibold hover:underline" style={{ color: '#1a1a1a' }}>info@innovatiq.com.sg</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-7 py-5 group hover:bg-[rgba(190,18,60,0.02)] transition-colors">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${COLOR}08`, border: `1.5px solid ${COLOR}18` }}>
                    <Phone size={18} style={{ color: COLOR }} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: COLOR }}>Phone</p>
                    <a href="tel:+6567420955" className="text-sm font-semibold hover:underline" style={{ color: '#1a1a1a' }}>+(65) 674-20955</a>
                  </div>
                </div>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
