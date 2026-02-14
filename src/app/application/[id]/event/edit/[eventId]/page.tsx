import { notFound } from "next/navigation";
import EditEvent from "@/components/pages/EditEvent";
import { getApplication } from "@/lib/applications";

type EditEventPageProps = {
  params: Promise<{ id: string; eventId: string }>;
};

const EditEventPage = async ({ params }: EditEventPageProps) => {
  const { id, eventId } = await params;
  const application = await getApplication(id);
  const event = application?.events.find((event) => event.id === parseInt(eventId)) || null;

  if (!event) {
    notFound();
  }

  return (
    <EditEvent
      applicationId={parseInt(id)}
      employer={application?.employer || null}
      title={application?.title || null}
      event={event}
    />
  );
};

export default EditEventPage;
