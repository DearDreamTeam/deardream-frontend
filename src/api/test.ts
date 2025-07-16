import axios from "@/lib/axios";
import { User } from "@/types/user-type";

export const generatePDFTest = async (familyId: User["familyId"]) => {
  try {
    const response = await axios.post(`/v1/archives/test/generate`, {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      familyId: familyId,
    });
    console.log(response.data.result); // 생성된 pdf url을 보내줬으면 좋겠음.
  } catch (error) {
    console.log(error);
  }
};
