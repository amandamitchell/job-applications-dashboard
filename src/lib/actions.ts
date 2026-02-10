"use server";

import { redirect } from "next/navigation";
import {
  CompType,
  EmploymentType,
  EventType,
  InterviewType,
  LocationType,
  ResumeVersion,
  SearchSource,
  Status,
} from "@/generated/prisma/enums";
import { ApplicationOrderByWithRelationInput, SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import prisma from "@/lib/prisma";
import { SortBy } from "@/types/types";
import { formFieldToDate } from "./format";

export type ApplicationDetailData = Awaited<ReturnType<typeof getApplication>>;
export type ApplicationBasicData = Awaited<ReturnType<typeof getApplicationBasic>>;
export type ApplicationListData = Awaited<ReturnType<typeof getApplications>>;
export type EventDetailData = Awaited<ReturnType<typeof getEvent>>;

export async function getApplications({ sortDir, sortBy }: { sortDir?: SortOrder; sortBy?: SortBy }) {
  if (!sortDir) sortDir = "desc";
  if (!sortBy) sortBy = "lastUpdated";

  const applications = await prisma.application.findMany({
    orderBy: { [sortBy]: sortDir },
    select: {
      id: true,
      employer: true,
      title: true,
      recruiter: true,
      recruitingCo: true,
      createdAt: true,
      lastUpdated: true,
      status: true,
    },
  });

  return applications;
}

export async function getApplication(id: string) {
  const application = await prisma.application.findUnique({
    where: { id: parseInt(id) },
    include: {
      events: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
  return application;
}

export async function getApplicationBasic(id: string) {
  const application = await prisma.application.findUnique({
    where: { id: parseInt(id) },
    select: {
      title: true,
      employer: true,
    },
  });
  return application;
}

export async function saveApplication(
  previousState: { data: ApplicationDetailData; message: string | null },
  data: FormData,
): Promise<{ data: ApplicationDetailData; message: string | null }> {
  let id = data.get("id")?.toString() || null;
  const employer = data.get("employer")?.toString() || null;
  const title = data.get("title")?.toString() || null;
  const recruitingCo = data.get("recruiting-company")?.toString() || null;
  const recruiter = data.get("recruiter")?.toString() || null;
  const employmentType = (data.get("employment-type")?.toString() as EmploymentType) || null;
  const locationType = (data.get("location-type")?.toString() as LocationType) || null;
  const location = data.get("location")?.toString() || null;
  const compType = (data.get("compensation-type")?.toString() as CompType) || null;
  const yoe = data.get("yoe")?.toString() || null;
  const keySkills = data.get("key-skills")?.toString() || null;
  const notes = data.get("notes")?.toString() || null;
  const searchSource = (data.get("search-source")?.toString() as SearchSource) || null;
  const resume = (data.get("resume-version")?.toString() as ResumeVersion) || null;
  const status = (data.get("status")?.toString() as Status) || null;

  const createdAtInput = data.get("createdAt")?.toString() || null;
  const createdAt = formFieldToDate(createdAtInput);

  const lastUpdatedInput = data.get("lastUpdated")?.toString() || null;
  const lastUpdated = formFieldToDate(lastUpdatedInput);

  const compStartInput = data.get("compensation-start")?.toString();
  const compStart = compStartInput ? parseFloat(compStartInput.replace(/[^0-9.]/g, "")) : null;

  const compEndInput = data.get("compensation-end")?.toString();
  const compEnd = compEndInput ? parseFloat(compEndInput.replace(/[^0-9.]/g, "")) : null;

  const newData = {
    employer,
    title,
    recruitingCo,
    recruiter,
    createdAt,
    lastUpdated,
    employmentType,
    location,
    locationType,
    compStart,
    compEnd,
    compType,
    yoe,
    keySkills,
    notes,
    searchSource,
    resume,
    status,
  };

  try {
    if (!employer && !title && !recruiter && !recruitingCo) {
      throw new Error("Employer, title, or recruiter information are required");
    }
    if (id) {
      await prisma.application.update({
        where: { id: parseInt(id) },
        data: newData,
      });
    } else {
      const newApp = await prisma.application.create({
        data: {
          ...newData,
          events: {
            create: {
              type: recruiter ? EventType.RECRUITER : EventType.APPLICATION,
              createdAt,
            },
          },
        },
      });
      id = newApp.id.toString();
    }
  } catch (error: unknown) {
    console.log("Error in createApplication:", error);
    return {
      data: {
        ...previousState.data,
        ...newData,
      } as ApplicationDetailData,
      message: (error as Error).message || "An error occurred",
    };
  }

  redirect(`/application/${id}`);
}

export async function getEvent(id: string) {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(id) },
  });
  return event;
}

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
    console.log("Error in createEvent:", error);
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
      console.log("Error in createEvent:", error);
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
