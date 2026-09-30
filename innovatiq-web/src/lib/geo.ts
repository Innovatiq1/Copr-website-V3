// Resolves a rough "City, Country" location from an IP address — no browser
// location permission needed. Uses ip-api.com's free tier; fails silently
// (returns empty string) for localhost/private IPs or if the lookup errors out.
export async function getLocationFromIp(ip: string): Promise<string> {
  if (!ip || ip === 'unknown' || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return '';
  }

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,city,country`);
    if (!res.ok) return '';
    const data = await res.json();
    if (data.status !== 'success') return '';
    return [data.city, data.country].filter(Boolean).join(', ');
  } catch {
    return '';
  }
}