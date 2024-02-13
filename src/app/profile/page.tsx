"use client";
import Button from "@/components/assets/Button";
import Dialog from "@/components/assets/Dialog";
import { useAuth } from "@/contexts/authContext/AuthContext";
import { useAxios } from "@/hooks/useAxios";
import { ArrowLeft, Home, Info, LogOut, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const { logout, user, setUser, token } = useAuth();
  const { api } = useAxios();
  const logoutDialog = useState<boolean>(false);
  const router = useRouter();
  const [_, setLogoutDialog] = logoutDialog;
  useEffect(() => {
    async function updateDataUser() {
      const { data } = await api.get(`/user/${user.id}`);
      setUser(data);
    }
    try {
      updateDataUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Dialog model={logoutDialog}>
        <h1 className="pb-4">Tem certeza que deseja encerrar a seção?</h1>
        <div className="w-full flex justify-center gap-2 pt-2">
          <Button action={() => setLogoutDialog(false)} theme="700">
            Cancelar
          </Button>
          <Button action={() => logout()}>Confirmar</Button>
        </div>
      </Dialog>
      <main className="justify-center items-start p-3">
        <div className="flex flex-col justify- items-center w-full flex-1">
          <div
            // onClick={() => router.push("/profile/edit")}
            className="flex flex-col justify-center items-center text-center gap-2 text-gray-700 w-full"
          >
            <div className="bg-gray-200 md:p-4 p-3 flex justify-center items-center rounded-full">
              <User2Icon size={45} />
            </div>
            <div className="py-2">
              <h1 className="md:text-2xl text-xl font-bold flex justify-center items-center gap-2">
                <span className="truncate max-w-[10ch] xs:max-w-[20ch] sm:max-w-30ch">
                  {user.name}
                </span>
                {/* <span className="cursor-pointer">
                <Edit2Icon size={20} strokeWidth={3} />
              </span> */}
              </h1>
              <p className="md:text-lg text-md text-violet-700/60">{user.email}</p>
            </div>
          </div>
          <div className="h-px w-full bg-gray-200 my-7" />
          <div className="flex flex-col justify-center items-center w-full max-w-[300px]">
            <button
              onClick={() => router.push("/")}
              className="text-gray-600 flex justify-between items-center py-4 px-8 rounded gap-2 w-full hover:bg-gray-200"
            >
              <p>Ir para home</p>
              <Home />
            </button>

            <a
              target="_blank"
              href="https://herbertduarte.vercel.app/"
              className="text-gray-600 flex justify-between items-center py-4 px-8 rounded gap-2 w-full hover:bg-gray-200"
            >
              <p>Desenvolvido por</p>
              <Info />
            </a>

            <button
              onClick={() => setLogoutDialog(true)}
              className="text-gray-600 flex justify-between items-center py-4 px-8 rounded gap-2 w-full hover:bg-gray-200"
            >
              <p>Encerrar seção</p>
              <LogOut />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
