import { db, requireAdmin, dbReady } from "../../../../lib/firebaseAdmin";

export const runtime = "nodejs";
const STATUSES = ["new", "contacted", "won", "lost"];
const deny = () => Response.json({ error: "Not allowed" }, { status: 403 });

export async function GET(req) {
  if (!(await requireAdmin(req))) return deny();
  if (!dbReady())
    return Response.json({ error: "Database not configured" }, { status: 500 });
  const snap = await db()
    .collection("leads")
    .orderBy("createdAt", "desc")
    .limit(500)
    .get();
  const leads = snap.docs.map((d) => {
    const x = d.data();
    return {
      id: d.id,
      ...x,
      createdAt: x.createdAt?.toDate?.().toISOString() || null,
    };
  });
  return Response.json({ leads });
}

export async function PATCH(req) {
  if (!(await requireAdmin(req))) return deny();
  const { id, status } = await req.json().catch(() => ({}));
  if (!id || !STATUSES.includes(status))
    return Response.json({ error: "Bad request" }, { status: 400 });
  await db().collection("leads").doc(String(id)).update({ status });
  return Response.json({ ok: true });
}

export async function DELETE(req) {
  if (!(await requireAdmin(req))) return deny();
  const { id } = await req.json().catch(() => ({}));
  if (!id) return Response.json({ error: "Bad request" }, { status: 400 });
  await db().collection("leads").doc(String(id)).delete();
  return Response.json({ ok: true });
}
