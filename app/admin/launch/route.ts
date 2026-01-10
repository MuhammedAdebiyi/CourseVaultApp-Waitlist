import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { sendLaunchEmail } from '@/app/lib/email';

export async function POST() {
  try {
    const result = await sql`
      SELECT email FROM waitlist WHERE notified = false
    `;

    const emails = result.rows.map(r => r.email as string);
    let sent = 0;
    let failed = 0;

    // Send emails one by one (Gmail limit: 500/day)
    for (const email of emails) {
      const success = await sendLaunchEmail(email);
      
      if (success) {
        // Mark as notified
        await sql`
          UPDATE waitlist 
          SET notified = true, notified_at = NOW()
          WHERE email = ${email}
        `;
        sent++;
      } else {
        failed++;
      }

      // Small delay to avoid rate limits (1 second between emails)
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ 
      sent, 
      failed,
      message: `Sent ${sent} emails, ${failed} failed` 
    });
  } catch (error) {
    console.error('Launch error:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' }, 
      { status: 500 }
    );
  }
}