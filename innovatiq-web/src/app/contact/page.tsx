'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const offices = [
  {
    flag: '🇸🇬',
    country: 'Singapore',
    role: 'Headquarters',
    address: '60, Paya Lebar Road, #04-44, Paya Lebar Square, Singapore - 409051',
    phone: '+(65) 674-20955',
    email: 'info@innovatiq.com.sg',
    color: '#1D4ED8',
  },
  {
    flag: '🇮🇳',
    country: 'India',
    role: 'Development Center',
    address: 'Level 1, Unit 2, Salarpuria Sattva Knowledge City, Inorbit Mall Road, Raidurg Village, Hytech City, Hyderabad',
    phone: '+91-9000534494',
    email: 'info@innovatiqconsulting.com',
    color: '#0891B2',
  },
  {
    flag: '🇲🇾',
    country: 'Malaysia',
    role: 'Regional Office',
    address: 'Office 41, Level 1, Resource Centre - IIC Technology Park Malaysia, Bukit Jalil, KL 57000',
    phone: '+(65) 674-20955',
    email: 'info@innovatiq.com.sg',
    color: '#3B82F6',
  },
];

const lookingForOptions = [
  'Cloud Services', 'Cyber Security', 'IT Consulting', 'Digital Transformation',
  'Managed IT Services', 'Advanced Infrastructure', 'Field Services',
  'SkillEra (TMS)', 'LearnPro (LMS)', 'SecurOn (PMS)', 'Learning Motivational Platform',
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
  const [captcha, setCaptcha] = useState({
    a: Math.floor(Math.random() * 10) + 1,
    b: Math.floor(Math.random() * 10) + 1,
    answer: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (parseInt(captcha.answer) !== captcha.a + captcha.b) {
      setError('Incorrect CAPTCHA answer.');
      return;
    }
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

      {/* Office Locations */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(29,78,216,0.05) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#1D4ED8] uppercase tracking-widest bg-[#1D4ED8]/8 border border-[#1D4ED8]/15 px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
              Where to Find Us
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              Our{' '}
              <span className="bg-gradient-to-r from-[#1E40AF] via-[#1D4ED8] to-[#2563EB] bg-clip-text text-transparent">Offices</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-6">
            {offices.map((office, i) => (
              <AnimatedSection key={office.country} delay={i * 100}>
                <div className="p-7 hover:-translate-y-1 transition-all duration-300 h-full"
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
                  <div className="text-4xl mb-4">{office.flag}</div>
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">{office.country}</h3>
                    <p className="text-sm font-medium" style={{ color: office.color }}>{office.role}</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3 text-slate-600 font-medium">
                      <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: office.color }} />
                      <span className="leading-relaxed">{office.address}</span>
                    </div>
                    <div className="flex gap-3 text-slate-600 font-medium">
                      <Phone size={15} className="shrink-0" style={{ color: office.color }} />
                      <a href={`tel:${office.phone}`} className="hover:text-gray-900 transition-colors">{office.phone}</a>
                    </div>
                    <div className="flex gap-3 text-slate-600 font-medium">
                      <Mail size={15} className="shrink-0" style={{ color: office.color }} />
                      <a href={`mailto:${office.email}`} className="hover:text-gray-900 transition-colors break-all">{office.email}</a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.04) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Section Info and Premium Structured Channels */}
            <div className="lg:col-span-5 space-y-6">
              <AnimatedSection>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-[#1D4ED8] uppercase tracking-widest bg-[#1D4ED8]/8 border border-[#1D4ED8]/15 px-4 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                  Get in Touch
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-none mb-4">
                  Let's Build<br/>
                  Something{' '}
                  <span className="bg-gradient-to-r from-[#1D4ED8] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">Great</span>
                </h2>
                <p className="text-slate-600 font-medium text-sm leading-relaxed max-w-sm">
                  Have a question or a project in mind? Complete the form and our expert team will respond within 24 business hours.
                </p>
              </AnimatedSection>

              {/* Direct Contact Channels */}
              <div className="space-y-4">
                {[
                  { label: 'Singapore & Malaysia HQ', email: 'info@innovatiq.com.sg', desc: 'General & regional inquiries', color: '#1D4ED8', bg: 'rgba(29,78,216,0.04)', border: 'rgba(29,78,216,0.1)' },
                  { label: 'India Development Center', email: 'info@innovatiqconsulting.com', desc: 'Development & general consulting', color: '#0891B2', bg: 'rgba(8,145,178,0.04)', border: 'rgba(8,145,178,0.1)' },
                ].map(channel => (
                  <AnimatedSection key={channel.label}>
                    <div className="p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between"
                      style={{ background: '#FFFFFF', borderColor: 'rgba(0,0,0,0.06)' }}>
                      <div className="space-y-0.5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{channel.label}</p>
                        <a href={`mailto:${channel.email}`} className="text-sm font-bold text-slate-800 hover:text-[#1D4ED8] transition-colors">{channel.email}</a>
                        <p className="text-[11px] text-slate-500 font-medium">{channel.desc}</p>
                      </div>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: channel.bg, border: `1px solid ${channel.border}` }}>
                        <span style={{ color: channel.color, fontSize: '12px' }}>✉</span>
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
                />
              </AnimatedSection>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <div className="rounded-2xl p-8"
                  style={{
                    background: 'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, #1D4ED8 0%, #1D4ED8 15%, #FF4D7C 38%, #FF8C42 62%, transparent 85%) border-box',
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
                      <p className="text-slate-600 font-medium max-w-sm mx-auto">
                        Thank you for reaching out. Our team will contact you within 24 business hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        {[
                          { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John' },
                          { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe' },
                        ].map(f => (
                          <div key={f.name}>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">{f.label} *</label>
                            <input type={f.type} required placeholder={f.placeholder}
                              value={formData[f.name as keyof typeof formData]}
                              onChange={e => setFormData(p => ({ ...p, [f.name]: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors placeholder-slate-400"
                              style={inputStyle}
                              onFocus={e => e.target.style.borderColor = '#1D4ED8'}
                              onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.10)'}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        {[
                          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+65 6000 0000' },
                          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                        ].map(f => (
                          <div key={f.name}>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">{f.label} *</label>
                            <input type={f.type} required placeholder={f.placeholder}
                              value={formData[f.name as keyof typeof formData]}
                              onChange={e => setFormData(p => ({ ...p, [f.name]: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors placeholder-slate-400"
                              style={inputStyle}
                              onFocus={e => e.target.style.borderColor = '#1D4ED8'}
                              onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.10)'}
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Your Location *</label>
                        <input type="text" required placeholder="City, Country"
                          value={formData.location}
                          onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors placeholder-slate-400"
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = '#1D4ED8'}
                          onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.10)'}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">What are you looking for? *</label>
                        <select required value={formData.lookingFor}
                          onChange={e => setFormData(p => ({ ...p, lookingFor: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors text-gray-700"
                          style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.10)' }}>
                          <option value="">Select a service or product...</option>
                          {lookingForOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Tell us more *</label>
                        <textarea required rows={4} placeholder="Describe your project, challenge, or inquiry..."
                          value={formData.description}
                          onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-colors placeholder-slate-400"
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = '#1D4ED8'}
                          onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.10)'}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                          Security Check: What is {captcha.a} + {captcha.b}? *
                        </label>
                        <input type="number" required
                          value={captcha.answer}
                          onChange={e => setCaptcha(p => ({ ...p, answer: e.target.value }))}
                          className="w-32 px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = '#1D4ED8'}
                          onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.10)'}
                        />
                      </div>

                      {error && (
                        <p className="text-[#1D4ED8] text-sm p-3 rounded-xl"
                          style={{ background: 'rgba(29,78,216,0.06)', border: '1px solid rgba(29,78,216,0.15)' }}>
                          {error}
                        </p>
                      )}

                      <button type="submit" disabled={loading}
                        className="inline-flex items-center justify-center gap-2 w-full py-3.5 text-base text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ background: 'linear-gradient(135deg, #1D4ED8, #A8102E)', boxShadow: '0 4px 16px rgba(29,78,216,0.30)' }}>
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
    </>
  );
}
