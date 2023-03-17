import { RequestHandler } from "express";
import prisma from "../../../lib/prisma";
import { RegisterUserInput } from "../../../types/user";

const registerUserHandler: RequestHandler = async (req, res, next) => {
  const { email, password, name } = req.body as RegisterUserInput;

  // Hash password
  

  let user;
  try {
    user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  } catch (error) {
    next(error);
  }

  res.status(201).json(user);
};

export default registerUserHandler;