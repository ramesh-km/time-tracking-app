import { z } from "zod";

const configSchema = z.object({
  PORT: z.string().default("7002"),
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z
    .string()
    .default("postgres://postgres:postgres@localhost:5432/postgres"),
  JWT_SECRET: z.string().default("secret"),
});

const config = configSchema.parse(process.env);

export default config;
