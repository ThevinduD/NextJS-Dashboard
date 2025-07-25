import Logo from "@/app/ui/Logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "./ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-gray-950 p-4 md:h-52">
        <Logo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 lg:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 lg:w-2/5 lg:px-20">
          <p
            className={`${lusitana.className} animate-in duration-1000 text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            This is an <strong>Invoice Management System Dashboard</strong> ,
            built using Munna App Router
          </p>
          <Link
            href="/login"
            className="animate-in duration-1000 flex items-center gap-5 self-start rounded-lg bg-gray-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 md:text-base"
          >
            <span>Sign in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 lg:w-3/5 lg:px-28 lg:py-10">
          {/* Add Hero Images Here */}
          <Image
            src="/desktopView.png"
            alt="heroImg"
            width={1000}
            height={760}
            className="hidden md:block"
          />
          <Image
            src="/mobileView.png"
            alt="heroImg"
            width={560}
            height={620}
            className="block md:hidden"
          />
        </div>
      </div>
    </main>
  );
}
