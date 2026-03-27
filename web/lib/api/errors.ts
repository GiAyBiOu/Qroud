import logger from "@/lib/logger";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly title: string;

  constructor(title: string, statusCode: number, detail?: string) {
    super(detail ?? title);
    this.title = title;
    this.statusCode = statusCode;
  }
}

export class ValidationError extends AppError {
  public readonly issues: Array<{ message: string; path?: unknown }>;

  constructor(issues: Array<{ message: string; path?: unknown }>) {
    super("Validation Error", 422);
    this.issues = issues;
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super("Not Found", 404, `${resource} was not found`);
  }
}

export class ConflictError extends AppError {
  constructor(detail: string) {
    super("Conflict", 409, detail);
  }
}

type RouteHandler = (
  request: Request,
  context?: unknown
) => Promise<Response>;

export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (error) {
      if (error instanceof ValidationError) {
        const { ApiResponse } = await import("@/lib/api/response");
        return ApiResponse.validationError(error.issues);
      }

      if (error instanceof AppError) {
        const { ApiResponse } = await import("@/lib/api/response");
        logger.warn({ statusCode: error.statusCode }, error.message);
        return ApiResponse.error(error.title, error.statusCode, error.message);
      }

      logger.error(error, "Unhandled error in route handler");
      const { ApiResponse } = await import("@/lib/api/response");
      return ApiResponse.error("Internal Server Error", 500);
    }
  };
}
