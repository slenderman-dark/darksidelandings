import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Link href="https://www.darksidebooks.com.br/" target="_blank">
        <Image
          src="https://darkside.vtexassets.com/arquivos/darkside-logo-header-desk.svg"
          alt="Darksidebooks logo"
          width={300}
          height={96}
          priority
          className="hover:opacity-80 transition-opacity duration-300"
        />
      </Link>
    </div>
  );
}
