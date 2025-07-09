// app/page.tsx
"use client";
import EllipseImage from "@/components/images/ellipse-image";
import RibbonImage from "@/components/images/ribbon-image";
import StateTemplate from "@/components/template/state-template";
import KaKao from "@/public/images/kakao.svg";

const Login = () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  //카카오로그인 URL 생성 함수
  const handleLogin = () => {
    const kakaoURL = new URL("https://kauth.kakao.com/oauth/authorize");
    kakaoURL.searchParams.append("client_id", REST_API_KEY);
    kakaoURL.searchParams.append("redirect_uri", REDIRECT_URI);
    kakaoURL.searchParams.append("response_type", "code");

    window.location.href = kakaoURL.toString();
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-around bg-green-100 py-10">
        <StateTemplate>
          <StateTemplate.ImageFiled>
            <EllipseImage color="gray-0" isBackground={true} />
            <RibbonImage />
          </StateTemplate.ImageFiled>
          <StateTemplate.Title> 로그인이 필요해요</StateTemplate.Title>
          <StateTemplate.Content>
            우리 모두가 다 함께
            <br />
            이야기를 나누고, 마음을 이어가기 위해
            <br />
            로그인이 필요해요.
          </StateTemplate.Content>
        </StateTemplate>

        <div
          onClick={handleLogin}
          className="relative flex h-12 w-[80%] cursor-pointer items-center justify-center rounded-md bg-[#FEE500]"
        >
          <KaKao
            alt="카카오 로그인"
            className="absolute top-1/2 left-7 -translate-x-1/2 -translate-y-1/2"
          />
          <div className="text-title-1 leading-tight font-normal">
            카카오톡으로 10초만에 로그인
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
