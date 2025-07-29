"use client";

import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEM } from "./admin-nav-item";
import Link from "next/link";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 px-5 py-4">
      {ADMIN_NAV_ITEM.map(({ icon: Icon, label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            href={href}
            key={label}
            className={`flex items-center gap-4 rounded-sm px-4 py-3 ${isActive ? "bg-grey-0 text-green-300" : "text-grey-100 hover:bg-grey-0/10"}`}
          >
            <Icon />
            <span className={`text-body-1`}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
