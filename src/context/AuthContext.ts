import { createContext } from "react";

interface AuthContext {
  name: string;
}

const AuthContextData = createContext<AuthContext>({} as AuthContext);

export default AuthContextData;
