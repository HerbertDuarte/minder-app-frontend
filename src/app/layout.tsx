import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/authContext/AuthProvider";
import RouterProvider from "@/Router/RouterProvider";
import { Toaster } from "sonner";
const  inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "minder app",
  description: "Aplicativo de armazenamento de notas!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={
          inter.className +
          " overflow-x-hidden bg-gray-50 text-gray-200 antialiased"
        }
      >
        <Toaster richColors theme="light" />
        <AuthProvider>
          <RouterProvider>{children}</RouterProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
