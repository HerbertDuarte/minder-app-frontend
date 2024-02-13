import React from "react";

export default function Loader() {
  return (
    <main>
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-14 h-14 border-8 text-priborder-t-primary-dark animate-spin border-gray-200 flex items-center justify-center border-t-violet-500 rounded-full" />
      </div>
    </main>
  );
}
