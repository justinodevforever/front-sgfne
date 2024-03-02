import { createContext, useContext } from "react";

const UserContext = createContext({});

export function useAth() {
  return useContext(UserContext);
}

export default UserContext;
