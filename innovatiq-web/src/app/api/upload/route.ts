import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Direct file upload is not supported. Use the dedicated API routes.' }, { status: 501 });
}
