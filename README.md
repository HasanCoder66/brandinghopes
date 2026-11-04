# BrandingHopes (Next.js full stack)

Home page + AI chatbot (Claude) + lead emails.

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values
3. `npm run dev` then open http://localhost:3000

## What is where
- `components/HomePage.jsx` the whole page (edit CONTACT, works, reviews, faqs at the top)
- `app/api/chat/route.js` chatbot server (edit the SYSTEM prompt to change how the bot talks and sells)
- `app/api/lead/route.js` sends form and chatbot leads to your email
- `lib/rateLimit.js` basic abuse protection

## Deploy (Vercel)
Push to GitHub, import the repo in Vercel, add the same variables from `.env.local` in Project Settings > Environment Variables, deploy.

## Notes
- The API key stays on the server and is never sent to the browser.
- Gmail needs 2-step verification and an App Password for SMTP_PASS.
- Chat costs credit per message. `claude-haiku-5-5` is the cheapest and fastest; set CLAUDE_MODEL to change it.
