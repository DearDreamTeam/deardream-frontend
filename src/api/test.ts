import axios from "@/lib/axios";
import { Post } from "@/types/post-type";

export const generatePDFTest = async (familyId: Post["familyId"]) => {
  try {
    const response = await axios.post(`/v1/archives/test/generate`, {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      familyId: familyId,
    });
    console.log(response); // 생성된 pdf url을 보내줬으면 좋겠음.
  } catch (error) {
    console.log(error);
  }
};
