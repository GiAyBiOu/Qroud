# Supabase Setup

This guide covers the database schema and project configuration required by Qroud.

## Prerequisites

- A Supabase project ([supabase.com](https://supabase.com) - free tier)

## Environment Variables

Copy these from your Supabase dashboard (**Settings > API**):

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` / `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key (keep secret) |

Paste them into `web/.env.local`.

## Database Schema

Run the following SQL in your Supabase SQL Editor (**Dashboard > SQL Editor > New Query**):

```sql
-- Tickets table: stores issued QR tickets
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT NOT NULL,
  qr_payload UUID NOT NULL UNIQUE,
  holder_email TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'used', 'cancelled')),
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_tickets_event_id ON tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_tickets_qr_payload ON tickets(qr_payload);
```

## Row Level Security (Optional)

For production, enable RLS on the tickets table:

```sql
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert tickets
CREATE POLICY "Authenticated users can create tickets"
  ON tickets FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow users to read their own tickets
CREATE POLICY "Users can read tickets by email"
  ON tickets FOR SELECT
  TO authenticated
  USING (holder_email = auth.jwt() ->> 'email');
```
