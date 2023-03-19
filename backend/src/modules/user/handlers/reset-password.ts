import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { isPrismaError } from "../../../lib/errors";
import { ResetPasswordInput } from "../../../types/user";
import userRepository from "../repository";
import { hashText, validatePasswordResetTicket } from "../services";

const resetPasswordHandler: RequestHandler = async (req, res, next) => {
  const { token, id, password } = req.body as ResetPasswordInput;

  // Check if the ticket is valid
  let user;
  try {
    user = await validatePasswordResetTicket(id, token);
  } catch (error) {
    console.error(error);
    if (isPrismaError(error)) {
      next(error);
    } else {
      next(createHttpError(400, "Invalid password reset link."));
    }

    return;
  }

  // Update the user's password
  try {
    await userRepository.updateUser(user.id, {
      password: await hashText(password), // Hash the password
    });
  } catch (error) {
    next(error);
    return;
  }

  res.status(200).send();
};

export default resetPasswordHandler;
