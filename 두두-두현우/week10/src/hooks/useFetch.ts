import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import axiosClient from "../apis/axiosClient";

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("📡 useFetch 실행됨", url, options);
      setIsLoading(true);
      try {
        const { data } = await axiosClient.get(url, { ...options });
        setData(data);
        console.log("✅ 요청 성공:", data); // <- 요청 확인
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);
  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;
