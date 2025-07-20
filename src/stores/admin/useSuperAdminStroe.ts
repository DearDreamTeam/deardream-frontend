import { DELIVERY_STATUS } from "@/constants/delivery-status";
import { IndividualsDto, InstitutionsDto } from "@/types/admin-dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const ADMIN_STORAGE_KEY = "deardream-admin";

interface SuperAdminState {
  individuals: IndividualsDto[];
  institutions: InstitutionsDto[];
  setIndividuals: (individuals: IndividualsDto[]) => void;
  setInstitutions: (institutions: InstitutionsDto[]) => void;
}

const mockIndividuals: IndividualsDto[] = [
  {
    name: "김영서",
    address: "서울특별시 서대문구 이화여대길 52",
    postalCode: "03760",
    phone: "010-1234-5678",
    deliveryStatus: DELIVERY_STATUS.PENDING.value,
    pdfUrl: "/mock/1.pdf",
    addressDetail: "신공학관 지하 2층",
    archiveId: 0,
  },
  {
    name: "피우다",
    address: "서울특별시 마포구 마포대로 122",
    postalCode: "04213",
    phone: "02-6953-0539",
    deliveryStatus: DELIVERY_STATUS.PENDING.value,
    pdfUrl: "/mock/1.pdf",
    addressDetail: "프론트원 6층 ICT COC",
    archiveId: 1,
  },
  {
    name: "소셜벤처",
    address: "서울특별시 중구 명동10길 52",
    postalCode: "04536",
    phone: "010-1234-5678",
    deliveryStatus: DELIVERY_STATUS.PENDING.value,
    pdfUrl: "/mock/1.pdf",
    addressDetail: "신한익스페이스 지하 1층 신한복지재단",
    archiveId: 2,
  },
];

const mockInstitutions: InstitutionsDto[] = [
  {
    name: "피우다요양원",
    address: "서울특별시 마포구 마포대로 122, 프론트원",
    postalCode: "04213",
    phone: "02-6953-0539",
    deliveryStatus: DELIVERY_STATUS.PENDING.value,
    pdfUrl: "/mock/1.pdf",
    code: "YB12",
    currentMembers: 100,
    nextMembers: 100,
    institutionId: 1,
  },
  {
    name: "소셜벤처요양원",
    address: "서울특별시 마포구 마포대로 122, 프론트원",
    postalCode: "04213",
    phone: "02-6953-0539",
    deliveryStatus: DELIVERY_STATUS.PENDING.value,
    pdfUrl: "/mock/1.pdf",
    code: "YB12",
    currentMembers: 100,
    nextMembers: 100,
    institutionId: 2,
  },
  {
    name: "서울희망요양원",
    address: "서울특별시 마포구 마포대로 122, 프론트원",
    postalCode: "04213",
    phone: "02-6953-0539",
    deliveryStatus: DELIVERY_STATUS.PENDING.value,
    pdfUrl: "/mock/1.pdf",
    code: "YB12",
    currentMembers: 100,
    nextMembers: 100,
    institutionId: 3,
  },
  {
    name: "허거덩복지센터",
    address: "서울특별시 마포구 마포대로 122, 프론트원",
    postalCode: "04213",
    phone: "02-6953-0539",
    deliveryStatus: DELIVERY_STATUS.PENDING.value,
    pdfUrl: "/mock/1.pdf",
    code: "YB12",
    currentMembers: 10,
    nextMembers: 10,
    institutionId: 4,
  },
];

export const useSuperAdminStore = create<SuperAdminState>()(
  persist(
    immer((set) => ({
      individuals: mockIndividuals,
      institutions: mockInstitutions,
      setIndividuals: (individuals) => set({ individuals }),
      setInstitutions: (institutions) => set({ institutions }),
    })),
    {
      name: ADMIN_STORAGE_KEY,
    },
  ),
);
