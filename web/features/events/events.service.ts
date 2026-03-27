import logger from "@/lib/logger";

interface TicketmasterImage {
  url: string;
  width: number;
  height: number;
  ratio?: string;
  fallback?: boolean;
}

interface TicketmasterClassification {
  primary?: boolean;
  segment?: { id: string; name: string };
  genre?: { id: string; name: string };
  subGenre?: { id: string; name: string };
}

interface TicketmasterPriceRange {
  type: string;
  currency: string;
  min: number;
  max: number;
}

interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;
  dates?: {
    start?: {
      localDate?: string;
      localTime?: string;
    };
    status?: {
      code?: string;
    };
  };
  images?: TicketmasterImage[];
  classifications?: TicketmasterClassification[];
  priceRanges?: TicketmasterPriceRange[];
  _embedded?: {
    venues?: Array<{
      name: string;
      city?: { name: string };
      state?: { stateCode: string };
      country?: { name: string; countryCode: string };
    }>;
    attractions?: Array<{
      name: string;
    }>;
  };
}

export interface EventDTO {
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

const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

function pickBestImage(images?: TicketmasterImage[]): string | null {
  if (!images || images.length === 0) return null;

  const wide = images
    .filter((img) => img.ratio === "16_9" && !img.fallback)
    .sort((a, b) => b.width - a.width);

  if (wide.length > 0) {
    return wide.find((img) => img.width >= 640 && img.width <= 1200)?.url ?? wide[0].url;
  }

  const sorted = images
    .filter((img) => !img.fallback)
    .sort((a, b) => b.width - a.width);

  return sorted[0]?.url ?? images[0].url;
}

function toEventDTO(event: TicketmasterEvent): EventDTO {
  const venue = event._embedded?.venues?.[0];
  const classification = event.classifications?.find((c) => c.primary) ?? event.classifications?.[0];
  const price = event.priceRanges?.[0];

  return {
    id: event.id,
    name: event.name,
    date: event.dates?.start?.localDate ?? null,
    time: event.dates?.start?.localTime ?? null,
    venue: venue?.name ?? null,
    city: venue?.city?.name ?? null,
    state: venue?.state?.stateCode ?? null,
    segment: classification?.segment?.name ?? null,
    genre: classification?.genre?.name ?? null,
    priceMin: price?.min ?? null,
    priceMax: price?.max ?? null,
    priceCurrency: price?.currency ?? null,
    image: pickBestImage(event.images),
    url: event.url,
  };
}

export async function fetchEvents(params: {
  keyword?: string;
  city?: string;
  classificationName?: string;
  size?: number;
  page?: number;
}): Promise<{ events: EventDTO[]; total: number; totalPages: number }> {
  const apiKey = process.env.TICKETMASTER_API_KEY;

  if (!apiKey) {
    logger.warn("TICKETMASTER_API_KEY is not configured");
    return { events: [], total: 0, totalPages: 0 };
  }

  const url = new URL(BASE_URL);
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("size", String(params.size ?? 12));
  url.searchParams.set("page", String(params.page ?? 0));
  url.searchParams.set("sort", "date,asc");
  url.searchParams.set("classificationName", params.classificationName ?? "music");

  if (params.keyword) url.searchParams.set("keyword", params.keyword);
  if (params.city) url.searchParams.set("city", params.city);

  const response = await fetch(url.toString());

  if (!response.ok) {
    logger.error({ status: response.status }, "Ticketmaster API request failed");
    return { events: [], total: 0, totalPages: 0 };
  }

  const data = await response.json();
  const events: TicketmasterEvent[] = data._embedded?.events ?? [];
  const total = data.page?.totalElements ?? 0;
  const totalPages = data.page?.totalPages ?? 0;

  logger.info({ count: events.length, total, totalPages }, "Events fetched from Ticketmaster");

  return {
    events: events.map(toEventDTO),
    total,
    totalPages,
  };
}
