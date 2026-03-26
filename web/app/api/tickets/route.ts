import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { createTicket, listTickets } from "@/features/tickets/tickets.service";
import logger from "@/lib/logger";

const CreateTicketSchema = z.object({
  event_id: z.string().uuid(),
  holder_email: z.string().email(),
});

export async function GET(request: NextRequest) {
  const eventId = request.nextUrl.searchParams.get("event_id");

  if (!eventId) {
    return NextResponse.json(
      { error: "event_id query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const tickets = await listTickets(eventId);
    return NextResponse.json({ data: tickets });
  } catch (err) {
    logger.error(err, "Failed to list tickets");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateTicketSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const ticket = await createTicket(
      parsed.data.event_id,
      parsed.data.holder_email
    );
    return NextResponse.json({ data: ticket }, { status: 201 });
  } catch (err) {
    logger.error(err, "Failed to create ticket");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
