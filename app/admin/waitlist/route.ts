import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const result = await sql`
      SELECT email, created_at, notified
      FROM waitlist
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ emails: result.rows });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}