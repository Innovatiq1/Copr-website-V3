'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

const NAV = {
  about: [
    { label: 'Who We Are', href: '/about' },
    { label: 'Our Team', href: '/team' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Awards', href: '/awards' },
  ],
  products: [
    { label: 'SkillEra', sub: 'Training Management System', href: '/products/skillera', logo: '/images/Skillera-png-logo.png' },
    { label: 'LearnPro', sub: 'Learning Management System', href: '/products/learnpro', logo: '/images/Learnpro-png-logo.png' },
    { label: 'SecurOn', sub: 'Patch Management System', href: '/products/securon', logo: '/images/Securon-png-logo.png' },
    { label: 'LMP', sub: 'Learning Motivational Platform', href: '/products/lmp', logo: null },
  ],
  services: [
    { label: 'Cloud Services', href: '/services/cloud' },
    { label: 'Cyber Security', href: '/services/cyber-security' },
    { label: 'IT Consulting', href: '/services/consulting' },
    { label: 'Digital Transformation', href: '/services/digital-transformation' },
    { label: 'Managed IT Services', href: '/services/managed-it' },
    { label: 'Advanced Infrastructure', href: '/services/advanced-infra' },
    { label: 'Field Services', href: '/services/field-service' },
  ],
};

type Key = 'about' | 'products' | 'services' | null;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<Key>(null);
  const [mob, setMob] = useState<string | null>(null);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);

  const closeDrawer = () => setOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Promo bar — single line on all screen sizes */}
        <div className="py-2 sm:py-2.5 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #1E3A8A 100%)', color: '#FFFFFF' }}>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 whitespace-nowrap text-[11px] sm:text-[13px] font-medium tracking-wide">
            <span className="shrink-0">🚀</span>
            {/* Mobile: condensed */}
            <span className="font-semibold sm:hidden">AI-Powered IT</span>
            <span className="opacity-50 sm:hidden">·</span>
            <span className="sm:hidden">200+ Clients</span>
            {/* sm+: full text */}
            <span className="font-semibold hidden sm:inline">AI-Powered Digital Transformation</span>
            <span className="opacity-60 hidden sm:inline">—</span>
            <span className="hidden sm:inline">Trusted by <strong>200+ Enterprises</strong></span>
            <Link href="/contact"
              className="shrink-0 inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 rounded-full text-[11px] font-bold transition-all hover:scale-105 ml-0.5"
              style={{ background: '#FFFFFF', color: '#1D4ED8', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
              Get Demo <ArrowRight size={11} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Nav */}
        <nav
          className="transition-all duration-300"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.06)',
            boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
          }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-17">

              {/* Logo */}
              <Link href="/" className="shrink-0">
                <Image
                  src="/images/innovatiq-logo.png"
                  alt="Innovatiq"
                  width={150} height={50}
                  className="h-11 w-auto object-contain"
                  priority
                />
              </Link>

              {/* Desktop nav */}
              <div className="hidden lg:flex items-center gap-0.5 text-sm font-bold">
                {(['about', 'products', 'services'] as NonNullable<Key>[]).map(k => (
                  <div key={k} className="relative"
                    onMouseEnter={() => setDrop(k)}
                    onMouseLeave={() => setDrop(null)}>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg capitalize transition-all duration-200 cursor-pointer"
                      style={{ color: drop === k ? '#1D4ED8' : '#374151', background: drop === k ? 'rgba(29,78,216,0.08)' : 'transparent' }}>
                      {k === 'about' ? 'About Us' : k.charAt(0).toUpperCase() + k.slice(1)}
                      <ChevronDown size={13} className={`transition-transform duration-200 ${drop === k ? 'rotate-180' : ''}`} />
                    </button>

                    {drop === k && (
                      <div className="absolute top-full left-0 z-50 pt-2" style={{ minWidth: k === 'products' ? '300px' : '220px' }}>
                      <div className="rounded-2xl py-2"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid rgba(0,0,0,0.10)',
                          backdropFilter: 'blur(24px)',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                        }}>
                        {k === 'products'
                          ? NAV.products.map(p => (
                            <Link key={p.href} href={p.href} onClick={() => setDrop(null)}
                              className="flex items-center gap-3 px-4 py-3 transition-all group hover:bg-[rgba(29,78,216,0.06)]"
                              style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.08)' }}>
                                {p.logo
                                  ? <Image src={p.logo} alt={p.label} width={26} height={26} className="object-contain" />
                                  : <span className="text-[9px] font-black text-[#1D4ED8]">LMP</span>}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800 text-sm group-hover:text-[#1D4ED8] transition-colors">{p.label}</p>
                                <p className="text-xs text-gray-400">{p.sub}</p>
                              </div>
                            </Link>
                          ))
                          : (NAV[k] as { label: string; href: string }[]).map(l => (
                            <Link key={l.href} href={l.href} onClick={() => setDrop(null)}
                              className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#1D4ED8] hover:bg-[rgba(29,78,216,0.05)] transition-all">
                              {l.label}
                            </Link>
                          ))
                        }
                      </div>
                      </div>
                    )}
                  </div>
                ))}
                <Link href="/careers" className="px-4 py-2 rounded-lg font-bold text-gray-700 hover:text-[#1D4ED8] hover:bg-[rgba(29,78,216,0.08)] transition-all duration-200">Careers</Link>
                <Link href="/contact" className="px-4 py-2 rounded-lg font-bold text-gray-700 hover:text-[#1D4ED8] hover:bg-[rgba(29,78,216,0.08)] transition-all duration-200">Contact</Link>
              </div>

              {/* CTAs */}
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/contact"
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50"
                  style={{ border: '1px solid rgba(0,0,0,0.12)' }}>
                  Free Trial
                </Link>
                <Link href="/contact"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)', boxShadow: '0 4px 18px rgba(14,165,233,0.40), inset 0 1px 0 rgba(255,255,255,0.20)' }}>
                  Get Demo <ArrowRight size={14} />
                </Link>
              </div>

              <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all">
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile drawer — always in DOM so CSS transitions play on open AND close */}

      {/* Backdrop */}
      <div
        className="fixed inset-0 lg:hidden transition-opacity duration-300"
        style={{
          zIndex: 60,
          background: 'rgba(0,0,0,0.45)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={closeDrawer}
      />

      {/* Right-side sliding drawer */}
      <div
        className="fixed top-0 right-0 h-full lg:hidden overflow-y-auto"
        style={{
          zIndex: 70,
          width: '300px',
          maxWidth: '85vw',
          background: '#FFFFFF',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '-6px 0 32px rgba(0,0,0,0.16)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <Link href="/" onClick={closeDrawer}>
            <Image
              src="/images/innovatiq-logo.png"
              alt="Innovatiq"
              width={130} height={44}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <div className="px-4 py-3 space-y-1">
          {[
            { k: 'about', label: 'About Us', items: NAV.about },
            { k: 'products', label: 'Products', items: NAV.products },
            { k: 'services', label: 'Services', items: NAV.services },
          ].map(m => (
            <div key={m.k}>
              <button onClick={() => setMob(v => v === m.k ? null : m.k)}
                className="flex items-center justify-between w-full px-3 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-all">
                {m.label}
                <ChevronDown size={14} className={`transition-transform duration-200 text-gray-400 ${mob === m.k ? 'rotate-180' : ''}`} />
              </button>
              <div
                style={{
                  maxHeight: mob === m.k ? '400px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="ml-3 pb-1">
                  {m.items.map((l: { label: string; href: string; sub?: string }) => (
                    <Link key={l.href} href={l.href} onClick={closeDrawer}
                      className="block px-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-[#1D4ED8] rounded-xl hover:bg-[rgba(29,78,216,0.06)] transition-all">
                      {l.label}{l.sub ? ` — ${l.sub}` : ''}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Link href="/careers" onClick={closeDrawer}
            className="block px-3 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-all">
            Careers
          </Link>
          <Link href="/contact" onClick={closeDrawer}
            className="block px-3 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-all">
            Contact
          </Link>

          {/* CTA buttons */}
          <div className="pt-4 pb-6 space-y-2">
            <Link href="/contact" onClick={closeDrawer}
              className="block text-center py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              style={{ border: '1px solid rgba(0,0,0,0.12)' }}>
              Free Trial
            </Link>
            <Link href="/contact" onClick={closeDrawer}
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white rounded-xl"
              style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)' }}>
              Get Demo <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
