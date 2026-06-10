import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const CRIMSON = '#FDA4AF';
const GOLD    = '#FECDD3';
const NAVY    = '#0F172A';
const NAVY2   = '#881337';

export default function Footer() {
  return (
    <footer style={{ background: `linear-gradient(135deg, #3A0F1E 0%, #2C1510 50%, #3A0F1E 100%)`, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image src="/images/innovatiq-logo.png" alt="Innovatiq"
                width={150} height={52}
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
                className="mb-5 brightness-0 invert"
              />
            </Link>
            <p className="text-sm font-semibold leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.80)' }}>
              We create, nurture, and supply teams to assist companies in their digital transformation journey.
            </p>
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.90)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = CRIMSON; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.90)'; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest" style={{ color: '#fff' }}>Services</h4>
            <ul className="space-y-2.5">
              {[
                ['Digital Transformation', '/services/digital-transformation'],
                ['Cloud Services', '/services/cloud'],
                ['Cyber Security', '/services/cyber-security'],
                ['Managed Services', '/services/managed-it'],
                ['IT Consulting', '/services/consulting'],
                ['Field Services', '/services/field-service'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href}
                    className="text-sm font-semibold transition-all inline-flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.80)' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#fff'; el.style.transform = 'translateX(5px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(255,255,255,0.80)'; el.style.transform = 'translateX(0)'; }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: CRIMSON }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest" style={{ color: '#fff' }}>Products</h4>
            <ul className="space-y-2.5">
              {[
                ['SkillEra (TMS)', '/products/skillera'],
                ['LearnPro (LMS)', '/products/learnpro'],
                ['SecurOn (PMS)', '/products/securon'],
                ['LMP', '/products/lmp'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href}
                    className="text-sm font-semibold transition-all inline-flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.80)' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#fff'; el.style.transform = 'translateX(5px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(255,255,255,0.80)'; el.style.transform = 'translateX(0)'; }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest" style={{ color: '#fff' }}>Company</h4>
            <ul className="space-y-2.5">
              {[
                ['About Us', '/about'],
                ['Our Team', '/team'],
                ['Careers', '/careers'],
                ['Blogs', '/blogs'],
                ['Awards', '/awards'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href}
                    className="text-sm font-semibold transition-all inline-flex items-center gap-2 group"
                    style={{ color: 'rgba(255,255,255,0.80)' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#fff'; el.style.transform = 'translateX(5px)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(255,255,255,0.80)'; el.style.transform = 'translateX(0)'; }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest" style={{ color: '#fff' }}>Get in Touch</h4>
            <div className="space-y-4">
              {[
                { Icon: Phone,  label: 'Call us',  value: '+(65) 674-20955',       href: 'tel:+6567420955' },
                { Icon: Mail,   label: 'Email us', value: 'info@innovatiq.com.sg',  href: 'mailto:info@innovatiq.com.sg' },
                { Icon: MapPin, label: 'Office',   value: 'Singapore · India · Malaysia', href: '/about' },
              ].map(({ Icon, label, value, href }) => (
                <a key={label} href={href}
                  className="flex items-center gap-3 group transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)', boxShadow: '0 0 14px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
                    <Icon size={16} style={{ color: '#FFFFFF' }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: '#fff' }}>{label}:</p>
                    <p className="text-xs font-semibold transition-colors group-hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.80)' }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Certifications */}
        <div className="pt-8 mb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-5 text-center"
            style={{ color: 'rgba(255,255,255,0.85)' }}>
            Certifications &amp; Partnerships
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { src: '/images/image004-preview-1.png', alt: 'ISO 27001:2022' },
              { src: '/logo/image003-preview (1).png', alt: 'ISO 9001:2015' },
              { src: '/images/SME-2024-25-Logo-TM-01.png', alt: 'SME Excellence' },
              { src: '/images/TBSQ-2024-25-Logo-TM-01-copy-2-1536x1326.png', alt: 'Top Business Service' },
              { src: '/images/image005-preview.png', alt: 'bizSAFE3' },
              { src: '/images/Data-Protection-Trustmark-Logo_Horizontal_Colour.png', alt: 'Data Protection' },
            ].map(c => (
              <div key={c.alt}
                className="rounded-xl px-4 py-2.5 flex items-center justify-center transition-all hover:scale-105"
                style={{ minWidth: '90px', maxHeight: '50px', background: '#fff', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
                <Image src={c.src} alt={c.alt} width={80} height={36}
                  style={{ objectFit: 'contain', maxHeight: '34px', width: 'auto' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
            © 2026 INNOVATIQ Technologies Pte Ltd. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
            <Link href="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
