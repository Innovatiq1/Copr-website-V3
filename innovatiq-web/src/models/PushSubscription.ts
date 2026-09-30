import mongoose from 'mongoose';

// Stores one browser/device's Web Push subscription so the admin can receive
// push notifications for new chats even when the admin panel tab isn't open.
const PushSubscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, required: true, unique: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
  adminEmail: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.PushSubscription || mongoose.model('PushSubscription', PushSubscriptionSchema);