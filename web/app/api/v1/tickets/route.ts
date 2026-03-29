import { ApiResponse } from "@/lib/api/response";
import { withErrorHandler } from "@/lib/api/errors";
import { parseBody, parseSearchParam } from "@/lib/api/validate";
import { CreateTicketSchema } from "@/features/tickets/tickets.schema";
import { createTicket, listTickets } from "@/features/tickets/tickets.service";

export const dynamic = 'force-dynamic';


export const GET = withErrorHandler(async (request) => {
  const url = new URL(request.url);
  const eventId = parseSearchParam(url, "event_id", true)!;

  const tickets = await listTickets(eventId);
  return ApiResponse.success(tickets);
});

export const POST = withErrorHandler(async (request) => {
  const input = await parseBody(request, CreateTicketSchema);
  const ticket = await createTicket(input.event_id, input.holder_email);
  return ApiResponse.created(ticket);
});
