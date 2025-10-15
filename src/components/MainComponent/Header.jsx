import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <header className="flex justify-center items-center bg-[#171717] h-24 md:h-20">
        <Link href="https://www.darksidebooks.com.br/" target="_blank">
          <Image
            src="https://darkside.vtexassets.com/arquivos/darkside-logo-header-desk.svg"
            alt="Darksidebooks logo"
            width={174}
            height={56}
            priority
          />
        </Link>
      </header>
    </div>
  );
}
