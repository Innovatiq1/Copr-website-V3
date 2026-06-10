'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { API, authFetch, authHeaders } from '@/lib/adminApi';
import { ArrowLeft, Plus, X } from 'lucide-react';

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'];

const inputStyle: React.CSSProperties = {
  background: '#F8FAFC',
  border: '1px solid #E2E8F0',
  color: '#0F172A',
  borderRadius: '10px',
  padding: '10px 14px',
  outline: 'none',
  width: '100%',
  fontSize: '14px',
};

export default function CareerEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

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
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await authFetch(`${API}/careers/${id}`);
        const data = await res.json();
        const career = data?.career || data?.data || data;
        setJobTitle(career.jobTitle || career.title || '');
        setCompanyName(career.companyName || '');
        setLocation(career.location || '');
        setShortDescription(career.shortDescription || '');
        setDescription(career.description || '');
        const primarySkills = career.primarySkills || '';
        if (typeof primarySkills === 'string') {
          setSkills(primarySkills.split(',').map((s: string) => s.trim()).filter(Boolean));
        } else if (Array.isArray(primarySkills)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setSkills(primarySkills.map((s: any) => String(s).trim()).filter(Boolean));
        }
        setExperience(career.experience || career.experienceLevel || '');
        setEmploymentType(career.employmentType || EMPLOYMENT_TYPES[0]);
      } catch {
        setError('Failed to load career');
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchCareer();
  }, [id]);

  const addSkill = () => {
    const newSkills = skillInput.split(',').map((s) => s.trim()).filter((s) => s.length > 0 && !skills.includes(s));
    if (newSkills.length > 0) setSkills([...skills, ...newSkills]);
    setSkillInput('');
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { jobTitle, companyName, location, shortDescription, description, primarySkills: skills.join(', '), experience, employmentType };
      const res = await fetch(`${API}/careers/${id}`, {
        method: 'PUT',
        headers: authHeaders() as Record<string, string>,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to update career');
      router.push('/admin/careers');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#1D4ED8';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,23,74,0.1)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#E2E8F0';
    e.currentTarget.style.boxShadow = 'none';
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/careers" className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Career</h1>
          <p className="text-slate-500 text-sm mt-0.5">Update job posting</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="rounded-2xl p-6 space-y-6"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          {error && (
            <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', color: '#DC2626' }}>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Title *</label>
              <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name *</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Experience *</label>
              <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Employment Type *</label>
              <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}>
                {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Short Description *</label>
            <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required rows={3}
              style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusStyle} onBlur={blurStyle} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description (HTML) *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={10}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} onFocus={focusStyle} onBlur={blurStyle} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary Skills</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {skills.map((skill) => (
                <span key={skill} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm text-slate-700"
                  style={{ background: 'rgba(212,23,74,0.08)', border: '1px solid rgba(212,23,74,0.2)' }}>
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                placeholder="Type a skill and press Enter"
                style={{ ...inputStyle, width: 'auto', flex: 1 }} onFocus={focusStyle} onBlur={blurStyle} />
              <button type="button" onClick={addSkill}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 flex items-center gap-1.5 hover:bg-slate-100 transition-all cursor-pointer"
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading}
            className="px-8 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #1E40AF 100%)', boxShadow: '0 4px 15px rgba(14,165,233,0.30)' }}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/careers"
            className="px-6 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
