// app/page.tsx
"use client";
import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";
import axios from "@/lib/axios";
import { useUserStore } from "@/stores/useUserInfoStore";

const Profile = () => {
  const { userProfile } = useUserStore();

  const handleSave = async () => {
    const res = await axios.patch("/v1/users/me", {
      name: userProfile?.name,
      profileImage: userProfile?.profileImage,
      birth: userProfile?.birth,
      calendarType: userProfile?.calendarType,
      relation: userProfile?.relation,
      otherRelation: userProfile?.otherRelation,
      familyLink: userProfile?.familylink,
    });
    if (res.status === 200) {
      alert("프로필이 성공적으로 업데이트되었습니다.");
      console.log("Profile updated successfully:", res.data);
      // window.location.href = "/home";
    } else {
      console.error("Failed to update profile:", res.data);
      alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
    window.location.href = "/mypage";
  };
  return (
    <>
      <div className="relative flex h-screen w-full flex-col items-center justify-between bg-white p-4 pt-0">
        <div>
          <Header>내 정보 수정</Header>
          <ProfileEdit isSender={true} />
        </div>
        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton onClick={handleSave}>저장</GreenBasicButton>
        </div>
      </div>
    </>
  );
};
export default Profile;
