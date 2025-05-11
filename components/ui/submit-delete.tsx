"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-3 py-2 w-32 ring-1 ring-inset rounded-md ${
        pending
          ? "bg-gray-500 ring-gray-500"
          : "bg-gray-950 ring-gray-950 hover:bg-gray-700 hover:ring-gray-700"
      } text-white transition`}
    >
      {pending ? "Deleting" : "Delete"}
    </button>
  );
}
