'use client';
import { useState, useEffect, useRef } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setDrop(null);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const toggle = (k: Key) => setDrop(d => d === k ? null : k);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Promo bar */}
      <div className="py-2 text-center text-xs text-white font-medium tracking-wide"
        style={{ background: 'linear-gradient(90deg, #D4174A, #A8102E)' }}>
        🚀 AI-Powered Digital Transformation — Trusted by 200+ Enterprises&ensp;
        <Link href="/contact" className="underline underline-offset-2 font-bold hover:text-yellow-200 transition-colors">
          Get Demo →
        </Link>
      </div>

      {/* Nav */}
      <nav ref={ref}
        className="transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(6,11,20,0.98)' : 'rgba(6,11,20,0.80)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.14)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
        }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/innovatiq-logo.png"
                alt="Innovatiq"
                width={150} height={50}
                className="h-[44px] w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
              {(['about', 'products', 'services'] as NonNullable<Key>[]).map(k => (
                <div key={k} className="relative">
                  <button
                    onClick={() => toggle(k)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg capitalize transition-all duration-200"
                    style={{ color: drop === k ? '#D4174A' : 'rgba(255,255,255,0.7)', background: drop === k ? 'rgba(212,23,74,0.1)' : 'transparent' }}>
                    {k === 'about' ? 'About Us' : k.charAt(0).toUpperCase() + k.slice(1)}
                    <ChevronDown size={13} className={`transition-transform duration-200 ${drop === k ? 'rotate-180' : ''}`} />
                  </button>

                  {drop === k && (
                    <div className="absolute top-full left-0 mt-2 rounded-2xl py-2 z-50"
                      style={{
                        background: 'rgba(6,11,20,0.99)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(24px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                        minWidth: k === 'products' ? '300px' : '220px',
                      }}>
                      {k === 'products'
                        ? NAV.products.map(p => (
                          <Link key={p.href} href={p.href} onClick={() => setDrop(null)}
                            className="flex items-center gap-3 px-4 py-3 transition-all group hover:bg-[rgba(212,23,74,0.22)]"
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}>
                              {p.logo
                                ? <Image src={p.logo} alt={p.label} width={26} height={26} className="object-contain" />
                                : <span className="text-[9px] font-black text-[#D4174A]">LMP</span>}
                            </div>
                            <div>
                              <p className="font-semibold text-white text-sm group-hover:text-[#D4174A] transition-colors">{p.label}</p>
                              <p className="text-xs text-gray-500">{p.sub}</p>
                            </div>
                          </Link>
                        ))
                        : (NAV[k] as { label: string; href: string }[]).map(l => (
                          <Link key={l.href} href={l.href} onClick={() => setDrop(null)}
                            className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-[rgba(212,23,74,0.22)] transition-all">
                            {l.label}
                          </Link>
                        ))
                      }
                    </div>
                  )}
                </div>
              ))}
              <Link href="/careers" className="px-4 py-2 rounded-lg text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-white/5 transition-all">Careers</Link>
              <Link href="/contact" className="px-4 py-2 rounded-lg text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-white/5 transition-all">Contact</Link>
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/contact"
                className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}>
                Free Trial
              </Link>
              <Link href="/contact"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 4px 16px rgba(212,23,74,0.4)' }}>
                Get Demo <ArrowRight size={14} />
              </Link>
            </div>

            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden max-h-[70vh] overflow-y-auto"
            style={{ background: 'rgba(6,11,20,0.99)', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
            <div className="px-4 py-3 space-y-1">
              {[
                { k: 'about', label: 'About Us', items: NAV.about },
                { k: 'products', label: 'Products', items: NAV.products },
                { k: 'services', label: 'Services', items: NAV.services },
              ].map(m => (
                <div key={m.k}>
                  <button onClick={() => setMob(v => v === m.k ? null : m.k)}
                    className="flex items-center justify-between w-full px-3 py-3 text-sm font-semibold text-gray-200 rounded-xl hover:bg-white/5">
                    {m.label} <ChevronDown size={14} className={`transition-transform ${mob === m.k ? 'rotate-180' : ''}`} />
                  </button>
                  {mob === m.k && (
                    <div className="ml-3 pb-1">
                      {m.items.map((l: { label: string; href: string; sub?: string }) => (
                        <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                          className="block px-3 py-2.5 text-sm text-gray-400 hover:text-[#D4174A] rounded-xl hover:bg-[rgba(212,23,74,0.22)] transition-all">
                          {l.label}{l.sub ? ` — ${l.sub}` : ''}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/careers" onClick={() => setOpen(false)} className="block px-3 py-3 text-sm font-semibold text-gray-200 rounded-xl hover:bg-white/5">Careers</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="block px-3 py-3 text-sm font-semibold text-gray-200 rounded-xl hover:bg-white/5">Contact</Link>
              <div className="pt-3 pb-2 space-y-2">
                <Link href="/contact" onClick={() => setOpen(false)}
                  className="block text-center py-3 text-sm font-semibold text-white rounded-xl"
                  style={{ border: '1px solid rgba(255,255,255,0.15)' }}>Free Trial</Link>
                <Link href="/contact" onClick={() => setOpen(false)}
                  className="block text-center py-3 text-sm font-semibold text-white rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)' }}>Get Demo</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
