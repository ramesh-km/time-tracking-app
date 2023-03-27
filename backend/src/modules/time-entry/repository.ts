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
          create: { name: tag, userId },
        })),
      },
    },
  });
  return timeEntry;
}

async function getTimeEntry(id: number, userId: number) {
  const timeEntry = await prisma.timeEntry.findUnique({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    include: { tags: true },
  });
  return timeEntry;
}

async function update(id: number, data: UpdateTimeEntryInput, userId: number) {
  const { note, tags, end, start } = data;

  const timeEntry = await prisma.timeEntry.update({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    data: {
      note,
      tags: {
        set: tags.map((tag) => ({ name: tag })),
      },
      end,
      start,
    },
  });

  return timeEntry;
}

async function getTimeEntriesPaginated(
  query: TimeEntryPaginationInput & { userId: number }
) {
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

async function deleteTimeEntry(id: number, userId: number) {
  const timeEntry = await prisma.timeEntry.delete({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
  });
  return timeEntry;
}

async function stop(id: number, userId: number) {
  const timeEntry = await prisma.timeEntry.update({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    data: {
      end: new Date(),
    },
  });
  return timeEntry;
}

async function stopActiveTimeEntry(userId: number) {
  const timeEntry = await prisma.timeEntry.updateMany({
    where: {
      userId,
      end: null,
    },
    data: {
      end: new Date(),
    },
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
  stopActiveTimeEntry,
};

export default timeEntryRepository;
