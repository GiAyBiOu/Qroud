<div align="center">
  <img src="web/public/qroud.png" alt="Qroud Platform" width="200" style="border-radius: 20px;" />
</div>

# Qroud

Digital ticket issuance and validation platform with QR codes for live events. Users can browse public events from Ticketmaster, generate unique QR-coded tickets for authenticated attendees, and validate them at the door by scanning from any camera-equipped device.

## Tech Stack

- **Runtime**: Node.js 18+ (declared via `engines` in `package.json`)
- **Framework**: Next.js 16 (React 19, TypeScript)
- **Database & Auth**: Supabase (PostgreSQL + Auth with Google OAuth)
- **Logging**: Pino (structured JSON to stdout)
- **Validation**: Zod v4 (runtime schema validation)
- **Events Data**: Ticketmaster Discovery API (free tier, 5000 req/day)
- **Containerization**: Docker (multi-stage build)
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm
- A Supabase project (free tier) with the tickets table created
- A Ticketmaster API key (free)

### 1. Clone and Install

```sh
git clone https://github.com/GiAyBiOu/Qroud.git
cd Qroud/web
pnpm install
```

### 2. Configure Environment Variables

```sh
cp .env.example .env.local
```

Open `.env.local` and fill in your credentials:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL (Settings > API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase public/anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (keep secret) |
| `TICKETMASTER_API_KEY` | Yes | Ticketmaster Discovery API consumer key |
| `NODE_ENV` | No | `development` (default) or `production` |
| `PORT` | No | Server port, defaults to `3000` |
| `LOG_LEVEL` | No | Pino log level: `info` (default), `debug`, `warn`, `error` |

### 3. Run the Application

```sh
pnpm dev
```

The app will be available at `http://localhost:3000`.

## Operational Scripts

All commands run from the `web/` directory:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Create a production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript compiler checks (no emit) |
| `pnpm test` | Run test suite (placeholder) |
| `pnpm docker:build` | Build the Docker image |
| `pnpm docker:up` | Start the containerized service |
| `pnpm docker:down` | Stop and remove the containerized service |
| `pnpm release:bump` | Bump SemVer version via bash script |

## Docker

```sh
# Build and start from the root Qroud/ directory
docker compose -f docker/docker-compose.yml up --build

# Production mode with logging overrides
docker compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up --build

# Stop all services
docker compose -f docker/docker-compose.yml down
```

The `docker/` directory contains:

- `docker-compose.yml` — Base service configuration
- `docker-compose.prod.yml` — Production overrides (logging, restart policies)
- `docker-stack.yml` — Docker Swarm deployment (replicated mode)

## Vercel Deployment

1. Import the repository in [vercel.com](https://vercel.com).
2. Set the **Root Directory** to `web`.
3. Add all required environment variables in the Vercel project settings.
4. Deploy. Vercel handles the build and CDN automatically.

## Setup Guides

Detailed setup instructions are in the `docs/` folder:

- [Supabase Setup](docs/supabase-setup.md) — Database schema, environment variables, and RLS policies
- [Google OAuth Setup](docs/google-oauth-setup.md) — Enable "Sign in with Google" via Google Cloud Console
- [Ticketmaster Setup](docs/ticketmaster-setup.md) — Obtain a free API key for the events listing

## API Endpoints (v1)

All endpoints are versioned under `/api/v1`. Responses follow JSON:API specification.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Service health check |
| GET | `/api/v1/events` | List events (Ticketmaster proxy) |
| GET | `/api/v1/events/:id` | Single event details |
| GET | `/api/v1/tickets?event_id=<id>` | List tickets by event |
| POST | `/api/v1/tickets` | Issue a QR ticket (requires auth) |
| POST | `/api/v1/validate` | Validate a ticket by QR payload |

## Project Structure

```
Qroud/
  .github/workflows/             CI/CD pipelines (lint, build, release)
  docs/                          Setup guides
  docker/                        Container orchestration (Dev, Prod, Swarm)
  scripts/                       Administrative scripts (SemVer)
  web/
    Dockerfile                   Multi-stage production build
    .env.example                 Environment variable template
    package.json                 Operational scripts and dependencies
    lib/
      config.ts                  Centralized environment config
      logger.ts                  Pino logger with shutdown signal handling
    app/
      api/v1/
        health/                  Health check endpoint
        events/                  Events list + [eventId] detail
        tickets/                 Ticket CRUD endpoint
        validate/                Ticket validation endpoint
      auth/
        login/                   Login page (Google + email)
        signup/                  Sign-up page
        callback/                OAuth callback handler
      events/
        [eventId]/               Event detail page with ticket issuance
    features/
      auth/                      Auth service layer
      events/                    Events service (Ticketmaster integration)
      tickets/                   Ticket service + data + schema
      validate/                  Validation service + data + schema
```

## License

CC BY-NC 4.0
