import { notFound } from "next/navigation";
import ApplicationDetail from "@/components/pages/ApplicationDetail/ApplicationDetail";
import { getApplication } from "@/lib/applications";

type ApplicationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const { id } = await params;
  const application = await getApplication(id);

  if (!application) {
    notFound();
  }

  return <ApplicationDetail application={application} />;
}
