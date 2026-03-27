import Link from "next/link";
import Image from "next/image";
import { EventsList } from "./events-list";

const features = [
  {
    title: "Instant QR Tickets",
    description: "Generate unique, scannable QR codes for every attendee in seconds.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
      </svg>
    ),
  },
  {
    title: "Gate Validation",
    description: "Scan and validate from any device. One tap, verified.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Real-Time Sync",
    description: "Ticket status updates instantly across all connected devices.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Event Analytics",
    description: "Live dashboards with attendance rates and capacity data.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/qroud.png" alt="Qroud" width={28} height={28} className="rounded-sm" style={{ width: 'auto', height: '28px' }} />
            <span className="text-lg font-semibold tracking-tight text-white">Qroud</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/auth/login"
              id="nav-login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              id="nav-signup"
              className="rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:from-amber-400 hover:to-rose-400 hover:shadow-lg hover:shadow-amber-500/20"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero with animated background */}
        <section className="relative overflow-hidden min-h-[85vh] flex items-center">
          {/* Animated ambient orbs */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="mx-auto max-w-5xl px-6 py-24 text-center w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.06] px-4 py-1.5 mb-8 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-medium text-amber-300 tracking-wide">Now in beta</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Sell out your event{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400 bg-clip-text text-transparent">
                before doors open
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">
              Issue and validate QR-coded tickets in real time. No lines at the gate, no counterfeit tickets, no hassle.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                id="hero-cta"
                className="group w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:from-amber-400 hover:to-rose-400 hover:shadow-2xl hover:shadow-amber-500/25 hover:-translate-y-0.5"
              >
                Create Your First Event
                <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
              <Link
                href="/auth/login"
                id="hero-signin"
                className="w-full sm:w-auto rounded-xl border border-white/10 bg-white/[0.03] px-10 py-4 text-base font-medium text-white transition-all duration-200 hover:bg-white/[0.06] hover:border-white/16 text-center"
              >
                Sign In
              </Link>
            </div>

            <p className="mt-6 text-xs text-zinc-600">Free to start. No credit card required.</p>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold tracking-tight text-white">Everything you need at the gate</h2>
              <p className="mt-3 text-sm text-zinc-500 max-w-md mx-auto">From ticket issuance to real-time validation, in one platform.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-400 hover:bg-white/[0.05] hover:border-amber-500/15 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/[0.04]"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/15 to-rose-500/10 text-amber-400 transition-all duration-300 group-hover:from-amber-500/25 group-hover:to-rose-500/20 group-hover:text-amber-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-[15px] font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="border-t border-white/[0.06] bg-gradient-to-b from-transparent to-amber-950/[0.03]">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Upcoming Events
              </h2>
              <p className="mt-3 text-sm text-zinc-500">
                Browse live events and start issuing tickets today.
              </p>
            </div>
            <EventsList />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-white/[0.06] relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-amber-500/[0.06] blur-[120px]" />
          </div>
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to go digital?
            </h2>
            <p className="mt-4 text-zinc-400">
              Join hundreds of organizers who already trust Qroud for their events.
            </p>
            <Link
              href="/auth/signup"
              id="bottom-cta"
              className="group inline-block mt-8 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:from-amber-400 hover:to-rose-400 hover:shadow-2xl hover:shadow-amber-500/25 hover:-translate-y-0.5"
            >
              Get Started Free
              <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <Image src="/qroud.png" alt="Qroud" width={18} height={18} style={{ width: 'auto', height: '18px' }} />
            <p className="text-xs text-zinc-600">Qroud - Gabriel Mendoza</p>
          </div>
          <p className="text-xs text-zinc-700">Next.js + Supabase</p>
        </div>
      </footer>
    </div>
  );
}
