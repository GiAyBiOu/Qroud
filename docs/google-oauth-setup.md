# Google OAuth Setup

This guide explains how to enable "Sign in with Google" for Qroud using Supabase Authentication and Google Cloud Console.

## Prerequisites

- A Supabase project (free tier works)
- A Google account

## Step 1: Create OAuth Credentials in Google Cloud

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., `Qroud App`) or select an existing one.
3. Navigate to **APIs & Services > OAuth consent screen**.
   - Select **External** and click Create.
   - Fill in the app name (`Qroud`) and support email. Save and continue through all steps.
4. Go to **APIs & Services > Credentials**.
5. Click **+ CREATE CREDENTIALS > OAuth client ID**.
6. Set application type to **Web application** and name it (e.g., `Qroud Web`).
7. Under **Authorized redirect URIs**, add the callback URL from Supabase (see Step 2).
8. Click **CREATE**. Copy the **Client ID** and **Client Secret**.

## Step 2: Configure Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **Authentication > Providers > Google**.
3. Enable the Google provider toggle.
4. Paste your **Client ID** and **Client Secret** from Step 1.
5. Copy the **Callback URL** shown in Supabase (format: `https://<project-ref>.supabase.co/auth/v1/callback`).
6. Go back to Google Cloud Console and paste this URL as the Authorized redirect URI.
7. Save both sides.

## Verification

Run the app locally (`pnpm dev`) and click "Continue with Google" on the login page. You should be redirected to Google's account picker and back to Qroud after authentication.

## Cost

Google OAuth is completely free. No charges apply for authentication requests.
