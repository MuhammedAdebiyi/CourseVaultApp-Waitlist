import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendWelcomeEmail(email: string) {
  const mailOptions = {
    from: `CourseVault <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Welcome to CourseVault',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to CourseVault</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #faf9f6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 60px 20px;">
              <table role="presentation" style="width: 560px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 24px; overflow: hidden;">
                
                <!-- Logo/Header -->
                <tr>
                  <td style="padding: 50px 40px 30px 40px; text-align: center;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 16px 32px; border-radius: 12px;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">
                        COURSEVAULT
                      </h1>
                    </div>
                  </td>
                </tr>
                
                <!-- Date -->
                <tr>
                  <td style="padding: 0 40px;">
                    <p style="margin: 0; color: #999; font-size: 13px; text-align: center; letter-spacing: 1px; text-transform: uppercase;">
                      January 30, 2026
                    </p>
                  </td>
                </tr>
                
                <!-- Main Heading -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px;">
                    <h2 style="margin: 0; color: #1a1a1a; font-size: 28px; font-weight: 600; text-align: center; line-height: 1.3;">
                      From PDF to mastery.<br>Powered by AI.
                    </h2>
                  </td>
                </tr>
                
                <!-- Content Box -->
                <tr>
                  <td style="padding: 20px 40px 40px 40px;">
                    <div style="background: linear-gradient(135deg, #e8ebf7 0%, #f3e8f7 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
                      <p style="margin: 0 0 20px 0; color: #2a2a2a; font-size: 16px; line-height: 1.7;">
                        Tired of spending hours creating study materials from your lecture notes and textbooks?
                      </p>
                      <p style="margin: 0; color: #2a2a2a; font-size: 16px; line-height: 1.7;">
                        CourseVault's AI reads your PDFs and instantly generates <strong style="color: #667eea;">practice quizzes, smart flashcards, detailed summaries, and mind maps</strong>. Study smarter, not harder.
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- What's Next Section -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <h3 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">
                      What happens next
                    </h3>
                    <div style="margin-bottom: 16px;">
                      <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6; padding-left: 24px; position: relative;">
                        <span style="position: absolute; left: 0; color: #667eea;">→</span>
                        We'll notify you when we launch
                      </p>
                    </div>
                    <div style="margin-bottom: 16px;">
                      <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6; padding-left: 24px; position: relative;">
                        <span style="position: absolute; left: 0; color: #667eea;">→</span>
                        Early access to all premium features
                      </p>
                    </div>
                    <div style="margin-bottom: 16px;">
                      <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6; padding-left: 24px; position: relative;">
                        <span style="position: absolute; left: 0; color: #667eea;">→</span>
                        Exclusive pricing for early supporters
                      </p>
                    </div>
                    <div>
                      <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6; padding-left: 24px; position: relative;">
                        <span style="position: absolute; left: 0; color: #667eea;">→</span>
                        Help shape the future of AI-powered learning
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Features Grid -->
                <tr>
                  <td style="padding: 0 40px 40px 40px;">
                    <h3 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">
                      Coming soon
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 12px 8px 0; color: #4a4a4a; font-size: 15px; width: 50%;">
                          AI Quiz Generator
                        </td>
                        <td style="padding: 8px 0 8px 12px; color: #4a4a4a; font-size: 15px; width: 50%;">
                          Smart Flashcards
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 12px 8px 0; color: #4a4a4a; font-size: 15px;">
                          PDF Chat Assistant
                        </td>
                        <td style="padding: 8px 0 8px 12px; color: #4a4a4a; font-size: 15px;">
                          AI Summaries
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 12px 8px 0; color: #4a4a4a; font-size: 15px;">
                          Study Rooms
                        </td>
                        <td style="padding: 8px 0 8px 12px; color: #4a4a4a; font-size: 15px;">
                          Pomodoro Timer
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Social Links -->
                <tr>
                  <td style="padding: 0 40px 50px 40px; text-align: center;">
                    <p style="margin: 0 0 16px 0; color: #6a6a6a; font-size: 14px;">
                      Stay connected
                    </p>
                    <div>
                      <a href="https://x.com/coursevaultapp" style="display: inline-block; margin: 0 12px; color: #667eea; text-decoration: none; font-size: 14px; font-weight: 500;">Twitter</a>
                      <a href="https://www.instagram.com/coursevault.app/" style="display: inline-block; margin: 0 12px; color: #667eea; text-decoration: none; font-size: 14px; font-weight: 500;">Instagram</a>
                      <a href="https://www.tiktok.com/@coursevaultapp" style="display: inline-block; margin: 0 12px; color: #667eea; text-decoration: none; font-size: 14px; font-weight: 500;">TikTok</a>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #faf9f6; padding: 30px 40px; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #999; font-size: 13px;">
                      Made for students everywhere
                    </p>
                    <p style="margin: 0; color: #bbb; font-size: 12px;">
                      © 2026 CourseVault
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
COURSEVAULT

January 30, 2026

From PDF to mastery.
Powered by AI.

Tired of spending hours creating study materials from your lecture notes and textbooks?

CourseVault's AI reads your PDFs and instantly generates practice quizzes, smart flashcards, detailed summaries, and mind maps. Study smarter, not harder.

What happens next:
→ We'll notify you when we launch
→ Early access to all premium features
→ Exclusive pricing for early supporters
→ Help shape the future of AI-powered learning

Coming soon:
AI Quiz Generator          Smart Flashcards
PDF Chat Assistant         AI Summaries
Study Rooms               Pomodoro Timer

Stay connected:
Twitter: https://x.com/coursevaultapp
Instagram: https://www.instagram.com/coursevault.app/
TikTok: https://www.tiktok.com/@coursevaultapp

Made for students everywhere
© 2026 CourseVault
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

export async function sendLaunchEmail(email: string): Promise<boolean> {
  const mailOptions = {
    from: `CourseVault <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'CourseVault is live',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CourseVault is Live</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #faf9f6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 60px 20px;">
              <table role="presentation" style="width: 560px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 24px; overflow: hidden;">
                
                <!-- Logo/Header -->
                <tr>
                  <td style="padding: 50px 40px 30px 40px; text-align: center;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 16px 32px; border-radius: 12px;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">
                        COURSEVAULT
                      </h1>
                    </div>
                  </td>
                </tr>
                
                <!-- Date -->
                <tr>
                  <td style="padding: 0 40px;">
                    <p style="margin: 0; color: #999; font-size: 13px; text-align: center; letter-spacing: 1px; text-transform: uppercase;">
                      We're live
                    </p>
                  </td>
                </tr>
                
                <!-- Main Heading -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px;">
                    <h2 style="margin: 0; color: #1a1a1a; font-size: 28px; font-weight: 600; text-align: center; line-height: 1.3;">
                      Your wait is over.<br>Let's revolutionize studying.
                    </h2>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <p style="margin: 0; color: #4a4a4a; font-size: 16px; line-height: 1.7; text-align: center;">
                      As an early waitlist member, you have <strong style="color: #667eea;">exclusive early access</strong> to everything we've built.
                    </p>
                  </td>
                </tr>
                
                <!-- CTA Button -->
                <tr>
                  <td style="padding: 30px 40px;">
                    <div style="text-align: center;">
                      <a href="https://coursevault.app" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 12px; font-size: 16px; font-weight: 600;">
                        Start learning now
                      </a>
                    </div>
                  </td>
                </tr>
                
                <!-- Benefits Box -->
                <tr>
                  <td style="padding: 20px 40px 30px 40px;">
                    <div style="background: linear-gradient(135deg, #e8f5e9 0%, #f3e8f7 100%); border-radius: 16px; padding: 32px;">
                      <h3 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">
                        Your early bird benefits
                      </h3>
                      <div style="margin-bottom: 12px;">
                        <p style="margin: 0; color: #2a2a2a; font-size: 15px; line-height: 1.6; padding-left: 24px; position: relative;">
                          <span style="position: absolute; left: 0; color: #667eea;">→</span>
                          30-day free trial of premium features
                        </p>
                      </div>
                      <div style="margin-bottom: 12px;">
                        <p style="margin: 0; color: #2a2a2a; font-size: 15px; line-height: 1.6; padding-left: 24px; position: relative;">
                          <span style="position: absolute; left: 0; color: #667eea;">→</span>
                          50% off your first year
                        </p>
                      </div>
                      <div style="margin-bottom: 12px;">
                        <p style="margin: 0; color: #2a2a2a; font-size: 15px; line-height: 1.6; padding-left: 24px; position: relative;">
                          <span style="position: absolute; left: 0; color: #667eea;">→</span>
                          Priority support
                        </p>
                      </div>
                      <div style="margin-bottom: 12px;">
                        <p style="margin: 0; color: #2a2a2a; font-size: 15px; line-height: 1.6; padding-left: 24px; position: relative;">
                          <span style="position: absolute; left: 0; color: #667eea;">→</span>
                          Early access to new features
                        </p>
                      </div>
                      <div>
                        <p style="margin: 0; color: #2a2a2a; font-size: 15px; line-height: 1.6; padding-left: 24px; position: relative;">
                          <span style="position: absolute; left: 0; color: #667eea;">→</span>
                          Exclusive community access
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- Features Section -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <h3 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">
                      Now available
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 12px 8px 0; color: #4a4a4a; font-size: 15px; width: 50%;">
                          AI Quiz Generator
                        </td>
                        <td style="padding: 8px 0 8px 12px; color: #4a4a4a; font-size: 15px; width: 50%;">
                          Smart Flashcards
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 12px 8px 0; color: #4a4a4a; font-size: 15px;">
                          PDF Chat Assistant
                        </td>
                        <td style="padding: 8px 0 8px 12px; color: #4a4a4a; font-size: 15px;">
                          AI Summaries
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 12px 8px 0; color: #4a4a4a; font-size: 15px;">
                          Study Rooms
                        </td>
                        <td style="padding: 8px 0 8px 12px; color: #4a4a4a; font-size: 15px;">
                          Pomodoro Timer
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 12px 8px 0; color: #4a4a4a; font-size: 15px;">
                          Exam Mode
                        </td>
                        <td style="padding: 8px 0 8px 12px; color: #4a4a4a; font-size: 15px;">
                          Mind Mapping
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Limited Time Notice -->
                <tr>
                  <td style="padding: 0 40px 40px 40px;">
                    <div style="background: #fff8e1; border-left: 3px solid #ffa726; padding: 20px; border-radius: 12px;">
                      <p style="margin: 0; color: #2a2a2a; font-size: 14px; line-height: 1.6;">
                        <strong>Limited time:</strong> Sign up within 7 days to claim your discount code and all early bird benefits.
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Support Section -->
                <tr>
                  <td style="padding: 0 40px 40px 40px; text-align: center;">
                    <p style="margin: 0 0 16px 0; color: #6a6a6a; font-size: 14px;">
                      Questions? Reply to this email or reach out on social
                    </p>
                    <div>
                      <a href="https://x.com/coursevaultapp" style="display: inline-block; margin: 0 12px; color: #667eea; text-decoration: none; font-size: 14px; font-weight: 500;">Twitter</a>
                      <a href="https://www.instagram.com/coursevault.app/" style="display: inline-block; margin: 0 12px; color: #667eea; text-decoration: none; font-size: 14px; font-weight: 500;">Instagram</a>
                      <a href="https://www.tiktok.com/@coursevaultapp" style="display: inline-block; margin: 0 12px; color: #667eea; text-decoration: none; font-size: 14px; font-weight: 500;">TikTok</a>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #faf9f6; padding: 30px 40px; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #999; font-size: 13px;">
                      Made for students everywhere
                    </p>
                    <p style="margin: 0; color: #bbb; font-size: 12px;">
                      © 2026 CourseVault
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
COURSEVAULT

We're live

Your wait is over.
Let's revolutionize studying.

As an early waitlist member, you have exclusive early access to everything we've built.

→ Start learning now: https://coursevault.app

Your early bird benefits:
→ Priority support
→ Early access to new features
→ Exclusive community access

Now available:
AI Quiz Generator          Smart Flashcards
PDF Chat Assistant         AI Summaries
Study Rooms               Pomodoro Timer
Exam Mode                 Mind Mapping

Limited time: Sign up within 7 days to claim your discount code and all early bird benefits.

Questions? Reply to this email or reach out:
Twitter: https://x.com/coursevaultapp
Instagram: https://www.instagram.com/coursevault.app/
TikTok: https://www.tiktok.com/@coursevaultapp

Made for students everywhere
© 2026 CourseVault
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Launch email sent to:', email);
    return true;
  } catch (error) {
    console.error('Error sending launch email to', email, ':', error);
    return false;
  }
}