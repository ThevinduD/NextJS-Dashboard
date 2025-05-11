"use client";

import { useFormStatus } from "react-dom";
import { PowerIcon } from "@heroicons/react/24/outline";
import { ClipLoader } from "react-spinners";

export function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-gray-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3"
      disabled={pending}
    >
      {pending ? (
        <ClipLoader size={22} color="black" />
      ) : (
        <PowerIcon className="w-6" />
      )}
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}
