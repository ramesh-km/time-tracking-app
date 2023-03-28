import dayjs from "dayjs";
import prisma from "../../lib/prisma";
import {
  CreateTimeEntryInput,
  InsightsDataInput,
  TimeEntryPaginationInput,
  UpdateTimeEntryInput,
} from "../../types/time-entry";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);

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
  const data = await prisma.$transaction(async (tx) => {
    const dbQuery = {
      where: {
        userId: query.userId,
        start: {
          gte: query.from || undefined,
          lte: query.to || undefined,
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
    };
    const timeEntries = await tx.timeEntry.findMany(dbQuery);
    const count = await tx.timeEntry.count({
      where: dbQuery.where,
    });

    return {
      data: timeEntries,
      total: count,
    };
  });

  return data;
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

async function getInsightsData(insight: InsightsDataInput, userId: number) {
  switch (insight.type) {
    case "bar-chart": {
      const timeEntries = await prisma.timeEntry.findMany({
        where: {
          userId,
          start: {
            gte: dayjs().weekday(-7).toDate(), // last sunday
            lte: dayjs().endOf("week").toDate(),
          },
        },
        select: {
          start: true,
          end: true,
        },
      });

      const data = timeEntries.map((timeEntry) => {
        const start = dayjs(timeEntry.start);
        const end = dayjs(timeEntry.end || new Date()); // if task is still running, use current time
        const diff = end.diff(start, "hours");
        return diff;
      });

      return data;
    }
    case "calendar-heatmap": {
      const timeEntries = await prisma.timeEntry.findMany({
        where: {
          userId,
          start: {
            gte: dayjs().startOf("year").toDate(),
            lte: dayjs().toDate(),
          },
        },
        select: {
          start: true,
          end: true,
        },
      });

      // Generate a map of dates and hours for the current year
      const data = Array.from({ length: 365 }, (_, i) => {
        const date = dayjs().startOf("year").add(i, "day");

        let hours = 0;
        timeEntries.forEach((timeEntry) => {
          const start = dayjs(timeEntry.start);
          const end = dayjs(timeEntry.end);
          if (date.isSame(start, "day")) {
            hours += end.diff(start, "hours");
          }
        });

        return [date.format("YYYY-MM-DD"), hours || 0];
      });

      return data;
    }
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-case-declarations
      const _exhaustiveCheck: never = insight;
      break;
  }
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
  getInsightsData,
};

export default timeEntryRepository;
