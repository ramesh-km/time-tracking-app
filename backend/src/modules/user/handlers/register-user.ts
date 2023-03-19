import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { generateToken, getSafeUser } from "../services";
import { safePromise } from "../../../lib/utils";
import userRepository from "../repository";

const registerUserHandler: RequestHandler = async (req, res, next) => {
  let user;
  try {
    user = await userRepository.createUser(req.body);
  } catch (error) {
    next(error);
    return;
  }

  const safeUser = getSafeUser(user);
  const token = await safePromise(generateToken(safeUser));
  if (!token) {
    next(createHttpError(500, "Could not generate token"));
    return;
  }

  res.json({ ...safeUser, token });
};

export default registerUserHandler;
