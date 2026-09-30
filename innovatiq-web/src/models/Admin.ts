import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional now — Microsoft SSO users won't have one
  name: { type: String },
  provider: { type: String, enum: ['local', 'microsoft'], default: 'local' },
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
