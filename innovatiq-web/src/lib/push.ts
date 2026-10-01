import webpush from 'web-push';
import { connectDB } from './mongodb';
import PushSubscription from '@/models/PushSubscription';

let configured = false;
function ensureConfigured() {
  if (configured) return;
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
      'mailto:admin@innovatiq.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
    configured = true;
  }
}

// Sends a push notification to every subscribed admin device. Safe to call even
// if push isn't configured yet (e.g. missing VAPID keys) — it just no-ops.
export async function notifyAdminsPush(payload: { title: string; body: string; url?: string }) {
  ensureConfigured();
  if (!configured) return;

  try {
    await connectDB();
    const subs = await PushSubscription.find();

    await Promise.all(
      subs.map(async (sub) => {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: sub.keys },
            JSON.stringify(payload)
          );
        } catch (err: unknown) {
          // 410/404 means the subscription is dead (browser unsubscribed, cache cleared, etc.)
          const statusCode = (err as { statusCode?: number })?.statusCode;
          if (statusCode === 410 || statusCode === 404) {
            await PushSubscription.deleteOne({ _id: sub._id });
          }
        }
      })
    );
  } catch (err) {
    console.error('[push] notifyAdminsPush failed:', err);
  }
}