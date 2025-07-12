import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import LogoHeader from "@/components/header/logo-header";
import NavigationBar from "@/components/gnb/navigation-bar";
import Script from "next/script";

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
  keywords: [
    "이어드림",
    "소식지",
    "소식지 서비스",
    "요양원",
    "부모님",
    "가족",
    "아기 사진",
    "포토북",
    "사진북",
  ],
  authors: [{ name: "DearDream", url: "https://www.deardream.site" }],
  creator: "DearDream",
  publisher: "DearDream",
  category: "social",
  applicationName: "이어드림",
  icons: {
    icon: "/images/ribbon/ribbon-full.svg",
  },
  openGraph: {
    title: "이어드림",
    description:
      "사랑하는 가족들의 소식을 받으며 웃음짓는 건강한 세상을 만듭니다.",
    url: "https://www.deardream.site",
    locale: "ko-KR",
    siteName: "이어드림",
    type: "website",
    countryName: "대한민국",
    images: [
      {
        url: "https://images.unsplash.com/photo-1566125882500-87e10f726cdc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 620,
        height: 465,
        alt: "이어드림, 가족의 소식을 한 권의 책으로 전하는 정서 연결 서비스",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${pretendard.className} text-grey-900 mx-auto h-[100dvh] w-screen max-w-[768px]`}
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
