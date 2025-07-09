import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import LogoHeader from "@/components/header/logo-header";
import NavigationBar from "@/components/gnb/navigation-bar";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  style: "normal",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "이어드림",
  description:
    "사랑하는 가족들의 소식을 받으며 웃음짓는 건강한 세상을 만듭니다.",
  authors: [{ name: "Yeongseo Kim" }, { name: "Juhee Lee" }],
  icons: {
    icon: "/images/ribbon/ribbon-full.svg",
  },
  openGraph: {
    title: "이어드림",
    description:
      "사랑하는 가족들의 소식을 받으며 웃음짓는 건강한 세상을 만듭니다.",
    url: "",
    siteName: "이어드림",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.className} text-grey-900 mx-auto h-[100dvh] w-screen md:max-w-[375px]`}
      >
        <div className="shadow-default bg-grey-50 flex h-full flex-col justify-between">
          <LogoHeader />
          <main className="flex-1 overflow-hidden">{children}</main>
          <NavigationBar />
        </div>
      </body>
    </html>
  );
}
