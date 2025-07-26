// lib/kakao.ts
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { setTempToken, setToken } from "@/lib/token";
import { UserInfo, UserProfileInfo } from "@/types/user-info";

export const kakaoLogin = async (
  code: string,
  setUserKaKaoInfo: (data: UserInfo) => void,
  updateUserProfile: (profile: UserProfileInfo) => void,
) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await axios.get(API_URL + "/users/login/kakao", {
    params: { code, redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI },
  });

  const data = response.data;
  if (!data || !data.result) throw new Error("잘못된 로그인 응답");

  const { tempToken, newAccessToken, newRefreshToken, name, profileImage } =
    data.result;

  setTempToken(tempToken);

  if (newAccessToken && newRefreshToken) {
    setToken(newAccessToken, newRefreshToken);

    const res = await axiosInstance.get("/v1/users/me");
    updateUserProfile(res.data.result);
    return;
  }

  // 최초 로그인인 경우
  setUserKaKaoInfo(data.result);
  updateUserProfile({
    name,
    profileImage,
    id: 0,
    kakaoId: 0,
    birth: "",
    calendarType: "SOLAR",
    relation: "",
    otherRelation: "",
    role: "DEFAULT",
    createdAt: "",
    familyId: 0,
    registered: false,
    familyRegistered: false,
  });
};
