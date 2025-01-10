import { IUser } from "@/app/(backend)/interfaces/objects/IUser";

export function loginReducer(userLogged: IUser, action: { type: string }) {
  switch (action.type) {
    case "login": {
      return {
        logged: true,
        userLogged,
      };
    }
    case "logout": {
      return {
        logged: false,
        userLogged,
      };
    }
  }
}
