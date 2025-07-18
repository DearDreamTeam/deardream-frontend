export interface UserInfo {
  email: string;
  name: string;
  profileImage: string;
  tempToken?: string; // 임시 토큰, 카카오 로그인 시 사용
  accessToken?: string; // 액세스 토큰, 로그인 후 사용
  refreshToken?: string; // 리프레시 토큰, 로그인 후 사용
  registered?: boolean; // 사용자 등록 여부
  familyRegistered?: boolean; // 가족 등록 여부
}

export interface UserProfileInfo {
  id: number; // 사용자 ID, 프로필 식별을 위한 고유 ID
  name: string;
  profileImage: string;
  birth: string;
  calendarType: "SOLAR" | "LUNAR";
  role?: string; // 프로필 역할 (예: "부모", "자녀" 등)
  relation?: string;
  otherRelation?: string;
  familyId?: number; // 가족 ID, 가족 프로필에서 사용
  familylink: string | null;
  registered?: boolean; // 프로필 등록 여부
  familyRegistered?: boolean; // 가족 프로필 등록 여부
}

export interface birthInfo {
  year: string;
  month: string;
  day: string;
  calendarType: "SOLAR" | "LUNAR";
}
