import { Status } from "@/generated/prisma/enums";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";

export type SortBy = "createdAt" | "employer" | "title" | "recruiter" | "status" | "lastUpdated";

export type ApplicationSearchParams = {
  sortDir: SortOrder | undefined;
  sortBy: SortBy | undefined;
  page: string | undefined;
  perPage: string | undefined;
  status: Status | undefined;
  search: "employer" | "title" | "recruiter" | "recruitingCo" | undefined;
  query: string | undefined;
};
