import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
  jobTitle: { type: String },
  title: { type: String },
  companyName: { type: String },
  department: { type: String },
  location: { type: String },
  type: { type: String },
  employmentType: { type: String },
  shortDescription: { type: String },
  description: { type: String },
  primarySkills: { type: [String], default: [] },
  requirements: [{ type: String }],
  experience: { type: String },
  experienceLevel: { type: String },
  salary: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true, strict: false });

CareerSchema.index({ active: 1, createdAt: -1 });

export default mongoose.models.Career || mongoose.model('Career', CareerSchema);
