import Link from "next/link";
import { Header, Footer, chromeCss } from "./SiteChrome";
import { WA } from "../lib/site";

/* SAMPLE CONTENT: replace the names, roles, bios and photos with your real team.
   photo: put an image in /public/team/ and write "/team/name.jpg". Empty shows initials. */
const team = [
  {
    name: "Mukhtar Ahmed Alaziz",
    role: "Founder & CEO | Designer",
    bio: "Designs layouts that look premium and make it easy for visitors to take action.",
    photo: "",
    link: "https://linkedin.com",
  },
  {
    name: "Muhammad Hasan",
    role: "Co-Founder & Full Stack Developer",
    bio: "Co-founded BrandingHopes and leads the development of scalable, production-ready web and mobile solutions.",
    photo: "",
    link: "https://linkedin.com",
  },
  {
    name: "Rizwan Ahmed",
    role: "Lead full stack developer",
    bio: "Builds the React and Node.js products and keeps the code clean and fast.",
    photo: "",
    link: "https://linkedin.com",
  },
  {
    name: "Abdul Majeed",
    role: "Junior Developer",
    bio: "Builds responsive, user-friendly interfaces and supports the team in delivering quality web solutions.",
    photo: "",
    link: "https://linkedin.com",
  },
  {
    name: "Ahsan Ashraf",
    role: "Marketing & Sales",
    bio: "Builds client relationships, manages sales strategies, and keeps every project moving toward success.",
    photo: "",
    link: "https://linkedin.com",
  },

  {
    name: "Muhammad Sufiyan",
    role: "Project manager",
    bio: "Keeps every project on schedule and sends you clear weekly updates.",
    photo: "",
    link: "https://linkedin.com",
  },
  {
    name: "Muhammad Areeb",
    role: "Marketing & Sales",
    bio: "Keeps every project on schedule and sends you clear weekly updates.",
    photo: "",
    link: "https://linkedin.com",
  },

  {
    name: "Muhammad Abdullah",
    role: "Lead Generator",
    bio: "Identifies potential clients, builds valuable business connections, and creates new opportunities for growth.",
    photo: "",
    link: "https://linkedin.com",
  },

  // {
  //   name: "Muhammad Hamza",
  //   role: "SEO Developer",
  //   bio: "Optimizes websites for search engines, improves organic visibility, and drives sustainable online growth.",
  //   photo: "",
  //   link: "https://linkedin.com"
  // },
];

const values = [
  {
    t: "Honest quotes",
    d: "You get a clear written price and timeline before we start. No hidden extras.",
  },
  {
    t: "Clear communication",
    d: "One point of contact and regular updates on WhatsApp or email.",
  },
  {
    t: "Quality you can see",
    d: "Fast, secure and good-looking products that we are proud to put our name on.",
  },
  {
    t: "Support after launch",
    d: "We stay with you after go-live to fix, improve and grow your product.",
  },
];

const css = `
.ab-hero{background:radial-gradient(900px 500px at 85% 0%,rgba(252,163,17,.18),transparent 60%),linear-gradient(160deg,#14213d,#0d1730);color:var(--white);padding:96px 0 104px}
.ab-hero h1{font-size:clamp(2.4rem,5.2vw,4.2rem);line-height:1.05;font-weight:800;max-width:820px;animation:rise .8s cubic-bezier(.2,.7,.2,1) both}
.ab-hero p{font-size:1.15rem;color:#c9d0e0;max-width:620px;margin:22px 0 32px;animation:rise .8s .12s cubic-bezier(.2,.7,.2,1) both}
.ab-hero .row{display:flex;gap:14px;flex-wrap:wrap;animation:rise .8s .22s cubic-bezier(.2,.7,.2,1) both}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.btn.ghost{background:transparent;color:var(--white);border:2px solid rgba(255,255,255,.35);box-shadow:none}
.btn.ghost:hover{border-color:var(--orange)}
.sec{padding:96px 0}.sec.soft{background:#f5f6fa}
.title{font-size:clamp(1.9rem,3.6vw,2.8rem);line-height:1.1;font-weight:800;max-width:660px}
.intro{color:var(--mute);max-width:600px;margin:14px 0 48px;font-size:1.08rem}
.who{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
.who p{color:var(--mute);font-size:1.05rem;margin-bottom:16px}
.who ul{list-style:none;padding:0;display:grid;gap:12px;margin-top:8px}
.who li{padding-left:30px;position:relative;font-weight:500}
.who li::before{content:"✓";position:absolute;left:0;top:3px;width:20px;height:20px;border-radius:50%;background:var(--orange);display:grid;place-items:center;font-size:.75rem}
.vm{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.vm article{border-radius:20px;padding:44px 38px;transition:transform .3s,box-shadow .3s}
.vm article:hover{transform:translateY(-5px);box-shadow:0 26px 50px rgba(20,33,61,.18)}
.vm .v{background:var(--navy);color:var(--white)}
.vm .m{background:var(--orange);color:var(--navy)}
.vm h2{font-size:1.9rem;margin-bottom:14px}
.vm .v h2{color:var(--orange)}
.vm p{font-size:1.1rem;line-height:1.7}
.vm .v p{color:#d6dcea}
.vals{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.val{padding:28px 24px;border-radius:16px;border:1.5px solid #e4e7ef;background:var(--white);position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s,border-color .3s}
.val::after{content:"";position:absolute;left:0;bottom:0;height:4px;width:100%;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform .35s}
.val:hover{transform:translateY(-4px);border-color:var(--orange);box-shadow:0 22px 44px rgba(20,33,61,.12)}.val:hover::after{transform:scaleX(1)}
.val h3{font-size:1.2rem;margin-bottom:8px}.val p{color:var(--mute);font-size:.96rem}
.team{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.tm{background:var(--white);border:1px solid #e4e7ef;border-radius:18px;padding:32px 24px;text-align:center;transition:transform .3s,box-shadow .3s}
.tm:hover{transform:translateY(-6px);box-shadow:0 28px 56px rgba(20,33,61,.15)}
.av{width:104px;height:104px;border-radius:50%;margin:0 auto 18px;display:grid;place-items:center;overflow:hidden;background:linear-gradient(135deg,var(--navy),#2a3f6e);color:var(--orange);font:800 2rem 'Bricolage Grotesque',sans-serif;border:4px solid var(--orange);transition:transform .4s}
.tm:hover .av{transform:scale(1.06)}
.av img{width:100%;height:100%;object-fit:cover}
.tm h3{font-size:1.15rem}.tm .role{color:var(--orange);font-weight:600;font-size:.92rem;margin:2px 0 12px;filter:brightness(.82)}
.tm p{color:var(--mute);font-size:.94rem;margin-bottom:16px}
.tm a.in{display:inline-block;border:1.5px solid #d5d9e4;border-radius:999px;padding:5px 14px;font-size:.85rem;transition:all .25s}
.tm a.in:hover{background:var(--orange);border-color:var(--orange)}
.cta{background:var(--orange);text-align:center;padding:80px 0}
.cta h2{font-size:clamp(1.8rem,3.4vw,2.6rem);font-weight:800;max-width:700px;margin:0 auto 12px}
.cta p{margin-bottom:28px}
.cta .row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
@media(max-width:960px){.who,.vm{grid-template-columns:1fr}.vals,.team{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.vals,.team{grid-template-columns:1fr}.sec{padding:64px 0}.vm article{padding:32px 26px}}
`;

export default function AboutPage() {
  return (
    <div className="bh">
      <style>{chromeCss + css}</style>
      <Header active="about" />

      <section className="ab-hero">
        <div className="wrap">
          <h1>A software team that treats your business like its own.</h1>
          <p>
            BrandingHopes is a full stack software agency. We design and build
            custom software, SaaS products and websites for businesses that want
            to grow online.
          </p>
          <div className="row">
            <Link className="btn" href="/#lead-form">
              Start your project
            </Link>
            <a
              className="btn ghost"
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap who">
          <div>
            <h2 className="title">Who we are</h2>
          </div>
          <div>
            <p>
              We are a team of developers, designers and project managers. We
              work directly with business owners, so your idea reaches the
              people who build it without being lost on the way.
            </p>
            <p>
              Whether you need a website that brings enquiries, a tool that runs
              your daily work, or a SaaS product people pay for, we plan it,
              build it and launch it with you.
            </p>
            <ul>
              <li>Full stack development with React and Node.js</li>
              <li>Custom software and business tools</li>
              <li>SaaS products with accounts, plans and payments</li>
              <li>Premium websites built to turn visitors into leads</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec soft">
        <div className="wrap">
          <h2 className="title">Where we are going</h2>
          <p className="intro">
            The goals that guide every project we take on.
          </p>
          <div className="vm">
            <article className="v">
              <h2>Our vision</h2>
              <p>
                To become the most trusted software partner for growing
                businesses, turning ideas into digital products that last.
              </p>
            </article>
            <article className="m">
              <h2>Our mission</h2>
              <p>
                To deliver reliable custom software, SaaS products and websites
                with honest quotes, clear communication and support that
                continues after launch.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="title">How we work with you</h2>
          <p className="intro">Four promises we keep on every project.</p>
          <div className="vals">
            {values.map((v) => (
              <article className="val" key={v.t}>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec soft" id="team">
        <div className="wrap">
          <h2 className="title">Meet the team</h2>
          <p className="intro">
            The people who will plan, design and build your project.
          </p>
          <div className="team">
            {team.map((m, i) => (
              <article className="tm" key={i}>
                <div className="av">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} loading="lazy" />
                  ) : (
                    m.name.charAt(0)
                  )}
                </div>
                <h3>{m.name}</h3>
                <div className="role">{m.role}</div>
                <p>{m.bio}</p>
                {m.link && (
                  <a
                    className="in"
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Let us build something great together</h2>
          <p>Tell us your idea and get a free quote within one working day.</p>
          <div className="row">
            <Link className="btn navy" href="/#lead-form">
              Request a free quote
            </Link>
            <Link
              className="btn navy"
              href="/#work"
              style={{
                background: "transparent",
                color: "var(--navy)",
                border: "2px solid var(--navy)",
              }}
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
