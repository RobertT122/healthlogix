import { createContext } from "react";
import { User } from "firebase/auth";

interface UserContextInterface {
  user?: User;
  isAdmin: boolean;
}

export const UserContext = createContext<UserContextInterface>({
  isAdmin: false,
});
