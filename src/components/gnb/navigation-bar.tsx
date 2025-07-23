"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { NAV_ITEMS } from "@/components/gnb/nav-items";
import { PATH } from "@/constants/path";
import AlertDialog from "../modal/dialog/alert-dialog";
import { NOTIFICATION_MESSAGES } from "@/constants/messages";
import { renderMessageWithLineBreaks } from "@/utils/render-message-with-line-breaks";
import { useState } from "react";
import { usePostStore } from "@/stores/usePostStore";

const NavigationBar = () => {
  const pathname = usePathname();
  const { post } = usePostStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleWrite = () => {
    if (post.length >= 20) setIsOpen(true);
    else router.push(PATH.LETTER_WRITE);
  };

  if (
    pathname.startsWith("/letter/") ||
    pathname.startsWith("/letters/") ||
    pathname.startsWith("/mypage/") ||
    pathname.startsWith("/subscribe/") ||
    ["/invite", "/login", "/profile", "/onboarding", "/subscribe"].includes(
      pathname,
    )
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
        }) =>
          href === PATH.LETTER_WRITE ? (
            <button
              key={label}
              onClick={handleWrite}
              className="navigation-item text-grey-400"
            >
              {pathname === href ? <ActiveIcon /> : <InactiveIcon />}
              <span>{label}</span>
            </button>
          ) : (
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

      {isOpen && (
        <AlertDialog
          title={NOTIFICATION_MESSAGES.REJECT_POST.FRONT.title}
          content={renderMessageWithLineBreaks(
            NOTIFICATION_MESSAGES.REJECT_POST.FRONT.content,
          )}
          setIsOpen={setIsOpen}
        />
      )}
    </nav>
  );
};

export default NavigationBar;
