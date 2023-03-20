import { Router } from "express";
import validate from "../../lib/middleware/validate";
import { idSchema } from "../../lib/zod-schemas";
import { createTagSchema } from "../tag/zod-schemas";
import createTimeEntryHandler from "./handlers/create-time-entry";
import getTimeEntryHandler from "./handlers/get-time-entry";
import timeEntriesPaginationHandler from "./handlers/time-entries-paginated";
import updateTimeEntryHandler from "./handlers/update-time-entry";
import { createTimeEntrySchema, timeEntriesPaginationSchema } from "./zod-schemas";

const router = Router();

router.post("/", validate(createTimeEntrySchema), createTimeEntryHandler);
router.get("/:id", validate(idSchema, "params"), getTimeEntryHandler);
router.put("/:id", validate(idSchema, "params"), updateTimeEntryHandler);
router.get(
  "/paginated",
  validate(timeEntriesPaginationSchema, "query"),
  timeEntriesPaginationHandler
);

export default router;
