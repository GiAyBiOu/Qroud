const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
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
