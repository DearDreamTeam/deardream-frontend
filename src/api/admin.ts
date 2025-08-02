import { DELIVERY_STATUS } from "@/constants/delivery-status";
import axios from "@/lib/axios";
import { useSuperAdminStore } from "@/stores/admin/useSuperAdminStroe";

/* GET: 개인 플랜 소식지 정보 모두 갖고 오기 */
export const getHomeArchives = async (year: number, month: number) => {
  try {
    const response = await axios.get(`/v1/master/admin/home/archives`, {
      params: {
        year,
        month,
      },
    });
    if (response.data.isSuccess) {
      const { homeArchives } = response.data.result;
      useSuperAdminStore.getState().setIndividuals(homeArchives);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

/* GET: 기관 플랜 소식지 정보 모두 갖고 오기 */
export const getInstitutionArchives = async (year: number, month: number) => {
  try {
    const response = await axios.get(`/v1/master/admin/institutions`, {
      params: {
        year,
        month,
      },
    });

    if (response.data.isSuccess) {
      useSuperAdminStore
        .getState()
        .setInstitutions(response.data.result.institutionInfoList);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

/* POST: 한 소식지 배송 상태 변경 */
export const setArchiveDeliveryStatus = async (
  archiveId: number,
  deliveryStatus: keyof typeof DELIVERY_STATUS,
) => {
  try {
    const response = await axios.post(
      `/v1/master/admin/${archiveId}/home`,
      null,
      {
        params: { deliveryStatus },
      },
    );

    if (response.data.isSuccess) {
      console.log("change delivery status");
    }
  } catch (error) {
    console.error(error);
  }
};

/* POST: 기관 플랜에 속한 모든 가족 배송 상태 변경 -> 작동 x */
export const setInstitutionDeliveryStatus = async (
  institutionId: number,
  deliveryStatus: keyof typeof DELIVERY_STATUS,
  year: number,
  month: number,
) => {
  try {
    const response = await axios.post(
      `/v1/master/admin/${institutionId}/institution`,
      null,
      {
        params: { deliveryStatus, year, month },
      },
    );

    if (response.data.isSuccess) {
      console.log("change delivery status");
    }
  } catch (error) {
    console.error(error);
  }
};

/* POST: 기관 생성 */
export const addInstitutions = async (
  name: string,
  address: string,
  phone: string,
  postalCode: string,
  startDate: string,
  membersCount: number,
) => {
  try {
    const response = await axios.post(`/v1/institutions/admin`, null, {
      params: { name, address, phone, postalCode, startDate, membersCount },
    });

    if (response.data.isSuccess) {
      console.log("institution add complete");
    }
  } catch (error) {
    console.error(error);
  }
};
