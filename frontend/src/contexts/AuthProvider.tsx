import { useLocalStorage } from "@mantine/hooks";
import {
  completeNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import { useEffect, useState } from "react";
import { AuthContextType, User } from "../types/auth";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useLocalStorage<User | null>({
    key: "auth-user",
    defaultValue: null,
    getInitialValueInEffect: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  // if (isLoading) {
  //   startNavigationProgress();
  // } else {
  //   completeNavigationProgress();
  // }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register: login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
