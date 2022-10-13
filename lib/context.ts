import { createContext } from "react";
import {User} from "firebase/auth";

interface UserContextInterface {
  user: User;
  type?: string;
  name?: string;
}

export const UserContext = createContext<UserContextInterface | null>(null);