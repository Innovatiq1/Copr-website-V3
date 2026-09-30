// Service worker for the Admin PWA — handles push notifications and lets the
// admin app be installed to the home screen. Deliberately minimal: no offline
// caching, since the admin panel always needs fresh data.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = { title: 'Innovatiq Admin', body: 'You have a new notification.', url: '/admin/live-chat' };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch { /* fall back to defaults */ }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/logo/logo.png',
      badge: '/logo/logo.png',
      data: { url: data.url },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/admin/live-chat';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      const existing = clientsArr.find((c) => c.url.includes('/admin'));
      if (existing) {
        existing.focus();
        existing.navigate(targetUrl);
      } else {
        self.clients.openWindow(targetUrl);
      }
    })
  );
});