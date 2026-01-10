import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = emailSchema.parse(body);

    // Check if email already exists
    const existing = await sql`
      SELECT email FROM waitlist WHERE email = ${email}
    `;

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'You\'re already on the waitlist!' },
        { status: 400 }
      );
    }

    // Insert into database
    await sql`
      INSERT INTO waitlist (email, created_at, notified)
      VALUES (${email}, NOW(), false)
    `;

    // Send welcome email
    try {
      await resend.emails.send({
        from: 'CourseVault <hello@coursevault.com>',
        to: email,
        subject: 'Welcome to CourseVault Waitlist!',
        html: getWelcomeEmailHTML(email),
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      message: 'Successfully joined waitlist',
      email,
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}

// Get waitlist count
export async function GET() {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM waitlist
    `;

    return NextResponse.json({
      count: result.rows[0].count,
    });
  } catch (error) {
    console.error('Error fetching count:', error);
    return NextResponse.json(
      { count: 0 },
      { status: 200 }
    );
  }
}

function getWelcomeEmailHTML(email: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
          .logo {
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 20px;
            margin: 0 auto 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            font-weight: bold;
            color: #667eea;
          }
          h1 {
            color: white;
            font-size: 32px;
            margin-bottom: 16px;
          }
          p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            margin-bottom: 24px;
          }
          .features {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            text-align: left;
          }
          .feature {
            color: white;
            margin-bottom: 12px;
            padding-left: 24px;
            position: relative;
          }
          .feature:before {
            content: "✓";
            position: absolute;
            left: 0;
            font-weight: bold;
          }
          .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">CV</div>
          <h1>You're on the list!</h1>
          <p>Thank you for joining the CourseVault waitlist. We're building something amazing, and you'll be among the first to know when we launch.</p>
          
          <div class="features">
            <div class="feature">AI-powered quiz generation</div>
            <div class="feature">Smart flashcard creator</div>
            <div class="feature">Interactive PDF chat</div>
            <div class="feature">Exam Mode Practice</div>
            <div class="feature">AI Summary Generation</div>
            <div class="feature">Pomodoro Study Timer</div>
            <div class="feature">AI Mind Maps</div>
            <div class="feature">Audio Summaries (TTS)</div>
            <div class="feature">Study together rooms</div>
            <div class="feature">Smart Analytics</div>
            <div class="feature">Cloud Storage</div>
            <div class="feature">30-day free trial at launch</div>
          </div>

          <p>We'll send you an email as soon as CourseVault is ready. Get ready to transform the way you study!</p>

          <div class="footer">
            <p>CourseVault - Your AI Study Companion</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
