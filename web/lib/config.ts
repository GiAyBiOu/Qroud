const config = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  },
  ticketmaster: {
    apiKey: process.env.TICKETMASTER_API_KEY ?? "",
    baseUrl: "https://app.ticketmaster.com/discovery/v2",
  },
  port: parseInt(process.env.PORT ?? "3000", 10),
  logLevel: (process.env.LOG_LEVEL ?? "info") as
    | "fatal"
    | "error"
    | "warn"
    | "info"
    | "debug"
    | "trace",
};

export default config;
