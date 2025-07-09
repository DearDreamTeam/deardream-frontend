"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/constants/nav-items";

const NavigationBar = () => {
  const pathname = usePathname();

  if (
    pathname.startsWith("/letter/") ||
    pathname.startsWith("/letters/") ||
    ["/invite", "/login", "/profile", "/onboarding"].includes(pathname)
  )
    return null;
  return (
    <nav className="text-body-1 bg-grey-0 shadow-default flex justify-evenly gap-12 px-4 py-[1.29rem]">
      {NAV_ITEMS.map(
        ({
          activeIcon: ActiveIcon,
          inactiveIcon: InactiveIcon,
          label,
          href,
        }) => (
          <Link
            href={href}
            key={label}
            className={pathname === href ? "text-grey-700" : "text-grey-400"}
          >
            <div className="navigation-item">
              {pathname === href ? <ActiveIcon /> : <InactiveIcon />}
              <span>{label}</span>
            </div>
          </Link>
        ),
      )}
    </nav>
  );
};

export default NavigationBar;
