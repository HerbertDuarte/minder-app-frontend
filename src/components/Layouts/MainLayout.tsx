"use client";

import { UserIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <>
      <header className="z-40 fixed text-gray-600 top-0 bg-gray-50 w-full flex justify-between items-center py-2 px-3">
        <Link
          href={"/"}
          className="flex gap-2 flex-nowrap font-medium p-3 rounded"
        >
          minder app
        </Link>

        <Link
          className={`flex justify-center items-center gap-2 bg-gray-100 border  p-2 rounded-md text-violet-500`}
          href={"/profile"}
        >
          <UserIcon className="rounded-full size-7 p-1" />
          <p className="text-gray-600">{user?.name}</p>
        </Link>
      </header>
      <div className="pt-12">{children}</div>
    </>
  );
}
