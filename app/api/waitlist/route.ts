import { NextResponse } from "next/server"

// ─────────────────────────────────────────────────────────
//  NutriLife Waitlist API Route
//
//  Sends a notification email to the team whenever someone
//  signs up for the waitlist.
//
//  Required environment variable:
//    RESEND_API_KEY  →  get one free at https://resend.com
//
//  The email is sent from:
//    NutriLife Waitlist <onboarding@resend.dev>   (Resend default sender for free tier)
//
//  To use a custom "from" address (e.g. hello@nutrilife.ua),
//  verify your domain in the Resend dashboard and update FROM below.
// ─────────────────────────────────────────────────────────

const TO_EMAIL = "yurii.korenets@gmail.com"
const FROM_EMAIL = "NutriLife Waitlist <onboarding@resend.dev>"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Basic server-side validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      // If no API key is configured, log locally and return success
      // so the user still gets a clean UX. Replace this with an
      // error return if you want strict enforcement.
      console.warn("[Waitlist] RESEND_API_KEY is not set. Email not sent:", email)
      return NextResponse.json({ success: true })
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: "NutriLife — New Waitlist Signup",
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #2d6a2d; margin-bottom: 16px;">New Waitlist Signup</h2>
            <p style="color: #444; font-size: 15px; margin-bottom: 8px;">
              Someone signed up for early access to NutriLife:
            </p>
            <p style="font-size: 18px; font-weight: 600; color: #111; background: #f5f5f5; padding: 12px 16px; border-radius: 8px;">
              ${email}
            </p>
            <p style="color: #888; font-size: 13px; margin-top: 24px;">
              Signed up via nutrilife.ua waitlist form
            </p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[Waitlist] Resend API error:", error)
      return NextResponse.json(
        { error: "Failed to send. Please try again." },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[Waitlist] Unexpected error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
