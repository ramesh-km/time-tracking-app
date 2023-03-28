import { Router } from "express";
import validate from "../../lib/middleware/validate";
import { idSchema } from "../../lib/zod-schemas";
import getAllCurrentWeekEntriesHandler from "./handlers/all-current-week-entries";
import createTimeEntryHandler from "./handlers/create-time-entry";
import deleteTimeEntryHandler from "./handlers/delete-time-entry";
import getTimeEntryHandler from "./handlers/get-time-entry";
import getTimeEntriesInsightsHandler from "./handlers/insights-data";
import stopTimeEntryHandler from "./handlers/stop-time-entry";
import getTimeEntriesReportHandler from "./handlers/time-entries-report";
import updateTimeEntryHandler from "./handlers/update-time-entry";
import {
  createTimeEntrySchema,
  getTimeEntriesReportSchema,
  insightsDataSchema,
} from "./zod-schemas";

const router = Router();

router.post("/", validate(createTimeEntrySchema), createTimeEntryHandler);
router.get(
  "/report",
  validate(getTimeEntriesReportSchema, "query"),
  getTimeEntriesReportHandler
);
router.get(
  "/insights",
  validate(insightsDataSchema, "query"),
  getTimeEntriesInsightsHandler
);
router.get("/all-current-week-entries", getAllCurrentWeekEntriesHandler);
router.put("/stop/:id", validate(idSchema, "params"), stopTimeEntryHandler);
router.get("/:id", validate(idSchema, "params"), getTimeEntryHandler);
router.put("/:id", validate(idSchema, "params"), updateTimeEntryHandler);
router.delete("/:id", validate(idSchema, "params"), deleteTimeEntryHandler);

export default router;
