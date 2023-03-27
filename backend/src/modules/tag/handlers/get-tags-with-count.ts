import { RequestHandler } from "express";
import tagRepository from "../repository";

const getTagsWithCountHandler: RequestHandler = async (req, res, next) => {
  let tags;
  try {
    tags = await tagRepository.getAll(true, req.user.id);
  } catch (error) {
    next(error);
    return;
  }

  res.status(200).json(
    tags.map((tag) => ({
      name: tag.name,
      count: tag._count.timeEntries,
    }))
  );
};

export default getTagsWithCountHandler;
