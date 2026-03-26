import { NextResponse } from "next/server";
import logger from "@/lib/logger";

export async function GET() {
  const payload = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "0.1.0",
    port: parseInt(process.env.PORT ?? "3000", 10),
  };

  logger.info(payload, "Health check requested");

  return NextResponse.json(payload);
}
