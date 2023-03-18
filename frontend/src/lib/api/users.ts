import { LoginFormData, RegisterFormData, User } from "../../types/users";
import http from "../http";

export async function registerUser(data: RegisterFormData) {
  const res = await http.post<User>("/user/register", data);
  return res.data;
}

export async function loginUser(data: LoginFormData) {
  const res = await http.post<User>("/user/login", data);
  return res.data;
}

