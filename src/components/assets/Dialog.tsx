import { TouchEvent, UIEvent, WheelEvent, useEffect, useRef } from "react";

interface Props {
  model: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  children: React.ReactNode;
  persistent?: boolean;
  maxWidth?: "md" | "lg" | "xl" | "2xl" | "3xl";
}

export default function Dialog({
  model,
  children,
  persistent,
  maxWidth,
}: Props) {
  const handleModalScroll = (event: UIEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (
      modalRef.current &&
      modalRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation();
    }
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (
      modalRef.current &&
      modalRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation();
    }
  };
  const [value, setValue] = model;
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);


  let maxWidthClass;

  switch (maxWidth) {
    case "md":
      maxWidthClass = " max-w-[400px]";
      break;
    case "lg":
      maxWidthClass = " max-w-[640px]";
      break;
    case "xl":
      maxWidthClass = " max-w-[764px]";
      break;
    case "2xl":
      maxWidthClass = " max-w-[900px]";
      break;
    case "3xl":
      maxWidthClass = " max-w-[1280px]";
      break;
    default:
      break;
  }
  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.key === "Escape" && !persistent) {
        setValue(false);
      }
    }

    if (value && !persistent) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setValue, value, persistent]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        !persistent
      ) {
        setValue(false);
      }
    }

    if (value && !persistent) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contentRef, setValue, value, persistent]);

  return (
    <div
      onScroll={handleModalScroll}
      onWheel={handleWheel}
      ref={modalRef}
      className={`transition-colors z-40 ${
        value ? "bg-black/50 pointer-events-auto" : "pointer-events-none"
      } w-full h-screen fixed flex justify-center items-center inset-0 `}
    >
      <div
        onTouchMove={handleTouchMove}
        ref={contentRef}
        className={`relative transition-all duration-200 scale-0 overflow-hidden ${
          value && "scale-100"
        } ${
          maxWidth && `w-full ${maxWidthClass}`
        } max-h-[85%] bg-gray-100 text-gray-800 m-4 rounded-md`}
      >
        <header className="bg-gray-200 w-full h-7">
          <button
            className="bg-red-400 hover:bg-red-500 p-2.5 rounded-full absolute right-1 top-1"
            onClick={() => setValue(false)}
          ></button>
        </header>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
