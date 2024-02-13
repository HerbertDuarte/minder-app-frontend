import React from "react";

interface ButtonProps {
  theme?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "outline"
    | "outline-red"
    | "outline-blue"
    | "900"
    | "700";
  action?: () => void;
  flat?: boolean;
  dense?: boolean;
  children: React.ReactNode;
  submit?: boolean;
}
export default function FormButton({
  theme,
  action,
  dense,
  children,
  submit = false,
}: ButtonProps) {
  let classButton;

  switch (theme) {
    case "primary":
      classButton = "bg-gray-700 text-white";
      break;
    case "secondary":
      classButton = "bg-blue-500 text-white";
      break;
    case "danger":
      classButton = "bg-red-500 text-white";
      break;
    case "success":
      classButton = "bg-green-500 text-white";
      break;
    case "warning":
      classButton = "bg-yellow-200 text-yellow-900";
      break;
    case "outline":
      classButton = " bg-gray-100 border p-2 text-gray-600 hover:bg-gray-200";
      break;
    case "outline-red":
      classButton =
        " bg-gray-100 border p-2 text-gray-600 hover:bg-gray-200 hover:text-red-500/70";
      break;
    case "outline-blue":
      classButton =
        " bg-gray-100 border p-2 text-gray-600 hover:bg-gray-200 hover:text-blue-700/70";
      break;
    case "900":
      classButton = "bg-gray-900 text-gray-300";
      break;
    case "700":
      classButton = "bg-gray-700 text-gray-300";
      break;
    default:
      classButton =
        "bg-gray-200 border p-2 hover:bg-gray-300 hover:text-800 text-gray-500";
      break;
  }
  if (dense) {
    classButton += " p-1";
  } else {
    classButton += " py-2 px-3";
  }

  return submit ? (
    <input
      value={String(children)}
      type="submit"
      className={`${classButton} rounded cursor-pointer hover:opacity-90 transition-opacity`}
    />
  ) : (
    <input
      value={String(children)}
      type="button"
      className={`${classButton} rounded cursor-pointer hover:opacity-90 transition-opacity`}
      onClick={action || (() => {})}
    />
  );
}
