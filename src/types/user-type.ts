import { FamilyRelation } from "@/constants/family-relation";
import { FamilyRole } from "@/constants/family-role";

export interface User {
  userId: number;
  kakaoId: string;
  name: string;
  profileImage: string | null /* url */;
  createdAt: number /* timestamp */;
  birth: number /* timestamp */;
  role: FamilyRole | null;
  relation: FamilyRelation | string | null /* 기타 관계 */;
  familyId: number | null;
}
