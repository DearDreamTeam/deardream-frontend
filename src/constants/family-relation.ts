export const FAMILY_RELATION = {
  DAUGHTER: "딸",
  SON: "아들",
  RELATIVE: "친척",
  SIBLING: "형제",
  GRANDSON: "손자",
  GRANDDAUGHTER: "손녀",
  SPOUSE: "배우자",
} as const;

export type FamilyRelation = keyof typeof FAMILY_RELATION;
