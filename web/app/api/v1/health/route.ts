import { ApiResponse } from "@/lib/api/response";
import { withErrorHandler } from "@/lib/api/errors";
import logger from "@/lib/logger";

export const dynamic = 'force-dynamic';


export const GET = withErrorHandler(async () => {
  const payload = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "0.1.0",
    port: parseInt(process.env.PORT ?? "3000", 10),
  };

  logger.info(payload, "Health check requested");

  return ApiResponse.success(payload);
});
