import { z } from "zod/v4";

export const CreateTicketSchema = z.object({
  event_id: z.string().uuid(),
  holder_email: z.string().email(),
});

export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;
