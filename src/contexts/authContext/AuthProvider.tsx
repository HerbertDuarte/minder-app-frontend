"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { AuthContext, INote } from "./AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { api, updateToken } = useAxios();

  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<string>("");
  const [notes, setNotes] = useState<INote[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  /* MODAIS */
  const modelError = useState<boolean>(false);
  const [_, setErrorNotify] = modelError;
  useState<string>("");

  /* LOGIN */
  async function login(data: { email: string; password: string }) {
    setErrorNotify(false);
    setLoading(true);

    try {
      const { email, password } = data;
      const response = await api.post("/user/auth", {
        email,
        password,
      });
      setUser(response.data.user);
      setToken(response.data.access_token);
      const apiWithAccess = updateToken(response.data.access_token);
      const { data: notesData } = await apiWithAccess.get("/note");
      setNotes(notesData);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Ops! Houve um erro inesperado, tente novamente mais tarde!"
        );
        console.log(error);
      }
      console.error(error?.response);
    }
    setLoading(false);
    return;
  }

  /* LOGOUT */
  function logout() {
    setLoading(true);

    setToken("");
    setUser(undefined);
    setNotes([])

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Seção finalizada com sucesso!");
    router.push("/");
    setLoading(false);
  }

  async function getUserData(id: string, token: string) {
    setLoading(true);

    try {
      const api = updateToken(token);
      const { data: user } = await api.get("/user/" + id);
      const { data: notes } = await api.get("/note");
      setUser(user);
      setToken(token);
      setNotes(notes);
      setLoading(false);

      return true;
    } catch (error) {
      logout();
      setLoading(false);

      return false;
    }
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token, setToken]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user, setUser]);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        setUser,
        token,
        setToken,
        notes,
        setNotes,
        getUserData,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
