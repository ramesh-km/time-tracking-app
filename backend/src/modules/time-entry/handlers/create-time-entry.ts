import { RequestHandler } from "express";
import { CreateTimeEntryInput } from "../../../types/time-entry";
import timeEntryRepository from "../repository";

const createTimeEntryHandler: RequestHandler = async (req, res, next) => {
  const { note, tags } = req.body as CreateTimeEntryInput;

  req.user;
  let timeEntry;
  try {
    // Stop the exisiting active time entry if any
    await timeEntryRepository.stopActiveTimeEntry(req.user.id);

    timeEntry = await timeEntryRepository.create({
      note,
      tags,
      userId: req.user.id,
    });
  } catch (error) {
    next(error);
  }

  res.status(201).json(timeEntry);
};

export default createTimeEntryHandler;
