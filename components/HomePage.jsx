"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/*
  BrandingHopes home page (client component).
  Forms post to /api/lead (email) and the chatbot talks to /api/chat (Claude).
*/
const FORM_ENDPOINT = "/api/lead";

/* EDIT THESE: your real contact details and social links */
const CONTACT = {
  whatsapp: "03170243866", // country code + number, no + or spaces
  phone: "+92 317 0243866",
  email: "hello@brandinghopes.com",
  address: "Karachi, Pakistan",
  hours: "Mon to Sat, 10am to 7pm",
  social: [
    { n: "Facebook", u: "https://facebook.com/brandinghopes" },
    { n: "Instagram", u: "https://instagram.com/brandinghopes" },
    { n: "LinkedIn", u: "https://linkedin.com/company/brandinghopes" },
    { n: "YouTube", u: "https://youtube.com/@brandinghopes" },
  ],
};
const WA = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello BrandingHopes, I would like a quote for my project.")}`;

const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on the features and size of your project. Send us your idea through the form and we reply within one working day with a clear, written quote. The quote is free.",
  },
  {
    q: "How long does it take to build a website or software?",
    a: "A business website usually takes a few weeks. Custom software and SaaS products are planned in phases. You get a timeline before we start and weekly progress updates after.",
  },
  {
    q: "Will I own the source code?",
    a: "Yes. When the project is delivered and paid for, the code and design files belong to you.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We deploy your product, monitor it and fix issues after go-live. We can also keep adding new features with you.",
  },
  {
    q: "Can you turn my idea into a SaaS product?",
    a: "Yes. We build user accounts, subscription plans, payments, admin dashboards and cloud hosting. Share your idea and we will suggest the smartest way to start.",
  },
  {
    q: "How do we communicate during the project?",
    a: "You get one point of contact, regular updates on WhatsApp or email, and a working demo to review every week.",
  },
];

const botQs = [
  {
    q: "How much will my project cost?",
    a: "Every project is different, so we do not guess numbers. Tell us your idea and we send a fixed written quote within one working day, free of charge.",
  },
  {
    q: "How long will it take?",
    a: "Websites usually take a few weeks, and bigger apps are planned in phases. Your quote includes a clear timeline and you get weekly progress updates.",
  },
  {
    q: "What if I do not like the design?",
    a: "You see the design before development starts, and we revise it until you approve. No surprises at the end.",
  },
  {
    q: "Will you support me after launch?",
    a: "Yes. We deploy, monitor and fix issues after go-live, and we can keep improving your product with you.",
  },
  {
    q: "Can you build my SaaS idea?",
    a: "Yes, it is one of our core services: login, plans, payments, admin panel and hosting. Share the idea and we will tell you the best way to start.",
  },
  {
    q: "Why choose BrandingHopes?",
    a: "One team handles design, development and launch, so nothing gets lost between vendors. You talk directly to the people who build your product.",
  },
];

const services = [
  {
    t: "Full stack development",
    d: "React, Node.js and database-backed products built end to end, from API to interface.",
  },
  {
    t: "Custom software",
    d: "Dashboards, portals and internal tools shaped around how your team actually works.",
  },
  {
    t: "Mobile applications",
    d: "Cross-platform iOS and Android apps built with React Native, delivering native performance and smooth UI.",
  },
  {
    t: "SaaS products",
    d: "Subscriptions, billing, multi-user accounts and admin panels, ready to launch and scale.",
  },
  {
    t: "Business websites",
    d: "Fast, search-friendly websites that explain what you do and turn visitors into enquiries.",
  },
];

const steps = [
  {
    t: "Tell us the goal",
    d: "Share your idea in the form. We reply within one working day.",
  },
  {
    t: "Plan and quote",
    d: "A short call, a clear scope, a fixed timeline and price.",
  },
  {
    t: "Design and build",
    d: "You see working progress every week, not a surprise at the end.",
  },
  {
    t: "Launch and support",
    d: "We deploy, monitor and keep improving after go-live.",
  },
];

/*
  SAMPLE CONTENT: replace project names, urls, images and reviews with your real ones.
  image: put a screenshot path (e.g. "/work/shop.jpg" inside your public folder). If empty, a placeholder shows.
*/
const works = [
  {
    name: "Retail store platform",
    type: "E-commerce website",
    tags: ["React", "Node.js", "Payments"],
    url: "https://example.com",
    image: "",
    tone: 0,
  },
  {
    name: "Property listing portal",
    type: "Custom web application",
    tags: ["React", "Search", "Admin"],
    url: "https://example.com",
    image: "",
    tone: 1,
  },
  {
    name: "Clinic booking system",
    type: "SaaS product",
    tags: ["SaaS", "Booking", "Dashboard"],
    url: "https://example.com",
    image: "",
    tone: 2,
  },
  {
    name: "Logistics tracking dashboard",
    type: "Custom software",
    tags: ["Node.js", "Maps", "Reports"],
    url: "https://example.com",
    image: "",
    tone: 1,
  },
  {
    name: "Restaurant ordering website",
    type: "Business website",
    tags: ["Website", "Orders", "SEO"],
    url: "https://example.com",
    image: "",
    tone: 2,
  },
  {
    name: "Online learning platform",
    type: "SaaS product",
    tags: ["React", "Video", "Subscriptions"],
    url: "https://example.com",
    image: "",
    tone: 0,
  },
];

const reviews = [
  {
    q: "They understood our idea quickly and delivered on the date they promised. Our customers now book online every day.",
    n: "Client name",
    r: "Founder, Company name",
  },
  {
    q: "Clear communication, weekly updates and a product that works exactly as we described. We will build our next project with them.",
    n: "Client name",
    r: "Director, Company name",
  },
  {
    q: "The website looks premium and the enquiries started coming in the first week after launch.",
    n: "Client name",
    r: "Owner, Company name",
  },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600&display=swap');
.bh{--navy:#14213d;--orange:#fca311;--white:#fff;--mute:#5b6580;font-family:'Figtree',system-ui,sans-serif;color:var(--navy);background:var(--white);line-height:1.6;overflow-x:hidden}
.bh *{box-sizing:border-box;margin:0}
.bh h1,.bh h2,.bh h3,.bh .logo{font-family:'Bricolage Grotesque',system-ui,sans-serif;letter-spacing:-.02em}
.bh a{color:inherit;text-decoration:none}
.bh :focus-visible{outline:3px solid var(--orange);outline-offset:3px}
.wrap{max-width:1160px;margin:0 auto;padding:0 24px}
.nav{background:var(--navy);color:var(--white)}
.nav .wrap{display:flex;align-items:center;justify-content:space-between;height:72px}
.logo{font-weight:800;font-size:1.4rem}
.logo b{color:var(--orange)}
.nav nav{display:flex;gap:28px;align-items:center;font-weight:500;font-size:.95rem}
.nav nav a:hover{color:var(--orange)}
.btn{display:inline-block;border:0;cursor:pointer;background:var(--orange);color:var(--navy);font:600 1rem 'Figtree',sans-serif;padding:14px 26px;border-radius:10px;transition:transform .15s,box-shadow .15s}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(252,163,17,.35)}
.btn.ghost{background:transparent;color:var(--white);border:2px solid rgba(255,255,255,.35)}
.btn.ghost:hover{border-color:var(--orange);box-shadow:none}
.hero{background:var(--navy);color:var(--white);padding:64px 0 96px;position:relative}
.hero::after{content:"";position:absolute;right:-120px;top:-120px;width:420px;height:420px;border-radius:50%;background:var(--orange);opacity:.12}
.hero .wrap{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center;position:relative;z-index:1}
.hero h1{font-size:clamp(2.4rem,5.2vw,4.1rem);line-height:1.05;font-weight:800}
.hero h1 span{color:var(--orange)}
.hero p.lead{font-size:1.15rem;color:#c9d0e0;margin:22px 0 32px;max-width:520px}
.hero .row{display:flex;gap:14px;flex-wrap:wrap}
.tags{display:flex;gap:10px;flex-wrap:wrap;margin-top:36px}
.tags li{list-style:none;border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:6px 14px;font-size:.88rem;color:#c9d0e0}
.card{background:var(--white);color:var(--navy);border-radius:18px;padding:32px;box-shadow:0 30px 70px rgba(0,0,0,.35);border-top:6px solid var(--orange)}
.card h2{font-size:1.5rem;margin-bottom:4px}
.card .sub{color:var(--mute);font-size:.95rem;margin-bottom:20px}
.card label{display:block;font-weight:600;font-size:.9rem;margin:14px 0 6px}
.card input,.card select,.card textarea{width:100%;font:inherit;padding:12px 14px;border:1.5px solid #d5d9e4;border-radius:10px;background:var(--white);color:var(--navy)}
.card input:focus,.card select:focus,.card textarea:focus{border-color:var(--orange);outline:none;box-shadow:0 0 0 3px rgba(252,163,17,.25)}
.card .two{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.card .btn{width:100%;margin-top:22px}
.card .btn:disabled{opacity:.6;cursor:wait}
.err{color:#b3261e;font-size:.9rem;margin-top:12px}
.ok{text-align:center;padding:24px 0}
.ok .tick{width:64px;height:64px;border-radius:50%;background:var(--orange);display:grid;place-items:center;margin:0 auto 18px;font-size:2rem;font-weight:800}
.sec{padding:96px 0}
.sec h2.title{font-size:clamp(1.9rem,3.6vw,2.8rem);line-height:1.1;max-width:640px;font-weight:800}
.sec p.intro{color:var(--mute);max-width:560px;margin:14px 0 48px;font-size:1.08rem}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.svc{padding:28px 24px;border-radius:16px;border:1.5px solid #e4e7ef;transition:border-color .2s,transform .2s}
.svc:hover{border-color:var(--orange);transform:translateY(-4px)}
.svc .ic{width:44px;height:44px;border-radius:12px;background:var(--navy);color:var(--orange);display:grid;place-items:center;font-weight:800;margin-bottom:18px}
.svc h3{font-size:1.2rem;margin-bottom:8px}
.svc p{color:var(--mute);font-size:.96rem}
.dark{background:var(--navy);color:var(--white)}
.dark p.intro{color:#c9d0e0}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;counter-reset:s}
.step{border-top:3px solid var(--orange);padding-top:18px}
.step::before{counter-increment:s;content:counter(s);font:800 2.4rem 'Bricolage Grotesque',sans-serif;color:var(--orange)}
.step h3{font-size:1.15rem;margin:6px 0 8px}
.step p{color:#c9d0e0;font-size:.95rem}
.saas{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.saas ul{list-style:none;padding:0;margin-top:20px;display:grid;gap:12px}
.saas li{padding-left:30px;position:relative;font-weight:500}
.saas li::before{content:"✓";position:absolute;left:0;color:var(--navy);background:var(--orange);width:20px;height:20px;border-radius:50%;font-size:.75rem;display:grid;place-items:center;top:3px}
.mock{background:var(--navy);border-radius:18px;padding:20px;box-shadow:0 24px 50px rgba(20,33,61,.25)}
.mock .bar{display:flex;gap:6px;margin-bottom:16px}
.mock .bar i{width:10px;height:10px;border-radius:50%;background:var(--orange);opacity:.8}
.mock .bars{display:flex;align-items:flex-end;gap:10px;height:150px}
.mock .bars i{flex:1;background:var(--orange);border-radius:6px 6px 0 0}
.mock .bars i:nth-child(odd){background:#fff;opacity:.9}
.mock .kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px}
.mock .kpis div{background:rgba(255,255,255,.08);border-radius:10px;height:46px}
.cta{background:var(--orange);text-align:center;padding:80px 0}
.cta h2{font-size:clamp(1.8rem,3.4vw,2.6rem);font-weight:800;max-width:700px;margin:0 auto 12px}
.cta p{margin-bottom:28px}
.cta .btn{background:var(--navy);color:var(--white)}
.foot{background:var(--navy);color:#c9d0e0;padding:36px 0;font-size:.92rem}
.foot .wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
@media(max-width:960px){
 .hero .wrap,.saas{grid-template-columns:1fr}
 .grid4,.steps{grid-template-columns:1fr 1fr}
 .nav nav a:not(.btn){display:none}
}
@media(max-width:560px){
 .grid4,.steps,.card .two{grid-template-columns:1fr}
 .sec{padding:64px 0}.card{padding:24px}
}
@media(prefers-reduced-motion:reduce){.bh *{transition:none!important}}

/* ---------- premium polish ---------- */
.nav{position:sticky;top:0;z-index:50;background:rgba(20,33,61,.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.08)}
.nav nav a:not(.btn){position:relative}
.nav nav a:not(.btn)::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:2px;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform .3s ease}
.nav nav a:not(.btn):hover::after{transform:scaleX(1)}
.hero{background:radial-gradient(900px 500px at 85% 10%,rgba(252,163,17,.16),transparent 60%),linear-gradient(160deg,#14213d 0%,#0d1730 100%);padding:88px 0 112px}
.hero::after{display:none}
.hero h1{font-size:clamp(2.6rem,5.6vw,4.6rem);line-height:1.02}
.hero .wrap>div:first-child{animation:rise .8s cubic-bezier(.2,.7,.2,1) both}
.hero .card{animation:rise .8s .18s cubic-bezier(.2,.7,.2,1) both}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.btn{position:relative;overflow:hidden;letter-spacing:.01em;box-shadow:0 4px 14px rgba(252,163,17,.25)}
.btn::after{content:"";position:absolute;top:0;left:-70%;width:50%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);transform:skewX(-20deg);transition:left .6s ease}
.btn:hover::after{left:130%}
.btn:active{transform:translateY(0)}
.card{box-shadow:0 40px 80px rgba(0,0,0,.4),0 0 0 1px rgba(255,255,255,.06)}
.tags li{transition:border-color .2s,color .2s}
.tags li:hover{border-color:var(--orange);color:var(--orange)}
.svc{position:relative;overflow:hidden;background:var(--white);transition:transform .3s ease,box-shadow .3s ease,border-color .3s}
.svc::after{content:"";position:absolute;left:0;bottom:0;height:4px;width:100%;background:var(--orange);transform:scaleX(0);transform-origin:left;transition:transform .35s ease}
.svc:hover{box-shadow:0 22px 44px rgba(20,33,61,.12)}
.svc:hover::after{transform:scaleX(1)}
.svc .ic{transition:background .3s,color .3s,transform .3s}
.svc:hover .ic{background:var(--orange);color:var(--navy);transform:rotate(-6deg) scale(1.05)}
.sec.soft{background:#f5f6fa}
.work{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.wcard{background:var(--white);border-radius:18px;overflow:hidden;border:1px solid #e4e7ef;transition:transform .35s ease,box-shadow .35s ease}
.wcard:hover{transform:translateY(-6px);box-shadow:0 28px 56px rgba(20,33,61,.16)}
.shot{position:relative;display:block;height:230px;overflow:hidden;background:var(--navy)}
.shot::before{content:"";position:absolute;inset:0 0 auto 0;height:26px;z-index:2;background:#0d1730 radial-gradient(circle at 14px 13px,#fca311 3px,transparent 4px),radial-gradient(circle at 28px 13px,#ffffff80 3px,transparent 4px),radial-gradient(circle at 42px 13px,#ffffff40 3px,transparent 4px)}
.shot img,.shot .ph{position:absolute;inset:26px 0 0 0;width:100%;height:calc(100% - 26px);object-fit:cover;object-position:top;transition:transform .7s ease}
.wcard:hover .shot img,.wcard:hover .shot .ph{transform:scale(1.06)}
.ph{display:grid;grid-template-columns:2fr 1fr;grid-template-rows:2fr 1fr;gap:10px;padding:18px;background:linear-gradient(135deg,#1d2f57,#14213d)}
.ph i{border-radius:8px;background:rgba(255,255,255,.12)}
.ph i:first-child{grid-row:1/3;background:linear-gradient(160deg,var(--orange),#e08e00)}
.ph.t1 i:first-child{background:linear-gradient(160deg,#fff,#d9deea)}
.ph.t2{background:linear-gradient(135deg,var(--orange),#e08e00)}
.ph.t2 i{background:rgba(20,33,61,.2)}
.ph.t2 i:first-child{background:var(--navy)}
.chip{position:absolute;z-index:3;left:50%;bottom:18px;transform:translate(-50%,16px);opacity:0;background:var(--orange);color:var(--navy);font-weight:600;font-size:.9rem;padding:10px 18px;border-radius:999px;transition:opacity .3s,transform .3s;white-space:nowrap}
.wcard:hover .chip,.shot:focus-visible .chip{opacity:1;transform:translate(-50%,0)}
.wbody{padding:22px 24px 26px}
.wbody h3{font-size:1.2rem}
.wbody p{color:var(--mute);font-size:.94rem;margin:2px 0 14px}
.wbody ul{list-style:none;padding:0;display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}
.wbody li{font-size:.8rem;font-weight:500;background:#eef0f6;border-radius:999px;padding:4px 12px}
.link{display:inline-flex;align-items:center;gap:8px;font-weight:600;border-bottom:2px solid var(--orange);padding-bottom:2px}
.link span{transition:transform .25s}
.link:hover span{transform:translateX(5px)}
.more{text-align:center;margin-top:48px}
.btn.navy{background:var(--navy);color:var(--white);box-shadow:none}
.revs{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.rev{position:relative;padding:34px 30px 30px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);transition:transform .3s,border-color .3s,background .3s}
.rev:hover{transform:translateY(-5px);border-color:var(--orange);background:rgba(255,255,255,.08)}
.rev::before{content:"“";position:absolute;top:6px;right:24px;font:800 5rem 'Bricolage Grotesque',serif;color:var(--orange);opacity:.35;line-height:1}
.stars{color:var(--orange);letter-spacing:3px;margin-bottom:14px}
.rev blockquote{font-size:1.04rem;color:#e6eaf3;margin-bottom:24px}
.who{display:flex;gap:14px;align-items:center}
.av{width:46px;height:46px;border-radius:50%;background:var(--orange);color:var(--navy);display:grid;place-items:center;font-weight:800}
.who b{display:block;line-height:1.2}
.who small{color:#aab3c8}
.rv{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}
.rv.in{opacity:1;transform:none}
@media(max-width:960px){.work,.revs{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.work,.revs{grid-template-columns:1fr}.shot{height:200px}}
@media(prefers-reduced-motion:reduce){.rv{opacity:1;transform:none}.hero .wrap>div:first-child,.hero .card{animation:none}}

/* ---------- faq, footer, floating buttons, chatbot ---------- */
.faq{max-width:820px;display:grid;gap:12px}
.fq{border:1.5px solid #e4e7ef;border-radius:14px;background:var(--white);transition:border-color .25s,box-shadow .25s}
.fq:hover,.fq.open{border-color:var(--orange)}
.fq.open{box-shadow:0 14px 32px rgba(20,33,61,.08)}
.fq button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;text-align:left;background:none;border:0;cursor:pointer;padding:20px 24px;font:600 1.05rem 'Bricolage Grotesque',sans-serif;color:var(--navy)}
.fq .pm{flex:none;width:30px;height:30px;border-radius:50%;background:#eef0f6;display:grid;place-items:center;font-size:1.2rem;transition:transform .3s,background .3s}
.fq.open .pm{transform:rotate(45deg);background:var(--orange)}
.fq .ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s ease}
.fq.open .ans{grid-template-rows:1fr}
.fq .ans div{overflow:hidden}
.fq .ans p{padding:0 24px 22px;color:var(--mute)}
.foot{padding:72px 0 28px;background:#0d1730}
.foot .wrap.ft{display:block}
.ft-grid{display:grid;grid-template-columns:1.5fr 1fr 1.2fr;gap:48px}
.foot h4{color:var(--white);font:700 1.05rem 'Bricolage Grotesque',sans-serif;margin-bottom:16px}
.foot p{max-width:340px}
.foot ul{list-style:none;padding:0;display:grid;gap:10px}
.foot li a{transition:color .2s}
.foot li a:hover{color:var(--orange)}
.soc{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
.soc a{border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:7px 16px;font-size:.88rem;transition:background .25s,color .25s,border-color .25s,transform .25s}
.soc a:hover{background:var(--orange);color:var(--navy);border-color:var(--orange);transform:translateY(-2px)}
.ft-bot{margin-top:48px;padding-top:22px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:.88rem}
.fabs{position:fixed;right:20px;bottom:20px;z-index:90;display:flex;flex-direction:column;align-items:center;gap:12px}
.fab{width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;box-shadow:0 10px 26px rgba(0,0,0,.28);transition:transform .25s,box-shadow .25s,opacity .3s}
.fab:hover{transform:translateY(-3px) scale(1.06)}
.fab.wa{background:#25d366}
.fab.chat{background:var(--orange);color:var(--navy);position:relative}
.fab.chat::after{content:"";position:absolute;top:4px;right:4px;width:12px;height:12px;border-radius:50%;background:#e63946;border:2px solid var(--orange)}
.fab.up{width:44px;height:44px;background:var(--navy);color:var(--orange);font-size:1.2rem;font-weight:700;opacity:0;pointer-events:none;transform:translateY(8px)}
.fab.up.show{opacity:1;pointer-events:auto;transform:none}
.cb{position:fixed;right:20px;bottom:104px;z-index:95;width:370px;max-width:calc(100vw - 40px);height:min(560px,calc(100vh - 140px));background:var(--white);border-radius:20px;box-shadow:0 30px 80px rgba(13,23,48,.4);display:flex;flex-direction:column;overflow:hidden;animation:rise .3s ease both}
.cb-h{background:var(--navy);color:var(--white);padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid var(--orange)}
.cb-h b{display:block;font-family:'Bricolage Grotesque',sans-serif}
.cb-h small{color:#aab3c8}
.cb-h button{background:none;border:0;color:var(--white);font-size:1.4rem;cursor:pointer}
.cb-b{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:12px;background:#f5f6fa}
.msg{max-width:86%;padding:11px 15px;border-radius:16px;font-size:.94rem;line-height:1.5}
.msg.bot{background:var(--white);border:1px solid #e4e7ef;border-bottom-left-radius:4px;align-self:flex-start}
.msg.me{background:var(--navy);color:var(--white);border-bottom-right-radius:4px;align-self:flex-end}
.acts{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.acts a,.acts button{border:0;cursor:pointer;font:600 .84rem 'Figtree',sans-serif;padding:8px 14px;border-radius:999px;background:var(--orange);color:var(--navy)}
.acts a.g{background:#25d366;color:#fff}
.dots{display:flex;gap:4px;padding:4px 0}
.dots i{width:7px;height:7px;border-radius:50%;background:#9aa3ba;animation:blink 1s infinite}
.dots i:nth-child(2){animation-delay:.15s}.dots i:nth-child(3){animation-delay:.3s}
@keyframes blink{50%{opacity:.25}}
.chips{display:flex;gap:8px;flex-wrap:wrap;padding:12px 14px 0;background:var(--white);max-height:112px;overflow-y:auto}
.chips button{border:1.5px solid var(--navy);background:var(--white);color:var(--navy);border-radius:999px;padding:6px 12px;font:500 .82rem 'Figtree',sans-serif;cursor:pointer;transition:background .2s,color .2s}
.chips button:hover{background:var(--navy);color:var(--white)}
.cb-lead{display:flex;gap:8px;padding:12px 14px 0;background:var(--white)}
.cb-lead input,.cb-in input{flex:1;min-width:0;font:inherit;font-size:.9rem;padding:10px 12px;border:1.5px solid #d5d9e4;border-radius:10px}
.cb-lead input:focus,.cb-in input:focus{border-color:var(--orange);outline:none}
.cb-lead button,.cb-in button{border:0;border-radius:10px;background:var(--orange);color:var(--navy);font-weight:600;padding:0 14px;cursor:pointer}
.cb-in{display:flex;gap:8px;padding:12px 14px 14px;background:var(--white)}
.cb-note{padding:8px 14px 0;font-size:.82rem;color:var(--mute);background:var(--white)}
@media(max-width:860px){.ft-grid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.ft-grid{grid-template-columns:1fr}.cb{right:12px;max-width:calc(100vw - 24px)}}
@media(prefers-reduced-motion:reduce){.fq .ans,.cb{transition:none;animation:none}.dots i{animation:none}}
`;

function LeadForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company_site")) return; // honeypot for bots
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        "Message was not sent. Check your internet connection and try again.",
      );
    }
  }

  if (status === "done") {
    return (
      <div className="card" id="lead-form">
        <div className="ok" role="status">
          <div className="tick">✓</div>
          <h2>Request received</h2>
          <p className="sub">
            Thank you. Our team will contact you within one working day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="card" id="lead-form" onSubmit={onSubmit}>
      <h2>Get a free project quote</h2>
      <p className="sub">Tell us what you need. No obligation.</p>
      <input
        type="hidden"
        name="_subject"
        value="New lead from BrandingHopes website"
      />
      <input
        type="text"
        name="company_site"
        tabIndex="-1"
        autoComplete="off"
        style={{ display: "none" }}
      />

      <label htmlFor="name">Full name</label>
      <input
        id="name"
        name="name"
        required
        placeholder="Your name"
        autoComplete="name"
      />

      <div className="two">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+92 300 0000000"
            autoComplete="tel"
          />
        </div>
      </div>

      <label htmlFor="service">What do you need?</label>
      <select id="service" name="service" required defaultValue="">
        <option value="" disabled>
          Select a service
        </option>
        <option>Full stack development</option>
        <option>Custom software development</option>
        <option>SaaS product</option>
        <option>Website</option>
        <option>Something else</option>
      </select>

      <label htmlFor="message">Project details</label>
      <textarea
        id="message"
        name="message"
        rows="3"
        required
        placeholder="Describe your idea, budget or deadline"
      />

      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my request"}
      </button>
      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {faqs.map((f, i) => (
        <div className={"fq" + (open === i ? " open" : "")} key={f.q}>
          <button
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            {f.q}
            <span className="pm" aria-hidden="true">
              +
            </span>
          </button>
          <div className="ans">
            <div>
              <p>{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const WaIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#fff"
      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"
    />
    <path
      fill="#25d366"
      d="M8.7 7.6c-.4 0-.8.2-1 .8-.4 1 0 2.4 1.5 4s3.200 2.600 4.400 2.800c.6.1 1.200-.3 1.400-.8l.2-.6c0-.2 0-.4-.2-.5l-1.600-.8c-.2-.1-.4 0-.5.1l-.6.7c-1-.4-2-1.400-2.400-2.300l.6-.6c.1-.1.2-.3.1-.5l-.7-1.600c-.1-.2-.3-.3-.5-.3z"
    />
  </svg>
);

function ChatBot({ toForm }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      from: "bot",
      t: "Assalam o Alaikum! I am the BrandingHopes assistant. Pick a question below or type your own.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [lead, setLead] = useState("idle");
  const end = useRef(null);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [msgs, typing, open]);

  function ask(q, a) {
    setMsgs((m) => [...m, { from: "me", t: q }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", t: a, cta: true }]);
    }, 700);
  }
  async function askAI(text) {
    const history = [...msgs, { from: "me", t: text }];
    setMsgs(history);
    setTyping(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({
            role: m.from === "me" ? "user" : "assistant",
            content: m.t,
          })),
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error();
      setMsgs((m) => [...m, { from: "bot", t: d.reply, cta: true }]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          t: "Sorry, I cannot reply right now. Please use WhatsApp or the quote form and our team will help you.",
          cta: true,
        },
      ]);
    } finally {
      setTyping(false);
    }
  }
  function send(e) {
    e.preventDefault();
    const t = input.trim();
    if (!t || typing) return;
    setInput("");
    askAI(t);
  }
  async function saveLead(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.append("_subject", "New lead from website chatbot");
    setLead("sending");
    try {
      const r = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (!r.ok) throw new Error();
      setLead("done");
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          t: "Thank you! We received your number and will contact you shortly.",
        },
      ]);
    } catch {
      setLead("error");
    }
  }
  const goQuote = (e) => {
    setOpen(false);
    toForm(e);
  };

  return (
    <>
      {open && (
        <section className="cb" aria-label="Chat with BrandingHopes">
          <div className="cb-h">
            <div>
              <b>BrandingHopes assistant</b>
              <small>Replies instantly</small>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>
          <div className="cb-b">
            {msgs.map((m, i) => (
              <div className={"msg " + m.from} key={i}>
                {m.t}
                {m.cta && (
                  <div className="acts">
                    <button onClick={goQuote}>Get free quote</button>
                    <a
                      className="g"
                      href={WA}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp us
                    </a>
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="msg bot">
                <div className="dots">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
            <div ref={end} />
          </div>
          <div className="chips">
            {botQs.map((b) => (
              <button key={b.q} onClick={() => ask(b.q, b.a)}>
                {b.q}
              </button>
            ))}
          </div>
          {msgs.length > 2 && lead !== "done" && (
            <>
              <p className="cb-note">Want us to call you? Leave your number.</p>
              <form className="cb-lead" onSubmit={saveLead}>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+92 300 0000000"
                  aria-label="Your phone number"
                />
                <button disabled={lead === "sending"}>
                  {lead === "sending" ? "..." : "Call me"}
                </button>
              </form>
              {lead === "error" && (
                <p className="cb-note" style={{ color: "#b3261e" }}>
                  Not sent. Please try again.
                </p>
              )}
            </>
          )}
          <form className="cb-in" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question"
              aria-label="Type your question"
            />
            <button>Send</button>
          </form>
        </section>
      )}
      <button
        className="fab chat"
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        </svg>
      </button>
    </>
  );
}

export default function HomePage() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(
      ".bh .svc,.bh .step,.bh .wcard,.bh .rev,.bh .fq,.bh .sec .title",
    );
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (list) =>
        list.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el, i) => {
      el.classList.add("rv");
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const toForm = (e) => {
    e.preventDefault();
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("name")?.focus({ preventScroll: true });
  };

  return (
    <div className="bh">
      <style>{css}</style>

      <header className="nav">
        <div className="wrap">
          <a className="logo" href="#top">
            Branding<b>Hopes</b>
          </a>
          <nav>
            <a href="#services">Services</a>
            <a href="#work">Our work</a>
            <Link href="/about">About</Link>
            <a href="#reviews">Reviews</a>
            <a href="#saas">SaaS</a>
            <a href="#process">Process</a>
            <a className="btn" href="#lead-form" onClick={toForm}>
              Get a quote
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="wrap">
          <div>
            <h1>
              We build the software your business <span>grows on.</span>
            </h1>
            <p className="lead">
              BrandingHopes is a full stack software agency. We design and
              develop custom applications, SaaS products and websites that bring
              you customers.
            </p>
            <div className="row">
              <a className="btn" href="#lead-form" onClick={toForm}>
                Start your project
              </a>
              <a className="btn ghost" href="#services">
                See what we build
              </a>
            </div>
            <ul className="tags">
              <li>React</li>
              <li>Node.js</li>
              <li>Custom development</li>
              <li>SaaS</li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="sec" id="services">
        <div className="wrap">
          <h2 className="title">
            Everything you need to go from idea to live product
          </h2>
          <p className="intro">
            One team handles design, development and launch, so nothing gets
            lost between vendors.
          </p>
          <div className="grid4">
            {services.map((s, i) => (
              <article className="svc" key={s.t}>
                <div className="ic">{["</>", "⚙","📱", "☁", "▣", ][i]}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec soft" id="work">
        <div className="wrap">
          <h2 className="title">Our work for clients</h2>
          <p className="intro">
            A few projects we have designed, built and launched. Open any of
            them to see it live.
          </p>
          <div className="work">
            {works.map((w) => (
              <article className="wcard" key={w.name}>
                <a
                  className="shot"
                  href={w.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${w.name} website`}
                >
                  {w.image ? (
                    <img
                      src={w.image}
                      alt={`${w.name} website screenshot`}
                      loading="lazy"
                    />
                  ) : (
                    <div className={`ph t${w.tone}`}>
                      <i />
                      <i />
                      <i />
                    </div>
                  )}
                  <span className="chip">Visit website ↗</span>
                </a>
                <div className="wbody">
                  <h3>{w.name}</h3>
                  <p>{w.type}</p>
                  <ul>
                    {w.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a
                    className="link"
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="more">
            <a className="btn navy" href="#lead-form" onClick={toForm}>
              Want a project like these?
            </a>
          </div>
        </div>
      </section>

      <section className="sec dark" id="process">
        <div className="wrap">
          <h2 className="title">How a project with us works</h2>
          <p className="intro">
            Four clear stages, so you always know what happens next.
          </p>
          <div className="steps">
            {steps.map((s) => (
              <div className="step" key={s.t}>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="saas">
        <div className="wrap saas">
          <div>
            <h2 className="title">
              Turn your idea into a SaaS product people pay for
            </h2>
            <p className="intro" style={{ marginBottom: 0 }}>
              We build the full product, not just a prototype.
            </p>
            <ul>
              <li>User accounts, roles and secure login</li>
              <li>Subscription plans and online payments</li>
              <li>Admin dashboard with reports</li>
              <li>Cloud hosting built to scale with you</li>
            </ul>
            <a
              className="btn"
              href="#lead-form"
              onClick={toForm}
              style={{ marginTop: 28 }}
            >
              Discuss your product
            </a>
          </div>
          <div className="mock" aria-hidden="true">
            <div className="bar">
              <i />
              <i />
              <i />
            </div>
            <div className="bars">
              {[38, 55, 46, 70, 62, 88, 100].map((h, i) => (
                <i key={i} style={{ height: h + "%" }} />
              ))}
            </div>
            <div className="kpis">
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </section>

      <section className="sec dark" id="reviews">
        <div className="wrap">
          <h2 className="title">What our clients say</h2>
          <p className="intro">
            Feedback from the businesses we have built for.
          </p>
          <div className="revs">
            {reviews.map((r, i) => (
              <figure className="rev" key={i}>
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote>{r.q}</blockquote>
                <figcaption className="who">
                  <span className="av">{r.n[0]}</span>
                  <span>
                    <b>{r.n}</b>
                    <small>{r.r}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="faq">
        <div className="wrap">
          <h2 className="title">Questions clients ask before they start</h2>
          <p className="intro">
            Cannot find your answer? Message us on WhatsApp or send the form.
          </p>
          <Faq />
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Ready to build something that brings in customers?</h2>
          <p>
            Send us your idea today and get a free quote within one working day.
          </p>
          <a className="btn" href="#lead-form" onClick={toForm}>
            Request a free quote
          </a>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap ft">
          <div className="ft-grid">
            <div>
              <a
                className="logo"
                href="#top"
                style={{ color: "#fff", fontSize: "1.6rem" }}
              >
                Branding<b>Hopes</b>
              </a>
              <p style={{ marginTop: 14 }}>
                A full stack software agency building custom software, SaaS
                products and websites that help businesses grow.
              </p>
              <div className="soc">
                {CONTACT.social.map((x) => (
                  <a
                    key={x.n}
                    href={x.u}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {x.n}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#work">Our work</a>
                </li>
                <li>
                  <a href="#process">Process</a>
                </li>
                <li>
                  <a href="#reviews">Reviews</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contact us</h4>
              <ul>
                <li>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </li>
                <li>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a href={WA} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </li>
                <li>{CONTACT.address}</li>
                <li>{CONTACT.hours}</li>
              </ul>
            </div>
          </div>
          <div className="ft-bot">
            <span>
              © {new Date().getFullYear()} BrandingHopes. All rights reserved.
            </span>
            <span>
              Full stack development · Custom software · SaaS · Websites
            </span>
          </div>
        </div>
      </footer>

      <div className="fabs">
        <button
          className={"fab up" + (showTop ? " show" : "")}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Go to top"
        >
          ↑
        </button>
        <a
          className="fab wa"
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <WaIcon />
        </a>
        <ChatBot toForm={toForm} />
      </div>
    </div>
  );
}
