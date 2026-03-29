# Ticketmaster Discovery API Setup

This guide explains how to obtain a free API key from Ticketmaster to power the events listing in Qroud.

## Prerequisites

- An email address for registration

## Step 1: Register

1. Go to [developer.ticketmaster.com](https://developer.ticketmaster.com/).
2. Click **Get API Key** or **Sign Up**.
3. Fill in the registration form:
   - **Name**: Your real name
   - **Company**: `Student Project` or your university name
   - **App Name**: `Qroud`
   - **Application URL**: `http://localhost:3000`
4. Submit the form. Approval is automatic.

## Step 2: Copy Your Key

After registration, go to your developer dashboard. Under **Keys**, copy the **Consumer Key** (this is your API key).

Paste it into `web/.env.local`:

```
TICKETMASTER_API_KEY=your_consumer_key_here
```

## Rate Limits

The free tier allows **5,000 requests per day**, which is more than enough for development and small-scale production.

## API Reference

- **Event Search**: `GET /discovery/v2/events.json`
- **Event Details**: `GET /discovery/v2/events/{id}.json`
- **Full docs**: [developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)

Qroud uses the `classificationName=music` parameter by default to show concert/music events.
