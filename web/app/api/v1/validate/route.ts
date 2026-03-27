import { ApiResponse } from "@/lib/api/response";
import { withErrorHandler, ConflictError } from "@/lib/api/errors";
import { parseBody } from "@/lib/api/validate";
import { ValidateTicketSchema } from "@/features/validate/validate.schema";
import { validateTicket } from "@/features/validate/validate.service";

export const POST = withErrorHandler(async (request) => {
  const input = await parseBody(request, ValidateTicketSchema);
  const result = await validateTicket(input.qr_payload);

  if (!result.valid) {
    throw new ConflictError(result.reason ?? "Ticket validation failed");
  }

  return ApiResponse.success(result.ticket);
});
