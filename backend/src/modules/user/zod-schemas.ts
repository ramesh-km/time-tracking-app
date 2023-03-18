import { z } from "zod";
import { idSchema } from "../../lib/zod-schemas";

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
  name: z.string().min(1).max(255),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const updateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
  name: z.string().min(1).max(255),
  preferences: z.any(),
});

export const resetPasswordSchema = idSchema.extend({
  token: z.string().min(1).max(255),
  password: z.string().min(8).max(255),
});

export const createPasswordResetTicketSchema = z.object({
  email: z.string().email(),
});
