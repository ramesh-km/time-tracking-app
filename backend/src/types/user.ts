import { z } from "zod";
import {
  createPasswordResetTicketSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  updateUserDataSchema,
} from "../modules/user/zod-schemas";

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type UpdateUserData = z.infer<typeof updateUserDataSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type CreatePasswordResetTicketInput = z.infer<
  typeof createPasswordResetTicketSchema
>;

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
