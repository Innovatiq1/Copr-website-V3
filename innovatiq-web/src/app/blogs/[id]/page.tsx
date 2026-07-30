'use client';

import { useState, useEffect, use } from 'react';
import { ThumbsUp, ThumbsDown, ArrowLeft, Share2, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogImageUrl } from '@/lib/api';
import Loader from '@/components/Loader';

export default function BlogContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [voted, setVoted] = useState<'like' | 'dislike' | null>(null);
  const voteKey = `blog-vote-${id}`;

  useEffect(() => {
    const saved = localStorage.getItem(voteKey) as 'like' | 'dislike' | null;
    if (saved) setVoted(saved);
  }, [voteKey]);

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then(async r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => {
        const b = d?.blog || d?.data || d;
        if (!b?.title) throw new Error();
        setBlog(b);
        setLikes(b.likes || 0);
        setDislikes(b.dislikes || 0);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    if (voted) return;
    const res = await fetch(`/api/blogs/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ like: true }) }).catch(() => null);
    if (res?.ok) { setLikes(l => l + 1); setVoted('like'); localStorage.setItem(voteKey, 'like'); }
  };

  const handleDislike = async () => {
    if (voted) return;
    const res = await fetch(`/api/blogs/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dislike: true }) }).catch(() => null);
    if (res?.ok) { setDislikes(d => d + 1); setVoted('dislike'); localStorage.setItem(voteKey, 'dislike'); }
  };

  if (loading) return <Loader message="Loading article…" />;

  if (notFound || !blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: '#F9FAFB' }}>
      <div className="text-5xl mb-5">📄</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h1>
      <p className="text-gray-600 font-medium mb-7 text-center max-w-sm text-sm">This article may have been removed or the link is incorrect.</p>
      <Link href="/blogs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
        style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 16px rgba(190,18,60,0.30)' }}>
        <ArrowLeft size={14} /> Back to Blogs
      </Link>
    </div>
  );

  const imageUrl = getBlogImageUrl(blog.image);
  const dateStr = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>

      {/* ─── ANIMATED HERO — light theme ─── */}
      <div className="relative overflow-hidden pt-32 pb-16" style={{ background: '#ffffff' }}>

        {/* Aurora blobs — corners only, blurred so they never clash with text */}
        <div className="aurora a1" />
        <div className="aurora a2" />
        <div className="aurora a3" />

        {/* Floating shapes — hidden on mobile, scattered randomly like product/service pages */}
        <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden">
          <div className="spin-s absolute" style={{ top: '14%', right: '7%', width: '80px', height: '80px', border: '1px solid rgba(190,18,60,0.14)', borderRadius: '12px' }} />
          <div className="float absolute rounded-full" style={{ top: '38%', left: '4%', width: '54px', height: '54px', background: 'rgba(244,63,94,0.05)', border: '1px solid rgba(244,63,94,0.18)' }} />
          <div className="float-d absolute" style={{ bottom: '22%', right: '9%', width: '38px', height: '38px', background: 'rgba(190,18,60,0.05)', border: '1px solid rgba(190,18,60,0.18)', transform: 'rotate(45deg)' }} />
          <div className="spin-s absolute rounded-full" style={{ top: '8%', left: '7%', width: '58px', height: '58px', border: '1px solid rgba(245,158,11,0.22)' }} />
          <div className="float-d absolute" style={{ top: '65%', right: '5%', width: '30px', height: '30px', background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)', transform: 'rotate(15deg)', borderRadius: '6px' }} />
          <div className="float absolute rounded-full" style={{ top: '22%', left: '42%', width: '6px', height: '6px', background: '#F43F5E', opacity: 0.5, boxShadow: '0 0 7px rgba(244,63,94,0.4)' }} />
          <div className="float absolute rounded-full" style={{ top: '58%', left: '3%', width: '8px', height: '8px', background: '#BE123C', opacity: 0.45, boxShadow: '0 0 8px rgba(190,18,60,0.4)' }} />
          <div className="float-d absolute rounded-full" style={{ top: '48%', right: '20%', width: '6px', height: '6px', background: '#F59E0B', opacity: 0.55, boxShadow: '0 0 7px rgba(245,158,11,0.4)' }} />
        </div>

        {/* Brand accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg,#BE123C 0%,#F59E0B 50%,#10B981 100%)' }} />

        {/* Content — all dark text on white */}
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">

          {/* Back */}
          <Link href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-10 transition-colors group text-gray-600 hover:text-[#BE123C]">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Blogs
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {(blog.tags?.length ? blog.tags : ['Technology Insights']).map((tag: string) => (
              <span key={tag}
                className="inline-flex items-center gap-1.5 text-[11px] sm:text-[11.5px] font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full"
                style={{
                  color: '#9F1239',
                  background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
                  border: '1px solid #FECDD3',
                  boxShadow: '0 1px 4px rgba(190,18,60,0.10)',
                }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#BE123C', boxShadow: '0 0 4px rgba(190,18,60,0.40)' }} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-[34px] md:text-[48px] lg:text-[56px] font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">
            {blog.title}
          </h1>

          {/* Short description */}
          {blog.shortDescription && (
            <p className="text-[17px] text-gray-900 font-medium leading-relaxed mb-8 pl-4"
              style={{ borderLeft: '3px solid #BE123C' }}>
              {blog.shortDescription}
            </p>
          )}

          {/* Author + meta row */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-100">
            {blog.author && (
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#BE123C,#F59E0B)' }}>
                  {blog.author.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-semibold text-gray-800">{blog.author}</span>
              </div>
            )}
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-4 text-gray-600 text-sm font-semibold">
              {dateStr && <span className="flex items-center gap-1.5"><Calendar size={13} />{dateStr}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* ─── FEATURE IMAGE ─── */}
      {imageUrl && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-0 -mt-4 mb-10">
          <div className="relative h-52 sm:h-72 md:h-[460px] w-full rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid rgba(0,0,0,0.08)' }}>
            <Image src={imageUrl} alt={blog.title} fill className="object-cover" />
          </div>
        </div>
      )}

      {/* ─── ARTICLE BODY ─── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-6">
        <div className="bg-white rounded-2xl px-8 py-10"
          style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          {blog.description ? (
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.description }} />
          ) : blog.shortDescription ? (
            <p className="text-gray-600 font-medium text-lg leading-relaxed">{blog.shortDescription}</p>
          ) : (
            <p className="text-slate-300 font-medium italic text-sm">No content available.</p>
          )}
        </div>
      </div>

      {/* ─── FEEDBACK & FOOTER ─── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-20 space-y-5">

        {/* Feedback card */}
        <div className="bg-white rounded-2xl p-6"
          style={{ border: '1.5px solid rgba(212,23,74,0.12)', boxShadow: '0 2px 16px rgba(212,23,74,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-bold text-gray-900 text-[15px]">Was this article helpful?</p>
              <p className="text-slate-600 font-medium text-xs mt-0.5">
                {voted ? `You voted · ${voted === 'like' ? '👍 Helpful' : '👎 Not helpful'}` : 'One vote per article · helps us improve'}
              </p>
            </div>
            {voted && (
              <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(5,150,105,0.10)', color: '#059669', border: '1px solid rgba(5,150,105,0.20)' }}>
                <CheckCircle size={11} /> Voted
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleLike} disabled={!!voted}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 active:scale-95"
              style={voted === 'like'
                ? { background: '#059669', color: '#fff', border: '2px solid #059669', boxShadow: '0 4px 14px rgba(5,150,105,0.30)' }
                : voted ? { background: '#f8fafc', color: '#cbd5e1', border: '2px solid #e2e8f0', cursor: 'not-allowed' }
                : { background: '#fff', color: '#059669', border: '2px solid #059669', cursor: 'pointer' }}>
              <ThumbsUp size={15} /> Yes, it was! ({likes})
            </button>

            <button onClick={handleDislike} disabled={!!voted}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 active:scale-95"
              style={voted === 'dislike'
                ? { background: '#DC2626', color: '#fff', border: '2px solid #DC2626', boxShadow: '0 4px 14px rgba(220,38,38,0.28)' }
                : voted ? { background: '#f8fafc', color: '#cbd5e1', border: '2px solid #e2e8f0', cursor: 'not-allowed' }
                : { background: '#fff', color: '#DC2626', border: '2px solid #DC2626', cursor: 'pointer' }}>
              <ThumbsDown size={15} /> Not really ({dislikes})
            </button>

            <button
              onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })}
              className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#FFF1F2', color: '#E11D48', border: '2px solid #BFDBFE', cursor: 'pointer' }}>
              <Share2 size={15} /> Share
            </button>
          </div>
        </div>

        <div>
          <Link href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 16px rgba(190,18,60,0.30)' }}>
            <ArrowLeft size={14} /> All Blogs
          </Link>
        </div>
      </div>

      <style>{`
        /* ── Aurora blobs — large, blurred, corners only ── */
        .aurora { position:absolute; border-radius:50%; pointer-events:none; filter:blur(90px); }
        .a1 {
          width:420px; height:420px;
          background: radial-gradient(circle, rgba(212,23,74,0.14) 0%, rgba(245,158,11,0.07) 60%, transparent 100%);
          top:-120px; right:-100px;
          animation: auroraFloat 12s ease-in-out infinite;
        }
        .a2 {
          width:320px; height:320px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(16,185,129,0.06) 60%, transparent 100%);
          bottom:-80px; left:-80px;
          animation: auroraFloat 15s ease-in-out infinite 4s reverse;
        }
        .a3 {
          width:240px; height:240px;
          background: radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%);
          bottom:10%; right:5%;
          animation: auroraFloat 10s ease-in-out infinite 8s;
        }

        @keyframes auroraFloat {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          33%      { transform: translate(20px,-15px) scale(1.04); }
          66%      { transform: translate(-15px,10px) scale(0.97); }
        }

        /* ── Article prose ── */
        .blog-content { font-size: 17px; line-height: 1.85; color: #374151; font-weight: 500; }
        .blog-content h1,.blog-content h2,.blog-content h3,.blog-content h4 {
          font-weight: 800; color: #111827; margin-top: 1.8em; margin-bottom: 0.6em; line-height: 1.3;
        }
        .blog-content h1 { font-size: 1.9em; }
        .blog-content h2 { font-size: 1.4em; padding-bottom: 0.3em; border-bottom: 2px solid rgba(212,23,74,0.12); }
        .blog-content h3 { font-size: 1.15em; }
        .blog-content p { margin-bottom: 1.4em; font-weight: 500; }
        .blog-content ul,.blog-content ol { margin: 1em 0 1.4em 1.6em; }
        .blog-content li { margin-bottom: 0.5em; font-weight: 500; }
        .blog-content ul { list-style-type: disc; }
        .blog-content ol { list-style-type: decimal; }
        .blog-content blockquote {
          border-left: 4px solid #BE123C; margin: 1.8em 0; padding: 0.9em 1.3em;
          background: rgba(212,23,74,0.04); border-radius: 0 12px 12px 0;
          font-style: italic; color: #4B5563;
        }
        .blog-content a { color: #BE123C; text-decoration: underline; text-underline-offset: 3px; }
        .blog-content strong,.blog-content b { font-weight: 800; color: #0F172A; }
        .blog-content code {
          background: #F1F5F9; padding: 2px 7px; border-radius: 5px;
          font-size: 0.87em; font-family: monospace; color: #9F1239;
        }
        .blog-content pre {
          background: #0F172A; color: #E2E8F0; padding: 1.3em 1.6em;
          border-radius: 14px; overflow-x: auto; margin: 1.8em 0; font-size: 0.9em;
        }
        .blog-content img { width: 100%; border-radius: 12px; margin: 1.8em 0; }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5em 0; }
        .blog-content th,.blog-content td { border: 1px solid rgba(0,0,0,0.09); padding: 0.65em 1em; }
        .blog-content th { background: #F8FAFC; font-weight: 700; color: #111827; }
        .blog-content hr { border: none; border-top: 2px solid rgba(0,0,0,0.07); margin: 2em 0; }
      `}</style>
    </div>
  );
}
