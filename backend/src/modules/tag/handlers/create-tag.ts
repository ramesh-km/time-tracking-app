import { RequestHandler } from "express";
import { CreateTagInput } from "../../../types/tags";
import tagRepository from "../repository";

const createTagHandler: RequestHandler = async (req, res, next) => {
  const { name } = req.body as CreateTagInput;

  let tag;
  try {
    tag = await tagRepository.create(name);
  } catch (error) {
    next(error);
  }

  res.status(201).json(tag);
};

export default createTagHandler;
