import dayjs from "dayjs";
import prisma from "../../lib/prisma";
import {
  CreateTimeEntryInput,
  TimeEntryPaginationInput,
  UpdateTimeEntryInput,
} from "../../types/time-entry";

async function create(data: CreateTimeEntryInput & { userId: number }) {
  const { note, tags, userId } = data;
  const timeEntry = await prisma.timeEntry.create({
    data: {
      note,
      userId,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });
  return timeEntry;
}

async function getTimeEntry(id: number) {
  const timeEntry = await prisma.timeEntry.findUnique({
    where: { id },
    include: { tags: true },
  });
  return timeEntry;
}

async function update(id: number, data: UpdateTimeEntryInput) {
  const { note, tags, end, start } = data;
  const timeEntry = await prisma.timeEntry.update({
    where: { id },
    data: {
      note,
      end,
      start,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });
  return timeEntry;
}

async function getTimeEntriesPaginated(
  query: TimeEntryPaginationInput & { userId: number }
) {
  console.log("🚀 ~ file: repository.ts:55 ~ query:", query);
  const timeEntries = await prisma.timeEntry.findMany({
    where: {
      userId: query.userId,
      start: {
        gte: query.from,
        lte: query.to,
      },
      note: {
        contains: query.note || undefined,
      },
      tags:
        query.tags.length > 0
          ? {
              some: {
                name: {
                  in: query.tags || undefined,
                },
              },
            }
          : undefined,
    },
    include: { tags: true },
    take: query.size,
    skip: query.page * query.size,
    orderBy: {
      [query.sort]: query.direction,
    },
  });

  return timeEntries;
}

async function getAllCurrentWeekEntries(userId: number) {
  const timeEntries = await prisma.timeEntry.findMany({
    where: {
      userId,
      start: {
        gte: dayjs().startOf("week").toDate(),
        lte: dayjs().toDate(),
      },
    },
    include: { tags: true },
    orderBy: {
      start: "desc",
    },
  });

  return timeEntries;
}

async function deleteTimeEntry(id: number) {
  const timeEntry = await prisma.timeEntry.delete({
    where: { id },
  });
  return timeEntry;
}
async function stop(id: number) {
  const timeEntry = await prisma.timeEntry.update({
    where: { id },
    data: {
      end: new Date(),
    }
  });
  return timeEntry;
}

const timeEntryRepository = {
  create,
  getTimeEntry,
  update,
  getTimeEntriesPaginated,
  getAllCurrentWeekEntries,
  deleteTimeEntry,
   stop,
};

export default timeEntryRepository;
