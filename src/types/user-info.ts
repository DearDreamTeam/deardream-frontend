export interface UserInfo {
  accessToken: string;
  email: string;
  name: string;
  profileImage: string;
  refreshToken: string;
}

export interface UserProfile {
  name: string;
  profileImage: string;
  birth: birthInfo;
  relation?: string;
  otherRelation?: string;
}

export interface birthInfo {
  year: string;
  month: string;
  day: string;
  calendarType: "SOLAR" | "LUNAR";
}
export interface ProfileEditProps {
  isSender?: boolean; // 프로필 타입을 구분하기 위한 선택적 속성
  isInvite?: boolean; // 초대 프로필 여부
  user?: UserInfo; // 사용자 정보
}
