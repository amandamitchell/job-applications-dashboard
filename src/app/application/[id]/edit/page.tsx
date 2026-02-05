import { notFound } from "next/navigation";
import EditApplication from "@/components/pages/EditApplication/EditApplication";
import { getApplication } from "@/lib/actions";

type EditApplicationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditApplicationPage({ params }: EditApplicationPageProps) {
  const { id } = await params;
  const application = await getApplication(id);

  if (!application) {
    notFound();
  }

  return <EditApplication application={application} />;
}
