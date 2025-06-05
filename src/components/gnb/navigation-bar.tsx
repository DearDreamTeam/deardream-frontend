"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/constants/navItems";

import NavigationItem from "./navigation-item";

const NavigationBar = () => {
  const pathname = usePathname();
  return (
    <div className="text-caption-2 bg-gray-0 shadow-default flex justify-center gap-12 px-4 py-[1.29rem]">
      {NAV_ITEMS.map(({ icon: Icon, label, href }) => (
        <Link
          href={href}
          key={label}
          className={pathname === href ? "text-gray-900" : "text-gray-400"}
        >
          <NavigationItem>
            <Icon />
            <span>{label}</span>
          </NavigationItem>
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;
