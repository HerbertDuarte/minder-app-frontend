"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext/AuthContext";
import Login from "@/components/login/page";
import Layout from "@/components/Layouts/MainLayout";
import Loader from "@/components/assets/Loader";

export default function RouterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUserData, user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handle() {
      const dataToken = localStorage.getItem("token") as string | any;
      const dataUser = await JSON.parse(
        localStorage.getItem("user") as string | any
      );
      if (dataToken && dataUser && dataUser.id) {
        await getUserData(dataUser.id, dataToken);
      }
      setLoading(false);
    }
    handle();
  }, []);

  return (
    <>
      {loading ? (
        <main>
          <Loader />
        </main>
      ) : user ? (
        <Layout>{children}</Layout>
      ) : (
        <Login />
      )}
    </>
  );
}
