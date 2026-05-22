import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import { ThumbsUp, ThumbsDown, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogs, getBlogImageUrl } from '@/lib/api';

const tagColors = ['#D4174A', '#3B82F6', '#F59E0B', '#8B5CF6', '#10B981', '#06B6D4'];

export default async function BlogsPage() {
  const data = await getBlogs(1, 9);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blogs: any[] = (data as any)?.blogs || [];

  return (
    <>
      <PageHero
        badge="Insights & Perspectives"
        title="Technology Insights from Innovatiq"
        subtitle="Expert perspectives on digital transformation, cloud, cyber security, and the future of enterprise IT."
      />

      <section className="relative py-24 overflow-hidden" style={{ background: '#080F20' }}>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(212,23,74,0.22) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom right, rgba(59,130,246,0.16) 0%, transparent 60%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/image%20189.svg" alt="" aria-hidden="true"
          className="absolute right-0 top-0 h-full max-h-[500px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(212,23,74,0.1)', border: '1px solid rgba(212,23,74,0.2)' }}>
                <FileText size={32} className="text-[#D4174A]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No blogs published yet</h3>
              <p className="text-gray-500 text-sm">Check back soon for the latest insights from Innovatiq.</p>
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {blogs.map((blog, i) => {
              const imageUrl = getBlogImageUrl(blog.image);
              const color = tagColors[i % tagColors.length];

              return (
                <AnimatedSection key={blog._id} delay={i * 60}>
                  <Link href={`/blogs/${blog._id}`}>
                    <article className="group rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 h-full flex flex-col relative"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                      }}>
                      <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
                        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

                      <div className="relative h-48 overflow-hidden">
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
                          style={{ background: 'rgba(6,11,20,0.85)', color, border: `1px solid ${color}30`, backdropFilter: 'blur(8px)' }}>
                          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-bold text-white mb-3 leading-snug group-hover:text-[#D4174A] transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                          {blog.shortDescription}
                        </p>
                        <div className="flex items-center justify-between mt-5 pt-4"
                          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
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
