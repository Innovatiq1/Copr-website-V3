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
  primarySkills: { type: String },
  requirements: [{ type: String }],
  experience: { type: String },
  salary: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true, strict: false });

if (mongoose.models.Career) delete (mongoose.models as Record<string, unknown>).Career;
export default mongoose.model('Career', CareerSchema);
