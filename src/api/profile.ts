import axios from "@/lib/axios";
import { UserProfile } from "@/types/user-info";

export const registerUser = async (
  userProfile: UserProfile,
  imageFile?: File | null,
) => {
  const formData = new FormData();

  const userRequestDto = {
    name: userProfile.name,
    birth: userProfile.birth,
    calendarType: userProfile.calendarType,
    relation: userProfile.relation,
    otherRelation: userProfile.otherRelation ?? null,
  };

  const jsonFile = new File(
    [JSON.stringify(userRequestDto)],
    "userRequestDto.json",
    { type: "application/json" },
  );

  formData.append("userRequestDto", jsonFile);
  if (imageFile) {
    formData.append("profileImage", imageFile); // File 객체
  }
  console.log("등록할 프로필 정보:", formData);

  const response = await axios.post("/v1/users/register", formData);

  return response;
};

export const updateProfile = async (
  userProfile: UserProfile,
  imageFile?: File | null,
) => {
  const formData = new FormData();

  console.log("업데이트할 프로필 정보:", userProfile, imageFile);

  const userRequestDto = {
    name: userProfile.name,
    birth: userProfile.birth,
    calendarType: userProfile.calendarType,
    relation: userProfile.relation,
    otherRelation: userProfile.otherRelation ?? null,
  };

  formData.append(
    "userRequestDto",
    new Blob([JSON.stringify(userRequestDto)], { type: "application/json" }),
  );

  if (imageFile) {
    formData.append("profileImage", imageFile); // 이미지 파일
  }

  const response = await axios.patch("/v1/users/me", formData);
  console.log("프로필 업데이트 응답:", response.data);
  return response;
};
