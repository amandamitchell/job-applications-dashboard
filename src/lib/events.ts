"use server";

import { redirect } from "next/navigation";
import { EventType, InterviewType, Status } from "@/generated/prisma/enums";
import type { ApplicationDetailData } from "@/lib/applications";
import prisma from "@/lib/prisma";
import { formFieldToDate } from "./format";

export type EventDetailData = Awaited<ReturnType<typeof getEvent>>;

export async function saveEvent(
  previousState: { data: EventDetailData; message: string | null },
  data: FormData,
): Promise<{ data: EventDetailData; message: string | null }> {
  const applicationId = data.get("applicationId")?.toString() || null;
  let id = data.get("eventId")?.toString() || null;
  const type = (data.get("event-type")?.toString() as EventType) || null;
  const interviewType = (data.get("interview-type")?.toString() as InterviewType) || null;
  const notes = data.get("notes")?.toString() || null;

  const createdAtInput = data.get("createdAt")?.toString() || null;
  const createdAt = formFieldToDate(createdAtInput);

  const isNew = !Boolean(id);

  const newData = {
    type,
    interviewType,
    createdAt,
    notes,
  };

  try {
    if (!applicationId) {
      throw new Error("Missing application id");
    }
    if (!isNew) {
      if (!applicationId || !id) {
        throw new Error("Missing id");
      }
      await prisma.event.update({
        where: { id: parseInt(id) },
        data: newData,
      });
    } else {
      const newEvent = await prisma.event.create({
        data: {
          applicationId: parseInt(applicationId),
          ...newData,
        },
      });
      id = newEvent.id.toString();
    }
  } catch (error: unknown) {
    return {
      data: {
        ...previousState.data,
        ...newData,
      } as EventDetailData,
      message: (error as Error).message || "An error occurred",
    };
  }

  if (isNew) {
    try {
      const application = await prisma.application.findUnique({
        where: { id: parseInt(applicationId) },
        select: {
          status: true,
          lastUpdated: true,
        },
      });

      if (application) {
        const newApplicationData: { lastUpdated?: Date; status?: Status } = {};
        if (newData.createdAt > application.lastUpdated) {
          newApplicationData.lastUpdated = newData.createdAt;
        }
        if (newData.type === EventType.APPLICATION && application.status !== Status.APPLIED) {
          newApplicationData.status = Status.APPLIED;
        } else if (newData.type === EventType.RECRUITER) {
          newApplicationData.status = Status.RECRUITER_CONVO;
        } else if (newData.type === EventType.INTERVIEW || newData.type === EventType.SCHEDULE_REQUEST) {
          newApplicationData.status = Status.INTERVIEWING;
        } else if (newData.type === EventType.REJECTION) {
          newApplicationData.status = Status.REJECTED;
        } else if (newData.type === EventType.AUTO_REJECTION) {
          newApplicationData.status = Status.AUTO_REJECTED;
        } else if (newData.type === EventType.WITHDRAWAL) {
          newApplicationData.status = Status.WITHDRAWN;
        } else if (newData.type === EventType.OFFER) {
          newApplicationData.status = Status.OFFERED;
        }
        if (newApplicationData.lastUpdated || newApplicationData.status) {
          await prisma.application.update({
            where: { id: parseInt(applicationId) },
            data: newApplicationData,
          });
        }
      }
    } catch (error: unknown) {
      return {
        data: {
          ...previousState.data,
          ...newData,
        } as EventDetailData,
        message: (error as Error).message || "An error occurred",
      };
    }
  }

  redirect(`/application/${applicationId}`);
}

export async function deleteEvent(
  previousState: { events: NonNullable<ApplicationDetailData>["events"]; message: string | null },
  data: FormData,
): Promise<{ events: NonNullable<ApplicationDetailData>["events"]; message: string | null }> {
  try {
    const id = data.get("id")?.toString() || null;
    if (!id) {
      throw new Error("Invalid event id");
    }
    await prisma.event.delete({
      where: {
        id: parseInt(id),
      },
    });
    return {
      events: previousState.events.filter((e) => e.id !== parseInt(id)),
      message: null,
    };
  } catch (e: unknown) {
    return {
      ...previousState,
      message: (e as Error).message,
    };
  }
}

export async function getEvent(id: string) {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(id) },
  });
  return event;
}
