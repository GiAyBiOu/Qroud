import { NextResponse } from "next/server";

interface ErrorEntry {
  status: number;
  title: string;
  detail?: string;
}

interface PaginationMeta {
  total: number;
  page: number;
  per_page: number;
}

export class ApiResponse {
  static success<T>(data: T, status = 200) {
    return NextResponse.json(
      {
        data,
        meta: { timestamp: new Date().toISOString() },
      },
      { status }
    );
  }

  static created<T>(data: T) {
    return ApiResponse.success(data, 201);
  }

  static paginated<T>(data: T[], meta: PaginationMeta) {
    return NextResponse.json({
      data,
      meta: {
        ...meta,
        timestamp: new Date().toISOString(),
      },
    });
  }

  static error(title: string, status: number, detail?: string) {
    const error: ErrorEntry = { status, title };
    if (detail) error.detail = detail;

    return NextResponse.json({ errors: [error] }, { status });
  }

  static validationError(issues: Array<{ message: string; path?: unknown }>) {
    return NextResponse.json(
      {
        errors: issues.map((issue) => ({
          status: 422,
          title: "Validation Error",
          detail: issue.message,
          source: issue.path,
        })),
      },
      { status: 422 }
    );
  }
}
