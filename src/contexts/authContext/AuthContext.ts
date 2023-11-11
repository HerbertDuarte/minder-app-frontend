import {createContext, useContext} from 'react'

interface AuthContextProps {
  login: (data : {username: string, password: string}) => Promise<unknown | any>
  logout: () => void
  user: string
  setUser: (user: string) => void
  token : String,
  error : String,
}

const AuthContext = createContext({} as AuthContextProps)

const useAuth = () => {
  return useContext(AuthContext)
}
export {AuthContext, useAuth}