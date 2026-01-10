import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { sendWelcomeEmail } from '@/app/lib/email';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = emailSchema.parse(body);

    // Check if email exists
    const existing = await sql`
      SELECT email FROM waitlist WHERE email = ${email}
    `;

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "You're already on the waitlist!" },
        { status: 400 }
      );
    }

    // Insert into database
    await sql`
      INSERT INTO waitlist (email, created_at, notified)
      VALUES (${email}, NOW(), false)
    `;

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email).catch(err => 
      console.error('Failed to send email:', err)
    );

    return NextResponse.json({ message: 'Success', email });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}