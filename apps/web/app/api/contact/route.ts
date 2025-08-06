import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long')
})

export async function POST(req: NextRequest) {
  try {
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea;">
              <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0 0 20px 0; font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
              <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">Message:</p>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; line-height: 1.6; font-size: 14px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                This message was sent from the Dubhe website contact form
              </p>
            </div>
          </div>
        </div>
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">Thank you for reaching out!</h2>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; text-align: center;">
              <h3 style="color: #333; margin-top: 0;">Hi ${name}! 👋</h3>
              <p style="color: #666; line-height: 1.6; margin: 20px 0;">
                We've received your message about "<strong>${subject}</strong>" and will get back to you within 24-48 hours.
              </p>
              <p style="color: #666; line-height: 1.6;">
                Our team is excited to connect with you and discuss how we can help with your inquiry.
              </p>
              <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #28a745;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  <strong>What's next?</strong><br>
                  A member of our team will review your message and respond directly to this email address.
                </p>
              </div>
              <p style="color: #333; font-weight: bold; margin-bottom: 5px;">Best regards,</p>
              <p style="color: #667eea; font-weight: bold; margin: 0;">The Dubhe Team</p>
            </div>
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #6c757d; font-size: 12px;">
                This is an automated confirmation email from Dubhe Network
              </p>
            </div>
          </div>
        </div>
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