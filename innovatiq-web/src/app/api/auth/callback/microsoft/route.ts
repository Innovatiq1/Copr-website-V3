import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { signToken } from '@/lib/auth';
import Admin from '@/models/Admin';

// Public: Microsoft redirects the browser back here after the user signs in.
// Exchanges the authorization code for tokens, fetches the user's profile from
// Microsoft Graph, then issues our OWN JWT (same signToken used everywhere else
// in this app) so the rest of the admin panel needs no changes at all.
export async function GET(req: NextRequest) {
  const appUrl = process.env.APP_URL || req.nextUrl.origin;
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  const expectedState = req.cookies.get('ms_oauth_state')?.value;

  const failRedirect = (reason: string) =>
    NextResponse.redirect(`${appUrl}/admin/login?error=${encodeURIComponent(reason)}`);

  if (!code) return failRedirect('missing_code');
  if (!state || !expectedState || state !== expectedState) return failRedirect('invalid_state');

  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) return failRedirect('not_configured');

  const redirectUri = `${appUrl}/api/auth/callback/microsoft`;

  try {
    // Exchange the authorization code for an access token.
    const tokenRes = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        scope: 'openid profile email User.Read',
      }),
    });

    if (!tokenRes.ok) return failRedirect('token_exchange_failed');
    const tokenData = await tokenRes.json();

    // Fetch the signed-in user's profile from Microsoft Graph.
    const profileRes = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    if (!profileRes.ok) return failRedirect('profile_fetch_failed');
    const profile = await profileRes.json();

    const email = (profile.mail || profile.userPrincipalName || '').toLowerCase();
    const name = profile.displayName || email;
    if (!email) return failRedirect('no_email');

    await connectDB();
    const admin = await Admin.findOne({ email });
    if (!admin) {
      // Only pre-approved team members (added via Admin Panel > Team Members) can sign in —
      // signing in with Microsoft alone isn't enough for a random company email.
      return failRedirect('not_authorized');
    }
    if (admin.provider !== 'microsoft') {
      admin.provider = 'microsoft';
      if (!admin.name) admin.name = name;
      await admin.save();
    }

    const jwtToken = signToken({ id: admin._id.toString(), email: admin.email, name: admin.name });

    // Pass the token via the URL fragment (#), not a query string, so it never
    // gets sent to the server or logged — the client-side page below reads it
    // straight out of window.location.hash and stores it in localStorage.
    return NextResponse.redirect(`${appUrl}/admin/sso-complete#token=${jwtToken}`);
  } catch (err) {
    console.error('[auth] Microsoft callback failed:', err);
    return failRedirect('unexpected_error');
  }
}