import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CtaSection from '@/components/home/CtaSection';
import Image from 'next/image';
import { getAwards, getAwardImageUrl } from '@/lib/api';
import { Trophy } from 'lucide-react';

const awardColors = ['#D4174A', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

export default async function AwardsPage() {
  const data = await getAwards(1, 50);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const awards: any[] = (data as any)?.awards || [];

  return (
    <>
      <PageHero
        badge="Recognition & Excellence"
        title="Awards & Recognitions"
        subtitle="Industry recognition for our commitment to delivering exceptional technology solutions and outstanding client outcomes."
      />

      {/* Awards Grid */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#080F20' }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(212,23,74,0.22) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(245,158,11,0.16) 0%, transparent 60%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Group%2041053.svg" alt="" aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[80%] max-h-[480px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {awards.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <Trophy size={32} style={{ color: '#F59E0B' }} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No awards added yet</h3>
              <p className="text-gray-500 text-sm">Check back soon for our latest awards and recognitions.</p>
            </div>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {awards.map((award, i) => {
              const color = awardColors[i % awardColors.length];
              const imageUrl = award.awardImage ? getAwardImageUrl(award.awardImage) : award.image ? getAwardImageUrl(award.image) : null;

              return (
                <AnimatedSection key={award._id} delay={i * 60}>
                  <div className="group rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 relative"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                    }}>
                    <div className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

                    <div className="relative h-48 flex items-center justify-center"
                      style={{ background: `${color}08` }}>
                      {imageUrl ? (
                        <Image src={imageUrl} alt={award.title} fill className="object-contain p-6" />
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-20 h-20 rounded-full flex items-center justify-center"
                            style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                            <Trophy size={36} style={{ color }} />
                          </div>
                          {award.year && (
                            <span className="text-sm font-bold px-4 py-1 rounded-full text-white"
                              style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}>
                              {award.year}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-white mb-3 leading-snug">{award.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{award.shortDescription}</p>
                      {award.description && award.description !== award.shortDescription && (
                        <details className="mt-4">
                          <summary className="text-sm font-medium cursor-pointer" style={{ color }}>Read more</summary>
                          <div className="mt-3 text-gray-500 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: award.description }} />
                        </details>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#07101E' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.16) 0%, transparent 70%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ImageUpdated.svg" alt="" aria-hidden="true"
          className="absolute right-0 bottom-0 h-[70%] max-h-[400px] w-auto opacity-[0.04] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#D4A847] bg-clip-text text-transparent">Certifications</span>
            </h2>
            <p className="text-gray-500 mb-10">Industry certifications validating our commitment to quality and excellence.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'ISO 9001:2015', sub: 'Quality Management' },
                { label: 'ISO 27001', sub: 'Information Security' },
                { label: 'PDPA Compliant', sub: 'Data Protection' },
                { label: 'SME 2024-25', sub: 'Enterprise Excellence' },
                { label: 'TBSQ 2024-25', sub: 'Business Quality' },
                { label: 'Data Protection Trustmark', sub: 'IMDA Singapore' },
              ].map(cert => (
                <div key={cert.label}
                  className="relative flex flex-col items-center p-6 rounded-2xl w-40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)' }} />
                  <div className="w-12 h-12 rounded-full mb-3 flex items-center justify-center"
                    style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <Trophy size={20} style={{ color: '#F59E0B' }} />
                  </div>
                  <p className="font-bold text-white text-sm text-center">{cert.label}</p>
                  <p className="text-gray-500 text-xs text-center mt-1">{cert.sub}</p>
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
