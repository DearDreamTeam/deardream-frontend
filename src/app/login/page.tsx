// app/page.tsx
"use client";
import GreenRibbon from "@/public/images/green-ribbon.svg";
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
      <div className="relative flex h-screen flex-col items-center justify-center gap-6 bg-[#F0FBF0]">
        <div className="flex h-60 w-60 items-center justify-center bg-[url('/images/ellipse.svg')] bg-contain bg-center bg-no-repeat">
          <GreenRibbon className="" />
        </div>
        <div className="justify-start self-stretch text-center text-2xl leading-9 font-semibold text-zinc-900">
          로그인이 필요해요
        </div>
        <div className="justify-start self-stretch text-center text-base leading-normal font-normal text-zinc-900">
          우리 모두가 다 함께 마음을 이어가기 위해
          <br />
          로그인이 필요해요.
        </div>
        <div className="h-15 w-10" />
        <div
          onClick={handleLogin}
          className="absolute bottom-10 flex h-12 w-[80%] cursor-pointer items-center justify-center rounded-md bg-[#FEE500]"
        >
          <KaKao
            alt="카카오 로그인"
            className="absolute top-1/2 left-7 -translate-x-1/2 -translate-y-1/2"
          />
          <div className="text-[13px] leading-tight font-normal text-zinc-900">
            카카오톡으로 10초만에 로그인/회원가입
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
