import { RequestHandler } from "express";
import timeEntryRepository from "../repository";

const stopTimeEntryHandler: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);

  let timeEntry;
  try {
    timeEntry = await timeEntryRepository.stop(id, req.user.id);
  } catch (error) {
    next(error);
    return;
  }

  return res.json(timeEntry);
};

export default stopTimeEntryHandler;
