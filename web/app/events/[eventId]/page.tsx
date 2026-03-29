"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface EventDTO {
  id: string;
  name: string;
  date: string | null;
  time: string | null;
  venue: string | null;
  city: string | null;
  state: string | null;
  segment: string | null;
  genre: string | null;
  priceMin: number | null;
  priceMax: number | null;
  priceCurrency: string | null;
  image: string | null;
  info: string | null;
  url: string;
}

function formatDate(date: string | null): string {
  if (!date) return "TBA";
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(time: string | null): string {
  if (!time) return "";
  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

function formatPrice(min: number | null, max: number | null, currency: string | null): string {
  if (min === null) return "Free";
  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";
  if (max && max !== min) return `${sym}${min} - ${sym}${max}`;
  return `From ${sym}${min}`;
}

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const [event, setEvent] = useState<EventDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ticket form state
  const [email, setEmail] = useState("");
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketResult, setTicketResult] = useState<{ qr_data_url: string; id: string } | null>(null);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await fetch(`/api/v1/events/${eventId}`);
        const json = await res.json();
        if (json.data) {
          setEvent(json.data);
        } else {
          setError(json.errors?.[0]?.title ?? "Event not found");
        }
      } catch {
        setError("Could not load event details");
      } finally {
        setLoading(false);
      }
    }

    async function checkAuth() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        setIsLoggedIn(!!session);
      } catch {
        setIsLoggedIn(false);
      }
    }

    loadEvent();
    checkAuth();
  }, [eventId]);

  async function handleIssueTicket(e: React.FormEvent) {
    e.preventDefault();
    setTicketLoading(true);
    setTicketError(null);

    try {
      const res = await fetch("/api/v1/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_id: eventId, holder_email: email }),
      });
      const json = await res.json();

      if (res.ok && json.data) {
        setTicketResult(json.data);
      } else {
        setTicketError(json.errors?.[0]?.detail ?? json.errors?.[0]?.title ?? "Failed to issue ticket");
      }
    } catch {
      setTicketError("Connection error. Please try again.");
    } finally {
      setTicketLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="animate-pulse space-y-6 max-w-3xl w-full px-6">
          <div className="h-80 rounded-2xl bg-white/[0.04]" />
          <div className="h-8 w-2/3 rounded-lg bg-white/[0.06]" />
          <div className="h-4 w-1/3 rounded-lg bg-white/[0.04]" />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.04]">
            <svg className="h-8 w-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">Event Not Found</h1>
          <p className="text-sm text-zinc-500 mb-6">{error ?? "This event doesn't exist or is no longer available."}</p>
          <Link href="/" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
            &larr; Back to events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/qroud.png" alt="Qroud" width={28} height={28} className="rounded-sm" style={{ width: 'auto', height: '28px' }} />
            <span className="text-lg font-semibold tracking-tight text-white">Qroud</span>
          </Link>
          <nav className="flex items-center gap-3">
            {isLoggedIn ? (
              <span className="text-xs text-zinc-500">Signed in</span>
            ) : (
              <Link href="/auth/login" className="rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:from-amber-400 hover:to-rose-400">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="pt-20 pb-16">
        {/* Hero Image */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          {event.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-950/40 to-rose-950/40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center gap-2 mb-3">
                {event.genre && (
                  <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                    {event.genre}
                  </span>
                )}
                {event.segment && event.segment !== event.genre && (
                  <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
                    {event.segment}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{event.name}</h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 mt-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Event Details */}
            <div className="space-y-6">
              {/* Date & Venue Card */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{formatDate(event.date)}</p>
                    {event.time && <p className="text-xs text-zinc-500 mt-0.5">Doors at {formatTime(event.time)}</p>}
                  </div>
                </div>

                {event.venue && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{event.venue}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {event.city}{event.state ? `, ${event.state}` : ""}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{formatPrice(event.priceMin, event.priceMax, event.priceCurrency)}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Price range</p>
                  </div>
                </div>
              </div>

              {event.info && (
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <h2 className="text-sm font-semibold text-white mb-3">About This Event</h2>
                  <p className="text-sm leading-relaxed text-zinc-400">{event.info}</p>
                </div>
              )}

              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Back to all events
              </Link>
            </div>

            {/* Ticket Issuance Sidebar */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <h2 className="text-lg font-semibold text-white mb-1">Get Your Ticket</h2>
                <p className="text-xs text-zinc-500 mb-6">Issue a QR-coded ticket for this event</p>

                {ticketResult ? (
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-fit rounded-2xl bg-white p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ticketResult.qr_data_url} alt="QR Ticket" className="w-56 h-56" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-400">Ticket Issued</p>
                      <p className="text-xs text-zinc-500 mt-1 font-mono">{ticketResult.id}</p>
                    </div>
                    <button
                      onClick={() => { setTicketResult(null); setEmail(""); }}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all"
                    >
                      Issue Another
                    </button>
                  </div>
                ) : isLoggedIn ? (
                  <form onSubmit={handleIssueTicket} className="space-y-4">
                    <div>
                      <label htmlFor="holder-email" className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                        Attendee Email
                      </label>
                      <input
                        id="holder-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="attendee@email.com"
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/30"
                      />
                    </div>

                    {ticketError && (
                      <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
                        {ticketError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={ticketLoading}
                      className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:from-amber-400 hover:to-rose-400 hover:shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {ticketLoading ? "Generating..." : "Generate QR Ticket"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
                      <svg className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                    <p className="text-sm text-zinc-400">Sign in to issue tickets for this event</p>
                    <Link
                      href="/auth/login"
                      className="block w-full rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white text-center transition-all duration-200 hover:from-amber-400 hover:to-rose-400 hover:shadow-lg hover:shadow-amber-500/20"
                    >
                      Sign In to Continue
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
