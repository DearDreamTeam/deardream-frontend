export const FAMILY_RELATION = {
  SON: "아들",
  DAUGHTER: "딸",
  GRANDSON: "손자",
  GRANDDAUGHTER: "손녀",
  SPOUSE: "배우자",
  BROTHER: "형제",
  SISTER: "자매",
  OTHER: "기타",
} as const;

export type FamilyRelation = keyof typeof FAMILY_RELATION;
