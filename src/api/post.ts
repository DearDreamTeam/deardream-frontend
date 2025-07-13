import axios from "@/lib/axios";
import { usePostStore } from "@/stores/usePostStore";
import { Post, PostLetter } from "@/types/post-type";

/* GET: 소식 피드 전부 가져오기 */
export const getFamilyPosts = async (familyId: number) => {
  try {
    const response = await axios.get(`/v1/posts/${familyId}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/* POST: 소식 피드 하나 작성하기 */
export const registerPost = async (
  authorId: Post["authorId"],
  content: Post["content"],
  images: PostLetter["images"],
) => {
  const formData = new FormData();

  formData.append(
    "request",
    new Blob([JSON.stringify({ authorId, content })], {
      type: "application/json",
    }),
  );

  images.forEach((file) => {
    formData.append("images", file);
  });

  try {
    await axios.post(`/v1/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

/* PUT: 소식 수정하기 */
export const editPost = async (
  postId: Post["postId"],
  authorId: Post["authorId"],
  content: Post["content"],
  images: PostLetter["images"],
) => {
  const formData = new FormData();

  formData.append(
    "request",
    new Blob([JSON.stringify({ authorId, content })], {
      type: "application/json",
    }),
  );

  images.forEach((file) => {
    formData.append("images", file);
  });

  try {
    await axios.put(`/v1/posts/${postId}`, formData);
  } catch (error) {
    console.error(error);
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
    if (response.status === 200) usePostStore.getState().deletePost(postId);
  } catch (error) {
    console.error(error);
  }
};
