import { RequestHandler } from "express";
import prisma from "../../../lib/prisma";
import { CreateTagInput } from "../../../types/tags";

const createTagHandler: RequestHandler = (req, res, next) => {
  const { name } = req.body as CreateTagInput;

  let tag;
  try {
    tag = prisma.tag.create({
      data: {
        name,
      },
    });
  } catch (error) {
    next(error);
  }

  res.status(201).json(tag);
};

export default createTagHandler;
