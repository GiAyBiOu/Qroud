import pino from "pino";
import config from "@/lib/config";

const isProduction = config.nodeEnv === "production";

const logger = pino({
  level: config.logLevel,
  ...(isProduction
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "HH:MM:ss.l",
            singleLine: false,
          },
        },
      }),
});

function handleShutdown(signal: string) {
  logger.info({ signal }, "Received shutdown signal, cleaning up...");
  process.exit(0);
}

if (!process.env.VERCEL) {
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
  process.on("SIGINT", () => handleShutdown("SIGINT"));
}

export default logger;
