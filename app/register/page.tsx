import Logo from "@/app/ui/Logo";
import RegisterForm from "../ui/register-form";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center animate-in fade-in duration-500">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col p-4 mt-3">
        <div className="flex h-20 w-full items-end rounded-lg bg-gray-950 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Logo />
          </div>
        </div>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}
