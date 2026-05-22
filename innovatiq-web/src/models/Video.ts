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
  products: { type: Boolean, default: false },
  productTypes: { type: mongoose.Schema.Types.Mixed },
  services: { type: Boolean, default: false },
  serviceTypes: { type: mongoose.Schema.Types.Mixed },
  active: { type: Boolean, default: true },
}, { timestamps: true, strict: false });

if (mongoose.models.Video) delete (mongoose.models as Record<string, unknown>).Video;
export default mongoose.model('Video', VideoSchema);
