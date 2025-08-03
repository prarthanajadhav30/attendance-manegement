import { useCallback } from "react";

const useFetchWithAuth = () => {
  return useCallback(async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
    return fetch(url, { ...options, headers });
  }, []);
};

export default useFetchWithAuth;
