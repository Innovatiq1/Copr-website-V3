'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const offices = [
  {
    flag: '🇸🇬',
    country: 'Singapore',
    role: 'Headquarters',
    address: '60, Paya Lebar Road, #04-44, Paya Lebar Square, Singapore 409051',
    phone: '(+65) 6742 0955',
    email: 'info@innovatiq.com.sg',
    color: '#BE123C',
    phoneNote: '',
    emailNote: '',
  },
  {
    flag: '🇮🇳',
    country: 'India',
    role: 'Development Center',
    address: 'Level 1, Unit 2, Salarpuria Sattva Knowledge City, Inorbit Mall Road, Raidurg Village, HITEC City, Hyderabad',
    phone: '+91 90005 34494',
    email: 'info@innovatiqconsulting.com',
    color: '#BE123C',
    phoneNote: '',
    emailNote: '',
  },
  {
    flag: '🇲🇾',
    country: 'Malaysia',
    role: 'Regional Office',
    address: 'Office 41, Level 1, Resource Centre - IIC Technology Park Malaysia, Bukit Jalil, KL 57000',
    phone: '',
    email: 'info@innovatiq.com.sg',
    color: '#BE123C',
    phoneNote: 'Contact via email',
    emailNote: 'Malaysia enquiries handled by Singapore HQ',
  },
];

const lookingForOptions = [
  'Cloud Services', 'Cyber Security', 'IT Consulting', 'Digital Transformation',
  'Managed IT Services', 'Advanced Infrastructure', 'Field Services',
  'SkillEra (TMS)', 'LearnPro (LMS)', 'SecurOn (PMS)', 'Learning Motivational Platform',
  'AI-ATS', 'Sales CRM',
  'Other',
];

const inputStyle = {
  background: '#F8FAFC',
  border: '1px solid rgba(0,0,0,0.10)',
  color: '#0F172A',
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    location: '', lookingFor: '', description: '',
  });
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, answer: '' });

  useEffect(() => {
    setCaptcha({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1,
      answer: '',
    });
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const setField = (name: string, value: string) => {
    setFormData(p => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required.';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.email.trim()) errs.email = 'Email address is required.';
    if (!formData.location.trim()) errs.location = 'Location is required.';
    if (!formData.lookingFor) errs.lookingFor = 'Please select an option.';
    if (!formData.description.trim()) errs.description = 'Please tell us more.';
    if (!captcha.answer.trim() || parseInt(captcha.answer) !== captcha.a + captcha.b) errs.captcha = 'Incorrect answer.';

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          lookingFor: formData.lookingFor,
          message: formData.description,
        }),
      });
      if (res.ok) setSubmitted(true);
      else setError('Something went wrong. Please try again.');
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        badge="Get in Touch"
        title="Let's Start a Conversation"
        subtitle="Whether you have a specific project in mind or want to explore how Innovatiq can help, we'd love to hear from you."
      />

      {/* Contact Form */}
      <section className="relative pt-8 pb-20 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(190,18,60,0.04) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Section Info and Premium Structured Channels */}
            <div className="lg:col-span-5 space-y-6">
              <AnimatedSection>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-[#BE123C] uppercase tracking-widest bg-white border-[1.5px] border-blue-400/60 shadow-[0_2px_10px_rgba(190,18,60,0.12)] px-4 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BE123C]" />
                  Get in Touch
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-none mb-4">
                  Let's Build<br/>
                  Something{' '}
                  <span className="bg-gradient-to-r from-[#BE123C] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">Great</span>
                </h2>
                <p className="text-[#1a1a1a] font-medium text-[17px] leading-relaxed max-w-sm">
                  Have a question or a project in mind? Complete the form and our team will respond within 1 business day.
                </p>
              </AnimatedSection>

              {/* Direct Contact Channels */}
              <div className="space-y-4">
                {[
                  { label: 'Singapore & Malaysia HQ', email: 'info@innovatiq.com.sg', desc: 'General & regional enquiries', color: '#BE123C', bg: 'rgba(190,18,60,0.06)', border: 'rgba(190,18,60,0.18)' },
                  { label: 'India Development Center', email: 'info@innovatiqconsulting.com', desc: 'Development & general consulting', color: '#0891B2', bg: 'rgba(8,145,178,0.06)', border: 'rgba(8,145,178,0.18)' },
                ].map(channel => (
                  <AnimatedSection key={channel.label}>
                    <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex gap-4 items-center group"
                      style={{ 
                        background: '#FFFFFF', 
                        borderColor: 'rgba(0,0,0,0.08)',
                        borderLeft: `4px solid ${channel.color}`
                      }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                        style={{ background: channel.bg, border: `1.5px solid ${channel.border}` }}>
                        <Mail size={20} style={{ color: channel.color }} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <p className="text-[12px] font-extrabold uppercase tracking-widest" style={{ color: channel.color }}>{channel.label}</p>
                        <a href={`mailto:${channel.email}`} className="block text-[16px] font-bold text-slate-800 hover:text-[#BE123C] transition-colors">{channel.email}</a>
                        <p className="text-[13px] text-slate-600 font-medium">{channel.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Premium Photo banner */}
              <AnimatedSection className="relative rounded-2xl overflow-hidden h-44 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] shrink-0">
                <Image
                  src="/images/contact_photo_premium.png"
                  alt="Innovatiq support workspace"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="brightness-95 hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={65}
                  priority
                />
              </AnimatedSection>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <div className="rounded-2xl p-8"
                  style={{
                    background: 'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, #BE123C 0%, #BE123C 15%, #FF4D7C 38%, #FF8C42 62%, transparent 85%) border-box',
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopWidth: '4px',
                    borderLeftWidth: '0',
                    borderRightWidth: '0',
                    borderBottomWidth: '0',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                  }}>

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">✅</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                      <p className="text-[#1a1a1a] font-medium max-w-sm mx-auto">
                        Thank you for reaching out. Our team will contact you within 1 business day.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="grid sm:grid-cols-2 gap-5">
                        {[
                          { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John' },
                          { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe' },
                        ].map(f => (
                          <div key={f.name}>
                            <label className="block text-[16px] font-semibold text-gray-800 mb-1.5">{f.label} *</label>
                            <input type={f.type} placeholder={f.placeholder}
                              value={formData[f.name as keyof typeof formData]}
                              onChange={setField.bind(null, f.name)}
                              className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-colors placeholder-slate-400"
                              style={{ ...inputStyle, ...(fieldErrors[f.name] && { border: '1px solid #EF4444', background: '#FFF8F8' }) }}
                              onFocus={e => (e.target.style.borderColor = fieldErrors[f.name] ? '#EF4444' : '#BE123C')}
                              onBlur={e => (e.target.style.borderColor = fieldErrors[f.name] ? '#EF4444' : 'rgba(0,0,0,0.10)')}
                            />
                            {fieldErrors[f.name] && <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors[f.name]}</p>}
                          </div>
                        ))}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        {[
                          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+65 6000 0000' },
                          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                        ].map(f => (
                          <div key={f.name}>
                            <label className="block text-[16px] font-semibold text-gray-800 mb-1.5">{f.label} *</label>
                            <input type={f.type} placeholder={f.placeholder}
                              value={formData[f.name as keyof typeof formData]}
                              onChange={setField.bind(null, f.name)}
                              className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-colors placeholder-slate-400"
                              style={{ ...inputStyle, ...(fieldErrors[f.name] && { border: '1px solid #EF4444', background: '#FFF8F8' }) }}
                              onFocus={e => (e.target.style.borderColor = fieldErrors[f.name] ? '#EF4444' : '#BE123C')}
                              onBlur={e => (e.target.style.borderColor = fieldErrors[f.name] ? '#EF4444' : 'rgba(0,0,0,0.10)')}
                            />
                            {fieldErrors[f.name] && <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors[f.name]}</p>}
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block text-[16px] font-semibold text-gray-800 mb-1.5">Your Location *</label>
                        <input type="text" placeholder="City, Country"
                          value={formData.location}
                          onChange={e => setField('location', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-colors placeholder-slate-400"
                          style={{ ...inputStyle, ...(fieldErrors.location && { border: '1px solid #EF4444', background: '#FFF8F8' }) }}
                          onFocus={e => (e.target.style.borderColor = fieldErrors.location ? '#EF4444' : '#BE123C')}
                          onBlur={e => (e.target.style.borderColor = fieldErrors.location ? '#EF4444' : 'rgba(0,0,0,0.10)')}
                        />
                        {fieldErrors.location && <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors.location}</p>}
                      </div>

                      <div>
                        <label className="block text-[16px] font-semibold text-gray-800 mb-1.5">What are you looking for? *</label>
                        <select value={formData.lookingFor}
                          onChange={e => { setFormData(p => ({ ...p, lookingFor: e.target.value })); setFieldErrors(p => ({ ...p, lookingFor: '' })); }}
                          className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-colors text-[#1a1a1a]"
                          style={{ background: fieldErrors.lookingFor ? '#FFF8F8' : '#F8FAFC', border: fieldErrors.lookingFor ? '1px solid #EF4444' : '1px solid rgba(0,0,0,0.10)' }}>
                          <option value="">Select a service or product...</option>
                          {lookingForOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {fieldErrors.lookingFor && <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors.lookingFor}</p>}
                      </div>

                      <div>
                        <label className="block text-[16px] font-semibold text-gray-800 mb-1.5">Tell us more *</label>
                        <textarea rows={4} placeholder="Describe your project, challenge, or inquiry..."
                          value={formData.description}
                          onChange={e => setField('description', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-[15px] outline-none resize-none transition-colors placeholder-slate-400"
                          style={{ ...inputStyle, ...(fieldErrors.description && { border: '1px solid #EF4444', background: '#FFF8F8' }) }}
                          onFocus={e => (e.target.style.borderColor = fieldErrors.description ? '#EF4444' : '#BE123C')}
                          onBlur={e => (e.target.style.borderColor = fieldErrors.description ? '#EF4444' : 'rgba(0,0,0,0.10)')}
                        />
                        {fieldErrors.description && <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors.description}</p>}
                      </div>

                      <div>
                        <label className="block text-[16px] font-semibold text-gray-800 mb-1.5">
                          Security Check: What is {captcha.a} + {captcha.b}? *
                        </label>
                        <input type="number"
                          value={captcha.answer}
                          onChange={e => { setCaptcha(p => ({ ...p, answer: e.target.value })); setFieldErrors(p => ({ ...p, captcha: '' })); }}
                          className="w-32 px-4 py-3 rounded-xl text-[15px] outline-none transition-colors"
                          style={{ ...inputStyle, ...(fieldErrors.captcha && { border: '1px solid #EF4444', background: '#FFF8F8' }) }}
                          onFocus={e => (e.target.style.borderColor = fieldErrors.captcha ? '#EF4444' : '#BE123C')}
                          onBlur={e => (e.target.style.borderColor = fieldErrors.captcha ? '#EF4444' : 'rgba(0,0,0,0.10)')}
                        />
                        {fieldErrors.captcha && <p className="text-xs mt-1 font-medium" style={{ color: '#EF4444' }}>{fieldErrors.captcha}</p>}
                      </div>

                      {error && (
                        <p className="text-[#BE123C] text-sm p-3 rounded-xl"
                          style={{ background: 'rgba(190,18,60,0.06)', border: '1px solid rgba(190,18,60,0.15)' }}>
                          {error}
                        </p>
                      )}

                      <button type="submit" disabled={loading}
                        className="inline-flex items-center justify-center gap-2 w-full py-3.5 text-base text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 16px rgba(190,18,60,0.30)' }}>
                        {loading ? 'Sending...' : 'Send Message'} <Send size={16} />
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(190,18,60,0.05) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#BE123C] uppercase tracking-widest bg-white border-[1.5px] border-blue-400/60 shadow-[0_2px_10px_rgba(190,18,60,0.12)] px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BE123C]" />
              Where to Find Us
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              Our{' '}
              <span className="bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] bg-clip-text text-transparent">Offices</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-6">
            {offices.map((office, i) => (
              <AnimatedSection key={office.country} delay={i * 100}>
                <div className="p-8 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between group"
                  style={{
                    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${office.color} 0%, ${office.color} 20%, ${office.color}CC 45%, ${office.color}55 70%, transparent 90%) border-box`,
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopWidth: '4px',
                    borderLeftWidth: '0',
                    borderRightWidth: '0',
                    borderBottomWidth: '0',
                    borderRadius: '16px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                  }}>
                  <div>
                    {/* Header: Badge & Country Info */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <h3 className="font-bold text-gray-900 text-[22px] tracking-tight leading-none">{office.country}</h3>
                        <span className="inline-block text-[12px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(190,18,60,0.08)', color: office.color }}>
                          {office.role}
                        </span>
                      </div>
                      
                      {/* Flag / Country Code badge */}
                      <span className="font-mono text-sm font-black px-2.5 py-1 rounded-lg shrink-0 border uppercase tracking-wider"
                        style={{ background: 'rgba(190,18,60,0.04)', color: office.color, borderColor: 'rgba(190,18,60,0.15)' }}>
                        {office.flag}
                      </span>
                    </div>

                    {/* Content / Details */}
                    <div className="space-y-4 text-[15px]">
                      {/* Address */}
                      <div className="flex gap-3 text-[#1a1a1a] font-semibold">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(190,18,60,0.04)', border: '1px solid rgba(190,18,60,0.1)' }}>
                          <MapPin size={14} style={{ color: office.color }} />
                        </div>
                        <span className="leading-relaxed text-[14.5px]">{office.address}</span>
                      </div>

                      {/* Phone */}
                      {office.phone ? (
                        <div className="flex gap-3 text-[#1a1a1a] font-semibold items-center">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: 'rgba(190,18,60,0.04)', border: '1px solid rgba(190,18,60,0.1)' }}>
                            <Phone size={14} style={{ color: office.color }} />
                          </div>
                          <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-[14.5px] hover:text-[#BE123C] transition-colors">{office.phone}</a>
                        </div>
                      ) : office.phoneNote ? (
                        <div className="flex gap-3 text-slate-400 font-semibold items-center">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-slate-50 border border-slate-100">
                            <Phone size={14} className="text-slate-400" />
                          </div>
                          <span className="italic text-xs">{office.phoneNote}</span>
                        </div>
                      ) : null}

                      {/* Email */}
                      <div className="flex gap-3 text-[#1a1a1a] font-semibold">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: 'rgba(190,18,60,0.04)', border: '1px solid rgba(190,18,60,0.1)' }}>
                          <Mail size={14} style={{ color: office.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <a href={`mailto:${office.email}`} className="text-[14.5px] hover:text-[#BE123C] transition-colors break-all leading-relaxed block">{office.email}</a>
                          {office.emailNote && (
                            <p className="text-[12px] text-slate-400 italic mt-1 leading-snug">{office.emailNote}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
