'use client';

import { useEffect, useState } from 'react';
import { API, authFetch } from '@/lib/adminApi';
import { Plus, Trash2, Save } from 'lucide-react';

type PopupField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: string[];
  order?: number;
};

type PopupSettings = {
  _id?: string;
  enabled: boolean;
  delaySeconds: number;
  title: string;
  description: string;
  thankYouMessage: string;
  submitButtonText: string;
  fields: PopupField[];
  recipientEmails: string[];
  emailSubject: string;
  emailBodyTemplate: string;
};

const emptyField = (): PopupField => ({
  id: `field_${Date.now()}`,
  label: '',
  type: 'text',
  required: true,
  order: 0,
});

const buildDefaultTemplate = (fields: PopupField[]): string => {
  const lines = fields.map((f) => `${f.label || f.id}: {{${f.id}}}`);
  return `New enquiry received\n\nSubmitted from: {{page}}\n\n${lines.join('\n')}`;
};

export default function PopupSettingsPage() {
  const [settings, setSettings] = useState<PopupSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await authFetch(`${API}/popup-settings`);
        const data = await res.json();
        setSettings({
          ...data,
          emailSubject: data.emailSubject || 'New Website Enquiry — Lead Capture Popup',
          emailBodyTemplate: data.emailBodyTemplate || buildDefaultTemplate(data.fields || []),
        });
      } catch {
        setMessage('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const update = <K extends keyof PopupSettings>(key: K, value: PopupSettings[K]) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const updateField = (index: number, patch: Partial<PopupField>) => {
    if (!settings) return;
    const fields = [...settings.fields];
    fields[index] = { ...fields[index], ...patch };
    update('fields', fields);
  };

  const addField = () => {
    if (!settings) return;
    update('fields', [...settings.fields, { ...emptyField(), order: settings.fields.length + 1 }]);
  };

  const removeField = (index: number) => {
    if (!settings) return;
    update('fields', settings.fields.filter((_, i) => i !== index));
  };

  const addEmail = () => {
    if (!settings || !newEmail.trim()) return;
    if (settings.recipientEmails.includes(newEmail.trim())) return;
    update('recipientEmails', [...settings.recipientEmails, newEmail.trim()]);
    setNewEmail('');
  };

  const removeEmail = (email: string) => {
    if (!settings) return;
    update('recipientEmails', settings.recipientEmails.filter((e) => e !== email));
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setMessage('');
    try {
      const res = await authFetch(`${API}/popup-settings`, {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      setMessage('Settings saved successfully.');
    } catch {
      setMessage('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const inputStyle = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    color: '#0F172A',
  };
  const cardStyle = {
    background: '#FFFFFF',
    border: '1px solid #EEF2F7',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  };
  const accentGradient = 'linear-gradient(135deg, #9F1239 0%, #E11D48 100%)';

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>Lead Popup Settings</h1>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>Configure the mandatory enquiry popup shown to visitors</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ background: accentGradient, boxShadow: '0 2px 8px rgba(159,18,57,0.28)' }}
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div
          className="mb-6 px-4 py-3 rounded-xl text-sm font-medium"
          style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)', color: '#047857' }}
        >
          {message}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General settings */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <h2 className="font-semibold mb-4" style={{ color: '#0F172A' }}>General</h2>

          <div className="flex items-center justify-between mb-4">
            <label className="text-sm" style={{ color: '#334155' }}>Enable Popup</label>
            <button
              type="button"
              onClick={() => update('enabled', !settings.enabled)}
              className="relative inline-flex items-center rounded-full transition-colors"
              style={{
                width: '44px',
                height: '24px',
                background: settings.enabled ? '#E11D48' : '#E2E8F0',
              }}
            >
              <span
                className="absolute rounded-full bg-white transition-transform"
                style={{
                  width: '18px',
                  height: '18px',
                  top: '3px',
                  left: '3px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  transform: settings.enabled ? 'translateX(20px)' : 'translateX(0px)',
                }}
              />
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Delay (seconds)</label>
            <input
              type="number"
              min={0}
              value={settings.delaySeconds}
              onChange={(e) => update('delaySeconds', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={inputStyle}
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Title</label>
            <textarea
              value={settings.title}
              onChange={(e) => update('title', e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={inputStyle}
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Description</label>
            <textarea
              value={settings.description}
              onChange={(e) => update('description', e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={inputStyle}
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Thank You Message</label>
            <textarea
              value={settings.thankYouMessage}
              onChange={(e) => update('thankYouMessage', e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Submit Button Text</label>
            <input
              type="text"
              value={settings.submitButtonText}
              onChange={(e) => update('submitButtonText', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Recipient emails */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <h2 className="font-semibold mb-4" style={{ color: '#0F172A' }}>Notification Emails</h2>
          <p className="text-xs mb-4" style={{ color: '#64748B' }}>
            Every email added here receives a notification when a visitor submits the popup form.
          </p>

          <div className="flex gap-2 mb-4">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="email@example.com"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={inputStyle}
            />
            <button
              onClick={addEmail}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: accentGradient }}
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-2">
            {settings.recipientEmails.length === 0 && (
              <p className="text-sm" style={{ color: '#94A3B8' }}>No recipient emails configured yet.</p>
            )}
            {settings.recipientEmails.map((email) => (
              <div
                key={email}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                style={{ background: '#F8FAFC', border: '1px solid #EEF2F7' }}
              >
                <span className="text-sm" style={{ color: '#334155' }}>{email}</span>
                <button onClick={() => removeEmail(email)} style={{ color: '#94A3B8' }} onMouseEnter={e => e.currentTarget.style.color = '#E11D48'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Email template */}
        <div className="rounded-2xl p-6 lg:col-span-2" style={cardStyle}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold" style={{ color: '#0F172A' }}>Email Notification Template</h2>
            <button
              onClick={() => update('emailBodyTemplate', buildDefaultTemplate(settings.fields))}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{ background: 'rgba(225,29,72,0.08)', color: '#E11D48', border: '1px solid rgba(225,29,72,0.2)' }}
            >
              Reset to Default
            </button>
          </div>
          <p className="text-xs mb-4" style={{ color: '#64748B' }}>
            Edit the wording freely. Tokens inside <code>{'{{ }}'}</code> get auto-filled with the visitor&apos;s
            actual submitted data — don&apos;t rename or remove them, or that piece of data won&apos;t appear.
          </p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            <span
              className="text-[11px] font-mono px-2 py-1 rounded-md"
              style={{ background: 'rgba(225,29,72,0.08)', color: '#9F1239', border: '1px solid rgba(225,29,72,0.18)' }}
            >
              {'{{page}}'}
            </span>
            {settings.fields.map((f) => (
              <span
                key={f.id}
                className="text-[11px] font-mono px-2 py-1 rounded-md"
                style={{ background: 'rgba(225,29,72,0.08)', color: '#9F1239', border: '1px solid rgba(225,29,72,0.18)' }}
              >
                {`{{${f.id}}}`}
              </span>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Email Subject</label>
            <input
              type="text"
              value={settings.emailSubject}
              onChange={(e) => update('emailSubject', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748B' }}>Email Body</label>
            <textarea
              value={settings.emailBodyTemplate}
              onChange={(e) => update('emailBodyTemplate', e.target.value)}
              rows={10}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none font-mono"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Dynamic fields */}
        <div className="rounded-2xl p-6 lg:col-span-2" style={cardStyle}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: '#0F172A' }}>Form Fields</h2>
            <button
              onClick={addField}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
              style={{ background: 'rgba(225,29,72,0.08)', color: '#9F1239', border: '1px solid rgba(225,29,72,0.2)' }}
            >
              <Plus size={14} /> Add Field
            </button>
          </div>

          <div className="space-y-4">
            {settings.fields.map((field, index) => (
              <div
                key={field.id}
                className="grid gap-3 sm:grid-cols-5 items-start p-4 rounded-xl"
                style={{ background: '#F8FAFC', border: '1px solid #EEF2F7' }}
              >
                <div>
                  <label className="block text-[10px] font-semibold mb-1" style={{ color: '#94A3B8' }}>Label</label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(index, { label: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold mb-1" style={{ color: '#94A3B8' }}>Type</label>
                  <select
                    value={field.type}
                    onChange={(e) => updateField(index, { type: e.target.value as PopupField['type'] })}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={inputStyle}
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="select">Dropdown</option>
                    <option value="textarea">Textarea</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold mb-1" style={{ color: '#94A3B8' }}>
                    {field.type === 'select' ? 'Options (comma separated)' : 'Placeholder'}
                  </label>
                  <input
                    type="text"
                    value={field.type === 'select' ? (field.options || []).join(', ') : field.placeholder || ''}
                    onChange={(e) =>
                      field.type === 'select'
                        ? updateField(index, { options: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })
                        : updateField(index, { placeholder: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={inputStyle}
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    checked={!!field.required}
                    onChange={(e) => updateField(index, { required: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label className="text-xs" style={{ color: '#64748B' }}>Required</label>
                </div>

                <div className="flex justify-end pt-6">
                  <button onClick={() => removeField(index)} style={{ color: '#94A3B8' }} onMouseEnter={e => e.currentTarget.style.color = '#E11D48'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}