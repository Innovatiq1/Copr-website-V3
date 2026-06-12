import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'adminsecret123';

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const auth = req.headers.get('authorization');
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

export function requireAuth(req: NextRequest): { id: string } | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  try {
    return verifyToken(token) as { id: string };
  } catch {
    return null;
  }
}
