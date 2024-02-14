"use client";

import React, { useState } from "react";
import FormButton from "../assets/FormButton";
import { EyeIcon, EyeOffIcon, UserIcon, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/authContext/AuthContext";
import { toast } from "sonner";
import { useAxios } from "@/hooks/useAxios";
import Loader from "../assets/Loader";
interface IError {
  response?: {
    data?: {
      message?: string;
    };
  };
}
export default function FormLogin() {
  const { api } = useAxios();
  const { login } = useAuth();
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfPassword, setSeeConfPassword] = useState(false);
  const [signing, setSigning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const showHidePass = (e: any) => {
    e.preventDefault();
    setSeePassword((prev) => !prev);
  };

  const showHideConfPass = (e: any) => {
    e.preventDefault();
    setSeeConfPassword((prev) => !prev);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const { email, password } = form;
    try {
      login({ email, password });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  async function handleRegister() {
    setLoading(true);
    if (validateForm()) {
      try {
        await api.post("/user", form);
        setSigning(false);
        toast.success("Usuário criado com successo. Tente fazer o login!");
      } catch (error: IError | any | unknown) {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("Erro ao criar usuário!");
        }
      }
    }
    setLoading(false);
  }

  function validateForm() {
    const { name, confirmPassword, email, password } = form;

    if (name === "") {
      toast.error("Por favor preencha o campo nome!");
      return false;
    }

    if (email === "") {
      toast.error("Por favor preencha o campo email!");
      return false;
    }

    if (!validarEmail(email)) {
      toast.error("Por favor insira um email válido!");
      return false;
    }

    if (password === "") {
      toast.error("Por favor preencha o campo senha!");
      return false;
    }

    if (confirmPassword === "") {
      toast.error("Por favor preencha o campo confirmação de senha!");
      return false;
    }

    if (confirmPassword !== password) {
      toast.error(
        "Confirmação de senha inválida. Verifique as senhas e tente novamente!"
      );
      return false;
    }

    if (password.length < 6) {
      toast.error("A senha precisa ter no mínimo 6 digitos!");
      return false;
    }

    return true;
  }

  function validarEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  return loading ? (
    <>
      <Loader />
    </>
  ) : signing ? (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start bg-gray-50 shadow-lg border w-full max-w-[600px] p-6 rounded-lg gap-1"
    >
      <h1 className="text-center text-2xl text-gray-800 font-medium pb-4 flex gap-2">
        <UserPlus /> Registrar
      </h1>

      <label className="w-full">
        <p className="text-gray-800 font-medium">Nome</p>
        <input
          className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 w-full rounded outline-none"
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>

      <label className="w-full">
        <p className="text-gray-800 font-medium">Email</p>
        <input
          className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 w-full rounded outline-none"
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>

      <label className="relative w-full">
        <p className="text-gray-800 font-medium">Senha</p>
        <input
          className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 pr-9 rounded w-full outline-none"
          id="password"
          type={seePassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <span
          className="absolute cursor-pointer text-gray-600 bottom-2 right-2"
          onClick={showHidePass}
        >
          {seePassword ? (
            <EyeIcon size="1.4rem" />
          ) : (
            <EyeOffIcon size="1.4rem" />
          )}
        </span>
      </label>

      <label className="relative w-full">
        <p className="text-gray-800 font-medium">Confirmação de senha</p>
        <input
          className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 pr-9 rounded w-full outline-none"
          id="confirm_password"
          type={seeConfPassword ? "text" : "password"}
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />
        <span
          className="absolute cursor-pointer text-gray-600 bottom-2 right-2"
          onClick={showHideConfPass}
        >
          {seeConfPassword ? (
            <EyeIcon size="1.4rem" />
          ) : (
            <EyeOffIcon size="1.4rem" />
          )}
        </span>
      </label>

      <div className="flex w-full justify-between gap-3 mt-4">
        <button type="button" className="text-gray-700 hover:text-violet-700 text-sm font-medium hover:underline p-3 pl-1" onClick={() => setSigning(false)} >
         Fazer login
        </button>
        <FormButton theme="700" action={() => handleRegister()}>Registrar</FormButton>
      </div>
    </form>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start bg-gray-50 shadow-lg border w-full max-w-[600px] p-6 rounded-lg gap-1"
    >
      <h1 className="text-center text-2xl text-gray-800 font-medium pb-4 flex gap-2">
        <UserIcon /> Login
      </h1>
      <label className="w-full">
        <p className="text-gray-800 font-medium">Email</p>
        <input
          className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 w-full rounded outline-none"
          id="email"
          type="text"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>

      <label className="relative w-full">
        <p className="text-gray-800 font-medium">Senha</p>
        <input
          className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 pr-9 rounded w-full outline-none"
          id="password"
          type={seePassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <span
          className="absolute cursor-pointer text-gray-600 bottom-2 right-2"
          onClick={showHidePass}
        >
          {seePassword ? (
            <EyeIcon size="1.4rem" />
          ) : (
            <EyeOffIcon size="1.4rem" />
          )}
        </span>
      </label>

      <div className="flex w-full justify-between gap-3 mt-4">
        <button type="button" className="text-gray-700 hover:text-violet-700 text-sm font-medium hover:underline p-3 pl-1" onClick={() => setSigning(true)} >
          Criar conta
        </button>
        <FormButton submit theme="700">Entrar</FormButton>
      </div>
    </form>
  );
}
