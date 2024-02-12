import React from "react";

interface ButtonProps {
  theme?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
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
  flat,
  dense,
  children,
  submit = false,
}: ButtonProps) {
  let classButton;

  if (flat) {
    switch (theme) {
      case "primary":
        classButton = "bg-primary-light/90 text-primary";
        break;
      case "secondary":
        classButton = "bg-blue-100/90 text-blue-900";
        break;
      case "danger":
        classButton = "bg-red-100/90 text-red-950";
        break;
      case "success":
        classButton = "bg-green-100/90 text-green-950";
        break;
      case "warning":
        classButton = "bg-yellow-100/90 text-yellow-950";
        break;
      default:
        classButton = "bg-gray-200/90 text-gray-600";
        break;
    }
  } else {
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
