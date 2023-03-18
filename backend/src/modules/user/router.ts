import { Router } from "express";
import validate from "../../lib/middleware/validate";
import handleCreatePasswordResetTicket from "./handlers/create-password-reset-ticket";
import loginUserHandler from "./handlers/login-user";
import registerUserHandler from "./handlers/register-user";
import resetPasswordHandler from "./handlers/reset-password";
import {
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
} from "./zod-schemas";

const router = Router();

router.post("/register", validate(registerUserSchema), registerUserHandler);
router.post("/login", validate(loginUserSchema), loginUserHandler);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPasswordHandler
);
router.post("/create-password-reset-ticket", handleCreatePasswordResetTicket);

export default router;
