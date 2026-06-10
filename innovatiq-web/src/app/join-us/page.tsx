'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import { Send } from 'lucide-react';

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', skills: '', experience: '', statement: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captcha] = useState({
    a: Math.floor(Math.random() * 10) + 1,
    b: Math.floor(Math.random() * 10) + 1,
  });
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!resume) { setError('Please upload your resume.'); return; }
    if (parseInt(captchaAnswer) !== captcha.a + captcha.b) {
      setError('Incorrect CAPTCHA.'); return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      fd.append('resumefile', resume);
      const res = await fetch('/api/job-applications/submit-profile', { method: 'POST', body: fd });
      if (res.ok) setSubmitted(true);
      else setError('Failed to submit. Please try again.');
    } catch {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        badge="Future Opportunities"
        title="Submit Your Profile"
        subtitle="No current openings that match your skills? Join our talent pool and be first in line when the right opportunity arises."
      />

      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 border border-gray-100"
              style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Profile Submitted!</h3>
                  <p className="text-gray-500">
                    Thank you! We&apos;ll keep your profile on file and reach out when a suitable opportunity arises.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
                    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
                    { name: 'email', label: 'Email Address', type: 'email', required: true },
                    { name: 'skills', label: 'Key Skills', type: 'text', required: true },
                    { name: 'experience', label: 'Years of Experience', type: 'text', required: false },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {f.label} {f.required ? '*' : ''}
                      </label>
                      <input
                        type={f.type}
                        required={f.required}
                        value={formData[f.name as keyof typeof formData]}
                        onChange={e => setFormData(p => ({ ...p, [f.name]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1D4ED8] transition-colors"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Resume *</label>
                    <input type="file" accept=".pdf,.doc,.docx" required
                      onChange={e => setResume(e.target.files?.[0] || null)}
                      className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-[#1D4ED8]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tell us about yourself</label>
                    <textarea rows={3} value={formData.statement}
                      onChange={e => setFormData(p => ({ ...p, statement: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1D4ED8] resize-none transition-colors" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      CAPTCHA: {captcha.a} + {captcha.b} = ? *
                    </label>
                    <input type="number" required value={captchaAnswer}
                      onChange={e => setCaptchaAnswer(e.target.value)}
                      className="w-28 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#1D4ED8]" />
                  </div>

                  {error && <p className="text-red-500 text-sm p-3 bg-red-50 rounded-xl">{error}</p>}

                  <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#1D4ED8] text-white font-semibold rounded-xl hover:bg-[#1E40AF] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? 'Submitting...' : 'Submit Profile'} <Send size={16} />
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
