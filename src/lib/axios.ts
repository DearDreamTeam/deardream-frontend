import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use((config) => {
  let token = localStorage.getItem("accessToken");
  if (!token) {
    token = localStorage.getItem("tempToken");
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const refreshToken = localStorage.getItem("refreshToken");

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log("리이슈 처리중", refreshToken);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/reissue`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const newAccessToken = res.data.result?.newAccessToken;
        const newRefreshToken = res.data.result?.newRefreshToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return instance(originalRequest);
        }
      } catch (reissueErr) {
        console.error("Reissue failed", reissueErr);
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.clear();
        window.location.href = "/login";
        // 로그아웃 처리 등
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
