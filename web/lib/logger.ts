import pino from "pino";
import config from "@/lib/config";

const logger = pino({
  level: config.logLevel,
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:HH:MM:ss.l",
            ignore: "pid,hostname",
            messageFormat: "{msg}",
          },
        }
      : undefined,
});

export default logger;
