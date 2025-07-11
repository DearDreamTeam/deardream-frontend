import axios from "@/lib/axios";
import { UserProfile } from "@/types/user-info";

export const registerUser = async (userProfile: UserProfile) => {
  const response = await axios.post("/v1/users/register", {
    name: userProfile.name,
    profileImage: userProfile.profileImage,
    birth: `${userProfile.birth}`,
    calendarType: userProfile.calendarType,
    familyLink: userProfile.familylink,
  });
  return response;
};

export const updateUserProfile = async (userProfile: UserProfile) => {
  const response = await axios.patch("/v1/users/profile", {
    name: userProfile.name,
    profileImage: userProfile.profileImage,
    birth: `${userProfile.birth}`,
    calendarType: userProfile.calendarType,
    relation: userProfile.relation,
    otherRelation: userProfile.otherRelation,
  });
  return response;
};
