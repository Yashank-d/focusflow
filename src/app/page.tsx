import LoginButton from "@/components/LoginButton";
import Link from "next/link";

// ─── Feature data ────────────────────────────────────────────────────────────
const features = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
    label: "Client Management",
    title: "Every client, perfectly organised",
    description:
      "Add clients with a name and email. Every project auto-links back to them — no messy spreadsheets, no forgotten threads.",
    detail: [
      "Add / edit / delete clients",
      "Auto-link to projects",
      "See project count at a glance",
    ],
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
        />
      </svg>
    ),
    label: "Project Pipeline",
    title: "Track every shoot from booking to payment",
    description:
      "A clean status pipeline keeps you in control. Know exactly where every project stands — no more chasing up invoices.",
    detail: [
      "BOOKED → EDITING → FINALS READY → PAID",
      "Invoice amount per project",
      "Edit status in one click",
    ],
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    ),
    label: "Sneak Peek Gallery",
    title: "Tease the magic before delivery",
    description:
      "Share 3 sample shots on a stunning client preview page. The full gallery stays locked until payment is received.",
    detail: [
      "Public preview page per project",
      "3 sneak peek images",
      "Gallery locked until paid",
    ],
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        />
      </svg>
    ),
    label: "Razorpay Payments",
    title: "Get paid. Instantly unlock delivery.",
    description:
      "Clients pay via UPI, Card, Netbanking or Wallet. The moment payment clears, the Google Drive link auto-unlocks.",
    detail: [
      "UPI, Cards, EMI, Wallets",
      "Secure webhook verification",
      "Auto-unlocks gallery on payment",
    ],
  },
];

const steps = [
  {
    number: "01",
    title: "Add your client & create a project",
    description:
      "Enter the client's name, email, shoot title, and invoice amount. Takes under 30 seconds.",
  },
  {
    number: "02",
    title: "Upload sneak peeks & set delivery link",
    description:
      "Paste 3 sample image URLs and your Google Drive folder link. FocusFlow generates a beautiful preview page instantly.",
  },
  {
    number: "03",
    title: "Client pays → gallery unlocks automatically",
    description:
      "Share one link. Client sees the preview, pays via Razorpay, and the full gallery unlocks in real time.",
  },
];

const statuses = [
  { label: "BOOKED", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  {
    label: "EDITING",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  },
  {
    label: "FINALS READY",
    color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  {
    label: "PAID",
    color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function WelcomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-brand-bg text-white">
      {/* ── Global background effects ──────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Top glow */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-(image:--image-glow) opacity-80" />
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        {/* Radial fade at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-slate-950 to-transparent" />
      </div>

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="relative z-20 w-full px-6 md:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-sm font-serif">
            F
          </div>
          <span className="text-sm font-medium text-white/80 tracking-wide">
            FocusFlow
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[13px] text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors"
          >
            How it works
          </a>
          <a href="#payments" className="hover:text-white transition-colors">
            Payments
          </a>
        </nav>
        <LoginButton />
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 pt-20 pb-32 md:pt-28 md:pb-40">
        {/* Badge */}
        <div
          className="mb-7 animate-fade-in opacity-0"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] text-gray-400 tracking-[0.2em] uppercase backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live & production ready
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-transparent bg-clip-text bg-linear-to-b from-white via-white to-gray-500 mb-6 tracking-tight leading-[0.99] pb-7 animate-fade-in-up opacity-0 max-w-4xl"
          style={{ animationDelay: "0.2s" }}
        >
          Stop juggling.
          <br />
          <span className="italic">Start delivering.</span>
        </h1>

        {/* Sub */}
        <p
          className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-4 leading-relaxed font-light animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          FocusFlow is a studio management platform built for freelance
          photographers. Manage clients, track projects, share sneak peeks, and
          collect payments — in one clean dashboard.
        </p>
        <p
          className="text-xs text-gray-600 mb-10 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.45s" }}
        >
          Built with Next.js 14 · TypeScript · Prisma · Supabase · Razorpay
        </p>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.55s" }}
        >
          <LoginButton />
          <a
            href="#features"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group"
          >
            See how it works
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>

        <div
          className="relative mt-20 w-full max-w-5xl mx-auto animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.75s" }}
        >
          {/* Glow under the card */}
          <div className="absolute -inset-4 rounded-3xl bg-indigo-500/10 blur-2xl pointer-events-none" />
          <div className="relative rounded-2xl border border-white/[0.07] bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Fake title bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/6 bg-slate-950/60">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-4 text-[11px] text-gray-600 font-mono">
                focusflowproject.vercel.app/projects
              </span>
            </div>
            {/* Mock dashboard body */}
            <div className="flex">
              {/* Sidebar */}
              <aside className="hidden md:flex flex-col w-[140px] shrink-0 border-r border-white/6 bg-slate-950/40 px-4 py-5 gap-1">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-6 h-6 rounded bg-white/10 text-[10px] font-bold font-serif flex items-center justify-center">
                    F
                  </div>
                  <div>
                    <div className="text-[10px] text-white font-medium leading-none">
                      FocusFlow
                    </div>
                    <div className="text-[9px] text-gray-600 uppercase tracking-wide mt-0.5">
                      Studio
                    </div>
                  </div>
                </div>
                {["Projects", "Clients"].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] transition-colors ${i === 0 ? "bg-white/8 text-white border-l-2 border-indigo-400" : "text-gray-500"}`}
                  >
                    {i === 0 ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                        />
                      </svg>
                    )}
                    {item}
                  </div>
                ))}
              </aside>
              {/* Main content */}
              <div className="flex-1 min-w-0 p-3 md:p-5">
                {/* Header — stacks on mobile, row on md+ */}
                <div className="flex flex-col gap-2 mb-3 md:mb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-xs md:text-sm font-semibold text-white">
                      Projects
                    </h2>
                    <p className="text-[9px] md:text-[10px] text-gray-500 mt-0.5 leading-snug">
                      Manage active shoots, editing queues, and payments.
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <div className="px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-white/10 text-[9px] md:text-[10px] text-gray-300 bg-white/5 whitespace-nowrap">
                      + New Client
                    </div>
                    <div className="px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-white/10 text-[9px] md:text-[10px] text-gray-300 bg-white/5 whitespace-nowrap">
                      + New Project
                    </div>
                  </div>
                </div>
                {/* Cards — 1 col mobile, 2 col sm, 3 col md+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {[
                    {
                      title: "Portrait",
                      client: "Yashank D",
                      amount: "₹4,000",
                      status: "FINALS_READY",
                      statusColor:
                        "text-purple-400 bg-purple-400/10 border-purple-400/20",
                    },
                    {
                      title: "Fashion photography",
                      client: "Jhon",
                      amount: "₹50,000",
                      status: "BOOKED",
                      statusColor:
                        "text-blue-400 bg-blue-400/10 border-blue-400/20",
                    },
                    {
                      title: "Fashion Shoot",
                      client: "Test 1",
                      amount: "₹30,000",
                      status: "PAID",
                      statusColor:
                        "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
                    },
                  ].map((p) => (
                    <div
                      key={p.title}
                      className="rounded-xl border border-white/[0.07] bg-slate-800/40 p-2.5 md:p-3.5"
                    >
                      <div className="flex items-start justify-between gap-1 mb-1.5 md:mb-2">
                        <span className="text-[11px] font-medium text-white leading-tight truncate">
                          {p.title}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono shrink-0">
                          {p.amount}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-2 md:mb-3">
                        <div className="w-3 h-3 rounded-full bg-indigo-500/30 flex items-center justify-center shrink-0">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-2 h-2 text-indigo-300"
                          >
                            <path d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-gray-500 truncate">
                          {p.client}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${p.statusColor}`}
                      >
                        <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Status Pipeline strip ────────────────────────────────────────── */}
      <section className="relative z-10 py-6 border-y border-white/5 bg-white/2 overflow-hidden">
        <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap px-4">
          <span className="text-[11px] text-gray-600 uppercase tracking-widest mr-2">
            Project status
          </span>
          {statuses.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${s.color}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {s.label}
              </span>
              {i < statuses.length - 1 && (
                <svg
                  className="w-3 h-3 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section
        id="features"
        className="relative z-10 px-6 md:px-12 py-24 md:py-32 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-[11px] text-indigo-400 uppercase tracking-[0.2em] font-medium">
            Features
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-serif text-white leading-tight">
            Everything photographers <br className="hidden md:block" />
            <span className="italic text-gray-400">actually need</span>
          </h2>
          <p className="mt-4 text-sm text-gray-500 max-w-md mx-auto">
            No more juggling WhatsApp threads, Notion docs, Google Drive links,
            and separate payment requests. FocusFlow is your single source of
            truth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.label}
              className="group relative rounded-2xl border border-white/[0.07] bg-slate-900/50 hover:bg-slate-900/80 p-6 transition-all duration-300 hover:border-white/12"
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-indigo-300">
                    {f.icon}
                  </div>
                  <span className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-medium">
                    {f.label}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2 leading-snug">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {f.description}
                </p>
                <ul className="space-y-1.5">
                  {f.detail.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-[12px] text-gray-500"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="relative z-10 py-24 md:py-32 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[11px] text-indigo-400 uppercase tracking-[0.2em] font-medium">
              Workflow
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif text-white leading-tight">
              Shoot. Upload.{" "}
              <span className="italic text-gray-400">Get paid.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((s) => (
              <div key={s.number} className="relative">
                <div className="text-5xl font-serif text-white/18 font-bold leading-none mb-4 select-none">
                  {s.number}
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Portal / Payment feature ───────────────────────────────── */}
      <section
        id="payments"
        className="relative z-10 py-24 md:py-32 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <span className="text-[11px] text-indigo-400 uppercase tracking-[0.2em] font-medium">
                Client Portal
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-serif text-white leading-tight mb-4">
                A beautiful delivery <br />
                <span className="italic text-gray-400">
                  experience for clients
                </span>
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Each project gets its own public page at{" "}
                <code className="text-indigo-400 text-xs bg-indigo-400/10 px-1.5 py-0.5 rounded">
                  /client/[projectId]
                </code>
                . Your client sees the sneak peeks, the invoice, and a single
                pay button.
              </p>
              <ul className="space-y-3">
                {[
                  "Gallery stays locked until payment clears",
                  "Razorpay handles UPI, Cards, EMI, Netbanking & Wallets",
                  "Webhook verifies payment server-side — no client-side tricks",
                  "Drive link unlocks the moment payment is confirmed",
                  "Works on any device, no app needed",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-gray-400"
                  >
                    <svg
                      className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery preview mock */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-indigo-500/10 blur-3xl pointer-events-none" />
              <div className="relative rounded-2xl border border-white/[0.07] bg-slate-900/80 backdrop-blur-xl overflow-hidden">
                {/* Header */}
                <div className="px-6 pt-8 pb-4 text-center border-b border-white/6">
                  <span className="inline-block text-[9px] uppercase tracking-[0.2em] text-gray-500 border border-white/10 rounded-full px-3 py-1 mb-3">
                    Gallery Preview
                  </span>
                  <h3 className="text-2xl font-serif text-white">
                    Portrait Session
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Prepared for Yashank D
                  </p>
                </div>
                {/* Content */}
                <div className="p-5 flex gap-4">
                  {/* Sneak peek images */}
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2.5">
                      Sneak Peek
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="col-span-2 h-24 rounded-lg bg-slate-800 overflow-hidden">
                        <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-slate-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      {[1, 2].map((n) => (
                        <div
                          key={n}
                          className="h-16 rounded-lg bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center"
                        >
                          <svg
                            className="w-4 h-4 text-slate-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Payment card */}
                  <div className="w-40 shrink-0 rounded-xl border border-white/8 bg-slate-800/60 p-4 flex flex-col">
                    <div className="flex items-center gap-1.5 mb-3">
                      <svg
                        className="w-3 h-3 text-yellow-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <span className="text-[9px] text-yellow-400 uppercase tracking-wide font-semibold">
                        Gallery Locked
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed mb-4 flex-1">
                      Complete payment to unlock your full hi-res collection.
                    </p>
                    <div className="mb-3">
                      <p className="text-[9px] text-gray-600 uppercase tracking-wide">
                        Total Due
                      </p>
                      <p className="text-xl font-semibold text-white mt-0.5">
                        ₹4,000
                      </p>
                    </div>
                    <button className="w-full py-2 rounded-lg bg-white text-slate-950 text-[11px] font-semibold hover:bg-gray-100 transition-colors">
                      Pay Now to Unlock
                    </button>
                    <p className="text-[9px] text-gray-600 text-center mt-2">
                      Secured via Razorpay
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack strip ──────────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-white/5 py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] text-gray-600 uppercase tracking-[0.2em] mb-5">
            Built with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "Next.js 14",
              "TypeScript",
              "Tailwind CSS",
              "Prisma ORM",
              "PostgreSQL",
              "Supabase",
              "NextAuth.js",
              "Razorpay",
              "Vercel",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full border border-white/8 bg-white/3 text-[11px] text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 md:py-32 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl" />
          </div>
          <span className="text-[11px] text-indigo-400 uppercase tracking-[0.2em] font-medium">
            Free to use
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-serif text-white leading-tight mb-4">
            Ready to bring clarity <br />
            <span className="italic text-gray-400">to your studio?</span>
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Sign in with Google and create your first project in under 2
            minutes.
          </p>
          <LoginButton />
          <p className="mt-4 text-[11px] text-gray-600">
            No credit card required · Powered by Google Auth
          </p>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold text-xs font-serif">
              F
            </div>
            <span className="text-xs text-gray-500">FocusFlow</span>
            <span className="text-gray-700 text-xs mx-1">·</span>
            <span className="text-[11px] text-gray-700">
              © 2025 FocusFlow Inc.
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-gray-600">
            <a
              href="https://github.com/Yashank-d/focusflow"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors flex items-center gap-1.5"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
            <Link
              href="/api/auth/signin"
              className="hover:text-gray-400 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
