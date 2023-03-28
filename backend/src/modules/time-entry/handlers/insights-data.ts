import { RequestHandler } from "express";
import timeEntryRepository from "../repository";
import { insightsDataSchema } from "../zod-schemas";

const getTimeEntriesInsightsHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data = await timeEntryRepository.getInsightsData(
      insightsDataSchema.parse(req.query),
      req.user.id
    );
    res.json(data);
  } catch (error) {
    next(error);
    return;
  }
};

export default getTimeEntriesInsightsHandler;
