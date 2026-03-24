# Qroud

Digital ticket issuance and validation platform with QR codes for events. It allows organizers to generate unique entries, download or print them, and validate them at the door by scanning from any device with a camera, marking them as used in real time.

## Tech Stack

- Next.js (React, TypeScript)
- Supabase (PostgreSQL database, serverless functions, real-time subscriptions, authentication)

## Service Type

REST API:

- `/health` - Service health check
- `/api/tickets` - Ticket generation and management
- `/api/validate` - QR-based ticket validation

## High-Level Requirements

1. **Ticket Generation** - Create unique QR-coded digital tickets tied to specific events, available for download or print.
2. **Real-Time Validation** - Scan and validate tickets at event entry using any device camera, updating their status instantly via Supabase real-time.
3. **Event Management** - Basic CRUD for events, with each event linked to its pool of generated tickets.
