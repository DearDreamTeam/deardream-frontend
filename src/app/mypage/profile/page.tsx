// app/page.tsx
"use client";
import GreenBasicButton from "@/components/button/green-basic-button";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";

const Profile = () => {
  return (
    <>
      <Header>내 정보 수정</Header>
      <ProfileEdit isSender={true} />
      <div className="absolute right-0 bottom-5 left-0 mx-auto inline-flex h-14 w-full md:w-[375px]">
        <GreenBasicButton>저장</GreenBasicButton>
      </div>
    </>
  );
};
export default Profile;
