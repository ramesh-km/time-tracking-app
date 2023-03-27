import { RequestHandler } from "express";
import { idSchema } from "../../../lib/zod-schemas"
import timeEntryRepository from "../repository";

const deleteTimeEntryHandler: RequestHandler = async (req, res, next) => {
  const id = idSchema.parse(req.params).id;

  let timeEntry; 
  try {
    timeEntry = await timeEntryRepository.deleteTimeEntry(id, req.user.id)
  } catch (error) {
    next(error);
    return;
  }

  return res.status(200).json(timeEntry);
}

export default deleteTimeEntryHandler;