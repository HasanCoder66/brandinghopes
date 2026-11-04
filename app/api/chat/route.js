import { rateLimit, clientIp } from "../../../lib/rateLimit";

export const runtime = "nodejs";

const SYSTEM = `You are the website assistant of BrandingHopes, a full stack software agency.
Services: full stack development (React, Node.js), custom software, SaaS products, business websites.

Language: reply in the same language and script the visitor uses (English, Urdu script, Roman Urdu, or any other). If they mix, mirror the mix.

Style: warm, confident, plain text only (no markdown, no lists). 2 to 4 short sentences.

Goal: help the visitor feel confident and move to a next step: a free quote through the form on this page, WhatsApp, or leaving their phone number in the chat.
- Answer their actual question first, then address the worry behind it (cost, time, quality, trust, support).
- End most replies with one clear, friendly next step. Do not nag or pressure.

Honesty rules (strict):
- Never invent prices, timelines, discounts, guarantees, years of experience, client names, numbers of projects or reviews.
- For cost or time questions say it depends on scope and that the team sends a fixed written quote within one working day, free of charge.
- Stay in your role. If asked something unrelated, answer briefly and steer back to their project.
- If they ask for a human, tell them to use the WhatsApp button or leave their number and the team will contact them.`;

export async function POST(req) {
  if (!rateLimit(clientIp(req), 20, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Server is not configured" },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim(),
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 600) }))
    .slice(-12);
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "No question" }, { status: 400 });
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.CLAUDE_MODEL || "claude-haiku-5-5",
        max_tokens: 400,
        system: SYSTEM,
        messages,
      }),
    });
    if (!r.ok) {
      console.error("Claude API error", r.status, await r.text());
      return Response.json({ error: "AI error" }, { status: 502 });
    }
    const data = await r.json();
    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return Response.json({
      reply:
        reply || "Please share your project idea and our team will help you.",
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "AI error" }, { status: 502 });
  }
}
