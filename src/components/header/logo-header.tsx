"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LogoHeader = () => {
  const pathname = usePathname();

  if (
    pathname.startsWith("/letter/") ||
    ["/invite", "/login", "/profile"].includes(pathname)
  )
    return null;

  return (
    <header className="header py-[0.32rem]">
      <Link href="/home">
        <Image
          src={"/logo/logo.svg"}
          alt={"이어드림 로고"}
          width={100}
          height={31}
          priority
        />
      </Link>
    </header>
  );
};

export default LogoHeader;
