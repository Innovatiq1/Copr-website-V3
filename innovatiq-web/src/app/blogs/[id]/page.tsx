'use client';

import { useState, useEffect, use } from 'react';
import { ThumbsUp, ThumbsDown, ArrowLeft, Share2, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogImageUrl } from '@/lib/api';

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F9FAFB' }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-[3px] border-[#1D4ED8] border-t-transparent animate-spin" />
        <p className="text-slate-400 font-medium text-sm">Loading article…</p>
      </div>
    </div>
  );

  if (notFound || !blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: '#F9FAFB' }}>
      <div className="text-5xl mb-5">📄</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h1>
      <p className="text-gray-600 font-medium mb-7 text-center max-w-sm text-sm">This article may have been removed or the link is incorrect.</p>
      <Link href="/blogs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
        style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)', boxShadow: '0 4px 16px rgba(14,165,233,0.30)' }}>
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

        {/* Accent shapes — edges only */}
        <div className="acc-shape acc-tri-tl" />
        <div className="acc-shape acc-tri-br" />
        <div className="acc-shape acc-ring-tr" />
        <div className="acc-shape acc-ring-bl" />
        <div className="acc-shape acc-sq-tr" />
        <div className="acc-shape acc-sq-bl" />
        <div className="acc-dot d1" /><div className="acc-dot d2" />
        <div className="acc-dot d3" /><div className="acc-dot d4" />

        {/* Brand accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg,#1D4ED8 0%,#F59E0B 50%,#10B981 100%)' }} />

        {/* Content — all dark text on white */}
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8">

          {/* Back */}
          <Link href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-10 transition-colors group text-gray-600 hover:text-[#1D4ED8]">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Blogs
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {(blog.tags?.length ? blog.tags : ['Technology Insights']).map((tag: string) => (
              <span key={tag} className="text-[10px] font-black uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full"
                style={{ color: '#1D4ED8', background: 'rgba(212,23,74,0.09)', border: '1.5px solid rgba(212,23,74,0.22)' }}>
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
            <p className="text-[17px] text-gray-600 font-medium leading-relaxed mb-8 pl-4"
              style={{ borderLeft: '3px solid #1D4ED8' }}>
              {blog.shortDescription}
            </p>
          )}

          {/* Author + meta row */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-100">
            {blog.author && (
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#1D4ED8,#F59E0B)' }}>
                  {blog.author.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-semibold text-gray-800">{blog.author}</span>
              </div>
            )}
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-4 text-gray-600 text-sm font-medium">
              {dateStr && <span className="flex items-center gap-1.5"><Calendar size={13} />{dateStr}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* ─── FEATURE IMAGE ─── */}
      {imageUrl && (
        <div className="max-w-3xl mx-auto px-5 sm:px-8 -mt-4 mb-10">
          <div className="relative h-60 md:h-[420px] w-full rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid rgba(0,0,0,0.08)' }}>
            <Image src={imageUrl} alt={blog.title} fill className="object-cover" />
          </div>
        </div>
      )}

      {/* ─── ARTICLE BODY ─── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-6">
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
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20 space-y-5">

        {/* Feedback card */}
        <div className="bg-white rounded-2xl p-6"
          style={{ border: '1.5px solid rgba(212,23,74,0.12)', boxShadow: '0 2px 16px rgba(212,23,74,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-bold text-gray-900 text-[15px]">Was this article helpful?</p>
              <p className="text-slate-400 font-medium text-xs mt-0.5">
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
                : { background: '#fff', color: '#059669', border: '2px solid #059669' }}>
              <ThumbsUp size={15} /> Yes, it was! ({likes})
            </button>

            <button onClick={handleDislike} disabled={!!voted}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 active:scale-95"
              style={voted === 'dislike'
                ? { background: '#DC2626', color: '#fff', border: '2px solid #DC2626', boxShadow: '0 4px 14px rgba(220,38,38,0.28)' }
                : voted ? { background: '#f8fafc', color: '#cbd5e1', border: '2px solid #e2e8f0', cursor: 'not-allowed' }
                : { background: '#fff', color: '#DC2626', border: '2px solid #DC2626' }}>
              <ThumbsDown size={15} /> Not really ({dislikes})
            </button>

            <button
              onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })}
              className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#EFF6FF', color: '#2563EB', border: '2px solid #BFDBFE' }}>
              <Share2 size={15} /> Share
            </button>
          </div>
        </div>

        <div>
          <Link href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)', boxShadow: '0 4px 16px rgba(14,165,233,0.30)' }}>
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

        /* ── Edge accent shapes — only near the margins ── */
        .acc-shape { position:absolute; pointer-events:none; }

        /* Top-left triangle */
        .acc-tri-tl {
          width:0; height:0;
          border-left:22px solid transparent;
          border-right:22px solid transparent;
          border-bottom:38px solid rgba(212,23,74,0.16);
          top:8%; left:2%;
          animation: floatY 7s ease-in-out infinite 0s;
        }
        /* Bottom-right triangle */
        .acc-tri-br {
          width:0; height:0;
          border-left:16px solid transparent;
          border-right:16px solid transparent;
          border-top:28px solid rgba(99,102,241,0.16);
          bottom:8%; right:2%;
          animation: floatY 9s ease-in-out infinite 2s;
        }
        /* Top-right ring */
        .acc-ring-tr {
          width:70px; height:70px; border-radius:50%;
          border:3px solid rgba(245,158,11,0.22);
          top:5%; right:4%;
          animation: floatY 8s ease-in-out infinite 1s, spinSlow 20s linear infinite;
        }
        /* Bottom-left ring */
        .acc-ring-bl {
          width:50px; height:50px; border-radius:50%;
          border:2.5px solid rgba(16,185,129,0.22);
          bottom:12%; left:2%;
          animation: floatY 6s ease-in-out infinite 3s, spinSlow 16s linear infinite reverse;
        }
        /* Top-right rotated square */
        .acc-sq-tr {
          width:24px; height:24px;
          background:rgba(99,102,241,0.18);
          border-radius:4px;
          top:15%; right:2%;
          animation: floatY 7s ease-in-out infinite 0.5s, spinSlow 14s linear infinite;
        }
        /* Bottom-left rotated square */
        .acc-sq-bl {
          width:18px; height:18px;
          background:rgba(245,158,11,0.20);
          border-radius:3px;
          bottom:20%; left:1.5%;
          animation: floatY 8s ease-in-out infinite 2.5s, spinSlow 18s linear infinite reverse;
        }

        /* ── Tiny accent dots — edge positions ── */
        .acc-dot { position:absolute; border-radius:50%; pointer-events:none; }
        .d1 { width:8px;height:8px; background:rgba(212,23,74,0.38);  top:30%; left:1.5%; animation:floatY 6s ease-in-out infinite 1s; }
        .d2 { width:6px;height:6px; background:rgba(99,102,241,0.35); top:55%; right:1.5%; animation:floatY 7s ease-in-out infinite 2s; }
        .d3 { width:7px;height:7px; background:rgba(245,158,11,0.35); top:20%; right:3%;   animation:floatY 5s ease-in-out infinite 0s; }
        .d4 { width:5px;height:5px; background:rgba(16,185,129,0.38); bottom:30%; left:3%; animation:floatY 8s ease-in-out infinite 3s; }

        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-16px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes auroraFloat {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          33%      { transform: translate(20px,-15px) scale(1.04); }
          66%      { transform: translate(-15px,10px) scale(0.97); }
        }

        /* ── Article prose ── */
        .blog-content { font-size: 17px; line-height: 1.85; color: #374151; }
        .blog-content h1,.blog-content h2,.blog-content h3,.blog-content h4 {
          font-weight: 800; color: #111827; margin-top: 1.8em; margin-bottom: 0.6em; line-height: 1.3;
        }
        .blog-content h1 { font-size: 1.9em; }
        .blog-content h2 { font-size: 1.4em; padding-bottom: 0.3em; border-bottom: 2px solid rgba(212,23,74,0.12); }
        .blog-content h3 { font-size: 1.15em; }
        .blog-content p { margin-bottom: 1.4em; }
        .blog-content ul,.blog-content ol { margin: 1em 0 1.4em 1.6em; }
        .blog-content li { margin-bottom: 0.5em; }
        .blog-content ul { list-style-type: disc; }
        .blog-content ol { list-style-type: decimal; }
        .blog-content blockquote {
          border-left: 4px solid #1D4ED8; margin: 1.8em 0; padding: 0.9em 1.3em;
          background: rgba(212,23,74,0.04); border-radius: 0 12px 12px 0;
          font-style: italic; color: #4B5563;
        }
        .blog-content a { color: #1D4ED8; text-decoration: underline; text-underline-offset: 3px; }
        .blog-content strong { font-weight: 700; color: #111827; }
        .blog-content code {
          background: #F1F5F9; padding: 2px 7px; border-radius: 5px;
          font-size: 0.87em; font-family: monospace; color: #1E40AF;
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
