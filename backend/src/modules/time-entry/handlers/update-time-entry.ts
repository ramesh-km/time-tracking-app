import dayjs from "dayjs";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { UpdateTimeEntryInput } from "../../../types/time-entry";
import timeEntryRepository from "../repository";

const updateTimeEntryHandler: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  const updateData = req.body as UpdateTimeEntryInput;

  // Vadildate end > start
  if (dayjs(updateData.end).isBefore(updateData.start)) {
    next(createHttpError(400, "End date must be after start date"));
    return;
  }

  let timeEntry;
  try {
    timeEntry = await timeEntryRepository.update(id, updateData, req.user.id);
  } catch (error) {
    next(error);
    return;
  }

  return res.json(timeEntry);
};

export default updateTimeEntryHandler;
