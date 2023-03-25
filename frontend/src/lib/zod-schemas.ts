import { string, z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name should be at least 2 characters"),
  })
  .merge(loginSchema);

export const apiErrorSchema = z.object({
  message: z.string(),
  error: z.any().optional(),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export const resetLinkParamsSchema = z.object({
  token: z.string().min(1),
  id: z
    .string()
    .min(1)
    .transform((id) => parseInt(id, 10)),
});

export const createTagSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9_ ]+$/)
    .min(1)
    .max(50),
});

export const createTimeEntrySchema = z.object({
  note: z.string().min(1).max(255),
  tags: z.array(z.string().min(1).max(50)),
});

export const updateTimeEntrySchema = z
  .object({
    start: z.date(),
    end: z.date().optional(),
  })
  .merge(createTimeEntrySchema);
