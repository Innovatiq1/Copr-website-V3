import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
}, { timestamps: true });

if (mongoose.models.Admin) delete (mongoose.models as Record<string, unknown>).Admin;
export default mongoose.model('Admin', AdminSchema);
