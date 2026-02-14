import { notFound } from "next/navigation";
import NewEvent from "@/components/pages/NewEvent/NewEvent";
import { getApplicationBasic } from "@/lib/applications";

type NewEventPageProps = {
  params: Promise<{ id: string }>;
};

const NewEventPage = async ({ params }: NewEventPageProps) => {
  const { id } = await params;
  const application = await getApplicationBasic(id);

  if (!id) {
    notFound();
  }

  return (
    <NewEvent
      applicationId={parseInt(id)}
      employer={application?.employer || null}
      title={application?.title || null}
    />
  );
};

export default NewEventPage;
