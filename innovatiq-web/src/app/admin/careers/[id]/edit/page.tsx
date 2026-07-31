'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { API, authFetch, authHeaders } from '@/lib/adminApi';
import { ArrowLeft, Plus, X, Loader2, ChevronDown, RotateCcw, RotateCw, Type, Code, Eye, Link2 } from 'lucide-react';
import { toast } from '@/lib/toast';

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'];

type DescMode = 'visual' | 'write' | 'preview';

const VISUAL_TOOLBAR = [
  { cmd: 'undo', label: 'Undo', title: 'Undo (Ctrl+Z)', isUndo: true },
  { cmd: 'redo', label: 'Redo', title: 'Redo (Ctrl+Y)', isRedo: true },
  { cmd: 'formatBlock', val: '<p>', label: 'Normal', title: 'Paragraph' },
  { cmd: 'formatBlock', val: '<h2>', label: 'H2', title: 'Heading 2' },
  { cmd: 'formatBlock', val: '<h3>', label: 'H3', title: 'Heading 3' },
  { cmd: 'bold', label: 'B', title: 'Bold', bold: true },
  { cmd: 'italic', label: 'I', title: 'Italic', italic: true },
  { cmd: 'underline', label: 'U', title: 'Underline', underline: true },
  { cmd: 'insertUnorderedList', label: '• List', title: 'Bullet list' },
  { cmd: 'insertOrderedList', label: '1. List', title: 'Numbered list' },
  { cmd: 'createLink', label: 'Link', title: 'Insert link' },
];

const HTML_TOOLBAR = [
  { label: 'Undo', title: 'Undo (Ctrl+Z)', isUndo: true },
  { label: 'Redo', title: 'Redo (Ctrl+Y)', isRedo: true },
  { label: 'P', title: 'Paragraph', before: '<p>', after: '</p>' },
  { label: 'H2', title: 'Heading 2', before: '<h2>', after: '</h2>' },
  { label: 'H3', title: 'Heading 3', before: '<h3>', after: '</h3>' },
  { label: 'B', title: 'Bold', before: '<strong>', after: '</strong>', bold: true },
  { label: 'I', title: 'Italic', before: '<em>', after: '</em>', italic: true },
  { label: 'UL', title: 'Bullet list', before: '<ul>\n  <li>', after: '</li>\n</ul>' },
  { label: 'OL', title: 'Numbered list', before: '<ol>\n  <li>', after: '</li>\n</ol>' },
  { label: 'LI', title: 'List item', before: '<li>', after: '</li>' },
  { label: 'A', title: 'Link', isLink: true },
];

const PREVIEW_STYLES = `
  .hp p { margin-bottom: 0.85em; line-height: 1.7; color: #334155; }
  .hp h2 { font-size: 1.35rem; font-weight: 700; color: #0F172A; margin-top: 1.2em; margin-bottom: 0.5em; }
  .hp h3 { font-size: 1.15rem; font-weight: 600; color: #1E293B; margin-top: 1em; margin-bottom: 0.4em; }
  .hp ul { list-style-type: disc; padding-left: 1.4rem; margin-bottom: 0.85em; }
  .hp ol { list-style-type: decimal; padding-left: 1.4rem; margin-bottom: 0.85em; }
  .hp li { margin-bottom: 0.3em; line-height: 1.6; color: #334155; }
  .hp strong, .hp b { font-weight: 800; color: #0F172A; }
  .hp em, .hp i { font-style: italic; }
  .hp u { text-decoration: underline; text-underline-offset: 3px; }
  .hp a { color: #BE123C; text-decoration: underline; font-weight: 500; }
`;

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

function FormSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-xl animate-pulse" style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }} />
        <div className="space-y-2">
          <div className="h-6 w-28 rounded animate-pulse" style={{ background: '#EEF2F7' }} />
          <div className="h-3.5 w-32 rounded animate-pulse" style={{ background: '#EEF2F7' }} />
        </div>
      </div>
      <div className="rounded-2xl p-6 space-y-6" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3.5 w-20 rounded animate-pulse" style={{ background: '#EEF2F7' }} />
              <div className="h-10 rounded-xl animate-pulse" style={{ background: '#EEF2F7', width: '100%' }} />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-3.5 w-32 rounded animate-pulse" style={{ background: '#EEF2F7' }} />
          <div className="h-20 rounded-xl animate-pulse" style={{ background: '#EEF2F7' }} />
        </div>
        <div className="space-y-2">
          <div className="h-3.5 w-28 rounded animate-pulse" style={{ background: '#EEF2F7' }} />
          <div className="h-36 rounded-xl animate-pulse" style={{ background: '#EEF2F7' }} />
        </div>
        <div className="space-y-2">
          <div className="h-3.5 w-24 rounded animate-pulse" style={{ background: '#EEF2F7' }} />
          <div className="h-10 rounded-xl animate-pulse" style={{ background: '#EEF2F7' }} />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <div className="h-11 w-32 rounded-xl animate-pulse" style={{ background: '#EEF2F7' }} />
        <div className="h-11 w-20 rounded-xl animate-pulse" style={{ background: '#EEF2F7' }} />
      </div>
    </div>
  );
}

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

  // Description editor state
  const [descMode, setDescMode] = useState<DescMode>('visual');
  const [visualFocused, setVisualFocused] = useState(false);
  const modeRef = useRef<DescMode>('visual');
  const visualRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const savedCaretPosRef = useRef<{ start: number; end: number } | null>(null);

  // Link modal state
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const [linkText, setLinkText] = useState('');
  const [hasSelection, setHasSelection] = useState(false);

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
        toast.error('Failed to load career');
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchCareer();
  }, [id]);

  useEffect(() => {
    if (!fetching && descMode === 'visual' && visualRef.current) {
      visualRef.current.innerHTML = description;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descMode, fetching]);

  const captureVisual = () => {
    if (modeRef.current === 'visual' && visualRef.current) {
      const html = visualRef.current.innerHTML;
      setDescription(html);
      return html;
    }
    return description;
  };

  const changeMode = (newMode: DescMode) => {
    captureVisual();
    modeRef.current = newMode;
    setDescMode(newMode);
  };

  // History tracking for undo/redo
  const historyRef = useRef<string[]>(['']);
  const historyIdxRef = useRef<number>(0);
  const isUndoRedoRef = useRef<boolean>(false);

  const pushHistory = (val: string) => {
    if (isUndoRedoRef.current) return;
    if (historyRef.current[historyIdxRef.current] === val) return;
    historyRef.current = historyRef.current.slice(0, historyIdxRef.current + 1);
    historyRef.current.push(val);
    historyIdxRef.current = historyRef.current.length - 1;
  };

  const handleUndo = () => {
    if (descMode === 'visual') {
      document.execCommand('undo');
      const sel = window.getSelection();
      if (sel) sel.removeAllRanges();
    } else {
      if (historyIdxRef.current > 0) {
        historyIdxRef.current -= 1;
        isUndoRedoRef.current = true;
        const prev = historyRef.current[historyIdxRef.current];
        setDescription(prev);
        setTimeout(() => { isUndoRedoRef.current = false; }, 0);
      }
    }
  };

  const handleRedo = () => {
    if (descMode === 'visual') {
      document.execCommand('redo');
      const sel = window.getSelection();
      if (sel) sel.removeAllRanges();
    } else {
      if (historyIdxRef.current < historyRef.current.length - 1) {
        historyIdxRef.current += 1;
        isUndoRedoRef.current = true;
        const next = historyRef.current[historyIdxRef.current];
        setDescription(next);
        setTimeout(() => { isUndoRedoRef.current = false; }, 0);
      }
    }
  };

  const openLinkModal = () => {
    let selText = '';
    if (descMode === 'visual') {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (visualRef.current && visualRef.current.contains(range.commonAncestorContainer)) {
          savedRangeRef.current = range.cloneRange();
          if (!range.collapsed) {
            selText = sel.toString();
          }
        } else {
          savedRangeRef.current = null;
        }
      } else {
        savedRangeRef.current = null;
      }
    } else if (descMode === 'write') {
      const el = textareaRef.current;
      if (el) {
        savedCaretPosRef.current = { start: el.selectionStart, end: el.selectionEnd };
        const start = el.selectionStart;
        const end = el.selectionEnd;
        selText = description.slice(start, end);
      } else {
        selText = '';
      }
    }

    const isSel = selText.trim().length > 0;
    setHasSelection(isSel);
    setLinkText(selText);
    setLinkUrl('https://');
    setShowLinkModal(true);
  };

  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault();
    let url = linkUrl.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url) && !url.startsWith('/') && !url.startsWith('mailto:')) {
      url = 'https://' + url;
    }

    if (descMode === 'visual') {
      if (visualRef.current) {
        visualRef.current.focus();
        if (savedRangeRef.current) {
          const sel = window.getSelection();
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(savedRangeRef.current);
          }
        }
      }

      if (hasSelection && savedRangeRef.current && !savedRangeRef.current.collapsed) {
        document.execCommand('createLink', false, url);
      } else {
        const textToUse = linkText.trim() || url;
        const html = `<a href="${url}" target="_blank" rel="noopener noreferrer">${textToUse}</a>`;
        document.execCommand('insertHTML', false, html);
      }
    } else if (descMode === 'write') {
      const el = textareaRef.current;
      if (el && savedCaretPosRef.current) {
        const { start, end } = savedCaretPosRef.current;
        const textToUse = hasSelection ? description.slice(start, end) : (linkText.trim() || url);
        const html = `<a href="${url}">${textToUse}</a>`;
        const nextDesc = description.slice(0, start) + html + description.slice(end);
        setDescription(nextDesc);
        pushHistory(nextDesc);
        setTimeout(() => {
          el.focus();
          el.setSelectionRange(start + html.length, start + html.length);
        }, 0);
      } else {
        const textToUse = linkText.trim() || url;
        insertAtCursor(`<a href="${url}">${textToUse}</a>`, '');
      }
    }

    setShowLinkModal(false);
  };

  const execFormat = (cmd: string, val?: string) => {
    if (!visualRef.current) return;
    visualRef.current.focus();
    if (cmd === 'createLink') {
      openLinkModal();
    } else if (cmd === 'undo') {
      handleUndo();
    } else if (cmd === 'redo') {
      handleRedo();
    } else {
      document.execCommand(cmd, false, val);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const clipHtml = e.clipboardData.getData('text/html');
    if (clipHtml) {
      const doc = new DOMParser().parseFromString(clipHtml, 'text/html');
      doc.querySelectorAll('o\\:p, style, script, meta, link, xml').forEach(el => el.remove());

      doc.body.querySelectorAll('*').forEach(el => {
        const style = el.getAttribute('style') || '';
        const className = el.getAttribute('class') || '';
        const isBoldStyle = /font-weight\s*:\s*(bold|700|800|900)/i.test(style);
        const isMsoBold = /mso-bidi-font-weight\s*:\s*bold/i.test(style) || /MsoBold/i.test(className);
        const isBOrStrong = el.tagName === 'B' || el.tagName === 'STRONG';

        if ((isBoldStyle || isMsoBold || isBOrStrong) && el.tagName !== 'STRONG') {
          const strong = doc.createElement('strong');
          strong.innerHTML = el.innerHTML;
          el.replaceWith(strong);
        }
      });

      doc.body.querySelectorAll('*').forEach(el => {
        const style = el.getAttribute('style') || '';
        const isItalic = /font-style\s*:\s*italic/i.test(style);
        const isIOrEm = el.tagName === 'I' || el.tagName === 'EM';
        if ((isItalic || isIOrEm) && el.tagName !== 'EM') {
          const em = doc.createElement('em');
          em.innerHTML = el.innerHTML;
          el.replaceWith(em);
        }
      });

      doc.body.querySelectorAll('*').forEach(el => {
        const style = el.getAttribute('style') || '';
        const isUnderline = /text-decoration\s*:\s*underline/i.test(style);
        if ((isUnderline || el.tagName === 'U') && el.tagName !== 'U') {
          const u = doc.createElement('u');
          u.innerHTML = el.innerHTML;
          el.replaceWith(u);
        }
      });

      doc.body.querySelectorAll('*').forEach(el => {
        const className = el.getAttribute('class') || '';
        if (/MsoHeading1|MsoTitle/i.test(className)) {
          const h2 = doc.createElement('h2');
          h2.innerHTML = el.innerHTML;
          el.replaceWith(h2);
        } else if (/MsoHeading2|MsoHeading3/i.test(className)) {
          const h3 = doc.createElement('h3');
          h3.innerHTML = el.innerHTML;
          el.replaceWith(h3);
        }
      });

      doc.body.querySelectorAll('*').forEach(el => {
        el.removeAttribute('class');
        el.removeAttribute('style');
        el.removeAttribute('lang');
        el.removeAttribute('id');

        if (el.tagName === 'SPAN' && el.parentNode) {
          const frag = doc.createDocumentFragment();
          while (el.firstChild) {
            frag.appendChild(el.firstChild);
          }
          el.replaceWith(frag);
        }
      });

      document.execCommand('insertHTML', false, doc.body.innerHTML);
    } else {
      const text = e.clipboardData.getData('text/plain');
      if (text) {
        const html = text.split(/\n\n+/).filter(Boolean)
          .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
        document.execCommand('insertHTML', false, html || `<p>${text}</p>`);
      }
    }
  };

  const insertAtCursor = (before: string, after = '') => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart; const end = el.selectionEnd;
    const sel = description.slice(start, end);
    setDescription(description.slice(0, start) + before + sel + after + description.slice(end));
    setTimeout(() => { el.focus(); el.setSelectionRange(start + before.length, start + before.length + sel.length); }, 0);
  };

  const addSkill = () => {
    const newSkills = skillInput.split(',').map((s) => s.trim()).filter((s) => s.length > 0 && !skills.includes(s));
    if (newSkills.length > 0) setSkills([...skills, ...newSkills]);
    setSkillInput('');
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const finalDesc = captureVisual();
    if (!finalDesc.replace(/<[^>]*>/g, '').trim()) { toast.error('Description cannot be empty.'); return; }
    setLoading(true);
    try {
      const payload = { jobTitle, companyName, location, shortDescription, description: finalDesc, primarySkills: skills.join(', '), experience, employmentType };
      const res = await fetch(`${API}/careers/${id}`, {
        method: 'PUT',
        headers: authHeaders() as Record<string, string>,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to update career');
      toast.success('Updated successfully');
      router.push('/admin/careers');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#BE123C';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,23,74,0.1)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#E2E8F0';
    e.currentTarget.style.boxShadow = 'none';
  };

  const TABS: { key: DescMode; icon: React.ReactNode; label: string }[] = [
    { key: 'visual', icon: <Type size={11} />, label: 'Visual' },
    { key: 'write', icon: <Code size={11} />, label: 'HTML' },
    { key: 'preview', icon: <Eye size={11} />, label: 'Preview' },
  ];

  if (fetching) return <FormSkeleton />;

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/careers"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all cursor-pointer shrink-0"
          style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
          title="Back to careers"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F1F5F9';
            e.currentTarget.style.borderColor = '#94A3B8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F8FAFC';
            e.currentTarget.style.borderColor = '#CBD5E1';
          }}
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Career</h1>
          <p className="text-slate-500 text-sm mt-0.5">Update job posting</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="rounded-2xl p-6 space-y-6"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
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
              <div className="relative">
                <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} style={{ ...inputStyle, appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', paddingRight: '36px', cursor: 'pointer' }} onFocus={focusStyle} onBlur={blurStyle}>
                  {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700">Short Description *</label>
              <span className="text-xs font-semibold" style={{ color: shortDescription.length >= 200 ? '#BE123C' : '#94A3B8' }}>{shortDescription.length}/200</span>
            </div>
            <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value.slice(0, 200))} required rows={3}
              style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusStyle} onBlur={blurStyle} />
          </div>

          {/* Rich Description editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Description *</label>
              <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
                {TABS.map((tab, i) => (
                  <button key={tab.key} type="button" onClick={() => changeMode(tab.key)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold cursor-pointer transition-all"
                    style={{ borderLeft: i > 0 ? '1px solid #E2E8F0' : 'none', ...(descMode === tab.key ? { background: 'linear-gradient(135deg,#9F1239,#BE123C)', color: '#fff' } : { background: '#F8FAFC', color: '#64748B' }) }}>
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {descMode === 'visual' && (
              <>
                <style>{PREVIEW_STYLES}</style>
                <div style={{ border: `1.5px solid ${visualFocused ? '#BE123C' : '#E2E8F0'}`, borderRadius: '10px', overflow: 'hidden', boxShadow: visualFocused ? '0 0 0 3px rgba(190,18,60,0.09)' : 'none', transition: 'border-color .15s,box-shadow .15s' }}>
                  <div className="flex flex-wrap items-center gap-1.5 px-3 py-2"
                    style={{ background: '#F8FAFC', borderBottom: `1px solid ${visualFocused ? 'rgba(190,18,60,0.14)' : '#E2E8F0'}` }}>
                    {VISUAL_TOOLBAR.map((btn) => (
                      <button key={btn.cmd + btn.label} type="button" title={btn.title}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => execFormat(btn.cmd, btn.val)}
                        className="px-2.5 py-1 rounded-lg text-xs cursor-pointer hover:bg-slate-200 transition-colors inline-flex items-center gap-1"
                        style={{ background: '#EEF2F7', color: '#1E293B', border: '1px solid #E2E8F0', fontWeight: btn.bold ? 800 : 600, fontStyle: btn.italic ? 'italic' : 'normal', textDecoration: btn.underline ? 'underline' : 'none', fontFamily: ['B','I','U'].includes(btn.label) ? 'serif' : 'inherit' }}>
                        {btn.isUndo && <RotateCcw size={12} />}
                        {btn.isRedo && <RotateCw size={12} />}
                        {btn.label}
                      </button>
                    ))}
                    <span className="ml-auto text-xs font-semibold hidden sm:inline" style={{ color: '#475569' }}>Select text then click to format</span>
                  </div>
                  <div ref={visualRef} contentEditable suppressContentEditableWarning className="hp"
                    onFocus={() => setVisualFocused(true)}
                    onBlur={e => { setVisualFocused(false); setDescription(e.currentTarget.innerHTML); }}
                    onPaste={handlePaste}
                    onClick={e => { if ((e.target as HTMLElement).closest('a')) e.preventDefault(); }}
                    style={{ minHeight: '280px', outline: 'none', fontSize: '14px', padding: '18px 20px', background: '#FFFFFF', cursor: 'text' }} />
                </div>
              </>
            )}

            {descMode === 'write' && (
              <>
                <div className="flex flex-wrap gap-1 px-2.5 py-2 rounded-t-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderBottom: 'none' }}>
                  {HTML_TOOLBAR.map(btn => (
                    <button key={btn.label} type="button" title={btn.title}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        if (btn.isUndo) { handleUndo(); }
                        else if (btn.isRedo) { handleRedo(); }
                        else if (btn.isLink) { openLinkModal(); }
                        else { insertAtCursor(btn.before || '', btn.after || ''); }
                      }}
                      className="px-2 py-1 rounded text-xs cursor-pointer hover:bg-slate-200 transition-colors inline-flex items-center gap-1"
                      style={{ fontFamily: 'monospace', fontWeight: btn.bold ? 800 : 600, fontStyle: btn.italic ? 'italic' : 'normal', background: '#EEF2F7', color: '#334155', border: '1px solid #E2E8F0' }}>
                      {btn.isUndo && <RotateCcw size={12} />}
                      {btn.isRedo && <RotateCw size={12} />}
                      {btn.label}
                    </button>
                  ))}
                </div>
                <textarea
                  ref={textareaRef}
                  value={description}
                  onChange={e => {
                    const val = e.target.value;
                    setDescription(val);
                    pushHistory(val);
                  }}
                  onKeyDown={e => {
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
                      if (e.shiftKey) { e.preventDefault(); handleRedo(); }
                      else { e.preventDefault(); handleUndo(); }
                    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
                      e.preventDefault(); handleRedo();
                    }
                  }}
                  rows={14}
                  placeholder="<p>Full job description in HTML...</p>"
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                  onFocus={focusStyle} onBlur={blurStyle}
                />
              </>
            )}

            {descMode === 'preview' && (
              <>
                <style>{PREVIEW_STYLES}</style>
                <div className="hp rounded-xl px-5 py-4"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', minHeight: '260px', fontSize: '14px' }}
                  dangerouslySetInnerHTML={{ __html: description || '<p style="color:#94a3b8;font-style:italic;">Nothing to preview yet.</p>' }} />
              </>
            )}
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
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60 cursor-pointer whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)', boxShadow: '0 4px 15px rgba(190,18,60,0.30)' }}>
            {loading ? <><Loader2 size={16} className="animate-spin shrink-0" /> Saving...</> : 'Save Changes'}
          </button>
          <Link href="/admin/careers"
            className="px-6 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
            Cancel
          </Link>
        </div>
      </form>

      {/* ─── INSERT LINK MODAL ─── */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150"
            style={{ border: '1px solid #E2E8F0' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-rose-700"
                  style={{ background: 'rgba(190,18,60,0.08)', border: '1px solid rgba(190,18,60,0.15)' }}
                >
                  <Link2 size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Insert Link</h3>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">Add a web link to your content</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleApplyLink} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

              {!hasSelection && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Text <span className="text-slate-600 font-semibold">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Link text (e.g. Visit Innovatiq)"
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                  style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#475569' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer transition-all shadow-sm"
                  style={{ background: 'linear-gradient(135deg,#9F1239,#BE123C)' }}
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
