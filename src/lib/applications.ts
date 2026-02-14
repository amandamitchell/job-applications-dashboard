"use server";

import { redirect } from "next/navigation";
import {
  CompType,
  EmploymentType,
  EventType,
  LocationType,
  ResumeVersion,
  SearchSource,
  Status,
} from "@/generated/prisma/enums";
import { ApplicationWhereInput } from "@/generated/prisma/internal/prismaNamespace";
import prisma from "@/lib/prisma";
import { ApplicationSearchParams } from "@/types/types";
import { formFieldToDate } from "./format";

export type ApplicationDetailData = Awaited<ReturnType<typeof getApplication>>;
export type ApplicationBasicData = Awaited<ReturnType<typeof getApplicationBasic>>;
export type ApplicationListData = Awaited<ReturnType<typeof getApplications>>;

export async function getApplications({
  sortDir,
  sortBy,
  page,
  perPage,
  status,
  search,
  query,
}: Pick<ApplicationSearchParams, "page" | "perPage" | "query" | "search" | "sortBy" | "sortDir"> & {
  status: Status[] | undefined;
}) {
  if (!sortDir) sortDir = "desc";
  if (!sortBy) sortBy = "lastUpdated";
  if (!page) page = "1";
  if (!perPage) perPage = "25";

  const skip = (parseInt(page) - 1) * parseInt(perPage);

  let where: ApplicationWhereInput | undefined = undefined;

  if (status) {
    where = {
      status: {
        in: status,
      },
    };
  }

  if (query && search) {
    where = {
      ...where,
      [search]: {
        contains: query,
        mode: "insensitive",
      },
    };
  }

  const applicationQuery = prisma.application.findMany({
    orderBy: { [sortBy]: sortDir },
    skip,
    take: parseInt(perPage),
    where,
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

  const applicationCountQuery = prisma.application.count({ where });

  const [applications, count] = await prisma.$transaction([applicationQuery, applicationCountQuery]);

  return { applications, count };
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

export async function deleteApplication(id: number) {
  try {
    await prisma.application.delete({
      where: {
        id,
      },
    });
  } catch (error: unknown) {
    console.log("error deleting application", error);
  }
  redirect(`/`);
}
