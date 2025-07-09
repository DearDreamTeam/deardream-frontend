// src/lib/axios.ts
import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// 요청마다 최신 토큰을 동적으로 설정
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // 아예 헤더에서 제거 (중요!)
    delete config.headers.Authorization;
  }
  return config;
});

export default instance;
