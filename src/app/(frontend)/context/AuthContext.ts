import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { createContext, useContext } from "react";

type authContextType = {
  logged: boolean;
  login: (userLogged: IUser) => void;
  logout: () => void;
  userLogged: IUser | null;
  getUserFromSession: () => Promise<IUser | undefined>;
};

const authContextDefaultValue: authContextType = {
  logged: false,
  userLogged: null,
  login: () => {},
  logout: () => {},
  getUserFromSession: async () => {
    return undefined;
  },
};

export const AuthContext = createContext<authContextType>(
  authContextDefaultValue
);

export function useAuth() {
  return useContext(AuthContext);
}
