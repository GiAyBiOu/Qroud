"use client";

import { useEffect, useState, useCallback } from "react";

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
  url: string;
}

function formatDate(date: string | null): string {
  if (!date) return "TBA";
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
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
  if (min === null) return "";
  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";
  if (max && max !== min) return `${sym}${min} - ${sym}${max}`;
  return `From ${sym}${min}`;
}

const PAGE_SIZE = 9;

export function EventsList() {
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [navigating, setNavigating] = useState(false);

  const fetchPage = useCallback(async (pageNum: number) => {
    setNavigating(true);

    try {
      const res = await fetch(`/api/v1/events?size=${PAGE_SIZE}&page=${pageNum}`);
      const json = await res.json();

      if (json.data) {
        setEvents(json.data);
        setTotal(json.meta?.total ?? 0);
        const pages = Math.ceil((json.meta?.total ?? 0) / PAGE_SIZE);
        setTotalPages(pages);
        setPage(pageNum);
      } else if (json.errors) {
        setError(json.errors[0]?.title ?? "Failed to load events");
      }
    } catch {
      setError("Could not connect to events service");
    } finally {
      setLoading(false);
      setNavigating(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(0);
  }, [fetchPage]);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
          >
            <div className="h-52 bg-white/[0.04]" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-4/5 rounded-lg bg-white/[0.06]" />
              <div className="h-3 w-3/5 rounded-lg bg-white/[0.04]" />
              <div className="h-3 w-2/5 rounded-lg bg-white/[0.04]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || events.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04]">
          <svg className="h-7 w-7 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <p className="text-sm text-zinc-500">
          {error ?? "No events available right now. Check back soon."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${navigating ? "opacity-50" : "opacity-100"}`}>
        {events.map((event) => (
          <a
            key={event.id}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-400 hover:bg-white/[0.05] hover:border-amber-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/[0.08]"
          >
            <div className="relative h-52 bg-zinc-900/50 overflow-hidden">
              {event.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={event.image}
                  alt={event.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-950/30 to-rose-950/30">
                  <svg className="h-12 w-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                  </svg>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {event.genre && (
                <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                  {event.genre}
                </span>
              )}

              {event.priceMin !== null && (
                <span className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] font-medium text-white">
                  {formatPrice(event.priceMin, event.priceMax, event.priceCurrency)}
                </span>
              )}
            </div>

            <div className="flex flex-col flex-1 p-5">
              <h3 className="mb-2 text-[15px] font-semibold text-white line-clamp-2 leading-snug group-hover:text-amber-200 transition-colors duration-300">
                {event.name}
              </h3>

              <div className="mt-auto space-y-1.5 pt-3 border-t border-white/[0.04]">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <svg className="h-3.5 w-3.5 text-amber-500/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span>{formatDate(event.date)}</span>
                  {event.time && <span className="text-zinc-600">·</span>}
                  {event.time && <span className="text-zinc-500">{formatTime(event.time)}</span>}
                </div>

                {event.venue && (
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <svg className="h-3.5 w-3.5 text-rose-500/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span className="truncate">
                      {event.venue}
                      {event.city ? `, ${event.city}` : ""}
                      {event.state ? ` ${event.state}` : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchPage(page - 1)}
            disabled={page === 0 || navigating}
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-all duration-200 hover:bg-white/[0.06] hover:border-amber-500/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.03] disabled:hover:border-white/[0.08] disabled:hover:text-zinc-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="flex items-center gap-1 px-2">
            {(() => {
              const maxVisible = 5;
              const half = Math.floor(maxVisible / 2);
              const cappedTotal = Math.min(totalPages, 100);
              let start = Math.max(0, page - half);
              let end = Math.min(cappedTotal, start + maxVisible);
              if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

              const buttons = [];
              for (let i = start; i < end; i++) {
                buttons.push(
                  <button
                    key={i}
                    onClick={() => fetchPage(i)}
                    disabled={navigating}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
                      i === page
                        ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/20"
                        : "border border-white/[0.06] bg-white/[0.02] text-zinc-500 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              }
              return buttons;
            })()}
          </div>

          <button
            onClick={() => fetchPage(page + 1)}
            disabled={page >= totalPages - 1 || navigating}
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition-all duration-200 hover:bg-white/[0.06] hover:border-amber-500/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.03] disabled:hover:border-white/[0.08] disabled:hover:text-zinc-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <p className="text-xs text-zinc-600">
          Page {page + 1} of {Math.min(totalPages, 100).toLocaleString()} · {total.toLocaleString()} events
        </p>
      </div>
    </>
  );
}
