import { RequestHandler } from "express";
import { ResetPasswordInput } from "../../../types/user";

const resetPasswordHandler: RequestHandler = async (req, res, next) => {
  const { token, id, password } = req.body as ResetPasswordInput;
  
};

export default resetPasswordHandler;
