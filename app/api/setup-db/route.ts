import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Create waitlist table
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        notified BOOLEAN DEFAULT FALSE,
        notified_at TIMESTAMP
      )
    `;

    return NextResponse.json({ 
      message: 'Database setup complete!',
      success: true 
    });
  } catch (error: any) {
    console.error('Database setup error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to setup database',
        details: error.message 
      },
      { status: 500 }
    );
  }
}