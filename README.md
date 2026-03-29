# Qroud

Digital ticket issuance and validation platform with QR codes for live events. Organizers can browse public events, generate unique QR-coded tickets, and validate them at the door by scanning from any camera-equipped device.

## Tech Stack

- **Runtime**: Node.js 18+ (declared via `engines` in `package.json`)
- **Framework**: Next.js 16 (React 19, TypeScript)
- **Database & Auth**: Supabase (PostgreSQL + Auth with Google OAuth)
- **Logging**: Pino (structured JSON to stdout)
- **Validation**: Zod v4 (runtime schema validation)
- **Events Data**: Ticketmaster Discovery API (free tier, 5000 req/day)
- **Containerization**: Docker (multi-stage build)

## Quick Start

```sh
cd web
cp .env.example .env.local   # Fill in your credentials
pnpm install
pnpm dev                     # Starts on PORT from .env (default 3000)
```

For Docker:

```sh
# Run from the root Qroud/ directory
docker compose -f docker/docker-compose.yml up --build
```

## Setup Guides

Detailed setup instructions are in the `docs/` folder:

- [Supabase Setup](docs/supabase-setup.md) - Database schema, environment variables, and RLS policies
- [Google OAuth Setup](docs/google-oauth-setup.md) - Enable "Sign in with Google" via Google Cloud Console
- [Ticketmaster Setup](docs/ticketmaster-setup.md) - Obtain a free API key for the events listing

## API Endpoints (v1)

All endpoints are versioned under `/api/v1`. Responses follow JSON:API specification.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Service health check |
| GET | `/api/v1/events` | List events (Ticketmaster proxy) |
| GET | `/api/v1/events/:id` | Single event details |
| GET | `/api/v1/tickets?event_id=<id>` | List tickets by event |
| POST | `/api/v1/tickets` | Issue a QR ticket |
| POST | `/api/v1/validate` | Validate a ticket by QR payload |

## Project Structure

```
Qroud/
  .github/                     CI/CD deployment pipelines
  docs/                        Setup guides
  docker/                      Container orchestration (Dev, Prod, Swarm)
  scripts/                     Administrative script wrappers (SemVer)
  web/
    Dockerfile                 Multi-stage production build
    .env.example               Environment variable template
    package.json               Contains "docker:build" and "docker:up" scripts
    app/
      api/v1/
        health/                Health check endpoint
        events/                Events list + [eventId] detail
        tickets/               Ticket CRUD endpoint
        validate/              Ticket validation endpoint
      auth/
        login/                 Login page (Google + email)
        signup/                Sign-up page
        callback/              OAuth callback handler
      events/
        [eventId]/             Event detail page with ticket issuance
    features/
      auth/                    Auth service layer
      events/                  Events service (Ticketmaster integration)
      tickets/                 Ticket service + data + schema
      validate/                Validation service + data + schema
    lib/
      api/                     Response DTOs, error handling, validation
      supabase/                Supabase client factories
      config.ts                Centralized environment config
      logger.ts                Pino logger instance (stdout)
```

## License

CC BY-NC 4.0
