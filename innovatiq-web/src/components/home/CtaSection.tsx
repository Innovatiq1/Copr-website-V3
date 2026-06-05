import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Mail, Shield, Clock, Award, Globe } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

export default function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#FFFFFF' }}>

      {/* Subtle ambient glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,23,74,0.05) 0%, transparent 65%)' }} />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(139,92,246,0.04) 0%, transparent 70%)' }} />


      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4174A] uppercase tracking-widest bg-[#D4174A]/10 border border-[#D4174A]/20 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4174A] animate-pulse" />
              Ready to Transform?
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
              Let&apos;s Build Your<br />
              <span className="bg-linear-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">
                Digital Future
              </span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-lg leading-relaxed">
              Connect with our experts for a free consultation and discover how Innovatiq
              can accelerate your business transformation.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #D4174A, #A8102E)',
                  boxShadow: '0 8px 32px rgba(212,23,74,0.4)',
                }}>
                Get Free Consultation <ArrowRight size={17} />
              </Link>
              <a href="tel:+6567420955"
                className="inline-flex items-center gap-2 px-8 py-4 text-gray-700 text-base font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.12)',
                }}>
                <Phone size={17} /> Call Us Now
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, label: 'ISO 9001:2015', sub: 'Certified' },
                { icon: Clock, label: '24/7 Support', sub: 'Always Available' },
                { icon: Award, label: 'PDPA Compliant', sub: 'Data Protected' },
                { icon: Globe, label: 'SLA Guaranteed', sub: 'Performance Assured' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl p-3"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(212,23,74,0.10)' }}>
                    <Icon size={14} style={{ color: '#D4174A' }} />
                  </div>
                  <div>
                    <p className="text-gray-800 text-xs font-semibold">{label}</p>
                    <p className="text-slate-400 text-[10px]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact glass card */}
          <div className="hidden lg:block">
            <TiltCard intensity={14}>
            <div className="rounded-3xl p-8"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.09)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05), 0 20px 56px rgba(0,0,0,0.08)',
              }}>
              <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center gap-2 depth-pop">
                <span className="w-2 h-2 rounded-full bg-[#D4174A]" />
                Quick Enquiry
              </h3>

              <div className="space-y-3 mb-6 depth-mid">
                {[
                  { icon: Phone, label: 'Singapore', value: '+(65) 674-20955', href: 'tel:+6567420955' },
                  { icon: Phone, label: 'India', value: '+91-9000534494', href: 'tel:+919000534494' },
                  { icon: Mail, label: 'Email Us', value: 'info@innovatiq.com.sg', href: 'mailto:info@innovatiq.com.sg' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:bg-gray-50"
                    style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(212,23,74,0.08)' }}>
                      <Icon size={16} style={{ color: '#D4174A' }} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                      <a href={href} className="font-semibold text-gray-800 text-sm hover:text-[#D4174A] transition-colors">
                        {value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <Image src="/images/innovatiq-logo.png" alt="Innovatiq" width={90} height={32}
                  style={{ objectFit: 'contain', height: '28px', width: 'auto' }} />
                <span className="text-slate-400 text-xs">Trusted IT Partner Since 2010</span>
              </div>
            </div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}
