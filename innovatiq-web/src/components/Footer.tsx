import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#F1F5F9', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image src="/images/innovatiq-logo.png" alt="Innovatiq"
                width={150} height={52}
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
                className="mb-5"
              />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              We create, nurture, and supply teams to assist companies in their digital transformation Journey.
            </p>
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#D4174A] transition-all duration-300"
                  style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-5 text-xs uppercase tracking-widest">Services</h4>
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
                    className="text-slate-500 text-sm hover:text-[#D4174A] hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#D4174A] opacity-60 group-hover:opacity-100 group-hover:w-2 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products + Company */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-5 text-xs uppercase tracking-widest">Products</h4>
            <ul className="space-y-2.5 mb-6">
              {[
                ['SkillEra (TMS)', '/products/skillera'],
                ['LearnPro (LMS)', '/products/learnpro'],
                ['SecurOn (PMS)', '/products/securon'],
                ['LMP', '/products/lmp'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href}
                    className="text-slate-500 text-sm hover:text-[#D4174A] transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-amber-500 opacity-60 group-hover:opacity-100 group-hover:w-2 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-gray-800 font-semibold mb-4 text-xs uppercase tracking-widest">Company</h4>
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
                    className="text-slate-500 text-sm hover:text-[#D4174A] transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-amber-500 opacity-60 group-hover:opacity-100 group-hover:w-2 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-5 text-xs uppercase tracking-widest">Offices</h4>
            <div className="space-y-5">
              {[
                { flag: '🇸🇬', country: 'Singapore', addr: '60, Paya Lebar Road, #04-44, Paya Lebar Square, Singapore - 409051', phone: '+(65) 674-20955', email: 'info@innovatiq.com.sg' },
                { flag: '🇮🇳', country: 'India', addr: 'Salarpuria Sattva Knowledge City, Hyderabad', phone: '+91-9000534494', email: 'info@innovatiqconsulting.com' },
                { flag: '🇲🇾', country: 'Malaysia', addr: 'IIC Technology Park Malaysia, KL', phone: '+(65) 674-20955', email: 'info@innovatiq.com.sg' },
              ].map(o => (
                <div key={o.country}>
                  <p className="text-gray-700 text-xs font-semibold mb-1.5">{o.flag} {o.country}</p>
                  <div className="space-y-1">
                    <div className="flex gap-2 text-slate-500 text-xs">
                      <MapPin size={11} className="flex-shrink-0 mt-0.5" style={{ color: '#D4174A' }} />
                      <span>{o.addr}</span>
                    </div>
                    <div className="flex gap-2 text-slate-500 text-xs">
                      <Phone size={11} className="flex-shrink-0" style={{ color: '#D4174A' }} />
                      <a href={`tel:${o.phone}`} className="hover:text-[#D4174A] transition-colors">{o.phone}</a>
                    </div>
                    <div className="flex gap-2 text-slate-500 text-xs">
                      <Mail size={11} className="flex-shrink-0" style={{ color: '#D4174A' }} />
                      <a href={`mailto:${o.email}`} className="hover:text-[#D4174A] transition-colors break-all">{o.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="pt-8 mb-8" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-5 text-center">Certifications & Partnerships</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { src: '/images/image004-preview-1.png', alt: 'ISO 27001:2022' },
              { src: '/logo/image003-preview (1).png', alt: 'ISO 9001:2015' },
              { src: '/images/SME-2024-25-Logo-TM-01.png', alt: 'SME Excellence 2024-25' },
              { src: '/images/TBSQ-2024-25-Logo-TM-01-copy-2-1536x1326.png', alt: 'Top Business Service & Quality' },
              { src: '/images/image005-preview.png', alt: 'bizSAFE3' },
              { src: '/images/Data-Protection-Trustmark-Logo_Horizontal_Colour.png', alt: 'Data Protection Trustmark' },
            ].map(c => (
              <div key={c.alt}
                className="bg-white rounded-xl px-4 py-2.5 flex items-center justify-center transition-all hover:scale-105"
                style={{ minWidth: '90px', maxHeight: '50px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <Image src={c.src} alt={c.alt} width={80} height={36}
                  style={{ objectFit: 'contain', maxHeight: '34px', width: 'auto' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <p className="text-slate-400 text-xs">
            © 2026 INNOVATIQ Technologies Pte Ltd. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-slate-400">
            <Link href="/privacy-policy" className="hover:text-[#D4174A] transition-colors">Privacy Policy</Link>
            <Link href="/privacy-policy" className="hover:text-[#D4174A] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
