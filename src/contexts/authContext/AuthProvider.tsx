"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { AuthContext } from "./AuthContext";
import Notify from "@/components/assets/Notify";
import { useRouter } from "next/navigation";
import Loader from "@/components/assets/Loader";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const api = useAxios();

  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const router = useRouter();
  /* MODAIS */
  const modelError = useState<boolean>(false);
  const [_, setErrorNotify] = modelError;
  const [error, setError] = useState<string>("");
  const exitNotificationModel = useState<boolean>(false);
  const [exitNotificationMessage, setExitNotificationMessage] =
    useState<string>("");

  /* LOGIN */
  async function login(data: { email: string; password: string }) {
    setErrorNotify(false);
    setAuthLoading(true);
    try {
      const { email, password } = data;
      const response = await api.post("/user/auth", { email, password });
      setUser(response.data.user);
      setToken(response.data.access_token);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setError(error.response.data.message);
        setErrorNotify(true);
      } else {
        setError("Internal server error!");
        setErrorNotify(true);
      }
      console.error(error?.response);
    }
    setAuthLoading(false);
    return;
  }

  /* LOGOUT */
  function logout() {
    setAuthLoading(true);
    setToken("");
    setUser(undefined);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("logout");
    exitNotificationModel[1](true);
    setExitNotificationMessage("Session closed successfully");
    setAuthLoading(false);
    router.push("/");
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        setUser,
        token,
        setToken,
        error,
        authLoading,
        setAuthLoading,
      }}
    >
      <Notify model={modelError} theme="danger" text={`${error}!`} />
      <Notify
        model={exitNotificationModel}
        theme="success"
        text={`${exitNotificationMessage}!`}
      />

      {authLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
