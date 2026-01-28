import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    // Check environment variables
    const config = {
      hasUser: !!process.env.GMAIL_USER,
      hasPassword: !!process.env.GMAIL_APP_PASSWORD,
      userValue: process.env.GMAIL_USER,
      passwordLength: process.env.GMAIL_APP_PASSWORD?.length || 0,
      passwordPreview: process.env.GMAIL_APP_PASSWORD?.substring(0, 4) + '...',
    };

    // Try to create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify connection
    await transporter.verify();

    // Try sending test email
    const testEmail = process.env.GMAIL_USER; 
    
    const info = await transporter.sendMail({
      from: `CourseVault <${process.env.GMAIL_USER}>`,
      to: testEmail,
      subject: ' Email Test Successful!',
      text: 'If you receive this, your email configuration is working correctly!',
      html: `
        <h1> Email Test Successful!</h1>
        <p>Your CourseVault email system is working correctly.</p>
        <p>Configuration details:</p>
        <ul>
          <li>Gmail User: ${process.env.GMAIL_USER}</li>
          <li>Connection verified: Yes</li>
          <li>Test email sent successfully</li>
        </ul>
      `,
    });

    return NextResponse.json({
      success: true,
      config,
      emailSent: true,
      messageId: info.messageId,
      message: 'Email configuration is working! Check your inbox.',
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      details: {
        hasUser: !!process.env.GMAIL_USER,
        hasPassword: !!process.env.GMAIL_APP_PASSWORD,
        passwordLength: process.env.GMAIL_APP_PASSWORD?.length || 0,
      },
      fullError: error.toString(),
    }, { status: 500 });
  }
}