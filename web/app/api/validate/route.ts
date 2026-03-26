import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { validateTicket } from "@/features/validate/validate.service";
import logger from "@/lib/logger";

const ValidateSchema = z.object({
  qr_payload: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ValidateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const result = await validateTicket(parsed.data.qr_payload);

    if (!result.valid) {
      return NextResponse.json(
        { valid: false, reason: result.reason },
        { status: 409 }
      );
    }

    return NextResponse.json({ valid: true, ticket: result.ticket });
  } catch (err) {
    logger.error(err, "Failed to validate ticket");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
