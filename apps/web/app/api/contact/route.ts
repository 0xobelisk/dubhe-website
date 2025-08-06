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
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" lang="en">
        <head>
          <title>New Contact Form Submission - Dubhe</title>
          <meta property="og:title" content="New Contact Form Submission - Dubhe">
          <meta name="twitter:title" content="New Contact Form Submission - Dubhe">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style type="text/css">
            @media only screen and (max-width:639px) {
              img.stretch-on-mobile, .hs_rss_email_entries_table img, .hs-stretch-cta .hs-cta-img {
                height: auto !important;
                width: 100% !important
              }
              .display_block_on_small_screens {
                display: block
              }
              .hs_padded {
                padding-left: 20px !important;
                padding-right: 20px !important
              }
            }
            a {
              text-decoration: underline
            }
            p {
              margin: 0
            }
            body {
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              -webkit-font-smoothing: antialiased;
              moz-osx-font-smoothing: grayscale;
              margin: 0 !important;
              padding: 0 !important;
              font-family: Lato, Tahoma, sans-serif;
              font-size: 15px;
              color: #23496d;
              word-break: break-word
            }
            table {
              border-spacing: 0;
              mso-table-lspace: 0;
              mso-table-rspace: 0;
              border-collapse: collapse
            }
            img {
              -ms-interpolation-mode: bicubic
            }
            p, a, li, td, blockquote {
              mso-line-height-rule: exactly
            }
          </style>
        </head>
        <body id="hs_body" bgcolor="#eaf7ff" style="margin:0 !important; padding:0 !important; font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word">
          <div id="preview_text" style="display:none;font-size:1px;color:#eaf7ff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;" lang="en">
            New contact form submission from ${name}
          </div>
          
          <div class="hse-body-background" lang="en" style="background-color:#eaf7ff" bgcolor="#eaf7ff">
            <table role="presentation" class="hse-body-wrapper-table" cellpadding="0" cellspacing="0" style="margin:0; padding:0; width:100% !important; min-width:320px !important; height:100% !important" width="100%" height="100%">
              <tbody>
                <tr>
                  <td class="hse-body-wrapper-td" valign="top" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; padding-top:20px; padding-bottom:20px">
                    
                    <!-- Main Container -->
                    <div style="padding-left:10px; padding-right:10px">
                      <div style="min-width:280px; max-width:600px; margin-left:auto; margin-right:auto; background-color:#ffffff" bgcolor="#ffffff">
                        
                        <!-- Header with Logo -->
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td class="hs_padded" align="left" valign="top" style="font-family:Lato, Tahoma, sans-serif; color:#23496d; word-break:break-word; text-align:left; padding:20px; font-size:0px">
                                <a href="https://dubhe.obelisk.build" target="_blank" style="color:#6366f1">
                                  <img src="https://dubhe.obelisk.build/logo/white.png" alt="Dubhe" width="100" style="outline:none; text-decoration:none; border:none; max-width:100%; font-size:16px" align="middle">
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <!-- Main Content -->
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                          <tbody>
                            <tr>
                              <td class="hs_padded" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; padding:40px">
                                <p style="mso-line-height-rule:exactly; font-size:18px; line-height:125%; color:#1e293b; font-weight:bold; margin-bottom:20px;">New Contact Form Submission</p>
                                
                                <p style="mso-line-height-rule:exactly; font-size:15px; line-height:125%; margin-bottom:20px;">
                                  You have received a new message through the Dubhe website contact form.
                                </p>

                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                                  <p style="mso-line-height-rule:exactly; font-size:16px; line-height:125%; color:#1e293b; font-weight:bold; margin-bottom:15px;">Contact Details</p>
                                  <p style="mso-line-height-rule:exactly; font-size:15px; line-height:125%;"><strong>Name:</strong> ${name}</p>
                                  <p style="mso-line-height-rule:exactly; font-size:15px; line-height:125%;"><strong>Email:</strong> <span style="color:#6366f1">${email}</span></p>
                                  <p style="mso-line-height-rule:exactly; font-size:15px; line-height:125%;"><strong>Subject:</strong> ${subject}</p>
                                </div>

                                <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px;">
                                  <p style="mso-line-height-rule:exactly; font-size:16px; line-height:125%; color:#1e293b; font-weight:bold; margin-bottom:15px;">Message</p>
                                  <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #06b6d4; line-height: 1.6;">
                                    <p style="mso-line-height-rule:exactly; font-size:15px; line-height:150%; color:#374151; margin:0;">${message.replace(/\n/g, '<br>')}</p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <!-- Footer -->
                        <table role="presentation" class="hse-footer hse-secondary" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif; font-size:12px; line-height:135%; color:#23496d; margin-bottom:0; padding:0">
                          <tbody>
                            <tr>
                              <td align="center" valign="top" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; text-align:center; margin-bottom:0; line-height:135%; padding:10px 20px">
                                <p style="font-family:Arial, sans-serif;font-size:12px;font-weight:normal;text-decoration:none;font-style:normal;color:#23496d">
                                  Message sent from Dubhe Network contact form
                                </p>
                                <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px;">
                                  Received on ${new Date().toLocaleString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" lang="en">
        <head>
          <title>Thank you for contacting Dubhe</title>
          <meta property="og:title" content="Thank you for contacting Dubhe">
          <meta name="twitter:title" content="Thank you for contacting Dubhe">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style type="text/css">
            @media only screen and (max-width:639px) {
              img.stretch-on-mobile, .hs_rss_email_entries_table img, .hs-stretch-cta .hs-cta-img {
                height: auto !important;
                width: 100% !important
              }
              .display_block_on_small_screens {
                display: block
              }
              .hs_padded {
                padding-left: 20px !important;
                padding-right: 20px !important
              }
              .social-network-cell {
                display: inline-block
              }
            }
            a {
              text-decoration: underline
            }
            p {
              margin: 0
            }
            body {
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              -webkit-font-smoothing: antialiased;
              moz-osx-font-smoothing: grayscale;
              margin: 0 !important;
              padding: 0 !important;
              font-family: Lato, Tahoma, sans-serif;
              font-size: 15px;
              color: #23496d;
              word-break: break-word
            }
            table {
              border-spacing: 0;
              mso-table-lspace: 0;
              mso-table-rspace: 0;
              border-collapse: collapse
            }
            img {
              -ms-interpolation-mode: bicubic
            }
            p, a, li, td, blockquote {
              mso-line-height-rule: exactly
            }
          </style>
        </head>
        <body id="hs_body" bgcolor="#eaf7ff" style="margin:0 !important; padding:0 !important; font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word">
          <div id="preview_text" style="display:none;font-size:1px;color:#eaf7ff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;" lang="en">
            Thank you for contacting Dubhe! We'll get back to you within 24-48 hours.
          </div>
          
          <div class="hse-body-background" lang="en" style="background-color:#eaf7ff" bgcolor="#eaf7ff">
            <table role="presentation" class="hse-body-wrapper-table" cellpadding="0" cellspacing="0" style="margin:0; padding:0; width:100% !important; min-width:320px !important; height:100% !important" width="100%" height="100%">
              <tbody>
                <tr>
                  <td class="hse-body-wrapper-td" valign="top" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; padding-top:20px; padding-bottom:20px">
                    
                    <!-- Main Container -->
                    <div style="padding-left:10px; padding-right:10px">
                      <div style="min-width:280px; max-width:600px; margin-left:auto; margin-right:auto; background-color:#ffffff" bgcolor="#ffffff">
                        
                        <!-- Header with Logo -->
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td class="hs_padded" align="left" valign="top" style="font-family:Lato, Tahoma, sans-serif; color:#23496d; word-break:break-word; text-align:left; padding:20px; font-size:0px">
                                <a href="https://dubhe.obelisk.build" target="_blank" style="color:#6366f1">
                                  <img src="https://dubhe.obelisk.build/logo/white.png" alt="Dubhe" width="100" style="outline:none; text-decoration:none; border:none; max-width:100%; font-size:16px" align="middle">
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <!-- Main Content -->
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                          <tbody>
                            <tr>
                              <td class="hs_padded" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; padding:40px">
                                <p style="mso-line-height-rule:exactly; font-size:15px; line-height:125%">Hi ${name},</p>
                                <p style="mso-line-height-rule:exactly; font-size:14px; line-height:125%">&nbsp;</p>
                                <p style="mso-line-height-rule:exactly; font-size:15px; line-height:125%">
                                  Thank you for reaching out to us! We've received your message about "<strong>${subject}</strong>" and appreciate you taking the time to contact the Dubhe Foundation.
                                </p>
                                <p style="mso-line-height-rule:exactly; font-size:14px; line-height:125%">&nbsp;</p>
                                <p style="mso-line-height-rule:exactly; font-size:15px; line-height:125%">
                                  Our team will review your message and get back to you within 24-48 hours at <strong style="color:#6366f1">${email}</strong>.
                                </p>
                                <p style="mso-line-height-rule:exactly; font-size:15px; line-height:125%">&nbsp;</p>
                                <p style="mso-line-height-rule:exactly; font-size:15px; line-height:125%">
                                  <span style="font-weight: bold;">While you wait, feel free to explore:</span>
                                </p>
                                <p style="mso-line-height-rule:exactly; font-size:15px; line-height:125%">
                                  • Our <a href="https://dubhe-docs.obelisk.build/dubhe" style="color:#6366f1" target="_blank"><strong>Documentation</strong></a> to learn more about Dubhe<br>
                                  • Follow our progress on <a href="https://github.com/0xobelisk/dubhe" style="color:#6366f1" target="_blank"><strong>GitHub</strong></a>
                                </p>
                                <p style="mso-line-height-rule:exactly; line-height:125%">&nbsp;</p>
                                <p style="mso-line-height-rule:exactly; line-height:125%"><span style="font-size: 15px;">Thank you!&nbsp;</span></p>
                                <p style="mso-line-height-rule:exactly; line-height:125%"><span style="font-size: 15px;">The Dubhe Foundation</span></p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <!-- View in Browser Link -->
                        <div style="overflow:hidden">
                          <table role="presentation" class="hse-pre-header hse-secondary" width="100%" cellpadding="0" cellspacing="0" style="text-align:right; font-family:Arial, sans-serif; font-size:12px; line-height:135%; color:#23496d; margin-bottom:0; padding:0" align="right">
                            <tbody>
                              <tr>
                                <td align="center" valign="top" style="color:#23496d; word-break:break-word; text-align:center; font-family:Arial, sans-serif; font-size:12px; padding:10px 0; margin-bottom:0; line-height:135%">
                                  <a href="https://dubhe.obelisk.build" style="color:#6366f1; font-weight:normal; text-decoration:none; font-style:normal" target="_blank">View in browser</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <!-- Social Media Links -->
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                          <tbody>
                            <tr>
                              <td class="hs_padded" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; padding:10px 20px">
                                <table role="presentation" align="center" style="width: auto; text-align: center;">
                                  <tbody>
                                    <tr align="center">
                                      <!-- X (Twitter) -->
                                      <td class="social-network-cell" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; padding:8px 5px;">
                                        <a href="https://x.com/DubheEngine" style="color:#6366f1; text-decoration:none !important" target="_blank">
                                          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" height="25" style="outline:none; text-decoration:none; border:none; width:auto!important; height:25px!important; vertical-align:middle" valign="middle" width="auto">
                                        </a>
                                      </td>
                                      <!-- Discord -->
                                      <td class="social-network-cell" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; padding:8px 5px;">
                                        <a href="https://discord.gg/J76zPyGWau" style="color:#6366f1; text-decoration:none !important" target="_blank">
                                          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png" alt="Discord" height="25" style="outline:none; text-decoration:none; border:none; width:auto!important; height:25px!important; vertical-align:middle" valign="middle" width="auto">
                                        </a>
                                      </td>
                                      <!-- Telegram -->
                                      <td class="social-network-cell" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; padding:8px 5px;">
                                        <a href="https://t.me/dubheengine" style="color:#6366f1; text-decoration:none !important" target="_blank">
                                          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" alt="Telegram" height="25" style="outline:none; text-decoration:none; border:none; width:auto!important; height:25px!important; vertical-align:middle" valign="middle" width="auto">
                                        </a>
                                      </td>
                                      <!-- YouTube -->
                                      <td class="social-network-cell" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; padding:8px 5px;">
                                        <a href="https://www.youtube.com/@DubheEngine" style="color:#6366f1; text-decoration:none !important" target="_blank">
                                          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="Youtube" height="25" style="outline:none; text-decoration:none; border:none; width:auto!important; height:25px!important; vertical-align:middle" valign="middle" width="auto">
                                        </a>
                                      </td>
                                      <!-- GitHub -->
                                      <td class="social-network-cell" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; padding:8px 5px;">
                                        <a href="https://github.com/0xobelisk/dubhe" style="color:#6366f1; text-decoration:none !important" target="_blank">
                                          <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" height="25" style="outline:none; text-decoration:none; border:none; width:auto!important; height:25px!important; vertical-align:middle" valign="middle" width="auto">
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                        <!-- Footer -->
                        <table role="presentation" class="hse-footer hse-secondary" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif; font-size:12px; line-height:135%; color:#23496d; margin-bottom:0; padding:0">
                          <tbody>
                            <tr>
                              <td align="center" valign="top" style="font-family:Lato, Tahoma, sans-serif; font-size:15px; color:#23496d; word-break:break-word; text-align:center; margin-bottom:0; line-height:135%; padding:10px 20px">
                                <p style="font-family:Arial, sans-serif;font-size:12px;font-weight:normal;text-decoration:none;font-style:normal;color:#23496d">
                                  Dubhe Foundation, Building the future of Move development
                                </p>
                                <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 12px;">
                                  This is an automated confirmation from Dubhe Foundation
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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