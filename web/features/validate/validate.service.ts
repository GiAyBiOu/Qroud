import { selectTicketByQr, markTicketUsed } from "./validate.data";
import logger from "@/lib/logger";

export async function validateTicket(qrPayload: string) {
  const ticket = await selectTicketByQr(qrPayload);

  if (!ticket) {
    logger.warn({ qrPayload }, "Ticket not found");
    return { valid: false, reason: "Ticket not found" };
  }

  if (ticket.status === "used") {
    logger.warn({ ticketId: ticket.id }, "Ticket already used");
    return { valid: false, reason: "Ticket already used", ticket };
  }

  const updated = await markTicketUsed(ticket.id);
  logger.info({ ticketId: ticket.id }, "Ticket validated and marked as used");

  return { valid: true, ticket: updated };
}
