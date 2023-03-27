import { RequestHandler } from "express";
import { CreateTagInput } from "../../../types/tags";
import tagRepository from "../repository";

const deleteTagHandler: RequestHandler = async (req, res, next) => {
  const { name } = req.params as CreateTagInput;

  let tag;
  try {
    tag = await tagRepository.delete(name, req.user.id);
  } catch (error) {
    next(error);
  }

  res.status(200).json(tag);
};

export default deleteTagHandler;
