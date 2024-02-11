"use client";

import { HelpCircleIcon, HomeIcon, FlameIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import useScreenWidth from "@/hooks/useScreenWidth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { windowWidth } = useScreenWidth();
  const drawerRef = useRef<HTMLDivElement>(null);
  const RouterLinks = [
    {
      name: "Home",
      path: "/",
      icon: () => <HomeIcon />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: () => <HelpCircleIcon />,
    },
  ];
  function handleMenu() {
    setIsOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        handleMenu();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <header className="z-40 fixed text-zinc-500 top-0 bg-zinc-950 w-full flex justify-between p-5">
        <p className="flex gap-2 flex-nowrap font-medium">minder app</p>
        {windowWidth > 600 ? (
          <nav className="flex flex-row flex-nowrap justify-center items-center gap-4 mx-3">
            {RouterLinks.map((item, index) => (
              <Link
                className={`flex justify-center items-center gap-1 ${
                  pathname === item.path ? "text-violet-500" : ""
                }`}
                key={index}
                href={item.path}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        ) : (
          <div ref={drawerRef}>
            <MenuIcon
              className="cursor-pointer"
              onClick={handleMenu}
              strokeWidth={1.5}
            />

            <div
              className={`absolute z-50 right-0 top-12 min-h-flex bg-zinc-950 transition-transform transform h-screen ${
                !isOpen && "translate-x-full"
              } w-[260px]`}
            >
              <nav
                className={`flex flex-col justify-center items-center min-w-[260px]`}
              >
                {RouterLinks.map((item, index) => (
                  <Link
                    onClick={closeMenu}
                    className={`flex justify-center items-center gap-1 hover:bg-zinc-900 w-full py-4 ${
                      pathname === item.path
                        ? "text-violet-500"
                        : "text-zinc-300"
                    }`}
                    key={index}
                    href={item.path}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
      <div className="pt-12">{children}</div>
    </>
  );
}
