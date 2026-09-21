import mongoose from 'mongoose';

const PopupFieldSchema = new mongoose.Schema({
  id: { type: String, required: true },        // stable key used in submitted data, e.g. "phone"
  label: { type: String, required: true },      // shown to visitor, e.g. "Phone Number"
  type: {
    type: String,
    enum: ['text', 'email', 'phone', 'select', 'textarea'],
    default: 'text',
  },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: true },
  options: [{ type: String }],                  // used when type === 'select'
  order: { type: Number, default: 0 },
}, { _id: false });

const PopupSettingsSchema = new mongoose.Schema({
  // Master on/off switch
  enabled: { type: Boolean, default: true },

  // Timing
  delaySeconds: { type: Number, default: 10 },

  // Text content (all editable from Admin Panel)
  title: { type: String, default: "Hi! We see that you're interested in our products or services." },
  description: {
    type: String,
    default: 'Please share your details and requirements below, and our Sales team will get back to you.',
  },
  thankYouMessage: { type: String, default: 'Thank you! Our Sales team will connect with you shortly.' },
  submitButtonText: { type: String, default: 'Submit' },

  // Email notification template — configurable so admins can change wording without touching code.
  // Uses {{token}} placeholders (e.g. {{name}}, {{email}}, {{page}}) that get auto-filled with
  // the actual submitted values. Admins can freely edit surrounding text, but the tokens inside
  // curly braces must stay exactly as shown or they simply won't be replaced.
  emailSubject: { type: String, default: 'New Website Enquiry — Lead Capture Popup' },
  emailBodyTemplate: {
    type: String,
    default:
      'New enquiry received\n\nSubmitted from: {{page}}\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nInterested In: {{interestedIn}}\nRequirement: {{requirement}}',
  },

  // Dynamic form fields — fully configurable, nothing hardcoded on the frontend
  fields: {
    type: [PopupFieldSchema],
    default: [
      { id: 'name', label: 'Name', type: 'text', required: true, order: 1 },
      { id: 'email', label: 'Email Address', type: 'email', required: true, order: 2 },
      { id: 'phone', label: 'Phone Number', type: 'phone', required: true, order: 3 },
      {
        id: 'interestedIn',
        label: 'Interested In',
        type: 'select',
        required: true,
        options: ['Product', 'Services'],
        order: 4,
      },
      { id: 'requirement', label: 'Requirement / Looking For', type: 'textarea', required: true, order: 5 },
    ],
  },

  // Notification recipients — configurable list, not hardcoded
  recipientEmails: {
    type: [String],
    default: [],
  },
}, { timestamps: true, strict: false });

export default mongoose.models.PopupSettings || mongoose.model('PopupSettings', PopupSettingsSchema);