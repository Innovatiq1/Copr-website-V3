import mongoose from 'mongoose';

const PopupLeadSchema = new mongoose.Schema({
  // Free-form because the fields captured depend on the admin-configured PopupSettings.fields
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  ip: { type: String },
  userAgent: { type: String },
  page: { type: String },
}, { timestamps: true, strict: false });

export default mongoose.models.PopupLead || mongoose.model('PopupLead', PopupLeadSchema);