import { useAuth } from "@/contexts/authContext/AuthContext";
import axios from "axios";

export function useAxios(prevToken?: string) {
  let api;
  const { token } = useAuth();

  if (prevToken) {
    api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${prevToken}`,
      },
    });
  } else if (token) {
    api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  function updateToken(token : string) {
    api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return api
  }

  return {updateToken, api}
}
