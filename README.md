# Qroud

Digital ticket issuance and validation platform with QR codes for events. It allows organizers to generate unique entries, download or print them, and validate them at the door by scanning from any device with a camera, marking them as used in real time.

## Tech Stack

- Next.js (React, TypeScript)
- Supabase (PostgreSQL, serverless functions, real-time subscriptions, authentication)
- Pino (structured logging)
- Zod (runtime validation)
- Ticketmaster Discovery API (public event data)

## API Endpoints (v1)

All endpoints are versioned under `/api/v1`. Responses follow JSON:API specification.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Service health check |
| GET | `/api/v1/events` | List events from Ticketmaster |
| GET | `/api/v1/tickets?event_id=<uuid>` | List tickets by event |
| POST | `/api/v1/tickets` | Create a ticket |
| POST | `/api/v1/validate` | Validate a ticket by QR payload |

## High-Level Requirements

1. **Ticket Generation** - Create unique QR-coded digital tickets tied to specific events, available for download or print.
2. **Real-Time Validation** - Scan and validate tickets at event entry using any device camera, updating their status instantly via Supabase real-time.
3. **Event Management** - Basic CRUD for events, with each event linked to its pool of generated tickets.

## Prerequisites

- Node.js 18+
- pnpm
- A Supabase project
- A Ticketmaster Developer account (free)

## Environment Setup

1. Copy the environment template:
   ```sh
   cp web/.env.example web/.env.local
   ```
2. Fill in your credentials in `web/.env.local`:
   - **Supabase**: Get your URL, anon key, and service role key from your Supabase project dashboard under Settings > API.
   - **Ticketmaster**: Register at https://developer.ticketmaster.com/ and copy your Consumer Key.

## Supabase Database Setup

Run the following SQL in your Supabase SQL Editor (Dashboard > SQL Editor > New Query):

```sql
CREATE TABLE tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT NOT NULL,
  qr_payload UUID NOT NULL UNIQUE,
  holder_email TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'used', 'cancelled')),
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tickets_event_id ON tickets(event_id);
CREATE INDEX idx_tickets_qr_payload ON tickets(qr_payload);
```

## Google OAuth Setup

1. Go to your Supabase Dashboard > Authentication > Providers > Google.
2. Enable the Google provider.
3. Create OAuth credentials at https://console.cloud.google.com/apis/credentials.
4. Set the authorized redirect URI to:
   ```
   https://<your-project-ref>.supabase.co/auth/v1/callback
   ```
5. Copy the Client ID and Client Secret into the Supabase Google provider settings.

## Running Locally

```sh
cd web
pnpm install
pnpm dev
```

The server shall start on the port defined by the `PORT` environment variable (default: `3000`).

## Project Structure

```
web/
  app/
    api/v1/
      health/          Health check endpoint
      events/          Ticketmaster events proxy
      tickets/         Ticket CRUD endpoint
      validate/        Ticket validation endpoint
    auth/
      login/           Login page (Google + email)
      signup/          Sign-up page
      callback/        OAuth callback handler
  features/
    auth/              Auth service layer
    events/            Events service (Ticketmaster)
    tickets/           Ticket service + data + schema
    validate/          Validation service + data + schema
  lib/
    api/               Response DTOs, error handling, validation
    supabase/          Supabase client factories
    config.ts          Centralized env config
    logger.ts          Pino logger instance
```

## License

CC BY-NC 4.0
