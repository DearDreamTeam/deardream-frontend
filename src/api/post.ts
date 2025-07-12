import axios from "@/lib/axios";
import { Post, PostBack } from "@/types/post-type";

/* GET: 소식 피드 전부 가져오기 */
export const getFamilyPosts = async (familyId: Post["familyId"]) => {
  try {
    const response = await axios.get(`/v1/posts/${familyId}`);
    console.log(response);
  } catch (error) {
    console.log(error);
    return [];
  }
};

/* POST: 소식 피드 하나 작성하기 */
export const registerPost = async (
  authorId: Post["authorId"],
  content: Post["content"],
  images: PostBack["imgFiles"],
) => {
  try {
    const response = await axios.post(
      `/v1/posts`,
      {
        request: {
          authorId,
          content,
        },
        images: images,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log(response);
    // postId를 리턴해주는 듯
  } catch (error) {
    console.log(error);
  }
};

/* PUT: 소식 수정하기 */
export const editPost = async (
  postId: Post["postId"],
  authorId: Post["authorId"],
  content: Post["content"],
  images: PostBack["imgFiles"],
) => {
  try {
    const response = await axios.put(
      `/v1/posts/${postId}`,
      {
        request: {
          authorId,
          content,
        },
        images: images,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

/* DELETE: 소식 삭제하기 */
export const deletePost = async (
  userId: Post["authorId"],
  postId: Post["postId"],
) => {
  try {
    const response = await axios.delete(`/v1/posts/${postId}`, {
      params: { userId },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
