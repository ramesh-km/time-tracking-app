import { RequestHandler } from "express";
import tagRepository from "../repository";

const getAllTagsHandler: RequestHandler = async (req, res, next) => {
  let tags;
  try {
    tags = await tagRepository.getAll(false, req.user.id);
  } catch (error) {
    next(error);
  }

  res.status(200).json(tags);
};

export default getAllTagsHandler;
