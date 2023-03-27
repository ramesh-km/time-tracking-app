import { RequestHandler } from "express";
import timeEntryRepository from "../repository";
import { getTimeEntriesReportSchema } from "../zod-schemas";

const getTimeEntriesReportHandler: RequestHandler = async (req, res, next) => {
  let timeEntries;
  const query = getTimeEntriesReportSchema.parse(req.query);

  try {
    timeEntries = await timeEntryRepository.getTimeEntriesPaginated({
      ...query,
      userId: req.user.id,
    });
  } catch (error) {
    next(error);
    return;
  }

  return res.json(timeEntries);
};

export default getTimeEntriesReportHandler;
