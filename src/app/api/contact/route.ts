import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  message: z.string().trim().min(5),
});

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { error: "Email is not configured." },
      { status: 500 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = schema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message } = result.data;
  const subject = `Contact form message from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(subject)}</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, sans-serif; color:#0b1d39;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px; background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 12px 30px rgba(0,0,0,0.08);">
                <tr>
                  <td style="background:#f5a524; padding:18px 28px;">
                    <p style="margin:0; font-size:14px; letter-spacing:2px; text-transform:uppercase; font-weight:700; color:#0b1d39;">
                      Prime Rent A Car Contact Request
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px;">
                    <h1 style="margin:0 0 10px; font-size:22px; line-height:1.3; color:#0b1d39;">
                      New contact message
                    </h1>
                    <p style="margin:0 0 20px; font-size:14px; color:#56657d;">
                      A new message was submitted from the contact form.
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e1e7f0; border-radius:14px; padding:16px; background:#f8fafd;">
                      <tr>
                        <td style="font-size:13px; color:#6d7a92; width:120px; padding-bottom:8px; font-weight:600;">
                          Name
                        </td>
                        <td style="font-size:14px; color:#0b1d39; padding-bottom:8px;">
                          ${escapeHtml(name)}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:13px; color:#6d7a92; width:120px; font-weight:600;">
                          Email
                        </td>
                        <td style="font-size:14px; color:#0b1d39;">
                          ${escapeHtml(email)}
                        </td>
                      </tr>
                    </table>
                    <div style="margin-top:18px;">
                      <p style="margin:0 0 8px; font-size:13px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#6d7a92;">
                        Message
                      </p>
                      <div style="background:#ffffff; border:1px solid #e1e7f0; border-radius:14px; padding:16px; font-size:14px; line-height:1.6; color:#0b1d39; white-space:pre-wrap;">
                        ${escapeHtml(message)}
                      </div>
                    </div>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;">
                      <tr>
                        <td>
                          <a href="mailto:${escapeHtml(email)}" style="display:inline-block; padding:12px 18px; background:#0b1d39; color:#ffffff; text-decoration:none; border-radius:999px; font-size:14px; font-weight:700;">
                            Reply to sender
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 28px; background:#f1f4f9; font-size:12px; color:#7b889f;">
                    This email was sent from the Prime Rent A Car contact form.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim();

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      reply_to: email,
      text,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const detail = await resendResponse.text().catch(() => "");
    console.error("Resend error:", resendResponse.status, detail);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
