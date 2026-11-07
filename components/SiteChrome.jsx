import Link from "next/link";
import { CONTACT, WA } from "../lib/site";

export const chromeCss = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600&display=swap');
.bh{--navy:#14213d;--orange:#fca311;--white:#fff;--mute:#5b6580;font-family:'Figtree',system-ui,sans-serif;color:var(--navy);background:var(--white);line-height:1.6;overflow-x:hidden}
.bh *{box-sizing:border-box;margin:0}
.bh h1,.bh h2,.bh h3,.bh h4,.bh .logo{font-family:'Bricolage Grotesque',system-ui,sans-serif;letter-spacing:-.02em}
.bh a{color:inherit;text-decoration:none}
.bh :focus-visible{outline:3px solid var(--orange);outline-offset:3px}
.wrap{max-width:1160px;margin:0 auto;padding:0 24px}
.nav{position:sticky;top:0;z-index:50;background:rgba(20,33,61,.92);backdrop-filter:blur(12px);color:var(--white);border-bottom:1px solid rgba(255,255,255,.08)}
.nav .wrap{display:flex;align-items:center;justify-content:space-between;height:72px}
.logo{font-weight:800;font-size:1.4rem}.logo b{color:var(--orange)}
.nav nav{display:flex;gap:28px;align-items:center;font-weight:500;font-size:.95rem}
.nav nav a:not(.btn){position:relative}
.nav nav a:not(.btn)::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:2px;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform .3s}
.nav nav a:not(.btn):hover::after,.nav nav a.on::after{transform:scaleX(1)}
.btn{position:relative;overflow:hidden;display:inline-block;border:0;cursor:pointer;background:var(--orange);color:var(--navy);font:600 1rem 'Figtree',sans-serif;padding:14px 26px;border-radius:10px;box-shadow:0 4px 14px rgba(252,163,17,.25);transition:transform .15s,box-shadow .15s}
.btn::after{content:"";position:absolute;top:0;left:-70%;width:50%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);transform:skewX(-20deg);transition:left .6s}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(252,163,17,.35)}.btn:hover::after{left:130%}
.btn.navy{background:var(--navy);color:var(--white);box-shadow:none}
.foot{background:#0d1730;color:#c9d0e0;padding:72px 0 28px;font-size:.92rem}
.foot h4{color:var(--white);font-size:1.05rem;margin-bottom:16px}
.foot p{max-width:340px}.foot ul{list-style:none;padding:0;display:grid;gap:10px}
.foot li a:hover{color:var(--orange)}
.ft-grid{display:grid;grid-template-columns:1.5fr 1fr 1.2fr;gap:48px}
.soc{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
.soc a{border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:7px 16px;font-size:.88rem;transition:all .25s}
.soc a:hover{background:var(--orange);color:var(--navy);border-color:var(--orange);transform:translateY(-2px)}
.ft-bot{margin-top:48px;padding-top:22px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:.88rem}
@media(max-width:960px){.nav nav a:not(.btn){display:none}.ft-grid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.ft-grid{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.bh *{transition:none!important;animation:none!important}}
`;

export function Header({ active }) {
  const on = (k) => (active === k ? "on" : undefined);
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="logo" href="/">Branding<b>Hopes</b></Link>
        <nav>
          <Link href="/#services">Services</Link>
          <Link href="/#work">Our work</Link>
          <Link className={on("about")} href="/about">About</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/#faq">FAQ</Link>
          <Link className="btn" href="/#lead-form">Get a quote</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="ft-grid">
          <div>
            <Link className="logo" href="/" style={{ color: "#fff", fontSize: "1.6rem" }}>Branding<b>Hopes</b></Link>
            <p style={{ marginTop: 14 }}>A full stack software agency building custom software, SaaS products and websites that help businesses grow.</p>
            <div className="soc">
              {CONTACT.social.map((x) => <a key={x.n} href={x.u} target="_blank" rel="noopener noreferrer">{x.n}</a>)}
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/#work">Our work</Link></li>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/#reviews">Reviews</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact us</h4>
            <ul>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a></li>
              <li><a href={WA} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>
              <li>{CONTACT.address}</li>
              <li>{CONTACT.hours}</li>
            </ul>
          </div>
        </div>
        <div className="ft-bot">
          <span>© {new Date().getFullYear()} BrandingHopes. All rights reserved.</span>
          <span>Full stack development · Custom software · SaaS · Websites · Mobile Applications</span>
        </div>
      </div>
    </footer>
  );
}
