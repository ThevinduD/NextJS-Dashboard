import { lusitana } from "@/app/ui/fonts";
import Logo from "./../../public/logo.png";
import Image from "next/image";

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src={Logo} alt="logoImage" width={50} height={50} />
    </div>
  );
}
