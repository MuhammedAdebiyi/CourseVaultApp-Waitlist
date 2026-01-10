// app/lib/email.ts
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
    subject: '🎉 Welcome to CourseVault Waitlist!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to CourseVault</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header with gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">
                      🚀 Welcome to CourseVault!
                    </h1>
                  </td>
                </tr>
                
                <!-- Main content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 24px; font-weight: 600;">
                      You're on the list! 🎉
                    </h2>
                    
                    <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                      Thank you for joining the <strong>CourseVault</strong> waitlist! You're one step closer to revolutionizing how you study.
                    </p>
                    
                    <div style="background-color: #f9fafb; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 8px;">
                      <p style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                        What's Next?
                      </p>
                      <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
                        <li>We'll email you when we launch</li>
                        <li>Get early access to all premium features</li>
                        <li>Exclusive discounts for early supporters</li>
                        <li>Be part of shaping the future of AI-powered learning</li>
                      </ul>
                    </div>
                    
                    <div style="margin: 30px 0;">
                      <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; font-weight: 600;">
                        Coming Features:
                      </h3>
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            🧠 AI Quiz Generator
                          </td>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            ✨ Smart Flashcards
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            💬 PDF Chat Assistant
                          </td>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            📄 AI Summaries
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            👥 Collaborative Study Rooms
                          </td>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            ⏱️ Pomodoro Timer
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 15px;">
                        Stay connected with us:
                      </p>
                      <div>
                        <a href="https://x.com/coursevaultapp" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-weight: 600;">Twitter</a>
                        <a href="https://www.instagram.com/coursevault.app/" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-weight: 600;">Instagram</a>
                        <a href="https://www.tiktok.com/@coursevaultapp" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-weight: 600;">TikTok</a>
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                      Made with passion for students everywhere
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                      © 2026 CourseVault. All rights reserved.
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
Welcome to CourseVault! 🎉

You're on the waitlist!

Thank you for joining the CourseVault waitlist. You're one step closer to revolutionizing how you study.

What's Next?
- We'll email you when we launch
- Get early access to all premium features  
- Exclusive discounts for early supporters
- Be part of shaping the future of AI-powered learning

Coming Features:
🧠 AI Quiz Generator
✨ Smart Flashcards
💬 PDF Chat Assistant
📄 AI Summaries
👥 Collaborative Study Rooms
⏱️ Pomodoro Timer

Stay connected:
Twitter: https://x.com/coursevaultapp
Instagram: https://www.instagram.com/coursevault.app/
TikTok: https://www.tiktok.com/@coursevaultapp

Made with passion for students everywhere
© 2026 CourseVault. All rights reserved.
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
    subject: '🚀 CourseVault is LIVE! Your Early Access is Ready',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CourseVault is Live!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header with gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold;">
                      🎉 We're Live!
                    </h1>
                  </td>
                </tr>
                
                <!-- Main content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 24px; font-weight: 600;">
                      CourseVault is officially here! 🚀
                    </h2>
                    
                    <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                      Thank you for your patience and support! As an early waitlist member, you now have <strong style="color: #10b981;">exclusive early access</strong> to all our features.
                    </p>
                    
                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="https://coursevault.app" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-size: 18px; font-weight: 600; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.4);">
                        🎓 Start Learning Now
                      </a>
                    </div>
                    
                    <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 8px;">
                      <p style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                        🎁 Your Early Bird Benefits:
                      </p>
                      <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 15px; line-height: 1.8;">
                        <li><strong>30-day FREE trial</strong> of all premium features</li>
                        <li><strong>50% discount</strong> on your first year subscription</li>
                        <li>Priority customer support</li>
                        <li>First access to new features and updates</li>
                        <li>Exclusive community access</li>
                      </ul>
                    </div>
                    
                    <div style="margin: 30px 0;">
                      <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; font-weight: 600;">
                        ✨ Now Available:
                      </h3>
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            🧠 AI Quiz Generator
                          </td>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            ✨ Smart Flashcards
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            💬 PDF Chat Assistant
                          </td>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            📄 AI-Powered Summaries
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            👥 Study Rooms
                          </td>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            ⏱️ Pomodoro Timer
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            🎯 Exam Mode
                          </td>
                          <td style="padding: 10px 0; color: #4b5563; font-size: 15px;">
                            🗺️ Mind Mapping
                          </td>
                        </tr>
                      </table>
                    </div>

                    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 8px;">
                      <p style="margin: 0; color: #92400e; font-size: 15px; line-height: 1.6;">
                        ⚡ <strong>Limited Time:</strong> Your discount code is waiting in your account dashboard. Sign up within the next 7 days to claim all your early bird benefits!
                      </p>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 15px;">
                        Questions? Need help getting started?
                      </p>
                      <p style="margin: 0; color: #4b5563; font-size: 15px;">
                        Reply to this email or reach out on social media:
                      </p>
                      <div style="margin-top: 15px;">
                        <a href="https://x.com/coursevaultapp" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-weight: 600;">Twitter</a>
                        <a href="https://www.instagram.com/coursevault.app/" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-weight: 600;">Instagram</a>
                        <a href="https://www.tiktok.com/@coursevaultapp" style="display: inline-block; margin: 0 10px; color: #667eea; text-decoration: none; font-weight: 600;">TikTok</a>
                      </div>
                    </div>

                    <div style="text-align: center; margin: 40px 0 20px 0;">
                      <p style="margin: 0; color: #1f2937; font-size: 18px; font-weight: 600;">
                        Let's revolutionize how you study! 📚✨
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                      Made with passion for students everywhere
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                      © 2026 CourseVault. All rights reserved.
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
🎉 CourseVault is LIVE! 🚀

Thank you for your patience and support! As an early waitlist member, you now have exclusive early access to all our features.

🎁 Your Early Bird Benefits:
- 30-day FREE trial of all premium features
- 50% discount on your first year subscription
- Priority customer support
- First access to new features and updates
- Exclusive community access

✨ Now Available:
🧠 AI Quiz Generator
✨ Smart Flashcards
💬 PDF Chat Assistant
📄 AI-Powered Summaries
👥 Study Rooms
⏱️ Pomodoro Timer
🎯 Exam Mode
🗺️ Mind Mapping

⚡ Limited Time: Your discount code is waiting in your account dashboard. Sign up within the next 7 days to claim all your early bird benefits!

👉 Get Started: https://coursevault.app

Questions? Reply to this email or reach out on social:
Twitter: https://x.com/coursevaultapp
Instagram: https://www.instagram.com/coursevault.app/
TikTok: https://www.tiktok.com/@coursevaultapp

Let's revolutionize how you study! 📚✨

Made with passion for students everywhere
© 2026 CourseVault. All rights reserved.
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