import { Families, OrganizationInfo } from "@/types/admin-organization-dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const ADMIN_STORAGE_KEY = "deardream-organization";

interface OrganizationAdminState {
  organizationInfo: OrganizationInfo;
  families: Families[];
  setOrganizationInfo: (organizationInfo: OrganizationInfo) => void;
  setFamilies: (families: Families[]) => void;
}

const mockOrg: OrganizationInfo = {
  institutionId: 0,
  institutionCode: "나당연-12",
  institutionName: "나당연합군",
  address: "경기 성남시 분당구 판교역로 166 (백현동, 카카오 판교 아지트)",
  postalCode: "13529",
  phone: "02-123-3456",
  deliveryStatus: "PENDING",
};
const mockFam: Families[] = [
  {
    familyId: 1,
    archiveId: 123,
    receiverName: "김영서",
    addressDetail: "102호",
    createdAt: "2025년 07월 20일",
    deliveryStatus: "PENDING",
    phone: "010-1234-5678",
  },
  {
    familyId: 2,
    archiveId: 1234,
    receiverName: "라이언",
    addressDetail: "101호",
    createdAt: "2025년 07월 20일",
    deliveryStatus: "PENDING",
    phone: "010-0000-0000",
  },
];

export const useOrganAdminStore = create<OrganizationAdminState>()(
  persist(
    immer((set) => ({
      organizationInfo: mockOrg,
      families: mockFam,
      setOrganizationInfo: (organizationInfo) => set({ organizationInfo }),
      setFamilies: (families) => set({ families }),
    })),
    {
      name: ADMIN_STORAGE_KEY,
    },
  ),
);
