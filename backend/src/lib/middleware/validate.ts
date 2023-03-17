import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

function validate(
  schema: ZodSchema,
  reqBodyProp: "params" | "query" | "body" = "body"
) {
  return (req: Request, res:Response, next: NextFunction) => {
    const zodResult = schema.safeParse(req[reqBodyProp]);
    
    if (!zodResult.success) {
      next(zodResult.error);
      return;
    }

    next();
  };
}

export default validate;
