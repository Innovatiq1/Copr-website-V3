'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import { getBlogImageUrl, likeBlog, dislikeBlog } from '@/lib/api';

export default function BlogContentPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    fetch(`/api/blogs/${params.id}`)
      .then(r => r.json())
      .then(d => {
        const b = d?.blog || d?.data || d;
        setBlog(b);
        setLikes(b?.likes || 0);
        setDislikes(b?.dislikes || 0);
      })
      .catch(() => {
        setBlog({
          _id: params.id,
          title: 'The Future of Enterprise Cloud: Multi-Cloud Strategies for 2026',
          shortDescription: 'As organizations mature in their cloud journey, multi-cloud strategies have become the norm.',
          description: `<p>Multi-cloud strategies have evolved from a niche approach to the standard for enterprise organizations. As businesses mature in their cloud journey, they increasingly recognize that relying on a single cloud provider introduces risk and limits flexibility.</p>
<h2>What is Multi-Cloud?</h2>
<p>Multi-cloud refers to the use of cloud services from multiple providers. This might include public clouds like AWS, Azure, and Google Cloud, combined with private cloud infrastructure.</p>
<h2>Benefits of Multi-Cloud</h2>
<p>The advantages of a well-executed multi-cloud strategy include vendor independence, cost optimization, improved resilience, and the ability to leverage best-of-breed services from different providers.</p>
<h2>Key Challenges</h2>
<p>While multi-cloud offers significant benefits, it also introduces complexity in management, security, and governance. Organizations must invest in unified management platforms and strong governance frameworks.</p>`,
          likes: 42,
          dislikes: 3,
          createdAt: '2026-01-15',
        });
        setLikes(42);
        setDislikes(3);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleLike = async () => {
    const ok = await likeBlog(params.id);
    if (ok) setLikes(l => l + 1);
  };

  const handleDislike = async () => {
    const ok = await dislikeBlog(params.id);
    if (ok) setDislikes(d => d + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A1628' }}>
        <div className="w-12 h-12 border-4 border-[#D4174A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) return null;

  const imageUrl = getBlogImageUrl(blog.image);

  return (
    <div className="pt-32 min-h-screen bg-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <AnimatedSection>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D4174A] text-sm mb-8 transition-colors">
            <ArrowLeft size={15} /> Back to Blogs
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ color: '#D4174A', background: 'rgba(212,23,74,0.22)' }}>
              Technology Insights
            </span>
            {blog.createdAt && (
              <span className="text-gray-400 text-sm">
                {new Date(blog.createdAt).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>

          {blog.shortDescription && (
            <p className="text-gray-500 text-lg leading-relaxed mb-8 border-l-4 pl-5" style={{ borderColor: '#D4174A' }}>
              {blog.shortDescription}
            </p>
          )}
        </AnimatedSection>
      </div>

      {/* Feature Image */}
      {imageUrl && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
            <Image src={imageUrl} alt={blog.title} fill className="object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AnimatedSection>
          {blog.description ? (
            <div
              className="prose prose-lg max-w-none"
              style={{
                // Prose-like styles
                lineHeight: '1.8',
                color: '#374151',
              }}
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          ) : (
            <p className="text-gray-600 leading-relaxed">{blog.shortDescription}</p>
          )}

          {/* Like/Dislike */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-700 font-medium mb-4">Was this article helpful?</p>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all"
              >
                <ThumbsUp size={16} /> Yes, it was! ({likes})
              </button>
              <button
                onClick={handleDislike}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <ThumbsDown size={16} /> Not really ({dislikes})
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all ml-auto">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-10">
            <Link href="/blogs" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#D4174A] hover:text-[#D4174A] transition-all duration-200">
              <ArrowLeft size={16} /> All Blogs
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
