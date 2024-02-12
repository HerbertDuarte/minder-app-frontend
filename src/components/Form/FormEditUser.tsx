"use client";
import FormButton from "@/components/assets/FormButton";
import Button from "@/components/assets/Button";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/authContext/AuthContext";
import { EditIcon } from "lucide-react";
import { toast } from "sonner";

export default function FormEditUser() {
  const router = useRouter();
  const { user } = useAuth();
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
      toast.error("Please, fill the field name!");
      return false;
    }

    if (email === "") {
      toast.error("Please, fill the field email!");
      return false;
    }

    if (password === "") {
      toast.error("Please, fill the field password!");
      return false;
    }

    if (
      password.length < 6 ||
      newPassword.length < 6 ||
      confirmNewPassword.length < 6
    ) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }

    if (
      (newPassword !== "" || confirmNewPassword !== "") &&
      confirmNewPassword !== newPassword
    ) {
      toast.error("Please, correctly confirm your new password!");
      return false;
    }

    return true;
  }
  return (
    <>
      <form
        onSubmit={handleUpdateUser}
        className="max-w-xl w-full flex flex-col gap-1 p-6 m-3 bg-gray-100 rounded-xl shadow-lg"
      >
        <h1 className="text-xl font-medium text-gray-800 pb-6 flex gap-2">
          <EditIcon /> Edit your profile
        </h1>
        <label className="w-full">
          <p className="pl-1 text-gray-700">
            name <span className="text-red-800">*</span>
          </p>
          <input
            className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 w-full rounded outline-none"
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </label>
        <label className="w-full">
          <p className="pl-1 text-gray-700">
            email <span className="text-red-800">*</span>
          </p>
          <input
            className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 w-full rounded outline-none"
            type="text"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </label>
        <label className="w-full">
          <p className="pl-1 text-gray-700">
            password <span className="text-red-800">*</span>
          </p>
          <input
            className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 w-full rounded outline-none"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </label>
        <label className="w-full">
          <p className="pl-1 text-gray-700">
            new password <span className="text-gray-700">(optional)</span>
          </p>
          <input
            className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 w-full rounded outline-none"
            type="password"
            value={form.newPassword}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, newPassword: e.target.value }))
            }
          />
        </label>
        <label className="w-full">
          <p className="pl-1 text-gray-700">
            confirm new password{" "}
            <span className="text-gray-700">(optional)</span>
          </p>
          <input
            className="hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 focus-visible:bg-gray-200 bg-gray-200 text-zinc-600 p-2 w-full rounded outline-none"
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
