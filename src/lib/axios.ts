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

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 무한 반복 방지
    ) {
      originalRequest._retry = true;
      try {
        // reissue 요청 (Refresh Token은 쿠키로 보내진다고 가정)
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/reissue`,
          {},
          { withCredentials: true }, // 쿠키 포함 필요시
        );

        const newAccessToken = res.data.result?.accessToken;
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest); // 실패했던 요청 재시도
        }
      } catch (reissueErr) {
        console.error("Reissue failed", reissueErr);
        // 강제 로그아웃 처리도 여기에 가능
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
