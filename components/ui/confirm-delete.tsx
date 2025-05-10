import { ConfirmDeleteProps } from "@/app/lib/definitions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { DeleteSpinner } from "./delete-spinner";
import React from "react";

const ConfirmDelete = ({
  deleteInvoiceWithId,
  setShow,
}: ConfirmDeleteProps) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white ring-1 ring-inset ring-gray-500 rounded-md p-5 text-center flex flex-col items-center">
        <ExclamationCircleIcon className="h-5 w-5 text-gray-500" />
        <p className="font-semibold text-gray-900">Final confirmation</p>
        <p className="text-sm mt-1 text-gray-700">
          This action cannot be undone
        </p>
        <div className="flex text-sm gap-5 mt-7">
          <button
            className="px-3 py-2 w-32 ring-1 ring-inset ring-gray-400 rounded-md hover:text-gray-700 hover:ring-gray-600"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <form action={deleteInvoiceWithId}>
            <DeleteSpinner />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
