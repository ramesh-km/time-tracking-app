import { Router } from "express";
import validate from "../../lib/middleware/validate";
import loginUserHandler from "./handlers/login-user";
import registerUserHandler from "./handlers/register-user";
import { loginUserSchema, registerUserSchema } from "./zod-schemas";

const router = Router();

router.post("/register", validate(registerUserSchema), registerUserHandler);
router.post("/login", validate(loginUserSchema), loginUserHandler);

export default router;
