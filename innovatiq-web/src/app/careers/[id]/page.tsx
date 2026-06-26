'use client';

import { useState, useEffect, use, useRef } from 'react';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import Loader from '@/components/Loader';
import { MapPin, Briefcase, Clock, ChevronRight, Building, CheckCircle2, Star, Gift, Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface JobData {
  _id: string;
  jobTitle: string;
  companyName: string;
  primarySkills: string | string[];
  location: string;
  experience: string;
  employmentType: string;
  shortDescription?: string;
  jobDescription?: string;
  description?: string;
  responsibilities?: string | string[];
  requirements?: string | string[];
  benefits?: string | string[];
  salary?: string;
}

function toList(val: string | string[] | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  return String(val).split('\n').filter(Boolean);
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all bg-[#F8FAFC] text-gray-800 border-gray-200 focus:border-[#BE123C] focus:bg-white focus:shadow-[0_0_0_3px_rgba(190,18,60,0.08)]';
const inputErrCls = 'w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all bg-[#FFF8F8] text-gray-800 border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.10)]';

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', portfolioLink: '', statement: '' });
  const [resume, setResume] = useState<File | null>(null);
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, answer: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ a, b, answer: '' });
    fetch(`/api/careers/${id}`)
      .then(r => r.json())
      .then(d => setJob(d?.career || d?.data || d))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  const setField = (name: string, value: string) => {
    setFormData(p => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.email.trim()) errs.email = 'Email address is required.';
    if (!resume) errs.resume = 'Please upload your resume.';
    if (!captcha.answer.trim() || parseInt(captcha.answer) !== captcha.a + captcha.b) errs.captcha = 'Incorrect answer.';

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', formData.fullName);
      fd.append('phone', formData.phone);
      fd.append('email', formData.email);
      fd.append('portfolioLink', formData.portfolioLink);
      fd.append('resume', resume!);
      fd.append('coverLetter', formData.statement);
      const res = await fetch(`/api/job-applications/${id}/apply`, { method: 'POST', body: fd });
      if (res.ok) { setSubmitted(true); setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }
      else setError('Something went wrong. Please try again.');
    } catch { setError('Failed to submit. Please try again later.'); }
    finally { setSubmitting(false); }
  };

  if (loading) return (
    <Loader message="Loading job details…" />
  );

  if (!job || !job.jobTitle) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4" style={{ background: '#F9FAFB' }}>
      <div className="text-5xl">💼</div>
      <h2 className="text-2xl font-bold text-gray-900">Job Not Found</h2>
      <p className="text-gray-500 text-sm text-center max-w-xs">This position may have been filled or the link is incorrect.</p>
      <Link href="/careers" className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl text-sm"
        style={{ background: 'linear-gradient(135deg,#9F1239,#BE123C,#E11D48)', boxShadow: '0 4px 14px rgba(190,18,60,0.30)' }}>
        <ArrowLeft size={14} /> View All Jobs
      </Link>
    </div>
  );

  const skills = (Array.isArray(job.primarySkills)
    ? job.primarySkills
    : String(job.primarySkills || '').split(',')
  ).map((s: string) => s.trim()).filter(Boolean);

  const responsibilities = toList(job.responsibilities);
  const requirements = toList(job.requirements);
  const benefits = toList(job.benefits);
  const description = job.jobDescription || job.description || job.shortDescription || '';

  const metaItems = [
    { icon: <Building size={14} />, label: job.companyName },
    { icon: <MapPin size={14} />, label: job.location },
    { icon: <Briefcase size={14} />, label: job.experience },
    { icon: <Clock size={14} />, label: job.employmentType },
  ].filter(m => m.label);

  return (
    <>
      <PageHero
        badge="Career Opportunity"
        title={job.jobTitle}
        subtitle={`${job.companyName}${job.location ? ' · ' + job.location : ''}`}
      />

      <section style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── LEFT: Job Details ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Meta chips */}
              <AnimatedSection>
                <div className="flex flex-wrap gap-3">
                  {metaItems.map(item => (
                    <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                      style={{ background: '#fff', border: '1.5px solid rgba(190,18,60,0.18)', color: '#111827', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                      <span style={{ color: '#BE123C' }}>{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Skills */}
              {skills.length > 0 && (
                <AnimatedSection>
                  <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 rounded-full" style={{ background: '#BE123C' }} />
                      <h3 className="font-bold text-gray-900 text-lg">Required Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(s => (
                        <span key={s} className="px-3.5 py-1.5 rounded-full text-sm font-semibold"
                          style={{ background: 'rgba(190,18,60,0.08)', color: '#BE123C', border: '1px solid rgba(190,18,60,0.18)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Description */}
              {description && (
                <AnimatedSection>
                  <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 rounded-full" style={{ background: '#BE123C' }} />
                      <h3 className="font-bold text-gray-900 text-lg">Job Description</h3>
                    </div>
                    <p className="leading-relaxed whitespace-pre-line text-[15px] font-medium" style={{ color: '#1A1A1A' }}>{description}</p>
                  </div>
                </AnimatedSection>
              )}

              {/* Responsibilities */}
              {responsibilities.length > 0 && (
                <AnimatedSection>
                  <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 rounded-full" style={{ background: '#BE123C' }} />
                      <h3 className="font-bold text-gray-900 text-lg">Responsibilities</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-[15px] font-medium" style={{ color: '#1A1A1A' }}>
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: '#BE123C' }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              )}

              {/* Requirements */}
              {requirements.length > 0 && (
                <AnimatedSection>
                  <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 rounded-full" style={{ background: '#BE123C' }} />
                      <h3 className="font-bold text-gray-900 text-lg">Requirements</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-[15px] font-medium" style={{ color: '#1A1A1A' }}>
                          <Star size={14} className="mt-0.5 shrink-0" style={{ color: '#BE123C' }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              )}

              {/* Benefits */}
              {benefits.length > 0 && (
                <AnimatedSection>
                  <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 rounded-full" style={{ background: '#10B981' }} />
                      <h3 className="font-bold text-gray-900 text-lg">What We Offer</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-[15px] font-medium" style={{ color: '#1A1A1A' }}>
                          <Gift size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              )}

              <AnimatedSection>
                <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#BE123C] transition-colors">
                  <ArrowLeft size={14} /> Back to all jobs
                </Link>
              </AnimatedSection>
            </div>

            {/* ── RIGHT: Application Form ── */}
            <div className="lg:col-span-1">
              <AnimatedSection direction="right">
                <div ref={formRef} className="sticky top-28 rounded-2xl overflow-hidden"
                  style={{ border: '1.5px solid rgba(190,18,60,0.15)', boxShadow: '0 8px 40px rgba(190,18,60,0.10)' }}>

                  {/* Form header */}
                  <div className="px-6 py-5" style={{ background: 'linear-gradient(135deg,#9F1239 0%,#BE123C 50%,#E11D48 100%)' }}>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-3"
                      style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.40)', color: '#fff', letterSpacing: '0.08em' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                      JOIN OUR TEAM
                    </span>
                    <h3 className="font-bold text-white text-lg leading-snug">Apply for this Role</h3>
                    <p className="text-white text-xs mt-1 font-medium opacity-90">{job.jobTitle}{job.location ? ` · ${job.location}` : ''}</p>
                  </div>

                  <div className="bg-white px-6 py-6">
                    {submitted ? (
                      <div className="text-center py-6">
                        <div className="text-5xl mb-4">🎉</div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Application Submitted!</h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                          Thank you! We&apos;ll review your application and be in touch soon.
                        </p>
                        <Link href="/careers"
                          className="inline-flex items-center justify-center gap-2 w-full py-3 text-white font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5"
                          style={{ background: 'linear-gradient(135deg,#9F1239,#BE123C,#E11D48)', boxShadow: '0 4px 14px rgba(190,18,60,0.30)' }}>
                          View More Jobs
                        </Link>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {[
                          { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
                          { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+65 9000 0000' },
                          { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'you@email.com' },
                          { name: 'portfolioLink', label: 'Portfolio / LinkedIn (optional)', type: 'url', required: false, placeholder: 'https://...' },
                        ].map(field => (
                          <div key={field.name}>
                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                              {field.label}{field.required && <span className="text-[#BE123C] ml-0.5">*</span>}
                            </label>
                            <input
                              type={field.type}
                              placeholder={field.placeholder}
                              value={formData[field.name as keyof typeof formData]}
                              onChange={e => setField(field.name, e.target.value)}
                              className={fieldErrors[field.name] ? inputErrCls : inputCls}
                            />
                            {fieldErrors[field.name] && (
                              <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors[field.name]}</p>
                            )}
                          </div>
                        ))}

                        {/* Resume upload */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Resume <span className="text-[#BE123C]">*</span></label>
                          <label className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium"
                            style={{
                              background: fieldErrors.resume ? '#FFF8F8' : resume ? 'rgba(190,18,60,0.05)' : '#F8FAFC',
                              borderColor: fieldErrors.resume ? '#EF4444' : resume ? 'rgba(190,18,60,0.40)' : '#E2E8F0',
                              color: fieldErrors.resume ? '#EF4444' : resume ? '#BE123C' : '#6B7280',
                            }}>
                            <Upload size={15} className="shrink-0" />
                            <span className="truncate">{resume ? resume.name : 'Upload PDF / DOC / DOCX'}</span>
                            <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                              onChange={e => { setResume(e.target.files?.[0] || null); setFieldErrors(p => ({ ...p, resume: '' })); }} />
                          </label>
                          {fieldErrors.resume && (
                            <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors.resume}</p>
                          )}
                        </div>

                        {/* Cover */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Why should we hire you?</label>
                          <textarea rows={3} placeholder="Tell us what makes you a great fit…"
                            value={formData.statement}
                            onChange={e => setFormData(p => ({ ...p, statement: e.target.value }))}
                            className={inputCls + ' resize-none'} />
                        </div>

                        {/* Captcha */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                            Quick Check: {captcha.a} + {captcha.b} = ? <span className="text-[#BE123C]">*</span>
                          </label>
                          <input type="number" placeholder="Answer"
                            value={captcha.answer}
                            onChange={e => { setCaptcha(p => ({ ...p, answer: e.target.value })); setFieldErrors(p => ({ ...p, captcha: '' })); }}
                            className={fieldErrors.captcha ? inputErrCls : inputCls} />
                          {fieldErrors.captcha && (
                            <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors.captcha}</p>
                          )}
                        </div>

                        {error && (
                          <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl text-xs font-medium"
                            style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
                            {error}
                          </div>
                        )}

                        <button type="submit" disabled={submitting}
                          className="inline-flex items-center justify-center gap-2 w-full py-3.5 text-white font-bold rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                          style={{ background: 'linear-gradient(135deg,#9F1239,#BE123C,#E11D48)', boxShadow: '0 4px 14px rgba(190,18,60,0.30)' }}>
                          {submitting ? (
                            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Submitting…</span></>
                          ) : (
                            <><span>Submit Application</span><ChevronRight size={16} /></>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
