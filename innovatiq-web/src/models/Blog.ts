import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  description: { type: String },
  shortDescription: { type: String },
  summary: { type: String },
  image: { type: String },
  author: { type: String },
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true, strict: false });

// Clear cached model to pick up schema changes
if (mongoose.models.Blog) delete (mongoose.models as Record<string, unknown>).Blog;
export default mongoose.model('Blog', BlogSchema);
