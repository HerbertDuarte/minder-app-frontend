"use client";
import FormButton from "@/components/assets/FormButton";
import Button from "@/components/assets/Button";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/authContext/AuthContext";
import { EditIcon } from "lucide-react";
import Notify from "../assets/Notify";

export default function FormEditUser() {
  const router = useRouter();
  const { user } = useAuth();
  const errorNotify = useState(false);
  const [errorText, setErrorText] = useState("");
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  function handleUpdateUser(event: FormEvent) {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      let newPassword: boolean | string = false;

      if (
        form.newPassword !== "" &&
        form.confirmNewPassword !== "" &&
        form.newPassword === form.confirmNewPassword
      ) {
        newPassword = form.newPassword;
      }

      const { email, name } = form;

      const body = {
        email,
        name,
        password: newPassword ? newPassword : form.password,
      };

      console.log(body);
    }
  }

  function validate() {
    const { name, confirmNewPassword, email, newPassword, password } = form;
    if (name === "") {
      setErrorText("Please, fill the field name!");
      errorNotify[1](true);
      return false;
    }

    if (email === "") {
      setErrorText("Please, fill the field email!");
      errorNotify[1](true);
      return false;
    }

    if (password === "") {
      setErrorText("Please, fill the field password!");
      errorNotify[1](true);
      return false;
    }

    if (password.length < 6 || newPassword.length < 6 || confirmNewPassword.length < 6) {
      setErrorText("Password must be at least 6 characters!");
      errorNotify[1](true);
      return false;
    }

    if (
      (newPassword !== "" || confirmNewPassword !== "") &&
      confirmNewPassword !== newPassword
    ) {
      setErrorText("Please, correctly confirm your new password!");
      errorNotify[1](true);
      return false;
    }

    return true;
  }
  return (
    <>
      <Notify theme="danger" text={errorText} model={errorNotify} />
      <form
        onSubmit={handleUpdateUser}
        className="max-w-xl w-full flex flex-col gap-1 p-6 m-3 bg-zinc-900 rounded-xl"
      >
        <h1 className="text-xl font-medium text-zinc-400 pb-6 flex gap-2">
          <EditIcon /> Edit your profile
        </h1>
        <label className="w-full">
          <p className="pl-1 text-zinc-500">
            name <span className="text-red-800">*</span>
          </p>
          <input
            className="bg-zinc-800 outline-none p-2 rounded w-full"
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </label>
        <label className="w-full">
          <p className="pl-1 text-zinc-500">
            email <span className="text-red-800">*</span>
          </p>
          <input
            className="bg-zinc-800 outline-none p-2 rounded w-full"
            type="text"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </label>
        <label className="w-full">
          <p className="pl-1 text-zinc-500">
            password <span className="text-red-800">*</span>
          </p>
          <input
            className="bg-zinc-800 outline-none p-2 rounded w-full"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </label>
        <label className="w-full">
          <p className="pl-1 text-zinc-500">
            new password <span className="text-zinc-600">(optional)</span>
          </p>
          <input
            className="bg-zinc-800 outline-none p-2 rounded w-full"
            type="password"
            value={form.newPassword}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, newPassword: e.target.value }))
            }
          />
        </label>
        <label className="w-full">
          <p className="pl-1 text-zinc-500">
            confirm new password{" "}
            <span className="text-zinc-600">(optional)</span>
          </p>
          <input
            className="bg-zinc-800 outline-none p-2 rounded w-full"
            type="password"
            value={form.confirmNewPassword}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                confirmNewPassword: e.target.value,
              }))
            }
          />
        </label>

        <div className="flex justify-end pt-4 gap-2">
          <Button theme="danger" action={() => router.back()}>
            Cancel
          </Button>
          <FormButton submit>save</FormButton>
        </div>
      </form>
    </>
  );
}
