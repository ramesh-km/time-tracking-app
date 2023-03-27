import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { safePromise } from "../../../lib/utils";
import { UpdateUserData } from "../../../types/user";
import userRepository from "../repository";
import {
  compareWithHash,
  generateToken,
  getSafeUser,
  hashText,
} from "../services";

const updateUserHandler: RequestHandler = async (req, res, next) => {
  const newUserData = req.body as UpdateUserData;

  // Both the current and new password are required or neither is required
  if (
    (newUserData.currentPassword && !newUserData.newPassword) ||
    (!newUserData.currentPassword && newUserData.newPassword)
  ) {
    next(
      createHttpError(
        400,
        "Both the current and new password are required or neither is required"
      )
    );
    return;
  }

  // If the current password is provided, verify it
  if (newUserData.currentPassword) {
    let user;
    try {
      user = await userRepository.getUser({
        id: req.user.id,
      });
    } catch (error) {
      next(error);
      return;
    }

    // Check password
    const isPasswordValid = await safePromise(
      compareWithHash(newUserData.currentPassword, user.password),
      false
    );

    if (!isPasswordValid) {
      next(createHttpError(401, "Invalid credentials"));
      return;
    }
  }

  const userDataToUpdate = {
    name: newUserData.name,
    email: newUserData.email,
    password: newUserData.newPassword
      ? await hashText(newUserData.newPassword)
      : undefined,
  };

  let user;
  try {
    user = await userRepository.update(req.user.id, userDataToUpdate);
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

export default updateUserHandler;
