import { ApiResponse } from "@/lib/api/response";
import { withErrorHandler } from "@/lib/api/errors";
import { fetchEvents } from "@/features/events/events.service";

export const dynamic = 'force-dynamic';


export const GET = withErrorHandler(async (request) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword") ?? undefined;
  const city = url.searchParams.get("city") ?? undefined;
  const classificationName = url.searchParams.get("classificationName") ?? undefined;
  const size = url.searchParams.get("size");
  const page = url.searchParams.get("page");

  const result = await fetchEvents({
    keyword,
    city,
    classificationName,
    size: size ? parseInt(size, 10) : undefined,
    page: page ? parseInt(page, 10) : undefined,
  });

  return ApiResponse.paginated(result.events, {
    total: result.total,
    page: page ? parseInt(page, 10) : 0,
    per_page: size ? parseInt(size, 10) : 12,
  });
});
