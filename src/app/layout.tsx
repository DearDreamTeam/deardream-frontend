import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

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
        className={`${pretendard.className} mx-auto h-screen w-screen max-w-[375px]`}
      >
        <div className="shadow-default h-full overflow-hidden bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
