import { RequestHandler } from "express";
import createHttpError from "http-errors";
import {
  comparePasswords,
  generateToken,
  getSafeUser,
} from "../../../lib/auth";
import { safePromise } from "../../../lib/utils";
import userRepository from "../repository";

const loginUserHandler: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await userRepository.getUserByEmail(email);
  } catch (error) {
    next(error);
    return;
  }

  // Check password
  const isPasswordValid = await safePromise(
    comparePasswords(password, user.password),
    false
  );

  if (!isPasswordValid) {
    next(createHttpError(401, "Invalid credentials"));
    return;
  }

  const safeUser = getSafeUser(user);
  const token = await safePromise(generateToken(safeUser));
  if (!token) {
    next(createHttpError(500, "Could not generate token"));
    return;
  }

  res.json({ user: safeUser, token });
};

export default loginUserHandler;
