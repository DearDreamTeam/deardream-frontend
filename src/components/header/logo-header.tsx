"use client";
import { PATH } from "@/constants/path";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LogoHeader = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/letter") || pathname === "/onboarding") return null;

  return (
    <header className="header py-[0.41rem]">
      <Link href={PATH.HOME}>
        <Image
          src={"/logo/logo.svg"}
          alt={"이어드림 로고"}
          width={100}
          height={34.85}
          priority
        />
      </Link>
    </header>
  );
};

export default LogoHeader;
