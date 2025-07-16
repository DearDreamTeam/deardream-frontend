import axios from "@/lib/axios";
import { useLettersStore } from "@/stores/useLettersStore";
import { User } from "@/types/user-type";

/* POST: 즐겨찾기 하기 */
export const likeALetters = async (
  userId: User["userId"],
  archiveId: number,
) => {
  try {
    const response = await axios.post(`/v1/archives/${archiveId}/bookmark`, {
      params: {
        userId,
      },
    });

    if (response.data.isSuccess) {
      useLettersStore.getState().setLikedToggle(archiveId);
    }
  } catch (error) {
    console.log(error);
  }
};

/* GET: 소식지 전부 가져오기 */
export const getPostboxList = async (familyId: User["familyId"]) => {
  try {
    const response = await axios.get(`/v1/archives/${familyId}`);
    console.log(response.data.result);
    return response.data.result;
    if (response.data.isSuccess) {
      useLettersStore.getState().setNewsletters(response.data.result); // 배열 스토어에 저장
    }
  } catch (error) {
    console.log(error);
  }
};

/* GET: 즐겨찾기한 소식지 id 가져오기 */
export const getLikedPostId = async (userId: User["userId"]) => {
  try {
    const response = await axios.get(`/v1/archives/bookmark`, {
      params: { userId },
    });

    if (response.data.isSuccess) {
      const pdfIds = response.data.result;
      useLettersStore.getState().setLikedStatus(pdfIds);
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
