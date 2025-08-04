import axios from "@/lib/axios";
import { ReceiverProfileInfo } from "@/stores/useReceiverStore";
import { UserProfileInfo } from "@/types/user-info";
import { formatImageUrl } from "@/utils/format-image-url";

export const registerUser = async (
  userProfile: UserProfileInfo,
  imageFile?: File | null,
  familylink?: string | null,
) => {
  const formData = new FormData();
  const userRequestDto = {
    name: userProfile.name,
    birth: userProfile.birth,
    profileImage:
      formatImageUrl(userProfile.profileImage) === "/images/default-img.svg"
        ? null
        : userProfile.profileImage,
    calendarType: userProfile.calendarType,
    relation:
      userProfile.relation && userProfile.relation !== ""
        ? userProfile.relation
        : null,
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

  const response = await axios.post("/v1/users/register", formData, {
    params: {
      code: familylink,
    },
  });

  return response;
};

export const updateProfile = async (
  userProfile: UserProfileInfo,
  imageFile?: File | null,
  relation: boolean = false,
) => {
  const formData = new FormData();
  let userRequestDto;
  console.log("업데이트할 프로필 정보:", userProfile, imageFile);
  if (relation) {
    userRequestDto = {
      relation: userProfile.relation || null,
      otherRelation: userProfile.otherRelation ?? null,
    };
  } else {
    userRequestDto = {
      name: userProfile.name,
      birth: userProfile.birth,
      calendarType: userProfile.calendarType,
      relation: userProfile.relation || null,
      otherRelation: userProfile.otherRelation ?? null,
    };
  }

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

export const createReceiver = async (
  receiver: ReceiverProfileInfo,
  imageFile?: File | null,
) => {
  const formData = new FormData();

  formData.append(
    "recipientRequestDto",
    new Blob([JSON.stringify(receiver)], { type: "application/json" }),
  );

  if (imageFile) {
    formData.append("profileImage", imageFile);
  }

  const response = await axios.post("/v1/recipients", formData);
  console.log("수신자 생성 응답:", response.data);
  return response;
};

export const createReceiverAddress = async (receiver: ReceiverProfileInfo) => {
  const response = await axios.post(
    `/v1/recipients/${receiver.id}`,
    receiver.address,
  );
  console.log("수신자 주소 생성 응답:", response.data);
  return response;
};

export const updateReceiver = async (
  receiver: ReceiverProfileInfo,
  imageFile?: File | null,
) => {
  const formData = new FormData();
  formData.append(
    "recipientRequestDto",
    new Blob([JSON.stringify(receiver)], { type: "application/json" }),
  );

  if (imageFile) {
    formData.append("profileImage", imageFile);
  }

  const response = await axios.put(`/v1/recipients/${receiver.id}`, formData);
  console.log("수신자 업데이트 응답:", response.data);
  return response;
};

export const updateReceiverAddress = async (receiver: ReceiverProfileInfo) => {
  const response = await axios.patch(
    `/v1/recipients/${receiver.id}`,
    receiver.address,
  );
  console.log("수신자 업데이트 응답:", response.data);
  return response;
};

export const clearReceiverAddress = async (receiver: ReceiverProfileInfo) => {
  const response = await axios.patch(`/v1/recipients/${receiver.id}`, {
    recipientName: "",
    recipientPhone: "",
    postalCode: "",
    address: "",
    addressDetail: "",
    institutionName: "",
    institutionPhone: "",
    code: "",
  });
  console.log("수신자 주소 삭제 응답:", response.data);
  return response;
};
