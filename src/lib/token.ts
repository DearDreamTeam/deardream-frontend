export const setTempToken = (tempToken: string) => {
  localStorage.setItem("tempToken", tempToken);
};

export const getTempToken = () => {
  return localStorage.getItem("tempToken");
};

export const setToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tempToken");
};
