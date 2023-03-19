import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { createPasswordResetTicket } from "../services";
import { CreatePasswordResetTicketInput } from "../../../types/user";

const handleCreatePasswordResetTicket: RequestHandler = async (
  req,
  res,
  next
) => {
  const { email } = req.body as CreatePasswordResetTicketInput;

  try {
    await createPasswordResetTicket(email);
    res.status(200).end();
  } catch (error) {
    next(createHttpError(500, "Could not create password reset ticket"));
  }
};

export default handleCreatePasswordResetTicket;
