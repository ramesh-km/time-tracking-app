import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { isHttpError } from "http-errors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Invalid request body",
      error: err.errors,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(409).json({
        message: "A resource with that value already exists",
      });
      return;
    }

    if (err.code === "P2025") {
      res.status(404).json({
        message: "Resource not found",
      });
      return;
    }
  }

  if (isHttpError(err)) {
    res.status(err.statusCode).json({
      message: err.message,
      error: err.expose ? err : undefined,
    });
    return;
  }

  console.error(err);
  res.status(500).json({
    message: "Internal server error",
  });
};

export default errorHandler;
