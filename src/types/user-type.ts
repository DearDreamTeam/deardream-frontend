import { FamilyRelation } from "@/constants/family-relation";
import { FamilyRole } from "@/constants/family-role";

export interface User {
  userId: number;
  kakaoId: string;
  name: string;
  profileImage: string /* url */;
  createdAt: number /* timestamp */;
  birth: number /* timestamp */;
  role: FamilyRole;
  relation: FamilyRelation | string /* 기타 관계 */;
  familyId: number;
}
