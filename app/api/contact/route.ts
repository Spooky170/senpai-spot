import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    await resend.emails.send({
      from:     'onboarding@resend.dev',
      to:       'contact@senpaispot.in',
      reply_to: email,
      subject:  `[Senpai Spot] ${subject} — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#111;color:#f5f5f5;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#ff7a00,#e05500);padding:24px 32px;">
            <h1 style="margin:0;font-size:1.4rem;letter-spacing:0.1em;color:#fff;">SENPAI SPOT</h1>
            <p style="margin:4px 0 0;font-size:0.85rem;color:rgba(255,255,255,0.8);">New Contact Form Message</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.4);font-size:0.8rem;width:100px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#f5f5f5;font-size:0.9rem;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.4);font-size:0.8rem;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:0.9rem;"><a href="mailto:${email}" style="color:#ff7a00;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:0.8rem;">Subject</td>
                <td style="padding:10px 0;color:#f5f5f5;font-size:0.9rem;">${subject}</td>
              </tr>
            </table>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:20px;">
              <p style="margin:0 0 8px;color:rgba(255,255,255,0.4);font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
              <p style="margin:0;color:rgba(255,255,255,0.8);font-size:0.92rem;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>
            <p style="margin:24px 0 0;font-size:0.75rem;color:rgba(255,255,255,0.25);">
              Hit Reply to respond directly to ${name} at ${email}.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact] Error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
