import { ApiResponse } from "@/lib/api/response";
import { withErrorHandler, NotFoundError } from "@/lib/api/errors";
import { fetchEventById } from "@/features/events/events.service";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  return withErrorHandler(async () => {
    const { eventId } = await params;

    const event = await fetchEventById(eventId);

    if (!event) {
      throw new NotFoundError(`Event ${eventId}`);
    }

    return ApiResponse.success(event);
  })(_request);
}
