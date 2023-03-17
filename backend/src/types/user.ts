import { z } from "zod";
import { loginUserSchema, registerUserSchema } from "../modules/user/zod-schemas";

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;

export interface SafeUser {
  id: number;
  email: string;
  name: string;
  preferences: unknown;
} 

export interface AuthResponse {
  user: SafeUser;
  token: string;
}