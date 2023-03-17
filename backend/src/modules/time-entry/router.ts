import { Router } from "express";
import validate from "../../lib/middleware/validate";

const router = Router();

router.post("/", validate(createTagSchema), createTagHandler);

export default router;
