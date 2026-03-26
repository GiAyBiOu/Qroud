# Qroud

Digital ticket issuance and validation platform with QR codes for events. It allows organizers to generate unique entries, download or print them, and validate them at the door by scanning from any device with a camera, marking them as used in real time.

## Tech Stack

- Next.js (React, TypeScript)
- Supabase (PostgreSQL database, serverless functions, real-time subscriptions, authentication)
- Pino (structured logging)
- Zod (runtime validation)

## Service Type

REST API with the following endpoints:

- `GET /api/health` - Service health check
- `GET /api/tickets?event_id=<uuid>` - List tickets by event
- `POST /api/tickets` - Create a ticket
- `POST /api/validate` - Validate a ticket by QR code

## High-Level Requirements

1. **Ticket Generation** - Create unique QR-coded digital tickets tied to specific events, available for download or print.
2. **Real-Time Validation** - Scan and validate tickets at event entry using any device camera, updating their status instantly via Supabase real-time.
3. **Event Management** - Basic CRUD for events, with each event linked to its pool of generated tickets.

## Prerequisites

- Node.js 18+
- pnpm

## Environment Setup

1. Copy the environment template:
   ```sh
   cp web/.env.example web/.env.local
   ```
2. Fill in your Supabase credentials in `web/.env.local`.
3. To enable Google OAuth, configure the Google provider in your Supabase dashboard under Authentication > Providers.

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
    api/
      health/          Health check endpoint
      tickets/         Ticket CRUD endpoint
      validate/        Ticket validation endpoint
    auth/
      login/           Login page (Google + email)
      signup/          Sign-up page
      callback/        OAuth callback handler
  features/
    auth/              Auth service layer
    tickets/           Ticket service + data layers
    validate/          Validation service + data layers
  lib/
    supabase/          Supabase client factories
    config.ts          Centralized env config
    logger.ts          Pino logger instance
```

## License

CC BY-NC 4.0
