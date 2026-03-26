import Link from "next/link";

const features = [
  {
    title: "Ticket Generation",
    description:
      "Create unique QR-coded digital tickets tied to specific events. Download or print them instantly.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
      </svg>
    ),
  },
  {
    title: "QR Validation",
    description:
      "Scan and validate tickets at the door from any device with a camera. Instant verification.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
      </svg>
    ),
  },
  {
    title: "Real-Time Sync",
    description:
      "Ticket status updates instantly across all devices via Supabase real-time subscriptions.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Qr<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">oud</span>
          </Link>
          <nav className="flex items-center gap-4">
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
              className="rounded-lg bg-white/[0.06] border border-white/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/[0.1] hover:border-white/20"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-20">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
            <div className="absolute top-1/3 left-1/3 h-[400px] w-[600px] rounded-full bg-cyan-600/[0.05] blur-[100px]" />
          </div>

          <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-zinc-400">
              Digital Ticket Platform for Events
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Tickets that{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                just work
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Generate unique QR-coded tickets, distribute them digitally, and validate at the door
              with a single scan. Real-time status updates powered by Supabase.
            </p>

            <div className="mt-12 flex items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                id="hero-cta"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:from-violet-500 hover:to-cyan-500 hover:shadow-xl hover:shadow-violet-500/20 hover:-translate-y-0.5"
              >
                Start for Free
              </Link>
              <Link
                href="/auth/login"
                id="hero-signin"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Everything you need
              </h2>
              <p className="mt-4 text-zinc-400">
                A complete toolkit for event ticket management, from creation to validation.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-xl hover:shadow-violet-500/[0.05] hover:-translate-y-1"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 text-violet-400 transition-colors duration-300 group-hover:text-cyan-400">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-6">
          <p className="text-xs text-zinc-600">
            Qroud - Gabriel Mendoza
          </p>
          <p className="text-xs text-zinc-600">
            Built with Next.js and Supabase
          </p>
        </div>
      </footer>
    </div>
  );
}
