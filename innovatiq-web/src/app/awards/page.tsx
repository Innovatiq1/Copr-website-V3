export const dynamic = 'force-dynamic';

import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CtaSection from '@/components/home/CtaSection';
import { getAwardImageUrl } from '@/lib/api';
import { getAwardsDirect } from '@/lib/server-data';
import { Trophy } from 'lucide-react';
import AwardCard from '@/components/AwardCard';

const awardColors = ['#D4174A', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

export default async function AwardsPage() {
  const awards: any[] = await getAwardsDirect(1, 50);

  return (
    <>
      <style>{`
        @keyframes award-blob-1 {
          0%,100% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(35px,-30px) scale(1.07); }
          66% { transform: translate(-20px,18px) scale(0.95); }
        }
        @keyframes award-blob-2 {
          0%,100% { transform: translate(0px,0px) scale(1); }
          33% { transform: translate(-28px,25px) scale(1.05); }
          66% { transform: translate(25px,-20px) scale(0.97); }
        }
        @keyframes award-diamond {
          0%,100% { transform: rotate(45deg) translate(0px,0px); }
          33% { transform: rotate(70deg) translate(10px,-15px); }
          66% { transform: rotate(22deg) translate(-8px,12px); }
        }
        @keyframes award-hex {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(28deg); }
        }
        @keyframes award-hex-rev {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(16px) rotate(-28deg); }
        }
        @keyframes award-tri {
          0%,100% { transform: translate(0px,0px) rotate(0deg); }
          33% { transform: translate(8px,-12px) rotate(18deg); }
          66% { transform: translate(-6px,8px) rotate(-12deg); }
        }
        @keyframes cert-hex {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(20deg); }
        }
      `}</style>

      <PageHero
        badge="Recognition & Excellence"
        title="Awards & Recognitions"
        subtitle="Industry recognition for our commitment to delivering exceptional technology solutions and outstanding client outcomes."
      />

      {/* Awards Grid */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        {/* Static bg layers */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(212,23,74,0.07) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 right-0 w-150 h-150 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(212,23,74,0.09) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-125 h-125 pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />

        {/* Animated shapes */}
        <div className="absolute top-16 right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,23,74,0.09) 0%, transparent 70%)', animation: 'award-blob-1 9s ease-in-out infinite' }} />
        <div className="absolute bottom-12 left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', animation: 'award-blob-2 12s ease-in-out infinite' }} />
        {/* Diamonds */}
        <div className="absolute top-24 left-32 w-10 h-10 pointer-events-none"
          style={{ background: 'rgba(212,23,74,0.16)', borderRadius: '3px', animation: 'award-diamond 9s ease-in-out infinite' }} />
        <div className="absolute bottom-32 right-32 w-7 h-7 pointer-events-none"
          style={{ background: 'rgba(59,130,246,0.20)', borderRadius: '2px', animation: 'award-diamond 11s ease-in-out infinite', animationDelay: '-3s' }} />
        {/* Hollow hexagons */}
        <svg className="absolute top-32 right-32 pointer-events-none" width="60" height="60" style={{ animation: 'award-hex 11s ease-in-out infinite' }}>
          <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" fill="none" stroke="rgba(212,23,74,0.20)" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-24 left-1/4 pointer-events-none" width="76" height="76" style={{ animation: 'award-hex-rev 14s ease-in-out infinite', animationDelay: '-5s' }}>
          <polygon points="38,2 72,20 72,56 38,74 4,56 4,20" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="1" />
        </svg>
        <svg className="absolute top-1/3 left-20 pointer-events-none" width="44" height="44" style={{ animation: 'award-hex 8s ease-in-out infinite', animationDelay: '-2s' }}>
          <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="1.5" />
        </svg>
        {/* Triangles */}
        <div className="absolute top-20 right-1/3 w-8 h-8 pointer-events-none"
          style={{ background: 'rgba(59,130,246,0.18)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'award-tri 10s ease-in-out infinite', animationDelay: '-4s' }} />
        <div className="absolute bottom-20 right-24 w-6 h-6 pointer-events-none"
          style={{ background: 'rgba(212,23,74,0.20)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'award-tri 8s ease-in-out infinite', animationDelay: '-1s' }} />
        {/* Ring */}
        <div className="absolute top-1/4 left-1/3 w-24 h-24 rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(212,23,74,0.13)', animation: 'award-hex 13s ease-in-out infinite', animationDelay: '-6s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
              style={{ color: '#D4174A', borderColor: 'rgba(212,23,74,0.25)', background: 'rgba(212,23,74,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4174A' }} />
              Recognition
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              Industry{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #D4174A, #F59E0B)' }}>
                Awards
              </span>
            </h2>
            <p className="text-slate-500 font-medium mt-3 max-w-xl mx-auto">
              Recognized by industry leaders for innovation, excellence, and commitment to client success.
            </p>
          </AnimatedSection>

          {awards.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <Trophy size={32} style={{ color: '#F59E0B' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No awards added yet</h3>
              <p className="text-gray-500 font-medium text-sm">Check back soon for our latest awards and recognitions.</p>
            </div>
          )}

          <div className={`grid gap-7 items-stretch ${
            awards.length === 1 ? 'max-w-sm mx-auto' :
            awards.length === 2 ? 'sm:grid-cols-2 max-w-2xl mx-auto' :
            'sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {awards.map((award, i) => {
              const color = awardColors[i % awardColors.length];
              const imageUrl = award.awardImage ? getAwardImageUrl(award.awardImage) : award.image ? getAwardImageUrl(award.image) : null;

              return (
                <AnimatedSection key={award._id} delay={i * 60} className="h-full">
                  <AwardCard award={award} color={color} imageUrl={imageUrl} />
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative pt-10 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFBF0 0%, #F8FAFC 50%, #FFF5F7 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.12) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.09) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 w-100 h-100 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(245,158,11,0.09) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-0 w-100 h-100 pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom right, rgba(212,23,74,0.06) 0%, transparent 65%)' }} />
        {/* Animated hexagons for cert section */}
        <svg className="absolute top-8 right-24 pointer-events-none" width="52" height="52" style={{ animation: 'cert-hex 10s ease-in-out infinite' }}>
          <polygon points="26,2 48,14 48,38 26,50 4,38 4,14" fill="none" stroke="rgba(245,158,11,0.25)" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-8 left-24 pointer-events-none" width="44" height="44" style={{ animation: 'cert-hex 13s ease-in-out infinite', animationDelay: '-4s' }}>
          <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="none" stroke="rgba(212,23,74,0.18)" strokeWidth="1.5" />
        </svg>
        <div className="absolute top-12 left-1/3 w-7 h-7 pointer-events-none"
          style={{ background: 'rgba(245,158,11,0.22)', borderRadius: '2px', animation: 'award-diamond 10s ease-in-out infinite', animationDelay: '-3s' }} />
        <div className="absolute bottom-12 right-1/3 w-5 h-5 pointer-events-none"
          style={{ background: 'rgba(212,23,74,0.18)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'award-tri 9s ease-in-out infinite', animationDelay: '-2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
              style={{ color: '#D97706', borderColor: 'rgba(245,158,11,0.30)', background: 'rgba(245,158,11,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F59E0B' }} />
              Certified Excellence
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our{' '}
              <span className="bg-linear-to-r from-[#F59E0B] to-[#D4A847] bg-clip-text text-transparent">Certifications</span>
            </h2>
            <p className="text-slate-500 font-medium mb-12 max-w-lg mx-auto">Industry certifications validating our commitment to quality and excellence.</p>
            <div className="flex flex-wrap justify-center gap-5">
              {[
                { label: 'ISO 9001:2015', sub: 'Quality Management', icon: '🏆' },
                { label: 'ISO 27001', sub: 'Information Security', icon: '🔒' },
                { label: 'PDPA Compliant', sub: 'Data Protection', icon: '🛡️' },
                { label: 'SME 2024-25', sub: 'Enterprise Excellence', icon: '⭐' },
                { label: 'TBSQ 2024-25', sub: 'Business Quality', icon: '✅' },
                { label: 'Data Protection Trustmark', sub: 'IMDA Singapore', icon: '🌐' },
              ].map((cert) => (
                <div key={cert.label}
                  className="flex flex-col items-center p-5 w-44 hover:-translate-y-1 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, #F59E0B 0%, #F59E0B 25%, #F59E0BAA 55%, transparent 90%) border-box',
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopWidth: '3px',
                    borderLeftWidth: '0',
                    borderRightWidth: '0',
                    borderBottomWidth: '0',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06), inset 1px 0 0 0 rgba(0,0,0,0.06), inset -1px 0 0 0 rgba(0,0,0,0.06), inset 0 -1px 0 0 rgba(0,0,0,0.06)',
                  }}>
                  <div className="text-3xl mb-3">{cert.icon}</div>
                  <div className="w-10 h-0.5 rounded-full mb-3" style={{ background: 'rgba(245,158,11,0.40)' }} />
                  <p className="font-bold text-gray-800 text-sm text-center leading-snug">{cert.label}</p>
                  <p className="text-slate-500 font-medium text-xs text-center mt-1">{cert.sub}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
