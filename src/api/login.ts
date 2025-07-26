import axios from "@/lib/axios";

/* GET: 카카오 로그인 */
export const loginByKakao = async (code: string) => {
  try {
    const response = await axios.get(`/users/login/kakao`, {
      params: {
        code: code,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_ADMIN_REDIRECT_URI,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
};
