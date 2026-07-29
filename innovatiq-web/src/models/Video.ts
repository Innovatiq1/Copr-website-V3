import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  videoName: { type: String },
  title: { type: String, required: true },
  url: { type: String },
  videoLink: { type: String },
  thumbnail: { type: String },
  description: { type: String },
  date: { type: String },
  time: { type: String },
  home: { type: Boolean, default: false },
  career: { type: Boolean, default: false },
  contact: { type: Boolean, default: false },
  aboutUs: { type: Boolean, default: false },
  aboutUsTypes: { type: mongoose.Schema.Types.Mixed },
  products: { type: Boolean, default: false },
  productTypes: { type: mongoose.Schema.Types.Mixed },
  services: { type: Boolean, default: false },
  serviceTypes: { type: mongoose.Schema.Types.Mixed },
  active: { type: Boolean, default: true },
}, { timestamps: true, strict: false });

VideoSchema.index({ active: 1, createdAt: -1 });

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
