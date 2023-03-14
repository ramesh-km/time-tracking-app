import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name should be at least 2 characters"),
  })
  .merge(loginSchema);
