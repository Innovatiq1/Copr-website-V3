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

JobApplicationSchema.index({ careerId: 1, createdAt: -1 });

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
