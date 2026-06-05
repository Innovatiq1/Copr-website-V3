import mongoose from 'mongoose';

const AwardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  shortDescription: { type: String },
  image: { type: String },
  awardImage: { type: String },
  optionalImage: { type: String },
  year: { type: String },
  organization: { type: String },
}, { timestamps: true, strict: false });

export default mongoose.models.Award || mongoose.model('Award', AwardSchema);
