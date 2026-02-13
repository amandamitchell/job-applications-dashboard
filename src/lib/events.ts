"use server";

import { revalidatePath } from "next/cache";
import { ApplicationDetailData } from "@/lib/actions";
import prisma from "@/lib/prisma";

export async function deleteEvent(
  previousState: { events: NonNullable<ApplicationDetailData>["events"]; message: string | null },
  data: FormData,
): Promise<{ events: NonNullable<ApplicationDetailData>["events"]; message: string | null }> {
  console.log(`actions->deleteEvent()`);

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

  //   const foo = await prisma.event.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   console.log(foo);
  //   revalidatePath("/application/[id]", "page");
}
