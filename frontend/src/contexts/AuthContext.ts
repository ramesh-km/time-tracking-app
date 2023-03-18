import { createContext } from "react";
import { AuthContextType } from "../types/users";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => void 0,
  logout: () => void 0,
  registerUser: () => void 0,
  // isLoading: false,
});
