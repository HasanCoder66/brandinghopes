"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../lib/firebaseClient";

const STATUSES = ["new", "contacted", "won", "lost"];
const waLink = (p) => {
  let d = (p || "").replace(/\D/g, "");
  if (d.startsWith("0")) d = "92" + d.slice(1);
  return d ? `https://wa.me/${d}` : null;
};

async function api(method, body) {
  const token = await auth.currentUser.getIdToken();
  const r = await fetch("/api/admin/leads", {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (r.status === 403) throw new Error("denied");
  if (!r.ok) throw new Error("failed");
  return r.json();
}

export default function Admin() {
  const [user, setUser] = useState(undefined);
  const [leads, setLeads] = useState([]);
  const [msg, setMsg] = useState("");
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const load = useCallback(async () => {
    setLoading(true);
    setMsg("");
    try {
      setLeads((await api("GET")).leads);
    } catch (e) {
      if (e.message === "denied") {
        setMsg("This account is not allowed to view leads.");
        signOut(auth);
      } else
        setMsg("Could not load leads. Check the Firebase keys in .env.local.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  async function login(e) {
    e.preventDefault();
    setMsg("");
    const f = new FormData(e.currentTarget);
    try {
      await signInWithEmailAndPassword(auth, f.get("email"), f.get("password"));
    } catch {
      setMsg("Wrong email or password.");
    }
  }
  async function setStatus(id, status) {
    setLeads((l) => l.map((x) => (x.id === id ? { ...x, status } : x)));
    try {
      await api("PATCH", { id, status });
    } catch {
      load();
    }
  }
  async function remove(id) {
    if (!confirm("Delete this lead permanently?")) return;
    setLeads((l) => l.filter((x) => x.id !== id));
    try {
      await api("DELETE", { id });
    } catch {
      load();
    }
  }

  const shown = useMemo(
    () =>
      leads.filter(
        (l) =>
          (filter === "all" || l.status === filter) &&
          (!q ||
            [l.name, l.email, l.phone, l.service, l.message]
              .join(" ")
              .toLowerCase()
              .includes(q.toLowerCase())),
      ),
    [leads, filter, q],
  );
  const count = (s) => leads.filter((l) => l.status === s).length;

  if (user === undefined)
    return (
      <main className="ad">
        <style>{css}</style>
        <p className="mid">Loading…</p>
      </main>
    );

  if (!user)
    return (
      <main className="ad">
        <style>{css}</style>
        <form className="login" onSubmit={login}>
          <h1>
            Branding<b>Hopes</b> admin
          </h1>
          <label>
            Email
            <input name="email" type="email" required autoComplete="username" />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </label>
          <button className="btn">Log in</button>
          {msg && <p className="err">{msg}</p>}
        </form>
      </main>
    );

  return (
    <main className="ad">
      <style>{css}</style>
      <header className="top">
        <h1>
          Branding<b>Hopes</b> leads
        </h1>
        <div>
          <button className="ghost" onClick={load}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button className="ghost" onClick={() => signOut(auth)}>
            Log out
          </button>
        </div>
      </header>
      <section className="stats">
        <div>
          <b>{leads.length}</b>Total
        </div>
        {STATUSES.map((s) => (
          <div key={s}>
            <b>{count(s)}</b>
            {s}
          </div>
        ))}
      </section>
      <div className="bar">
        <input
          placeholder="Search name, phone, email or message"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      {msg && <p className="err">{msg}</p>}
      {!shown.length && !loading && <p className="mid">No leads here yet.</p>}
      <div className="list">
        {shown.map((l) => (
          <article className="lead" key={l.id}>
            <div className="l1">
              <div>
                <h3>{l.name || "Chatbot visitor"}</h3>
                <small>
                  {l.createdAt ? new Date(l.createdAt).toLocaleString() : ""} ·{" "}
                  {l.source}
                </small>
              </div>
              <select
                className={"st " + l.status}
                value={l.status || "new"}
                onChange={(e) => setStatus(l.id, e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            {l.service && (
              <p>
                <b>Service:</b> {l.service}
              </p>
            )}
            {l.message && <p className="msgp">{l.message}</p>}
            <div className="acts">
              {l.phone && <a href={`tel:${l.phone}`}>Call {l.phone}</a>}
              {waLink(l.phone) && (
                <a
                  className="wa"
                  href={waLink(l.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              )}
              {l.email && <a href={`mailto:${l.email}`}>{l.email}</a>}
              <button className="del" onClick={() => remove(l.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

const css = `
.ad{--navy:#14213d;--orange:#fca311;font-family:system-ui,sans-serif;background:#f5f6fa;min-height:100vh;padding:24px;color:var(--navy)}
.ad *{box-sizing:border-box}
.ad h1{font-size:1.4rem;margin:0}.ad h1 b{color:var(--orange)}
.mid{text-align:center;color:#5b6580;margin-top:60px}
.login{max-width:380px;margin:12vh auto;background:#fff;padding:32px;border-radius:16px;border-top:6px solid var(--orange);box-shadow:0 20px 50px rgba(20,33,61,.15);display:grid;gap:16px}
.login label{display:grid;gap:6px;font-weight:600;font-size:.9rem}
.ad input,.ad select{font:inherit;padding:10px 12px;border:1.5px solid #d5d9e4;border-radius:10px;background:#fff;color:var(--navy)}
.ad input:focus,.ad select:focus{border-color:var(--orange);outline:none}
.btn{background:var(--orange);color:var(--navy);border:0;border-radius:10px;padding:12px;font-weight:700;cursor:pointer}
.err{color:#b3261e;font-size:.9rem}
.top{display:flex;justify-content:space-between;align-items:center;max-width:1000px;margin:0 auto 20px;flex-wrap:wrap;gap:10px}
.ghost{background:#fff;border:1.5px solid var(--navy);color:var(--navy);border-radius:10px;padding:8px 14px;margin-left:8px;cursor:pointer;font-weight:600}
.stats,.bar,.list,.err{max-width:1000px;margin-left:auto;margin-right:auto}
.stats{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:18px}
.stats div{background:var(--navy);color:#c9d0e0;border-radius:12px;padding:14px;text-transform:capitalize;font-size:.85rem}
.stats b{display:block;color:var(--orange);font-size:1.7rem}
.bar{display:flex;gap:10px;margin-bottom:16px}.bar input{flex:1}
.list{display:grid;gap:14px}
.lead{background:#fff;border-radius:14px;padding:20px;border:1px solid #e4e7ef}
.l1{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
.lead h3{margin:0}.lead small{color:#5b6580}.lead p{margin:10px 0 0}
.msgp{background:#f5f6fa;border-radius:10px;padding:12px;white-space:pre-wrap}
.st{text-transform:capitalize;font-weight:600}.st.new{border-color:var(--orange)}.st.won{border-color:#2e9e5b}.st.lost{border-color:#b3261e}
.acts{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.acts a,.acts button{border:1.5px solid #d5d9e4;background:#fff;color:var(--navy);border-radius:999px;padding:6px 14px;font-size:.85rem;text-decoration:none;cursor:pointer}
.acts a:hover{border-color:var(--orange)}.acts .wa{background:#25d366;border-color:#25d366;color:#fff}
.acts .del{margin-left:auto;color:#b3261e}
@media(max-width:640px){.stats{grid-template-columns:repeat(2,1fr)}.bar{flex-direction:column}}
`;
