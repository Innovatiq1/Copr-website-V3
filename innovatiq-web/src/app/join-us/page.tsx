'use client';

import { useState, useEffect, useRef } from 'react';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import { Send, Upload, User, Phone, Mail, Wrench, Clock, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const inputCls = 'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all bg-[#F8FAFC] text-gray-800 border-gray-200 focus:border-[#BE123C] focus:bg-white focus:shadow-[0_0_0_3px_rgba(190,18,60,0.08)]';
const inputErrCls = 'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all bg-[#FFF8F8] text-gray-800 border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.10)]';

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', skills: '', experience: '', statement: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCaptcha({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1,
    });
  }, []);

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
    if (!formData.skills.trim()) errs.skills = 'Key skills are required.';
    if (!resume) errs.resume = 'Please upload your resume.';
    if (!captchaAnswer.trim() || parseInt(captchaAnswer) !== captcha.a + captcha.b) errs.captcha = 'Incorrect answer.';

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      fd.append('resumefile', resume!);
      const res = await fetch('/api/job-applications/submit-profile', { method: 'POST', body: fd });
      if (res.ok) { setSubmitted(true); setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }
      else setError('Failed to submit. Please try again.');
    } catch {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'fullName',   label: 'Full Name',           type: 'text',  required: true,  icon: User,        placeholder: 'John Doe' },
    { name: 'phone',      label: 'Phone Number',         type: 'tel',   required: true,  icon: Phone,       placeholder: '+65 9000 0000' },
    { name: 'email',      label: 'Email Address',        type: 'email', required: true,  icon: Mail,        placeholder: 'you@email.com' },
    { name: 'skills',     label: 'Key Skills',           type: 'text',  required: true,  icon: Wrench,      placeholder: 'e.g. React, Node.js, Python' },
    { name: 'experience', label: 'Years of Experience',  type: 'text',  required: false, icon: Clock,       placeholder: 'e.g. 3 years' },
  ];

  return (
    <>
      <PageHero
        badge="Future Opportunities"
        title="Submit Your Profile"
        subtitle="No current openings that match your skills? Join our talent pool and be first in line when the right opportunity arises."
      />

      <section style={{ background: '#F8FAFC' }} className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>

            {submitted ? (
              <div ref={formRef} className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(190,18,60,0.12)', border: '1.5px solid rgba(190,18,60,0.15)' }}>
                {/* Success header */}
                <div className="px-8 py-6 text-center" style={{ background: 'linear-gradient(135deg,#9F1239 0%,#BE123C 50%,#E11D48 100%)' }}>
                  <div className="text-5xl mb-2">🎉</div>
                  <h3 className="text-2xl font-bold text-white">Profile Submitted!</h3>
                </div>
                <div className="bg-white px-8 py-8 text-center">
                  <p className="text-gray-700 font-medium leading-relaxed mb-6">
                    Thank you! We&apos;ll keep your profile on file and reach out when a suitable opportunity arises.
                  </p>
                  <Link href="/careers"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg,#9F1239,#BE123C,#E11D48)', boxShadow: '0 4px 14px rgba(190,18,60,0.30)' }}>
                    Browse Open Positions <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>

                {/* Card header */}
                <div className="px-8 py-5" style={{ background: 'linear-gradient(135deg,#9F1239 0%,#BE123C 50%,#E11D48 100%)' }}>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-3"
                    style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.40)', color: '#fff', letterSpacing: '0.08em' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                    TALENT POOL
                  </span>
                  <h3 className="font-bold text-white text-lg">Your Details</h3>
                  <p className="text-white text-xs mt-1 font-semibold">Fill in your information and we&apos;ll be in touch</p>
                </div>

                <div className="bg-white px-8 py-7">
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                    {/* Two-column grid for name + phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {fields.slice(0, 2).map(f => (
                        <div key={f.name}>
                          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                            {f.label}{f.required && <span className="text-[#BE123C] ml-0.5">*</span>}
                          </label>
                          <div className="relative">
                            <f.icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input type={f.type} placeholder={f.placeholder}
                              value={formData[f.name as keyof typeof formData]}
                              onChange={e => setField(f.name, e.target.value)}
                              className={(fieldErrors[f.name] ? inputErrCls : inputCls) + ' pl-10'} />
                          </div>
                          {fieldErrors[f.name] && (
                            <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors[f.name]}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Remaining single fields */}
                    {fields.slice(2).map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                          {f.label}{f.required && <span className="text-[#BE123C] ml-0.5">*</span>}
                        </label>
                        <div className="relative">
                          <f.icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          <input type={f.type} placeholder={f.placeholder}
                            value={formData[f.name as keyof typeof formData]}
                            onChange={e => setField(f.name, e.target.value)}
                            className={(fieldErrors[f.name] ? inputErrCls : inputCls) + ' pl-10'} />
                        </div>
                        {fieldErrors[f.name] && (
                          <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors[f.name]}</p>
                        )}
                      </div>
                    ))}

                    {/* Resume upload */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                        Resume <span className="text-[#BE123C]">*</span>
                      </label>
                      <label className="flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all text-sm font-medium"
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

                    {/* About yourself */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                        <span className="flex items-center gap-1.5"><MessageSquare size={13} className="text-gray-400" /> Tell us about yourself</span>
                      </label>
                      <textarea rows={3} placeholder="Briefly describe your background, goals, and what kind of role you're looking for…"
                        value={formData.statement}
                        onChange={e => setFormData(p => ({ ...p, statement: e.target.value }))}
                        className={inputCls + ' resize-none'} />
                    </div>

                    {/* CAPTCHA */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                        <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-gray-400" /> Quick Check: {captcha.a} + {captcha.b} = ?<span className="text-[#BE123C] ml-0.5">*</span></span>
                      </label>
                      <input type="number" placeholder="Answer" value={captchaAnswer}
                        onChange={e => { setCaptchaAnswer(e.target.value); setFieldErrors(p => ({ ...p, captcha: '' })); }}
                        className={fieldErrors.captcha ? inputErrCls : inputCls} />
                      {fieldErrors.captcha && (
                        <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors.captcha}</p>
                      )}
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                        style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
                        {error}
                      </div>
                    )}

                    <button type="submit" disabled={loading}
                      className="inline-flex items-center justify-center gap-2 w-full py-3.5 text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-sm"
                      style={{ background: 'linear-gradient(135deg,#9F1239,#BE123C,#E11D48)', boxShadow: '0 4px 14px rgba(190,18,60,0.30)' }}>
                      {loading ? (
                        <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Submitting…</span></>
                      ) : (
                        <><span>Submit Profile</span><Send size={15} /></>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
