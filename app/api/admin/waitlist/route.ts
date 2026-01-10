// app/api/admin/waitlist/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Get all waitlist entries
    const result = await sql`
      SELECT 
        id, 
        email, 
        created_at, 
        notified,
        notified_at
      FROM waitlist 
      ORDER BY created_at DESC
    `;

    // Get stats
    const stats = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN notified = true THEN 1 END) as notified,
        COUNT(CASE WHEN notified = false THEN 1 END) as pending
      FROM waitlist
    `;

    return NextResponse.json({
      entries: result.rows,
      stats: stats.rows[0],
    });
  } catch (error: any) {
    console.error('Admin waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist', details: error.message },
      { status: 500 }
    );
  }
}