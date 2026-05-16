import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 });
    }

    const send = (payload: object) =>
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

    // Welcome email to subscriber
    await send({
      from: 'Senpai Spot <noreply@senpaispot.in>',
      to: [email],
      subject: 'Welcome to Senpai Spot! 🎌',
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0d0d0d;color:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1a0a00,#0d0d0d);padding:40px 32px 24px;border-bottom:1px solid rgba(255,122,0,0.2);">
            <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,122,0,0.7);">Senpai Spot</p>
            <h1 style="margin:0;font-size:28px;font-weight:900;color:#fff;">You're in. <span style="color:#ff7a00;">Welcome!</span></h1>
          </div>
          <div style="padding:32px;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.7;">
            <p>Hey there! Thanks for subscribing to <strong style="color:#fff;">Senpai Spot</strong> — your go-to source for anime news, reviews, manga updates, and everything in between.</p>
            <p>We'll keep you in the loop with fresh content as soon as it drops. No spam, ever.</p>
            <div style="margin:28px 0;">
              <a href="https://www.senpaispot.in" style="display:inline-block;background:#ff7a00;color:#111;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;letter-spacing:0.05em;">
                Visit Senpai Spot →
              </a>
            </div>
            <p style="font-size:13px;color:rgba(255,255,255,0.35);">If you didn't sign up for this, you can safely ignore this email.</p>
          </div>
        </div>
      `,
    });

    // Notification to owner
    await send({
      from: 'Senpai Spot <noreply@senpaispot.in>',
      to: ['contact@senpaispot.in'],
      subject: '📬 New subscriber on Senpai Spot',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
          <h2 style="color:#ff7a00;">New subscriber!</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p style="color:#666;font-size:13px;">Received via the Senpai Spot subscribe form.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Subscribe] Error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
