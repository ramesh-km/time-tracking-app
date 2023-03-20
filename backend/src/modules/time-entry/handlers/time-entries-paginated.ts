import { RequestHandler } from "express";
import { TimeEntryPaginationInput } from "../../../types/time-entry";
import timeEntryRepository from "../repository";

const timeEntriesPaginationHandler: RequestHandler = async (req, res, next) => {
  let timeEntries;
  try {
    timeEntries = await timeEntryRepository.getTimeEntriesPaginated({
      ...(req.query as unknown as TimeEntryPaginationInput),
      userId: req.user.id,
    });
  } catch (error) {
    next(error);
    return;
  }

  return res.json(timeEntries);
};

export default timeEntriesPaginationHandler;
