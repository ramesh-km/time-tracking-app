import { createContext } from "react";
import { AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => void 0,
  logout: () => void 0,
  register: () => void 0,
  isLoading: false,
});
