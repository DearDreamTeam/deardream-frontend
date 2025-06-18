import Script from "next/script";

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

const KakaoShareScript = () => {
  const initKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }
  };

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
        integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
        crossOrigin="anonymous"
        onLoad={initKakao}
      />
    </>
  );
};

export default KakaoShareScript;
