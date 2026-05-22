'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const offices = [
  {
    flag: '🇸🇬',
    country: 'Singapore',
    role: 'Headquarters',
    address: '229 Mountbatten Rd, #01-11, Mountbatten Square, Singapore 398007',
    phone: '+(65) 674-20955',
    email: 'info@innovatiq.com.sg',
    color: '#D4174A',
  },
  {
    flag: '🇮🇳',
    country: 'India',
    role: 'Development Center',
    address: 'Level 1, Unit 2, Salarpuria Sattva Knowledge City, Inorbit Mall Road, Raidurg Village, Hytech City, Hyderabad',
    phone: '+91-9000534494',
    email: 'info@innovatiqconsulting.com',
    color: '#F59E0B',
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
      <section className="relative py-20 overflow-hidden" style={{ background: '#080F20' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(212,23,74,0.1) 0%, transparent 60%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Contract%20us%20hero%20section.svg" alt="" aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] max-h-[500px] w-auto opacity-[0.07] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Our{' '}
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">Offices</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-7">
            {offices.map((office, i) => (
              <AnimatedSection key={office.country} delay={i * 100}>
                <div className="relative p-7 rounded-2xl hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 4px 28px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${office.color}, transparent)` }} />
                  <div className="text-4xl mb-4">{office.flag}</div>
                  <div className="mb-4">
                    <h3 className="font-bold text-white text-lg">{office.country}</h3>
                    <p className="text-sm font-medium" style={{ color: office.color }}>{office.role}</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3 text-gray-400">
                      <MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: office.color }} />
                      <span className="leading-relaxed">{office.address}</span>
                    </div>
                    <div className="flex gap-3 text-gray-400">
                      <Phone size={15} className="flex-shrink-0" style={{ color: office.color }} />
                      <a href={`tel:${office.phone}`} className="hover:text-white transition-colors">{office.phone}</a>
                    </div>
                    <div className="flex gap-3 text-gray-400">
                      <Mail size={15} className="flex-shrink-0" style={{ color: office.color }} />
                      <a href={`mailto:${office.email}`} className="hover:text-white transition-colors break-all">{office.email}</a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#07101E' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(212,23,74,0.18) 0%, transparent 70%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/image%20192%20(1).svg" alt="" aria-hidden="true"
          className="absolute left-0 bottom-0 h-[60%] max-h-[360px] w-auto opacity-[0.05] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">
              Send Us a{' '}
              <span className="bg-gradient-to-r from-[#D4174A] via-[#FF4D7C] to-[#FF8C42] bg-clip-text text-transparent">Message</span>
            </h2>
            <p className="text-gray-500 mt-2">Fill out the form and our team will get back to you within 24 hours.</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #D4174A, #FF8C42, transparent)' }} />

              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">
                    Thank you for reaching out. Our team will contact you within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { name: 'firstName', label: 'First Name', type: 'text' },
                      { name: 'lastName', label: 'Last Name', type: 'text' },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">{f.label} *</label>
                        <input type={f.type} required
                          value={formData[f.name as keyof typeof formData]}
                          onChange={e => setFormData(p => ({ ...p, [f.name]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-colors"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                          onFocus={e => e.target.style.borderColor = '#D4174A'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { name: 'phone', label: 'Phone Number', type: 'tel' },
                      { name: 'email', label: 'Email Address', type: 'email' },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">{f.label} *</label>
                        <input type={f.type} required
                          value={formData[f.name as keyof typeof formData]}
                          onChange={e => setFormData(p => ({ ...p, [f.name]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-colors"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                          onFocus={e => e.target.style.borderColor = '#D4174A'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Your Location *</label>
                    <input type="text" required placeholder="City, Country"
                      value={formData.location}
                      onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-colors placeholder-gray-600"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={e => e.target.style.borderColor = '#D4174A'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">What are you looking for? *</label>
                    <select required value={formData.lookingFor}
                      onChange={e => setFormData(p => ({ ...p, lookingFor: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-colors"
                      style={{ background: 'rgba(20,30,50,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <option value="" style={{ background: '#0A1225' }}>Select a service or product...</option>
                      {lookingForOptions.map(opt => (
                        <option key={opt} value={opt} style={{ background: '#0A1225' }}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Tell us more *</label>
                    <textarea required rows={4} placeholder="Describe your project, challenge, or inquiry..."
                      value={formData.description}
                      onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none transition-colors placeholder-gray-600"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={e => e.target.style.borderColor = '#D4174A'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Security Check: What is {captcha.a} + {captcha.b}? *
                    </label>
                    <input type="number" required
                      value={captcha.answer}
                      onChange={e => setCaptcha(p => ({ ...p, answer: e.target.value }))}
                      className="w-32 px-4 py-3 rounded-xl text-sm text-white outline-none transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={e => e.target.style.borderColor = '#D4174A'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm p-3 rounded-xl"
                      style={{ background: 'rgba(212,23,74,0.1)', border: '1px solid rgba(212,23,74,0.2)' }}>
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={loading}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 text-base text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 4px 16px rgba(212,23,74,0.4)' }}>
                    {loading ? 'Sending...' : 'Send Message'} <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
