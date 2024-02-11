"use client";

import React, { useState, useEffect } from "react";
import FormButton from "../assets/FormButton";
import { EyeIcon, EyeOffIcon, UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/authContext/AuthContext";
import Notify from "../assets/Notify";

export default function FormLogin() {
  const { login } = useAuth();
  const [seePassword, setSeePassword] = useState(false);
  const model = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const showHidePass = (e: any) => {
    e.preventDefault();
    setSeePassword((prev) => !prev);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    try {
      login(form);
    } catch (err) {
      console.log(err);
    }
  }

  function handleRegister() {
    model[1](true);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start bg-zinc-900 w-full max-w-[600px] p-6 rounded-lg gap-1"
    >
      <h1 className="text-center text-2xl text-zinc-400 font-medium pb-4 flex gap-2">
        <UserIcon /> Login
      </h1>
      <Notify text="Register" model={model} />
      <label className="w-full">
        <p className="text-zinc-400 font-medium">Email</p>
        <input
          className="hover:bg-zinc-600 active:bg-zinc-600 focus:bg-zinc-600 focus-visible:bg-zinc-600 bg-zinc-700 p-2 w-full rounded outline-none"
          id="email"
          type="text"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>

      <label className="relative w-full">
        <p className="text-zinc-400 font-medium">Password</p>
        <input
          className="hover:bg-zinc-600 active:bg-zinc-600 focus:bg-zinc-600 focus-visible:bg-zinc-600 bg-zinc-700 p-2 pr-9 rounded w-full outline-none"
          id="password"
          type={seePassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <span
          className="absolute cursor-pointer text-zinc-300 bottom-2 right-2"
          onClick={showHidePass}
        >
          {seePassword ? (
            <EyeIcon size="1.4rem" />
          ) : (
            <EyeOffIcon size="1.4rem" />
          )}
        </span>
      </label>

      <div className="flex w-full justify-end gap-3 mt-4">
        <FormButton action={handleRegister} theme="danger">
          Register
        </FormButton>
        <FormButton submit>Login</FormButton>
      </div>
    </form>
  );
}
