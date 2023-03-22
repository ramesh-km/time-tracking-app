import { RequestHandler } from "express";
import timeEntryRepository from "../repository";

const getAllCurrentWeekEntriesHandler : RequestHandler = async (req, res, next) => {
  let timeEntries;
  try {
    timeEntries = await timeEntryRepository.getAllCurrentWeekEntries(req.user.id);
  } catch (error) {
    next(error);
    return;
  }

  res.json(timeEntries);
}

export default getAllCurrentWeekEntriesHandler;