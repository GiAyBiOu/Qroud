import { randomUUID } from "crypto";
import QRCode from "qrcode";
import { insertTicket, selectTicketsByEvent } from "./tickets.data";
import logger from "@/lib/logger";

export async function createTicket(eventId: string, holderEmail: string) {
  const qrPayload = randomUUID();

  const ticket = await insertTicket({
    event_id: eventId,
    qr_payload: qrPayload,
    holder_email: holderEmail,
  });

  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 400,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
  });

  logger.info({ ticketId: ticket.id, eventId }, "Ticket created");

  return { ...ticket, qr_data_url: qrDataUrl };
}

export async function listTickets(eventId: string) {
  const tickets = await selectTicketsByEvent(eventId);
  logger.info({ eventId, count: tickets.length }, "Tickets listed");
  return tickets;
}
