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
      tags: {
        some: {
          name: {
            in: query.tags || undefined,
          },
        },
      },
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

const timeEntryRepository = {
  create,
  getTimeEntry,
  update,
  getTimeEntriesPaginated,
};

export default timeEntryRepository;
