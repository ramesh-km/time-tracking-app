import { z } from "zod";
import {
  loginSchema,
  registerSchema,
  resetLinkParamsSchema,
  resetPasswordSchema,
  updateUserDataSchema,
} from "../lib/zod-schemas";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UpdateUserData = z.infer<typeof updateUserDataSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ResetLinkParams = z.infer<typeof resetLinkParamsSchema>;
export type ForgotPasswordFormData = {
  email: string;
};

export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  // isLoading: boolean;
  login: (data: User) => void;
  registerUser: (data: User) => void;
  logout: () => void;
}
