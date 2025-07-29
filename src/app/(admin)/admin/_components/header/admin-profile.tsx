"use client";

import { DEFAULT_IMAGE_PATH, PATH } from "@/constants/path";
import { useUserStore } from "@/stores/useUserInfoStore";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";

const AdminProfile = () => {
  const { userProfile } = useUserStore();

  // const handleLogin = () => {
  //   window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_ADMIN_REDIRECT_URI}&response_type=code`;
  // };

  if (userProfile.id === -1)
    return (
      <Link href={PATH.LOGIN}>
        <button className="button" type="button">
          로그인
        </button>
      </Link>
    );

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-2">
        <Image
          src={userProfile.profileImage || DEFAULT_IMAGE_PATH}
          width={50}
          height={50}
          alt="profile"
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-label-2">{userProfile.name}님</span>
          <span className="text-body-2 text-grey-500">기관관계자</span>
        </div>
      </div>
      <button className="button">로그아웃</button>
    </div>
  );
};

export default AdminProfile;
