// app/page.tsx
"use client";
import Header from "@/components/common/header";
import ProfileEdit from "@/components/profile/profile-edit";

const Profile = () => {
  return (
    <>
      <Header>받는 분 정보</Header>
      <ProfileEdit isSender={false} />
      <div className="absolute right-0 bottom-5 left-0 mx-auto inline-flex h-14 w-[90%] items-center justify-center gap-2.5 rounded bg-rose-500 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
        <div className="text-center text-lg leading-loose font-semibold text-white">
          저장
        </div>
      </div>
    </>
  );
};
export default Profile;
