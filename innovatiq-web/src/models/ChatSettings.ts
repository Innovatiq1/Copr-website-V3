import mongoose from 'mongoose';

// Configurable timing for the live-chat auto-behaviours, editable from the
// Admin Panel's Live Chat page rather than hardcoded.
const ChatSettingsSchema = new mongoose.Schema({
  busyThresholdMinutes: { type: Number, default: 2 },     // auto "team is busy" notice
  busyMessageText: {
    type: String,
    default: "It seems our team is busy with other conversations at the moment. Please bear with us — our team will connect with you here shortly.",
  },
  idleEmailThresholdMinutes: { type: Number, default: 20 }, // chat-history email after this much inactivity
}, { timestamps: true });

export default mongoose.models.ChatSettings || mongoose.model('ChatSettings', ChatSettingsSchema);