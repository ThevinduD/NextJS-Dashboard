"use client";

import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

export function DeleteSpinner() {
  const { pending } = useFormStatus();

  return (
    <button
      className="px-3 py-2 w-32 ring-1 ring-inset ring-gray-950 rounded-md bg-gray-950 hover:bg-gray-700 hover:ring-gray-700 text-white"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <>
          <ClipLoader size={20} color="white" className="m-0 p-0" />
        </>
      ) : (
        <>
          <div>Delete</div>
        </>
      )}
    </button>
  );
}
