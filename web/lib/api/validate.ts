import type { ZodType } from "zod/v4";
import { ValidationError } from "@/lib/api/errors";

export async function parseBody<T>(request: Request, schema: ZodType<T>): Promise<T> {
  const body = await request.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    throw new ValidationError(
      result.error.issues.map((i) => ({ message: i.message, path: i.path }))
    );
  }

  return result.data;
}

export function parseSearchParam(
  url: URL,
  key: string,
  required = false
): string | null {
  const value = url.searchParams.get(key);

  if (required && !value) {
    throw new ValidationError([
      { message: `Query parameter '${key}' is required` },
    ]);
  }

  return value;
}
