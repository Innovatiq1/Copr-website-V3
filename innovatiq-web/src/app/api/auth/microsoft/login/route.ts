import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Public: starts the Microsoft sign-in flow by redirecting the browser to
// Microsoft's own login page (Authorization Code flow).
export async function GET(req: NextRequest) {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const appUrl = process.env.APP_URL || req.nextUrl.origin;

  if (!tenantId || !clientId) {
    return NextResponse.json({ message: 'Microsoft sign-in is not configured' }, { status: 500 });
  }

  const redirectUri = `${appUrl}/api/auth/callback/microsoft`;
  const state = crypto.randomBytes(16).toString('hex');

  const authorizeUrl = new URL(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`);
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('response_mode', 'query');
  authorizeUrl.searchParams.set('scope', 'openid profile email User.Read');
  authorizeUrl.searchParams.set('state', state);

  const res = NextResponse.redirect(authorizeUrl.toString());
  // Short-lived state cookie, checked in the callback to guard against CSRF.
  res.cookies.set('ms_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 300,
    path: '/',
  });
  return res;
}