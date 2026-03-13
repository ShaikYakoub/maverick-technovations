"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { BUSINESS_DATA } from "@/lib/constants";

// ── Validation Schema ──────────────────────────────────────────────────────
const LeadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long.")
    .trim(),
  whatsapp: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  email: z
    .string()
    .email("Enter a valid email address.")
    .max(200, "Email is too long.")
    .toLowerCase()
    .trim(),
  intent: z.enum(["marketing", "training"], {
    errorMap: () => ({
      message: "Select whether you need Marketing or Training.",
    }),
  }),
  sourcePage: z.string().max(200).optional(),
  sourceCity: z.string().max(100).optional(),
});

type LeadInput = z.infer<typeof LeadSchema>;

export type LeadActionResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof LeadInput, string[]>>;
    };

// ── Rate Limiter (lazy-loaded, no-op if env vars absent) ──────────────────
async function checkRateLimit(ip: string): Promise<boolean> {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return true; // pass-through in local dev
  }

  const { Redis } = await import("@upstash/redis");
  const { Ratelimit } = await import("@upstash/ratelimit");

  const ratelimit = new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: true,
  });

  const { success } = await ratelimit.limit(ip);
  return success;
}

// ── WhatsApp Cloud API notification ───────────────────────────────────────
async function sendWhatsAppNotification(lead: LeadInput): Promise<void> {
  const { WHATSAPP_ACCESS_TOKEN: token, WHATSAPP_PHONE_NUMBER_ID: phoneId } =
    process.env;
  if (!token || !phoneId) return;

  const intentLabel =
    lead.intent === "marketing" ? "Digital Marketing" : "Academy Training";
  const source = lead.sourcePage ?? "website";

  await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: `91${BUSINESS_DATA.phone}`,
      type: "text",
      text: {
        body:
          `🚀 *New Lead — Mavericks Technovations*\n\n` +
          `👤 Name: ${lead.name}\n` +
          `📱 WhatsApp: ${lead.whatsapp}\n` +
          `📧 Email: ${lead.email}\n` +
          `🎯 Intent: ${intentLabel}\n` +
          `🔗 Source: ${source}`,
      },
    }),
  });
}

// ── Main Server Action ─────────────────────────────────────────────────────
export async function submitLead(formData: unknown): Promise<LeadActionResult> {
  // 1. Validate input — reject anything malformed before touching external services
  const parsed = LeadSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<
        Record<keyof LeadInput, string[]>
      >,
    };
  }

  const lead = parsed.data;

  // 2. Rate limiting — IP-based sliding window
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "anonymous";

  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return {
      success: false,
      error: "Too many submissions. Please wait a moment and try again.",
    };
  }

  // 3. Persist to Supabase (non-blocking on failure — notifications still fire)
  let dbSuccess = false;
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert({
      name: lead.name,
      whatsapp: lead.whatsapp,
      email: lead.email,
      intent: lead.intent,
      source_page: lead.sourcePage ?? null,
      source_city: lead.sourceCity ?? null,
    });
    if (!error) dbSuccess = true;
  } catch {
    // DB failure logged server-side; never leak stack traces to client
  }

  // 4. Email notification via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const intentLabel =
        lead.intent === "marketing" ? "Digital Marketing" : "Academy Training";

      await resend.emails.send({
        from: "leads@maverickstechnovations.com",
        to: BUSINESS_DATA.email,
        subject: `New Lead: ${lead.name} — ${intentLabel}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;background:#0a0a0a;color:#f5f5f5;padding:32px;border-radius:8px;border:1px solid #262626;">
            <div style="border-top:3px solid #FF5500;padding-top:20px;margin-bottom:24px;">
              <h2 style="color:#FF5500;margin:0 0 4px;font-size:20px;">New Lead Received</h2>
              <p style="color:#a3a3a3;margin:0;font-size:14px;">Mavericks Technovations CRM</p>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 12px;border:1px solid #262626;color:#a3a3a3;font-size:13px;width:120px;">Name</td><td style="padding:10px 12px;border:1px solid #262626;font-size:14px;">${lead.name}</td></tr>
              <tr><td style="padding:10px 12px;border:1px solid #262626;color:#a3a3a3;font-size:13px;">WhatsApp</td><td style="padding:10px 12px;border:1px solid #262626;font-size:14px;">${lead.whatsapp}</td></tr>
              <tr><td style="padding:10px 12px;border:1px solid #262626;color:#a3a3a3;font-size:13px;">Email</td><td style="padding:10px 12px;border:1px solid #262626;font-size:14px;">${lead.email}</td></tr>
              <tr><td style="padding:10px 12px;border:1px solid #262626;color:#a3a3a3;font-size:13px;">Intent</td><td style="padding:10px 12px;border:1px solid #262626;font-size:14px;color:#FF5500;font-weight:600;">${intentLabel}</td></tr>
              <tr><td style="padding:10px 12px;border:1px solid #262626;color:#a3a3a3;font-size:13px;">Source</td><td style="padding:10px 12px;border:1px solid #262626;font-size:14px;">${lead.sourcePage ?? "website"}</td></tr>
              ${lead.sourceCity ? `<tr><td style="padding:10px 12px;border:1px solid #262626;color:#a3a3a3;font-size:13px;">City</td><td style="padding:10px 12px;border:1px solid #262626;font-size:14px;">${lead.sourceCity}</td></tr>` : ""}
              <tr><td style="padding:10px 12px;border:1px solid #262626;color:#a3a3a3;font-size:13px;">Saved to DB</td><td style="padding:10px 12px;border:1px solid #262626;font-size:14px;">${dbSuccess ? "✓ Yes" : "✗ No (check Supabase)"}</td></tr>
            </table>
          </div>
        `,
      });
    } catch {
      // Email failure is non-critical
    }
  }

  // 5. WhatsApp real-time push notification
  try {
    await sendWhatsAppNotification(lead);
  } catch {
    // WhatsApp failure is non-critical
  }

  return { success: true };
}

// ── Analytics Event Tracker ────────────────────────────────────────────────
export async function trackEvent(
  eventName: string,
  properties: Record<string, unknown> = {},
): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.from("analytics_events").insert({
      event_name: eventName,
      properties,
    });
  } catch {
    // Analytics must never throw — silent failure is acceptable
  }
}
