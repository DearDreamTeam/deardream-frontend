export const FAMILY_ROLE = {
  LEADER: "LEADER", // 대표자(결제자)
  PARTICIPANT: "USER", // 나머지 참여자
} as const;

export type FamilyRole = keyof typeof FAMILY_ROLE;
