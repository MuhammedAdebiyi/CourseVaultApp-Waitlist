import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_APP_PASSWORD, 
  },
});

export async function sendWelcomeEmail(to: string) {
  try {
    await transporter.sendMail({
      from: `"CourseVault" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'Welcome to CourseVault Waitlist!',
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 40px; text-align: center;">
              <h1 style="color: white; font-size: 32px;">You're on the list!</h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 16px;">
                Thank you for joining CourseVault. We'll notify you when we launch!
              </p>
            </div>
          </body>
        </html>
      `,
    });
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}

export async function sendLaunchEmail(to: string) {
  try {
    await transporter.sendMail({
      from: `"CourseVault" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'CourseVault is LIVE! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 40px; text-align: center;">
              <h1 style="color: white; font-size: 36px;">We're Live!</h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 18px;">
                CourseVault is ready! Start your free 30-day trial now.
              </p>
              <a href="https://coursevault.com" style="display: inline-block; margin-top: 24px; background: white; color: #667eea; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: bold;">
                Get Started Free
              </a>
            </div>
          </body>
        </html>
      `,
    });
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}