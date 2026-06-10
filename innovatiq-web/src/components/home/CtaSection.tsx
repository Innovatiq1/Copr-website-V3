import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Mail, Shield, Clock, Award, Globe } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

const CTA_GRAD = 'linear-gradient(135deg, #881337 0%, #BE123C 50%, #E11D48 100%)';
const CTA_CLR  = '#BE123C';

export default function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDFD 30%, #FFFBFC 55%, #FFFDFD 80%, #FFFFFF 100%)' }}>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(190,18,60,0.08) 0%, transparent 65%)' }} />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(136,19,55,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-150 h-150 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(225,29,72,0.07) 0%, transparent 70%)' }} />

      {/* Cross/plus grid pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 8v24M8 20h24' stroke='rgba(190,18,60,0.13)' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 20%, transparent 100%)',
        }} />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Solid diamonds */}
        <div className="float absolute"
          style={{ top: '10%', left: '8%', width: '14px', height: '14px', background: '#F43F5E', opacity: 0.38, transform: 'rotate(45deg)', borderRadius: '2px', boxShadow: '0 0 18px rgba(244,63,94,0.50)' }} />
        <div className="float-d absolute"
          style={{ top: '20%', right: '10%', width: '10px', height: '10px', background: '#E11D48', opacity: 0.42, transform: 'rotate(45deg)', borderRadius: '1px', boxShadow: '0 0 14px rgba(225,29,72,0.50)' }} />
        <div className="float absolute"
          style={{ bottom: '18%', left: '12%', width: '9px', height: '9px', background: '#BE123C', opacity: 0.36, transform: 'rotate(45deg)', boxShadow: '0 0 12px rgba(190,18,60,0.50)' }} />
        <div className="float-d absolute"
          style={{ bottom: '25%', right: '8%', width: '13px', height: '13px', background: '#FDA4AF', opacity: 0.42, transform: 'rotate(45deg)', borderRadius: '2px', boxShadow: '0 0 16px rgba(253,164,175,0.50)' }} />
        {/* Small squares */}
        <div className="float absolute"
          style={{ top: '45%', left: '3%', width: '6px', height: '6px', background: '#F43F5E', opacity: 0.30, borderRadius: '1.5px' }} />
        <div className="float-d absolute"
          style={{ top: '60%', right: '4%', width: '8px', height: '8px', background: '#FECDD3', opacity: 0.45, transform: 'rotate(45deg)', borderRadius: '1px' }} />
        <div className="float absolute"
          style={{ top: '30%', left: '22%', width: '5px', height: '5px', background: '#BE123C', opacity: 0.25, transform: 'rotate(45deg)' }} />
        <div className="float-d absolute"
          style={{ bottom: '40%', right: '20%', width: '7px', height: '7px', background: '#E11D48', opacity: 0.28, transform: 'rotate(45deg)', borderRadius: '1px' }} />
        {/* Rotated square outlines */}
        <div className="float absolute"
          style={{ top: '8%', right: '22%', width: '58px', height: '58px', border: '1.5px solid rgba(190,18,60,0.20)', transform: 'rotate(45deg)', borderRadius: '6px' }} />
        <div className="float-d absolute"
          style={{ bottom: '12%', left: '18%', width: '76px', height: '76px', border: '1.5px dashed rgba(244,63,94,0.22)', transform: 'rotate(15deg)', borderRadius: '4px' }} />
        <div className="float absolute"
          style={{ top: '50%', right: '2%', width: '44px', height: '44px', border: '1px solid rgba(190,18,60,0.16)', transform: 'rotate(30deg)', borderRadius: '3px' }} />
        {/* Triangle shapes via SVG */}
        <svg className="float absolute" style={{ top: '70%', left: '6%', opacity: 0.28 }} width="14" height="14" viewBox="0 0 14 14">
          <polygon points="7,1 13,13 1,13" fill="none" stroke="#BE123C" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <svg className="float-d absolute" style={{ top: '15%', left: '40%', opacity: 0.22 }} width="18" height="18" viewBox="0 0 18 18">
          <polygon points="9,1 17,17 1,17" fill="#F43F5E" fillOpacity="0.5" />
        </svg>
        <svg className="float absolute" style={{ bottom: '30%', right: '14%', opacity: 0.25 }} width="12" height="12" viewBox="0 0 12 12">
          <polygon points="6,1 11,11 1,11" fill="none" stroke="#E11D48" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            {/* Badge — gradient text + gradient border */}
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid rgba(190,18,60,0.38)',
                boxShadow: '0 2px 10px rgba(190,18,60,0.12)',
              }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: CTA_GRAD }} />
              <span style={{
                backgroundImage: CTA_GRAD,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Ready to Transform?
              </span>
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
              Let&apos;s Build Your<br />
              <span style={{
                backgroundImage: CTA_GRAD,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Digital Future
              </span>
            </h2>

            <p className="text-slate-500 text-lg font-medium mb-10 max-w-lg leading-relaxed">
              Connect with our experts for a free consultation and discover how Innovatiq
              can accelerate your business transformation.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: CTA_GRAD,
                  boxShadow: '0 8px 32px rgba(190,18,60,0.35), 0 2px 8px rgba(136,19,55,0.20)',
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
                { icon: Clock,  label: '24/7 Support',  sub: 'Always Available' },
                { icon: Award,  label: 'PDPA Compliant', sub: 'Data Protected' },
                { icon: Globe,  label: 'SLA Guaranteed', sub: 'Performance Assured' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl p-3.5"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(190,18,60,0.10)', border: '1px solid rgba(190,18,60,0.20)' }}>
                    <Icon size={17} style={{ color: CTA_CLR }} />
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm font-semibold">{label}</p>
                    <p className="text-slate-500 text-xs font-semibold">{sub}</p>
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
                  <span className="w-2 h-2 rounded-full" style={{ background: CTA_GRAD }} />
                  Quick Enquiry
                </h3>

                <div className="space-y-3 mb-6 depth-mid">
                  {[
                    { icon: Phone, label: 'Singapore', value: '+(65) 674-20955', href: 'tel:+6567420955' },
                    { icon: Phone, label: 'India',     value: '+91-9000534494',  href: 'tel:+919000534494' },
                    { icon: Mail,  label: 'Email Us',  value: 'info@innovatiq.com.sg', href: 'mailto:info@innovatiq.com.sg' },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:bg-gray-50"
                      style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(190,18,60,0.08)' }}>
                        <Icon size={16} style={{ color: CTA_CLR }} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold mb-0.5">{label}</p>
                        <a href={href} className="font-semibold text-gray-800 text-sm transition-colors hover:text-[#BE123C]">
                          {value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  <Image src="/images/innovatiq-logo.png" alt="Innovatiq" width={90} height={32}
                    style={{ objectFit: 'contain', height: '28px', width: 'auto' }} />
                  <span className="text-slate-500 text-xs font-semibold">Trusted IT Partner Since 2010</span>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}
