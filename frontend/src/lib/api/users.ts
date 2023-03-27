import {
  LoginFormData,
  RegisterFormData,
  ResetLinkParams,
  ResetPasswordFormData,
  UpdateUserData,
  User,
} from "../../types/users";
import http from "../http";

export async function registerUser(data: RegisterFormData) {
  const res = await http.post<User>("/user/register", data);
  return res.data;
}

export async function loginUser(data: LoginFormData) {
  const res = await http.post<User>("/user/login", data);
  return res.data;
}

export async function forgotPassword(email: string) {
  const res = await http.post("/user/create-password-reset-ticket", { email });
  return res.data;
}

export async function resetPassword(
  data: ResetPasswordFormData & ResetLinkParams
) {
  const res = await http.post("/user/reset-password", data);
  return res.data;
}

export async function updateUserData(data: UpdateUserData) {
  const res = await http.put<User>("/user", data);
  return res.data;
}
