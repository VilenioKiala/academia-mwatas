"use client";

import React from "react";
import { AuthContext } from "../AuthContext";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { getUser } from "@/app/lib/session";

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [logged, setLogged] = React.useState<boolean>(false);
  const [userLogged, setUserLogged] = React.useState<IUser | null>(null);

  const login = (user: IUser) => {
    setLogged(true);
    setUserLogged(user);
  };

  const logout = () => {
    setLogged(false);
    setUserLogged(null);
  };

  const getUserFromSession = async () => {
    const user = await getUser();

    setUserLogged(user);

    return user;
  };

  const value = {
    getUserFromSession,
    userLogged,
    logged,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
