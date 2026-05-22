import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0B1D35' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image src="/images/innovatiq-logo.png" alt="Innovatiq"
                width={150} height={52}
                style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                className="mb-5"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering enterprises through AI-driven digital transformation,
              cloud innovation, and end-to-end IT solutions across Asia Pacific.
            </p>
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#D4174A] transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,.06)' }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Services</h4>
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
                    className="text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#D4174A] group-hover:w-2 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products + Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Products</h4>
            <ul className="space-y-2.5 mb-6">
              {[
                ['SkillEra (TMS)', '/products/skillera'],
                ['LearnPro (LMS)', '/products/learnpro'],
                ['SecurOn (PMS)', '/products/securon'],
                ['LMP', '/products/lmp'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href}
                    className="text-gray-400 text-sm hover:text-white transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#9B7522] group-hover:w-2 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">Company</h4>
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
                    className="text-gray-400 text-sm hover:text-white transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#9B7522] group-hover:w-2 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Offices</h4>
            <div className="space-y-5">
              {[
                { flag: '🇸🇬', country: 'Singapore', addr: '229 Mountbatten Rd, #01-11', phone: '+(65) 674-20955', email: 'info@innovatiq.com.sg' },
                { flag: '🇮🇳', country: 'India', addr: 'Salarpuria Sattva Knowledge City, Hyderabad', phone: '+91-9000534494', email: 'info@innovatiqconsulting.com' },
                { flag: '🇲🇾', country: 'Malaysia', addr: 'IIC Technology Park Malaysia, KL', phone: '+(65) 674-20955', email: 'info@innovatiq.com.sg' },
              ].map(o => (
                <div key={o.country}>
                  <p className="text-white text-xs font-semibold mb-1.5">{o.flag} {o.country}</p>
                  <div className="space-y-1">
                    <div className="flex gap-2 text-gray-400 text-xs">
                      <MapPin size={11} className="flex-shrink-0 mt-0.5" style={{ color: '#D4174A' }} />
                      <span>{o.addr}</span>
                    </div>
                    <div className="flex gap-2 text-gray-400 text-xs">
                      <Phone size={11} className="flex-shrink-0" style={{ color: '#D4174A' }} />
                      <a href={`tel:${o.phone}`} className="hover:text-white transition-colors">{o.phone}</a>
                    </div>
                    <div className="flex gap-2 text-gray-400 text-xs">
                      <Mail size={11} className="flex-shrink-0" style={{ color: '#D4174A' }} />
                      <a href={`mailto:${o.email}`} className="hover:text-white transition-colors break-all">{o.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-5 text-center">Certifications & Partnerships</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { src: '/images/SME-2024-25-Logo-TM-01.png', alt: 'SME 2024-25' },
              { src: '/images/TBSQ-2024-25-Logo-TM-01-copy-2-1536x1326.png', alt: 'TBSQ 2024-25' },
              { src: '/images/Data-Protection-Trustmark-Logo_Horizontal_Colour.png', alt: 'Data Protection Trustmark' },
              { src: '/logo/image003-preview (1).png', alt: 'ISO 9001:2015' },
            ].map(c => (
              <div key={c.alt}
                className="bg-white rounded-xl px-4 py-2.5 flex items-center justify-center transition-all hover:scale-105"
                style={{ minWidth: '90px', maxHeight: '50px' }}>
                <Image src={c.src} alt={c.alt} width={80} height={36}
                  style={{ objectFit: 'contain', maxHeight: '34px', width: 'auto' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-white/10">
          <p className="text-gray-500 text-xs">
            © 2026 INNOVATIQ Technologies Pte Ltd. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
