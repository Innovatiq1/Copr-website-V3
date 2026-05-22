import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  careerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  resume: { type: String }, // file path
  coverLetter: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' },
}, { timestamps: true });

if (mongoose.models.JobApplication) delete (mongoose.models as Record<string, unknown>).JobApplication;
export default mongoose.model('JobApplication', JobApplicationSchema);
