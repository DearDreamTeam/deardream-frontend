export interface UserInfo {
  email: string;
  name: string;
  profileImage: string;
  tempToken: string;
  kakaoId: number;
  newAccessToken: string;
  newRefreshToken: string;
  registered: boolean;
  familyRegistered: boolean;
}

export interface UserProfileInfo {
  id: number;
  kakaoId: number;
  name: string;
  profileImage: string;
  birth: string;
  calendarType: "SOLAR" | "LUNAR";
  relation: string;
  otherRelation: string;
  role: "LEADER" | "USER" | "DEFAULT";
  createdAt: string;
  familyId: number;
  registered: boolean;
  familyRegistered: boolean;
}

export interface birthInfo {
  year: string;
  month: string;
  day: string;
  calendarType: "SOLAR" | "LUNAR";
}
