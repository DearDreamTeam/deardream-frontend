// app/page.tsx
"use client";
import GreenBasicButton from "@/components/button/profile-green-basic-button";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";
import { useUserStore } from "@/stores/useUserInfoStore";
import { useState } from "react";

const Profile = () => {
  const { userProfile } = useUserStore();
  const [editUserProfile, setEditUserProfile] = useState(userProfile);

  return (
    <>
      <div className="bg-grey-0 relative flex h-screen w-full flex-col items-center justify-between p-4 pt-0">
        <div>
          <Header>내 정보 수정</Header>
          <ProfileEdit
            isSender={true}
            editUserProfile={editUserProfile}
            setEditUserProfile={setEditUserProfile}
          />
        </div>
        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton type="update">저장</GreenBasicButton>
        </div>
      </div>
    </>
  );
};
export default Profile;
