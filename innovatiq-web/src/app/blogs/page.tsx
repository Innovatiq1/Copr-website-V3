import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import { ThumbsUp, ThumbsDown, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogImageUrl } from '@/lib/api';
import { getBlogsDirect } from '@/lib/server-data';

const tagColors = ['#D4174A', '#3B82F6', '#F59E0B', '#8B5CF6', '#10B981', '#06B6D4'];

export default async function BlogsPage() {
  const data = await getBlogsDirect(1, 50);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blogs: any[] = data?.blogs || [];

  return (
    <>
      <PageHero
        badge="Insights & Perspectives"
        title="Technology Insights from Innovatiq"
        subtitle="Expert perspectives on digital transformation, cloud, cyber security, and the future of enterprise IT."
      />

      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(212,23,74,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-0 w-162.5 h-162.5 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(212,23,74,0.09) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 right-0 w-162.5 h-162.5 pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom right, rgba(59,130,246,0.07) 0%, transparent 60%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
              style={{ color: '#D4174A', borderColor: 'rgba(212,23,74,0.25)', background: 'rgba(212,23,74,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4174A' }} />
              Latest Insights
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              Expert{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #BE123C 0%, #D4174A 50%, #F43F5E 100%)' }}>
                Perspectives
              </span>
            </h2>
            <p className="text-slate-500 font-medium mt-3 max-w-xl mx-auto">
              Stay ahead with insights on digital transformation, cloud computing, and enterprise technology.
            </p>
          </AnimatedSection>

          {blogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(212,23,74,0.1)', border: '1px solid rgba(212,23,74,0.2)' }}>
                <FileText size={32} className="text-[#D4174A]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No blogs published yet</h3>
              <p className="text-gray-500 font-medium text-sm">Check back soon for the latest insights from Innovatiq.</p>
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {blogs.map((blog, i) => {
              const imageUrl = getBlogImageUrl(blog.image);
              const color = tagColors[i % tagColors.length];

              return (
                <AnimatedSection key={blog._id} delay={i * 60} className="h-full">
                  <Link href={`/blogs/${blog._id}`} className="h-full block">
                    <article className="group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col relative"
                      style={{
                        background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${color} 0%, ${color} 20%, ${color}CC 45%, ${color}55 70%, transparent 90%) border-box`,
                        borderStyle: 'solid',
                        borderColor: 'transparent',
                        borderTopWidth: '4px',
                        borderLeftWidth: '0',
                        borderRightWidth: '0',
                        borderBottomWidth: '0',
                        borderRadius: '16px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                      }}>

                      <div className="relative h-48 overflow-hidden rounded-t-[14px]">
                        {imageUrl ? (
                          <Image src={imageUrl} alt={blog.title} fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl"
                            style={{ background: `${color}12` }}>
                            📝
                          </div>
                        )}
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                          style={{ background: 'rgba(255,255,255,0.92)', color, border: `1px solid ${color}30`, backdropFilter: 'blur(8px)' }}>
                          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#D4174A] transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed flex-1 line-clamp-3">
                          {blog.shortDescription}
                        </p>
                        <div className="flex items-center justify-between mt-5 pt-4"
                          style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                          <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-1.5"><ThumbsUp size={13} /> {blog.likes || 0}</span>
                            <span className="flex items-center gap-1.5"><ThumbsDown size={13} /> {blog.dislikes || 0}</span>
                          </div>
                          <span className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all" style={{ color }}>
                            Read more <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
