import { RequestHandler } from "express";
import prisma from "../../../lib/prisma";
import { CreateTimeEntryInput } from "../../../types/time-entry";

const createTimeEntryHandler: RequestHandler = async (req, res, next) => {
  const { tagId, startTime, endTime } = req.body as CreateTimeEntryInput;

  let timeEntry;
  try {
    timeEntry = await prisma.timeEntry.create({
      data: {
        startTime,
        endTime,
      },
    });
  } catch (error) {
    next(error);
  }

  res.status(201).json(timeEntry);
};
