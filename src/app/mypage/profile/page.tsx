// app/page.tsx
"use client";
import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";

const Profile = () => {
  return (
    <>
      <div className="relative flex h-screen w-full flex-col items-center justify-between bg-white p-4">
        <div>
          <Header>내 정보 수정</Header>
          <ProfileEdit isSender={true} />
        </div>
        <div className="flex h-14 w-full items-center justify-center">
          <GreenBasicButton>저장</GreenBasicButton>
        </div>
      </div>
    </>
  );
};
export default Profile;
