import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

export const dbReady = () => !!process.env.FIREBASE_CLIENT_EMAIL && !!process.env.FIREBASE_PRIVATE_KEY;

function app() {
  if (getApps().length) return getApps()[0];
  return initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    }),
  });
}

export const db = () => getFirestore(app());

// Returns the decoded token only if the caller is logged in as ADMIN_EMAIL.
export async function requireAdmin(req) {
  const h = req.headers.get("authorization") || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token || !process.env.ADMIN_EMAIL) return null;
  try {
    const d = await getAuth(app()).verifyIdToken(token);
    return d.email?.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() ? d : null;
  } catch { return null; }
}
