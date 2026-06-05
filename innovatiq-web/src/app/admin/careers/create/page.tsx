'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API, authHeaders } from '@/lib/adminApi';
import { ArrowLeft, Plus, X } from 'lucide-react';

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'];

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  borderRadius: '10px',
  padding: '10px 14px',
  outline: 'none',
  width: '100%',
  fontSize: '14px',
};

export default function CareerCreatePage() {
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [experience, setExperience] = useState('');
  const [employmentType, setEmploymentType] = useState(EMPLOYMENT_TYPES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addSkill = () => {
    const newSkills = skillInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !skills.includes(s));
    if (newSkills.length > 0) {
      setSkills([...skills, ...newSkills]);
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        jobTitle,
        companyName,
        location,
        shortDescription,
        description,
        primarySkills: skills.join(', '),
        experience,
        employmentType,
      };

      const res = await fetch(`${API}/careers`, {
        method: 'POST',
        headers: authHeaders() as Record<string, string>,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to create career');
      router.push('/admin/careers');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#07101E' }}>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/careers" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Create Career</h1>
          <p className="text-gray-400 text-sm mt-0.5">Add a new job posting</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className="rounded-2xl p-6 space-y-6"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.14)',
          }}
        >
          {error && (
            <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#EF4444' }}>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Job Title *</label>
              <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required
                placeholder="e.g. Senior React Developer" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Company Name *</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required
                placeholder="e.g. Innovatiq Technologies" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Location *</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required
                placeholder="e.g. Singapore" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Experience *</label>
              <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} required
                placeholder="e.g. 3+ years" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Employment Type *</label>
              <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t} style={{ background: '#0A1225' }}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Short Description *</label>
            <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required
              rows={3} placeholder="Brief job summary..."
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description (HTML) *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required
              rows={10} placeholder="<p>Detailed job description...</p>"
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Primary Skills</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {skills.map((skill) => (
                <span key={skill} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm text-gray-300"
                  style={{ background: 'rgba(212,23,74,0.15)', border: '1px solid rgba(212,23,74,0.3)' }}>
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="text-gray-400 hover:text-red-400">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                placeholder="Type a skill and press Enter"
                style={{ ...inputStyle, width: 'auto', flex: 1 }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4174A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
              <button type="button" onClick={addSkill}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 flex items-center gap-1.5"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading}
            className="px-8 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #D4174A, #A8102E)', boxShadow: '0 4px 15px rgba(212,23,74,0.3)' }}>
            {loading ? 'Creating...' : 'Create Career'}
          </button>
          <Link href="/admin/careers"
            className="px-6 py-3 rounded-xl text-sm font-medium text-gray-300"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
