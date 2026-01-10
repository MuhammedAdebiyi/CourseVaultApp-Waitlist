import { sql } from '@vercel/postgres';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLaunchNotification() {
  try {
    // Get all waitlist emails that haven't been notified
    const result = await sql`
      SELECT email FROM waitlist WHERE notified = false
    `;

    const emails = result.rows.map(row => row.email);

    // Send in batches of 50 (Resend limit)
    for (let i = 0; i < emails.length; i += 50) {
      const batch = emails.slice(i, i + 50);
      
      await resend.emails.send({
        from: 'CourseVault <hello@coursevault.com>',
        to: batch,
        subject: 'CourseVault is LIVE! Start your free trial now',
        html: getLaunchEmailHTML(),
      });

      // Mark as notified
      await sql`
        UPDATE waitlist 
        SET notified = true, notified_at = NOW()
        WHERE email = ANY(${batch})
      `;
    }

    console.log(`Sent launch emails to ${emails.length} users`);
    return { success: true, count: emails.length };
  } catch (error) {
    console.error('Launch notification error:', error);
    throw error;
  }
}

function getLaunchEmailHTML() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            padding: 40px;
            text-align: center;
          }
          h1 {
            color: white;
            font-size: 36px;
            margin-bottom: 16px;
          }
          p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 18px;
            margin-bottom: 24px;
          }
          .cta-button {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: bold;
            font-size: 18px;
            margin: 24px 0;
          }
          .badge {
            display: inline-block;
            background: rgba(16, 185, 129, 0.2);
            color: #10b981;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 24px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="badge">WE'RE LIVE!</div>
          <h1>CourseVault is Here!</h1>
          <p>The wait is over. Your AI-powered study companion is ready to transform the way you learn.</p>
          
          <a href="https://coursevault.com/signup" class="cta-button">
            Start Your Free 30-Day Trial
          </a>

          <p style="font-size: 16px; margin-top: 32px;">
            As an early supporter, you get full access to all features during your trial. No credit card required.
          </p>
        </div>
      </body>
    </html>
  `;
}