// import nodemailer from "nodemailer";
// import { rateLimit, clientIp } from "../../../lib/rateLimit";

// export const runtime = "nodejs";

// const esc = (v) =>
//   String(v ?? "")
//     .slice(0, 2000)
//     .replace(
//       /[&<>"']/g,
//       (c) =>
//         ({
//           "&": "&amp;",
//           "<": "&lt;",
//           ">": "&gt;",
//           '"': "&quot;",
//           "'": "&#39;",
//         })[c],
//     );

// export async function POST(req) {
//   if (!rateLimit(clientIp(req), 5, 10 * 60_000)) {
//     return Response.json({ error: "Too many requests" }, { status: 429 });
//   }

//   let form;
//   try {
//     form = await req.formData();
//   } catch {
//     return Response.json({ error: "Bad request" }, { status: 400 });
//   }

//   const get = (k) => (form.get(k) || "").toString().trim();
//   if (get("company_site")) return Response.json({ ok: true }); // honeypot

//   const data = {
//     Name: get("name"),
//     Email: get("email"),
//     Phone: get("phone"),
//     Service: get("service"),
//     Details: get("message"),
//   };
//   if (!data.Phone && !data.Email)
//     return Response.json({ error: "Contact detail required" }, { status: 400 });

//   const subject = get("_subject") || "New lead from BrandingHopes website";
//   const rows = Object.entries(data)
//     .filter(([, v]) => v)
//     .map(
//       ([k, v]) =>
//         `<tr><td style="padding:6px 14px 6px 0"><b>${k}</b></td><td>${esc(v)}</td></tr>`,
//     )
//     .join("");

//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT || 465),
//       secure: Number(process.env.SMTP_PORT || 465) === 465,
//       auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
//     });
//     await transporter.sendMail({
//       from: `"BrandingHopes Website" <${process.env.SMTP_USER}>`,
//       to: process.env.LEAD_TO_EMAIL,
//       replyTo: data.Email || undefined,
//       subject,
//       html: `<h3>${esc(subject)}</h3><table>${rows}</table>`,
//     });
//     return Response.json({ ok: true });
//   } catch (err) {
//     console.error("Lead email failed", err);
//     return Response.json({ error: "Could not send" }, { status: 500 });
//   }
// }

























import nodemailer from "nodemailer";
import { FieldValue } from "firebase-admin/firestore";
import { rateLimit, clientIp } from "../../../lib/rateLimit";
import { db, dbReady } from "../../../lib/firebaseAdmin";

export const runtime = "nodejs";

const esc = (v) =>
  String(v ?? "")
    .slice(0, 2000)
    .replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

export async function POST(req) {
  if (!rateLimit(clientIp(req), 5, 10 * 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let form;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const get = (k, n = 2000) =>
    (form.get(k) || "").toString().trim().slice(0, n);
  if (get("company_site")) return Response.json({ ok: true }); // honeypot

  const lead = {
    name: get("name", 120),
    email: get("email", 200),
    phone: get("phone", 40),
    service: get("service", 120),
    message: get("message"),
  };
  if (!lead.phone && !lead.email)
    return Response.json({ error: "Contact detail required" }, { status: 400 });

  const subject = get("_subject", 200) || "New lead from BrandingHopes website";
  const source = /chatbot/i.test(subject) ? "chatbot" : "website form";

  // 1) save to database (never blocks the email)
  let saved = false;
  if (dbReady()) {
    try {
      await db()
        .collection("leads")
        .add({
          ...lead,
          source,
          status: "new",
          createdAt: FieldValue.serverTimestamp(),
        });
      saved = true;
    } catch (err) {
      console.error("Lead save failed", err);
    }
  } else {
    console.error("Firebase keys missing: lead not saved to database");
  }

  // 2) email
  const labels = {
    name: "Name",
    email: "Email",
    phone: "Phone",
    service: "Service",
    message: "Details",
  };
  const rows = Object.entries(lead)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0"><b>${labels[k]}</b></td><td>${esc(v)}</td></tr>`,
    )
    .join("");
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"BrandingHopes Website" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_TO_EMAIL,
      replyTo: lead.email || undefined,
      subject,
      html: `<h3>${esc(subject)}</h3><table>${rows}</table>`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Lead email failed", err);
    return saved
      ? Response.json({ ok: true })
      : Response.json({ error: "Could not send" }, { status: 500 });
  }
}
