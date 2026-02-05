import Home from "@/components/pages/Home/Home";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import { getApplications } from "@/lib/actions";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    sortDir: SortOrder | undefined;
  }>;
}) {
  const { sortDir } = await searchParams;

  const sortBy = "createdAt";
  const applications = await getApplications({
    sortDir,
  });

  return <Home applications={applications} sortDir={sortDir} sortBy={sortBy} />;
}
