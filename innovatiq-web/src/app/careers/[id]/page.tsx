'use client';

import { useState, useEffect } from 'react';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import { MapPin, Briefcase, Clock, ChevronRight, Building } from 'lucide-react';
import Link from 'next/link';

interface JobData {
  _id: string;
  jobTitle: string;
  companyName: string;
  primarySkills: string;
  location: string;
  experience: string;
  employmentType: string;
  jobDescription?: string;
  responsibilities?: string;
  requirements?: string;
  benefits?: string;
  salary?: string;
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', portfolioLink: '', statement: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, answer: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ a, b, answer: '' });

    // Fetch job
    fetch(`/api/careers/${params.id}`)
      .then(r => r.json())
      .then(d => setJob(d?.career || d?.data || d))
      .catch(() => setJob({
        _id: params.id,
        jobTitle: 'Senior Cloud Architect',
        companyName: 'Innovatiq Technologies',
        primarySkills: 'AWS, Azure, Terraform, Kubernetes',
        location: 'Singapore',
        experience: '8+ years',
        employmentType: 'Full-time',
        jobDescription: 'We are looking for an experienced Senior Cloud Architect to join our growing team in Singapore. You will be responsible for designing and implementing cloud infrastructure solutions for our enterprise clients across the Asia Pacific region.',
        responsibilities: 'Design scalable cloud architectures\nLead cloud migration projects\nMentor junior team members\nWork closely with clients to understand requirements',
        requirements: 'AWS/Azure Solutions Architect certification\n8+ years of hands-on cloud experience\nStrong communication skills\nExperience with enterprise clients',
        benefits: 'Competitive salary package\nHealth & dental insurance\nGenerous training and certification budget\nFlexible working arrangements',
      }))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!resume) { setError('Please upload your resume.'); return; }
    if (parseInt(captcha.answer) !== captcha.a + captcha.b) {
      setError('Incorrect CAPTCHA answer.'); return;
    }

    const fd = new FormData();
    fd.append('name', formData.fullName);
    fd.append('phone', formData.phone);
    fd.append('email', formData.email);
    fd.append('resume', resume);
    fd.append('coverLetter', formData.statement);

    try {
      const res = await fetch(`/api/job-applications/${params.id}/apply`, { method: 'POST', body: fd });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to submit application. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A1628' }}>
        <div className="w-12 h-12 border-4 border-[#D4174A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Job Not Found</h2>
          <Link href="/careers" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D4174A] text-white font-semibold rounded-xl hover:bg-[#A8102E] transition-all duration-200">View All Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        badge="Career Opportunity"
        title={job.jobTitle}
        subtitle={`${job.companyName} · ${job.location}`}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <AnimatedSection>
                <div className="flex flex-wrap gap-4 p-6 rounded-2xl border border-gray-100"
                  style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                  {[
                    { icon: <Building size={15} />, label: job.companyName },
                    { icon: <MapPin size={15} />, label: job.location },
                    { icon: <Briefcase size={15} />, label: job.experience },
                    { icon: <Clock size={15} />, label: job.employmentType },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="text-[#D4174A]">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Skills */}
              {job.primarySkills && (
                <AnimatedSection>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(job.primarySkills)
                      ? job.primarySkills
                      : job.primarySkills.split(',')
                    ).map((s: string) => (
                      <span key={s.trim()} className="px-3 py-1.5 rounded-full text-sm font-medium"
                        style={{ background: 'rgba(212,23,74,0.22)', color: '#D4174A' }}>
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Description */}
              {job.jobDescription && (
                <AnimatedSection>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Job Description</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.jobDescription}</p>
                </AnimatedSection>
              )}

              {/* Responsibilities */}
              {job.responsibilities && (
                <AnimatedSection>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.split('\n').filter(Boolean).map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-[#D4174A] mt-2 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              )}

              {/* Requirements */}
              {job.requirements && (
                <AnimatedSection>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.split('\n').filter(Boolean).map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-[#9B7522] mt-2 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              )}

              {/* Benefits */}
              {job.benefits && (
                <AnimatedSection>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">What We Offer</h3>
                  <ul className="space-y-2">
                    {job.benefits.split('\n').filter(Boolean).map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              )}
            </div>

            {/* Application Form */}
            <div className="lg:col-span-1">
              <AnimatedSection direction="right">
                <div className="sticky top-28 p-7 rounded-2xl border border-gray-100"
                  style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-4">🎉</div>
                      <h3 className="font-bold text-gray-900 text-xl mb-2">Application Submitted!</h3>
                      <p className="text-gray-500 text-sm mb-6">
                        Thank you for applying. We&apos;ll review your application and be in touch soon.
                      </p>
                      <Link href="/careers" className="inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 bg-[#D4174A] text-white font-semibold rounded-xl hover:bg-[#A8102E] transition-all duration-200">
                        View More Jobs
                      </Link>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-gray-900 text-xl mb-6">Apply for this Role</h3>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
                          { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
                          { name: 'email', label: 'Email Address', type: 'email', required: true },
                          { name: 'portfolioLink', label: 'Portfolio Link (optional)', type: 'url', required: false },
                        ].map(field => (
                          <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                            <input
                              type={field.type}
                              required={field.required}
                              value={formData[field.name as keyof typeof formData]}
                              onChange={e => setFormData(p => ({ ...p, [field.name]: e.target.value }))}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#D4174A] transition-colors"
                            />
                          </div>
                        ))}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Resume *</label>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={e => setResume(e.target.files?.[0] || null)}
                            className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-[#D4174A] hover:file:bg-red-100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Why should we hire you?</label>
                          <textarea
                            rows={3}
                            value={formData.statement}
                            onChange={e => setFormData(p => ({ ...p, statement: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#D4174A] resize-none transition-colors"
                          />
                        </div>

                        {/* Captcha */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Verify: {captcha.a} + {captcha.b} = ?
                          </label>
                          <input
                            type="number"
                            required
                            value={captcha.answer}
                            onChange={e => setCaptcha(p => ({ ...p, answer: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#D4174A]"
                          />
                        </div>

                        {error && (
                          <p className="text-red-500 text-xs p-3 bg-red-50 rounded-lg">{error}</p>
                        )}

                        <button type="submit" className="inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 bg-[#D4174A] text-white font-semibold rounded-xl hover:bg-[#A8102E] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
                          Submit Application <ChevronRight size={16} />
                        </button>
                      </form>
                    </>
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
