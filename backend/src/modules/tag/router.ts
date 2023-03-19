import { Router } from "express";
import validate from "../../lib/middleware/validate";
import createTagHandler from "./handlers/create-tag";
import deleteTagHandler from "./handlers/delete-tag";
import getAllTagsHandler from "./handlers/get-all";
import getTagsWithCountHandler from "./handlers/get-tags-with-count";
import { createTagSchema, deleteTagSchema } from "./zod-schemas";

const router = Router({
  mergeParams: true,
});

router.post("/", validate(createTagSchema), createTagHandler);
router.delete("/:name", validate(deleteTagSchema, "params"), deleteTagHandler);
router.get("/all", getAllTagsHandler);
router.get("/all-with-count", getTagsWithCountHandler);

export default router;
