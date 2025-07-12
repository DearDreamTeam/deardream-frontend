import axios from "@/lib/axios";
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
    console.log(response); // 북마크 성공했다고 오는 듯
  } catch (error) {
    console.log(error);
  }
};

/* GET: 소식지 전부 가져오기 */
export const getPostboxList = async (familyId: User["familyId"]) => {
  try {
    const response = await axios.get(`/v1/archives/${familyId}`);
    return response.data.result; // 객체가 온다고 되어 있는데, 객체 배열이 와야할 것으로 보임.
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
    return response.data.result; // postId가 담긴 배열
  } catch (error) {
    console.log(error);
    return [];
  }
};
