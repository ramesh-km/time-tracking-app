import { z } from "zod";
import { idSchema } from "../../lib/zod-schemas";

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
  name: z.string().min(1).max(255),
});


export const updateUserDataSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  currentPassword: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .optional(),
  newPassword: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .optional(),
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
