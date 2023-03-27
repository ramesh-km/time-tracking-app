import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { compareWithHash, generateToken, getSafeUser } from "../services";
import { safePromise } from "../../../lib/utils";
import userRepository from "../repository";
import { LoginUserInput } from "../../../types/user";

const loginUserHandler: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as LoginUserInput;

  let user;
  try {
    user = await userRepository.getUser({ email });
  } catch (error) {
    next(error);
    return;
  }

  // Check password
  const isPasswordValid = await safePromise(
    compareWithHash(password, user.password),
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

  res.json({ ...safeUser, token });
};

export default loginUserHandler;
