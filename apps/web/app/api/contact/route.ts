import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder')

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long')
})

export async function POST(req: NextRequest) {
  try {
    // Check if API key is available at runtime
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'placeholder') {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json({ 
        error: 'Email service not configured. Please contact support.' 
      }, { status: 500 })
    }

    const body = await req.json()
    const validatedData = contactSchema.parse(body)
    const { name, email, subject, message } = validatedData

    // 发送邮件给团队
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'contact@noreply.obelisk.build',
      to: [process.env.RESEND_TO_EMAIL || 'team@dubhe.network'],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header with Dubhe Logo -->
            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%); padding: 32px 40px; text-align: center;">
              <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px 24px; display: inline-block; backdrop-filter: blur(10px);">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">
                  🌟 DUBHE
                </h1>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 4px 0 0 0; font-size: 14px; font-weight: 500;">
                  New Contact Form Submission
                </p>
              </div>
            </div>

            <!-- Content Body -->
            <div style="padding: 40px;">
              
              <!-- Contact Information Card -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
                  Contact Details
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 80px;">Name:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email:</td>
                    <td style="padding: 8px 0; color: #6366f1; font-weight: 600;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Subject:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${subject}</td>
                  </tr>
                </table>
              </div>

              <!-- Message Card -->
              <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 24px;">
                <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
                  📝 Message
                </h2>
                <div style="background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #06b6d4; line-height: 1.6; color: #374151; font-size: 15px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 40px; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                This message was sent from the 
                <strong style="color: #6366f1;">Dubhe Network</strong> contact form
              </p>
              <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 12px;">
                Received on ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ 
        error: 'Failed to send email',
        details: error.message 
      }, { status: 500 })
    }

    // 发送确认邮件给用户
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'contact@noreply.obelisk.build',
      to: email,
      subject: 'Thank you for contacting Dubhe',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting Dubhe</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header with Dubhe Logo -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%); padding: 32px 40px; text-align: center;">
              <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px 24px; display: inline-block; backdrop-filter: blur(10px);">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">
                  🌟 DUBHE
                </h1>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 4px 0 0 0; font-size: 14px; font-weight: 500;">
                  Thank you for reaching out!
                </p>
              </div>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px;">
              
              <!-- Greeting -->
              <div style="text-align: center; margin-bottom: 32px;">
                <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 28px; font-weight: 700;">
                  Hi ${name}! 👋
                </h2>
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0;">
                  We've received your message and appreciate you taking the time to contact us.
                </p>
              </div>

              <!-- Message Summary -->
              <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h3 style="color: #1e293b; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">
                  📋 Your Message Summary
                </h3>
                <p style="color: #64748b; margin: 0; font-size: 14px;">
                  <strong>Subject:</strong> ${subject}
                </p>
              </div>

              <!-- What's Next -->
              <div style="background: #f0fdf4; border: 1px solid #22c55e; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
                  ✅ What's Next?
                </h3>
                <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li style="margin-bottom: 8px;">Our team will review your message within 24-48 hours</li>
                  <li style="margin-bottom: 8px;">We'll respond directly to <strong style="color: #6366f1;">${email}</strong></li>
                  <li style="margin-bottom: 0;">You'll receive a personalized response based on your inquiry</li>
                </ul>
              </div>

              <!-- Call to Action -->
              <div style="text-align: center; padding: 20px; background: #fafafa; border-radius: 8px; border: 1px dashed #d1d5db;">
                <p style="color: #64748b; margin: 0 0 16px 0; font-size: 14px;">
                  While you wait, explore more about Dubhe:
                </p>
                <div style="display: inline-block;">
                  <a href="https://dubhe-docs.obelisk.build/dubhe" style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 500; font-size: 14px; margin: 0 8px;">
                    📚 Documentation
                  </a>
                  <a href="https://github.com/0xobelisk/dubhe" style="display: inline-block; background: linear-gradient(135deg, #374151, #4b5563); color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 500; font-size: 14px; margin: 0 8px;">
                    💻 GitHub
                  </a>
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 40px; text-align: center;">
              <p style="color: #1e293b; margin: 0 0 8px 0; font-weight: 600; font-size: 16px;">
                Best regards,
              </p>
              <p style="color: #6366f1; margin: 0 0 16px 0; font-weight: 700; font-size: 18px;">
                The Dubhe Team
              </p>
              <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 16px;">
                <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                  This is an automated confirmation from <strong>Dubhe Network</strong>
                </p>
                <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px;">
                  If you didn't send this message, please ignore this email.
                </p>
              </div>
            </div>

          </div>
        </body>
        </html>
      `
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      id: data?.id 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid input data',
        details: error.errors 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}