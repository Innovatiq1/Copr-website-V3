import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Mail, Shield, Clock, Award, Globe } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

export default function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#0A1225' }}>

      {/* Large ambient glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,23,74,0.30) 0%, transparent 65%)' }} />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(139,92,246,0.16) 0%, transparent 70%)' }} />

      {/* Illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/image%20189.svg" alt="" aria-hidden="true"
        className="absolute right-0 bottom-0 h-[70%] max-h-[450px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4174A] uppercase tracking-widest bg-[#D4174A]/10 border border-[#D4174A]/20 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4174A] animate-pulse" />
              Ready to Transform?
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Let&apos;s Build Your<br />
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">
                Digital Future
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
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
                className="inline-flex items-center gap-2 px-8 py-4 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
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
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.14)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,23,74,0.30)' }}>
                    <Icon size={14} style={{ color: '#D4174A' }} />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{label}</p>
                    <p className="text-gray-500 text-[10px]">{sub}</p>
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
                background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}>
              <h3 className="font-bold text-white text-xl mb-6 flex items-center gap-2 depth-pop">
                <span className="w-2 h-2 rounded-full bg-[#D4174A]" />
                Quick Enquiry
              </h3>

              <div className="space-y-3 mb-6 depth-mid">
                {[
                  { icon: Phone, label: 'Singapore', value: '+(65) 674-20955', href: 'tel:+6567420955' },
                  { icon: Phone, label: 'India', value: '+91-9000534494', href: 'tel:+919000534494' },
                  { icon: Mail, label: 'Email Us', value: 'info@innovatiq.com.sg', href: 'mailto:info@innovatiq.com.sg' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(212,23,74,0.12)' }}>
                      <Icon size={16} style={{ color: '#D4174A' }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                      <a href={href} className="font-semibold text-white text-sm hover:text-[#D4174A] transition-colors">
                        {value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                <Image src="/images/innovatiq-logo.png" alt="Innovatiq" width={90} height={32}
                  style={{ objectFit: 'contain', height: '28px', width: 'auto' }} />
                <span className="text-gray-500 text-xs">Trusted IT Partner Since 2010</span>
              </div>
            </div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}
