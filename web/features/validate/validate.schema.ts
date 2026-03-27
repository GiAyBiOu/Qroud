import { z } from "zod/v4";

export const ValidateTicketSchema = z.object({
  qr_payload: z.string().uuid(),
});

export type ValidateTicketInput = z.infer<typeof ValidateTicketSchema>;
