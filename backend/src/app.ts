import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import errorHandler from "./lib/middleware/error-handler";
import tagsRouter from "./modules/tag/router";
import { authenticate } from "./lib/middleware/authenticate";
import timeEntriesRouter from "./modules/time-entry/router";
import userRouter from "./modules/user/router";

const app = express();

app.use(authenticate());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());


// Register routes
app.use('/api/v1/tag', tagsRouter);
app.use('/api/v1/time-entry', timeEntriesRouter);
app.use('/api/v1/user', userRouter);

// Register error handler middleware
app.use(errorHandler);

export default app;