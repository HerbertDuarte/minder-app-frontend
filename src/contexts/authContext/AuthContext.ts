import { Dispatch, createContext, useContext } from "react";
export interface INote {
  id?: string;
  content: string;
  createdAt: string;
}
interface AuthContextProps {
  login: (data: { email: string; password: string }) => Promise<unknown | any>;
  logout: () => void;
  user: String | any;
  setUser: (user: String | any) => void;
  token: String;
  setToken: (user: any) => void;
  notes: INote[];
  setNotes: Dispatch<INote[]>;
  getUserData: (id: string, token: string) => Promise<boolean>;
}

const AuthContext = createContext({} as AuthContextProps);

const useAuth = () => {
  return useContext(AuthContext);
};
export { AuthContext, useAuth };
