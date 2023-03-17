import { Router } from "express";
import validate from "../../lib/middleware/validate";
import createTagHandler from "./handlers/create-tag";
import { createTagSchema } from "./zod-schemas";

const router = Router();

router.post("/", validate(createTagSchema), createTagHandler);



export default router;
